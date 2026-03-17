import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Nat16 "mo:core/Nat16";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Outcall "./http-outcalls/outcall";

actor {
  let SUPABASE_URL = "https://envlgopdjphsvuizgnoe.supabase.co";
  let SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudmxnb3BkanBoc3Z1aXpnbm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTYzMjAsImV4cCI6MjA4ODk3MjMyMH0.rdfp1neTPrKocBIlF92LcviyRncWHV49lDsI55LQc5Y";

  // Stable B-tree map — implicitly stable in persistent actor mode
  var txIdSet : Map.Map<Text, ()> = Map.empty<Text, ()>();

  public query func transform(input : Outcall.TransformationInput) : async Outcall.TransformationOutput {
    Outcall.transform(input);
  };

  type HttpHeader = { name : Text; value : Text };
  type StreamingStrategy = {};
  type HttpRequest = {
    method : Text;
    url : Text;
    headers : [HttpHeader];
    body : Blob;
  };
  type HttpResponse = {
    status_code : Nat16;
    headers : [HttpHeader];
    body : Blob;
    upgrade : ?Bool;
    streaming_strategy : ?StreamingStrategy;
  };

  func respond(status : Nat16, json : Text) : HttpResponse {
    {
      status_code = status;
      headers = [
        { name = "Content-Type"; value = "application/json" },
        { name = "Access-Control-Allow-Origin"; value = "*" },
      ];
      body = json.encodeUtf8();
      upgrade = null;
      streaming_strategy = null;
    };
  };

  func getQueryString(url : Text) : Text {
    let parts = url.split(#char '?');
    ignore parts.next();
    switch (parts.next()) {
      case (?q) q;
      case null "";
    };
  };

  func parseParams(qs : Text) : [(Text, Text)] {
    var result : [(Text, Text)] = [];
    for (pair in qs.split(#char '&')) {
      let kv = pair.split(#char '=');
      switch (kv.next()) {
        case (?k) {
          switch (kv.next()) {
            case (?v) { result := result.concat([(k, v)]) };
            case null {};
          };
        };
        case null {};
      };
    };
    result;
  };

  func getParam(params : [(Text, Text)], key : Text) : ?Text {
    for ((k, v) in params.vals()) {
      if (k == key) return ?v;
    };
    null;
  };

  func extractCoins(json : Text) : Nat {
    let parts = json.split(#text "\"coins\":");
    ignore parts.next();
    switch (parts.next()) {
      case null 0;
      case (?rest) {
        var digits = "";
        label charLoop for (c in rest.chars()) {
          if (c >= '0' and c <= '9') {
            digits #= Text.fromChar(c);
          } else if (digits.size() > 0) {
            break charLoop;
          };
        };
        switch (Nat.fromText(digits)) {
          case (?n) n;
          case null 0;
        };
      };
    };
  };

  public query func http_request(req : HttpRequest) : async HttpResponse {
    if (req.url.contains(#text "/postback")) {
      return {
        status_code = 200;
        headers = [];
        body = "".encodeUtf8();
        upgrade = ?true;
        streaming_strategy = null;
      };
    };
    respond(404, "{\"error\":\"Not found\"}");
  };

  public func http_request_update(req : HttpRequest) : async HttpResponse {
    let qs = getQueryString(req.url);
    let params = parseParams(qs);

    let userid = switch (getParam(params, "userid")) {
      case (?v) v;
      case null return respond(400, "{\"success\":false,\"error\":\"Missing userid\"}");
    };
    let rewardStr = switch (getParam(params, "reward")) {
      case (?v) v;
      case null return respond(400, "{\"success\":false,\"error\":\"Missing reward\"}");
    };
    let txid = switch (getParam(params, "txid")) {
      case (?v) v;
      case null return respond(400, "{\"success\":false,\"error\":\"Missing txid\"}");
    };

    if (txIdSet.get(txid) != null) {
      return respond(200, "{\"success\":false,\"error\":\"Duplicate transaction\"}");
    };

    let reward = switch (Nat.fromText(rewardStr)) {
      case (?r) r;
      case null return respond(400, "{\"success\":false,\"error\":\"Invalid reward value\"}");
    };

    let baseHeaders : [Outcall.Header] = [
      { name = "apikey"; value = SUPABASE_ANON_KEY },
      { name = "Authorization"; value = "Bearer " # SUPABASE_ANON_KEY },
      { name = "Content-Type"; value = "application/json" },
    ];

    // Step 1: Get current user coins
    let getUserUrl = SUPABASE_URL # "/rest/v1/users?id=eq." # userid # "&select=coins";
    let userResponse = await Outcall.httpGetRequest(getUserUrl, baseHeaders, transform);
    let currentCoins = extractCoins(userResponse);
    let newCoins = currentCoins + reward;

    // Step 2: Update user coins via PATCH (using POST + method override)
    let patchHeaders : [Outcall.Header] = baseHeaders.concat([
      { name = "X-HTTP-Method-Override"; value = "PATCH" },
      { name = "Prefer"; value = "return=minimal" },
    ]);
    let updateUrl = SUPABASE_URL # "/rest/v1/users?id=eq." # userid;
    ignore await Outcall.httpPostRequest(updateUrl, patchHeaders, "{\"coins\":" # newCoins.toText() # "}", transform);

    // Step 3: Insert record into survey_histroy
    let now = Time.now();
    let dateStr = (now / 1_000_000_000).toText();
    let insertUrl = SUPABASE_URL # "/rest/v1/survey_histroy";
    let insertHeaders : [Outcall.Header] = baseHeaders.concat([
      { name = "Prefer"; value = "return=minimal" },
    ]);
    let insertBody = "{\"user_id\":\"" # userid # "\",\"survey_name\":\"CPX Survey\",\"reward\":" # reward.toText() # ",\"date\":\"" # dateStr # "\"}";
    ignore await Outcall.httpPostRequest(insertUrl, insertHeaders, insertBody, transform);

    // Mark txid as processed
    txIdSet.add(txid, ());

    respond(200, "{\"success\":true}");
  };
};

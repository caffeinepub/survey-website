import { auth, supabase } from "../supabase";

export interface SurveyRecord {
  name: string;
  date: string;
  time: string;
  status: string;
}

// -------------------------------------------------------
// Session helpers — backed by Supabase Auth session
// -------------------------------------------------------
export function getCurrentUserId(): string | null {
  return auth.getSession()?.user?.id ?? null;
}

export function getStoredEmail(): string | null {
  return auth.getSession()?.user?.email ?? null;
}

// -------------------------------------------------------
// Sign out
// -------------------------------------------------------
export async function signOut(): Promise<void> {
  await auth.signOut();
}

// -------------------------------------------------------
// After OTP verification — upsert user into public.users
// Uses auth.user.id as the primary key
// -------------------------------------------------------
export async function ensureUserRecord(): Promise<void> {
  const session = auth.getSession();
  if (!session) return;

  const { id, email } = session.user;

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (!existing) {
    const { error } = await supabase
      .from("users")
      .insert({ id, email, coins: 0 });
    if (error)
      console.warn("[Supabase] ensureUserRecord insert error:", error.message);
  }
}

// -------------------------------------------------------
// Coin balance
// -------------------------------------------------------
export async function getCoinBalance(userId: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("coins")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      console.warn("[Supabase] getCoinBalance error:", error.message);
      return 0;
    }
    return (data as { coins?: number } | null)?.coins ?? 0;
  } catch {
    return 0;
  }
}

// -------------------------------------------------------
// Add coins to a user
// -------------------------------------------------------
export async function addCoins(userId: string, amount: number): Promise<void> {
  try {
    const current = await getCoinBalance(userId);
    const { error } = await supabase
      .from("users")
      .update({ coins: current + amount })
      .eq("id", userId)
      .execute();
    if (error) console.warn("[Supabase] addCoins error:", error.message);
  } catch (err) {
    console.warn("[Supabase] addCoins exception:", err);
  }
}

// -------------------------------------------------------
// Save survey completion to "survey_histroy" table
// -------------------------------------------------------
export async function saveSurveyHistory(
  userId: string,
  record: SurveyRecord,
): Promise<void> {
  try {
    const { error } = await supabase.from("survey_histroy").insert({
      user_id: userId,
      survey_name: record.name,
      reward: 50,
      date: `${record.date} ${record.time}`,
    });
    if (error)
      console.warn("[Supabase] saveSurveyHistory error:", error.message);
  } catch (err) {
    console.warn("[Supabase] saveSurveyHistory exception:", err);
  }
}

// -------------------------------------------------------
// Fetch survey history for a user
// -------------------------------------------------------
export async function getSurveyHistoryFromSupabase(
  userId: string,
): Promise<SurveyRecord[]> {
  try {
    const { data, error } = await supabase
      .from("survey_histroy")
      .select("survey_name, reward, date")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .execute();

    if (error) {
      console.warn("[Supabase] getSurveyHistory error:", error.message);
      return [];
    }

    return (data ?? []).map((row: Record<string, unknown>) => {
      const dateStr = typeof row.date === "string" ? row.date : "";
      const parts = dateStr ? dateStr.split(" ") : ["", ""];
      return {
        name: typeof row.survey_name === "string" ? row.survey_name : "",
        date: parts[0] ?? dateStr,
        time: parts[1] ?? "",
        status: "Completed",
      };
    });
  } catch {
    return [];
  }
}

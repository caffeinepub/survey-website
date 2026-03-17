// Supabase REST + Auth client (no SDK dependency)
const SUPABASE_URL = "https://envlgopdjphsvuizgnoe.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudmxnb3BkanBoc3Z1aXpnbm9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTYzMjAsImV4cCI6MjA4ODk3MjMyMH0.rdfp1neTPrKocBIlF92LcviyRncWHV49lDsI55LQc5Y";

// Supabase stores the session under this key in localStorage
const SESSION_KEY = "sb-envlgopdjphsvuizgnoe-auth-token";

const BASE_HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  "Content-Type": "application/json",
};

type Row = Record<string, unknown>;
type SupabaseError = { message: string } | null;

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

// -------------------------------------------------------
// Auth helpers
// -------------------------------------------------------
function getAuthHeader(token?: string): Record<string, string> {
  return { Authorization: `Bearer ${token ?? SUPABASE_ANON_KEY}` };
}

async function apiPost<T>(
  path: string,
  body: unknown,
  token?: string,
): Promise<{ data: T | null; error: SupabaseError }> {
  try {
    const res = await fetch(`${SUPABASE_URL}${path}`, {
      method: "POST",
      headers: { ...BASE_HEADERS, ...getAuthHeader(token) },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      return {
        data: null,
        error: {
          message: json?.msg ?? json?.error_description ?? String(json),
        },
      };
    }
    return { data: json as T, error: null };
  } catch (e) {
    return { data: null, error: { message: String(e) } };
  }
}

// -------------------------------------------------------
// Auth namespace
// -------------------------------------------------------
export const auth = {
  /** Step 1 — sends OTP email */
  async signInWithOtp(email: string): Promise<{ error: SupabaseError }> {
    const { error } = await apiPost("/auth/v1/otp", {
      email,
      create_user: true,
    });
    return { error };
  },

  /** Step 2 — verifies OTP and returns session */
  async verifyOtp(
    email: string,
    token: string,
  ): Promise<{ data: AuthSession | null; error: SupabaseError }> {
    const result = await apiPost<AuthSession>("/auth/v1/verify", {
      type: "email",
      email,
      token,
    });
    if (result.data?.access_token) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(result.data));
    }
    return result;
  },

  /** Get current session from localStorage */
  getSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as AuthSession;
    } catch {
      return null;
    }
  },

  /** Sign out and clear session */
  async signOut(): Promise<void> {
    const session = this.getSession();
    if (session?.access_token) {
      try {
        await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
          method: "POST",
          headers: { ...BASE_HEADERS, ...getAuthHeader(session.access_token) },
        });
      } catch {
        // ignore network errors on logout
      }
    }
    localStorage.removeItem(SESSION_KEY);
  },
};

// -------------------------------------------------------
// REST DB helpers (unchanged)
// -------------------------------------------------------
function getDbHeaders(token?: string): Record<string, string> {
  return {
    ...BASE_HEADERS,
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token ?? auth.getSession()?.access_token ?? SUPABASE_ANON_KEY}`,
    Prefer: "return=representation",
    Accept: "application/json",
  };
}

async function selectRows(
  table: string,
  cols: string,
  filters: [string, string][] = [],
  orderCol?: string,
  orderAsc = true,
): Promise<{ data: Row[]; error: SupabaseError }> {
  const params = new URLSearchParams();
  params.set("select", cols);
  for (const [col, val] of filters) params.append(col, `eq.${val}`);
  if (orderCol) params.set("order", `${orderCol}.${orderAsc ? "asc" : "desc"}`);
  const url = `${SUPABASE_URL}/rest/v1/${table}?${params.toString()}`;
  try {
    const res = await fetch(url, { headers: getDbHeaders() });
    if (!res.ok) return { data: [], error: { message: await res.text() } };
    return { data: (await res.json()) as Row[], error: null };
  } catch (e) {
    return { data: [], error: { message: String(e) } };
  }
}

async function selectOne(
  table: string,
  cols: string,
  filters: [string, string][] = [],
): Promise<{ data: Row | null; error: SupabaseError }> {
  const { data, error } = await selectRows(table, cols, filters);
  return { data: data[0] ?? null, error };
}

async function insertRow(
  table: string,
  row: Row,
): Promise<{ error: SupabaseError }> {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: getDbHeaders(),
      body: JSON.stringify(row),
    });
    if (!res.ok) return { error: { message: await res.text() } };
    return { error: null };
  } catch (e) {
    return { error: { message: String(e) } };
  }
}

async function updateRows(
  table: string,
  row: Row,
  filters: [string, string][],
): Promise<{ error: SupabaseError }> {
  const params = new URLSearchParams();
  for (const [col, val] of filters) params.append(col, `eq.${val}`);
  const url = `${SUPABASE_URL}/rest/v1/${table}?${params.toString()}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: getDbHeaders(),
      body: JSON.stringify(row),
    });
    if (!res.ok) return { error: { message: await res.text() } };
    return { error: null };
  } catch (e) {
    return { error: { message: String(e) } };
  }
}

// -------------------------------------------------------
// Fluent builder surface
// -------------------------------------------------------
class SelectBuilder {
  private table: string;
  private cols = "*";
  private filters: [string, string][] = [];
  private orderCol?: string;
  private orderAsc = true;

  constructor(table: string) {
    this.table = table;
  }

  select(cols: string): this {
    this.cols = cols;
    return this;
  }
  eq(col: string, val: string): this {
    this.filters.push([col, val]);
    return this;
  }
  order(col: string, opts?: { ascending?: boolean }): this {
    this.orderCol = col;
    this.orderAsc = opts?.ascending !== false;
    return this;
  }

  async maybeSingle(): Promise<{ data: Row | null; error: SupabaseError }> {
    return selectOne(this.table, this.cols, this.filters);
  }

  async execute(): Promise<{ data: Row[]; error: SupabaseError }> {
    return selectRows(
      this.table,
      this.cols,
      this.filters,
      this.orderCol,
      this.orderAsc,
    );
  }
}

class UpdateBuilder {
  private table: string;
  private row: Row;
  private filters: [string, string][] = [];

  constructor(table: string, row: Row) {
    this.table = table;
    this.row = row;
  }

  eq(col: string, val: string): this {
    this.filters.push([col, val]);
    return this;
  }

  execute(): Promise<{ error: SupabaseError }> {
    return updateRows(this.table, this.row, this.filters);
  }
}

class TableBuilder {
  private table: string;
  constructor(table: string) {
    this.table = table;
  }
  select(cols: string): SelectBuilder {
    return new SelectBuilder(this.table).select(cols);
  }
  insert(row: Row): Promise<{ error: SupabaseError }> {
    return insertRow(this.table, row);
  }
  update(row: Row): UpdateBuilder {
    return new UpdateBuilder(this.table, row);
  }
}

export const supabase = {
  from(table: string): TableBuilder {
    return new TableBuilder(table);
  },
};

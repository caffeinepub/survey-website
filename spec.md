# Surearn Survey Website

## Current State
Authentication uses a custom REST-based Supabase client that stores user id and email directly in localStorage without any real auth. Sign-in skips OTP and simply looks up or inserts by email.

## Requested Changes (Diff)

### Add
- Two-step login flow: Step 1 — enter email (calls Supabase auth OTP), Step 2 — enter OTP code to verify
- Supabase Auth REST API methods: signInWithOtp, verifyOtp, getSession, signOut
- After successful OTP verification, upsert user into public.users table using auth.user.id and auth.user.email

### Modify
- supabase.ts: add `auth` namespace with signInWithOtp, verifyOtp, getSession, signOut using Supabase Auth REST endpoints
- LoginPage.tsx: two-step UI (email input → OTP input) with clear state management
- supabaseService.ts: getCurrentUserId and getStoredEmail now read from Supabase auth session (localStorage key set by Supabase) instead of custom keys
- Header.tsx: logout calls supabase auth signOut to clear the real session

### Remove
- Manual localStorage keys surearn_user_id and surearn_email replaced by Supabase session
- signInOrSignUp direct DB-only logic replaced by auth-first flow

## Implementation Plan
1. Extend supabase.ts with auth REST methods (POST /auth/v1/otp, POST /auth/v1/verify, GET session from localStorage token, POST /auth/v1/logout)
2. Update supabaseService.ts: getSession helper reads sb-*-auth-token from localStorage; getCurrentUserId/getStoredEmail use session; new signOut function; update signInOrSignUp to upsert using auth user id after OTP verification
3. Update LoginPage.tsx: add OTP step, call auth.signInWithOtp on email submit, call auth.verifyOtp on OTP submit, then upsert user in DB
4. Update Header.tsx: logout calls signOut from supabaseService which clears the auth session

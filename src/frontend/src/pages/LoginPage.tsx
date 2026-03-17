import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "@tanstack/react-router";
import { Coins, Loader2 } from "lucide-react";
import { useState } from "react";
import { ensureUserRecord } from "../services/supabaseService";
import { auth } from "../supabase";

type Step = "email" | "otp";

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const { error: otpError } = await auth.signInWithOtp(trimmed);
      if (otpError) {
        setError(otpError.message || "Failed to send OTP. Please try again.");
        return;
      }
      setEmail(trimmed);
      setStep("otp");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmedOtp = otp.trim();
    if (!trimmedOtp || trimmedOtp.length < 4) {
      setError("Please enter the OTP code from your email.");
      return;
    }
    setLoading(true);
    try {
      const { data, error: verifyError } = await auth.verifyOtp(
        email,
        trimmedOtp,
      );
      if (verifyError || !data) {
        setError(
          verifyError?.message || "Invalid or expired OTP. Please try again.",
        );
        return;
      }
      // Upsert user into public.users table
      await ensureUserRecord();
      await navigate({ to: "/" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50">
              <Coins className="h-7 w-7 text-cyan-500" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Welcome to Surearn
          </h1>
          {step === "email" ? (
            <p className="text-gray-500">
              Enter your email to receive a one-time code.
            </p>
          ) : (
            <p className="text-gray-500">
              We sent a code to{" "}
              <span className="font-medium text-gray-700">{email}</span>. Check
              your inbox.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          {step === "email" ? (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="border-gray-200 focus:border-cyan-400 focus:ring-cyan-400"
                />
              </div>

              {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full border-0 bg-cyan-500 text-base font-semibold text-white hover:bg-cyan-600 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending code…
                  </span>
                ) : (
                  "Send Code"
                )}
              </Button>

              <p className="mt-4 text-center text-xs text-gray-400">
                No password needed. We'll send a one-time code to your email.
              </p>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  One-Time Code
                </label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter the code from your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={loading}
                  autoFocus
                  className="border-gray-200 text-center tracking-widest text-lg focus:border-cyan-400 focus:ring-cyan-400"
                />
              </div>

              {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full border-0 bg-cyan-500 text-base font-semibold text-white hover:bg-cyan-600 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying…
                  </span>
                ) : (
                  "Verify & Sign In"
                )}
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError("");
                }}
                className="mt-4 w-full text-center text-xs text-gray-400 hover:text-cyan-500 transition-colors"
              >
                Use a different email
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

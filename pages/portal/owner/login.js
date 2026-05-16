import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

export default function OwnerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("unit101@sunsetcondo.com");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");

  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkExistingSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

                if (session?.user) {
          router.replace("/homeowner");
          return;
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }

      if (mounted) {
        setInitializing(false);
      }
    }

    checkExistingSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session?.user) {
        router.replace("/homeowner");
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const normalizedEmail = String(email || "").toLowerCase().trim();

    if (!normalizedEmail || !password) {
      setErrorMessage("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
        });

        if (error) {
          throw error;
        }

        setMessage(
          "Account created. Please check your email if confirmation is required, then sign in."
        );

        setMode("signin");
        setPassword("");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (error) {
        throw error;
      }

            router.replace("/homeowner");
    } catch (error) {
      setErrorMessage(error.message || "Unable to continue.");
    }

    setLoading(false);
  }

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 text-sm text-slate-300 shadow-2xl">
          Loading secure owner access...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center">
        <div className="grid w-full gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-8 shadow-2xl">
            <div className="mb-4 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              SPM Owner Portal
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Secure owner access for your association.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
              Sign in to view your association account, payment visibility,
              request status, owner updates, and HOA-safe financial information.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">
                  Financial visibility
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  View your current balance, payment status, and account health
                  from the QuickBooks-connected SPM mirror.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-sm font-semibold text-white">
                  Operational transparency
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Submit owner requests and track live status updates without
                  exposing internal management workflows.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold">
              {mode === "signin" ? "Owner Sign In" : "Create Owner Access"}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Use the email associated with your unit or invitation.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50"
                  placeholder="owner@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/50"
                  placeholder="Enter password"
                />
              </div>

              {errorMessage && (
                <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </div>
              )}

              {message && (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl border border-yellow-400/30 bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : mode === "signin"
                  ? "Sign In"
                  : "Create Access"}
              </button>
            </form>

            <div className="mt-6 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setMessage("");
                  setErrorMessage("");
                  setPassword("");
                }}
                className="text-sm font-medium text-yellow-300 hover:text-yellow-200"
              >
                {mode === "signin"
                  ? "Need to create owner access?"
                  : "Already have access? Sign in"}
              </button>
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              Owner access is association-scoped. Financial data remains sourced
              from QuickBooks and displayed through SPM’s HOA-safe operational
              mirror.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

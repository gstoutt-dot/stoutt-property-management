import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthTestPage() {
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const response = await fetch("/api/auth/session");
      const result = await response.json();

      if (!result.success) {
        setErrorMessage(result.error || "Unable to load session.");
        setLoading(false);
        return;
      }

      setSessionData(result);
      setLoading(false);
    } catch (error) {
      console.error("Auth test failed:", error);

      setErrorMessage("Unexpected authentication error.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
            Secure Authentication Layer
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight">
            Session Validation
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
            This validates the authenticated session layer powering
            association-scoped access control.
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
            <p className="text-slate-400">
              Checking authentication session...
            </p>
          </div>
        ) : errorMessage ? (
          <div className="rounded-3xl border border-red-400/20 bg-red-400/10 p-8">
            <p className="text-red-200">{errorMessage}</p>
          </div>
        ) : (
          <>
            <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-6 shadow-2xl shadow-black/20">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/80">
                Session Status
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SessionField
                  label="Authenticated"
                  value={
                    sessionData?.authenticated ? "Yes" : "No"
                  }
                />

                <SessionField
                  label="Email"
                  value={
                    sessionData?.session?.user?.email || "No Session"
                  }
                />

                <SessionField
                  label="User ID"
                  value={
                    sessionData?.session?.user?.id || "No Session"
                  }
                />

                <SessionField
                  label="Expires At"
                  value={
                    sessionData?.session?.expires_at || "No Session"
                  }
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
              <h2 className="text-2xl font-semibold text-emerald-200">
                Authentication Infrastructure Active
              </h2>

              <p className="mt-4 max-w-4xl leading-8 text-slate-300">
                The platform now has the foundational session layer
                required for secure association, board, manager,
                owner, vendor, and accounting scope protection.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/secure-access-test"
                className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/20"
              >
                Secure Access Test
              </Link>

              <Link
                href="/software-dashboard"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10"
              >
                Software Dashboard
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function SessionField({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 break-all text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

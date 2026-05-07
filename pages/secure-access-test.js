import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleAccessPanel from "../components/RoleAccessPanel";
import { getCurrentUserProfile } from "../lib/currentUserProfile";

export default function SecureAccessTestPage() {
  const [profile, setProfile] = useState(null);
  const [scope, setScope] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const result = await getCurrentUserProfile();

    setProfile(result.profile || null);
    setScope(result.scope || null);
    setLoading(false);
  }

  return (
    <ProtectedRoute
      allowedRoles={["admin", "manager", "board", "owner"]}
    >
      <main className="min-h-screen bg-[#020617] text-white">
        <section className="mx-auto max-w-5xl px-6 py-12">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
              Secure Association Access
            </p>

            <h1 className="mt-3 text-5xl font-semibold tracking-tight">
              Role & Association Scope
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              This validates the new authenticated multi-association
              access-control architecture.
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <p className="text-slate-400">
                Loading secure profile...
              </p>
            </div>
          ) : (
            <>
              <RoleAccessPanel
                profile={profile}
                scope={scope}
              />

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
                  Authentication Status
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <SecureField
                    label="Authenticated"
                    value={scope?.authenticated ? "Yes" : "No"}
                  />

                  <SecureField
                    label="Role"
                    value={scope?.role || "guest"}
                  />

                  <SecureField
                    label="Association ID"
                    value={scope?.associationId || "Not Assigned"}
                  />

                  <SecureField
                    label="User ID"
                    value={scope?.userId || "Not Assigned"}
                  />

                  <SecureField
                    label="Unit Number"
                    value={scope?.unitNumber || "N/A"}
                  />

                  <SecureField
                    label="Email"
                    value={scope?.email || "N/A"}
                  />
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                <h2 className="text-2xl font-semibold text-emerald-200">
                  Access-Control Foundation Active
                </h2>

                <p className="mt-4 max-w-4xl leading-8 text-slate-300">
                  The system is now transitioning from open workflow
                  architecture into authenticated association-scoped
                  infrastructure.
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </ProtectedRoute>
  );
}

function SecureField({ label, value }) {
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

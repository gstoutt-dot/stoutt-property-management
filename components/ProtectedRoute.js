import { useEffect, useState } from "react";
import { getCurrentUserProfile } from "../lib/currentUserProfile";
import { canAccessRole } from "../lib/userScope";

export default function ProtectedRoute({
  allowedRoles = [],
  children,
  fallbackPath = "/homeowner-login",
}) {
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const { scope } = await getCurrentUserProfile();

    if (!scope.authenticated) {
      window.location.href = fallbackPath;
      return;
    }

    if (allowedRoles.length > 0 && !canAccessRole(scope, allowedRoles)) {
      window.location.href = "/software-dashboard";
      return;
    }

    setAllowed(true);
    setChecking(false);
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-8 text-center shadow-2xl shadow-black/30">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/80">
            Stoutt Property Management
          </p>

          <h1 className="mt-3 text-2xl font-semibold">
            Verifying Access
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Loading your secure workspace...
          </p>
        </div>
      </main>
    );
  }

  if (!allowed) {
    return null;
  }

  return children;
}

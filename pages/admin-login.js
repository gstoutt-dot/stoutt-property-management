import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function choosePrimaryRole(roles = []) {
  const normalizedRoles = roles.map((role) => String(role || "").toLowerCase());

  if (normalizedRoles.includes("admin")) return "admin";
  if (normalizedRoles.includes("manager")) return "manager";
  if (normalizedRoles.includes("cam")) return "manager";
  if (normalizedRoles.includes("board")) return "board";
  if (normalizedRoles.includes("homeowner")) return "homeowner";
  if (normalizedRoles.includes("owner")) return "homeowner";

  return "";
}

function getRouteByRole(role) {
  if (role === "admin") return "/admin";
  if (role === "manager") return "/manager/dashboard";
  if (role === "board") return "/board";
  if (role === "homeowner") return "/homeowner";

  return "/admin-login";
}

function storePortalContext({ email, role, associations }) {
  const firstAssociation = Array.isArray(associations) ? associations[0] : null;

  localStorage.setItem("spmPortalLoggedIn", "true");
  localStorage.setItem("spmPortalUser", email);
  localStorage.setItem("spmPortalUserName", email);
  localStorage.setItem("spmPortalRole", role);
  localStorage.setItem(
    "spmPortalAllowedAssociations",
    JSON.stringify(associations || [])
  );

  if (firstAssociation?.association_id) {
    localStorage.setItem(
      "spm_selected_association_id",
      String(firstAssociation.association_id)
    );

    localStorage.setItem(
      "spm_selected_association_name",
      String(firstAssociation.association_name || "Selected Association")
    );

    localStorage.setItem(
      "selectedAssociationId",
      String(firstAssociation.association_id)
    );

    localStorage.setItem(
      "selectedAssociationName",
      String(firstAssociation.association_name || "Selected Association")
    );
  }
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("glenn@stouttmgmt.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      const accessResponse = await fetch("/api/portal/my-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const accessResult = await accessResponse.json();

      if (!accessResponse.ok || !accessResult.success) {
        throw new Error(
          accessResult.error || "Unable to verify portal access."
        );
      }

      const associations = Array.isArray(accessResult.associations)
        ? accessResult.associations
        : [];

      const roles = Array.isArray(accessResult.roles)
        ? accessResult.roles
        : [];

      if (associations.length === 0 || roles.length === 0) {
        throw new Error(
          "Access denied. This email has not been approved for any portal."
        );
      }

      const role = choosePrimaryRole(roles);

      if (!role) {
        throw new Error("Access denied. No valid portal role was found.");
      }

      storePortalContext({
        email: normalizedEmail,
        role,
        associations,
      });

      router.push(getRouteByRole(role));
    } catch (submitError) {
      setError(submitError.message || "Unable to continue.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,1),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950 to-slate-950" />

        <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl md:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-2xl font-bold text-amber-300 shadow-lg shadow-amber-500/10">
              S
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Secure Portal Access
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Stoutt Property Management
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Enter your approved email and password. Your portal, role, and
              association access will be assigned automatically.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>

              <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 transition focus-within:border-amber-400/60 focus-within:ring-2 focus:ring-amber-400/20">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="border-l border-white/10 px-4 text-xs font-semibold uppercase tracking-wide text-amber-300 transition hover:bg-amber-400/10"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying Access..." : "Enter Portal"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Portal access is assigned during onboarding. Users can only enter
            approved associations and approved dashboard areas.
          </p>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

const FALLBACK_ASSOCIATIONS = [
  {
    id: "sunset-condo",
    name: "Sunset Condo Association",
    quickbooks_id: "sunset-condo",
  },
];

const PORTAL_ROLES = [
  { value: "board", label: "Board Member" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Admin" },
];

export default function AdminLoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [portalRole, setPortalRole] = useState("board");
  const [associations, setAssociations] = useState(FALLBACK_ASSOCIATIONS);
  const [selectedAssociationId, setSelectedAssociationId] = useState(
    FALLBACK_ASSOCIATIONS[0].id
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const selectedAssociation = useMemo(() => {
    return (
      associations.find(
        (association) => String(association.id) === String(selectedAssociationId)
      ) || associations[0]
    );
  }, [associations, selectedAssociationId]);

  useEffect(() => {
    let mounted = true;

    async function loadAssociations() {
      try {
        const { data, error } = await supabase
          .from("associations")
          .select("id, name, quickbooks_id, quickbooks_company_id")
          .order("name", { ascending: true });

        if (error) return;

        if (!mounted) return;

        if (Array.isArray(data) && data.length > 0) {
          const normalizedAssociations = data.map((association) => ({
            id: association.id,
            name: association.name || "Unnamed Association",
            quickbooks_id:
              association.quickbooks_id ||
              association.quickbooks_company_id ||
              association.id,
          }));

          setAssociations(normalizedAssociations);
          setSelectedAssociationId(normalizedAssociations[0].id);
        }
      } catch (error) {
        console.warn("Association load failed:", error);
      }
    }

    loadAssociations();

    return () => {
      mounted = false;
    };
  }, []);

  const getRouteByRole = (role) => {
    if (role === "manager") return "/portal/manager";
    if (role === "board") return "/board";
    if (role === "admin") return "/admin";
    return "/admin-login";
  };

  const storePortalContext = (role, userEmail) => {
    localStorage.setItem("spmPortalLoggedIn", "true");
    localStorage.setItem("spmPortalUser", String(userEmail || "").toLowerCase());
    localStorage.setItem("spmPortalUserName", String(userEmail || ""));
    localStorage.setItem("spmPortalRole", role);

    localStorage.setItem(
      "spm_selected_association_id",
      String(selectedAssociation.id)
    );
    localStorage.setItem(
      "spm_selected_association_name",
      String(selectedAssociation.name || "")
    );
    localStorage.setItem(
      "spm_selected_quickbooks_id",
      String(selectedAssociation.quickbooks_id || selectedAssociation.id)
    );
  };

  async function checkApprovedAccess(userEmail, role) {
    const { data, error } = await supabase
      .from("portal_access_approvals")
      .select("id, status")
      .eq("association_id", selectedAssociation.id)
      .eq("email", userEmail)
      .eq("role", role)
      .eq("status", "approved")
      .maybeSingle();

    if (error) {
      console.error("Access approval check failed:", error);
      return false;
    }

    return Boolean(data?.id);
  }

  async function createManagerPendingRequest(userEmail) {
    const { error } = await supabase.from("portal_access_approvals").upsert(
      {
        association_id: selectedAssociation.id,
        association_name: selectedAssociation.name,
        quickbooks_id: selectedAssociation.quickbooks_id || selectedAssociation.id,
        email: userEmail,
        role: "manager",
        status: "pending",
      },
      {
        onConflict: "association_id,email,role",
      }
    );

    if (error) {
      throw error;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const normalizedEmail = String(email || "").toLowerCase().trim();

    if (!selectedAssociation?.id) {
      setError("Please select an association.");
      setLoading(false);
      return;
    }

    if (!portalRole) {
      setError("Please select a portal type.");
      setLoading(false);
      return;
    }

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      if (mode === "signup") {
        if (portalRole === "admin") {
          setError(
            "Admin access cannot be created from this page. Admin access must be approved internally."
          );
          setLoading(false);
          return;
        }

        if (portalRole === "manager") {
          await createManagerPendingRequest(normalizedEmail);

          setMessage(
            "Manager access request submitted. Access will remain locked until Glenn approves it."
          );
          setPassword("");
          setLoading(false);
          return;
        }

        const approved = await checkApprovedAccess(normalizedEmail, portalRole);

        if (!approved) {
          setError(
            "Access denied. This email is not approved for the selected association and portal type."
          );
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              portal_role: portalRole,
              association_id: selectedAssociation.id,
              association_name: selectedAssociation.name,
              quickbooks_id:
                selectedAssociation.quickbooks_id || selectedAssociation.id,
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        setMessage("Access created. You may now sign in.");
        setMode("signin");
        setPassword("");
        setLoading(false);
        return;
      }

      const approved = await checkApprovedAccess(normalizedEmail, portalRole);

      if (!approved) {
        setError(
          "Access denied. This email is not approved for the selected association and portal type."
        );
        setLoading(false);
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      storePortalContext(portalRole, normalizedEmail);
      router.push(getRouteByRole(portalRole));
    } catch (error) {
      setError(error.message || "Unable to continue.");
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
              Association-controlled access for board, manager, and admin
              portals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Association
              </label>

              <select
                value={selectedAssociationId}
                onChange={(e) => setSelectedAssociationId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
              >
                {associations.map((association) => (
                  <option
                    key={association.id}
                    value={association.id}
                    className="bg-slate-950 text-white"
                  >
                    {association.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Portal Type
              </label>

              <select
                value={portalRole}
                onChange={(e) => setPortalRole(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
              >
                {PORTAL_ROLES.map((role) => (
                  <option
                    key={role.value}
                    value={role.value}
                    className="bg-slate-950 text-white"
                  >
                    {role.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>

              <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 transition focus-within:border-amber-400/60 focus-within:ring-2 focus-within:ring-amber-400/20">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={
                    mode === "signin" ? "current-password" : "new-password"
                  }
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

            {message && (
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                ? "Enter Portal"
                : portalRole === "manager"
                ? "Request Manager Access"
                : "Create Access"}
            </button>
          </form>

          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError("");
                setMessage("");
                setPassword("");
              }}
              className="text-sm font-medium text-amber-300 hover:text-amber-200"
            >
              {mode === "signin"
                ? "Need to create board or manager access?"
                : "Already have access? Sign in"}
            </button>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Portal access is association-scoped. Unknown users are blocked unless
            their email has been approved for the selected association and portal
            type.
          </p>
        </div>
      </section>
    </main>
  );
}

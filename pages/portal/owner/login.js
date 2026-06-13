import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

const FALLBACK_ASSOCIATIONS = [
  {
    id: "79893883-6141-4dcc-ba1a-034d70a0dc96",
    name: "Sunset Condo Association",
    status: "active",
  },
];

export default function OwnerLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("unit101@sunsetcondo.com");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");

  const [associations, setAssociations] = useState(FALLBACK_ASSOCIATIONS);
  const [selectedAssociationId, setSelectedAssociationId] = useState(
    FALLBACK_ASSOCIATIONS[0].id
  );

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [loadingAssociations, setLoadingAssociations] = useState(true);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const selectedAssociation = useMemo(() => {
    return (
      associations.find(
        (association) => String(association.id) === String(selectedAssociationId)
      ) || FALLBACK_ASSOCIATIONS[0]
    );
  }, [associations, selectedAssociationId]);

  useEffect(() => {
    let mounted = true;

    async function loadAssociations() {
      setLoadingAssociations(true);

      try {
        const { data, error } = await supabase
          .from("associations")
          .select("id, name, status")
          .order("name", { ascending: true });

        if (error) {
          throw error;
        }

        if (!mounted) return;

        const activeAssociations = Array.isArray(data)
          ? data.filter((association) => association.status === "active")
          : [];

        if (activeAssociations.length > 0) {
          setAssociations(activeAssociations);
          setSelectedAssociationId(activeAssociations[0].id);
        } else {
          setAssociations(FALLBACK_ASSOCIATIONS);
          setSelectedAssociationId(FALLBACK_ASSOCIATIONS[0].id);
        }
      } catch (error) {
        console.error("Association load failed:", error);

        if (mounted) {
          setAssociations(FALLBACK_ASSOCIATIONS);
          setSelectedAssociationId(FALLBACK_ASSOCIATIONS[0].id);
        }
      }

      if (mounted) {
        setLoadingAssociations(false);
      }
    }

    loadAssociations();

    return () => {
      mounted = false;
    };
  }, []);

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

  function storeAssociationContext(userEmail) {
    localStorage.setItem("spmPortalLoggedIn", "true");
    localStorage.setItem("spmPortalUser", String(userEmail || "").toLowerCase());
    localStorage.setItem("spmPortalUserName", String(userEmail || ""));
    localStorage.setItem("spmPortalRole", "homeowner");

    localStorage.setItem(
      "spm_selected_association_id",
      String(selectedAssociation.id)
    );

    localStorage.setItem(
      "spm_selected_association_name",
      String(selectedAssociation.name || "")
    );
  }

  async function checkApprovedAccess(userEmail) {
    const response = await fetch("/api/portal/check-access", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        association_id: selectedAssociation.id,
        email: userEmail,
        role: "homeowner",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Homeowner access API failed:", result);
      return false;
    }

    return Boolean(result.approved);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const normalizedEmail = String(email || "").toLowerCase().trim();

    if (!selectedAssociation?.id) {
      setErrorMessage("Please select your association.");
      setLoading(false);
      return;
    }

    if (!normalizedEmail || !password) {
      setErrorMessage("Please enter your email and password.");
      setLoading(false);
      return;
    }

    try {
      const approved = await checkApprovedAccess(normalizedEmail);

      if (!approved) {
        setErrorMessage(
          "Access denied. This email is not approved for the selected association."
        );
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              association_id: selectedAssociation.id,
              association_name: selectedAssociation.name,
              portal_role: "homeowner",
            },
          },
        });

        if (error) {
          throw error;
        }

        setMessage("Access created. You may now sign in.");
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

      storeAssociationContext(normalizedEmail);
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
              Select your association and use the approved email associated with
              your unit or invitation.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Association
                </label>

                <select
                  value={selectedAssociationId}
                  onChange={(e) => setSelectedAssociationId(e.target.value)}
                  disabled={loadingAssociations}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/50 disabled:opacity-60"
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

                <p className="mt-2 text-xs text-slate-500">
                  Association selection protects the correct BOSai Association
                  ID connection.
                </p>
              </div>

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

                <div className="flex overflow-hidden rounded-xl border border-white/10 bg-black/30 focus-within:border-yellow-400/50">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                    placeholder="Enter password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="border-l border-white/10 px-4 text-xs font-semibold uppercase tracking-wide text-yellow-300 hover:bg-yellow-400/10"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
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
                disabled={loading || loadingAssociations}
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
              Owner access is association-scoped. Unknown emails are blocked
              unless approved for the selected association.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

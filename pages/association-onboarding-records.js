import { useEffect, useState } from "react";

export default function AssociationOnboardingRecords() {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadAssociations() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/onboarding/list-associations");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to load associations.");
      }

      setAssociations(data.associations || []);
    } catch (err) {
      setError(err.message || "Unable to load associations.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAssociation(association) {
    const associationId = association.association_id || association.id;
    const associationName =
      association.association_name || association.name || "this association";

    if (!associationId) {
      setError("Unable to delete association because no association ID was found.");
      return;
    }

    const confirmed = window.confirm(
      `Delete ${associationName}?\n\nThis will remove the association onboarding record and related association-scoped demo records tied to this BOSai Association UUID. This cannot be undone.`
    );

    if (!confirmed) return;

    const finalConfirm = window.prompt(
      `Type DELETE to permanently delete ${associationName}.`
    );

    if (finalConfirm !== "DELETE") {
      setError("Delete cancelled. Confirmation text did not match DELETE.");
      return;
    }

    setDeletingId(associationId);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/onboarding/delete-association?association_id=${encodeURIComponent(
          associationId
        )}&confirm=DELETE`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete association.");
      }

      setMessage(data?.message || `${associationName} deleted.`);
      await loadAssociations();
    } catch (err) {
      setError(err.message || "Unable to delete association.");
    } finally {
      setDeletingId("");
    }
  }

  useEffect(() => {
    loadAssociations();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Live Association Records
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Association Onboarding Records
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Live Supabase-backed association onboarding records created through
            the SPM onboarding engine.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadAssociations}
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
            >
              Refresh Records
            </button>

            <a
              href="/association-onboarding"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Add Association
            </a>
          </div>
        </header>

        {error && (
          <section className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-red-200">
            {error}
          </section>
        )}

        {message && (
          <section className="mt-6 rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-5 text-emerald-200">
            {message}
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Live Records" value={associations.length} />
          <Metric label="Storage" value="Supabase" />
          <Metric label="Scope" value="Association" />
          <Metric label="Status" value={loading ? "Loading" : "Live"} />
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Live Onboarding Data
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Association Profiles
              </h2>
            </div>

            <a
              href="/owner-unit-import"
              className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
            >
              Continue to Owner Import
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full min-w-[1080px] text-left text-sm">
              <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                <tr>
                  <th className="px-5 py-4">Association</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">City</th>
                  <th className="px-5 py-4">County</th>
                  <th className="px-5 py-4">Units</th>
                  <th className="px-5 py-4">Board President</th>
                  <th className="px-5 py-4">QuickBooks</th>
                  <th className="px-5 py-4">Stage</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-5 py-10 text-center text-slate-400"
                    >
                      Loading association records...
                    </td>
                  </tr>
                ) : associations.length > 0 ? (
                  associations.map((association) => {
                    const associationId =
                      association.association_id || association.id;
                    const associationName =
                      association.association_name ||
                      association.name ||
                      "Association";

                    return (
                      <tr key={associationId} className="bg-slate-950/40">
                        <td className="px-5 py-4 font-semibold text-white">
                          <div>{associationName}</div>
                          <div className="mt-1 text-[11px] font-normal text-slate-500">
                            ID: {associationId || "Missing"}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {association.property_type}
                        </td>
                        <td className="px-5 py-4 text-slate-400">
                          {association.city || "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-400">
                          {association.county || "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {association.total_units || "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {association.board_president || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <Status value={association.quickbooks_status} />
                        </td>
                        <td className="px-5 py-4">
                          <Status value={association.onboarding_stage} />
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteAssociation(association)}
                            disabled={deletingId === associationId}
                            className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === associationId
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-5 py-10 text-center text-slate-400"
                    >
                      No association records found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

function Status({ value }) {
  return (
    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
      {value || "Pending"}
    </span>
  );
}

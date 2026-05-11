import { useEffect, useState } from "react";

export default function OwnerAccessRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadRecords() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/onboarding/list-owner-access");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to load owner access records.");
      }

      setRecords(data.accessRecords || []);
    } catch (err) {
      setError(err.message || "Unable to load owner access records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Live Owner Access
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Owner Access Records
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Live Supabase-backed owner access records showing portal readiness,
            financial visibility status, and owner invitation state.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadRecords}
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
            >
              Refresh Records
            </button>

            <a
              href="/owner-access-provisioning"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Add Access Record
            </a>
          </div>
        </header>

        {error && (
          <section className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-red-200">
            {error}
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Access Records" value={records.length} />
          <Metric label="Storage" value="Supabase" />
          <Metric label="Portal Layer" value="Owner" />
          <Metric label="Status" value={loading ? "Loading" : "Live"} />
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Live Owner Portal Access Data
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Provisioned Owner Access Queue
              </h2>
            </div>

            <a
              href="/owner-financial-dashboard-preview"
              className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
            >
              Continue to Owner Financial View
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                <tr>
                  <th className="px-5 py-4">Association</th>
                  <th className="px-5 py-4">Unit</th>
                  <th className="px-5 py-4">Owner</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Access</th>
                  <th className="px-5 py-4">Financial View</th>
                  <th className="px-5 py-4">Invite</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-5 py-10 text-center text-slate-400">
                      Loading owner access records...
                    </td>
                  </tr>
                ) : records.length > 0 ? (
                  records.map((record) => (
                    <tr key={record.id} className="bg-slate-950/40">
                      <td className="px-5 py-4 text-slate-400">
                        {record.association_name || "—"}
                      </td>
                      <td className="px-5 py-4 font-semibold text-white">
                        {record.unit_number}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {record.owner_name}
                      </td>
                      <td className="px-5 py-4 text-slate-400">
                        {record.owner_email}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {record.portal_role || "Owner"}
                      </td>
                      <td className="px-5 py-4">
                        <Status value={record.access_status} />
                      </td>
                      <td className="px-5 py-4">
                        <Status value={record.financial_access_status} />
                      </td>
                      <td className="px-5 py-4">
                        <Status value={record.invite_status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-5 py-10 text-center text-slate-400">
                      No owner access records found yet.
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
  const good = ["Provisioned", "Active", "Ready", "Sent"];
  const hold = ["Hold", "Review Required"];

  const styles = good.includes(value)
    ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
    : hold.includes(value)
    ? "border-red-300/30 bg-red-400/10 text-red-200"
    : "border-amber-300/30 bg-amber-400/10 text-amber-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value || "Pending"}
    </span>
  );
}

import { useMemo, useState } from "react";

const initialOwners = [
  {
    unit: "101",
    owner: "Robert Mitchell",
    email: "robert@example.com",
    quickbooksCustomer: "Unit 101 - Robert Mitchell",
    ownerUserId: "2576c2a8-e49e-4009-9d07-10aba3c63090",
    matchStatus: "Matched",
    loginStatus: "Ready",
  },
  {
    unit: "102",
    owner: "Angela Brooks",
    email: "angela@example.com",
    quickbooksCustomer: "Unit 102 - Angela Brooks",
    ownerUserId: "",
    matchStatus: "Matched",
    loginStatus: "Pending",
  },
  {
    unit: "103",
    owner: "Carlos Hernandez",
    email: "carlos@example.com",
    quickbooksCustomer: "Unit 103 - Carlos Hernandez",
    ownerUserId: "",
    matchStatus: "Needs Review",
    loginStatus: "Pending",
  },
];

export default function OwnerIdentityMapping() {
  const [owners] = useState(initialOwners);

  const stats = useMemo(() => {
    return {
      total: owners.length,
      matched: owners.filter((o) => o.matchStatus === "Matched").length,
      review: owners.filter((o) => o.matchStatus === "Needs Review").length,
      ready: owners.filter((o) => o.loginStatus === "Ready").length,
    };
  }, [owners]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Owner Identity Bridge
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Owner Identity Mapping
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Match imported owner-unit records to QuickBooks customers and prepare
            secure owner portal identity creation for live financial visibility.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Owner Records" value={stats.total} />
          <Metric label="QuickBooks Matched" value={stats.matched} />
          <Metric label="Needs Review" value={stats.review} />
          <Metric label="Login Ready" value={stats.ready} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Identity Bridge
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Owner / Unit / QuickBooks Matching
                </h2>
              </div>

              <button
                type="button"
                className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
              >
                Prepare Login Identities
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Owner Email</th>
                    <th className="px-5 py-4">QuickBooks Customer</th>
                    <th className="px-5 py-4">Owner User ID</th>
                    <th className="px-5 py-4">Match</th>
                    <th className="px-5 py-4">Login</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {owners.map((owner) => (
                    <tr key={owner.unit} className="bg-slate-950/40">
                      <td className="px-5 py-4 font-semibold text-white">
                        {owner.unit}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {owner.owner}
                      </td>
                      <td className="px-5 py-4 text-slate-400">
                        {owner.email}
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        {owner.quickbooksCustomer}
                      </td>
                      <td className="max-w-[220px] truncate px-5 py-4 text-slate-500">
                        {owner.ownerUserId || "Pending creation"}
                      </td>
                      <td className="px-5 py-4">
                        <Status value={owner.matchStatus} />
                      </td>
                      <td className="px-5 py-4">
                        <LoginStatus value={owner.loginStatus} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Mapping Workflow</h2>

              <div className="mt-6 space-y-3">
                <Step title="Read imported owner roster" active />
                <Step title="Normalize unit numbers" active />
                <Step title="Match QuickBooks customers" active />
                <Step title="Create owner identity records" />
                <Step title="Assign secure portal access" />
                <Step title="Activate financial dashboard" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6">
              <p className="font-semibold text-emerald-200">
                Financial Visibility Bridge
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Once an owner identity is mapped to a unit and QuickBooks
                customer, SPM can safely show owner balances, account health,
                payment status, and board-level financial rollups.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

function Step({ title, active }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <div
        className={`h-3 w-3 rounded-full ${
          active ? "bg-emerald-300" : "bg-slate-600"
        }`}
      />
      <p className="text-sm text-slate-300">{title}</p>
    </div>
  );
}

function Status({ value }) {
  const styles =
    value === "Matched"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function LoginStatus({ value }) {
  const styles =
    value === "Ready"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : "border-amber-300/30 bg-amber-400/10 text-amber-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

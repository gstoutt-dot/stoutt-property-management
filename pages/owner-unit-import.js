import { useMemo, useState } from "react";

const sampleOwners = [
  {
    unit: "101",
    owner: "Robert Mitchell",
    email: "robert@example.com",
    phone: "(954) 555-0101",
    balance: 450,
    status: "Mapped",
  },
  {
    unit: "102",
    owner: "Angela Brooks",
    email: "angela@example.com",
    phone: "(954) 555-0102",
    balance: 0,
    status: "Ready",
  },
  {
    unit: "103",
    owner: "Carlos Hernandez",
    email: "carlos@example.com",
    phone: "(954) 555-0103",
    balance: 1250,
    status: "Needs Review",
  },
];

export default function OwnerUnitImport() {
  const [owners, setOwners] = useState(sampleOwners);

  const stats = useMemo(() => {
    const total = owners.length;
    const mapped = owners.filter((o) => o.status === "Mapped").length;
    const ready = owners.filter((o) => o.status === "Ready").length;
    const review = owners.filter((o) => o.status === "Needs Review").length;

    return { total, mapped, ready, review };
  }, [owners]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Owner Onboarding
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Owner / Unit Import Center
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Import, review, and prepare owner-unit records before account
            creation, QuickBooks identity matching, and secure owner portal
            access.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Total Records" value={stats.total} />
          <Metric label="Mapped" value={stats.mapped} />
          <Metric label="Ready" value={stats.ready} />
          <Metric label="Needs Review" value={stats.review} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-semibold">Import Workflow</h2>

            <div className="mt-6 rounded-3xl border border-dashed border-amber-300/30 bg-amber-300/10 p-6 text-center">
              <p className="font-semibold text-amber-200">
                CSV Owner Roster Upload
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Future production connection point for importing unit number,
                owner name, email, phone, mailing address, account number, and
                opening balance.
              </p>

              <button
                type="button"
                className="mt-5 rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
              >
                Upload Owner Roster
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <Step title="Import owner roster" active />
              <Step title="Validate unit numbers" active />
              <Step title="Match QuickBooks customers" />
              <Step title="Create owner identities" />
              <Step title="Generate login access" />
              <Step title="Activate financial dashboard" />
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Owner Records
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Unit Ownership Review
                </h2>
              </div>

              <button
                type="button"
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Prepare Owner Accounts
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Phone</th>
                    <th className="px-5 py-4">Balance</th>
                    <th className="px-5 py-4">Status</th>
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
                      <td className="px-5 py-4 text-slate-400">
                        {owner.phone}
                      </td>
                      <td className="px-5 py-4 font-semibold text-amber-300">
                        ${Number(owner.balance || 0).toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <Status value={owner.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
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
    value === "Mapped"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Ready"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

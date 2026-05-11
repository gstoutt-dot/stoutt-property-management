import { useMemo, useState } from "react";

const initialFinancials = {
  associationName: "Sunset Condominium Association",
  totalOwners: 3,
  currentOwners: 1,
  delinquentOwners: 2,
  criticalAccounts: 1,
  monthlyAssessmentBase: 1800,
  totalOutstandingBalance: 1700,
  collectionRiskScore: 38,
  lastSync: "Live QuickBooks sync ready",
};

const ownerRows = [
  {
    unit: "101",
    owner: "Robert Mitchell",
    balance: 450,
    paymentStatus: "Attention",
    accountHealth: "Watch",
    boardVisibility: "Visible",
  },
  {
    unit: "102",
    owner: "Angela Brooks",
    balance: 0,
    paymentStatus: "Current",
    accountHealth: "Healthy",
    boardVisibility: "Visible",
  },
  {
    unit: "103",
    owner: "Carlos Hernandez",
    balance: 1250,
    paymentStatus: "Delinquent",
    accountHealth: "Critical",
    boardVisibility: "Visible",
  },
];

export default function BoardFinancialVisibility() {
  const [financials] = useState(initialFinancials);
  const [owners] = useState(ownerRows);

  const stats = useMemo(() => {
    return {
      totalOwners: owners.length,
      currentOwners: owners.filter((o) => o.paymentStatus === "Current").length,
      delinquentOwners: owners.filter((o) => o.paymentStatus !== "Current").length,
      criticalAccounts: owners.filter((o) => o.accountHealth === "Critical").length,
    };
  }, [owners]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Board Financial Operations
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Board Financial Visibility
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Board-ready financial visibility for association leadership. This
            view summarizes owner balances, collection exposure, account health,
            and QuickBooks-synchronized financial transparency.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Owner Accounts" value={stats.totalOwners} />
          <Metric label="Current Owners" value={stats.currentOwners} />
          <Metric label="Delinquent Owners" value={stats.delinquentOwners} />
          <Metric label="Critical Accounts" value={stats.criticalAccounts} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Association Financial Snapshot
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {financials.associationName}
              </h2>

              <div className="mt-6 space-y-4">
                <SnapshotRow
                  label="Monthly Assessment Base"
                  value={`$${financials.monthlyAssessmentBase.toLocaleString()}`}
                />
                <SnapshotRow
                  label="Outstanding Balance"
                  value={`$${financials.totalOutstandingBalance.toLocaleString()}`}
                />
                <SnapshotRow
                  label="Collection Risk Score"
                  value={`${financials.collectionRiskScore}%`}
                />
                <SnapshotRow label="Last Sync" value={financials.lastSync} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Board Actions</h2>

              <div className="mt-6 space-y-3">
                <ActionButton label="Review Delinquency Watchlist" />
                <ActionButton label="Open Financial Summary" />
                <ActionButton label="Prepare Board Report" />
                <ActionButton label="Send Manager Follow-Up" />
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Board Review
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Owner Financial Rollup
                </h2>
              </div>

              <a
                href="/accounting/quickbooks-live"
                className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
              >
                Open QuickBooks Center
              </a>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Balance</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Health</th>
                    <th className="px-5 py-4">Board View</th>
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
                      <td className="px-5 py-4 font-semibold text-amber-300">
                        ${Number(owner.balance || 0).toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <PaymentStatus value={owner.paymentStatus} />
                      </td>
                      <td className="px-5 py-4">
                        <HealthStatus value={owner.accountHealth} />
                      </td>
                      <td className="px-5 py-4">
                        <VisibilityStatus value={owner.boardVisibility} />
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

function SnapshotRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-right text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function ActionButton({ label }) {
  return (
    <button
      type="button"
      className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-left font-semibold text-white transition hover:bg-white/15"
    >
      {label}
    </button>
  );
}

function PaymentStatus({ value }) {
  const styles =
    value === "Current"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Attention"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function HealthStatus({ value }) {
  const styles =
    value === "Healthy"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Watch"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function VisibilityStatus({ value }) {
  return (
    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
      {value}
    </span>
  );
}

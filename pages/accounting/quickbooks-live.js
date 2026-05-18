import { useEffect, useMemo, useState } from "react";

const ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const REALM_ID = "9341457054133986";

export default function QuickBooksLiveAccounting() {
  const [loading, setLoading] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [error, setError] = useState("");

    async function runFullSync() {
    setLoading(true);
    setError("");
    setSyncResult(null);

    try {
      const response = await fetch(
        `/api/accounting/quickbooks/financial-summary?association_id=${ASSOCIATION_ID}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "QuickBooks financial summary failed.");
      }

      setSyncResult({
        success: true,
        results: {
          financial_summary: {
            success: true,
            status: response.status,
            data,
          },
        },
      });
    } catch (err) {
      setError(err.message || "Unable to load QuickBooks financial summary.");
    } finally {
      setLoading(false);
    }
  }

    useEffect(() => {
    runFullSync();
  }, []);

  const financialSummaryData =
    syncResult?.results?.financial_summary?.data || null;

  const summary =
    financialSummaryData?.board_summary || null;

    const ownerBalances =
    financialSummaryData?.attentionAccounts ||
    financialSummaryData?.attention_accounts ||
    financialSummaryData?.owner_balances ||
    financialSummaryData?.owners ||
    [];

  const syncItems = Object.entries(syncResult?.results || {});

  const financialSnapshot = useMemo(() => {
    const totalOwners = ownerBalances.length;

    const delinquentOwners = ownerBalances.filter((owner) =>
      ["attention", "elevated", "severe"].includes(owner.delinquency_level)
    ).length;

    const criticalOwners = ownerBalances.filter(
      (owner) => owner.account_health === "critical"
    ).length;

    const currentOwners = Math.max(totalOwners - delinquentOwners, 0);

    const monthlyAssessments = ownerBalances.reduce(
      (sum, owner) => sum + Number(owner.monthly_assessment || 0),
      0
    );

    const collectionsExposure = ownerBalances.reduce((sum, owner) => {
      const balance = Number(owner.current_balance || 0);
      return balance > 0 ? sum + balance : sum;
    }, 0);

    return {
      totalOwners,
      currentOwners,
      delinquentOwners,
      criticalOwners,
      monthlyAssessments,
      collectionsExposure,
    };
  }, [ownerBalances]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
                <nav className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur">
          <a href="/" className="font-semibold text-amber-300">
            Stoutt Property Management
          </a>

          <div className="flex flex-wrap gap-3">
            <a
              href="/portal/owner/login"
              className="rounded-2xl border border-amber-300/30 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10"
            >
              Homeowner Access
            </a>

            <a
              href="/portal/manager"
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-amber-300/40 hover:text-amber-200"
            >
              Admin Access
            </a>

            <a
              href="/board"
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-amber-300/40 hover:text-amber-200"
            >
              Board Dashboard
            </a>
          </div>
        </nav>

        <header className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
                SPM Financial Operations
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                QuickBooks Financial Command Center
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Live accounting operations connected through QuickBooks synchronization.
                This command center connects QuickBooks synchronization, owner
                balances, delinquency visibility, and board financial reporting
                into one HOA-safe operational view.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5 lg:min-w-[320px]">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-200">
                Connected Association
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Sunset Condominium Association
              </h2>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>Association ID: {ASSOCIATION_ID}</p>
                <p>Realm ID: {REALM_ID}</p>
                <p>Platform: QuickBooks</p>
                <p>
                  Status:{" "}
                  <span className="font-semibold text-emerald-300">
                    Operational
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={runFullSync}
              disabled={loading}
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 disabled:opacity-50"
            >
              {loading ? "Synchronizing..." : "Run Live QuickBooks Sync"}
            </button>

            <a
              href={`/api/accounting/quickbooks/financial-summary?association_id=${ASSOCIATION_ID}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              View Board Financial Summary
            </a>
          </div>
        </header>

        {error && (
          <section className="mt-6 rounded-3xl border border-red-400/30 bg-red-500/10 p-6 text-red-200">
            {error}
          </section>
        )}

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Balance"
            value={`$${Number(summary?.totalBalance || 0).toLocaleString()}`}
            detail="Mirrored from owner accounting records"
          />
          <MetricCard
            label="Delinquent Accounts"
            value={summary?.delinquentAccounts ?? financialSnapshot.delinquentOwners}
            detail="Owners needing financial attention"
          />
          <MetricCard
            label="Critical Accounts"
            value={summary?.criticalAccounts ?? financialSnapshot.criticalOwners}
            detail="Highest collection risk group"
          />
          <MetricCard
            label="Risk Score"
            value={`${summary?.collectionRiskScore || 0}%`}
            detail="Board-level collection exposure"
          />
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <OperationalCard
            title="Owner Financial Visibility"
            value={financialSnapshot.totalOwners || "Pending Sync"}
            label="Owner accounts available after sync"
          />
          <OperationalCard
            title="Monthly Assessment Base"
            value={`$${financialSnapshot.monthlyAssessments.toLocaleString()}`}
            label="Assessment total from mirrored balances"
          />
          <OperationalCard
            title="Collections Exposure"
            value={`$${financialSnapshot.collectionsExposure.toLocaleString()}`}
            label="Positive outstanding balance exposure"
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Owner Ledger Preview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Owner Financial Dashboard Feed
                </h2>
              </div>
              <p className="text-sm text-slate-400">
                {ownerBalances.length
                  ? `${ownerBalances.length} owner records loaded`
                  : "Run sync to load owner balances"}
              </p>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Balance</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Last Payment</th>
                    <th className="px-5 py-4">Health</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                    {ownerBalances.length > 0 ? (
                    ownerBalances.map((owner, index) => (
                      <tr key={`${owner.unit_number}-${index}`} className="bg-slate-950/40">
                        <td className="px-5 py-4 font-semibold text-white">
                          {owner.unit_number || "—"}
                        </td>
                        <td className="px-5 py-4 text-slate-300">
                          {owner.owner_name || "Unassigned Owner"}
                        </td>
                        <td className="px-5 py-4 font-semibold text-amber-300">
                          ${Number(owner.current_balance || 0).toLocaleString()}
                        </td>
                        <td className="px-5 py-4">
                          <StatusPill value={owner.payment_status} />
                        </td>
                        <td className="px-5 py-4 text-slate-400">
                          {owner.last_payment_date || "—"}
                        </td>
                        <td className="px-5 py-4">
                          <HealthPill value={owner.account_health} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-5 py-10 text-center text-slate-400">
                        Owner ledger preview will appear after the next successful
                        QuickBooks synchronization.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Operations
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Accounting Actions
            </h2>

            <div className="mt-6 space-y-3">
              <button
                onClick={runFullSync}
                disabled={loading}
                className="w-full rounded-2xl bg-amber-400 px-5 py-3 text-left font-semibold text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
              >
                Sync QuickBooks Now
              </button>

                            <button
                onClick={runFullSync}
                disabled={loading}
                className="block w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-left font-semibold text-white transition hover:bg-white/15 disabled:opacity-50"
              >
                Refresh Owner Balances
              </button>

              <a
                href={`/api/accounting/quickbooks/financial-summary?association_id=${ASSOCIATION_ID}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/10 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
              >
                Open Board Financial Summary
              </a>
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
              <p className="font-semibold text-emerald-200">
                Production Status
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                SPM can onboard associations, connect accounting records,
                mirror owner balances, and provide live board-level
                financial transparency through QuickBooks synchronization.
              </p>
            </div>
          </aside>
        </section>

        {syncResult && (
          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-semibold">Synchronization Health</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {syncItems.map(([key, result]) => (
                <div
                  key={key}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {key.replaceAll("_", " ")}
                  </p>
                  <p
                    className={`mt-3 text-lg font-semibold ${
                      result.success ? "text-emerald-300" : "text-red-300"
                    }`}
                  >
                    {result.success ? "Synced" : "Needs Review"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Status {result.status}
                  </p>
                </div>
              ))}
            </div>

            <pre className="mt-6 max-h-[520px] overflow-auto rounded-2xl bg-black/40 p-5 text-xs text-slate-300">
              {JSON.stringify(syncResult, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </main>
  );
}

function MetricCard({ label, value, detail }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-amber-300">{value}</p>
      <p className="mt-3 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

function OperationalCard({ title, value, label }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function StatusPill({ value }) {
  const cleanValue = value || "unknown";

  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-slate-200">
      {cleanValue.replaceAll("_", " ")}
    </span>
  );
}

function HealthPill({ value }) {
  const cleanValue = value || "pending";

  const className =
    cleanValue === "critical"
      ? "border-red-300/30 bg-red-400/10 text-red-200"
      : cleanValue === "watch"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : cleanValue === "healthy"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : "border-white/10 bg-white/10 text-slate-300";

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${className}`}
    >
      {cleanValue}
    </span>
  );
}

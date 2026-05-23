import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

export default function QuickBooksLiveAccounting() {
  const router = useRouter();

     const associationId = String(
    router.query.association_id ||
      router.query.associationId ||
      "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2"
  ).trim();

  const [loading, setLoading] = useState(false);
  const [financialData, setFinancialData] = useState(null);
  const [error, setError] = useState("");

  async function loadFinancialSummary() {
    if (!associationId) {
      setError("Missing association_id. Open this page with a valid association_id.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/accounting/quickbooks/financial-summary?association_id=${associationId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to load financial summary.");
      }

      setFinancialData(data);
    } catch (err) {
      setError(err.message || "Unable to load QuickBooks data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!router.isReady) return;
    loadFinancialSummary();
  }, [router.isReady, associationId]);

  const boardSummary =
    financialData?.board_summary ||
    financialData?.boardSummary ||
    financialData?.summary ||
    {};

  const associationName =
    financialData?.association_name ||
    financialData?.associationName ||
    boardSummary?.associationName ||
    boardSummary?.association_name ||
    "Association Financial Profile";

  const ownerBalances = useMemo(() => {
    return extractOwnerBalances(financialData);
  }, [financialData]);

  const financialSnapshot = useMemo(() => {
    const totalOwners = ownerBalances.length;

    const delinquentOwners = ownerBalances.filter((owner) =>
      ["attention", "elevated", "severe"].includes(
        String(owner.delinquencyLevel || "").toLowerCase()
      )
    ).length;

    const criticalOwners = ownerBalances.filter(
      (owner) => String(owner.accountHealth || "").toLowerCase() === "critical"
    ).length;

    const monthlyAssessments = ownerBalances.reduce(
      (sum, owner) => sum + Number(owner.monthlyAssessment || 0),
      0
    );

    const collectionsExposure = ownerBalances.reduce((sum, owner) => {
      const balance = Number(owner.currentBalance || 0);
      return balance > 0 ? sum + balance : sum;
    }, 0);

    return {
      totalOwners,
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
  <a href="/admin" className="rounded-2xl border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/20">
    Admin Dashboard
  </a>

  <a href="/portal/owner/login" className="rounded-2xl border border-amber-300/30 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10">
    Homeowner Access
  </a>

  <a href="/portal/manager" className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-amber-300/40 hover:text-amber-200">
    Admin Access
  </a>

  <a href="/board" className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-amber-300/40 hover:text-amber-200">
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
                This command center provides HOA-safe owner balance visibility,
                collections exposure, delinquency tracking, and board financial oversight.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-5 lg:min-w-[320px]">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-200">
                Connected Association
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {associationName}
              </h2>

              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p>Association ID: {associationId || "Missing"}</p>
                <p>Platform: QuickBooks</p>
                <p>
                  Status:{" "}
                  <span className="font-semibold text-emerald-300">
                    {financialData ? "Operational" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={loadFinancialSummary}
              disabled={loading || !associationId}
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 disabled:opacity-50"
            >
              {loading ? "Synchronizing..." : "Run Live QuickBooks Sync"}
            </button>

            <button
              onClick={loadFinancialSummary}
              disabled={loading || !associationId}
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15 disabled:opacity-50"
            >
              Refresh Owner Balances
            </button>
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
            value={`$${Number(
              boardSummary?.totalBalance ||
                boardSummary?.total_balance ||
                financialSnapshot.collectionsExposure ||
                0
            ).toLocaleString()}`}
            detail="Mirrored from owner accounting records"
          />

          <MetricCard
            label="Delinquent Accounts"
            value={
              boardSummary?.delinquentAccounts ||
              boardSummary?.delinquent_accounts ||
              financialSnapshot.delinquentOwners
            }
            detail="Owners needing financial attention"
          />

          <MetricCard
            label="Critical Accounts"
            value={
              boardSummary?.criticalAccounts ||
              boardSummary?.critical_accounts ||
              financialSnapshot.criticalOwners
            }
            detail="Highest collection risk group"
          />

          <MetricCard
            label="Risk Score"
            value={`${
              boardSummary?.collectionRiskScore ||
              boardSummary?.collection_risk_score ||
              0
            }%`}
            detail="Board-level collection exposure"
          />
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <OperationalCard
            title="Owner Financial Visibility"
            value={financialSnapshot.totalOwners}
            label="Owner accounts loaded from QuickBooks"
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
                {ownerBalances.length} owner records loaded
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
                      <tr key={`${owner.unitNumber}-${index}`} className="bg-slate-950/40">
                        <td className="px-5 py-4 font-semibold text-white">
                          {owner.unitNumber || "—"}
                        </td>

                        <td className="px-5 py-4 text-slate-300">
                          {owner.ownerName || "Unknown Owner"}
                        </td>

                        <td className="px-5 py-4 font-semibold text-amber-300">
                          ${Number(owner.currentBalance || 0).toLocaleString()}
                        </td>

                        <td className="px-5 py-4">
                          <StatusPill value={owner.paymentStatus} />
                        </td>

                        <td className="px-5 py-4 text-slate-400">
                          {owner.lastPaymentDate || "—"}
                        </td>

                        <td className="px-5 py-4">
                          <HealthPill value={owner.accountHealth} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-5 py-10 text-center text-slate-400">
                        No owner balances available from the current association response.
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
                onClick={loadFinancialSummary}
                disabled={loading || !associationId}
                className="w-full rounded-2xl bg-amber-400 px-5 py-3 text-left font-semibold text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
              >
                Sync QuickBooks Now
              </button>

              <button
                onClick={loadFinancialSummary}
                disabled={loading || !associationId}
                className="w-full rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-left font-semibold text-white transition hover:bg-white/15 disabled:opacity-50"
              >
                Refresh Owner Balances
              </button>
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-5">
              <p className="font-semibold text-emerald-200">
                Production Status
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                SPM connects each association through its own association ID,
                QuickBooks connection, owner records, and accounting mirror.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function extractOwnerBalances(source) {
  const found = [];

  function normalizeOwner(owner) {
    return {
      unitNumber:
        owner.unitNumber ||
        owner.unit_number ||
        owner.unit ||
        owner.property_unit ||
        owner.propertyUnit ||
        "",

      ownerName:
        owner.ownerName ||
        owner.owner_name ||
        owner.name ||
        owner.customer_name ||
        owner.customerName ||
        "",

      currentBalance:
        owner.currentBalance ??
        owner.current_balance ??
        owner.balance ??
        owner.totalBalance ??
        owner.total_balance ??
        0,

      paymentStatus:
        owner.paymentStatus ||
        owner.payment_status ||
        owner.status ||
        "unknown",

      lastPaymentDate:
        owner.lastPaymentDate ||
        owner.last_payment_date ||
        owner.lastPayment ||
        owner.last_payment ||
        "",

      accountHealth:
        owner.accountHealth ||
        owner.account_health ||
        owner.health ||
        "pending",

      monthlyAssessment:
        owner.monthlyAssessment ??
        owner.monthly_assessment ??
        owner.assessment ??
        0,

      delinquencyLevel:
        owner.delinquencyLevel ||
        owner.delinquency_level ||
        owner.paymentStatus ||
        owner.payment_status ||
        "",
    };
  }

  function looksLikeOwnerRecord(item) {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;

    return Boolean(
      item.ownerName ||
        item.owner_name ||
        item.unitNumber ||
        item.unit_number ||
        item.currentBalance !== undefined ||
        item.current_balance !== undefined
    );
  }

  function walk(value) {
    if (!value) return;

    if (Array.isArray(value)) {
      if (value.some(looksLikeOwnerRecord)) {
        value.forEach((item) => {
          if (looksLikeOwnerRecord(item)) {
            found.push(normalizeOwner(item));
          }
        });
      } else {
        value.forEach(walk);
      }

      return;
    }

    if (typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  }

  walk(source);

  const unique = [];
  const seen = new Set();

  found.forEach((owner) => {
    const key = `${owner.unitNumber}-${owner.ownerName}-${owner.currentBalance}`;

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(owner);
    }
  });

  return unique;
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
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-slate-200">
      {String(value || "unknown").replaceAll("_", " ")}
    </span>
  );
}

function HealthPill({ value }) {
  const cleanValue = String(value || "pending").toLowerCase();

  const className =
    cleanValue === "critical"
      ? "border-red-300/30 bg-red-400/10 text-red-200"
      : cleanValue === "watch"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : cleanValue === "healthy"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : "border-white/10 bg-white/10 text-slate-300";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${className}`}>
      {cleanValue}
    </span>
  );
}

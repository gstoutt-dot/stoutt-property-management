import { useEffect, useMemo, useState } from "react";

export default function OwnerBalanceCard({
  associationId,
  ownerUserId,
  unitNumber,
}) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (associationId && (ownerUserId || unitNumber)) {
      loadBalance();
    }
  }, [associationId, ownerUserId, unitNumber]);

  async function loadBalance() {
    setLoading(true);
    setErrorMessage("");

    try {
      const params = new URLSearchParams({ associationId });

      if (ownerUserId) params.set("ownerUserId", ownerUserId);
      if (unitNumber) params.set("unitNumber", unitNumber);

      const response = await fetch(
        `/api/accounting/owner-balance?${params.toString()}`
      );

      const result = await response.json();

      if (!result.success) {
        setErrorMessage(result.error || "Balance unavailable.");
        setBalance(null);
        setLoading(false);
        return;
      }

      setBalance(result.balance);
      setLoading(false);
    } catch (error) {
      console.error("Owner balance load failed:", error);
      setErrorMessage("Balance unavailable.");
      setLoading(false);
    }
  }

  const accountState = useMemo(() => {
    const paymentStatus = String(balance?.payment_status || "current").toLowerCase();
    const delinquencyLevel = String(balance?.delinquency_level || "current").toLowerCase();
    const accountHealth = String(balance?.account_health || "healthy").toLowerCase();

    const isCurrent = paymentStatus === "current";
    const needsAttention =
      delinquencyLevel === "attention" ||
      delinquencyLevel === "elevated" ||
      delinquencyLevel === "severe" ||
      accountHealth === "watch" ||
      accountHealth === "critical";

    return {
      paymentStatus,
      delinquencyLevel,
      accountHealth,
      isCurrent,
      needsAttention,
    };
  }, [balance]);

  if (!associationId || (!ownerUserId && !unitNumber)) {
    return null;
  }

  return (
    <div className="mb-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
            Live Accounting
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Owner Financial Summary
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Secure owner visibility from the association accounting mirror.
          </p>
        </div>

        <button
          onClick={loadBalance}
          disabled={loading}
          className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20 disabled:opacity-40"
        >
          {loading ? "Refreshing..." : "Refresh Balance"}
        </button>
      </div>

      {loading ? (
        <MessageCard message="Loading live accounting information..." />
      ) : errorMessage ? (
        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5 text-sm text-yellow-200">
          {errorMessage}
        </div>
      ) : balance ? (
        <>
          <div className="grid gap-4 md:grid-cols-6">
            <BalanceField
              label="Current Balance"
              value={`$${Number(balance.current_balance || 0).toFixed(2)}`}
              highlight
            />

            <BalanceField
              label="Monthly Assessment"
              value={`$${Number(balance.monthly_assessment || 0).toFixed(2)}`}
            />

            <StatusField
              label="Payment Status"
              value={accountState.isCurrent ? "Current" : "Balance Due"}
              healthy={accountState.isCurrent}
              warning={!accountState.isCurrent}
            />

            <StatusField
              label="Delinquency"
              value={accountState.delinquencyLevel}
              healthy={accountState.delinquencyLevel === "current"}
              warning={accountState.delinquencyLevel === "attention"}
              elevated={accountState.delinquencyLevel === "elevated"}
              critical={accountState.delinquencyLevel === "severe"}
            />

            <StatusField
              label="Account Health"
              value={accountState.accountHealth}
              healthy={accountState.accountHealth === "healthy"}
              warning={accountState.accountHealth === "watch"}
              critical={accountState.accountHealth === "critical"}
            />

            <BalanceField
              label="Last Payment"
              value={balance.last_payment_date || "N/A"}
            />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InsightCard
              label="Standing"
              value={
                accountState.accountHealth === "healthy"
                  ? "Good Standing"
                  : accountState.accountHealth === "watch"
                  ? "Monitor Account"
                  : "Management Review"
              }
            />

            <InsightCard
              label="Accounting Source"
              value={
                balance.accounting_identity?.sync_status
                  ? `Synced: ${balance.accounting_identity.sync_status}`
                  : "Association Accounting Mirror"
              }
            />

            <InsightCard
              label="Unit / Account"
              value={`Unit ${balance.unit_number || unitNumber || "N/A"}${
                balance.account_number ? ` · ${balance.account_number}` : ""
              }`}
            />
          </div>

          {accountState.needsAttention && (
            <div className="mt-5 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5">
              <h3 className="font-semibold text-yellow-200">
                Account Review Notice
              </h3>

              <p className="mt-2 text-sm leading-6 text-yellow-100/80">
                Your account may need management review. Please contact the
                property management office if you need help reviewing your
                balance, payment history, or assessment status.
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              {balance.payment_link ? (
                <a
                  href={balance.payment_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit rounded-xl border border-yellow-400/30 bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300"
                >
                  Make a Payment
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex w-fit rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-500"
                >
                  Payment Link Unavailable
                </button>
              )}

              <button
                type="button"
                className="inline-flex w-fit rounded-xl border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-white/10"
              >
                Request Account Review
              </button>
            </div>

            <HealthBadge accountHealth={accountState.accountHealth} />
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
              Accounting Mirror Status
            </p>

            <p className="mt-2 text-sm text-slate-300">
              Synced from the association accounting system
              {balance.synced_at
                ? ` on ${new Date(balance.synced_at).toLocaleString()}`
                : "."}
            </p>
          </div>
        </>
      ) : (
        <MessageCard message="No balance record available." />
      )}
    </div>
  );
}

function MessageCard({ message }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
      {message}
    </div>
  );
}

function BalanceField({ label, value, highlight }) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-yellow-400/30 bg-yellow-400/10"
          : "border-white/10 bg-black/20"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-semibold ${
          highlight ? "text-yellow-300" : "text-slate-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InsightCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function StatusField({ label, value, healthy, warning, elevated, critical }) {
  let styles = "border-white/10 bg-black/20 text-slate-300";

  if (healthy) styles = "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  if (warning) styles = "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  if (elevated) styles = "border-orange-400/30 bg-orange-400/10 text-orange-300";
  if (critical) styles = "border-red-400/30 bg-red-400/10 text-red-300";

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <div
        className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles}`}
      >
        {value}
      </div>
    </div>
  );
}

function HealthBadge({ accountHealth }) {
  const styles =
    accountHealth === "healthy"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
      : accountHealth === "watch"
      ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
      : "border-red-400/30 bg-red-400/10 text-red-300";

  const label =
    accountHealth === "healthy"
      ? "Account in good standing"
      : accountHealth === "watch"
      ? "Account requires monitoring"
      : "Account requires attention";

  return (
    <div className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold ${styles}`}>
      {label}
    </div>
  );
}

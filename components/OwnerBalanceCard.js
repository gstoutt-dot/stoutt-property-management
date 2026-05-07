import { useEffect, useState } from "react";

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
      const params = new URLSearchParams({
        associationId,
      });

      if (ownerUserId) {
        params.set("ownerUserId", ownerUserId);
      }

      if (unitNumber) {
        params.set("unitNumber", unitNumber);
      }

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

  if (!associationId || (!ownerUserId && !unitNumber)) {
    return null;
  }

  return (
    <div className="mb-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.07] p-6 shadow-2xl shadow-black/20">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
            Account Balance
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Owner Accounting Summary
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Secure balance visibility from the accounting mirror.
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
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
          Loading balance...
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5 text-sm text-yellow-200">
          {errorMessage}
        </div>
      ) : balance ? (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <BalanceField
              label="Current Balance"
              value={`$${Number(balance.current_balance || 0).toFixed(2)}`}
              highlight
            />

            <BalanceField
              label="Monthly Assessment"
              value={`$${Number(balance.monthly_assessment || 0).toFixed(2)}`}
            />

            <BalanceField
              label="Payment Status"
              value={
                String(balance.payment_status || "").toLowerCase() === "current"
                  ? "Current"
                  : "Balance Due"
              }
            />

            <BalanceField
              label="Last Payment"
              value={balance.last_payment_date || "N/A"}
            />
          </div>

          {balance.payment_link && (
            <div className="mt-5">
              <a
                href={balance.payment_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-yellow-400/30 bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300"
              >
                Make a Payment
              </a>
            </div>
          )}

          <p className="mt-5 text-xs text-slate-500">
            Last synced:{" "}
            {balance.synced_at
              ? new Date(balance.synced_at).toLocaleString()
              : "N/A"}
          </p>
        </>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
          No balance record available.
        </div>
      )}
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

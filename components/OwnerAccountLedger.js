import { useEffect, useMemo, useState } from "react";

function money(value) {
  const number = Number(value || 0);

  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function label(value) {
  return String(value || "Ledger Entry")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function OwnerAccountLedger({
  associationId,
  ownerUserId,
  unitNumber,
  currentBalanceAmount,
}) {
  const [entries, setEntries] = useState([]);
  const [summary, setSummary] = useState({
    totalCharges: 0,
    totalPayments: 0,
    totalCredits: 0,
    netActivity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadLedger() {
    if (!associationId || (!ownerUserId && !unitNumber)) return;

    setLoading(true);
    setErrorMessage("");

    try {
      const params = new URLSearchParams({
        associationId,
        ownerUserId: ownerUserId || "",
        unitNumber: unitNumber || "",
      });

      const response = await fetch(`/api/owner/account-ledger?${params}`);
      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Unable to load account ledger.");
      }

      setEntries(result.entries || []);
      setSummary(
        result.summary || {
          totalCharges: 0,
          totalPayments: 0,
          totalCredits: 0,
          netActivity: 0,
        }
      );
    } catch (error) {
      console.error("Owner ledger load failed:", error);
      setErrorMessage(error.message || "Unable to load account ledger.");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadLedger();
  }, [associationId, ownerUserId, unitNumber]);

  const latestEntryDate = useMemo(() => {
    if (!entries.length) return "No activity yet";
    return formatDate(entries[0]?.transaction_date || entries[0]?.created_at);
  }, [entries]);

  return (
    <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
        <div>
          <div className="mb-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
            QuickBooks Ledger
          </div>

          <h2 className="text-xl font-semibold text-white">
            Account Ledger Summary
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            Review recent account activity including assessments, invoices,
            payments, late fees, violation fees, credits, and adjustments posted
            to your owner account.
          </p>
        </div>

        <button
          onClick={loadLedger}
          disabled={loading}
          className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-300 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh Ledger"}
        </button>
      </div>

      <div className="grid gap-4 border-b border-white/10 px-6 py-5 md:grid-cols-4">
                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
          <div className="text-xs uppercase tracking-wide text-yellow-300">
            Current Balance Due
          </div>
          <div className="mt-2 text-2xl font-semibold text-yellow-100">
            {money(summary.currentBalanceDue ?? currentBalanceAmount)}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <div className="text-xs uppercase tracking-wide text-emerald-300">
            Payments
          </div>
          <div className="mt-2 text-2xl font-semibold text-emerald-200">
            {money(summary.totalPayments)}
          </div>
        </div>

        <div className="rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4">
          <div className="text-xs uppercase tracking-wide text-blue-300">
            Credits
          </div>
          <div className="mt-2 text-2xl font-semibold text-blue-200">
            {money(summary.totalCredits)}
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
          <div className="text-xs uppercase tracking-wide text-yellow-300">
            Latest Activity
          </div>
          <div className="mt-2 text-lg font-semibold text-yellow-100">
            {latestEntryDate}
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mx-6 mt-5 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      {loading && (
        <div className="px-6 py-8 text-sm text-slate-400">
          Loading owner account ledger...
        </div>
      )}

      {!loading && entries.length === 0 && (
        <div className="px-6 py-8">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="text-base font-semibold text-white">
              No ledger activity synced yet
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Your account balance is connected. Detailed invoices, payments,
              late fees, violation fees, credits, and adjustments will appear
              here once the QuickBooks ledger sync is activated.
            </p>
          </div>
        </div>
      )}

      {!loading && entries.length > 0 && (
        <div className="max-h-[520px] overflow-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="sticky top-0 bg-[#07111f] text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4 text-right">Charge</th>
                <th className="px-5 py-4 text-right">Payment</th>
                <th className="px-5 py-4 text-right">Credit</th>
                <th className="px-5 py-4 text-right">Open Balance</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-white/[0.03]">
                  <td className="px-5 py-4 text-slate-300">
                    {formatDate(entry.transaction_date)}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      {label(entry.transaction_type)}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-white">
                      {entry.description || label(entry.quickbooks_transaction_type)}
                    </div>

                    {entry.memo && (
                      <div className="mt-1 text-xs text-slate-500">
                        {entry.memo}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 text-right font-medium text-white">
                    {Number(entry.charge_amount || 0) > 0
                      ? money(entry.charge_amount)
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-right font-medium text-emerald-300">
                    {Number(entry.payment_amount || 0) > 0
                      ? money(entry.payment_amount)
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-right font-medium text-blue-300">
                    {Number(entry.credit_amount || 0) > 0
                      ? money(entry.credit_amount)
                      : "—"}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold text-white">
                    {money(entry.open_balance)}
                  </td>

                  <td className="px-5 py-4 text-slate-400">
                    {label(entry.status || "posted")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-white/10 px-6 py-4 text-xs leading-5 text-slate-500">
        Ledger entries are displayed from SPM’s QuickBooks-connected accounting
        mirror and are scoped to your association, unit, and owner profile.
      </div>
    </div>
  );
}

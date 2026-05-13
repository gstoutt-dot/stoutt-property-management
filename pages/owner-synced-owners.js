import { useEffect, useMemo, useState } from "react";

const SUNSET_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

function money(value) {
  const number = Number(value || 0);

  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function statusLabel(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function OwnerSyncedOwnersPage() {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadOwners() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `/api/owner/list-synced-owners?associationId=${SUNSET_ASSOCIATION_ID}`
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Unable to load synced owners.");
      }

      setOwners(result.owners || []);
    } catch (error) {
      console.error("Synced owner page failed:", error);
      setErrorMessage(error.message || "Unable to load synced owners.");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOwners();
  }, []);

  const summary = useMemo(() => {
    const totalBalance = owners.reduce(
      (sum, owner) => sum + Number(owner.current_balance || 0),
      0
    );

    const severeCount = owners.filter(
      (owner) => owner.delinquency_level === "severe"
    ).length;

    const criticalCount = owners.filter(
      (owner) => owner.account_health === "critical"
    ).length;

    return {
      ownerCount: owners.length,
      totalBalance,
      severeCount,
      criticalCount,
    };
  }, [owners]);

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300">
              QuickBooks Synced Owners
            </div>

            <h1 className="text-4xl font-semibold tracking-tight">
              Sunset Owner Accounting List
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Live owner balance records mirrored from QuickBooks into SPM for
              portal onboarding, financial visibility, and owner dashboard
              provisioning.
            </p>
          </div>

          <button
            onClick={loadOwners}
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 hover:bg-yellow-400/20"
          >
            Refresh Owners
          </button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-sm text-slate-400">Synced Owners</div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.ownerCount}
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-5">
            <div className="text-sm text-yellow-300">Total Open Balance</div>
            <div className="mt-2 text-3xl font-semibold">
              {money(summary.totalBalance)}
            </div>
          </div>

          <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5">
            <div className="text-sm text-red-300">Severe Delinquencies</div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.severeCount}
            </div>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-5">
            <div className="text-sm text-orange-300">Critical Accounts</div>
            <div className="mt-2 text-3xl font-semibold">
              {summary.criticalCount}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-5">
            <h2 className="text-xl font-semibold">Owner Balance Records</h2>
          </div>

          {loading ? (
            <div className="px-6 py-10 text-sm text-slate-400">
              Loading synced owners...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="bg-black/30 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Unit</th>
                    <th className="px-5 py-4">Owner</th>
                    <th className="px-5 py-4">Account</th>
                    <th className="px-5 py-4">Balance</th>
                    <th className="px-5 py-4">Assessment</th>
                    <th className="px-5 py-4">Payment Status</th>
                    <th className="px-5 py-4">Delinquency</th>
                    <th className="px-5 py-4">Health</th>
                    <th className="px-5 py-4">Last Payment</th>
                    <th className="px-5 py-4">Owner User ID</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {owners.map((owner) => (
                    <tr key={owner.id} className="hover:bg-white/[0.03]">
                      <td className="px-5 py-4 font-semibold text-white">
                        {owner.unit_number}
                      </td>

                      <td className="px-5 py-4 text-slate-200">
                        {owner.owner_name}
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {owner.account_number}
                      </td>

                      <td className="px-5 py-4 font-semibold text-white">
                        {money(owner.current_balance)}
                      </td>

                      <td className="px-5 py-4 text-slate-300">
                        {money(owner.monthly_assessment)}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                          {statusLabel(owner.payment_status)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-medium text-yellow-300">
                          {statusLabel(owner.delinquency_level)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                          {statusLabel(owner.account_health)}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-400">
                        {owner.last_payment_date || "—"}
                      </td>

                      <td className="px-5 py-4 text-xs text-slate-500">
                        {owner.owner_user_id || "Not provisioned"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-xs leading-5 text-slate-500">
          Association ID: {SUNSET_ASSOCIATION_ID}
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function AccountingMirrorTestPage() {
  const [associationId, setAssociationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  async function runMirror() {
    if (!associationId.trim()) {
      setErrorMessage("Please enter an association ID.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setRecords([]);

    try {
      const response = await fetch("/api/accounting/mirror-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          associationId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setErrorMessage(
          result.error || "Unable to mirror accounting records."
        );

        setLoading(false);
        return;
      }

      const mirroredRecords = result.mirrored || [];

      setRecords(mirroredRecords);
      setLoading(false);
    } catch (error) {
      console.error("Accounting mirror test failed:", error);

      setErrorMessage("Unexpected accounting mirror error.");
      setLoading(false);
    }
  }

  const totalBalance = records.reduce((sum, item) => {
    return sum + Number(item.current_balance || 0);
  }, 0);

  const delinquentAccounts = records.filter(
    (item) =>
      String(item.payment_status || "").toLowerCase() !== "current"
  ).length;

  const severeAccounts = records.filter(
    (item) =>
      String(item.delinquency_level || "").toLowerCase() === "severe"
  ).length;

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-yellow-400/80">
            QuickBooks Mirror Architecture
          </p>

          <h1 className="mt-3 text-5xl font-semibold tracking-tight">
            Accounting Mirror Test
          </h1>

          <p className="mt-4 max-w-5xl text-lg leading-8 text-slate-400">
            This validates HOA-safe accounting synchronization,
            owner balance visibility, delinquency classification,
            and operational accounting health across the Sunset
            Condominium Association mirror layer.
          </p>
        </div>

        <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/5 p-8 shadow-2xl shadow-black/20">
          <div className="grid gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-400">
                Association ID
              </label>

              <input
                value={associationId}
                onChange={(e) =>
                  setAssociationId(e.target.value)
                }
                placeholder="Paste association ID"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-yellow-400/40"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={runMirror}
                disabled={loading}
                className="rounded-2xl border border-yellow-400/30 bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 hover:bg-yellow-300 disabled:opacity-40"
              >
                {loading
                  ? "Syncing Accounting Mirror..."
                  : "Run Mirror Sync"}
              </button>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-400/10 p-6">
            <p className="text-red-200">{errorMessage}</p>
          </div>
        )}

        {records.length > 0 && (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <Metric
                label="Mirrored Accounts"
                value={records.length}
              />

              <Metric
                label="Total Balance"
                value={`$${totalBalance.toFixed(2)}`}
              />

              <Metric
                label="Balance Due"
                value={delinquentAccounts}
              />

              <Metric
                label="Severe Delinquency"
                value={severeAccounts}
                critical={severeAccounts > 0}
              />
            </div>

            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="border-b border-white/10 px-6 py-5">
                <h2 className="text-2xl font-semibold">
                  Mirrored Owner Balances
                </h2>
              </div>

              <div className="divide-y divide-white/10">
                {records.map((record) => (
                  <BalanceRow
                    key={
                      record.id ||
                      `${record.association_id}-${record.unit_number}`
                    }
                    record={record}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
              <h2 className="text-2xl font-semibold text-emerald-200">
                Accounting Mirror Infrastructure Active
              </h2>

              <p className="mt-4 max-w-5xl leading-8 text-slate-300">
                SPM is now maintaining a persistent HOA-safe
                accounting visibility layer capable of supporting
                live QuickBooks synchronization, delinquency
                tracking, reconciliation workflows, payment
                automation, and future accounting intelligence.
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value, critical }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        critical
          ? "border-red-400/20 bg-red-400/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-sm text-slate-400">{label}</p>

      <p
        className={`mt-3 text-3xl font-semibold ${
          critical ? "text-red-300" : "text-yellow-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function BalanceRow({ record }) {
  const current =
    String(record.payment_status || "").toLowerCase() === "current";

  const health = String(
    record.account_health || "healthy"
  ).toLowerCase();

  const delinquency = String(
    record.delinquency_level || "current"
  ).toLowerCase();

  return (
    <div className="px-6 py-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

        <div className="min-w-[220px]">
          <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70">
            Unit {record.unit_number}
          </p>

          <h3 className="mt-2 text-2xl font-semibold">
            {record.owner_name}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Account #{record.account_number}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-6">

          <BalanceField
            label="Balance"
            value={`$${Number(
              record.current_balance || 0
            ).toFixed(2)}`}
          />

          <BalanceField
            label="Monthly"
            value={`$${Number(
              record.monthly_assessment || 0
            ).toFixed(2)}`}
          />

          <BalanceField
            label="Last Payment"
            value={record.last_payment_date || "N/A"}
          />

          <StatusBadge
            label="Status"
            value={current ? "Current" : "Balance Due"}
            healthy={current}
          />

          <StatusBadge
            label="Delinquency"
            value={delinquency}
            healthy={delinquency === "current"}
            warning={delinquency === "attention"}
            elevated={delinquency === "elevated"}
            critical={delinquency === "severe"}
          />

          <StatusBadge
            label="Health"
            value={health}
            healthy={health === "healthy"}
            warning={health === "watch"}
            critical={health === "critical"}
          />

        </div>
      </div>
    </div>
  );
}

function BalanceField({ label, value }) {
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

function StatusBadge({
  label,
  value,
  healthy,
  warning,
  elevated,
  critical,
}) {
  let styles =
    "border-white/10 bg-black/20 text-slate-300";

  if (healthy) {
    styles =
      "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (warning) {
    styles =
      "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  if (elevated) {
    styles =
      "border-orange-400/30 bg-orange-400/10 text-orange-300";
  }

  if (critical) {
    styles =
      "border-red-400/30 bg-red-400/10 text-red-300";
  }

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

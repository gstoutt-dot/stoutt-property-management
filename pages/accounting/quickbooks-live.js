// /pages/accounting/quickbooks-live.js

import { useState } from "react";

const ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

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
        `/api/accounting/quickbooks/sync-all?association_id=${ASSOCIATION_ID}`
      );

      const data = await response.json();

      if (!response.ok && response.status !== 207) {
        throw new Error(data?.error || "QuickBooks sync failed.");
      }

      setSyncResult(data);
    } catch (err) {
      setError(err.message || "Unable to run QuickBooks sync.");
    } finally {
      setLoading(false);
    }
  }

  const summary =
    syncResult?.results?.financial_summary?.data?.board_summary || null;

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Live Accounting
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            QuickBooks Synchronization Center
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Live operational accounting connection for Sunset Condominium
            Association. This page pulls QuickBooks customers, invoices,
            payments, owner balances, and board financial summary data into SPM.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={runFullSync}
              disabled={loading}
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 disabled:opacity-50"
            >
              {loading ? "Synchronizing..." : "Run Live QuickBooks Sync"}
            </button>

            <a
              href={`/api/accounting/quickbooks/financial-summary?association_id=${ASSOCIATION_ID}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/15"
            >
              View Financial Summary JSON
            </a>
          </div>
        </header>

        {error && (
          <section className="rounded-3xl border border-red-400/30 bg-red-500/10 p-6 text-red-200">
            {error}
          </section>
        )}

        {summary && (
          <section className="grid gap-4 md:grid-cols-4">
            <MetricCard
              label="Total Balance"
              value={`$${Number(summary.totalBalance || 0).toLocaleString()}`}
            />
            <MetricCard
              label="Delinquent Accounts"
              value={summary.delinquentAccounts}
            />
            <MetricCard
              label="Critical Accounts"
              value={summary.criticalAccounts}
            />
            <MetricCard
              label="Risk Score"
              value={`${summary.collectionRiskScore || 0}%`}
            />
          </section>
        )}

        {syncResult && (
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold">Synchronization Result</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {Object.entries(syncResult.results || {}).map(([key, result]) => (
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

function MetricCard({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

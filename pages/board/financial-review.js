import Link from "next/link";
import {
  getSignalsByType,
  bosMetrics
} from "../../lib/bosData";

export default function FinancialReview() {

  const financialSignals = getSignalsByType("Financial");

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Financial Review
            </h1>
          </div>

          <nav className="hidden md:flex gap-4 text-sm text-slate-300">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/quickbooks-integration">QuickBooks</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
          </nav>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">

          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Financial Signal Feed Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Financial Review now reads from shared BOS signals.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Budget exceptions, operating variances and financial alerts
            are now being surfaced through the shared Board Operating
            System data layer.
          </p>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Financial Alerts
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosMetrics.financialAlerts}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              High Risk Items
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosMetrics.highRiskItems}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Operational Issues
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosMetrics.operationalIssues}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Open BOS Items
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosMetrics.openItems}
            </p>
          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">

          <h3 className="text-xl font-semibold">
            Active Financial Exceptions
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Signals originating from shared BOS financial data.
          </p>

          <div className="mt-6 space-y-4">

            {financialSignals.map(item => (
              <Link
                key={item.id}
                href={item.route}
                className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-amber-300/30"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                  {item.id} · Financial
                </p>

                <h4 className="mt-2 font-semibold">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm text-slate-400">
                  Next Action: {item.nextAction}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Owner: {item.owner}
                </p>

              </Link>
            ))}

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">

          <h3 className="text-xl font-semibold text-emerald-100">
            Future QuickBooks Data Feeds (Ready for Mapping)
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Budget Variance Feed
            </div>

            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Delinquency Watchlist
            </div>

            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Cash Position Snapshot
            </div>

            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Reserve Balance Signals
            </div>

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">

          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Financial Review is now connected to the shared BOS data layer.
            Financial signal routing is active.
          </p>

        </div>

      </section>

    </main>
  );
}

import Link from "next/link";
import { getSignalsByType, bosMetrics, aiEvents } from "../../lib/bosData";

export default function FinancialReview() {
  const financialSignals = getSignalsByType("Financial");

  const financialAiEvents = aiEvents.filter(
    (event) => event.route === "/board/financial-review"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Financial Review
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
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
            AI delinquency and balance inquiries now surface into Financial
            Review.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Financial Review now receives shared BOS financial signals and
            AI-captured owner balance or delinquency-related events.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Financial Alerts</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosMetrics.financialAlerts}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">AI Financial Events</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {financialAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">High Risk Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosMetrics.highRiskItems}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Open BOS Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosMetrics.openItems}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
              Active Financial Exceptions
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Signals originating from shared BOS financial data.
            </p>

            <div className="mt-6 space-y-4">
              {financialSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-amber-300/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {item.id} · Financial
                  </p>

                  <h4 className="mt-2 font-semibold">{item.title}</h4>

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

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              AI-Captured Financial Events
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              Owner balance, delinquency, and financial inquiries captured by
              the AI assistant.
            </p>

            <div className="mt-6 space-y-4">
              {financialAiEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                    {event.id} · {event.type}
                  </p>

                  <h4 className="mt-2 font-semibold">{event.event}</h4>

                  <p className="mt-2 text-sm text-slate-300">
                    Source: {event.source}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Status: {event.status} · Priority: {event.priority}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Future QuickBooks Data Feeds
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
            Financial Review now receives financial BOS signals and
            AI-generated delinquency or balance inquiry events.
          </p>
        </div>
      </section>
    </main>
  );
}

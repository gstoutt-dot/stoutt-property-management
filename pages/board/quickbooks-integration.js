import Link from "next/link";
import { bosSignals, aiEvents } from "../../lib/bosData";

export default function QuickBooksIntegration() {
  const financialSignals = bosSignals.filter(
    (item) => item.type === "Financial" || item.module === "Financial Review"
  );

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
              QuickBooks Integration
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/financial-review">Financial</Link>
            <Link href="/board/reserves">Reserves</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-emerald-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">
            Accounting Signal Layer Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            QuickBooks financial signals now support BOS oversight.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            This page prepares the operating layer for budget variance,
            delinquency, cash position, reserve balance, and invoice approval
            signals from QuickBooks.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Financial BOS Signals</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-300">
              {financialSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">AI Financial Events</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {financialAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-300/20 bg-amber-500/10 p-6">
            <p className="text-sm text-amber-100">Review Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-200">
              {
                financialSignals.filter((item) => item.status === "Board Review")
                  .length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">High-Risk Finance</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                financialSignals.filter(
                  (item) =>
                    item.riskLevel === "High" || item.riskLevel === "Critical"
                ).length
              }
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
              Financial Signal Mapping
            </h3>

            <div className="mt-6 space-y-4">
              {financialSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-emerald-300/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">
                    {item.id} · {item.module}
                  </p>

                  <h4 className="mt-2 font-semibold">{item.title}</h4>

                  <p className="mt-2 text-sm text-slate-400">
                    QuickBooks Mapping: budget variance, transaction detail,
                    reserve balance, delinquency, or approval workflow.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner} · Status: {item.status}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <h3 className="text-xl font-semibold text-emerald-100">
              Future QuickBooks Feeds
            </h3>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Budget Variance Feed
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Delinquency Watchlist
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Cash Position Snapshot
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Invoice Approval Routing
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Reserve Balance Feed
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Monthly Financial Close Status
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
          <h3 className="text-xl font-semibold text-violet-100">
            AI + Accounting Event Bridge
          </h3>

          <p className="mt-2 text-sm text-violet-100/70">
            AI-captured balance and delinquency inquiries can later be matched
            to QuickBooks owner-account data.
          </p>

          <div className="mt-6 space-y-4">
            {financialAiEvents.map((event) => (
              <Link
                key={event.id}
                href={event.route}
                className="block rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5 hover:border-violet-200/50"
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
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            QuickBooks Integration now maps financial BOS signals and
            AI-generated financial inquiries into the accounting oversight layer.
          </p>
        </div>
      </section>
    </main>
  );
}

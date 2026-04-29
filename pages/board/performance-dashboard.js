import Link from "next/link";
import { bosMetrics, bosSignals, getHighRiskSignals } from "../../lib/bosData";

export default function PerformanceDashboard() {
  const highRiskSignals = getHighRiskSignals();

  const metricCards = [
    {
      label: "Open BOS Items",
      value: bosMetrics.openItems,
      detail: "Active governance items across the board platform",
    },
    {
      label: "High-Risk Items",
      value: bosMetrics.highRiskItems,
      detail: "Items requiring board or management attention",
    },
    {
      label: "Overdue / Aging Items",
      value: bosMetrics.overdueItems,
      detail: "Items open longer than the expected threshold",
    },
    {
      label: "Legal Escalations",
      value: bosMetrics.legalEscalations,
      detail: "Governance matters requiring legal review",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>
            <h1 className="mt-2 text-2xl font-semibold">
              Performance Dashboard
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-white">
              Board Home
            </Link>
            <Link href="/board/workflow-engine" className="hover:text-white">
              Workflow
            </Link>
            <Link href="/board/command-center" className="hover:text-white">
              Command Center
            </Link>
            <Link href="/board/financial-review" className="hover:text-white">
              Financial
            </Link>
            <Link href="/board/compliance-legal-review" className="hover:text-white">
              Legal
            </Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Live BOS Metrics
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Governance performance now reads from the shared BOS data layer.
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300">
            This dashboard is no longer just a static page. It is now pulling
            active signals from the central Board Operating System file and
            displaying the current condition of the association governance
            environment.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {metricCards.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{card.label}</p>
              <p className="mt-3 text-4xl font-semibold text-amber-300">
                {card.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {card.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">High-Risk BOS Signals</h3>
            <p className="mt-2 text-sm text-slate-400">
              These items are being pulled from shared BOS data and can later be
              connected to real database records.
            </p>

            <div className="mt-6 space-y-4">
              {highRiskSignals.map((signal) => (
                <Link
                  key={signal.id}
                  href={signal.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900/80 p-5 transition hover:border-amber-300/40 hover:bg-slate-900"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                        {signal.id} · {signal.module}
                      </p>
                      <h4 className="mt-2 font-semibold">{signal.title}</h4>
                      <p className="mt-2 text-sm text-slate-400">
                        Next Action: {signal.nextAction}
                      </p>
                    </div>
                    <span className="rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs text-red-200">
                      {signal.riskLevel}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">All Active BOS Items</h3>
            <p className="mt-2 text-sm text-slate-400">
              This creates the first operating feed across modules.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-4 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                <span>Module</span>
                <span>Status</span>
                <span>Owner</span>
                <span>Risk</span>
              </div>

              {bosSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="grid grid-cols-4 border-t border-white/10 px-4 py-4 text-sm transition hover:bg-white/[0.04]"
                >
                  <span className="font-medium text-white">{item.module}</span>
                  <span className="text-slate-300">{item.status}</span>
                  <span className="text-slate-300">{item.owner}</span>
                  <span className="text-amber-300">{item.riskLevel}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>
          <p className="mt-3 text-slate-300">
            Performance Dashboard is now connected to the shared BOS data file.
            Next, we wire the Workflow Engine so it reads the same active item
            feed.
          </p>
        </div>
      </section>
    </main>
  );
}

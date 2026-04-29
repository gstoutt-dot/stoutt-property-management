import Link from "next/link";
import {
  bosMetrics,
  bosSignals,
  aiEvents,
  getHighRiskSignals,
  getSignalsByType,
} from "../../lib/bosData";

export default function CommandCenter() {
  const highRiskSignals = getHighRiskSignals();
  const legalSignals = getSignalsByType("Legal");
  const financialSignals = getSignalsByType("Financial");
  const operationalSignals = getSignalsByType("Operations");

  const commandMetrics = [
    {
      label: "Total Active Signals",
      value: bosMetrics.openItems,
      detail: "All tracked BOS items",
    },
    {
      label: "High-Risk / Critical",
      value: bosMetrics.highRiskItems,
      detail: "Board-sensitive matters",
    },
    {
      label: "AI Events",
      value: bosMetrics.aiEvents,
      detail: "Voice assistant events surfaced into BOS",
    },
    {
      label: "Financial Alerts",
      value: financialSignals.length,
      detail: "Treasurer / budget review",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Command Center</h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
            <Link href="/board/financial-review">Financial</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Executive Signal Aggregation
          </p>

          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Command Center now sees BOS signals and AI assistant events.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Legal, financial, operational, and AI-generated events now surface
            into one executive view for board visibility.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {commandMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-3 text-4xl font-semibold text-amber-300">
                {metric.value}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
            <h3 className="text-xl font-semibold text-red-100">
              High-Risk Command Signals
            </h3>

            <div className="mt-6 space-y-4">
              {highRiskSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-red-300/20 bg-slate-950/60 p-5 transition hover:border-red-200/50"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-red-200">
                    {item.id} · {item.module}
                  </p>
                  <h4 className="mt-2 font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">
                    {item.nextAction}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
            <h3 className="text-xl font-semibold text-amber-100">
              Legal / Financial Watchlist
            </h3>

            <div className="mt-6 space-y-4">
              {[...legalSignals, ...financialSignals].map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-amber-300/20 bg-slate-950/60 p-5 transition hover:border-amber-200/50"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200">
                    {item.id} · {item.type}
                  </p>
                  <h4 className="mt-2 font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">
                    Owner: {item.owner}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-sky-400/20 bg-sky-500/10 p-6">
            <h3 className="text-xl font-semibold text-sky-100">
              Operational Signals
            </h3>

            <div className="mt-6 space-y-4">
              {operationalSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-sky-300/20 bg-slate-950/60 p-5 transition hover:border-sky-200/50"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-200">
                    {item.id} · {item.module}
                  </p>
                  <h4 className="mt-2 font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-300">
                    Due: {item.dueDate}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
          <h3 className="text-xl font-semibold text-violet-100">
            AI Assistant Event Feed
          </h3>

          <p className="mt-2 text-sm text-violet-100/70">
            Events generated by the AI voice assistant now surface into Command
            Center.
          </p>

          <div className="mt-6 space-y-4">
            {aiEvents.map((event) => (
              <Link
                key={event.id}
                href={event.route}
                className="block rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5 transition hover:border-violet-200/50"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                  {event.id} · {event.type}
                </p>

                <h4 className="mt-2 font-semibold">{event.event}</h4>

                <p className="mt-2 text-sm text-slate-300">
                  Source: {event.source} · Status: {event.status}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-semibold">Full BOS Signal Feed</h3>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-5 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>ID</span>
              <span>Module</span>
              <span>Type</span>
              <span>Status</span>
              <span>Risk</span>
            </div>

            {bosSignals.map((item) => (
              <Link
                key={item.id}
                href={item.route}
                className="grid grid-cols-5 border-t border-white/10 px-4 py-4 text-sm transition hover:bg-white/[0.04]"
              >
                <span className="font-medium text-amber-300">{item.id}</span>
                <span className="text-white">{item.module}</span>
                <span className="text-slate-300">{item.type}</span>
                <span className="text-slate-300">{item.status}</span>
                <span className="text-amber-300">{item.riskLevel}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>
          <p className="mt-3 text-slate-300">
            Command Center now receives BOS operational signals and AI assistant
            events. The executive operating layer is active.
          </p>
        </div>
      </section>
    </main>
  );
}

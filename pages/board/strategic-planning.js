import Link from "next/link";
import { bosSignals } from "../../lib/bosData";

export default function StrategicPlanning() {
  const planningSignals = bosSignals.filter(
    (item) =>
      item.type === "Financial" ||
      item.type === "Risk" ||
      item.riskLevel === "High" ||
      item.riskLevel === "Critical"
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
              Strategic Planning
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/financial-review">Financial</Link>
            <Link href="/board/insurance-risk">Risk</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Planning Signal Layer Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Strategic planning now reads live governance signals.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Financial risk, exposure signals, and board-sensitive issues can
            now surface into long-range planning analysis.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Planning Signals</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {planningSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">High-Risk Inputs</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                planningSignals.filter(
                  (item) =>
                    item.riskLevel === "High" ||
                    item.riskLevel === "Critical"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-amber-300/20 bg-amber-500/10 p-6">
            <p className="text-sm text-amber-100">Financial Inputs</p>
            <p className="mt-3 text-4xl font-semibold text-amber-200">
              {
                planningSignals.filter(
                  (item) => item.type === "Financial"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">Future Planning Feeds</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-200">4</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
              Planning Signal Queue
            </h3>

            <div className="mt-6 space-y-4">
              {planningSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-amber-300/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {item.id} · {item.type}
                  </p>

                  <h4 className="mt-2 font-semibold">{item.title}</h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Planning Use: Consider implications for reserves,
                    policy, priorities, and long-range capital planning.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner} · Risk: {item.riskLevel}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <h3 className="text-xl font-semibold text-emerald-100">
              Future Planning Feeds
            </h3>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Reserve Strategy Modeling
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Capital Project Forecasting
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Risk Scenario Planning
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Long-Range Budget Planning Feed
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Strategic Planning now receives financial and risk-sensitive
            governance signals.
          </p>
        </div>
      </section>
    </main>
  );
}

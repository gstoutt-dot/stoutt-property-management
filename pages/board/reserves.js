import Link from "next/link";
import { bosSignals } from "../../lib/bosData";

export default function Reserves() {
  const reserveSignals = bosSignals.filter(
    (item) =>
      item.module === "Reserves" ||
      item.type === "Financial" ||
      item.title.toLowerCase().includes("reserve")
  );

  const highRiskReserveRelated = reserveSignals.filter(
    (item) => item.riskLevel === "High" || item.riskLevel === "Critical"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Reserves</h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/financial-review">Financial</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
            <Link href="/board/command-center">Command Center</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Reserve Oversight Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Reserve issues now connect to financial governance signals.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Reserve planning can now surface financial alerts, funding risks,
            and board-sensitive capital planning items from the shared BOS data
            layer.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Reserve Related Signals</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {reserveSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">High Risk</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {highRiskReserveRelated.length}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">Future Funding Feeds</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-200">4</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Board Review Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {
                reserveSignals.filter((item) => item.status === "Board Review")
                  .length
              }
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
              Reserve / Financial Signal Queue
            </h3>

            <div className="mt-6 space-y-4">
              {reserveSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-amber-300/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {item.id} · {item.module}
                  </p>

                  <h4 className="mt-2 font-semibold">{item.title}</h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Next Action: {item.nextAction}
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
              Future Reserve Data Feeds
            </h3>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Reserve Study Component Schedule
              </div>
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Funding Level Monitoring
              </div>
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Capital Project Approval Queue
              </div>
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                QuickBooks Reserve Balance Feed
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Reserves now connects to financial governance signals and is ready
            for future reserve study and QuickBooks balance feeds.
          </p>
        </div>
      </section>
    </main>
  );
}

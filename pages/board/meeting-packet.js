import Link from "next/link";
import {
  bosSignals,
  getHighRiskSignals,
  getSignalsByType
} from "../../lib/bosData";

export default function MeetingPacket() {

  const highRiskSignals = getHighRiskSignals();
  const financialSignals = getSignalsByType("Financial");
  const legalSignals = getSignalsByType("Legal");

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Meeting Packet
            </h1>
          </div>

          <nav className="hidden md:flex gap-4 text-sm text-slate-300">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/financial-review">Financial</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
          </nav>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">

          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Packet Assembly Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Board packet now pulls live governance signals.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Meeting Packet now assembles agenda-sensitive matters from the
            shared Board Operating System data layer.
          </p>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Agenda Items
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {bosSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">
              High-Risk Items
            </p>

            <p className="mt-3 text-4xl font-semibold text-red-200">
              {highRiskSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-amber-300/20 bg-amber-500/10 p-6">
            <p className="text-sm text-amber-100">
              Financial Matters
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-200">
              {financialSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">
              Legal Matters
            </p>

            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {legalSignals.length}
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6">

            <h3 className="text-xl font-semibold text-red-100">
              Executive Session Items
            </h3>

            <div className="mt-6 space-y-4">

              {highRiskSignals.map(item => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-red-300/20 bg-slate-950/60 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-red-200">
                    {item.id}
                  </p>

                  <h4 className="mt-2 font-semibold">
                    {item.title}
                  </h4>
                </Link>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">

            <h3 className="text-xl font-semibold text-amber-100">
              Financial Agenda
            </h3>

            <div className="mt-6 space-y-4">

              {financialSignals.map(item => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-amber-300/20 bg-slate-950/60 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200">
                    {item.id}
                  </p>

                  <h4 className="mt-2 font-semibold">
                    {item.title}
                  </h4>
                </Link>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">

            <h3 className="text-xl font-semibold text-violet-100">
              Legal Agenda
            </h3>

            <div className="mt-6 space-y-4">

              {legalSignals.map(item => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                    {item.id}
                  </p>

                  <h4 className="mt-2 font-semibold">
                    {item.title}
                  </h4>
                </Link>
              ))}

            </div>

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">

          <h3 className="text-xl font-semibold">
            Full Packet Feed
          </h3>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">

            <div className="grid grid-cols-4 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>Module</span>
              <span>Status</span>
              <span>Owner</span>
              <span>Risk</span>
            </div>

            {bosSignals.map(item => (
              <Link
                key={item.id}
                href={item.route}
                className="grid grid-cols-4 border-t border-white/10 px-4 py-4 text-sm"
              >
                <span>{item.module}</span>
                <span>{item.status}</span>
                <span>{item.owner}</span>
                <span>{item.riskLevel}</span>
              </Link>
            ))}

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">

          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Meeting Packet now assembles live governance signals into
            agenda-ready packet structure.
          </p>

        </div>

      </section>

    </main>
  );
}

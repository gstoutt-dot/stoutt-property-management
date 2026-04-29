import Link from "next/link";
import {
  getSignalsByType,
  bosSignals
} from "../../lib/bosData";

export default function LegalReview() {

  const legalSignals = getSignalsByType("Legal");

  const escalatedViolations = bosSignals.filter(
    item =>
      item.module === "Violations" &&
      item.status === "Escalation Review"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>
            <h1 className="mt-2 text-2xl font-semibold">
              Compliance Legal Review
            </h1>
          </div>

          <nav className="hidden md:flex gap-4 text-sm text-slate-300">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/violation-review">Violations</Link>
          </nav>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">

          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Escalation Routing Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Violations now feed Legal Review.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Compliance Legal Review is now reading escalated violations
            directly from the shared BOS data layer. Governance escalation
            routing is active.
          </p>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Escalated Violations
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {escalatedViolations.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Counsel Review Items
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {legalSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Total Active Matters
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {escalatedViolations.length + legalSignals.length}
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6">

            <h3 className="text-xl font-semibold text-red-100">
              Escalated Violations Queue
            </h3>

            <p className="mt-2 text-sm text-red-100/70">
              These items originated in the Violations module.
            </p>

            <div className="mt-6 space-y-4">

              {escalatedViolations.map(item => (
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

                  <p className="mt-2 text-sm text-slate-300">
                    Next Action: {item.nextAction}
                  </p>
                </Link>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">

            <h3 className="text-xl font-semibold text-amber-100">
              Counsel Review Queue
            </h3>

            <p className="mt-2 text-sm text-amber-100/70">
              Matters flagged for legal review.
            </p>

            <div className="mt-6 space-y-4">

              {legalSignals.map(item => (
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

                  <p className="mt-2 text-sm text-slate-300">
                    Owner: {item.owner}
                  </p>
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
            Violations escalation routing into Legal Review is active.
            Governance escalation loop is now connected.
          </p>

        </div>

      </section>

    </main>
  );
}

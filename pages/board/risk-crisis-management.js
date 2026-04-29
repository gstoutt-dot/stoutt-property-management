import Link from "next/link";
import { bosSignals, aiEvents } from "../../lib/bosData";

export default function RiskCrisisManagement() {
  const crisisSignals = bosSignals.filter(
    (item) =>
      item.riskLevel === "Critical" ||
      item.riskLevel === "High" ||
      item.type === "Risk" ||
      item.type === "Legal"
  );

  const crisisAiEvents = aiEvents.filter(
    (event) =>
      event.priority === "High" ||
      event.status === "Escalated" ||
      event.type === "Rule Violation"
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
              Risk-Crisis Management
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/insurance-risk">Insurance & Risk</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
            <Link href="/board/action-items">Action Items</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-red-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-red-300">
            Crisis Signal Layer Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Critical and high-risk BOS signals now route into crisis oversight.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Risk-Crisis Management now receives legal, risk, high-priority, and
            AI-escalated events from the shared Board Operating System layer.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">Crisis Signals</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {crisisSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">AI Escalations</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {crisisAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Legal / Risk Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {
                crisisSignals.filter(
                  (item) => item.type === "Legal" || item.type === "Risk"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">Future Crisis Feeds</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-200">4</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
            <h3 className="text-xl font-semibold text-red-100">
              Crisis Signal Queue
            </h3>

            <div className="mt-6 space-y-4">
              {crisisSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-red-300/20 bg-slate-950/60 p-5 hover:border-red-200/50"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-red-200">
                    {item.id} · {item.type}
                  </p>

                  <h4 className="mt-2 font-semibold">{item.title}</h4>

                  <p className="mt-2 text-sm text-slate-300">
                    Crisis Action: Assess exposure, board notification, legal
                    review, and urgent response path.
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Owner: {item.owner} · Risk: {item.riskLevel}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              AI Escalation Queue
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              High-priority AI-originated items that may require crisis review.
            </p>

            <div className="mt-6 space-y-4">
              {crisisAiEvents.map((event) => (
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
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Future Crisis Response Feeds
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Emergency Incident Timeline
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Board Notification Log
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Legal / Insurance Escalation Path
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Vendor Emergency Dispatch Feed
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Risk-Crisis Management now receives critical BOS signals and
            high-priority AI escalation events.
          </p>
        </div>
      </section>
    </main>
  );
}

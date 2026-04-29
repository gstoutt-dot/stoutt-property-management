import Link from "next/link";
import { bosSignals, aiEvents } from "../../lib/bosData";

export default function InsuranceRisk() {
  const riskSignals = bosSignals.filter(
    (item) =>
      item.type === "Risk" ||
      item.riskLevel === "High" ||
      item.riskLevel === "Critical"
  );

  const riskAiEvents = aiEvents.filter(
    (event) =>
      event.type === "Resident Inquiry" ||
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
              Insurance & Risk
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
            <Link href="/board/records-management">Records</Link>
            <Link href="/board/strategic-planning">Planning</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Risk Signal Routing Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Insurance and risk oversight now reads BOS signals.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Risk-sensitive governance signals and AI-originated incidents can
            now surface into insurance and exposure oversight.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Risk Signals</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {riskSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">AI Risk Events</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {riskAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">Critical Exposure Items</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                riskSignals.filter(
                  (item) => item.riskLevel === "Critical"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">Future Risk Feeds</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-200">4</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
              Risk Oversight Queue
            </h3>

            <div className="mt-6 space-y-4">
              {riskSignals.map((item) => (
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
                    Risk Action: Review exposure implications and required
                    response.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner} · Risk: {item.riskLevel}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              AI Incident Intake Queue
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              AI-originated events that may require risk review.
            </p>

            <div className="mt-6 space-y-4">
              {riskAiEvents.map((event) => (
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
            Future Risk Feeds
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Insurance Renewal Tracking
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Claim Event Monitoring
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Incident Log Feed
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Exposure Risk Dashboard
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Insurance & Risk now receives risk-sensitive governance signals and
            AI-originated incident events.
          </p>
        </div>
      </section>
    </main>
  );
}

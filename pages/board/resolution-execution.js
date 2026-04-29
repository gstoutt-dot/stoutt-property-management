import Link from "next/link";
import { bosSignals, aiEvents } from "../../lib/bosData";

export default function ResolutionExecution() {

  const resolutionSignals = bosSignals.filter(
    (item) =>
      item.status === "Board Review" ||
      item.status === "Counsel Review Needed" ||
      item.status === "Escalation Review"
  );

  const aiResolutionEvents = aiEvents.filter(
    (event) =>
      event.status === "Needs Review" ||
      event.status === "Escalated"
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
              Resolution Execution
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/action-items">Action Items</Link>
            <Link href="/board/meeting-packet">Meeting Packet</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
          </nav>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">

          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Resolution Routing Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Board decisions now connect to execution tracking.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Resolution Execution now receives governance matters and
            AI-originated escalation items requiring board action and
            tracked implementation.
          </p>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Resolution Items
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {resolutionSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">
              AI Escalation Items
            </p>

            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {aiResolutionEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">
              High Priority
            </p>

            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                resolutionSignals.filter(
                  item =>
                    item.priority === "High" ||
                    item.priority === "Critical"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">
              Execution Feeds
            </p>

            <p className="mt-3 text-4xl font-semibold text-emerald-200">
              4
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

            <h3 className="text-xl font-semibold">
              Resolution Queue
            </h3>

            <div className="mt-6 space-y-4">

              {resolutionSignals.map(item => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {item.id} · {item.module}
                  </p>

                  <h4 className="mt-2 font-semibold">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Execution Action: Track resolution authorization,
                    assignments, and implementation completion.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner} · Status: {item.status}
                  </p>

                </Link>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">

            <h3 className="text-xl font-semibold text-violet-100">
              AI Escalation Resolution Queue
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              AI events that may require board resolution.
            </p>

            <div className="mt-6 space-y-4">

              {aiResolutionEvents.map(event => (
                <Link
                  key={event.id}
                  href={event.route}
                  className="block rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                    {event.id} · {event.type}
                  </p>

                  <h4 className="mt-2 font-semibold">
                    {event.event}
                  </h4>

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
            Future Resolution Feeds
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Resolution Vote Log
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Assignment Completion Feed
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Implementation Tracking
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Resolution Archive Register
            </div>

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">

          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Resolution Execution now closes the loop between issues,
            board action, and implementation tracking.
          </p>

        </div>

      </section>

    </main>
  );
}

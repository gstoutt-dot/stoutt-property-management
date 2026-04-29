import Link from "next/link";
import { bosSignals, aiEvents } from "../../lib/bosData";

export default function MaintenanceReview() {
  const maintenanceSignals = bosSignals.filter(
    (item) => item.module === "Maintenance" || item.type === "Operations"
  );

  const maintenanceAiEvents = aiEvents.filter(
    (event) => event.route === "/board/maintenance-review"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Maintenance Review</h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/vendors">Vendors</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Maintenance Routing Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            AI maintenance events now route into board review.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Resident maintenance requests captured by the AI assistant can now
            surface directly into the Maintenance Review queue.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Maintenance Signals</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {maintenanceSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">AI Maintenance Events</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {maintenanceAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Total Active Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {maintenanceSignals.length + maintenanceAiEvents.length}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">Maintenance Signal Queue</h3>

            <div className="mt-6 space-y-4">
              {maintenanceSignals.map((item) => (
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
                    Owner: {item.owner} · Due: {item.dueDate}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              AI-Captured Maintenance Requests
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              These items originated from the AI assistant.
            </p>

            <div className="mt-6 space-y-4">
              {maintenanceAiEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
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
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>
          <p className="mt-3 text-slate-300">
            Maintenance Review now receives operational BOS signals and
            AI-captured maintenance events.
          </p>
        </div>
      </section>
    </main>
  );
}

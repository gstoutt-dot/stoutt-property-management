import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/bosClient"; 

export default function CommandCenter() {
  const [actions, setActions] = useState([]);
  const [events, setEvents] = useState([]);

  async function loadData() {
    const { data: actionsData } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: eventsData } = await supabase
      .from("bos_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    setActions(actionsData || []);
    setEvents(eventsData || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  const open = actions.filter((a) => a.status === "open").length;
  const inProgress = actions.filter((a) => a.status === "in_progress").length;
  const completed = actions.filter((a) => a.status === "completed").length;
  const highPriority = actions.filter((a) => a.priority === "high").length;
  const latestActions = actions.slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide text-amber-300">
            Stoutt BOS
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-amber-300">Board</Link>
            <Link href="/board/command-center" className="text-amber-300">Command Center</Link>
            <Link href="/board/workflow-engine" className="hover:text-amber-300">Workflow</Link>
            <Link href="/board/action-items" className="hover:text-amber-300">Action Items</Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">Violations</Link>
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_36%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operating System
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Command Center
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Live executive visibility into BOS actions, workflow activity,
            status movement, board accountability, and production persistence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/board/workflow-engine"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300"
            >
              Open Workflow Engine
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-amber-300 hover:text-amber-300"
            >
              View Action Items
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              { label: "Total BOS Actions", value: actions.length },
              { label: "Open", value: open },
              { label: "In Progress", value: inProgress },
              { label: "Completed", value: completed },
              { label: "High Priority", value: highPriority },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
              >
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-3 text-4xl font-bold text-amber-300">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link href="/board/workflow-engine">
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold text-white">Workflow Engine</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Execute, track, and escalate operational workflows across BOS.
              </p>
            </div>
          </Link>

          <Link href="/board/action-items">
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold text-white">Action Items</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                View live board-level accountability, assignments, and status changes.
              </p>
            </div>
          </Link>

          <Link href="/board/violation-review">
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold text-white">Violation Review</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Compliance oversight, notices, enforcement, and owner communication.
              </p>
            </div>
          </Link>

          <Link href="/board/live-data-verification">
            <div className="h-full rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 transition hover:border-amber-300">
              <h3 className="text-xl font-semibold text-white">Live Data Verification</h3>
              <p className="mt-3 text-sm leading-6 text-amber-100/80">
                Confirm production Supabase writes and BOS event audit history.
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Event Stream
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  System Activity Feed
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold text-amber-200">
                Live Events
              </span>
            </div>

            {events.length === 0 ? (
              <p className="text-sm text-slate-400">No events yet.</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                  >
                    <p className="font-semibold text-white">{event.message}</p>
                    <p className="mt-2 text-xs text-slate-400">
                      {event.module || "BOS"} · {event.event_type || "event"} ·{" "}
                      {new Date(event.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Risk Signals
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Operational Watchlist
              </h2>

              <div className="mt-6 space-y-3 text-sm leading-6 text-slate-300">
                <p>Open action queue: {open}</p>
                <p>In-progress workflows: {inProgress}</p>
                <p>High priority items: {highPriority}</p>
                <p>Recent system events: {events.length}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
                System Status
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Production Live
              </h2>
              <p className="mt-4 text-sm leading-7 text-amber-50/90">
                Command Center is reading live actions and event history from Supabase.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Latest Actions
              </p>

              <div className="mt-5 space-y-4">
                {latestActions.length === 0 ? (
                  <p className="text-sm text-slate-400">No actions created yet.</p>
                ) : (
                  latestActions.map((action) => (
                    <div key={action.id} className="border-b border-white/10 pb-3 last:border-b-0">
                      <p className="text-sm font-semibold text-white">{action.title}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {action.status || "open"} · {action.module || "BOS"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

export default function CommandCenter() {
  const [actions, setActions] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommandCenter();
  }, []);

  async function loadCommandCenter() {
    setLoading(true);

    const { data: actionData } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: eventData } = await supabase
      .from("bos_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    setActions(actionData || []);
    setEvents(eventData || []);
    setLoading(false);
  }

  const metrics = useMemo(() => {
    const open = actions.filter((a) => a.status === "open").length;
    const inProgress = actions.filter((a) => a.status === "in_progress").length;
    const boardReview = actions.filter((a) => a.status === "board_review").length;
    const approved = actions.filter((a) => a.status === "approved").length;
    const completed = actions.filter((a) => a.status === "completed").length;
    const highPriority = actions.filter((a) => a.priority === "high").length;

    return {
      total: actions.length,
      open,
      inProgress,
      boardReview,
      approved,
      completed,
      highPriority,
    };
  }, [actions]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900 px-8 py-12">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-amber-400">
          Board Operating System
        </p>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          Command Center
        </h1>

        <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
          Real-time operational intelligence across workflow activity, board
          decisions, escalation status, and association-level risk signals.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/board/action-center"
            className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg hover:bg-amber-300"
          >
            Open Action Center
          </Link>

          <button
            onClick={loadCommandCenter}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-200 hover:bg-white/10"
          >
            Refresh Data
          </button>
        </div>
      </section>

      {/* METRICS */}
      <section className="px-8 py-10">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading live BOS data...
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
              <Metric label="Total Items" value={metrics.total} />
              <Metric label="Open" value={metrics.open} />
              <Metric label="In Progress" value={metrics.inProgress} />
              <Metric label="Awaiting Board" value={metrics.boardReview} highlight />
              <Metric label="Approved" value={metrics.approved} />
              <Metric label="Completed" value={metrics.completed} />
            </div>

            {/* EVENTS */}
            <div className="mt-10 grid gap-8 xl:grid-cols-2">
              <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Recent Board Activity</h3>

                <div className="space-y-4">
                  {events.length === 0 ? (
                    <p className="text-slate-400">No events recorded yet.</p>
                  ) : (
                    events.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                      >
                        <p className="font-semibold">{event.message}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(event.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* ACTION LIST */}
              <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">
                  Awaiting Board Decisions
                </h3>

                <div className="space-y-4">
                  {actions
                    .filter((a) => a.status === "board_review")
                    .slice(0, 5)
                    .map((action) => (
                      <div
                        key={action.id}
                        className="rounded-2xl border border-purple-400/30 bg-purple-400/10 p-4"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold">{action.title}</h4>
                          <span className="text-xs text-purple-300">
                            Board Review
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">
                          {action.association_name}
                        </p>
                      </div>
                    ))}
                </div>

                <Link
                  href="/board/action-center"
                  className="mt-6 inline-block text-amber-300 text-sm font-medium"
                >
                  Go to Action Center →
                </Link>
              </section>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${
        highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-slate-900/70"
      }`}
    >
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>
      <p className="mt-4 text-4xl font-black text-white">{value}</p>
    </div>
  );
}

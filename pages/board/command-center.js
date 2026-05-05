import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

function isBoardRelevantEvent(event) {
  const message = String(event?.message || "").toLowerCase();

  return (
    message.includes("board approved") ||
    message.includes("board rejected") ||
    message.includes("requested more information") ||
    message.includes("board review") ||
    message.includes("routed to board")
  );
}

function formatStatus(status) {
  return String(status || "open").replace("_", " ");
}

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
      .limit(50);

    setActions(actionData || []);
    setEvents((eventData || []).filter(isBoardRelevantEvent).slice(0, 10));
    setLoading(false);
  }

  const metrics = useMemo(() => {
    const boardReview = actions.filter((a) => a.status === "board_review").length;
    const approved = actions.filter((a) => a.status === "approved").length;
    const rejected = actions.filter((a) => a.status === "rejected").length;
    const completed = actions.filter((a) => a.status === "completed").length;
    const highPriority = actions.filter(
      (a) => a.priority === "high" && a.status !== "completed"
    ).length;

    return {
      total: actions.length,
      boardReview,
      approved,
      rejected,
      completed,
      highPriority,
    };
  }, [actions]);

  const awaitingBoard = actions.filter((a) => a.status === "board_review");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900 px-8 py-12">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-amber-400">
          Board Operating System
        </p>

        <h1 className="text-5xl font-black tracking-tight md:text-7xl">
          Command Center
        </h1>

        <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
          Board-level intelligence focused only on decisions, approvals,
          escalations, and items requiring board attention.
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

      <section className="px-8 py-10">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading board intelligence...
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
              <Metric label="Total Items" value={metrics.total} />
              <Metric label="Awaiting Board" value={metrics.boardReview} highlight />
              <Metric label="Approved" value={metrics.approved} />
              <Metric label="Rejected" value={metrics.rejected} />
              <Metric label="Completed" value={metrics.completed} />
              <Metric label="High Priority" value={metrics.highPriority} danger />
            </div>

            <div className="mt-10 grid gap-8 xl:grid-cols-2">
              <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
                <h3 className="mb-6 text-2xl font-bold">
                  Board Decision History
                </h3>

                <div className="space-y-4">
                  {events.length === 0 ? (
                    <p className="text-slate-400">
                      No board decision activity recorded yet.
                    </p>
                  ) : (
                    events.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                      >
                        <p className="font-semibold text-white">
                          {event.message || "Board activity recorded"}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          {event.created_at
                            ? new Date(event.created_at).toLocaleString()
                            : "No date"}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">
                      Awaiting Board Decisions
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Items currently routed to the board for action.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {awaitingBoard.length === 0 ? (
                    <p className="text-slate-400">
                      No items are currently awaiting board action.
                    </p>
                  ) : (
                    awaitingBoard.slice(0, 6).map((action) => (
                      <div
                        key={action.id}
                        className="rounded-2xl border border-purple-400/30 bg-purple-400/10 p-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-white">
                              {action.title || "Untitled Board Item"}
                            </h4>

                            <p className="mt-1 text-sm text-slate-400">
                              {action.association_name || "Association not listed"}
                            </p>
                          </div>

                          <span className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-semibold uppercase text-purple-300">
                            {formatStatus(action.status)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Link
                  href="/board/action-center"
                  className="mt-6 inline-block text-sm font-medium text-amber-300 hover:text-amber-200"
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

function Metric({ label, value, highlight, danger }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${
        danger
          ? "border-red-400/40 bg-red-400/10"
          : highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-slate-900/70"
      }`}
    >
      <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-4 text-4xl font-black ${
          danger ? "text-red-300" : highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

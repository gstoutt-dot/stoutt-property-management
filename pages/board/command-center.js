import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js"; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
    const completed = actions.filter((a) => a.status === "completed").length;
    const highPriority = actions.filter((a) => a.priority === "high").length;

    const activeHighRisk = actions.filter(
      (a) => a.priority === "high" && a.status !== "completed"
    ).length;

    return {
      total: actions.length,
      open,
      inProgress,
      completed,
      highPriority,
      activeHighRisk,
    };
  }, [actions]);

  const riskSignals = useMemo(() => {
    const signals = [];

    const highOpen = actions.filter(
      (a) => a.priority === "high" && a.status === "open"
    );

    const highInProgress = actions.filter(
      (a) => a.priority === "high" && a.status === "in_progress"
    );

    if (highOpen.length > 0) {
      signals.push({
        title: "High Priority Items Awaiting Action",
        detail: `${highOpen.length} high priority action item${
          highOpen.length === 1 ? "" : "s"
        } remain open.`,
        severity: "critical",
      });
    }

    if (highInProgress.length > 0) {
      signals.push({
        title: "Escalated Work In Progress",
        detail: `${highInProgress.length} escalated item${
          highInProgress.length === 1 ? "" : "s"
        } currently moving through workflow.`,
        severity: "warning",
      });
    }

    if (metrics.open > 3) {
      signals.push({
        title: "Open Item Volume Rising",
        detail: `${metrics.open} open items require board or management review.`,
        severity: "warning",
      });
    }

    if (signals.length === 0) {
      signals.push({
        title: "No Active Risk Signals",
        detail: "No high priority unresolved items are currently detected.",
        severity: "stable",
      });
    }

    return signals;
  }, [actions, metrics.open]);

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
          Real-time operational intelligence across action items, workflow
          movement, escalation status, and board-level risk signals.
        </p>
      </section>

      <section className="px-8 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">
              Live Intelligence Layer
            </p>
            <h2 className="mt-2 text-3xl font-bold">Operational Overview</h2>
          </div>

          <button
            onClick={loadCommandCenter}
            className="rounded-full bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
          >
            Refresh Command Center
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading live BOS data...
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
              <MetricCard label="Total Actions" value={metrics.total} />
              <MetricCard label="Open" value={metrics.open} />
              <MetricCard label="In Progress" value={metrics.inProgress} />
              <MetricCard label="Completed" value={metrics.completed} />
              <MetricCard label="High Priority" value={metrics.highPriority} alert />
              <MetricCard label="Active Risk" value={metrics.activeHighRisk} danger />
            </div>

            <div className="mt-10 grid gap-8 xl:grid-cols-3">
              <section className="xl:col-span-2 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                      Risk Signals
                    </p>
                    <h3 className="mt-2 text-3xl font-bold">
                      Board Attention Required
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {riskSignals.map((signal, index) => (
                    <div
                      key={index}
                      className={`rounded-2xl border p-5 ${
                        signal.severity === "critical"
                          ? "border-red-500/50 bg-red-500/10"
                          : signal.severity === "warning"
                          ? "border-amber-400/40 bg-amber-400/10"
                          : "border-emerald-400/30 bg-emerald-400/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-xl font-bold">{signal.title}</h4>
                          <p className="mt-2 text-slate-300">{signal.detail}</p>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                            signal.severity === "critical"
                              ? "bg-red-500 text-white"
                              : signal.severity === "warning"
                              ? "bg-amber-400 text-slate-950"
                              : "bg-emerald-500 text-white"
                          }`}
                        >
                          {signal.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                  Event Activity
                </p>
                <h3 className="mt-2 text-3xl font-bold">Live BOS Events</h3>

                <div className="mt-6 space-y-4">
                  {events.length === 0 ? (
                    <p className="text-slate-400">No events recorded yet.</p>
                  ) : (
                    events.map((event) => (
                      <div
                        key={event.id}
                        className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                      >
                        <p className="font-semibold text-white">
                          {event.message || "BOS event recorded"}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          {new Date(event.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                    Latest Actions
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">
                    Current BOS Action Register
                  </h3>
                </div>
              </div>

              <div className="grid gap-4">
                {actions.length === 0 ? (
                  <p className="text-slate-400">No action items found.</p>
                ) : (
                  actions.map((action) => (
                    <div
                      key={action.id}
                      className={`rounded-2xl border p-5 ${
                        action.priority === "high"
                          ? "border-red-500/50 bg-red-500/10"
                          : "border-white/10 bg-slate-950/70"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h4 className="text-xl font-bold">{action.title}</h4>
                          <p className="mt-2 text-sm text-slate-400">
                            Status:{" "}
                            <span className="font-bold text-amber-400">
                              {String(action.status || "open").replace(
                                "_",
                                " "
                              )}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                              action.priority === "high"
                                ? "bg-red-500 text-white"
                                : "bg-slate-700 text-white"
                            }`}
                          >
                            {action.priority || "normal"}
                          </span>

                          {action.priority === "high" &&
                            action.status !== "completed" && (
                              <span className="rounded-full bg-amber-400 px-3 py-1 text-xs font-bold uppercase text-slate-950">
                                At Risk
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function MetricCard({ label, value, alert, danger }) {
  return (
    <div
      className={`rounded-3xl border p-6 shadow-xl ${
        danger
          ? "border-red-500/50 bg-red-500/10"
          : alert
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-slate-900/70"
      }`}
    >
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-4 text-4xl font-black ${
          danger ? "text-red-400" : alert ? "text-amber-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

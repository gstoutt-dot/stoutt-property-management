import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const stages = [
  { key: "open", label: "Owner Intake", description: "New requests submitted by owners." },
  { key: "in_progress", label: "Manager Review", description: "Requests under management review." },
  { key: "board_review", label: "Board Review", description: "Items awaiting board decision." },
  { key: "approved", label: "Approved / Execution", description: "Approved items ready for scheduling or dispatch." },
  { key: "completed", label: "Completed", description: "Closed and completed requests." },
  { key: "rejected", label: "Rejected", description: "Declined or stopped workflow items." },
];

export default function WorkflowEngineLive() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);

    const { data } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    setItems(data || []);
    setLoading(false);
  }

  const metrics = useMemo(() => {
    const total = items.length;

    const counts = stages.reduce((acc, stage) => {
      acc[stage.key] = items.filter((item) => item.status === stage.key).length;
      return acc;
    }, {});

    const highPriority = items.filter(
      (item) => item.priority === "high" && item.status !== "completed"
    ).length;

    const bottleneck = stages
      .map((stage) => ({
        ...stage,
        count: counts[stage.key] || 0,
      }))
      .sort((a, b) => b.count - a.count)[0];

    return {
      total,
      counts,
      highPriority,
      bottleneck,
    };
  }, [items]);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            Live BOS Monitor
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Workflow Engine Live
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
            Live operational monitor showing where every BOS request currently
            sits across Owner, Manager, Board, Vendor, and completion stages.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={loadItems}
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Refresh Live Data
            </button>

            <Link
              href="/portal/workflow-engine"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-3 font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Static Workflow Map
            </Link>

            <Link
              href="/portal"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 hover:bg-white/10"
            >
              Portal Hub
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-slate-400">
            Loading live workflow data...
          </div>
        ) : (
          <>
            <div className="mb-8 grid gap-4 md:grid-cols-4">
              <Metric label="Total BOS Items" value={metrics.total} />
              <Metric
                label="Awaiting Board"
                value={metrics.counts.board_review || 0}
                highlight
              />
              <Metric
                label="Active High Priority"
                value={metrics.highPriority}
                danger
              />
              <Metric
                label="Largest Queue"
                value={metrics.bottleneck?.label || "None"}
              />
            </div>

            <section className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Live Pipeline
              </div>

              <h2 className="text-3xl font-bold">
                Request Movement Across the BOS
              </h2>

              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
                This page reads directly from Supabase and shows the live
                distribution of requests by status.
              </p>
            </section>

            <div className="mt-10 grid gap-6">
              {stages.map((stage, index) => {
                const count = metrics.counts[stage.key] || 0;
                const percentage =
                  metrics.total > 0 ? Math.round((count / metrics.total) * 100) : 0;

                return (
                  <div
                    key={stage.key}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30"
                  >
                    <div className="grid gap-6 lg:grid-cols-[90px_1fr_220px] lg:items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-xl font-black text-slate-950">
                        {index + 1}
                      </div>

                      <div>
                        <div className="mb-2 font-mono text-sm text-amber-300">
                          {stage.key}
                        </div>

                        <h3 className="text-3xl font-bold">{stage.label}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {stage.description}
                        </p>

                        <div className="mt-5">
                          <div className="mb-2 flex justify-between text-xs text-slate-400">
                            <span>Pipeline share</span>
                            <span>{percentage}%</span>
                          </div>

                          <div className="h-3 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-amber-400"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center">
                        <div className="text-sm text-slate-400">Current Items</div>
                        <div className="mt-2 text-5xl font-black text-white">
                          {count}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Recent Live Records
              </div>

              <h2 className="text-3xl font-bold">Latest BOS Items</h2>

              <div className="mt-6 space-y-4">
                {items.length === 0 ? (
                  <p className="text-slate-400">No BOS items found.</p>
                ) : (
                  items.slice(0, 8).map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {item.title || "Untitled Request"}
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            {item.association_name || "Association not listed"}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge>{item.status || "open"}</Badge>
                          <Badge muted>{item.priority || "normal"} priority</Badge>
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

function Metric({ label, value, highlight, danger }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        danger
          ? "border-red-400/40 bg-red-400/10"
          : highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="text-sm text-slate-400">{label}</div>

      <div
        className={`mt-2 text-2xl font-black ${
          danger ? "text-red-300" : highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Badge({ children, muted }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${
        muted
          ? "border-white/10 bg-white/5 text-slate-300"
          : "border-amber-400/30 bg-amber-400/10 text-amber-300"
      }`}
    >
      {children}
    </span>
  );
}

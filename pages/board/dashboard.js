import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BoardDashboard() {
  const [actions, setActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    setActions(data || []);
    setLastUpdated(new Date());
    setLoading(false);
  }

  const summary = useMemo(() => {
    const active = actions.filter((a) => a.status !== "completed");
    const highAttention = actions.filter(
      (a) => a.priority === "high" && a.status !== "completed"
    );
    const resolved = actions.filter((a) => a.status === "completed");

    return {
      active: active.length,
      highAttention: highAttention.length,
      resolved: resolved.length,
      total: actions.length,
    };
  }, [actions]);

  const attentionItems = actions.filter(
    (a) => a.priority === "high" && a.status !== "completed"
  );

  const inProgressItems = actions.filter((a) => a.status === "in_progress");

  const completedItems = actions
    .filter((a) => a.status === "completed")
    .slice(0, 5);

  function humanStatus(status) {
    if (status === "open") return "Awaiting Action";
    if (status === "in_progress") return "Work In Progress";
    if (status === "completed") return "Completed";
    return "Under Review";
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900 px-8 py-14">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-amber-400">
          Board Operating System
        </p>

        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Board Dashboard
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
              A clear, real-time view of community operations, highlighting what
              requires attention, what is being handled, and what has been
              resolved.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Last updated:{" "}
              {lastUpdated ? lastUpdated.toLocaleString() : "Loading..."}
            </p>
          </div>

          <button
            onClick={loadData}
            className="rounded-full bg-amber-400 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
          >
            Refresh Dashboard
          </button>
        </div>
      </section>

      <section className="px-8 py-10">
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
            Loading board dashboard...
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <SummaryCard label="Active Items" value={summary.active} />
              <SummaryCard
                label="Needs Attention"
                value={summary.highAttention}
                highlight
              />
              <SummaryCard label="Recently Resolved" value={summary.resolved} />
            </div>

            <p className="mt-6 text-slate-400">
              Management is actively overseeing {summary.active} open item
              {summary.active === 1 ? "" : "s"} across the community.
            </p>

            <section className="mt-12 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                Priority Review
              </p>

              <h2 className="mt-2 text-3xl font-bold">Attention Required</h2>

              <div className="mt-6">
                {attentionItems.length === 0 ? (
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6">
                    <h3 className="text-xl font-bold">
                      No urgent items require board attention.
                    </h3>
                    <p className="mt-2 text-slate-300">
                      Current open items are being managed within normal
                      operating priority.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {attentionItems.map((item) => (
                      <BoardItem
                        key={item.id}
                        item={item}
                        status={humanStatus(item.status)}
                        tone="danger"
                        message="This item has been elevated for immediate attention and is being actively reviewed by management."
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                Active Management
              </p>

              <h2 className="mt-2 text-3xl font-bold">Work In Progress</h2>

              <div className="mt-6">
                {inProgressItems.length === 0 ? (
                  <p className="text-slate-400">
                    No items are currently marked as work in progress.
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {inProgressItems.map((item) => (
                      <BoardItem
                        key={item.id}
                        item={item}
                        status={humanStatus(item.status)}
                        tone="progress"
                        message="Work has begun and this matter is actively being handled by management."
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-amber-400">
                Completed Work
              </p>

              <h2 className="mt-2 text-3xl font-bold">Recently Resolved</h2>

              <div className="mt-6">
                {completedItems.length === 0 ? (
                  <p className="text-slate-400">
                    No recently completed items are currently recorded.
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {completedItems.map((item) => (
                      <BoardItem
                        key={item.id}
                        item={item}
                        status="Completed"
                        tone="success"
                        message="This item has been successfully resolved and closed in the management workflow."
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function SummaryCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-3xl border p-6 shadow-xl ${
        highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-slate-900/70"
      }`}
    >
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-4 text-5xl font-black ${
          highlight ? "text-amber-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function BoardItem({ item, status, message, tone }) {
  const toneClasses = {
    danger: "border-red-500/40 bg-red-500/10",
    progress: "border-blue-500/30 bg-blue-500/10",
    success: "border-emerald-500/30 bg-emerald-500/10",
  };

  const badgeClasses = {
    danger: "bg-red-500 text-white",
    progress: "bg-blue-500 text-white",
    success: "bg-emerald-500 text-white",
  };

  return (
    <div
      className={`rounded-2xl border p-6 ${
        toneClasses[tone] || "border-white/10 bg-slate-950/70"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{item.title}</h3>

          <p className="mt-2 max-w-3xl text-slate-300">{message}</p>

          <p className="mt-4 text-sm font-semibold text-amber-400">
            Status: {status}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
            badgeClasses[tone] || "bg-slate-700 text-white"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

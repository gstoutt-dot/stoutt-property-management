import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BoardDashboard() {
  const [actions, setActions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    setActions(data || []);
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
    };
  }, [actions]);

  const attentionItems = actions.filter(
    (a) => a.priority === "high" && a.status !== "completed"
  );

  const inProgress = actions.filter(
    (a) => a.status === "in_progress"
  );

  const completed = actions.filter(
    (a) => a.status === "completed"
  ).slice(0, 5);

  function humanStatus(status) {
    if (status === "open") return "Awaiting Action";
    if (status === "in_progress") return "Work In Progress";
    if (status === "completed") return "Completed";
    return status;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* HEADER */}
      <section className="px-8 py-12 border-b border-white/10">
        <h1 className="text-5xl font-black">Board Dashboard</h1>
        <p className="mt-4 text-slate-300 text-lg max-w-3xl">
          A clear, real-time view of community operations, highlighting what requires attention and what is being actively managed.
        </p>
      </section>

      {/* SUMMARY */}
      <section className="px-8 py-10 grid gap-6 md:grid-cols-3">
        <Card label="Active Items" value={summary.active} />
        <Card label="Needs Attention" value={summary.highAttention} highlight />
        <Card label="Recently Resolved" value={summary.resolved} />
      </section>

      {/* ATTENTION REQUIRED */}
      <section className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-6">Attention Required</h2>

        {attentionItems.length === 0 ? (
          <p className="text-slate-400">
            No urgent items require board attention at this time.
          </p>
        ) : (
          <div className="grid gap-4">
            {attentionItems.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-red-500/40 bg-red-500/10"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-2 text-slate-300">
                  This item has been elevated for immediate attention and is being actively reviewed.
                </p>

                <p className="mt-3 text-sm text-amber-400 font-semibold">
                  Status: {humanStatus(item.status)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* IN PROGRESS */}
      <section className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-6">Work In Progress</h2>

        {inProgress.length === 0 ? (
          <p className="text-slate-400">
            No items are currently in progress.
          </p>
        ) : (
          <div className="grid gap-4">
            {inProgress.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/10"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-2 text-slate-300">
                  Work has begun and is actively being handled by management.
                </p>

                <p className="mt-3 text-sm text-blue-400 font-semibold">
                  Status: {humanStatus(item.status)}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* COMPLETED */}
      <section className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-6">Recently Resolved</h2>

        {completed.length === 0 ? (
          <p className="text-slate-400">
            No recently completed items.
          </p>
        ) : (
          <div className="grid gap-4">
            {completed.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-2 text-slate-300">
                  This item has been successfully resolved.
                </p>

                <p className="mt-3 text-sm text-emerald-400 font-semibold">
                  Status: Completed
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}

function Card({ label, value, highlight }) {
  return (
    <div
      className={`p-6 rounded-2xl border ${
        highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-slate-900"
      }`}
    >
      <p className="text-sm uppercase text-slate-400">{label}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}

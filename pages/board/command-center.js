import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/bosClient";

export default function CommandCenter() {
  const [actions, setActions] = useState([]);

  async function fetchActions() {
    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setActions(data || []);
    }
  }

  useEffect(() => {
    fetchActions();
  }, []);

  const openActions = actions.filter((item) => item.status === "open").length;
  const escalations = actions.filter((item) => item.priority === "high").length;
  const recentActions = actions.slice(0, 5);

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operating System
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white">
            Command Center
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Live executive visibility into BOS actions, workflow activity,
            production persistence, and operational execution across the board platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/board/workflow-engine"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
            >
              Open Workflow Engine
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:border-amber-300 hover:text-amber-300"
            >
              View Action Items
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">Total BOS Actions</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">{actions.length}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">Open Actions</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">{openActions}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm text-slate-400">High Priority</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">{escalations}</p>
          </div>

          <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
            <p className="text-sm text-amber-100/80">Database Status</p>
            <p className="mt-2 text-2xl font-bold text-amber-300">
              Live
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 xl:grid-cols-4">
          <Link href="/board/workflow-engine">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold">Workflow Engine</h3>
              <p className="mt-2 text-sm text-slate-400">
                Execute, track, and escalate operational workflows.
              </p>
            </div>
          </Link>

          <Link href="/board/action-items">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold">Action Items</h3>
              <p className="mt-2 text-sm text-slate-400">
                View live board-level accountability and task tracking.
              </p>
            </div>
          </Link>

          <Link href="/board/violation-review">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold">Violation Review</h3>
              <p className="mt-2 text-sm text-slate-400">
                Compliance enforcement and owner communication tracking.
              </p>
            </div>
          </Link>

          <Link href="/board/live-data-verification">
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 transition hover:border-amber-300">
              <h3 className="text-xl font-semibold">Live Data Verification</h3>
              <p className="mt-2 text-sm text-amber-100/80">
                Confirm production Supabase writes and audit events.
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="mb-6 text-2xl font-bold">Live BOS Activity Feed</h2>

            {recentActions.length === 0 ? (
              <p className="text-sm text-slate-400">
                No live BOS actions have been created yet.
              </p>
            ) : (
              <div className="space-y-4">
                {recentActions.map((action) => (
                  <div
                    key={action.id}
                    className="rounded-xl border border-white/10 bg-slate-900/60 p-4"
                  >
                    <p className="font-semibold text-white">{action.title}</p>
                    <p className="mt-1 text-xs text-slate-400">
                      {action.module || "BOS"} · {action.status || "open"} ·{" "}
                      {new Date(action.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="mb-4 text-xl font-semibold">Risk Signals</h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>High priority items: {escalations}</p>
                <p>Open action queue: {openActions}</p>
                <p>Latest feed items: {recentActions.length}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
              <h3 className="mb-3 text-xl font-semibold">System Status</h3>
              <p className="text-sm text-amber-100">
                Command Center is now reading live production data from Supabase.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

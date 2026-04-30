import React from "react";
import Link from "next/link";
import BosSystemStatus from "../../components/board/BosSystemStatus";
import BosLiveConsole from "../../components/board/BosLiveConsole";
import BosActionButtons from "../../components/board/BosActionButtons";

export default function CommandCenter() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Command Center
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
            <Link href="/board/action-items">Tasks</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Executive Command Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Real-time visibility across board operations, workflows, and system execution.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            The Command Center consolidates BOS system health, live event activity,
            board workflow signals, and executable controls into one operational
            oversight layer.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">System Layer</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              Live
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">Event Console</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              Active
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Database Status</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              Ready
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
              BOS System Status
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Production readiness indicators for the Board Operating System.
            </p>

            <div className="mt-6">
              <BosSystemStatus />
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              Live BOS Console
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              Real-time engine events and action activity.
            </p>

            <div className="mt-6">
              <BosLiveConsole />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            Executable Command Controls
          </h3>

          <p className="mt-3 text-slate-300">
            Command actions now route through the BOS execution engine and are
            ready for persistent database activity.
          </p>

          <div className="mt-6">
            <BosActionButtons module="command-center" />
          </div>
        </div>
      </section>
    </main>
  );
}

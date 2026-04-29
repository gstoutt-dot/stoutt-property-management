import Link from "next/link";
import BosActionPanel from "../../components/board/BosActionPanel";
import BosSystemStatus from "../../components/board/BosSystemStatus";
import {
  getSharedWorkflowQueue,
  crossModuleRoutingRules,
} from "../../lib/bosWorkflowState";

const navItems = [
  { label: "Dashboard", href: "/board" },
  { label: "Workflow", href: "/board/workflow-engine" },
  { label: "Command", href: "/board/command-center" },
  { label: "Tasks", href: "/board/action-items" },
  { label: "Financial", href: "/board/financial-review" },
];

export default function CommandCenter() {
  const workflowQueue = getSharedWorkflowQueue("manager");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.16),transparent_32%),linear-gradient(135deg,#020617,#0f172a_45%,#111827)]">
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <Link href="/board" className="group inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-lg shadow-cyan-950/30">
                <span className="text-lg font-black text-cyan-200">SP</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.28em] text-cyan-200">
                  STOUTT PROPERTY MANAGEMENT
                </p>
                <p className="text-xs text-slate-400">
                  Board Operating System
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    item.href === "/board/command-center"
                      ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-300/30 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
                Command Center · BOS Core
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                The Board Operating System is now live and connected.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                This Command Center aggregates workflow, execution state, system
                readiness, routing logic, and shared action controls into one
                operational view.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <p className="text-sm font-semibold text-white">
                Live System Snapshot
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-3xl font-semibold text-white">
                    {workflowQueue.length}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Active workflow items
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-3xl font-semibold text-white">
                    {crossModuleRoutingRules.length}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Routing rules
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-3xl font-semibold text-white">6</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Shared actions
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-3xl font-semibold text-white">1</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Execution engine
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-purple-300/20 bg-purple-300/10 p-4">
                <p className="text-sm font-semibold text-purple-100">
                  What this represents
                </p>
                <p className="mt-2 text-sm leading-6 text-purple-50/80">
                  The platform has transitioned from UI → connected system →
                  executable operating model.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <BosSystemStatus />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4">
        <BosActionPanel moduleName="Command Center" role="manager" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
            System Insight
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            What you now have
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            This is no longer a collection of pages. This is now a structured
            operating system capable of handling intake, routing, execution,
            audit tracking, and cross-module coordination.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold text-white">
              AI → Workflow → Task
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Voice assistant events can now generate structured workflow items
              and tasks inside the BOS.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold text-white">
              Action → Engine → Result
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Every button now routes through a shared execution engine capable
              of driving real system behavior.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold text-white">
              Signal → Routing → Module
            </h3>
            <p className="mt-3 text-sm text-slate-400">
              Issues now move intelligently between modules without duplicate
              entry or manual coordination.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

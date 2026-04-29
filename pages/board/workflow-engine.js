import Link from "next/link";
import BosActionPanel from "../../components/board/BosActionPanel";
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

const priorityStyles = {
  Critical: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  High: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  Medium: "border-blue-400/30 bg-blue-500/10 text-blue-200",
  Normal: "border-cyan-400/30 bg-cyan-500/10 text-cyan-200",
  Low: "border-slate-400/30 bg-slate-500/10 text-slate-200",
};

const statusStyles = {
  Open: "border-amber-400/30 bg-amber-500/10 text-amber-200",
  "In Progress": "border-blue-400/30 bg-blue-500/10 text-blue-200",
  Escalated: "border-rose-400/30 bg-rose-500/10 text-rose-200",
  Assigned: "border-purple-400/30 bg-purple-500/10 text-purple-200",
  Reviewed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  Closed: "border-slate-400/30 bg-slate-500/10 text-slate-200",
};

export default function WorkflowEngine() {
  const workflowQueue = getSharedWorkflowQueue("manager");

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_32%),linear-gradient(135deg,#020617,#0f172a_45%,#111827)]">
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
                    item.href === "/board/workflow-engine"
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
                Phase 2 · Operating-System Behavior
              </p>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Workflow Engine now connects actions across the BOS.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                This page now reads from the shared workflow state and action
                layer, giving the portal one common operating language for
                closing, escalating, assigning, reviewing, creating tasks, and
                routing signals across board modules.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/30 backdrop-blur">
              <p className="text-sm font-semibold text-white">
                Shared Workflow Snapshot
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
                    Unified BOS queue
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                <p className="text-sm font-semibold text-cyan-100">
                  What changed
                </p>
                <p className="mt-2 text-sm leading-6 text-cyan-50/80">
                  The Workflow Engine is no longer a static page. It is now the
                  shared operating layer that other BOS modules can feed into.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Shared Task State
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              One queue across modules
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Maintenance, violations, financial review, reserves, vendors, and
              legal items can now feed into the same workflow structure.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
              Action Consistency
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              Same controls everywhere
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Close, escalate, assign, review, create task, and route signal are
              now standardized instead of being handled differently by each page.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Audit Memory
            </p>
            <h2 className="mt-3 text-xl font-semibold text-white">
              Every action leaves a trail
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              This prepares the platform for board accountability, manager
              oversight, legal review, and AI-generated operating histories.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4">
        <BosActionPanel moduleName="Maintenance Review" role="manager" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Unified Workflow Queue
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">
              Active work moving through the BOS
            </h2>
          </div>

          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            These items are read from the shared workflow state layer. Later,
            these actions can become live buttons connected to database updates,
            vendor dispatch, QuickBooks sync, and board packet generation.
          </p>
        </div>

        <div className="space-y-4">
          {workflowQueue.map((item) => (
            <div
              key={item.id}
              className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20"
            >
              <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        priorityStyles[item.priority] ||
                        "border-white/10 bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      {item.priority}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        statusStyles[item.status] ||
                        "border-white/10 bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      {item.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                      {item.module}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.nextStep}
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Source
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.source}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Owner
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.owner}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Due
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">
                        {item.due}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="text-sm font-semibold text-white">
                    Available Actions
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.availableActions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/15"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-5 text-slate-500">
                    Buttons are intentionally visual in this phase. The next
                    step is wiring these actions into persistent database state.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                Cross-Module Routing Rules
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                How BOS signals move from one module to another
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-6 text-slate-400">
              These rules define how one issue becomes visible in the correct
              operational area without the manager manually rebuilding the same
              information on multiple pages.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {crossModuleRoutingRules.map((rule) => (
              <div
                key={rule.id}
                className="rounded-3xl border border-white/10 bg-slate-950/70 p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                    {rule.sourceModule}
                  </span>
                  <span className="text-slate-500">→</span>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                    {rule.targetModule}
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold text-white">
                  {rule.condition}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {rule.result}
                </p>

                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan-300">
                  Action: {rule.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

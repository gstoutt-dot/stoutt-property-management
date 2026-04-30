import Link from "next/link";

export default function BoardActionItems() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide text-amber-300">
            Stoutt BOS
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-amber-300">Board</Link>
            <Link href="/board/command-center" className="hover:text-amber-300">Command Center</Link>
            <Link href="/board/workflow-engine" className="hover:text-amber-300">Workflow</Link>
            <Link href="/board/action-items" className="text-amber-300">Action Items</Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">Violations</Link>
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Action Items Command Log
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A centralized board-facing workspace for tracking assignments, follow-ups,
              deadlines, owner concerns, vendor tasks, compliance items, and management
              execution across the association.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/board/workflow-engine"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
              >
                Open Workflow Engine
              </Link>

              <Link
                href="/board/command-center"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300 hover:text-amber-300"
              >
                Back to Command Center
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Open Board Tasks",
                value: "18",
                note: "Items currently requiring board or management attention.",
              },
              {
                title: "Due This Week",
                value: "7",
                note: "Time-sensitive follow-ups scheduled for current review.",
              },
              {
                title: "Escalated Items",
                value: "3",
                note: "Tasks flagged for executive review or legal oversight.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
              >
                <p className="text-sm font-medium text-slate-400">{item.title}</p>
                <p className="mt-3 text-4xl font-bold text-amber-300">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Active Queue
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">Board Action Register</h2>
              </div>
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold text-amber-200">
                Live BOS Queue
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Confirm vendor proposal for pool equipment inspection",
                  owner: "Management",
                  status: "In Review",
                  due: "Due Today",
                  priority: "High",
                },
                {
                  title: "Prepare board response for ARC fence modification request",
                  owner: "Architectural Committee",
                  status: "Pending Vote",
                  due: "Due in 2 days",
                  priority: "Medium",
                },
                {
                  title: "Follow up on delinquency escalation package",
                  owner: "Treasurer",
                  status: "Awaiting Documents",
                  due: "Due this week",
                  priority: "High",
                },
                {
                  title: "Review owner complaint regarding parking enforcement",
                  owner: "Board Liaison",
                  status: "Assigned",
                  due: "Next meeting packet",
                  priority: "Medium",
                },
              ].map((task) => (
                <div
                  key={task.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-amber-300/40"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">Owner: {task.owner}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                        {task.status}
                      </span>
                      <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                        {task.due}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                BOS Purpose
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">What This Page Controls</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                This module keeps the board from losing track of promises, motions,
                open owner issues, vendor follow-ups, and management commitments.
                Each item can later persist to Supabase, sync with workflows, and
                surface inside the Command Center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
                Next Integration
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">Persistence Ready</h2>
              <p className="mt-4 text-sm leading-7 text-amber-50/90">
                Next step: connect action creation, status changes, assignments,
                and completion events directly into the BOS database tables.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

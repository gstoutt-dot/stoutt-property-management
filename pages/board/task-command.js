import Link from "next/link";

const tasks = [
  {
    title: "Finalize Pool Lighting Vendor Agreement",
    priority: "High",
    owner: "Board President",
    due: "May 8, 2026",
    status: "Ready for Vote",
    source: "Approval Queue / Motion Center",
    note: "Contract packet is complete and waiting for final board approval.",
  },
  {
    title: "Review Updated Collection Policy Language",
    priority: "High",
    owner: "Treasurer",
    due: "May 10, 2026",
    status: "Board Review",
    source: "Policy Library / Resolution Tracker",
    note: "Attorney comments have been added and need board confirmation.",
  },
  {
    title: "Prepare Annual Budget Adoption Packet",
    priority: "Medium",
    owner: "Manager / Treasurer",
    due: "May 30, 2026",
    status: "In Progress",
    source: "Budget Planning / Annual Requirements",
    note: "Draft budget, reserve schedule, and approval motion are being prepared.",
  },
  {
    title: "Complete Insurance Renewal Comparison",
    priority: "Medium",
    owner: "Board President",
    due: "June 12, 2026",
    status: "Awaiting Review",
    source: "Insurance Center / Compliance Calendar",
    note: "Carrier options and coverage summary are ready for board review.",
  },
];

const ownerLoad = [
  ["Board President", "6"],
  ["Treasurer", "5"],
  ["Secretary", "3"],
  ["Manager", "9"],
  ["Committee Chairs", "4"],
];

const linkedAreas = [
  "Action Items",
  "Resolutions",
  "Motions",
  "Approvals",
  "Compliance Calendar",
  "Budget Planning",
  "Legal Review",
  "Vendor Performance",
];

export default function BoardTaskCommand() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide">
            Stoutt Board Portal
          </Link>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Portal</Link>
            <Link href="/board/violation-review">Violations</Link>
            <Link href="/board/architectural-approvals">ARC Approvals</Link>
            <Link href="/board/maintenance-review">Maintenance</Link>
            <Link href="/board/financial-review">Financials</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operating Cockpit
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Task Command Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A master operating view for board tasks, approvals, resolutions,
            motions, compliance deadlines, vendor follow-ups, legal items,
            budget assignments, manager responsibilities, and priority
            escalations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Boards need one place to see what is actually open, who owns it,
              when it is due, and which governance workflow it connects to. This
              command center turns scattered responsibilities into a clear
              operating system.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Cross-Module Visibility</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Tasks can flow in from resolutions, motions, approvals, compliance
              deadlines, budget planning, legal review, maintenance, vendors,
              inspections, and manager assignments.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Executive Control</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The board can review priorities, overdue items, ownership gaps,
              and completion history without digging through emails, minutes,
              packets, or separate spreadsheets.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Open Tasks", "27"],
            ["High Priority", "8"],
            ["Due This Month", "13"],
            ["Overdue", "3"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-amber-300">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Priority Task Queue</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Board tasks organized by owner, priority, due date, source,
                  and current status.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Add Task
              </button>
            </div>

            <div className="space-y-5">
              {tasks.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.priority} Priority · Due {item.due}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="text-slate-500">Owner:</span>{" "}
                      {item.owner}
                    </p>
                    <p>
                      <span className="text-slate-500">Source:</span>{" "}
                      {item.source}
                    </p>
                    <p className="md:col-span-2">
                      <span className="text-slate-500">Task Note:</span>{" "}
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Owner Workload</h2>

              <div className="mt-5 space-y-3">
                {ownerLoad.map(([owner, count]) => (
                  <div
                    key={owner}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm"
                  >
                    <span className="text-slate-300">{owner}</span>
                    <span className="font-semibold text-amber-300">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Linked Workflows</h2>
              <div className="mt-5 grid gap-3">
                {linkedAreas.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            One Place for Board Execution
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This is where the Board Portal starts to operate like a true command
            system. Every task can be connected to the motion, resolution,
            document, approval, deadline, vendor, legal matter, budget item, or
            manager assignment that created it — giving the board a clear path
            from decision to completion.
          </p>
        </section>
      </section>
    </main>
  );
}

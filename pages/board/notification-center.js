import Link from "next/link";

const notifications = [
  {
    title: "Pool Lighting Vendor Agreement Ready for Vote",
    type: "Approval Reminder",
    priority: "High",
    date: "April 29, 2026",
    owner: "Board President",
    status: "Unread",
    linked: "Approval Queue / Motion Center",
    message:
      "The contract packet is complete and ready for final board approval before the May 8 deadline.",
  },
  {
    title: "Updated Collection Policy Review Due Soon",
    type: "Policy Reminder",
    priority: "High",
    date: "April 29, 2026",
    owner: "Treasurer",
    status: "Unread",
    linked: "Policy Library / Resolution Tracker",
    message:
      "Attorney comments have been added. Board review is needed before the policy can move to adoption.",
  },
  {
    title: "Annual Budget Adoption Packet In Progress",
    type: "Budget Alert",
    priority: "Medium",
    date: "April 28, 2026",
    owner: "Manager / Treasurer",
    status: "Read",
    linked: "Budget Planning / Annual Requirements",
    message:
      "Draft budget materials are being prepared for review before the annual budget adoption deadline.",
  },
  {
    title: "Insurance Renewal Review Window Open",
    type: "Insurance Alert",
    priority: "Medium",
    date: "April 27, 2026",
    owner: "Board President",
    status: "Read",
    linked: "Insurance Center / Compliance Calendar",
    message:
      "Carrier comparison and coverage summary should be reviewed before the June renewal date.",
  },
];

const alertTypes = [
  "Overdue tasks",
  "Upcoming deadlines",
  "Approval reminders",
  "Document review notices",
  "Compliance reminders",
  "Vendor updates",
  "Legal matter alerts",
  "Budget alerts",
  "Insurance renewals",
  "System notices",
];

export default function BoardNotificationCenter() {
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
            Board Alert System
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Notification Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A centralized notification hub for new board alerts, overdue tasks,
            upcoming deadlines, approval reminders, document review notices,
            compliance reminders, vendor updates, legal alerts, budget alerts,
            insurance renewals, and system notices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Board members should not have to hunt through emails or remember
              every deadline. This center surfaces the alerts that need attention
              before they become missed actions.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Priority Awareness</h2>
            <p className="mt-4 leading-7 text-slate-300">
              High-priority approvals, overdue items, compliance dates, legal
              alerts, budget notices, and insurance reminders are organized by
              urgency, owner, and linked workflow.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Connected Alerts</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every notification can connect back to the task, approval,
              resolution, document, vendor item, legal matter, budget item, or
              compliance deadline that created it.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["New Alerts", "9"],
            ["High Priority", "4"],
            ["Overdue", "3"],
            ["Due This Week", "11"],
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
                <h2 className="text-2xl font-semibold">Notification Feed</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Alerts organized by priority, date, owner, status, and linked
                  board workflow.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Mark All Reviewed
              </button>
            </div>

            <div className="space-y-5">
              {notifications.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.type} · {item.priority} Priority · {item.date}
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
                      <span className="text-slate-500">Linked Workflow:</span>{" "}
                      {item.linked}
                    </p>
                    <p className="md:col-span-2">
                      <span className="text-slate-500">Message:</span>{" "}
                      {item.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Alert Types</h2>
              <div className="mt-5 grid gap-3">
                {alertTypes.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Notification Rules</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• High priority items stay pinned</p>
                <p>• Overdue tasks escalate automatically</p>
                <p>• Approval reminders link to queue items</p>
                <p>• Compliance dates trigger advance notices</p>
                <p>• Legal and insurance items receive special flags</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Fewer Missed Items, Better Board Awareness
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This notification center gives the board one trusted place to see
            what needs attention. Instead of depending on scattered emails,
            memory, or last-minute reminders, every important alert connects
            directly to the board workflow that needs action.
          </p>
        </section>
      </section>
    </main>
  );
}

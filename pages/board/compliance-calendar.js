import Link from "next/link";

const calendarItems = [
  {
    title: "Annual Budget Adoption Deadline",
    date: "May 30, 2026",
    type: "Budget",
    owner: "Treasurer / Manager",
    status: "Upcoming",
    linked: "Annual Budget Adoption / Budget Planning",
  },
  {
    title: "Insurance Renewal Review",
    date: "June 12, 2026",
    type: "Insurance",
    owner: "Board President",
    status: "In Review",
    linked: "Insurance Center",
  },
  {
    title: "Annual Meeting Notice Window",
    date: "July 1, 2026",
    type: "Election",
    owner: "Secretary",
    status: "Scheduled",
    linked: "Elections / Meeting Packet",
  },
  {
    title: "Reserve Study Review",
    date: "August 15, 2026",
    type: "Reserves",
    owner: "Treasurer",
    status: "Pending",
    linked: "Reserve Study Action / Reserves",
  },
];

const reminders = [
  "Meeting notice deadlines",
  "Election timeline checkpoints",
  "Contract renewal alerts",
  "Policy review dates",
  "Legal filing reminders",
  "Insurance renewal windows",
];

export default function BoardComplianceCalendar() {
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
            Deadline Protection
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Compliance Calendar
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A governance calendar for annual corporate deadlines, budget
            adoption dates, insurance renewals, reserve study checkpoints,
            meeting notices, election timelines, legal filings, and policy
            reviews.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Associations can get into trouble when deadlines are missed. This
              calendar gives the board and management team one place to track
              important compliance dates before they become emergencies.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Proactive Reminders</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Upcoming deadlines are surfaced early so notices, renewals,
              reviews, filings, and approvals can be handled with enough time
              for board discussion and proper documentation.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Connected Governance</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Each deadline can connect to the related module — budget planning,
              elections, insurance, reserves, meeting packets, policies,
              contracts, or legal review.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Upcoming Deadlines", "18"],
            ["Due This Month", "4"],
            ["Linked Modules", "9"],
            ["Completed Items", "72"],
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
                <h2 className="text-2xl font-semibold">
                  Upcoming Compliance Dates
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Key dates organized by type, owner, status, and linked board
                  workflow.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Add Deadline
              </button>
            </div>

            <div className="space-y-5">
              {calendarItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.type} · {item.date}
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Tracked Reminders</h2>
              <div className="mt-5 grid gap-3">
                {reminders.map((item) => (
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
              <h2 className="text-xl font-semibold">Calendar Views</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• 30-day deadline view</p>
                <p>• Annual governance view</p>
                <p>• Election timeline view</p>
                <p>• Insurance renewal view</p>
                <p>• Contract renewal view</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Built to Prevent Missed Deadlines
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This calendar gives every board a proactive compliance command
            center. Instead of reacting after deadlines are missed, the board can
            see what is coming, who owns it, what documents are needed, and which
            governance workflow it connects to.
          </p>
        </section>
      </section>
    </main>
  );
}

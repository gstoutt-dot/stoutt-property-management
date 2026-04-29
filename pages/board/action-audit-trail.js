import Link from "next/link";

const auditItems = [
  {
    action: "Pool lighting proposal moved to resolution review",
    actor: "Community Manager",
    date: "April 25, 2026",
    time: "9:18 AM",
    status: "Updated",
    linked: "MOT-2026-021 / RES-2026-014",
    note: "Vendor proposal attached and routed for final board confirmation.",
  },
  {
    action: "Collection policy revision assigned to Treasurer",
    actor: "Board President",
    date: "April 24, 2026",
    time: "7:42 PM",
    status: "Assigned",
    linked: "RES-2026-013 / Policy Library",
    note: "Treasurer to review timeline language before next meeting packet.",
  },
  {
    action: "Gate access modernization tabled",
    actor: "Secretary",
    date: "April 24, 2026",
    time: "7:21 PM",
    status: "Tabled",
    linked: "MOT-2026-019",
    note: "Awaiting complete vendor insurance certificate and final contract packet.",
  },
];

const trailSummary = [
  ["Actions Logged", "342"],
  ["Status Changes", "918"],
  ["Linked Records", "276"],
  ["Manager Notes", "184"],
];

export default function BoardActionAuditTrail() {
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
            Accountability Record
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Action Audit Trail
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Track who created, changed, assigned, updated, completed, or
            archived every board action — with linked motions, resolutions,
            documents, notes, and timestamps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Boards need confidence that every action has a clear history. This
              audit trail shows exactly what happened, who handled it, and when.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Transparent Updates</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every status change, assignment, manager note, document upload,
              and completion step can be tracked from start to finish.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Board Accountability</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Action ownership is clear. The board can see what is pending,
              what changed, what was completed, and what still needs follow-up.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {trailSummary.map(([label, value]) => (
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
                <h2 className="text-2xl font-semibold">Recent Audit Events</h2>
                <p className="mt-2 text-sm text-slate-400">
                  A chronological record of changes, assignments, and follow-up
                  activity.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Export Trail
              </button>
            </div>

            <div className="space-y-5">
              {auditItems.map((item) => (
                <div
                  key={item.action}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.status} · {item.date} · {item.time}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.action}
                      </h3>
                    </div>

                    <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      {item.actor}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="text-slate-500">Linked Record:</span>{" "}
                      {item.linked}
                    </p>
                    <p>
                      <span className="text-slate-500">Audit Status:</span>{" "}
                      {item.status}
                    </p>
                  </div>

                  <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-7 text-slate-300">
                    <span className="text-slate-500">Manager Note:</span>{" "}
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Audit Filters</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Created actions</p>
                <p>• Status changes</p>
                <p>• Assigned follow-ups</p>
                <p>• Completed tasks</p>
                <p>• Archived records</p>
                <p>• Manager notes</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Linked Areas</h2>
              <div className="mt-5 grid gap-3 text-sm text-slate-300">
                {[
                  "Motions",
                  "Resolutions",
                  "Action Items",
                  "Meeting Minutes",
                  "Documents",
                  "Policy Library",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3"
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
            A Defensible Record of Board Action
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This gives the board a professional accountability trail for every
            action taken inside the portal. Nothing is lost, nothing is hidden,
            and every important governance step can be reviewed with clarity.
          </p>
        </section>
      </section>
    </main>
  );
}

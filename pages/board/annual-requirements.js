import Link from "next/link";

const requirements = [
  {
    title: "Annual Meeting Preparation",
    category: "Governance",
    status: "In Progress",
    owner: "Secretary / Manager",
    due: "July 15, 2026",
    items: "Notice window, agenda, proxy forms, candidate slate, meeting packet",
  },
  {
    title: "Budget Adoption Requirements",
    category: "Financials",
    status: "Upcoming",
    owner: "Treasurer / Manager",
    due: "May 30, 2026",
    items: "Draft budget, board workshop, reserve review, approval motion",
  },
  {
    title: "Insurance Review Requirements",
    category: "Risk Management",
    status: "In Review",
    owner: "Board President",
    due: "June 12, 2026",
    items: "Carrier proposal, coverage summary, renewal comparison, board vote",
  },
  {
    title: "Corporate Filing Checklist",
    category: "Compliance",
    status: "Pending",
    owner: "Manager",
    due: "September 1, 2026",
    items: "Annual report confirmation, officer list, registered agent verification",
  },
];

const checklist = [
  "Annual meeting notice prepared",
  "Budget draft reviewed",
  "Insurance renewal packet received",
  "Reserve review scheduled",
  "Election timeline confirmed",
  "Policy review assigned",
  "Contract renewals identified",
  "Board approvals documented",
];

export default function BoardAnnualRequirements() {
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
            Annual Governance Roadmap
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Annual Requirements Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A centralized annual checklist for meeting requirements, budget
            adoption, insurance review, elections, reserve planning, policy
            updates, contract renewals, corporate filings, and board approvals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every association has annual obligations that must be planned,
              documented, reviewed, and approved. This center keeps those
              requirements from getting buried in emails or remembered too late.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Yearly Board Roadmap</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The board can see what must be completed each year, who owns it,
              what documents are needed, and which approvals are still pending.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Manager Preparation</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Management can prepare meeting packets, notices, financials,
              renewals, filings, and board approval items before deadlines
              become urgent.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Annual Items", "24"],
            ["In Progress", "7"],
            ["Board Approvals", "9"],
            ["Completed", "12"],
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
                  Annual Requirement Tracker
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Requirements organized by category, owner, deadline, and
                  required supporting items.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Add Requirement
              </button>
            </div>

            <div className="space-y-5">
              {requirements.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.category} · {item.due}
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
                      <span className="text-slate-500">Required Items:</span>{" "}
                      {item.items}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">
                Manager Preparation Checklist
              </h2>
              <div className="mt-5 grid gap-3">
                {checklist.map((item) => (
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
              <h2 className="text-xl font-semibold">Annual Categories</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Annual meeting</p>
                <p>• Budget adoption</p>
                <p>• Insurance review</p>
                <p>• Elections</p>
                <p>• Reserve review</p>
                <p>• Corporate filings</p>
                <p>• Contract renewals</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Annual Governance Without Last-Minute Scrambling
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This center gives the board and management team a clear yearly
            roadmap. Every required item has an owner, a deadline, supporting
            documents, and an approval path — creating a more disciplined,
            proactive, and professional association operation.
          </p>
        </section>
      </section>
    </main>
  );
}

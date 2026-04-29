import Link from "next/link";

const reports = [
  {
    title: "Monthly Board Action Report",
    category: "Action Items",
    format: "PDF / Excel",
    status: "Ready",
    owner: "Manager",
    linked: "Task Command / Action Items",
    summary:
      "Open tasks, completed items, overdue follow-ups, owner assignments, and completion history.",
  },
  {
    title: "Approval History Report",
    category: "Approvals",
    format: "PDF",
    status: "Ready",
    owner: "Board Secretary",
    linked: "Approval Queue / Document Approval",
    summary:
      "Documents, contracts, policies, budget items, and insurance items reviewed or approved by the board.",
  },
  {
    title: "Motion & Resolution Report",
    category: "Governance",
    format: "PDF / Excel",
    status: "Draft",
    owner: "Secretary",
    linked: "Motion Center / Resolution Tracker",
    summary:
      "Formal motions, vote results, linked resolutions, supporting documents, and archive status.",
  },
  {
    title: "Compliance Deadline Report",
    category: "Compliance",
    format: "PDF",
    status: "Ready",
    owner: "Manager",
    linked: "Compliance Calendar / Annual Requirements",
    summary:
      "Upcoming deadlines, completed compliance items, annual requirements, and assigned owners.",
  },
];

const exportTypes = [
  "Board packets",
  "Action item reports",
  "Approval history",
  "Compliance reports",
  "Motion reports",
  "Resolution reports",
  "Vendor reports",
  "Budget reports",
  "Legal reports",
  "Insurance reports",
];

export default function BoardReportsExport() {
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
            Board Reporting Hub
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Reports & Export Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Generate board packets, action reports, approval history, compliance
            reports, motion and resolution reports, vendor reports, budget
            reports, legal summaries, insurance reports, and export-ready files.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Boards need clean, professional reports without rebuilding
              information by hand. This center converts portal activity into
              organized board-ready reporting.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Export-Ready Records</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Reports can be prepared for board packets, meeting prep,
              compliance review, audit support, owner questions, and management
              follow-up.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Connected Reporting</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Each report can pull from motions, resolutions, documents,
              approvals, tasks, vendors, legal matters, insurance, budgets, and
              compliance deadlines.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Available Reports", "24"],
            ["Ready to Export", "12"],
            ["PDF Templates", "9"],
            ["Excel Templates", "7"],
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
                <h2 className="text-2xl font-semibold">Report Library</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Board-ready reports organized by category, format, owner,
                  linked workflow, and export status.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Create Report
              </button>
            </div>

            <div className="space-y-5">
              {reports.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.category} · {item.format}
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
                      <span className="text-slate-500">Summary:</span>{" "}
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                      Preview
                    </button>
                    <button className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950">
                      Export
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Export Categories</h2>
              <div className="mt-5 grid gap-3">
                {exportTypes.map((item) => (
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
              <h2 className="text-xl font-semibold">Export Options</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• PDF board packet</p>
                <p>• Excel tracking sheet</p>
                <p>• Meeting-ready summary</p>
                <p>• Compliance snapshot</p>
                <p>• Approval history report</p>
                <p>• Archive-ready export</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Professional Reports Without Manual Assembly
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This center turns the Board Portal into a reporting engine. Board
            members and managers can produce clean, organized, export-ready
            reports for meetings, audits, compliance reviews, owner questions,
            and long-term association records.
          </p>
        </section>
      </section>
    </main>
  );
}

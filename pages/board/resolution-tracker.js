import Link from "next/link";

const resolutions = [
  {
    id: "RES-2026-014",
    title: "Pool Lighting Replacement Approval",
    status: "Open",
    owner: "Maintenance Committee",
    due: "May 8, 2026",
    motion: "Motion carried 5-0",
    docs: "Vendor proposal, inspection photo set",
  },
  {
    id: "RES-2026-013",
    title: "Collection Policy Enforcement Update",
    status: "In Progress",
    owner: "Treasurer / Manager",
    due: "May 15, 2026",
    motion: "Motion carried 4-1",
    docs: "Policy draft, delinquency report",
  },
  {
    id: "RES-2026-012",
    title: "Gate Access System Modernization",
    status: "Pending Docs",
    owner: "Board President",
    due: "June 1, 2026",
    motion: "Motion tabled pending vendor packet",
    docs: "Awaiting contract and insurance certificate",
  },
];

const archive = [
  "Roof inspection authorization",
  "Landscape enhancement phase one",
  "Insurance appraisal review",
  "Budget workshop scheduling",
];

export default function BoardResolutionTracker() {
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
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Governance Execution
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Resolution Tracker
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Track formal board resolutions from motion to assignment, follow-up,
            supporting documents, due dates, status, and final archive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Open Resolutions", "7"],
            ["Assigned Actions", "14"],
            ["Due This Month", "5"],
            ["Archived Resolutions", "128"],
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
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Active Resolutions</h2>
              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                New Resolution
              </button>
            </div>

            <div className="space-y-5">
              {resolutions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.id}
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
                      <span className="text-slate-500">Assigned To:</span>{" "}
                      {item.owner}
                    </p>
                    <p>
                      <span className="text-slate-500">Due Date:</span>{" "}
                      {item.due}
                    </p>
                    <p>
                      <span className="text-slate-500">Linked Motion:</span>{" "}
                      {item.motion}
                    </p>
                    <p>
                      <span className="text-slate-500">Documents:</span>{" "}
                      {item.docs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Follow-Up Actions</h2>
              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <p>• Confirm vendor proposal packet completeness</p>
                <p>• Attach signed motion record to resolution file</p>
                <p>• Notify committee chairs of assigned deadlines</p>
                <p>• Move completed items into archive</p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Resolution Archive</h2>
              <div className="mt-5 space-y-3">
                {archive.map((item) => (
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
      </section>
    </main>
  );
}

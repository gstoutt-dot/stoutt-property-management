import Link from "next/link";

const archiveItems = [
  {
    year: "2026",
    title: "Pool Lighting Replacement Resolution",
    type: "Resolution",
    status: "Archived",
    linked: "RES-2026-014 / MOT-2026-021",
    docs: "Vendor proposal, photos, minutes excerpt",
  },
  {
    year: "2026",
    title: "Collection Policy Timeline Update",
    type: "Policy / Resolution",
    status: "Archived",
    linked: "RES-2026-013 / Policy Library",
    docs: "Policy draft, vote record, attorney review",
  },
  {
    year: "2025",
    title: "Annual Budget Adoption",
    type: "Budget Approval",
    status: "Archived",
    linked: "Budget Planning / Meeting Packet",
    docs: "Approved budget, reserve schedule, minutes",
  },
  {
    year: "2025",
    title: "Insurance Renewal Authorization",
    type: "Insurance Decision",
    status: "Archived",
    linked: "Insurance Center",
    docs: "Carrier proposal, coverage summary, board approval",
  },
];

const categories = [
  "Motions",
  "Resolutions",
  "Policies",
  "Budgets",
  "Contracts",
  "Legal Matters",
  "Insurance",
  "Meeting Packets",
];

export default function BoardGovernanceArchive() {
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
            Permanent Governance Record
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Governance Archive
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A searchable archive for historical motions, resolutions, board
            decisions, prior budgets, contracts, policies, legal matters,
            insurance actions, and completed meeting packets.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Board history should not disappear when directors change,
              managers transition, or old emails become impossible to find.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Searchable History</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every completed governance item can be searched by year, category,
              motion, resolution, document, vendor, budget item, or meeting.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Board Continuity</h2>
            <p className="mt-4 leading-7 text-slate-300">
              New board members can understand what happened before them without
              relying on memory, scattered files, or incomplete handoffs.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Archived Records", "486"],
            ["Years Captured", "12"],
            ["Linked Documents", "1,248"],
            ["Search Categories", "8"],
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
                <h2 className="text-2xl font-semibold">Archived Records</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Completed governance actions stored with their linked records
                  and supporting documents.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Search Archive
              </button>
            </div>

            <div className="space-y-5">
              {archiveItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.year} · {item.type}
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
                      <span className="text-slate-500">Linked Record:</span>{" "}
                      {item.linked}
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
              <h2 className="text-xl font-semibold">Archive Categories</h2>
              <div className="mt-5 grid gap-3">
                {categories.map((item) => (
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
              <h2 className="text-xl font-semibold">Quick Filters</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Last 12 months</p>
                <p>• Resolutions only</p>
                <p>• Budget approvals</p>
                <p>• Insurance decisions</p>
                <p>• Legal matters</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Professional Continuity for Every Board
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This archive gives the association a permanent institutional memory.
            It protects the board from lost records, unclear history, repeated
            debates, and fragmented decision trails — creating a level of
            governance discipline most management companies never provide.
          </p>
        </section>
      </section>
    </main>
  );
}

import Link from "next/link";

const searchResults = [
  {
    title: "Pool Lighting Replacement Approval",
    category: "Resolution",
    source: "Resolution Tracker",
    date: "April 24, 2026",
    linked: "RES-2026-014 / MOT-2026-021",
    summary:
      "Approved vendor proposal for replacement of pool lighting after inspection review.",
  },
  {
    title: "Updated Collection Policy Draft",
    category: "Policy",
    source: "Policy Library",
    date: "April 24, 2026",
    linked: "Document Approval / Resolution Tracker",
    summary:
      "Draft policy revision with attorney comments and board review history.",
  },
  {
    title: "Annual Budget Adoption Packet",
    category: "Budget",
    source: "Budget Planning",
    date: "May 30, 2026",
    linked: "Annual Requirements / Approval Queue",
    summary:
      "Budget draft, reserve schedule, and adoption approval workflow.",
  },
  {
    title: "Insurance Renewal Comparison",
    category: "Insurance",
    source: "Insurance Center",
    date: "June 12, 2026",
    linked: "Compliance Calendar / Document Approval",
    summary:
      "Carrier comparison and coverage recommendation pending board review.",
  },
];

const searchableAreas = [
  "Motions",
  "Resolutions",
  "Policies",
  "Documents",
  "Meeting Minutes",
  "Approvals",
  "Tasks",
  "Vendors",
  "Legal Items",
  "Insurance Records",
  "Budget Records",
  "Compliance Deadlines",
];

export default function BoardSearchCenter() {
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
            Unified Board Search
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Search Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Search across motions, resolutions, policies, documents, meeting
            minutes, approvals, tasks, vendors, legal items, insurance records,
            budget records, and compliance deadlines from one place.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Board members should not need to remember which module contains a
              record. Search gives them one clean path to find the motion,
              policy, document, approval, or decision they need.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Cross-Portal Discovery</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Results can surface from governance, financials, legal review,
              insurance, vendors, minutes, approvals, tasks, and compliance
              records.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Faster Board Answers</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Instead of digging through packets, emails, or old meeting notes,
              board members can quickly locate records and follow the linked
              workflow trail.
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Search Portal Records</h2>
            <p className="mt-2 text-sm text-slate-400">
              Enter a keyword, motion number, resolution number, vendor name,
              policy title, document name, or deadline.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Search motions, resolutions, policies, documents, vendors..."
              className="min-h-[52px] flex-1 rounded-full border border-white/10 bg-slate-900 px-6 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/60"
            />
            <button className="rounded-full bg-amber-300 px-8 py-3 text-sm font-semibold text-slate-950">
              Search
            </button>
          </div>
        </section>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Indexed Records", "2,418"],
            ["Linked Modules", "12"],
            ["Saved Searches", "18"],
            ["Recent Searches", "42"],
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
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Sample Search Results</h2>
              <p className="mt-2 text-sm text-slate-400">
                Results show category, source module, date, linked records, and
                short summary.
              </p>
            </div>

            <div className="space-y-5">
              {searchResults.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.category} · {item.source} · {item.date}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      View Record
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="text-slate-500">Linked Record:</span>{" "}
                      {item.linked}
                    </p>
                    <p>
                      <span className="text-slate-500">Record Type:</span>{" "}
                      {item.category}
                    </p>
                    <p className="md:col-span-2">
                      <span className="text-slate-500">Summary:</span>{" "}
                      {item.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Searchable Areas</h2>
              <div className="mt-5 grid gap-3">
                {searchableAreas.map((item) => (
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
              <h2 className="text-xl font-semibold">Useful Searches</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• “collection policy”</p>
                <p>• “insurance renewal”</p>
                <p>• “budget adoption”</p>
                <p>• “pool lighting”</p>
                <p>• “vendor agreement”</p>
                <p>• “RES-2026”</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            One Search Bar for the Board’s Entire Record
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This search center turns the Board Portal into a true knowledge
            system. Board members can find the exact record they need, follow
            the linked governance trail, and understand the decision history
            without chasing old emails, documents, or meeting packets.
          </p>
        </section>
      </section>
    </main>
  );
}

import Link from "next/link";

const decisions = [
  {
    type: "Resolution",
    title: "Pool Lighting Replacement Approved",
    date: "April 24, 2026",
    approvedBy: "Board Vote 5-0",
    linked: "RES-2026-014 / MOT-2026-021",
    category: "Maintenance",
  },
  {
    type: "Policy Change",
    title: "Updated Collection Follow-Up Timeline",
    date: "April 24, 2026",
    approvedBy: "Board Vote 4-1",
    linked: "RES-2026-013 / Policy Library",
    category: "Financials",
  },
  {
    type: "Vendor Approval",
    title: "Gate Access Vendor Packet Review",
    date: "April 24, 2026",
    approvedBy: "Tabled Pending Documents",
    linked: "MOT-2026-019",
    category: "Security",
  },
];

export default function BoardDecisionHistory() {
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
            Governance Memory
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Decision History
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A complete timeline of board decisions, approvals, motions,
            resolutions, policy changes, vendor selections, legal matters, and
            financial actions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Board members should never have to search through old emails,
              scattered notes, or meeting packets to understand what was
              decided.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Full Decision Timeline</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every motion, resolution, approval, policy update, and major board
              action is organized into one searchable governance record.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Instant Accountability</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The board can see who approved what, when it was approved, what
              documents supported it, and where it connects across the portal.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Total Decisions", "214"],
            ["This Year", "42"],
            ["Linked Motions", "38"],
            ["Linked Documents", "156"],
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

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Decision Timeline</h2>
              <p className="mt-2 text-sm text-slate-400">
                A permanent board record organized by date, category, and linked
                action.
              </p>
            </div>

            <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
              Add Decision
            </button>
          </div>

          <div className="space-y-5">
            {decisions.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                      {item.type} · {item.category}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">
                      {item.title}
                    </h3>
                  </div>

                  <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                    {item.date}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-3">
                  <p>
                    <span className="text-slate-500">Approved By:</span>{" "}
                    {item.approvedBy}
                  </p>
                  <p>
                    <span className="text-slate-500">Linked Record:</span>{" "}
                    {item.linked}
                  </p>
                  <p>
                    <span className="text-slate-500">Document Status:</span>{" "}
                    Attached
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Institutional Memory Built In
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This gives every board a professional decision history that survives
            turnover, avoids confusion, and keeps the association’s governance
            record clean, searchable, and defensible.
          </p>
        </section>
      </section>
    </main>
  );
}

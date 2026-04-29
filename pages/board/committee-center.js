import Link from "next/link";

export default function BoardCommitteeCenter() {
  const committees = [
    {
      title: "Architectural Review Committee",
      focus: "ARC Requests",
      status: "Active",
      items: "7 Open",
      desc: "Reviews exterior modification requests and prepares recommendations for board approval.",
    },
    {
      title: "Finance Committee",
      focus: "Budget / Reserves",
      status: "Active",
      items: "4 Open",
      desc: "Reviews budget assumptions, reserve planning, delinquency trends and financial recommendations.",
    },
    {
      title: "Landscape Committee",
      focus: "Common Areas",
      status: "Watch",
      items: "3 Open",
      desc: "Tracks landscape quality, vendor performance and common-area improvement recommendations.",
    },
    {
      title: "Rules Committee",
      focus: "Policy Review",
      status: "Review",
      items: "2 Open",
      desc: "Reviews rules, owner concerns, compliance patterns and proposed policy updates.",
    },
  ];

  const workflow = [
    "Assign committee members and responsibilities",
    "Track committee notes and recommendations",
    "Route committee items to manager review",
    "Prepare board-ready recommendation summaries",
    "Attach committee materials to board packet",
    "Archive decisions and committee history",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Stoutt Property Management
            </div>
            <h1 className="mt-1 text-2xl font-semibold">
              Committee Management Center
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/board" className="hover:text-amber-300">
              Board Portal
            </Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">
              Violations
            </Link>
            <Link href="/board/architectural-approvals" className="hover:text-amber-300">
              ARC Approvals
            </Link>
            <Link href="/board/maintenance-review" className="hover:text-amber-300">
              Maintenance
            </Link>
            <Link href="/board/financial-review" className="hover:text-amber-300">
              Financials
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Committees • Recommendations • Board Routing
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Organize committee work before it reaches the full board.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track ARC, finance, landscape, rules and special committee work,
                including meeting notes, open recommendations, assignments,
                supporting documents and board approval routing.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Active Committees</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                16 committee items are currently being tracked.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Open Recommendations", "16"],
            ["Board Ready", "5"],
            ["Meeting Notes", "9"],
            ["Assigned Tasks", "12"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-3 text-4xl font-semibold text-amber-300">
                {value}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Committee Roster
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Active Committees & Open Work
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {committees.map((committee) => (
              <div
                key={committee.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400/40 transition"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-semibold">{committee.title}</h4>
                    <div className="mt-2 text-sm text-slate-400">
                      {committee.focus}
                    </div>
                    <p className="mt-4 leading-relaxed text-slate-300">
                      {committee.desc}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                      {committee.status}
                    </div>
                    <div className="mt-4 text-2xl font-semibold text-amber-300">
                      {committee.items}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Committee Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Recommendation Control Path
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {workflow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Board Governance Support
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Committees Should Create Clarity, Not More Confusion
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Committees are valuable when their work is organized, documented
                and translated into clear recommendations the board can act on.
              </p>

              <p>
                This module lets SPM keep committee activity connected to board
                packets, voting items, action items and final decisions so nothing
                gets lost between meetings.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This is especially useful for ARC, finance, landscape and rules
              committees that generate recurring board recommendations.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

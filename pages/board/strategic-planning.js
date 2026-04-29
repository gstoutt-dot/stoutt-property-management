import React from "react";
import Link from "next/link";

export default function StrategicPlanningCenter() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide text-white">
            Stoutt Board Portal
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-amber-300">Board Portal</Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">Violations</Link>
            <Link href="/board/architectural-approvals" className="hover:text-amber-300">ARC Approvals</Link>
            <Link href="/board/maintenance-review" className="hover:text-amber-300">Maintenance</Link>
            <Link href="/board/financial-review" className="hover:text-amber-300">Financials</Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(30,41,59,0.9),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">
              Long-Range Governance
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Strategic Planning Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A board-level planning command center for community priorities,
              1-year, 3-year, and 5-year goals, capital improvements, reserve-linked
              projects, budget impact, risk review, milestones, and long-range execution.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Planning Horizon", "5 Years"],
              ["Active Priorities", "12"],
              ["Capital Projects", "6"],
              ["Milestones Met", "74%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-bold text-amber-300">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 lg:col-span-2">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Strategic Roadmap
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Community Priority Timeline
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                2026–2031 Plan
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Year 1: Stabilize Operations",
                  status: "Active",
                  detail:
                    "Strengthen communication, improve inspection cadence, clean up open maintenance items, and establish reliable board reporting.",
                },
                {
                  title: "Year 2: Improve Community Standards",
                  status: "Planned",
                  detail:
                    "Advance consistent violation follow-up, ARC clarity, landscape improvements, and resident-facing service expectations.",
                },
                {
                  title: "Year 3: Capital Project Execution",
                  status: "Forecasted",
                  detail:
                    "Coordinate reserve-linked projects, vendor bidding, engineering input, board approvals, and phased implementation.",
                },
                {
                  title: "Year 4: Asset Modernization",
                  status: "Forecasted",
                  detail:
                    "Review aging infrastructure, amenity upgrades, technology improvements, and long-term cost controls.",
                },
                {
                  title: "Year 5: Community Value Optimization",
                  status: "Future",
                  detail:
                    "Position the association for stronger property values through disciplined governance, capital planning, and community experience.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                    </div>

                    <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Plan Health
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Execution Progress</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">74%</p>
                  <p className="mt-2 text-sm text-slate-400">Milestones on track</p>
                </div>
                <p className="text-sm text-amber-300">Target: 85%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[74%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["On Track", "17"],
                ["Needs Review", "4"],
                ["Budget Impact Items", "6"],
                ["Board Decisions Pending", "3"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span className="text-sm text-slate-400">{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "1-Year Goals",
              text: "Track immediate operating priorities, board initiatives, service improvements, and near-term deadlines.",
            },
            {
              title: "3-Year Vision",
              text: "Organize mid-range improvements, vendor strategy, community standards, and planned infrastructure needs.",
            },
            {
              title: "5-Year Roadmap",
              text: "Create a long-range plan for asset protection, property value improvement, capital needs, and governance strength.",
            },
            {
              title: "Capital Improvements",
              text: "Connect major projects to budgets, reserves, engineering reports, vendor proposals, and board approvals.",
            },
            {
              title: "Reserve-Linked Projects",
              text: "Align future repairs and replacements with reserve study timelines, funding levels, and board decisions.",
            },
            {
              title: "Budget Impact",
              text: "Monitor how strategic priorities affect assessments, reserve contributions, operating expenses, and cash flow.",
            },
            {
              title: "Risk & Opportunity",
              text: "Identify aging assets, insurance exposure, compliance concerns, deferred maintenance, and value-enhancing opportunities.",
            },
            {
              title: "Progress Milestones",
              text: "Give the board a clean view of completed, active, delayed, and upcoming strategic initiatives.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-amber-400/40 hover:bg-white/[0.06]"
            >
              <h3 className="text-xl font-bold text-white">{card.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                SPM Governance Advantage
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Boards should not only react — they should plan.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps move associations from short-term issue management
                into disciplined long-range governance, connecting today’s decisions
                to tomorrow’s property values, reserve strength, and community stability.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Strategic Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Review reserve-linked project priorities
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before next budget planning session.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

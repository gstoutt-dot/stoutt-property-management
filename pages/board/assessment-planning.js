import React from "react";
import Link from "next/link";

export default function AssessmentPlanningCenter() {
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
              Assessment Strategy & Owner Impact
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Assessment Increase Planning Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A board planning center for proposed assessment increases, owner impact
              review, budget shortfall analysis, reserve funding pressure, delinquency
              risk, communication planning, board vote preparation, and adopted
              assessment schedules.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Proposed Increase", "8.5%"],
              ["Monthly Impact", "$42"],
              ["Shortfall Covered", "91%"],
              ["Vote Readiness", "76%"],
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
                  Increase Review Path
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Assessment Planning Workflow
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Board Review Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Budget Shortfall Analysis",
                  status: "In Progress",
                  detail:
                    "Operating increases, insurance pressure, utilities, vendor contracts, repairs, reserves, and contingency needs are being reviewed.",
                },
                {
                  title: "Owner Impact Review",
                  status: "Board Review",
                  detail:
                    "Monthly owner impact, unit-type differences, affordability concerns, and communication sensitivity are being evaluated.",
                },
                {
                  title: "Reserve Funding Pressure",
                  status: "Flagged",
                  detail:
                    "Reserve contribution needs are being compared against capital project timing, reserve study assumptions, and cash flow capacity.",
                },
                {
                  title: "Delinquency Risk Forecast",
                  status: "Monitoring",
                  detail:
                    "Potential delinquency impact is being reviewed against collection history, owner payment trends, and proposed increase levels.",
                },
                {
                  title: "Final Adopted Assessment Schedule",
                  status: "Pending Vote",
                  detail:
                    "Final assessment schedule will be documented after board approval, owner notice completion, and financial setup confirmation.",
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
              Board Readiness
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Vote Preparation</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">76%</p>
                  <p className="mt-2 text-sm text-slate-400">Ready for board vote</p>
                </div>
                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[76%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Shortfall Items", "9"],
                ["Owner Questions", "14"],
                ["Notice Items", "4"],
                ["Vote Materials", "7"],
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
              title: "Proposed Increases",
              text: "Model assessment increase options by percentage, dollar amount, effective date, unit type, and funding requirement.",
            },
            {
              title: "Owner Impact Review",
              text: "Translate board financial decisions into clear monthly owner impact, communication points, and affordability context.",
            },
            {
              title: "Budget Shortfall",
              text: "Identify the financial gap caused by operating costs, insurance increases, utilities, vendor changes, repairs, and reserves.",
            },
            {
              title: "Reserve Pressure",
              text: "Connect assessment decisions to reserve contribution needs, capital projects, deferred maintenance, and long-term funding.",
            },
            {
              title: "Delinquency Risk",
              text: "Forecast collection sensitivity, owner payment behavior, delinquency exposure, and follow-up needs after adoption.",
            },
            {
              title: "Communication Planning",
              text: "Prepare owner-facing explanations, notice language, FAQ talking points, meeting scripts, and board messaging.",
            },
            {
              title: "Board Vote Prep",
              text: "Organize motions, supporting schedules, owner notices, budget references, meeting agenda items, and vote documentation.",
            },
            {
              title: "Adopted Schedule",
              text: "Store final assessment amounts, effective dates, unit allocations, adopted budget links, and QuickBooks setup notes.",
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
                Assessment increases require clarity, not guesswork.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps boards explain why an increase may be necessary,
                understand owner impact, evaluate reserve and operating pressure,
                prepare communication materials, and adopt final assessments with
                better documentation and confidence.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Assessment Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Finalize owner impact summary
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before board vote preparation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

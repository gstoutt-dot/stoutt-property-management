import React from "react";
import Link from "next/link";

export default function AnnualBudgetAdoptionWorkflow() {
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
              Financial Governance
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Annual Budget Adoption Workflow
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A formal board workflow for draft budget review, assessment planning,
              reserve contribution analysis, board workshops, owner notice requirements,
              final budget vote, adopted budget documents, and QuickBooks alignment.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Budget Cycle", "Active"],
              ["Draft Review", "78%"],
              ["Reserve Review", "Complete"],
              ["Final Vote", "Pending"],
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
                  Budget Adoption Path
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Annual Budget Approval Workflow
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Board Review Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Draft Budget Review",
                  status: "In Progress",
                  detail:
                    "Operating expenses, vendor contract changes, insurance increases, utility trends, payroll, management fees, and contingency items are under review.",
                },
                {
                  title: "Assessment Planning",
                  status: "Board Review",
                  detail:
                    "Proposed assessment levels are being reviewed against operating needs, reserve funding, collection risk, and owner impact.",
                },
                {
                  title: "Reserve Contribution Review",
                  status: "Complete",
                  detail:
                    "Reserve contribution recommendations have been compared against reserve study timelines, project priorities, and available cash flow.",
                },
                {
                  title: "Budget Workshop Preparation",
                  status: "Scheduled",
                  detail:
                    "Workshop materials, variance explanations, supporting documents, and board discussion items are being assembled.",
                },
                {
                  title: "Final Budget Vote",
                  status: "Pending",
                  detail:
                    "Final adoption is pending board review, owner notice completion, meeting agenda placement, and vote documentation.",
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
              Budget Readiness
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Adoption Progress</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">78%</p>
                  <p className="mt-2 text-sm text-slate-400">Workflow complete</p>
                </div>
                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[78%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Draft Items Open", "7"],
                ["Workshop Materials", "12"],
                ["Notice Items", "3"],
                ["QuickBooks Checks", "5"],
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
              title: "Draft Budget Review",
              text: "Review operating expenses, vendor increases, insurance changes, utilities, payroll, maintenance, and contingency planning.",
            },
            {
              title: "Assessment Planning",
              text: "Evaluate assessment levels, owner impact, cash flow needs, delinquency exposure, and budget sufficiency.",
            },
            {
              title: "Reserve Contributions",
              text: "Connect reserve funding recommendations to reserve study timelines, capital projects, replacement schedules, and board priorities.",
            },
            {
              title: "Board Workshops",
              text: "Prepare workshop agendas, supporting schedules, variance explanations, board questions, and discussion items.",
            },
            {
              title: "Owner Notices",
              text: "Track required notices, mailing dates, agenda references, meeting details, document availability, and delivery status.",
            },
            {
              title: "Final Budget Vote",
              text: "Document board motions, vote outcomes, adopted budget approval, meeting minutes, and final authorization.",
            },
            {
              title: "Adopted Documents",
              text: "Store the approved budget, reserve schedules, notices, supporting exhibits, board approvals, and final distribution records.",
            },
            {
              title: "QuickBooks Alignment",
              text: "Confirm adopted budget categories, chart of accounts alignment, assessment setup, reserve entries, and financial reporting structure.",
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
                The annual budget should be a controlled workflow, not a rushed vote.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center gives boards a disciplined path from draft review through
                adoption, making it easier to understand assessment decisions, reserve
                funding, owner notice steps, documentation requirements, and financial
                setup inside QuickBooks.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Budget Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Prepare owner notice packet
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before final budget adoption meeting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

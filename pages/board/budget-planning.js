import Link from "next/link";

export default function BoardBudgetPlanning() {
  const budgetDrivers = [
    {
      title: "Insurance Renewal Impact",
      category: "Operating Expense",
      status: "High Impact",
      priority: "Board Review",
      desc: "Projected premium increase should be modeled before draft budget approval.",
    },
    {
      title: "Landscape Contract Increase",
      category: "Vendor Cost",
      status: "Moderate Impact",
      priority: "Manager Review",
      desc: "Vendor renewal pricing requires comparison against current budget assumptions.",
    },
    {
      title: "Reserve Funding Target",
      category: "Reserve Planning",
      status: "Review Needed",
      priority: "Board Review",
      desc: "Reserve contribution assumptions should be aligned with future capital needs.",
    },
    {
      title: "Delinquency Allowance",
      category: "Revenue Risk",
      status: "Watch Item",
      priority: "Financial Review",
      desc: "Current delinquency trend may require conservative revenue forecasting.",
    },
  ];

  const workflow = [
    "Import prior-year actuals from QuickBooks",
    "Review contract and insurance increases",
    "Model reserve funding assumptions",
    "Project assessment impact scenarios",
    "Prepare draft budget for board review",
    "Finalize approved budget and archive record",
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
              Budget Planning
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
            Budget Forecasting • Assessments • Reserve Assumptions
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Give boards a smarter way to plan budgets before costs become surprises.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Model operating expenses, insurance renewals, vendor increases,
                reserve funding, delinquency trends, capital projects and
                assessment scenarios from one executive budget planning center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Projected Increase</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                7.4%
              </div>
              <div className="mt-4 text-slate-300">
                Current draft impact before board adjustments.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Draft Budget Status", "68%"],
            ["Cost Drivers", "4"],
            ["Reserve Scenarios", "3"],
            ["Assessment Models", "5"],
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
              Budget Drivers
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Items Impacting the Next Budget
            </h3>
          </div>

          <div className="space-y-5">
            {budgetDrivers.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.7fr] lg:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Category
                    </div>
                    <div className="mt-2 text-slate-200">{item.category}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Impact
                    </div>
                    <div className="mt-2 text-amber-300">{item.status}</div>
                  </div>

                  <div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                      {item.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Budget Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Planning Control Path
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
              QuickBooks Financial Intelligence
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              From Accounting Data to Board Strategy
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                QuickBooks data can support budget planning by comparing actual
                spending against approved budgets, highlighting expense categories
                that are trending above forecast and identifying recurring cost
                pressure before the next budget cycle.
              </p>

              <p>
                This gives the board a clearer view of assessment needs, reserve
                obligations and operational tradeoffs before final budget approval.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This module positions SPM as a strategic financial partner, not just
              an accounting processor.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

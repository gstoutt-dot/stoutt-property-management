import Link from "next/link";

export default function BoardInsuranceCenter() {
  const insuranceItems = [
    {
      title: "Master Policy Renewal",
      category: "Renewal",
      status: "Board Review",
      priority: "High",
      desc: "Annual renewal package requires board review of premium increase, deductible changes and coverage terms.",
    },
    {
      title: "Windstorm Deductible Review",
      category: "Coverage Risk",
      status: "Broker Follow-Up",
      priority: "High",
      desc: "Deductible structure should be reviewed with broker before final renewal recommendation.",
    },
    {
      title: "Vendor COI Expiration",
      category: "Certificates",
      status: "Expiring Soon",
      priority: "Medium",
      desc: "Several vendor insurance certificates require updates before continued work authorization.",
    },
    {
      title: "Water Damage Claim",
      category: "Claim",
      status: "Open",
      priority: "Medium",
      desc: "Claim file is active with adjuster follow-up, owner communication and documentation tracking needed.",
    },
  ];

  const workflow = [
    "Track policy renewal dates and broker deadlines",
    "Review premiums, deductibles and coverage changes",
    "Monitor active claims and documentation status",
    "Track vendor certificates of insurance",
    "Flag coverage gaps or board approval items",
    "Archive final policies, claims and renewal decisions",
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
              Insurance & Claims Center
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
            Policies • Claims • Deductibles • Risk Oversight
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Keep insurance renewals, claims and coverage risks visible before deadlines arrive.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track policy renewals, broker communication, deductible changes,
                vendor certificates, active claims, coverage questions and board
                approval items from one insurance oversight center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Renewal Window</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                60
              </div>
              <div className="mt-4 text-slate-300">
                Days before master policy board decision target.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Open Claims", "2"],
            ["COIs Expiring", "3"],
            ["Coverage Alerts", "4"],
            ["Board Approvals", "2"],
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
              Insurance Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Active Insurance & Claims Items
            </h3>
          </div>

          <div className="space-y-5">
            {insuranceItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.6fr] lg:items-center">
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
                      Status
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
              Insurance Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Risk Control Path
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
              Board Risk Intelligence
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Insurance Decisions Need Visibility
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Insurance is one of the largest and most sensitive association
                expense categories. Boards need clear visibility into premium
                changes, deductibles, claims history, coverage terms and renewal
                timing before decisions are required.
              </p>

              <p>
                This module helps SPM organize broker communication, claim
                updates, coverage concerns and board approvals into a controlled,
                documented workflow.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This is especially valuable in Florida, where insurance renewals
              can materially affect budgets, assessments and board planning.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

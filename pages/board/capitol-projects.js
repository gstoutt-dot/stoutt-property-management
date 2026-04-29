import Link from "next/link";

export default function BoardCapitalProjects() {
  const projects = [
    {
      title: "Roof Replacement Planning",
      category: "Reserve Project",
      phase: "Bid Review",
      priority: "High",
      desc: "Major roof project is in bid comparison with reserve funding and owner communication review needed.",
    },
    {
      title: "Exterior Painting Program",
      category: "Capital Maintenance",
      phase: "Scope Development",
      priority: "Medium",
      desc: "Building exterior repainting scope is being prepared for vendor pricing and board discussion.",
    },
    {
      title: "Parking Lot Resurfacing",
      category: "Infrastructure",
      phase: "Reserve Forecast",
      priority: "Medium",
      desc: "Paving project is being modeled against reserve timing and future assessment impact.",
    },
    {
      title: "Clubhouse HVAC Replacement",
      category: "Mechanical",
      phase: "Board Approval",
      priority: "High",
      desc: "Replacement proposal exceeds manager approval authority and requires board vote.",
    },
  ];

  const workflow = [
    "Identify major repair or capital need",
    "Confirm reserve study and funding assumptions",
    "Prepare scope of work and bid package",
    "Compare vendor proposals and exclusions",
    "Route recommendation to board approval",
    "Track project milestones and owner updates",
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
              Capital Projects
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
            Major Repairs • Reserve Projects • Board Approvals
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Manage major projects with board-level visibility from planning to completion.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track roofs, painting, paving, mechanical replacements, reserve-funded
                repairs, vendor bids, project phases, approvals, funding exposure and
                owner communication from one capital project center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Active Capital Projects</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                2 require board action before moving forward.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Projected Spend", "$485K"],
            ["Reserve Funded", "72%"],
            ["Pending Bids", "6"],
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
              Project Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Active Capital Projects
            </h3>
          </div>

          <div className="space-y-5">
            {projects.map((item) => (
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
                      Phase
                    </div>
                    <div className="mt-2 text-amber-300">{item.phase}</div>
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
              Project Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Capital Project Control Path
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
              Board Project Intelligence
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              From Major Repair to Board-Ready Decision
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Capital projects require more than a work order. Boards need clear
                scope, vendor comparisons, reserve impact, funding options, owner
                communication timing and documented approval steps.
              </p>

              <p>
                This module gives SPM a polished way to show boards that major
                repairs are being managed strategically, financially and
                operationally from start to finish.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This is especially powerful for roofs, paving, painting, elevators,
              structural work and other high-dollar association decisions.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

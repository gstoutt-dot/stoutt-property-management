import React from "react";
import Link from "next/link";

export default function ReserveStudyActionCenter() {
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
              Reserve Planning & Capital Readiness
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Reserve Study Action Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A board execution hub that turns reserve study recommendations into
              organized action — tracking components, useful life timelines, funding
              gaps, replacement planning, vendor links, project priorities, and reserve
              study documents.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Reserve Health", "71%"],
              ["Components", "48"],
              ["Funding Gap", "$312K"],
              ["Action Items", "14"],
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
                  Reserve Study Execution
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Priority Components & Board Actions
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Reserve Review Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Roof Replacement Planning",
                  status: "High Priority",
                  detail:
                    "Useful life timeline, projected replacement cost, reserve allocation, engineering review, and vendor estimate pathway are being tracked.",
                },
                {
                  title: "Pavement & Asphalt Resurfacing",
                  status: "Funding Review",
                  detail:
                    "Component cost assumptions, remaining useful life, vendor pricing, phased project options, and reserve gap impact are under review.",
                },
                {
                  title: "Pool Equipment Replacement",
                  status: "Action Needed",
                  detail:
                    "Pump, heater, filtration, and related equipment timelines are being compared against reserve study recommendations and service history.",
                },
                {
                  title: "Building Painting & Waterproofing",
                  status: "Forecasted",
                  detail:
                    "Exterior coating cycles, waterproofing needs, cost escalation, inspection timing, and project sequencing are being evaluated.",
                },
                {
                  title: "Gate & Access System Modernization",
                  status: "Vendor Link Pending",
                  detail:
                    "Reserve category, replacement options, useful life assumptions, vendor proposals, and technology upgrade timing are being organized.",
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
              Reserve Funding
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Funding Alignment</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">71%</p>
                  <p className="mt-2 text-sm text-slate-400">Reserve health score</p>
                </div>
                <p className="text-sm text-amber-300">Target: 90%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[71%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Total Components", "48"],
                ["Underfunded Items", "9"],
                ["Near-Term Projects", "6"],
                ["Board Actions", "14"],
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
              title: "Study Recommendations",
              text: "Turn reserve study recommendations into tracked board priorities, timelines, funding needs, and follow-up actions.",
            },
            {
              title: "Component Tracking",
              text: "Track each reserve component by category, condition, useful life, replacement year, estimated cost, and funding status.",
            },
            {
              title: "Useful Life Timelines",
              text: "Monitor remaining useful life, projected replacement windows, inspection cadence, and risk of deferral.",
            },
            {
              title: "Funding Gaps",
              text: "Identify underfunded components, contribution shortfalls, cost escalation, reserve pressure, and assessment implications.",
            },
            {
              title: "Capital Replacement Planning",
              text: "Connect reserve timelines to capital projects, vendor estimates, engineering reports, board approvals, and budget planning.",
            },
            {
              title: "Board Action Items",
              text: "Assign next steps for reserve reviews, vendor proposals, inspections, funding decisions, and project authorization.",
            },
            {
              title: "Vendor & Project Links",
              text: "Connect reserve components to vendor proposals, active projects, contract approvals, and capital project workflows.",
            },
            {
              title: "Study Document Storage",
              text: "Store reserve studies, updates, component schedules, funding models, board approvals, and supporting exhibits.",
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
                A reserve study only matters when it becomes action.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps boards move beyond storing reserve studies by converting
                recommendations into visible priorities, funding decisions, vendor actions,
                project planning, and long-term protection of association assets.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Reserve Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Review underfunded near-term components
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before the next budget planning discussion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

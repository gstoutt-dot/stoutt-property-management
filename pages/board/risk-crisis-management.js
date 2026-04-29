import React from "react";
import Link from "next/link";

export default function RiskCrisisManagementCenter() {
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
              Risk, Safety & Emergency Readiness
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Risk & Crisis Management Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A board-level command center for emergency planning, hurricane readiness,
              insurance exposure, life safety issues, critical vendor contacts, incident
              tracking, compliance risk, crisis communications, and recovery action plans.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Readiness Level", "High"],
              ["Open Risk Items", "8"],
              ["Critical Vendors", "12"],
              ["Recovery Tasks", "91%"],
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
                  Crisis Command Board
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Active Risk & Emergency Priorities
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Preparedness Review Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Hurricane Readiness Plan",
                  status: "Updated",
                  detail:
                    "Storm preparation checklist, vendor response assignments, owner communications, and post-storm inspection workflow are current.",
                },
                {
                  title: "Life Safety & Access Controls",
                  status: "Monitoring",
                  detail:
                    "Gate access, fire/life safety systems, emergency lighting, pool safety, and elevator readiness are under active review.",
                },
                {
                  title: "Insurance Exposure Review",
                  status: "Board Review",
                  detail:
                    "Policy limits, deductibles, exclusions, renewal risks, claim history, and coverage gaps are queued for board discussion.",
                },
                {
                  title: "Critical Vendor Response List",
                  status: "Verified",
                  detail:
                    "Emergency contacts for restoration, plumbing, electrical, roofing, security, elevator, gate, and cleanup vendors are confirmed.",
                },
                {
                  title: "Crisis Communication Protocol",
                  status: "Ready",
                  detail:
                    "Resident notices, board updates, manager scripts, vendor escalation messages, and emergency announcement templates are staged.",
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
              Recovery Readiness
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Action Plan Progress</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">91%</p>
                  <p className="mt-2 text-sm text-slate-400">Recovery tasks prepared</p>
                </div>
                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[91%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Emergency Vendors", "12"],
                ["Open Incidents", "2"],
                ["Insurance Items", "4"],
                ["Board Actions", "3"],
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
              title: "Emergency Planning",
              text: "Centralize emergency procedures, response roles, board responsibilities, manager tasks, and owner communication plans.",
            },
            {
              title: "Hurricane Readiness",
              text: "Track pre-storm inspections, vendor staging, owner notices, generator/fuel checks, shutters, drainage, and post-storm actions.",
            },
            {
              title: "Insurance Exposure",
              text: "Monitor policy limits, deductibles, coverage gaps, renewal concerns, claims history, and broker follow-up items.",
            },
            {
              title: "Life Safety Issues",
              text: "Prioritize elevator, gate, fire, lighting, pool, structural, access, security, and urgent habitability concerns.",
            },
            {
              title: "Critical Vendors",
              text: "Maintain emergency-ready contacts for restoration, roofing, plumbing, electrical, security, elevator, gate, and cleanup vendors.",
            },
            {
              title: "Incident Tracking",
              text: "Log incidents, dates, photos, vendor response, resident impact, insurance relevance, legal notes, and resolution status.",
            },
            {
              title: "Legal & Compliance Risk",
              text: "Flag unresolved violations, statutory deadlines, board exposure, document conflicts, claims risk, and escalation requirements.",
            },
            {
              title: "Recovery Action Plans",
              text: "Coordinate post-event inspections, vendor deployment, owner updates, insurance documentation, repairs, and final closeout.",
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
                Calm boards are prepared boards.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps associations move from reactive crisis handling to
                disciplined emergency readiness, giving the board visibility into risks,
                vendors, insurance exposure, communication steps, and recovery progress
                before pressure hits.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Risk Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Review insurance exposure summary
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before the next board risk review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

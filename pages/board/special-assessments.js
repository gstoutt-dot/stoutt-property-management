import React from "react";
import Link from "next/link";

export default function SpecialAssessmentCenter() {
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
              Special Funding & Board Approval
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Special Assessment Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A dedicated control center for special assessment proposals, funding need
              analysis, owner impact modeling, payment plan options, legal and notice
              requirements, board approval workflow, collection tracking, and final
              adopted special assessment documents.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Funding Need", "$485K"],
              ["Owner Impact", "$1,850"],
              ["Collection Target", "94%"],
              ["Approval Status", "Pending"],
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
                  Special Assessment Workflow
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Funding Approval Path
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Board Review Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Funding Need Analysis",
                  status: "In Progress",
                  detail:
                    "Project scope, vendor estimates, engineering input, reserves available, contingency needs, and total funding gap are being reviewed.",
                },
                {
                  title: "Owner Impact Modeling",
                  status: "Board Review",
                  detail:
                    "Per-unit assessment amounts, installment options, due dates, payment timing, and owner communication concerns are being evaluated.",
                },
                {
                  title: "Payment Plan Options",
                  status: "Drafted",
                  detail:
                    "Single-payment and installment alternatives are being prepared for board review, owner impact discussion, and collection setup.",
                },
                {
                  title: "Legal & Notice Requirements",
                  status: "Counsel Review",
                  detail:
                    "Meeting notice, statutory timing, governing document requirements, vote thresholds, and adoption language are under review.",
                },
                {
                  title: "Final Adoption Package",
                  status: "Pending Vote",
                  detail:
                    "Final resolution, adopted schedule, owner notice packet, collection instructions, and document storage are pending board approval.",
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
              Collection Outlook
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Funding Progress</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">94%</p>
                  <p className="mt-2 text-sm text-slate-400">Projected collection target</p>
                </div>
                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[94%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Total Need", "$485K"],
                ["Reserve Offset", "$125K"],
                ["Owner Funding", "$360K"],
                ["Payment Options", "3"],
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
              title: "Assessment Proposals",
              text: "Organize proposed special assessments by project, funding need, unit allocation, timing, and board review status.",
            },
            {
              title: "Funding Need Analysis",
              text: "Compare total project cost, reserve availability, vendor estimates, engineering reports, contingency needs, and funding gaps.",
            },
            {
              title: "Owner Impact Modeling",
              text: "Model per-owner cost, installment schedules, due dates, hardship concerns, and communication sensitivity.",
            },
            {
              title: "Payment Plan Options",
              text: "Prepare single-payment, staged-payment, and installment options with timelines, collection rules, and board considerations.",
            },
            {
              title: "Legal Requirements",
              text: "Track counsel review, notice timing, governing document requirements, vote thresholds, resolutions, and adoption language.",
            },
            {
              title: "Board Approval Workflow",
              text: "Manage motions, meeting agenda placement, supporting exhibits, vote status, director notes, and final authorization.",
            },
            {
              title: "Collection Tracking",
              text: "Monitor billed amounts, payments received, installment compliance, delinquencies, owner follow-up, and collection progress.",
            },
            {
              title: "Adopted Documents",
              text: "Store final resolutions, owner notices, adopted schedules, payment instructions, meeting minutes, and funding records.",
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
                Special assessments demand structure, transparency, and discipline.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps boards explain the need, document the funding gap,
                compare payment options, satisfy notice and approval requirements, and
                track collections after adoption with clarity and accountability.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Special Assessment Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Finalize legal notice review
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before board approval vote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

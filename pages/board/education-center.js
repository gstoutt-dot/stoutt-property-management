import React from "react";
import Link from "next/link";

export default function BoardEducationCenter() {
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
              Board Knowledge & Training
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Board Education Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A premium training hub that helps board members understand governance,
              fiduciary responsibilities, Florida association basics, meeting procedures,
              budgets, reserves, violations, ARC decisions, and required board workflows.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Training Status", "82%"],
              ["Required Courses", "9"],
              ["Completed Modules", "34"],
              ["Board Members", "5 Active"],
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
                  Learning Path
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Board Member Orientation
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                7 of 9 Modules Complete
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "New Board Member Orientation",
                  status: "Complete",
                  detail:
                    "Introduces board structure, director responsibilities, management expectations, and owner communication standards.",
                },
                {
                  title: "Fiduciary Duty & Decision Standards",
                  status: "Complete",
                  detail:
                    "Covers duty of care, duty of loyalty, confidentiality, conflicts, and consistent board decision-making.",
                },
                {
                  title: "Florida Condo & HOA Governance Basics",
                  status: "In Progress",
                  detail:
                    "Explains core association governance concepts, documents, meetings, notices, elections, and records.",
                },
                {
                  title: "Meeting Procedures & Board Conduct",
                  status: "Assigned",
                  detail:
                    "Guides directors through agendas, motions, minutes, owner participation, executive sessions, and voting procedures.",
                },
                {
                  title: "Budget, Reserves & Financial Oversight",
                  status: "Assigned",
                  detail:
                    "Helps board members understand budgets, assessments, reserves, delinquencies, financial reports, and approval controls.",
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
              Completion Overview
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Training Progress</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">82%</p>
                  <p className="mt-2 text-sm text-slate-400">Board training completion</p>
                </div>
                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[82%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Completed", "34"],
                ["In Progress", "6"],
                ["Assigned", "8"],
                ["Overdue", "1"],
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
              title: "Florida Association Basics",
              text: "Core training for understanding declarations, bylaws, rules, board authority, notices, and owner records.",
            },
            {
              title: "Fiduciary Duties",
              text: "Guidance for responsible board decisions, conflicts of interest, confidentiality, and consistent enforcement.",
            },
            {
              title: "Meeting Procedures",
              text: "Training on agendas, motions, minutes, voting procedures, owner comments, and executive sessions.",
            },
            {
              title: "Budget & Reserves",
              text: "Education on budget review, assessments, reserves, financial reports, collections, and capital planning.",
            },
            {
              title: "Violations Guidance",
              text: "Decision support for consistent enforcement, notice standards, hearings, fines, and documentation.",
            },
            {
              title: "ARC Decision Training",
              text: "Helps board and committee members review architectural applications with fairness and document consistency.",
            },
            {
              title: "Document Library",
              text: "Centralized access to governance guides, board policies, forms, procedures, and training references.",
            },
            {
              title: "Completion Tracking",
              text: "Board-level visibility into required learning, assigned modules, overdue items, and certification status.",
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
                Better educated boards make better decisions.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps reduce confusion, inconsistency, and unnecessary risk
                by giving board members a structured path to understand their role,
                responsibilities, and decision-making standards.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Recommended Training</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Budget, Reserves & Financial Oversight
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before the next budget planning session.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

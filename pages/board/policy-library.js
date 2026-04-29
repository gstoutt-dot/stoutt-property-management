import React from "react";
import Link from "next/link";

export default function BoardPolicyLibrary() {
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
              Governance Documents & Board Standards
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Board Policy Library
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A centralized governance hub for board-adopted policies, rules and
              regulations, enforcement standards, collection policies, ARC guidelines,
              meeting conduct policies, document retention, and policy review dates.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Active Policies", "38"],
              ["Review Needed", "6"],
              ["Adopted This Year", "9"],
              ["Compliance Status", "94%"],
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
                  Policy Register
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Board-Adopted Policies Under Review
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Annual Review Cycle
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Collections & Delinquency Policy",
                  status: "Review Needed",
                  detail:
                    "Defines late notices, attorney referral timing, payment plans, owner communication, fees, and escalation requirements.",
                },
                {
                  title: "Violation Enforcement Policy",
                  status: "Active",
                  detail:
                    "Provides consistent enforcement standards for notices, hearings, fines, documentation, photos, and repeat violations.",
                },
                {
                  title: "Architectural Review Guidelines",
                  status: "Updated",
                  detail:
                    "Clarifies ARC submission requirements, review standards, approval conditions, completion deadlines, and owner obligations.",
                },
                {
                  title: "Board Meeting Conduct Policy",
                  status: "Board Review",
                  detail:
                    "Addresses meeting order, owner comments, speaking limits, agenda control, director conduct, and executive session protocol.",
                },
                {
                  title: "Document Retention Policy",
                  status: "Counsel Review",
                  detail:
                    "Organizes retention periods, official records, contracts, financials, minutes, ballots, owner correspondence, and archive standards.",
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
              Library Health
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Policy Readiness</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">94%</p>
                  <p className="mt-2 text-sm text-slate-400">Current policy compliance</p>
                </div>
                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[94%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Active Policies", "38"],
                ["Review Needed", "6"],
                ["Counsel Review", "2"],
                ["Expired Review Dates", "1"],
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
              title: "Board-Adopted Policies",
              text: "Store official board policies with adoption dates, review cycles, approval records, related minutes, and current status.",
            },
            {
              title: "Rules & Regulations",
              text: "Organize community rules, resident standards, common area policies, amenity rules, parking rules, and use restrictions.",
            },
            {
              title: "Enforcement Policies",
              text: "Centralize violation notice standards, hearing procedures, fine schedules, documentation rules, and escalation steps.",
            },
            {
              title: "Collection Policies",
              text: "Track late fees, notice timing, payment plan standards, attorney referral thresholds, owner communication, and collection steps.",
            },
            {
              title: "ARC Guidelines",
              text: "Maintain architectural standards, application requirements, review timelines, approval conditions, and project completion rules.",
            },
            {
              title: "Meeting Conduct",
              text: "Document meeting procedures, owner comment rules, agenda control, board conduct expectations, and executive session protocol.",
            },
            {
              title: "Document Retention",
              text: "Define storage timelines for official records, minutes, contracts, financials, ballots, notices, emails, and owner files.",
            },
            {
              title: "Review Dates",
              text: "Track annual policy review dates, expired policies, counsel review needs, board approvals, and pending updates.",
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
                Consistent policies create consistent governance.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This library helps boards avoid outdated rules, inconsistent enforcement,
                missing review dates, and scattered policy records by keeping every
                adopted standard organized, visible, and connected to board action.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Policy Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Review collections policy update
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before annual policy review closes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

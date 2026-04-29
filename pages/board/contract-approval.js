import React from "react";
import Link from "next/link";

export default function ContractApprovalCenter() {
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
              Vendor Governance & Contract Control
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Contract Approval Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A board-level control center for vendor contract review, proposal
              comparisons, board approvals, insurance and license verification,
              renewal dates, legal review, spending authority, and signed agreement
              storage.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Pending Approval", "6"],
              ["Renewals Due", "4"],
              ["Vendor Proposals", "18"],
              ["Verified Contracts", "92%"],
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
                  Approval Queue
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Contracts Awaiting Board Action
                </h2>
              </div>

              <span className="w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                Board Review Active
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Landscape Maintenance Renewal",
                  status: "Board Vote Needed",
                  detail:
                    "Three-year renewal option submitted with updated pricing, scope confirmation, insurance certificate, and service schedule.",
                },
                {
                  title: "Pool Service Agreement",
                  status: "Legal Review",
                  detail:
                    "Contract terms under review for cancellation rights, response obligations, chemical logs, and liability language.",
                },
                {
                  title: "Security Camera Upgrade",
                  status: "Proposal Comparison",
                  detail:
                    "Three vendor proposals are being compared for pricing, warranty, equipment quality, installation timeline, and support terms.",
                },
                {
                  title: "Elevator Maintenance Contract",
                  status: "Renewal Watch",
                  detail:
                    "Renewal deadline approaching with escalation clauses, exclusions, callback fees, and service response terms flagged.",
                },
                {
                  title: "Roof Repair Agreement",
                  status: "Insurance Pending",
                  detail:
                    "Vendor selected pending updated liability certificate, workers compensation proof, license verification, and final board approval.",
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
              Contract Health
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Verification Status</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">92%</p>
                  <p className="mt-2 text-sm text-slate-400">Contracts verified</p>
                </div>
                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[92%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Pending Approval", "6"],
                ["Legal Review", "2"],
                ["Insurance Needed", "3"],
                ["Renewals Due", "4"],
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
              title: "Vendor Contract Review",
              text: "Organize contract terms, scope, pricing, cancellation rights, renewal language, warranty terms, and board notes.",
            },
            {
              title: "Proposal Comparisons",
              text: "Compare vendor bids side by side using pricing, scope, insurance, timeline, exclusions, references, and value.",
            },
            {
              title: "Board Approval Workflow",
              text: "Track motions, votes, approval status, director questions, required documents, and meeting packet readiness.",
            },
            {
              title: "Insurance Verification",
              text: "Confirm liability coverage, workers compensation, additional insured endorsements, expiration dates, and certificate status.",
            },
            {
              title: "License Tracking",
              text: "Monitor vendor license numbers, expiration dates, trade requirements, compliance gaps, and renewal reminders.",
            },
            {
              title: "Renewal Calendar",
              text: "Prevent missed deadlines by tracking renewal dates, notice windows, auto-renewal clauses, and termination rights.",
            },
            {
              title: "Spending Authority",
              text: "Connect contract values to budget limits, board approval thresholds, reserve funding, and management authorization.",
            },
            {
              title: "Signed Agreement Storage",
              text: "Store executed contracts, certificates, exhibits, amendments, warranties, board approvals, and vendor correspondence.",
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
                Better contract control means fewer surprises.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps boards avoid scattered vendor approvals, missed
                renewal dates, undocumented spending decisions, uninsured vendor exposure,
                and contract confusion by giving every agreement a clear approval path.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Contract Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Review landscape renewal comparison
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Recommended before next board approval vote.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

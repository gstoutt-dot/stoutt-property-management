import React from "react";
import Link from "next/link";

export default function BoardElectionsCenter() {
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,0.9),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">
              Governance Operations
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Board Elections & Annual Meeting Center
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              A centralized command center for nominations, candidates, proxies,
              quorum tracking, ballots, annual meeting notices, election documents,
              and final certified results.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Election Status", "Active"],
              ["Quorum Progress", "68%"],
              ["Candidate Slate", "7 Submitted"],
              ["Proxy Forms", "143 Received"],
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
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Election Workflow
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">
                  Annual Meeting Readiness
                </h2>
              </div>
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                In Progress
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Nomination Window",
                  status: "Open",
                  detail: "Candidate nominations are currently being accepted and reviewed for eligibility.",
                },
                {
                  title: "Candidate Verification",
                  status: "Reviewing",
                  detail: "Ownership status, account standing, and eligibility requirements are being confirmed.",
                },
                {
                  title: "Annual Meeting Notice",
                  status: "Draft Ready",
                  detail: "Notice package prepared for board approval before distribution to owners.",
                },
                {
                  title: "Proxy & Ballot Collection",
                  status: "Active",
                  detail: "Incoming proxies and ballots are tracked against quorum and voting requirements.",
                },
                {
                  title: "Final Results Certification",
                  status: "Pending",
                  detail: "Final tabulation and certification will be completed after the annual meeting.",
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
              Quorum Tracker
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">Meeting Threshold</h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">68%</p>
                  <p className="mt-2 text-sm text-slate-400">Current quorum progress</p>
                </div>
                <p className="text-sm text-amber-300">Target: 75%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[68%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Owners Required", "220"],
                ["Verified Proxies", "143"],
                ["Ballots Logged", "117"],
                ["Remaining Needed", "22"],
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
              title: "Nominations",
              text: "Track submitted nominations, eligibility review, board notes, and nomination deadlines.",
            },
            {
              title: "Candidate Tracking",
              text: "Manage candidate profiles, disclosures, biographies, and approval status.",
            },
            {
              title: "Proxy Management",
              text: "Monitor proxy forms received, verified, rejected, and pending correction.",
            },
            {
              title: "Ballot Control",
              text: "Organize ballot distribution, receipt tracking, secure tabulation, and audit records.",
            },
            {
              title: "Annual Notices",
              text: "Prepare annual meeting notices, agenda packets, mailing dates, and delivery status.",
            },
            {
              title: "Election Documents",
              text: "Store notices, proxies, ballots, candidate forms, meeting packets, and certifications.",
            },
            {
              title: "Final Results",
              text: "Publish certified election results, elected directors, vote totals, and meeting outcomes.",
            },
            {
              title: "Board Oversight",
              text: "Give directors a clean view of election readiness, risks, and next required actions.",
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
                Elections managed with clarity, documentation, and confidence.
              </h2>
              <p className="mt-4 max-w-3xl text-slate-300">
                This center helps boards avoid disorganized annual meetings by keeping
                every election requirement visible, tracked, and documented from the
                nomination period through final certification.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Board Action</p>
              <p className="mt-2 text-xl font-semibold text-white">
                Approve annual meeting notice package
              </p>
              <p className="mt-3 text-sm text-amber-200">
                Due before owner distribution window opens.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

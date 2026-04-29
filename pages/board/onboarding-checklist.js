// pages/board/onboarding-checklist.js

import Link from "next/link";

export default function BoardOnboardingChecklist() {
  const onboardingSteps = [
    {
      title: "Board Member Profile Created",
      status: "Complete",
      detail: "Director record, term dates, position, contact details, and access level established.",
    },
    {
      title: "Portal Access Confirmed",
      status: "In Progress",
      detail: "Secure login, board dashboard access, notification preferences, and role permissions verified.",
    },
    {
      title: "Governing Documents Reviewed",
      status: "Pending",
      detail: "Declaration, bylaws, articles, rules, policies, budgets, reserve documents, and contracts reviewed.",
    },
    {
      title: "Financial Orientation Completed",
      status: "Pending",
      detail: "Budget, reserve study, delinquency report, vendor payments, assessments, and QuickBooks workflow reviewed.",
    },
  ];

  const acknowledgments = [
    "Declaration of Covenants",
    "Bylaws and Articles",
    "Rules and Regulations",
    "Current Approved Budget",
    "Reserve Study",
    "Insurance Summary",
    "Board Code of Conduct",
    "Conflict of Interest Policy",
  ];

  const trainingItems = [
    { label: "Board responsibilities overview", progress: "Complete" },
    { label: "Financial review process", progress: "Pending" },
    { label: "Compliance and violations process", progress: "In Progress" },
    { label: "Vendor and contract approval process", progress: "Pending" },
    { label: "Meeting, voting, and minutes procedures", progress: "Complete" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Stoutt Property Management
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Board Onboarding Checklist
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                A complete onboarding pathway for new board members to understand their role,
                review essential documents, gain portal access, and acknowledge key governance
                responsibilities.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Onboarding Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">In Progress</div>
              <div className="mt-1 text-sm text-slate-300">Board member setup active</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm">
            <Link href="/board" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Board Portal
            </Link>
            <Link href="/board/violation-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Violations
            </Link>
            <Link href="/board/architectural-approvals" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              ARC Approvals
            </Link>
            <Link href="/board/maintenance-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Maintenance
            </Link>
            <Link href="/board/financial-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Financials
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-7 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
              Purpose
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Every board member starts with clarity.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This checklist helps ensure every director understands their role,
              reviews the required documents, receives proper portal access, and
              acknowledges key responsibilities before making association decisions.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Why It Matters
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Strong governance begins before the first vote.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              New directors need a structured path into documents, financials,
              compliance obligations, pending projects, vendor relationships, and
              board decision history.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-7 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Digital Record
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Acknowledgments are tracked.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Each completed item can become part of the association’s governance
              archive, creating a clean record of orientation, disclosure, access,
              and training completion.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {onboardingSteps.map((step) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    step.status === "Complete"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : step.status === "In Progress"
                      ? "bg-amber-400/15 text-amber-300"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {step.status}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Document Acknowledgment
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Required Review Checklist
                </h2>
              </div>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-right">
                <p className="text-2xl font-semibold text-amber-300">8</p>
                <p className="text-xs text-slate-400">Documents</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {acknowledgments.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-4"
                >
                  <div>
                    <p className="font-medium">{item}</p>
                    <p className="text-xs text-slate-500">
                      Digital acknowledgment required
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      index < 3
                        ? "bg-emerald-400/15 text-emerald-300"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {index < 3 ? "Signed" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Training Completion
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Orientation Progress
                </h2>
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-right">
                <p className="text-2xl font-semibold text-emerald-300">40%</p>
                <p className="text-xs text-slate-400">Complete</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {trainingItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium">{item.label}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.progress === "Complete"
                          ? "bg-emerald-400/15 text-emerald-300"
                          : item.progress === "In Progress"
                          ? "bg-amber-400/15 text-amber-300"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {item.progress}
                    </span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-slate-800">
                    <div
                      className={`h-2 rounded-full ${
                        item.progress === "Complete"
                          ? "w-full bg-emerald-400"
                          : item.progress === "In Progress"
                          ? "w-1/2 bg-amber-400"
                          : "w-1/5 bg-slate-600"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Portal Setup
            </p>
            <h2 className="mt-3 text-xl font-semibold">Access Confirmation</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>✓ Secure board portal login issued</li>
              <li>✓ Two-factor authentication enabled</li>
              <li>✓ Notification preferences reviewed</li>
              <li>✓ Board dashboard access confirmed</li>
              <li>• Mobile access pending confirmation</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Role Assignment
            </p>
            <h2 className="mt-3 text-xl font-semibold">Governance Authority</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>✓ Officer position assigned</li>
              <li>✓ Committee access mapped</li>
              <li>✓ Voting permission verified</li>
              <li>• Signature authority pending</li>
              <li>• Financial approval threshold pending</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Orientation Areas
            </p>
            <h2 className="mt-3 text-xl font-semibold">Core Review Tracks</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>✓ Governance documents</li>
              <li>✓ Meeting procedures</li>
              <li>• Financial reports</li>
              <li>• Compliance workflow</li>
              <li>• Vendor and contract oversight</li>
            </ul>
          </section>
        </div>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/30">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                Governance Commentary
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Board onboarding should protect the association, not just welcome the director.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
                A structured onboarding record helps prevent confusion, missed
                obligations, unauthorized access, incomplete financial understanding,
                and inconsistent decision-making. When every board member enters
                through the same process, the association gains continuity,
                accountability, and a cleaner governance record.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm font-semibold text-white">Digital Record Summary</p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-400">Acknowledgments signed</span>
                  <span className="font-semibold text-emerald-300">3 / 8</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-400">Training tracks complete</span>
                  <span className="font-semibold text-amber-300">2 / 5</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-400">Access setup</span>
                  <span className="font-semibold text-emerald-300">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Governance archive</span>
                  <span className="font-semibold text-slate-200">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

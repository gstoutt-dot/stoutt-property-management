import Link from "next/link";

export default function BoardLegalReview() {
  const legalItems = [
    {
      title: "Violation enforcement review",
      category: "Compliance",
      status: "Attorney Review",
      priority: "High",
      desc: "Enforcement matter requires review before additional fines or legal action are pursued.",
    },
    {
      title: "Vendor contract language question",
      category: "Contract",
      status: "Manager Review",
      priority: "Medium",
      desc: "Service agreement contains renewal and termination language requiring confirmation.",
    },
    {
      title: "Owner demand letter received",
      category: "Owner Dispute",
      status: "Board Sensitive",
      priority: "High",
      desc: "Owner correspondence raises legal concerns and should be routed through controlled review.",
    },
    {
      title: "Statutory deadline question",
      category: "Florida Compliance",
      status: "Research Needed",
      priority: "Medium",
      desc: "Upcoming board action may require confirmation of notice, timing or statutory process.",
    },
  ];

  const workflow = [
    "Identify board-sensitive legal or compliance issue",
    "Collect supporting documents and communication history",
    "Determine whether attorney referral is required",
    "Prepare manager summary and risk explanation",
    "Track attorney response and board direction",
    "Archive legal review record and final action",
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
              Legal Review & Risk Center
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
            Attorney Referrals • Risk Flags • Legal Oversight
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Keep legal-sensitive matters organized, documented and under control.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track attorney referrals, demand letters, enforcement questions,
                statutory concerns, contract review issues, litigation exposure and
                board-sensitive legal matters from one controlled review center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Legal Risk Items</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                2 require attorney or board-level review.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Attorney Review", "1"],
            ["Board Sensitive", "2"],
            ["Contract Questions", "1"],
            ["Research Needed", "1"],
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
              Legal Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Matters Requiring Controlled Review
            </h3>
          </div>

          <div className="space-y-5">
            {legalItems.map((item) => (
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
              Legal Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Review & Referral Path
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
              Board Risk Protection
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Legal Issues Need Process, Not Panic
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Board-sensitive legal issues become more manageable when the
                supporting facts, documents, communications and risk questions are
                organized before attorney involvement or board action.
              </p>

              <p>
                This module helps SPM separate routine manager review from matters
                that require legal counsel, board direction or formal documentation.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This is an oversight tool, not legal advice. Final legal guidance
              should remain with association counsel.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

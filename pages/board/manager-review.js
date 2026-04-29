import Link from "next/link";

export default function BoardManagerReview() {
  const reviewItems = [
    {
      title: "Owner escalation needs board recommendation",
      source: "Owner Escalations",
      type: "Resident Issue",
      status: "Manager Review",
      priority: "High",
      desc: "Repeated service complaint should be reviewed before being elevated to the board.",
    },
    {
      title: "Vendor proposal exceeds approval threshold",
      source: "Vendors",
      type: "Financial Exception",
      status: "Prepare Recommendation",
      priority: "High",
      desc: "Proposal requires manager summary, bid comparison and board-ready recommendation.",
    },
    {
      title: "Violation dispute requires document review",
      source: "Violations",
      type: "Compliance",
      status: "Research Needed",
      priority: "Medium",
      desc: "Owner dispute should be reviewed against governing documents before board action.",
    },
    {
      title: "AI flagged maintenance delay",
      source: "AI Assistant",
      type: "Maintenance",
      status: "Follow-Up Needed",
      priority: "Medium",
      desc: "AI detected repeat owner inquiry tied to unresolved maintenance request.",
    },
  ];

  const workflow = [
    "Review AI and portal-flagged items",
    "Verify facts, documents and communication history",
    "Determine whether board visibility is required",
    "Prepare manager recommendation",
    "Route item to correct board module",
    "Archive decision path and follow-up actions",
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
              Manager Review Center
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
            Internal Control • Board Routing • Manager Recommendations
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Review, filter and prepare issues before they reach the board.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                The Manager Review Center gives SPM a professional control layer
                for AI-flagged issues, owner escalations, maintenance exceptions,
                violation disputes, financial concerns and vendor matters before
                they become board decisions.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Items Awaiting Review</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                2 are high-priority and should be prepared for board routing.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["High Priority", "2"],
            ["Needs Research", "1"],
            ["Board Ready", "3"],
            ["Resolved This Week", "9"],
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
              Manager Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Items Requiring Management Review
            </h3>
          </div>

          <div className="space-y-5">
            {reviewItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.7fr_0.7fr_0.75fr_0.6fr] lg:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Source
                    </div>
                    <div className="mt-2 text-slate-200">{item.source}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Type
                    </div>
                    <div className="mt-2 text-slate-200">{item.type}</div>
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
              Manager Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Review Before Escalation
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
              Board-Ready Recommendations
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Management Summary Builder
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Before a matter reaches the board, the manager can prepare a
                clean recommendation that includes the issue summary, supporting
                facts, financial impact, governing document reference, risk level
                and proposed action.
              </p>

              <p>
                This prevents boards from receiving raw problems. They receive
                organized, decision-ready recommendations with clear next steps.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This module reinforces SPM’s operating model: proactive management,
              intelligent systems and controlled board escalation.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

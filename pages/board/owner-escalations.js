import Link from "next/link";

export default function BoardOwnerEscalations() {
  const escalations = [
    {
      title: "Repeated maintenance follow-up request",
      type: "Maintenance",
      priority: "High",
      status: "Board Visibility",
      desc: "Owner has contacted management three times regarding the same unresolved exterior lighting issue.",
    },
    {
      title: "Violation dispute awaiting review",
      type: "Compliance",
      priority: "Medium",
      status: "Manager Review",
      desc: "Owner disputes violation notice and requests board consideration before further enforcement.",
    },
    {
      title: "AI call escalation flagged",
      type: "Resident Experience",
      priority: "High",
      status: "Action Needed",
      desc: "AI assistant identified elevated frustration during call and routed matter for human follow-up.",
    },
    {
      title: "Assessment payment hardship request",
      type: "Financial",
      priority: "Sensitive",
      status: "Confidential",
      desc: "Owner requested board consideration of payment arrangement due to personal circumstances.",
    },
  ];

  const workflow = [
    "AI or manager identifies elevated owner issue",
    "Escalation is categorized by risk and urgency",
    "Manager reviews history and supporting documents",
    "Board-sensitive matters are placed into review queue",
    "Final decision or follow-up action is documented",
    "Owner communication is sent and archived",
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
              Owner Escalations
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
            Owner Issues • AI Escalations • Board-Sensitive Matters
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Elevate the right homeowner issues before they become board problems.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track unresolved complaints, AI call escalations, violation
                disputes, service breakdowns, sensitive payment requests and
                board-level owner matters in one controlled review center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Open Escalations</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                2 require board visibility before the next meeting.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["High Priority", "2"],
            ["Board Sensitive", "3"],
            ["AI Flagged", "1"],
            ["Resolved This Month", "11"],
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
              Escalation Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Active Owner Escalations
            </h3>
          </div>

          <div className="space-y-5">
            {escalations.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr] md:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Type
                    </div>
                    <div className="mt-2 text-slate-200">{item.type}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Priority
                    </div>
                    <div className="mt-2 text-amber-300">{item.priority}</div>
                  </div>

                  <div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                      {item.status}
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
              Review Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Escalation Control Path
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
              AI Escalation Intelligence
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Why This Matters
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Most management problems do not start as major issues. They become
                major issues when repeated owner concerns are missed, delayed or
                not escalated properly.
              </p>

              <p>
                This module gives SPM a controlled way to surface sensitive
                homeowner matters, preserve communication history and show boards
                that problems are being handled before they become public conflict.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              AI can flag frustration, repeated requests and unresolved issues,
              while final judgment remains with management and the board.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

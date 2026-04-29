import Link from "next/link";

export default function BoardCommunicationCenter() {
  const messageQueue = [
    {
      title: "Roof repair project update",
      audience: "All Owners",
      status: "Draft Ready",
      priority: "High",
      desc: "Owner-facing notice prepared for board review before community distribution.",
    },
    {
      title: "Pool rule reminder",
      audience: "Residents",
      status: "Needs Approval",
      priority: "Medium",
      desc: "Seasonal reminder drafted from approved rules and prior board direction.",
    },
    {
      title: "Assessment payment reminder",
      audience: "Delinquent Owners",
      status: "Manager Review",
      priority: "Sensitive",
      desc: "Financial notice requires careful review before release.",
    },
    {
      title: "Vendor access notice",
      audience: "Affected Buildings",
      status: "Scheduled",
      priority: "Low",
      desc: "Notice scheduled for owners impacted by vendor entry and exterior work.",
    },
  ];

  const workflow = [
    "Draft message from approved source",
    "Confirm audience and delivery channel",
    "Manager reviews tone and accuracy",
    "Board-sensitive notices receive approval",
    "Send communication and archive record",
    "Track owner replies and escalations",
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
              Communication Command Center
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
            Official Notices • Board Messages • Owner Updates
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Control every important community communication from one polished center.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Prepare owner updates, official notices, board-sensitive
                announcements, AI-generated drafts, approval workflows and
                communication history in one executive communication hub.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Pending Communications</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                2 require approval before release.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Drafts Ready", "6"],
            ["Awaiting Approval", "2"],
            ["Scheduled Notices", "5"],
            ["Owner Replies", "14"],
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
              Communication Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Messages Requiring Review
            </h3>
          </div>

          <div className="space-y-5">
            {messageQueue.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.7fr_0.75fr_0.6fr] lg:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Audience
                    </div>
                    <div className="mt-2 text-slate-200">{item.audience}</div>
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
              Approval Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Communication Control Path
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
              AI Drafting Support
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Clear, Consistent Community Messaging
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                AI can prepare first-draft owner updates from approved board
                decisions, meeting records, maintenance updates and manager notes.
              </p>

              <p>
                Management remains in control of tone, accuracy, timing and final
                release, ensuring every communication feels professional,
                consistent and board-approved when required.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This module helps prevent inconsistent messages, delayed notices
              and communication gaps that frustrate owners and boards.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

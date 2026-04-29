import Link from "next/link";

const guides = [
  {
    title: "Portal Orientation",
    category: "Getting Started",
    time: "5 min",
    summary:
      "Learn where to find board tasks, approvals, motions, documents, reports, and notifications.",
  },
  {
    title: "How to Review Approvals",
    category: "Approvals",
    time: "4 min",
    summary:
      "Understand how to review documents, see linked workflows, add comments, and approve items.",
  },
  {
    title: "How to Track Resolutions",
    category: "Governance",
    time: "6 min",
    summary:
      "Follow resolutions from motion to assignment, follow-up, supporting documents, and archive.",
  },
  {
    title: "How to Use Board Search",
    category: "Search",
    time: "3 min",
    summary:
      "Find motions, policies, documents, vendors, budgets, insurance records, and meeting history.",
  },
];

const trainingTopics = [
  "Review approvals",
  "Vote on motions",
  "Track resolutions",
  "Find documents",
  "Use search",
  "Review financials",
  "Read notifications",
  "Export reports",
  "Check compliance deadlines",
  "Understand user permissions",
];

export default function BoardHelpTraining() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide">
            Stoutt Board Portal
          </Link>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Portal</Link>
            <Link href="/board/violation-review">Violations</Link>
            <Link href="/board/architectural-approvals">ARC Approvals</Link>
            <Link href="/board/maintenance-review">Maintenance</Link>
            <Link href="/board/financial-review">Financials</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Member Support
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Help & Training Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A guided training hub for board members to understand the portal,
            review approvals, vote on motions, track resolutions, find
            documents, use search, review financials, read notifications, and
            export reports.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              A powerful portal only works if board members know how to use it.
              This center gives every director a clear, simple place to learn
              the system without feeling overwhelmed.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Quick-Start Guidance</h2>
            <p className="mt-4 leading-7 text-slate-300">
              New board members can follow short guides for the most common
              portal actions — approvals, motions, documents, tasks, financials,
              reports, and notifications.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Board Confidence</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Training cards, walkthroughs, and support topics help the board
              make decisions faster, use records properly, and stay comfortable
              inside the portal.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Training Guides", "18"],
            ["Quick Starts", "10"],
            ["Walkthroughs", "7"],
            ["Support Topics", "24"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-amber-300">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  Quick-Start Training Guides
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Short board-friendly walkthroughs for the most important
                  portal actions.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Start Orientation
              </button>
            </div>

            <div className="space-y-5">
              {guides.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.category} · {item.time}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      Open Guide
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-300">
                    {item.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Training Topics</h2>
              <div className="mt-5 grid gap-3">
                {trainingTopics.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Support Options</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Request manager help</p>
                <p>• Ask a portal question</p>
                <p>• View walkthrough cards</p>
                <p>• Watch training videos</p>
                <p>• Download quick-start guide</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            A Better Experience for Every Board Member
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This training center helps turn the Board Portal from a powerful
            system into an easy system. Board members get the guidance they need
            to review, approve, search, vote, track, and export with confidence —
            making the entire association operation feel more professional.
          </p>
        </section>
      </section>
    </main>
  );
}

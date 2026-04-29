import Link from "next/link";

export default function BoardVotingCenter() {
  const voteItems = [
    {
      title: "Approve roof repair proposal",
      category: "Vendor Proposal",
      status: "Open Vote",
      vote: "3 Yes / 1 Pending",
      priority: "High",
    },
    {
      title: "Adopt revised pool rule language",
      category: "Resolution",
      status: "Motion Made",
      vote: "Awaiting Second",
      priority: "Medium",
    },
    {
      title: "Approve ARC application with conditions",
      category: "Architectural",
      status: "Open Vote",
      vote: "2 Yes / 2 Pending",
      priority: "Medium",
    },
    {
      title: "Authorize reserve transfer",
      category: "Financial",
      status: "Legal Review",
      vote: "Not Started",
      priority: "High",
    },
  ];

  const history = [
    "Landscape contract renewal approved 4-1",
    "Violation hearing fine imposed unanimously",
    "Insurance deductible reserve allocation approved",
    "Clubhouse painting proposal tabled pending revised bid",
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
              Board Voting Center
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
            Motions • Seconds • Votes • Resolutions
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Formalize board decisions with clean vote records and resolution tracking.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track motions, seconds, approvals, denials, abstentions, legal
                review items and board vote history from one executive decision center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Open Voting Items</div>
              <div className="mt-2 text-5xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                2 high-priority decisions require board action.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Open Votes", "4"],
            ["Awaiting Second", "1"],
            ["Legal Review", "1"],
            ["Completed This Month", "8"],
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
              Current Decision Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Active Board Votes
            </h3>
          </div>

          <div className="space-y-5">
            {voteItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 md:grid-cols-[1.4fr_0.8fr_0.8fr_0.6fr] md:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-2 text-sm text-slate-400">
                      {item.category}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Status
                    </div>
                    <div className="mt-2 text-slate-200">{item.status}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Vote Count
                    </div>
                    <div className="mt-2 text-amber-300">{item.vote}</div>
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
              Resolution Builder
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Decision Documentation
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {[
                "Create motion language",
                "Record seconding director",
                "Capture votes and abstentions",
                "Attach supporting documents",
                "Generate resolution record",
                "Push final decision to meeting minutes",
              ].map((item) => (
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
              Decision History
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Recent Board Outcomes
            </h3>

            <div className="mt-8 space-y-4">
              {history.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              AI can prepare proposed resolution language before final manager or
              legal review.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

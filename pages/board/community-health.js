import Link from "next/link";

export default function BoardCommunityHealth() {
  const scorecards = [
    {
      title: "Financial Health",
      score: "91",
      trend: "Strong",
      desc: "Budget position, receivables and reserve visibility remain favorable.",
    },
    {
      title: "Maintenance Response",
      score: "78",
      trend: "Watch",
      desc: "Open work orders and vendor response times need continued attention.",
    },
    {
      title: "Compliance Activity",
      score: "84",
      trend: "Stable",
      desc: "Violation volume is controlled with several recurring owner items under review.",
    },
    {
      title: "Resident Experience",
      score: "88",
      trend: "Positive",
      desc: "Owner communication trends show fewer escalations and improved response quality.",
    },
    {
      title: "Vendor Performance",
      score: "82",
      trend: "Watch",
      desc: "Most vendors are performing, but several service areas need follow-up.",
    },
    {
      title: "Risk & Compliance",
      score: "79",
      trend: "Monitor",
      desc: "Insurance, statutory and reserve-related watch items require board visibility.",
    },
  ];

  const insights = [
    "Overall community health remains strong with several manageable watch items.",
    "Insurance renewal and reserve assumptions should stay on the next board agenda.",
    "Maintenance pressure is improving, but two vendor follow-ups remain open.",
    "Resident sentiment is positive due to faster response and clearer communication.",
  ];

  const workflow = [
    "Collect signals from operating modules",
    "Score financial, maintenance and compliance health",
    "Identify trend changes and risk movement",
    "Prepare board-facing health summary",
    "Route weak areas into action items",
    "Track improvement month over month",
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
              Community Health Scorecard
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
            Community Performance • Operating Trends • Board Visibility
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Give boards a clear monthly scorecard for how the community is performing.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Summarize financial health, maintenance pressure, compliance
                activity, resident experience, vendor performance, reserves and
                risk trends in one board-facing community health view.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Overall Health Score</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                84
              </div>
              <div className="mt-4 text-slate-300">
                Strong operating position with several watch areas.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Strong Areas", "3"],
            ["Watch Areas", "2"],
            ["Risk Items", "4"],
            ["Improving Trends", "5"],
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
              Operating Scorecards
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Community Health Categories
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {scorecards.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400/40 transition"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-4 leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-4xl font-semibold text-amber-300">
                      {item.score}
                    </div>
                    <div className="mt-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                      {item.trend}
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              AI Health Insights
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Current Board Summary
            </h3>

            <div className="mt-8 space-y-4">
              {insights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Scorecard Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Monthly Health Review
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

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This gives boards the “state of the community” view traditional
              property management companies usually fail to provide.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from "next/link";

export default function BoardExecutiveInsights() {
  const healthScores = [
    {
      title: "Financial Stability",
      score: "91",
      trend: "Strong",
      desc: "Budget performance, delinquency trends and reserve visibility remain favorable.",
    },
    {
      title: "Maintenance Pressure",
      score: "74",
      trend: "Watch",
      desc: "Several high-priority work orders and vendor follow-ups require attention.",
    },
    {
      title: "Compliance Health",
      score: "82",
      trend: "Stable",
      desc: "Most governing document and operational compliance items are controlled.",
    },
    {
      title: "Resident Sentiment",
      score: "88",
      trend: "Positive",
      desc: "Resident communications show strong responsiveness and reduced escalation volume.",
    },
  ];

  const recommendations = [
    "Prioritize insurance renewal review before the next board meeting.",
    "Move two aging maintenance items into vendor follow-up status.",
    "Review reserve funding assumptions before budget planning.",
    "Prepare violation trend summary for board packet discussion.",
  ];

  const insightCards = [
    "Financials",
    "Maintenance",
    "Violations",
    "ARC Activity",
    "Vendors",
    "Resident Experience",
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
              Executive Insights
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
            Executive Summary • Community Health • AI Recommendations
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Give board members a polished executive view of the entire community.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Summarize financial strength, maintenance pressure, compliance
                risk, resident experience, vendor performance and operating trends
                in one board-level intelligence center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Community Health Score</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                86
              </div>
              <div className="mt-4 text-slate-300">
                Overall operating position is strong with several watch items.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Board Priority Items", "6"],
            ["Positive Trends", "8"],
            ["Watch Items", "4"],
            ["Critical Alerts", "1"],
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
              Health Index
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Community Performance Snapshot
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {healthScores.map((item) => (
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
              AI Executive Recommendations
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Recommended Board Focus
            </h3>

            <div className="mt-8 space-y-4">
              {recommendations.map((item) => (
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
              Operating Intelligence
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Insight Categories
            </h3>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {insightCards.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This is the high-level board view that makes SPM feel different
              from a traditional management company.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

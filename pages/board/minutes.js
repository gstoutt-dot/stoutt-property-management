import Link from "next/link";

export default function BoardMinutes() {
  const minuteSections = [
    {
      title: "Call to Order",
      status: "Complete",
      desc: "Meeting date, time, location, quorum confirmation and attendees.",
    },
    {
      title: "Approval of Prior Minutes",
      status: "Ready",
      desc: "Prior meeting minutes prepared for board approval.",
    },
    {
      title: "Manager’s Report",
      status: "Draft",
      desc: "Operational updates, inspections, homeowner issues and escalations.",
    },
    {
      title: "Financial Report",
      status: "Review",
      desc: "Treasurer report, budget variance, delinquencies and reserves.",
    },
    {
      title: "Old Business",
      status: "Open",
      desc: "Previously tabled items and unresolved board action matters.",
    },
    {
      title: "New Business",
      status: "Open",
      desc: "New motions, vendor proposals, ARC matters and policy items.",
    },
  ];

  const decisions = [
    "Roof repair proposal approved 4-1",
    "Pool rule amendment tabled pending legal review",
    "ARC request approved with landscape screening condition",
    "Reserve transfer authorization moved to next agenda",
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
              Meeting Minutes
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
            Official Record Center
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Convert board meetings into clean minutes, decisions and permanent records.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Capture motions, seconds, votes, approvals, denials, tabled items,
                action assignments and final board decisions in one structured
                meeting record.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Current Draft</div>
              <div className="mt-2 text-4xl font-semibold text-amber-300">
                76%
              </div>
              <div className="mt-4 text-slate-300">
                Minutes completion before final review.
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[76%] rounded-full bg-amber-400" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Motions Captured", "7"],
            ["Votes Recorded", "5"],
            ["Action Items Created", "11"],
            ["Items Tabled", "2"],
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
              Minutes Builder
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Meeting Sections
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {minuteSections.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400/40 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
                    {item.status}
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-slate-300">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Decision Record
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Recorded Board Outcomes
            </h3>

            <div className="mt-8 space-y-4">
              {decisions.map((item) => (
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
              Finalization Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Minutes Actions
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {[
                "Import approved votes from Voting Center",
                "Attach supporting board packet items",
                "Create action items from unresolved matters",
                "Prepare draft minutes for board review",
                "Mark approved minutes as official record",
                "Archive final minutes to documents",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              AI can convert meeting notes into structured draft minutes, while
              final approval remains with management and the board.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

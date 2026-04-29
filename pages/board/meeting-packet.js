import Link from "next/link";

export default function BoardMeetingPacket() {
  const packetSections = [
    {
      title: "Agenda",
      status: "Ready",
      desc: "Final board agenda prepared for upcoming meeting.",
    },
    {
      title: "Manager’s Report",
      status: "Draft",
      desc: "Operational summary, open issues, inspections and escalations.",
    },
    {
      title: "Financial Package",
      status: "Review",
      desc: "Budget comparison, balance sheet, income statement and delinquencies.",
    },
    {
      title: "Violation Summary",
      status: "Ready",
      desc: "Open violations, hearing items and enforcement recommendations.",
    },
    {
      title: "ARC Requests",
      status: "Pending",
      desc: "Architectural applications requiring board review.",
    },
    {
      title: "Vendor Proposals",
      status: "Review",
      desc: "Bids, contracts and service recommendations.",
    },
  ];

  const packetActions = [
    "Generate board packet",
    "Attach financial reports",
    "Add agenda items",
    "Prepare approval list",
    "Export meeting PDF",
    "Send to board members",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Stoutt Property Management
            </div>
            <h1 className="mt-1 text-2xl font-semibold">
              Digital Board Book
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
            Board Meeting Packet Center
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                One polished board packet, assembled from every operating module.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Prepare meeting agendas, financial packages, violation summaries,
                ARC requests, maintenance decisions, vendor proposals and manager
                reports in one executive board book.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Upcoming Meeting</div>
              <div className="mt-2 text-2xl font-semibold text-amber-300">
                Monthly Board Meeting
              </div>
              <div className="mt-4 text-slate-300">
                Packet completion:{" "}
                <span className="font-semibold text-white">82%</span>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[82%] rounded-full bg-amber-400" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Agenda Items", "14"],
            ["Pending Attachments", "5"],
            ["Board Decisions", "9"],
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
              Packet Builder
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Meeting Packet Sections
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packetSections.map((item) => (
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

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Packet Actions
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Executive Workflow
            </h3>

            <div className="mt-8 space-y-4">
              {packetActions.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              AI Prepared Summary
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Suggested Board Meeting Brief
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                The upcoming meeting should prioritize delinquency review,
                approval of two vendor proposals, one reserve funding exception,
                and pending architectural decisions with documented conditions.
              </p>
              <p>
                AI recommendations can summarize open items, identify unresolved
                board actions and prepare agenda language before the manager
                finalizes the board packet.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              Recommended next step: finalize financial attachments and publish
              the packet to board members.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import Link from "next/link";

export default function BoardMessages() {
  const messages = [
    {
      subject: "Manager Update — Pool Light Work Order",
      from: "Community Manager",
      type: "Manager Update",
      status: "New",
      date: "Apr 24, 2026",
      notes:
        "Vendor confirmed replacement scheduling for pool light repair. Work expected within 48 hours.",
    },
    {
      subject: "Owner Escalation — Parking Concern",
      from: "Unit Owner",
      type: "Owner Escalation",
      status: "Pending Review",
      date: "Apr 23, 2026",
      notes:
        "Owner submitted concern regarding repeat overnight guest parking violations for board review.",
    },
    {
      subject: "AI Call Summary — Delinquent Account Inquiry",
      from: "AI Assistant",
      type: "AI Summary",
      status: "Reviewed",
      date: "Apr 22, 2026",
      notes:
        "AI assistant handled owner balance inquiry, cited account status, and logged follow-up for management review.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">

          <div className="mb-10 flex items-center justify-between">
            <Link href="/board" className="text-xl font-semibold tracking-wide">
              Stoutt Property Management
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <Link href="/board" className="hover:text-white">
                Board Portal
              </Link>

              <Link href="/board/violation-review" className="hover:text-white">
                Violations
              </Link>

              <Link href="/board/architectural-approvals" className="hover:text-white">
                ARC Approvals
              </Link>

              <Link href="/board/maintenance-review" className="hover:text-white">
                Maintenance
              </Link>

              <Link href="/board/financial-review" className="hover:text-white">
                Financials
              </Link>
            </nav>

          </div>

          <div className="max-w-3xl py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
              Board Communications Center
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Board communications, updates and escalations in one queue.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Review manager updates, owner escalations, vendor notes,
              board correspondence, and AI call summaries from a unified
              communications dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#messages"
                className="rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200"
              >
                View Messages
              </a>

              <Link
                href="/board"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to Board Portal
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["3", "New Messages"],
            ["1", "Owner Escalation"],
            ["1", "AI Summaries"],
            ["0", "Urgent Items"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <div className="text-3xl font-bold text-yellow-300">
                {number}
              </div>

              <div className="mt-2 text-sm text-slate-300">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="messages" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Message Queue
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Board Messages
            </h2>
          </div>

          <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
            New Message
          </button>
        </div>

        <div className="grid gap-5">
          {messages.map((msg) => (
            <article
              key={`${msg.subject}-${msg.date}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div>

                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold">
                      {msg.subject}
                    </h3>

                    <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                      {msg.status}
                    </span>

                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                      {msg.type}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
                    <p>
                      <span className="text-slate-500">From:</span> {msg.from}
                    </p>

                    <p>
                      <span className="text-slate-500">Date:</span> {msg.date}
                    </p>

                    <p>
                      <span className="text-slate-500">Status:</span> {msg.status}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                    {msg.notes}
                  </p>

                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200">
                    Open
                  </button>

                  <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Reply
                  </button>

                  <button className="rounded-full border border-emerald-400/30 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10">
                    Mark Reviewed
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>

      </section>
    </main>
  );
}

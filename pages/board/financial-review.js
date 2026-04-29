import Link from "next/link";

export default function BoardFinancialReview() {
  const items = [
    {
      title: "Delinquency Review",
      category: "Collections",
      status: "Board Review",
      amount: "$18,420",
      updated: "Apr 24, 2026",
      notes:
        "Current delinquency list prepared for board review, including accounts requiring next-step collection action.",
    },
    {
      title: "Landscape Vendor Invoice",
      category: "Invoice Approval",
      status: "Approval Needed",
      amount: "$3,875",
      updated: "Apr 22, 2026",
      notes:
        "Monthly landscape maintenance invoice received and pending board authorization before payment release.",
    },
    {
      title: "Monthly Operating Snapshot",
      category: "Financial Report",
      status: "Ready to Review",
      amount: "$142,600",
      updated: "Apr 20, 2026",
      notes:
        "Operating cash, reserve balance, expenses, and budget variance summary prepared for board review.",
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

            <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
              <Link href="/board" className="hover:text-white">
                Board Portal
              </Link>
              <Link href="/board/violation-review" className="hover:text-white">
                Violations
              </Link>
              <Link
                href="/board/architectural-approvals"
                className="hover:text-white"
              >
                ARC Approvals
              </Link>
             <Link href="/board/maintenance-review" className="hover:text-white">
  Maintenance
</Link>

</nav>
          </div>

          <div className="max-w-3xl py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
              Board Financial Review
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Clear financial oversight for stronger board decisions.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Review delinquencies, approve vendor invoices, monitor budget
              performance, and keep association finances organized in one
              board-facing dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#financial-review"
                className="rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200"
              >
                View Financial Items
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
            ["$142.6K", "Operating Cash"],
            ["$389.2K", "Reserve Balance"],
            ["$18.4K", "Delinquencies"],
            ["1", "Invoice Approval"],
          ].map(([number, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <div className="text-3xl font-bold text-yellow-300">{number}</div>
              <div className="mt-2 text-sm text-slate-300">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="financial-review" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Financial Queue
            </p>
            <h2 className="mt-2 text-3xl font-bold">Board Financial Review</h2>
          </div>

          <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
            Export Financial Summary
          </button>
        </div>

        <div className="grid gap-5">
          {items.map((item) => (
            <article
              key={`${item.title}-${item.category}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>

                    <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                      {item.status}
                    </span>

                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                      {item.category}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
                    <p>
                      <span className="text-slate-500">Amount:</span>{" "}
                      {item.amount}
                    </p>
                    <p>
                      <span className="text-slate-500">Updated:</span>{" "}
                      {item.updated}
                    </p>
                    <p>
                      <span className="text-slate-500">Status:</span>{" "}
                      {item.status}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                    {item.notes}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200">
                    Review
                  </button>
                  <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Request Details
                  </button>
                  <button className="rounded-full border border-emerald-400/30 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10">
                    Approve
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

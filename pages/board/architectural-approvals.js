import Link from "next/link";

export default function BoardArchitecturalApprovals() {
  const requests = [
    {
      owner: "Michael Reynolds",
      property: "2148 Palm Court",
      type: "Exterior Paint",
      status: "Pending Review",
      submitted: "Apr 22, 2026",
      notes: "Owner requesting approval to repaint exterior using approved neutral palette.",
    },
    {
      owner: "Denise Carter",
      property: "1180 Lakeside Drive",
      type: "Screen Enclosure",
      status: "Board Review",
      submitted: "Apr 20, 2026",
      notes: "Installation request includes contractor proposal and elevation drawing.",
    },
    {
      owner: "Robert Jenkins",
      property: "309 Coral Way",
      type: "Landscape Modification",
      status: "Needs More Info",
      submitted: "Apr 18, 2026",
      notes: "Owner submitted new landscape layout; missing plant list and irrigation details.",
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
              <Link href="/board/architectural-approvals" className="text-yellow-300">
                ARC Approvals
              </Link>
            </nav>
          </div>

          <div className="max-w-3xl py-16">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
              Board Review Queue
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Architectural approvals made clear, organized, and accountable.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Review owner ARC submissions, confirm supporting documents, track decision
              status, and keep every approval moving with structure and transparency.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#approval-queue"
                className="rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200"
              >
                View Approval Queue
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
            ["3", "Open Requests"],
            ["1", "Needs More Info"],
            ["2", "Awaiting Board Action"],
            ["0", "Past Due"],
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

      <section id="approval-queue" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              ARC Requests
            </p>
            <h2 className="mt-2 text-3xl font-bold">Architectural Approval Queue</h2>
          </div>

          <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
            Export Review List
          </button>
        </div>

        <div className="grid gap-5">
          {requests.map((request) => (
            <article
              key={`${request.owner}-${request.property}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold">{request.type}</h3>
                    <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                      {request.status}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm text-slate-300 md:grid-cols-3">
                    <p>
                      <span className="text-slate-500">Owner:</span> {request.owner}
                    </p>
                    <p>
                      <span className="text-slate-500">Property:</span>{" "}
                      {request.property}
                    </p>
                    <p>
                      <span className="text-slate-500">Submitted:</span>{" "}
                      {request.submitted}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                    {request.notes}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200">
                    Review
                  </button>
                  <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Request Info
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

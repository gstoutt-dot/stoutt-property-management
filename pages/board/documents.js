import Link from "next/link";

export default function BoardDocuments() {
  const documents = [
    {
      title: "April Board Meeting Packet",
      type: "Meeting Packet",
      status: "Ready",
      updated: "Apr 24, 2026",
      notes: "Agenda, manager report, financial snapshot, violations, and open action items.",
    },
    {
      title: "Declaration of Covenants",
      type: "Governing Document",
      status: "Active",
      updated: "Mar 18, 2026",
      notes: "Primary governing document used for rule interpretation and owner guidance.",
    },
    {
      title: "Landscape Maintenance Contract",
      type: "Vendor Contract",
      status: "Current",
      updated: "Feb 28, 2026",
      notes: "Active vendor agreement including scope, monthly fee, and service obligations.",
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
              Board Document Center
            </p>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Every key board document organized in one secure place.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Access meeting packets, agendas, minutes, contracts, governing documents,
              insurance records, reserve studies, and board reference materials.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#documents"
                className="rounded-full bg-yellow-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200"
              >
                View Documents
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
            ["12", "Meeting Packets"],
            ["8", "Governing Docs"],
            ["6", "Vendor Contracts"],
            ["4", "Insurance Records"],
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

      <section id="documents" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
              Document Library
            </p>
            <h2 className="mt-2 text-3xl font-bold">Board Documents</h2>
          </div>

          <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
            Upload Document
          </button>
        </div>

        <div className="grid gap-5">
          {documents.map((doc) => (
            <article
              key={`${doc.title}-${doc.type}`}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
            >
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-semibold">{doc.title}</h3>

                    <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                      {doc.status}
                    </span>

                    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                      {doc.type}
                    </span>
                  </div>

                  <div className="mt-3 text-sm text-slate-300">
                    <span className="text-slate-500">Updated:</span> {doc.updated}
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                    {doc.notes}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <button className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200">
                    Open
                  </button>
                  <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                    Download
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

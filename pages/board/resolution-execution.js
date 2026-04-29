import Link from "next/link";

export default function BoardResolutionExecution() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold">Stoutt Board Portal</h1>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Portal</Link>
            <Link href="/board/violation-review">Violations</Link>
            <Link href="/board/architectural-approvals">ARC Approvals</Link>
            <Link href="/board/maintenance-review">Maintenance</Link>
            <Link href="/board/financial-review">Financials</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[2rem] border border-amber-400/20 bg-slate-900/70 p-10 shadow-2xl shadow-black/30">
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-amber-300">
            Governance Execution
          </p>

          <h2 className="mt-6 max-w-5xl text-5xl font-bold tracking-tight md:text-6xl">
            Board Resolution Execution Center
          </h2>

          <p className="mt-8 max-w-4xl text-xl leading-9 text-slate-300">
            Track every approved board resolution from vote to assignment,
            follow-up, supporting documents, due dates, completion, and final
            governance archive.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
              Purpose
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              Approved decisions become accountable action.
            </h3>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              This center tracks every approved board resolution from vote to
              assignment, execution, completion, and archival record.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Why It Matters
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              No resolution should disappear after the meeting.
            </h3>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Boards often approve important actions, but execution can stall
              without ownership, deadlines, documentation, and management
              follow-through.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Governance Record
            </p>
            <h3 className="mt-4 text-2xl font-semibold">
              Every resolution has a closing file.
            </h3>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Completed items can be linked back to motions, minutes, documents,
              contracts, invoices, and final board confirmation.
            </p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
            Execution Queue
          </p>
          <h3 className="mt-3 text-3xl font-semibold">
            Approved Resolution Tracker
          </h3>

          <div className="mt-6 space-y-4">
            {[
              ["RES-2026-014", "Pool Lighting Replacement Approval", "In Execution", "65%"],
              ["RES-2026-013", "Reserve Study Update Authorization", "Assigned", "35%"],
              ["RES-2026-012", "Security Camera Contract Renewal", "Pending Vendor Action", "50%"],
              ["RES-2026-011", "Updated Parking Enforcement Policy", "Complete", "100%"],
            ].map(([id, title, status, progress]) => (
              <div
                key={id}
                className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <p className="text-xs font-semibold text-amber-300">{id}</p>
                    <h4 className="mt-1 text-lg font-semibold">{title}</h4>
                  </div>

                  <div className="min-w-[220px]">
                    <p className="text-sm text-slate-300">{status}</p>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-amber-400"
                        style={{ width: progress }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">{progress}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 via-slate-900 to-slate-950 p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
            Governance Commentary
          </p>
          <h3 className="mt-3 text-3xl font-semibold">
            A board decision is only complete when the action is complete.
          </h3>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300">
            Resolution tracking protects the association by connecting board
            authority to real-world execution. It creates a defensible record
            showing what was approved, who was responsible, what was done, and
            when the matter was closed.
          </p>
        </section>
      </section>
    </main>
  );
}

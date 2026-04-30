import Link from "next/link";

export default function CommandCenter() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* NAV */}
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide text-amber-300">
            Stoutt BOS
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-amber-300">Board</Link>
            <Link href="/board/command-center" className="text-amber-300">Command Center</Link>
            <Link href="/board/workflow-engine" className="hover:text-amber-300">Workflow</Link>
            <Link href="/board/action-items" className="hover:text-amber-300">Action Items</Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">Violations</Link>
          </nav>
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operating System
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Command Center
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Executive oversight across operations, compliance, financials, vendors,
            and workflow execution. This is the central intelligence layer of BOS.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/board/workflow-engine"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300"
            >
              Open Workflow Engine
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white hover:border-amber-300 hover:text-amber-300"
            >
              View Action Items
            </Link>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {/* WORKFLOW */}
          <Link href="/board/workflow-engine" className="group">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold text-white">Workflow Engine</h3>
              <p className="mt-3 text-sm text-slate-400">
                Execute and track all operational workflows across BOS.
              </p>
            </div>
          </Link>

          {/* ACTION ITEMS */}
          <Link href="/board/action-items" className="group">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold text-white">Action Items</h3>
              <p className="mt-3 text-sm text-slate-400">
                Centralized board task tracking and accountability system.
              </p>
            </div>
          </Link>

          {/* VIOLATIONS */}
          <Link href="/board/violation-review" className="group">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/40">
              <h3 className="text-xl font-semibold text-white">Violation Review</h3>
              <p className="mt-3 text-sm text-slate-400">
                Compliance oversight, notices, and enforcement tracking.
              </p>
            </div>
          </Link>

          {/* LIVE DATA TEST */}
          <Link href="/board/live-data-verification" className="group">
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 transition hover:border-amber-300">
              <h3 className="text-xl font-semibold text-white">Live Data Verification</h3>
              <p className="mt-3 text-sm text-amber-100/80">
                Confirm production Supabase writes and BOS persistence.
              </p>
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}

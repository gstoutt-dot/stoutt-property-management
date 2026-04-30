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
            <Link href="/board">Board</Link>
            <Link href="/board/command-center" className="text-amber-300">Command Center</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
            <Link href="/board/action-items">Action Items</Link>
            <Link href="/board/violation-review">Violations</Link>
          </nav>
        </div>
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.15),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operating System
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-white">
            Command Center
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Real-time executive visibility into operations, compliance, financial exposure,
            vendor execution, and board-level decision flow.
          </p>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/board/workflow-engine"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
            >
              Open Workflow Engine
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold hover:border-amber-300 hover:text-amber-300"
            >
              View Action Items
            </Link>
          </div>
        </div>
      </section>

      {/* KPI STRIP */}
      <section className="mx-auto max-w-7xl px-6 mt-6">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: "Active Workflows", value: "24" },
            { label: "Open Action Items", value: "18" },
            { label: "Violations Pending", value: "11" },
            { label: "Escalations", value: "3" },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-slate-400">{kpi.label}</p>
              <p className="mt-2 text-3xl font-bold text-amber-300">{kpi.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-6 xl:grid-cols-3">

          {/* WORKFLOW */}
          <Link href="/board/workflow-engine">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-amber-300/40 transition">
              <h3 className="text-xl font-semibold">Workflow Engine</h3>
              <p className="mt-2 text-sm text-slate-400">
                Execute, track, and escalate all operational workflows.
              </p>
            </div>
          </Link>

          {/* ACTION ITEMS */}
          <Link href="/board/action-items">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-amber-300/40 transition">
              <h3 className="text-xl font-semibold">Action Items</h3>
              <p className="mt-2 text-sm text-slate-400">
                Board-level accountability and task tracking.
              </p>
            </div>
          </Link>

          {/* VIOLATIONS */}
          <Link href="/board/violation-review">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-amber-300/40 transition">
              <h3 className="text-xl font-semibold">Violation Review</h3>
              <p className="mt-2 text-sm text-slate-400">
                Compliance enforcement and owner communication tracking.
              </p>
            </div>
          </Link>

          {/* LIVE DATA */}
          <Link href="/board/live-data-verification">
            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6 hover:border-amber-300 transition">
              <h3 className="text-xl font-semibold">Live Data Verification</h3>
              <p className="mt-2 text-sm text-amber-100/80">
                Confirm production Supabase writes.
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* SIGNAL FEED */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-8">

          {/* ACTIVITY FEED */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-bold mb-6">Live Activity Feed</h2>

            <div className="space-y-4">
              {[
                "Violation notice approved and sent to owner",
                "Vendor dispatched for pool inspection",
                "ARC request submitted for fence modification",
                "Delinquency package escalated for legal review",
              ].map((event, i) => (
                <div key={i} className="text-sm text-slate-300 border-b border-white/5 pb-3">
                  {event}
                </div>
              ))}
            </div>
          </div>

          {/* RISK PANEL */}
          <div className="space-y-6">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-semibold mb-4">Risk Signals</h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>⚠️ 3 escalated violations</p>
                <p>⚠️ 2 vendor delays</p>
                <p>⚠️ 1 legal exposure item</p>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
              <h3 className="text-xl font-semibold mb-3">System Status</h3>
              <p className="text-sm text-amber-100">
                BOS is connected to Supabase and ready for full workflow persistence.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

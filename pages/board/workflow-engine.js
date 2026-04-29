import Link from "next/link";
import { bosSignals } from "../../lib/bosData";

export default function WorkflowEngine() {

  const pendingItems = bosSignals.filter(
    item =>
      item.status === "Pending Review" ||
      item.status === "Escalation Review" ||
      item.status === "Vendor Follow-Up" ||
      item.status === "Board Review"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>
            <h1 className="mt-2 text-2xl font-semibold">
              Workflow Engine
            </h1>
          </div>

          <nav className="hidden md:flex gap-4 text-sm text-slate-300">
            <Link href="/board">Board Home</Link>
            <Link href="/board/performance-dashboard">Dashboard</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/action-items">Action Items</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Active Operating Queue
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Shared BOS task routing is now active.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Workflow Engine now reads from the same shared data model as
            the Performance Dashboard. This creates a live operating queue
            instead of a static workflow page.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Pending Queue</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {pendingItems.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Escalations</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {
                bosSignals.filter(
                  x => x.status === "Escalation Review"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Vendor Follow-Ups</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {
                bosSignals.filter(
                  x => x.status === "Vendor Follow-Up"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Board Reviews</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {
                bosSignals.filter(
                  x => x.status === "Board Review"
                ).length
              }
            </p>
          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">

          <h3 className="text-xl font-semibold">
            Live Workflow Queue
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Each item routes to the related governance module.
          </p>

          <div className="mt-6 space-y-4">

            {pendingItems.map(item => (
              <Link
                key={item.id}
                href={item.route}
                className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-amber-300/30"
              >
                <div className="flex justify-between gap-4">

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                      {item.id} · {item.module}
                    </p>

                    <h4 className="mt-2 font-semibold">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-400">
                      Next Action: {item.nextAction}
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      Owner: {item.owner}
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-amber-300">
                    {item.status}
                  </span>

                </div>
              </Link>
            ))}

          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Workflow Engine is now connected to the shared BOS data layer.
            Next step is wiring Command Center to aggregate signals from
            all modules.
          </p>
        </div>

      </section>
    </main>
  );
}

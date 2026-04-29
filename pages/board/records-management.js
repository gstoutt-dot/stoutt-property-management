import Link from "next/link";
import { bosSignals, aiEvents } from "../../lib/bosData";

export default function RecordsManagement() {
  const recordsSignals = bosSignals.filter(
    (item) =>
      item.type === "Legal" ||
      item.type === "Financial" ||
      item.type === "Compliance" ||
      item.module === "Documents"
  );

  const recordableAiEvents = aiEvents.filter(
    (event) =>
      event.type === "Resident Inquiry" ||
      event.type === "Delinquency Alert" ||
      event.type === "Rule Violation"
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Records Management
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/documents">Documents</Link>
            <Link href="/board/meeting-packet">Meeting Packet</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
            <Link href="/board/command-center">Command Center</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Governance Records Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Records Management now tracks BOS signal documentation.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Legal, financial, compliance, and AI-generated activity can now be
            treated as recordable governance events within the BOS.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Recordable BOS Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {recordsSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">AI Record Events</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {recordableAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">Legal / Compliance Records</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                recordsSignals.filter(
                  (item) => item.type === "Legal" || item.type === "Compliance"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">Retention Feeds</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-200">4</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">BOS Record Queue</h3>

            <div className="mt-6 space-y-4">
              {recordsSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-amber-300/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {item.id} · {item.type}
                  </p>

                  <h4 className="mt-2 font-semibold">{item.title}</h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Record Need: Preserve supporting documents, notes, board
                    action, and related timeline.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner} · Status: {item.status}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              AI Event Record Queue
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              AI interactions that may require transcript retention or board
              record association.
            </p>

            <div className="mt-6 space-y-4">
              {recordableAiEvents.map((event) => (
                <Link
                  key={event.id}
                  href={event.route}
                  className="block rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5 hover:border-violet-200/50"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                    {event.id} · {event.type}
                  </p>

                  <h4 className="mt-2 font-semibold">{event.event}</h4>

                  <p className="mt-2 text-sm text-slate-300">
                    Source: {event.source}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Status: {event.status} · Priority: {event.priority}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Future Records Feeds
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Meeting Minutes Archive
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Legal Matter File History
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              AI Call Transcript Retention
            </div>

            <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
              Board Resolution Record Book
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Records Management now receives recordable governance signals and
            AI event retention items.
          </p>
        </div>
      </section>
    </main>
  );
}

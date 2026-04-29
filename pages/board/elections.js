import Link from "next/link";
import { bosSignals } from "../../lib/bosData";

export default function Elections() {
  const electionSignals = bosSignals.filter(
    (item) =>
      item.type === "Compliance" ||
      item.type === "Legal" ||
      item.riskLevel === "High" ||
      item.riskLevel === "Critical"
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
              Elections & Annual Meeting Center
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/meeting-packet">Meeting Packet</Link>
            <Link href="/board/action-items">Action Items</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
            <Link href="/board/command-center">Command Center</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Election Governance Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Elections now connects to governance risk and compliance signals.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Election oversight can now surface compliance, legal, and
            high-risk governance matters that may affect notice, voting,
            quorum, or annual meeting administration.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Election Signals</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {electionSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">High-Risk Items</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                electionSignals.filter(
                  (item) =>
                    item.riskLevel === "High" ||
                    item.riskLevel === "Critical"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">Legal / Compliance</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {
                electionSignals.filter(
                  (item) =>
                    item.type === "Legal" ||
                    item.type === "Compliance"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">Future Election Feeds</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-200">
              4
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
              Election Governance Queue
            </h3>

            <div className="mt-6 space-y-4">
              {electionSignals.map((item) => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5 hover:border-amber-300/30"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {item.id} · {item.type}
                  </p>

                  <h4 className="mt-2 font-semibold">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Election Action: Review whether this affects notice,
                    ballot administration, governance procedure, or meeting risk.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner} · Risk: {item.riskLevel}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <h3 className="text-xl font-semibold text-emerald-100">
              Future Election Feeds
            </h3>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Candidate Eligibility Tracker
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Notice & Mailing Timeline Feed
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Ballot Count / Inspector Feed
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Annual Meeting Quorum Dashboard
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Elections now receives governance, compliance and risk-sensitive
            signals from the shared BOS layer.
          </p>
        </div>
      </section>
    </main>
  );
}

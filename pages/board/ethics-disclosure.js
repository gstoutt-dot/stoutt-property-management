import Link from "next/link";
import { bosSignals } from "../../lib/bosData";

export default function EthicsConflictDisclosure() {

  const ethicsSignals = bosSignals.filter(
    (item) =>
      item.type === "Legal" ||
      item.type === "Compliance" ||
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
              Ethics & Conflict Disclosure
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Home</Link>
            <Link href="/board/compliance-legal-review">Legal</Link>
            <Link href="/board/records-management">Records</Link>
            <Link href="/board/risk-crisis-management">Crisis</Link>
            <Link href="/board/command-center">Command Center</Link>
          </nav>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">

          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Ethics Governance Active
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Ethics oversight now receives governance risk signals.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Ethics disclosures can now surface compliance, legal and
            risk-sensitive matters that may require recusal, disclosure,
            or conflict review.
          </p>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">
              Ethics Signals
            </p>

            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {ethicsSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">
              High-Risk Topics
            </p>

            <p className="mt-3 text-4xl font-semibold text-red-200">
              {
                ethicsSignals.filter(
                  item =>
                    item.riskLevel === "High" ||
                    item.riskLevel === "Critical"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">
              Legal / Compliance Topics
            </p>

            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {
                ethicsSignals.filter(
                  item =>
                    item.type === "Legal" ||
                    item.type === "Compliance"
                ).length
              }
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-300/20 bg-emerald-500/10 p-6">
            <p className="text-sm text-emerald-100">
              Future Ethics Feeds
            </p>

            <p className="mt-3 text-4xl font-semibold text-emerald-200">
              4
            </p>
          </div>

        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

            <h3 className="text-xl font-semibold">
              Ethics Review Queue
            </h3>

            <div className="mt-6 space-y-4">

              {ethicsSignals.map(item => (
                <Link
                  key={item.id}
                  href={item.route}
                  className="block rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {item.id} · {item.type}
                  </p>

                  <h4 className="mt-2 font-semibold">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-sm text-slate-400">
                    Ethics Action: Review whether recusal, disclosure,
                    or conflict documentation is needed.
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Risk: {item.riskLevel}
                  </p>

                </Link>
              ))}

            </div>

          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">

            <h3 className="text-xl font-semibold text-emerald-100">
              Future Ethics Feeds
            </h3>

            <div className="mt-6 grid gap-4">

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Director Disclosure Register
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Conflict Review Log
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Related-Party Transaction Feed
              </div>

              <div className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
                Recusal Tracking Register
              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">

          <h3 className="text-xl font-semibold text-amber-200">
            BOS Wiring Status
          </h3>

          <p className="mt-3 text-slate-300">
            Ethics & Conflict Disclosure now receives governance and
            risk-sensitive signals from the shared BOS layer.
          </p>

        </div>

      </section>

    </main>
  );
}

// pages/board/compliance-legal-review.js

import Link from 'next/link'

export default function ComplianceLegalReview() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Stoutt Property Management
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Compliance & Legal Review Center
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Board-level oversight for legal escalations, statutory deadlines, covenant
                enforcement, attorney review items, authority checks and decision protection.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Legal Review Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Controlled</div>
              <div className="mt-1 text-sm text-slate-300">5 items require review</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm">
            <Link href="/board" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Board Portal
            </Link>
            <Link href="/board/violation-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Violations
            </Link>
            <Link href="/board/architectural-approvals" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              ARC Approvals
            </Link>
            <Link href="/board/maintenance-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Maintenance
            </Link>
            <Link href="/board/financial-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">
              Financials
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Authority Verification',
              text: 'Confirm whether proposed action is supported by the governing documents, board authority and association policy.',
            },
            {
              title: 'Legal Escalation Control',
              text: 'Sensitive enforcement, collection, dispute and attorney matters are separated from routine workflows.',
            },
            {
              title: 'Decision Protection',
              text: 'Board actions are supported by documentation, deadlines, review notes and defensible process history.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-400/10 to-slate-900 p-7 shadow-2xl">
              <h2 className="text-2xl font-semibold text-amber-300">{item.title}</h2>
              <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ['Attorney Review', '5', 'Pending'],
            ['Deadline Watch', '3', 'Active'],
            ['Authority Checks', '12', 'Open'],
            ['Resolved Matters', '28', 'This month'],
          ].map(([label, value, status]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-3 text-4xl font-bold text-amber-300">{value}</div>
              <div className="mt-4 inline-flex rounded-full border border-amber-400/30 px-3 py-1 text-xs text-amber-200">
                {status}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Compliance Review Pathway</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            Legal-sensitive matters should not move through ordinary task flow without review.
            This pathway protects the board by separating document authority, statutory timing,
            attorney involvement and final board action.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Identify', 'Matter is flagged as compliance or legal-sensitive.'],
              ['2', 'Verify', 'Governing authority and policy basis are checked.'],
              ['3', 'Review', 'Management or attorney review is requested when needed.'],
              ['4', 'Decide', 'Board action is documented with supporting basis.'],
              ['5', 'Record', 'Decision history and compliance trail are preserved.'],
            ].map(([number, title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-slate-800 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-slate-950">
                  {number}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-3">
          <Panel title="Legal Review Queues" rows={[
            ['Collection Escalations', '2 pending'],
            ['Violation Hearings', '3 scheduled'],
            ['Owner Disputes', '4 open'],
            ['Attorney Questions', '5 pending'],
          ]} />

          <Panel title="Authority Checks" rows={[
            ['Declaration Support', 'Required'],
            ['Bylaw Authority', 'Verify'],
            ['Rules Consistency', 'Check'],
            ['Board Approval Needed', 'Flag'],
          ]} />

          <Panel title="Deadline Protection" rows={[
            ['Hearing Notice Window', 'Tracked'],
            ['Response Deadlines', 'Monitored'],
            ['Meeting Requirements', 'Flagged'],
            ['Document Production', 'Timed'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Active Legal-Sensitive Items</h2>
            <div className="mt-6 space-y-4">
              {[
                'Owner violation dispute requires document authority confirmation before escalation.',
                'Collection file requires attorney review before next enforcement action.',
                'Architectural denial appeal requires consistency review against prior decisions.',
                'Records request deadline is being tracked for timely production.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Protection Controls</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Document Basis', 'Required'],
                ['Attorney Notes', 'Tracked'],
                ['Deadline Alerts', 'Active'],
                ['Decision History', 'Preserved'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-800 p-5">
                  <div className="text-sm text-slate-400">{label}</div>
                  <div className="mt-2 text-2xl font-bold text-white">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <Link href="/board/violation-review" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Violation Review</h3>
            <p className="mt-3 text-slate-400">Connect enforcement issues to compliance review and hearing controls.</p>
          </Link>

          <Link href="/board/workflow-engine" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Workflow Engine</h3>
            <p className="mt-3 text-slate-400">Route legal-sensitive matters into controlled review pathways.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Surface legal risk and escalation items for executive board visibility.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Boards do not need to practice law, but they do need disciplined process. This
            center helps protect the association by making sure legal-sensitive decisions are
            supported by governing documents, proper timing, attorney guidance when appropriate
            and a clear record of board action.
          </p>
        </section>
      </main>
    </div>
  )
}

function Panel({ title, rows }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-2xl">
      <h2 className="text-xl font-semibold text-amber-300">{title}</h2>
      <div className="mt-6 space-y-4">
        {rows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-slate-300">{label}</span>
            <span className="font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// pages/board/command-center.js

import Link from 'next/link'

export default function CommandCenter() {
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
                Board Command Center
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                The executive oversight hub for board priorities, operational pressure points,
                financial signals, workflow status, risk exposure and management accountability.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Command Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Operational</div>
              <div className="mt-1 text-sm text-slate-300">All major systems visible</div>
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
              title: 'Executive Visibility',
              text: 'Board members see the highest-priority financial, operational and governance signals in one place.',
            },
            {
              title: 'Escalation Control',
              text: 'Urgent matters, blocked workflows, unresolved violations and budget-sensitive issues are surfaced quickly.',
            },
            {
              title: 'Management Accountability',
              text: 'The board can see what is being handled, what requires approval and what needs follow-through.',
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
            ['Priority Items', '14', 'Active'],
            ['Board Approvals', '6', 'Pending'],
            ['Risk Signals', '3', 'Monitor'],
            ['Resolved This Month', '118', 'Closed'],
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

        <section className="mt-10 grid gap-8 lg:grid-cols-3">
          <Panel title="Executive Priority Queue" rows={[
            ['Reserve project approval', 'Board review'],
            ['90+ day delinquency file', 'Escalation'],
            ['Vendor renewal decision', 'Pending'],
            ['Insurance renewal prep', 'Monitor'],
          ]} />

          <Panel title="Operating Signals" rows={[
            ['Financial health', 'Stable'],
            ['Maintenance load', 'Moderate'],
            ['Violation trend', 'Improving'],
            ['Collections pressure', 'Watch'],
          ]} />

          <Panel title="Management Follow-Up" rows={[
            ['Owner updates sent', '94%'],
            ['Vendor responses', '89%'],
            ['Meeting packet readiness', 'Ready'],
            ['Action item closure', '91%'],
          ]} />
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Command Center Operating Model</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            This hub connects the board-facing modules into one executive operating view.
            Rather than forcing board members to search through disconnected reports,
            the Command Center gives them a clear view of what matters most.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Monitor', 'Track financial, operational and risk signals.'],
              ['2', 'Prioritize', 'Identify what needs board attention first.'],
              ['3', 'Authorize', 'Approve items within board authority.'],
              ['4', 'Execute', 'Move decisions into workflows and follow-up.'],
              ['5', 'Verify', 'Confirm completion and document outcomes.'],
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

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Active Escalations</h2>
            <div className="mt-6 space-y-4">
              {[
                'Reserve repair proposal requires board authorization before vendor scheduling.',
                'Collection file over 90 days requires legal review pathway confirmation.',
                'Vendor performance issue flagged for renewal decision discussion.',
                'Insurance renewal timeline requires documentation readiness review.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Meeting Readiness</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Agenda Items', 'Prepared'],
                ['Financial Reports', 'Ready'],
                ['Action Log', 'Updated'],
                ['Open Decisions', '6 pending'],
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
          <Link href="/board/performance-dashboard" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Performance Dashboard</h3>
            <p className="mt-3 text-slate-400">Review association performance, risk scoring and operating metrics.</p>
          </Link>

          <Link href="/board/workflow-engine" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Workflow Engine</h3>
            <p className="mt-3 text-slate-400">Move board priorities into structured execution pathways.</p>
          </Link>

          <Link href="/board/quickbooks-integration" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">QuickBooks Integration</h3>
            <p className="mt-3 text-slate-400">Connect accounting visibility, reporting and approval controls.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            A board should never have to guess where the association stands. The Command Center
            gives directors a disciplined executive view of community operations, making it
            easier to govern proactively, approve intelligently and hold management activity
            accountable without getting lost in disconnected details.
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

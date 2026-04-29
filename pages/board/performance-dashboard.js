// pages/board/performance-dashboard.js

import Link from 'next/link'

export default function PerformanceDashboard() {
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
                Board Performance Dashboard
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Executive-level oversight for financial health, operational performance,
                vendor accountability, reserve funding and community risk trends.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Current Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Stable</div>
              <div className="mt-1 text-sm text-slate-300">No critical exposure detected</div>
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
              title: 'Financial Health',
              text: 'Monitor liquidity, delinquencies, reserves and budget pressure before they become board-level emergencies.',
            },
            {
              title: 'Operational Response',
              text: 'Track violations, maintenance response times, vendor performance and unresolved service bottlenecks.',
            },
            {
              title: 'Risk Intelligence',
              text: 'Identify community exposure, deferred maintenance, funding gaps and governance risks early.',
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
            ['Operating Cash Ratio', '4.6 mo.', 'Healthy'],
            ['Delinquency Rate', '3.2%', 'Watch'],
            ['Reserve Funding', '82%', 'Monitor'],
            ['Risk Score', 'Low', 'Stable'],
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
          <Panel title="Open Violations Aging" rows={[
            ['0–30 Days', '14'],
            ['31–60 Days', '7'],
            ['61–90 Days', '3'],
            ['90+ Days', '1'],
          ]} />

          <Panel title="Maintenance Response Times" rows={[
            ['Emergency', '2.4 hrs'],
            ['Priority', '8.1 hrs'],
            ['Routine', '1.8 days'],
            ['Owner Follow-Up', '94%'],
          ]} />

          <Panel title="Vendor Scorecards" rows={[
            ['Landscape', '94/100'],
            ['Pool', '89/100'],
            ['Janitorial', '92/100'],
            ['Security', '96/100'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Collections Performance</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                ['Recovery Rate', '91%'],
                ['Payment Plans', '11'],
                ['Legal Escalations', '2'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-800 p-5">
                  <div className="text-sm text-slate-400">{label}</div>
                  <div className="mt-2 text-3xl font-bold">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Community Risk Scoring</h2>
            <div className="mt-6 space-y-4">
              {[
                'Insurance renewal concentration risk is currently minimal.',
                'Collections exposure remains within acceptable operating limits.',
                'Deferred maintenance pressure is trending downward.',
                'Vendor dependency is balanced across active contracts.',
              ].map((risk) => (
                <div key={risk} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {risk}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <Link href="/board/workflow-engine" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Workflow Engine</h3>
            <p className="mt-3 text-slate-400">Move from dashboard insight into operational execution.</p>
          </Link>

          <Link href="/board/quickbooks-integration" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">QuickBooks Integration</h3>
            <p className="mt-3 text-slate-400">Review accounting sync, financial feeds and reporting controls.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Escalate performance oversight into executive operating control.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Performance oversight is fiduciary intelligence. This dashboard gives board
            members a structured way to see where the association is strong, where pressure
            is building and where management action should be prioritized before small issues
            become expensive community problems.
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

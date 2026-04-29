// pages/board/performance-dashboard.js

import Link from 'next/link'

export default function PerformanceDashboard() {
  const metrics = [
    { title: 'Operating Cash Ratio', value: '4.6', status: 'Healthy', note: 'Months of operating liquidity available' },
    { title: 'Delinquency Rate', value: '3.2%', status: 'Watch', note: 'Improved from prior quarter' },
    { title: 'Reserve Funding', value: '82%', status: 'Monitor', note: 'Funding above threshold but below target' },
    { title: 'Community Risk Score', value: 'Low', status: 'Stable', note: 'No major systemic exposures detected' },
  ]

  const aging = [
    ['0–30 Days','14'],
    ['31–60 Days','7'],
    ['61–90 Days','3'],
    ['90+ Days','1']
  ]

  const vendors = [
    ['Landscape','94'],
    ['Pool','89'],
    ['Janitorial','92'],
    ['Security','96']
  ]

  const response = [
    ['Emergency','2.4 hrs'],
    ['Priority','8.1 hrs'],
    ['Routine','1.8 days']
  ]

  const risks = [
    'Insurance renewal concentration risk minimal',
    'Collections exposure within acceptable limits',
    'Deferred maintenance pressure trending downward',
    'Vendor dependency balanced across contracts'
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs tracking-[0.35em] uppercase text-amber-400">Stoutt Property Management</div>
            <h1 className="text-2xl md:text-3xl font-semibold mt-1">Board Performance Dashboard</h1>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm">
            <Link href="/board" className="px-4 py-2 rounded-xl border border-white/10 hover:border-amber-400">Board Portal</Link>
            <Link href="/board/violation-review" className="px-4 py-2 rounded-xl border border-white/10 hover:border-amber-400">Violations</Link>
            <Link href="/board/architectural-approvals" className="px-4 py-2 rounded-xl border border-white/10 hover:border-amber-400">ARC Approvals</Link>
            <Link href="/board/maintenance-review" className="px-4 py-2 rounded-xl border border-white/10 hover:border-amber-400">Maintenance</Link>
            <Link href="/board/financial-review" className="px-4 py-2 rounded-xl border border-white/10 hover:border-amber-400">Financials</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Explanation Boxes */}
        <section className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-slate-900 p-6">
            <h3 className="text-xl font-semibold text-amber-300 mb-3">Performance Visibility</h3>
            <p className="text-slate-300 leading-relaxed">
              Board leadership receives executive-level monitoring of financial stability,
              operational responsiveness and emerging risk indicators.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-slate-900 p-6">
            <h3 className="text-xl font-semibold text-amber-300 mb-3">Early Warning Signals</h3>
            <p className="text-slate-300 leading-relaxed">
              Trend signals surface collection pressure, aging violations, vendor performance
              drift and reserve funding concerns before they become systemic.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-slate-900 p-6">
            <h3 className="text-xl font-semibold text-amber-300 mb-3">Decision Support</h3>
            <p className="text-slate-300 leading-relaxed">
              Performance metrics support informed governance decisions, budgeting priorities,
              contract reviews and strategic planning.
            </p>
          </div>
        </section>

        {/* KPI Strip */}
        <section className="grid md:grid-cols-4 gap-6 mb-10">
          {metrics.map((m, i)=>(
            <div key={i} className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
              <div className="text-sm text-slate-400 mb-2">{m.title}</div>
              <div className="text-4xl font-bold text-amber-300">{m.value}</div>
              <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs border border-amber-400/40 text-amber-200">
                {m.status}
              </div>
              <p className="text-slate-400 text-sm mt-4">{m.note}</p>
            </div>
          ))}
        </section>

        {/* Operational Panels */}
        <section className="grid lg:grid-cols-3 gap-8 mb-10">

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7">
            <h3 className="text-xl font-semibold mb-5 text-amber-300">Open Violations Aging</h3>
            <div className="space-y-4">
              {aging.map((a,i)=>(
                <div key={i} className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-slate-300">{a[0]}</span>
                  <span className="font-semibold">{a[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7">
            <h3 className="text-xl font-semibold mb-5 text-amber-300">Maintenance Response Times</h3>
            <div className="space-y-4">
              {response.map((r,i)=>(
                <div key={i} className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-slate-300">{r[0]}</span>
                  <span className="font-semibold">{r[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7">
            <h3 className="text-xl font-semibold mb-5 text-amber-300">Vendor Scorecards</h3>
            <div className="space-y-4">
              {vendors.map((v,i)=>(
                <div key={i} className="flex justify-between border-b border-white/5 pb-3">
                  <span className="text-slate-300">{v[0]}</span>
                  <span className="font-semibold">{v[1]}/100</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Collections + Risk */}
        <section className="grid lg:grid-cols-2 gap-8 mb-10">

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h3 className="text-2xl font-semibold mb-6 text-amber-300">Collections Performance</h3>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="rounded-2xl bg-slate-800 p-5">
                <div className="text-sm text-slate-400">Recovery Rate</div>
                <div className="text-3xl font-bold mt-2">91%</div>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <div className="text-sm text-slate-400">Payment Plans</div>
                <div className="text-3xl font-bold mt-2">11</div>
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                <div className="text-sm text-slate-400">Legal Escalations</div>
                <div className="text-3xl font-bold mt-2">2</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h3 className="text-2xl font-semibold mb-6 text-amber-300">Community Risk Scoring</h3>

            <div className="space-y-4">
              {risks.map((r,i)=>(
                <div key={i} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {r}
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Pathways */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <Link href="/board/workflow-engine" className="group rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400 transition">
            <h3 className="text-xl font-semibold text-amber-300">Workflow Engine</h3>
            <p className="text-slate-400 mt-3">Move from performance metrics into process execution routing.</p>
          </Link>

          <Link href="/board/quickbooks-integration" className="group rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400 transition">
            <h3 className="text-xl font-semibold text-amber-300">QuickBooks Integration</h3>
            <p className="text-slate-400 mt-3">View accounting synchronization controls and financial feeds.</p>
          </Link>

          <Link href="/board/command-center" className="group rounded-3xl border border-white/10 bg-slate-900 p-7 hover:border-amber-400 transition">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="text-slate-400 mt-3">Escalate from monitoring into executive operating oversight.</p>
          </Link>
        </section>

        {/* Governance Commentary */}
        <section className="rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 mb-16">
          <h2 className="text-2xl font-semibold text-amber-300 mb-4">
            Governance Commentary
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Performance oversight is not simply reporting — it is fiduciary intelligence.
            Effective boards use dashboards like this to identify trend deterioration early,
            challenge assumptions, align capital priorities and reduce avoidable risk before
            it affects owners, budgets or property values.
          </p>
        </section>

      </main>
    </div>
  )
}

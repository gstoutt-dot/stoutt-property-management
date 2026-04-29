// pages/board/quickbooks-integration.js

import Link from 'next/link'

export default function QuickBooksIntegration() {
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
                QuickBooks Integration
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Accounting visibility for board oversight, financial review, reconciliation
                tracking, approval controls and reporting feeds — using QuickBooks now while
                preparing for the future SPM proprietary platform.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Accounting Sync
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Connected</div>
              <div className="mt-1 text-sm text-slate-300">Last sync: Today</div>
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
              title: 'Accounting Visibility',
              text: 'Board members receive structured insight into financial activity without needing to operate inside the accounting system.',
            },
            {
              title: 'Approval Controls',
              text: 'Invoices, reimbursements, vendor payments and budget-sensitive items can be routed for review before release.',
            },
            {
              title: 'Migration-Ready Architecture',
              text: 'QuickBooks supports operations now while the data model remains aligned for the future proprietary SPM platform.',
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
            ['Bank Feeds', 'Active', 'Synced'],
            ['Invoices Pending', '18', 'Review'],
            ['Reconciliation', '94%', 'Current'],
            ['Reports Ready', '7', 'Board packet'],
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
          <h2 className="text-2xl font-semibold text-amber-300">QuickBooks Now → SPM Platform Later</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            The accounting layer is designed to support immediate operations while preserving
            the future migration path. QuickBooks can operate as the current financial system
            of record, while SPM builds toward a proprietary operating platform with deeper
            association-specific automation.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              ['1', 'QuickBooks', 'Current accounting foundation for financial activity.'],
              ['2', 'Board Portal', 'Board-facing visibility, approvals and reporting pathways.'],
              ['3', 'SPM Data Layer', 'Structured association data prepared for future platform use.'],
              ['4', 'SPM Platform', 'Long-term proprietary property management system.'],
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
          <Panel title="Financial Feed Status" rows={[
            ['Bank Transactions', 'Synced'],
            ['Vendor Bills', 'Synced'],
            ['Owner Payments', 'Synced'],
            ['Budget Categories', 'Mapped'],
          ]} />

          <Panel title="Approval Controls" rows={[
            ['Vendor Invoices', 'Board threshold'],
            ['Reimbursements', 'Manager review'],
            ['Reserve Expenses', 'Board approval'],
            ['Budget Exceptions', 'Flagged'],
          ]} />

          <Panel title="Reporting Outputs" rows={[
            ['Balance Sheet', 'Available'],
            ['Income Statement', 'Available'],
            ['A/R Aging', 'Available'],
            ['Budget Variance', 'Available'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Reconciliation Visibility</h2>
            <div className="mt-6 space-y-4">
              {[
                'Operating account reconciliation is current through the latest statement cycle.',
                'Reserve account activity is separated for clearer board review.',
                'Unmatched transactions are flagged before board packet preparation.',
                'Financial exceptions can be routed into workflow review when needed.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Packet Financial Readiness</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Monthly Financials', 'Ready'],
                ['Variance Notes', 'Drafted'],
                ['A/R Review', 'Ready'],
                ['Reserve Summary', 'Ready'],
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
            <p className="mt-3 text-slate-400">Review financial health indicators and operating performance trends.</p>
          </Link>

          <Link href="/board/workflow-engine" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Workflow Engine</h3>
            <p className="mt-3 text-slate-400">Route accounting exceptions, approvals and review items into action.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Move from accounting visibility into executive operating oversight.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Financial oversight is one of the board’s highest fiduciary responsibilities.
            This integration is designed to give board members clear visibility without
            overwhelming them with accounting system complexity. QuickBooks supports the
            immediate operating need, while the structure prepares Stoutt Property Management
            for its future proprietary platform.
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

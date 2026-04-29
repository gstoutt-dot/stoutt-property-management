// pages/board/records-management.js

import Link from 'next/link'

export default function RecordsManagementCenter() {
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
                Board Records Management Center
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Centralized oversight for official association records, resolutions, contracts,
                records requests, document access permissions and audit-ready recordkeeping.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Records Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Controlled</div>
              <div className="mt-1 text-sm text-slate-300">3 request items open</div>
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
              title: 'Official Records Control',
              text: 'Organize governing documents, resolutions, minutes, contracts and required association records in one structured repository.',
            },
            {
              title: 'Access & Production Tracking',
              text: 'Monitor owner records requests, document production deadlines and controlled access permissions.',
            },
            {
              title: 'Audit Readiness',
              text: 'Maintain version history, audit trails and retention controls that support defensible recordkeeping.',
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
            ['Records Requests', '3', 'Open'],
            ['Contracts Tracked', '26', 'Current'],
            ['Board Resolutions', '18', 'Archived'],
            ['Minutes Pending', '2', 'Approval'],
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
          <h2 className="text-2xl font-semibold text-amber-300">Records Control Pathway</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            Structured record management reduces confusion, improves response readiness and
            protects the association when documents are requested, reviewed or relied upon.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Capture', 'Document or record enters controlled repository.'],
              ['2', 'Classify', 'Record is categorized by type and authority.'],
              ['3', 'Control', 'Access permissions and retention rules apply.'],
              ['4', 'Produce', 'Requests or reviews are fulfilled when required.'],
              ['5', 'Preserve', 'History and audit trails are maintained.'],
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
          <Panel title="Official Record Types" rows={[
            ['Declarations', 'Archived'],
            ['Board Minutes', 'Tracked'],
            ['Contracts', 'Current'],
            ['Resolutions', 'Indexed'],
          ]} />

          <Panel title="Access Controls" rows={[
            ['Board Access', 'Authorized'],
            ['Manager Access', 'Authorized'],
            ['Owner Requests', 'Logged'],
            ['Restricted Records', 'Controlled'],
          ]} />

          <Panel title="Retention Oversight" rows={[
            ['Version History', 'Tracked'],
            ['Audit Trail', 'Active'],
            ['Production Deadlines', 'Monitored'],
            ['Hold Controls', 'Available'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Active Records Queue</h2>
            <div className="mt-6 space-y-4">
              {[
                'Owner records request awaiting production package assembly.',
                'Board resolution archive updated pending indexing confirmation.',
                'Vendor contract renewal file awaiting supporting certificate upload.',
                'Meeting minutes draft pending board approval routing.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Records Readiness</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Minutes Archive', 'Ready'],
                ['Resolution Index', 'Updated'],
                ['Contract Repository', 'Current'],
                ['Audit Trail', 'Available'],
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
          <Link href="/board/documents" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Documents</h3>
            <p className="mt-3 text-slate-400">Connect document storage to controlled records governance.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Surface records requests and document readiness for executive oversight.</p>
          </Link>

          <Link href="/board/ai-assistant-settings" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">AI Assistant Settings</h3>
            <p className="mt-3 text-slate-400">Align transcript storage and document controls with records management.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Strong records management is more than filing documents. It protects continuity,
            supports transparency and strengthens the board’s ability to respond when records
            are requested, relied upon or challenged.
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

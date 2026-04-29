// pages/board/technology-integrations.js

import Link from 'next/link'

export default function TechnologyIntegrationsCenter() {
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
                Board Technology Integrations Center
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Board-level visibility into QuickBooks, AI assistant connections, third-party
                software, data sync health, migration readiness and the future SPM platform roadmap.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Integration Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Online</div>
              <div className="mt-1 text-sm text-slate-300">Core systems connected</div>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm">
            <Link href="/board" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">Board Portal</Link>
            <Link href="/board/violation-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">Violations</Link>
            <Link href="/board/architectural-approvals" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">ARC Approvals</Link>
            <Link href="/board/maintenance-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">Maintenance</Link>
            <Link href="/board/financial-review" className="rounded-xl border border-white/10 px-4 py-2 text-slate-300 hover:border-amber-400 hover:text-amber-300">Financials</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Integration Visibility',
              text: 'See which operational systems are connected, healthy, delayed or requiring management review.',
            },
            {
              title: 'Data Sync Confidence',
              text: 'Track data movement across accounting, AI assistant activity, board workflows and future platform layers.',
            },
            {
              title: 'Platform Roadmap',
              text: 'Support today’s QuickBooks-based operations while preparing for the proprietary SPM platform.',
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
            ['Core Integrations', '6', 'Connected'],
            ['Sync Health', '98%', 'Stable'],
            ['Data Exceptions', '3', 'Review'],
            ['Migration Readiness', '72%', 'Building'],
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
          <h2 className="text-2xl font-semibold text-amber-300">Technology Integration Pathway</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            The technology layer connects today’s operating tools with tomorrow’s proprietary
            platform. Each integration should support continuity, accuracy, security and board
            confidence without creating dependency confusion.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Connect', 'Link core systems and operating data sources.'],
              ['2', 'Monitor', 'Track sync health, exceptions and outages.'],
              ['3', 'Validate', 'Confirm accuracy before reporting or automation.'],
              ['4', 'Migrate', 'Prepare structured data for the future SPM platform.'],
              ['5', 'Scale', 'Expand automation while preserving governance controls.'],
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
          <Panel title="Connected Systems" rows={[
            ['QuickBooks', 'Connected'],
            ['AI Assistant', 'Connected'],
            ['Board Portal', 'Native'],
            ['Document Repository', 'Connected'],
          ]} />

          <Panel title="Sync & Data Health" rows={[
            ['Financial Feed', 'Healthy'],
            ['Workflow Events', 'Healthy'],
            ['Transcript Logs', 'Review'],
            ['Owner Records', 'Mapped'],
          ]} />

          <Panel title="Platform Roadmap" rows={[
            ['Current Stack', 'QuickBooks-first'],
            ['Data Model', 'SPM-ready'],
            ['Migration Layer', 'Building'],
            ['Proprietary Platform', 'Planned'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Active Integration Review Items</h2>
            <div className="mt-6 space-y-4">
              {[
                'QuickBooks access permissions require quarterly confirmation.',
                'AI assistant transcript sync requires sample audit review.',
                'Document repository mapping pending final category alignment.',
                'Future SPM platform migration fields require data-model validation.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Technology Readiness</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Accounting Layer', 'Ready'],
                ['AI Operations', 'Active'],
                ['Data Mapping', 'In progress'],
                ['SPM Platform Path', 'Defined'],
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
          <Link href="/board/quickbooks-integration" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">QuickBooks Integration</h3>
            <p className="mt-3 text-slate-400">Review accounting system connection, reporting and approval controls.</p>
          </Link>

          <Link href="/board/ai-assistant-settings" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">AI Assistant Settings</h3>
            <p className="mt-3 text-slate-400">Review AI assistant behavior, transcripts, escalation rules and routing.</p>
          </Link>

          <Link href="/board/compliance-legal-review" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Cybersecurity Controls</h3>
            <p className="mt-3 text-slate-400">Connect integration risk to access controls, fraud prevention and cyber readiness.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Technology should make association management clearer, faster and more reliable —
            not more fragmented. This center gives the board a structured view of how systems
            connect today, how data will migrate tomorrow and how Stoutt Property Management
            is building toward a proprietary operating platform without losing control of the
            current environment.
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

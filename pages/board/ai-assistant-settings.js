// pages/board/ai-assistant-settings.js

import Link from 'next/link'

export default function AIAssistantSettings() {
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
                AI Assistant Settings
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Board-level visibility into AI assistant behavior, knowledge boundaries,
                call routing, escalation rules, transcript review and homeowner support controls.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Assistant Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Active</div>
              <div className="mt-1 text-sm text-slate-300">Board oversight enabled</div>
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
              title: 'Knowledge Boundaries',
              text: 'The assistant answers from approved association documents, rules, policies and management guidance.',
            },
            {
              title: 'Escalation Rules',
              text: 'Sensitive issues, emergencies, legal matters and board-authority decisions are routed to human review.',
            },
            {
              title: 'Transcript Review',
              text: 'Calls, requests and homeowner interactions can be reviewed for accountability and follow-through.',
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
            ['Knowledge Base', 'Active', 'Approved docs'],
            ['Call Routing', 'Enabled', 'Live rules'],
            ['Escalations', '7', 'Needs review'],
            ['Transcripts', '42', 'This month'],
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
          <h2 className="text-2xl font-semibold text-amber-300">Assistant Operating Controls</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            This module is separate from accounting and QuickBooks. It governs how the AI
            assistant supports homeowners, captures requests, routes issues and protects the
            board from unauthorized or inappropriate automated decisions.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Answer', 'Respond from approved community knowledge.'],
              ['2', 'Capture', 'Record homeowner requests and service issues.'],
              ['3', 'Route', 'Send matters to the correct workflow queue.'],
              ['4', 'Escalate', 'Flag sensitive or board-level issues.'],
              ['5', 'Review', 'Preserve transcripts and action history.'],
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
          <Panel title="Knowledge Sources" rows={[
            ['Declaration', 'Enabled'],
            ['Bylaws', 'Enabled'],
            ['Rules & Regulations', 'Enabled'],
            ['Board FAQs', 'Enabled'],
          ]} />

          <Panel title="Escalation Triggers" rows={[
            ['Emergencies', 'Immediate'],
            ['Legal Threats', 'Human review'],
            ['Board Decisions', 'Escalate'],
            ['Unclear Authority', 'Escalate'],
          ]} />

          <Panel title="Call Handling Rules" rows={[
            ['Homeowner Requests', 'Capture'],
            ['Maintenance Issues', 'Route'],
            ['Account Questions', 'Limited'],
            ['Complaints', 'Flag'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Review Queue</h2>
            <div className="mt-6 space-y-4">
              {[
                'Homeowner dispute requires management follow-up before response is finalized.',
                'Maintenance responsibility question flagged for document verification.',
                'Architectural request mentioned a possible rule exception.',
                'Complaint about vendor conduct routed for board visibility.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Transcript & Audit Controls</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Call Transcripts', 'Stored'],
                ['Action Logs', 'Enabled'],
                ['Manager Review', 'Required'],
                ['Board Visibility', 'Controlled'],
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
          <Link href="/board/workflow-engine" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Workflow Engine</h3>
            <p className="mt-3 text-slate-400">Route AI-captured requests into structured management workflows.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Surface AI escalations inside the board executive control hub.</p>
          </Link>

          <Link href="/board/performance-dashboard" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Performance Dashboard</h3>
            <p className="mt-3 text-slate-400">Review how AI-supported operations affect performance metrics.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            AI should strengthen management responsiveness without replacing board authority.
            This settings center creates a visible governance layer around assistant behavior,
            helping ensure homeowners receive faster support while sensitive issues, legal
            concerns and board-level decisions remain properly escalated.
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

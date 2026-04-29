// pages/board/workflow-engine.js

import Link from 'next/link'

export default function WorkflowEngine() {
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
                Board Workflow Engine
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                A structured operating system for routing board matters, owner requests,
                violations, maintenance items and vendor tasks from intake to completion.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Workflow Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Active</div>
              <div className="mt-1 text-sm text-slate-300">42 items currently routed</div>
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
              title: 'Controlled Intake',
              text: 'Every owner request, vendor item, violation issue and board task enters through a clear workflow path.',
            },
            {
              title: 'Assignment Logic',
              text: 'Tasks are routed to management, vendors, committees or board review based on urgency, category and authority level.',
            },
            {
              title: 'Completion Visibility',
              text: 'Board members can see what is pending, what is moving, what is blocked and what has been completed.',
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
            ['New Intake', '12', 'Needs review'],
            ['Assigned', '18', 'In progress'],
            ['Blocked', '4', 'Needs action'],
            ['Completed', '86', 'This month'],
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
          <h2 className="text-2xl font-semibold text-amber-300">Workflow Pathway</h2>
          <p className="mt-3 max-w-4xl leading-7 text-slate-300">
            Each matter follows a clear path so nothing depends on memory, scattered emails
            or informal follow-up.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Intake', 'Request, issue or task is captured.'],
              ['2', 'Review', 'Category, urgency and authority are evaluated.'],
              ['3', 'Assign', 'Item is routed to the proper responsible party.'],
              ['4', 'Track', 'Progress, notes and blockers are monitored.'],
              ['5', 'Close', 'Completion is documented and visible.'],
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
          <Panel title="Active Workflow Queues" rows={[
            ['Owner Requests', '9 open'],
            ['Vendor Follow-Up', '7 open'],
            ['Board Action Items', '11 open'],
            ['Violation Escalations', '5 open'],
          ]} />

          <Panel title="Routing Priorities" rows={[
            ['Emergency', 'Immediate'],
            ['Board Approval', 'Next meeting'],
            ['Vendor Dispatch', 'Same day'],
            ['Administrative', 'Standard queue'],
          ]} />

          <Panel title="Control Points" rows={[
            ['Authority Review', 'Required'],
            ['Document Trail', 'Captured'],
            ['Owner Updates', 'Tracked'],
            ['Final Verification', 'Required'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Blocked Items Requiring Attention</h2>
            <div className="mt-6 space-y-4">
              {[
                'Vendor proposal awaiting board authorization.',
                'Owner architectural response requires committee clarification.',
                'Maintenance invoice pending supporting documentation.',
                'Violation escalation paused pending legal review.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Automation Readiness</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Rule-Based Routing', 'Ready'],
                ['Board Notifications', 'Active'],
                ['Vendor Tasking', 'Configured'],
                ['Completion Logging', 'Enabled'],
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
            <p className="mt-3 text-slate-400">Return to operating metrics and community performance signals.</p>
          </Link>

          <Link href="/board/quickbooks-integration" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">QuickBooks Integration</h3>
            <p className="mt-3 text-slate-400">Connect financial workflows to accounting visibility and controls.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Move into executive oversight and management control.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Strong association management depends on disciplined follow-through. The workflow
            engine reduces informal handoffs, missed tasks and unclear responsibility by giving
            the board a visible structure for how issues move from request to resolution.
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

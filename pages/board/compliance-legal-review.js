// pages/board/compliance-legal-review.js

import Link from 'next/link'

export default function CybersecurityDataControls() {
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
                Board Cybersecurity & Data Controls
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Board-level oversight for wire fraud prevention, vendor payment verification,
                portal access, data permissions, phishing incidents, audit trails and cyber risk readiness.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Cyber Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Protected</div>
              <div className="mt-1 text-sm text-slate-300">Controls under board visibility</div>
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
              title: 'Financial Fraud Controls',
              text: 'Protect association funds through vendor verification, payment approval safeguards and wire fraud prevention checks.',
            },
            {
              title: 'Access Governance',
              text: 'Monitor board, manager, vendor and portal access permissions so sensitive records stay controlled.',
            },
            {
              title: 'Incident Readiness',
              text: 'Track phishing attempts, suspicious activity, cyber insurance items and response steps before risk spreads.',
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
            ['MFA Coverage', '96%', 'Strong'],
            ['Vendor Verifications', '8', 'This month'],
            ['Access Reviews', '4', 'Pending'],
            ['Phishing Reports', '2', 'Logged'],
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
          <h2 className="text-2xl font-semibold text-amber-300">Cyber Control Pathway</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            Cybersecurity is now a governance issue. This pathway gives the board visibility
            into how association funds, resident data, vendor access and digital records are protected.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Verify', 'Confirm payment, vendor and access changes.'],
              ['2', 'Control', 'Apply MFA, permissions and approval safeguards.'],
              ['3', 'Monitor', 'Track access logs, suspicious activity and exceptions.'],
              ['4', 'Escalate', 'Route fraud, breach or phishing concerns for review.'],
              ['5', 'Document', 'Preserve incident history and board-level audit trail.'],
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
          <Panel title="Payment Protection" rows={[
            ['Wire Change Verification', 'Required'],
            ['Vendor Bank Changes', 'Dual review'],
            ['Invoice Approval Trail', 'Enabled'],
            ['QuickBooks Access', 'Monitored'],
          ]} />

          <Panel title="Portal Access Controls" rows={[
            ['Board MFA', 'Enabled'],
            ['Manager Permissions', 'Controlled'],
            ['Vendor Access', 'Limited'],
            ['Inactive Users', 'Review'],
          ]} />

          <Panel title="Cyber Incident Tracking" rows={[
            ['Phishing Reports', 'Logged'],
            ['Suspicious Login', 'Monitored'],
            ['Data Request Exception', 'Flagged'],
            ['Cyber Insurance Review', 'Pending'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Active Cyber Review Items</h2>
            <div className="mt-6 space-y-4">
              {[
                'Vendor banking change requires independent callback verification.',
                'Inactive board portal user requires permission removal review.',
                'Suspicious email reported by board member logged for phishing review.',
                'QuickBooks access roles require quarterly permission confirmation.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Cyber Readiness</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['MFA Policy', 'Active'],
                ['Payment Controls', 'Enabled'],
                ['Audit Trail', 'Available'],
                ['Incident Plan', 'Ready'],
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
            <p className="mt-3 text-slate-400">Connect financial controls to accounting access and payment verification.</p>
          </Link>

          <Link href="/board/ai-assistant-settings" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">AI Assistant Settings</h3>
            <p className="mt-3 text-slate-400">Align AI transcript, knowledge and access boundaries with data protection.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Surface cyber exceptions and fraud risks for executive board visibility.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Cybersecurity is no longer just an IT concern. Associations manage owner data,
            vendor payments, bank accounts, board records and sensitive financial workflows.
            This control center helps boards reduce fraud exposure, improve access discipline
            and document cyber readiness as part of responsible governance.
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

// pages/board/insurance-risk.js

import Link from 'next/link'

export default function InsuranceRiskCenter() {
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
                Insurance & Risk Center
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Board-level oversight for insurance renewals, claims activity, deductible
                exposure, vendor certificates, risk inspections, incident logs and community
                protection planning.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Risk Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Monitored</div>
              <div className="mt-1 text-sm text-slate-300">2 renewal items active</div>
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
              title: 'Renewal Readiness',
              text: 'Track policy expiration dates, broker requests, underwriting documentation and board approval timing.',
            },
            {
              title: 'Claims Oversight',
              text: 'Monitor open claims, deductible exposure, incident documentation and carrier communication status.',
            },
            {
              title: 'Risk Prevention',
              text: 'Surface inspections, vendor certificate gaps, safety items and recurring exposure trends before they become costly.',
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
            ['Policy Renewals', '2', 'Active'],
            ['Open Claims', '3', 'Tracked'],
            ['COI Exceptions', '4', 'Vendor follow-up'],
            ['Risk Items', '9', 'Open'],
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
          <h2 className="text-2xl font-semibold text-amber-300">Insurance Risk Control Pathway</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            Insurance and risk management require proactive timing, clean documentation and
            clear board visibility. This pathway helps the association prepare before renewal
            pressure, claims disputes or exposure issues become expensive problems.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Identify', 'Risk, claim, renewal or certificate issue is captured.'],
              ['2', 'Document', 'Photos, reports, policies and incident records are organized.'],
              ['3', 'Review', 'Management, broker, attorney or vendor review is routed.'],
              ['4', 'Decide', 'Board approval or direction is captured when required.'],
              ['5', 'Protect', 'Follow-through is tracked to reduce future exposure.'],
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
          <Panel title="Insurance Renewal Tracking" rows={[
            ['Property Policy', '90-day review'],
            ['General Liability', 'Broker request'],
            ['D&O Coverage', 'Current'],
            ['Flood Coverage', 'Verify limits'],
          ]} />

          <Panel title="Claims & Incidents" rows={[
            ['Water Intrusion', 'Open claim'],
            ['Slip/Fall Incident', 'Documenting'],
            ['Roof Damage', 'Carrier review'],
            ['Owner Report', 'Intake complete'],
          ]} />

          <Panel title="Vendor Certificate Controls" rows={[
            ['Landscape COI', 'Current'],
            ['Pool Vendor COI', 'Exception'],
            ['Security COI', 'Current'],
            ['Roof Vendor COI', 'Needs update'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Active Risk Items</h2>
            <div className="mt-6 space-y-4">
              {[
                'Pool vendor certificate requires updated additional insured language.',
                'Roof access incident requires final documentation before claim file closure.',
                'Drainage inspection recommended before rainy season exposure increases.',
                'Insurance renewal package requires updated reserve and maintenance records.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Risk Planning</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Renewal Calendar', 'Active'],
                ['Deductible Exposure', 'Tracked'],
                ['Inspection Log', 'Open'],
                ['Broker Updates', 'Pending'],
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
          <Link href="/board/maintenance-review" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Maintenance Review</h3>
            <p className="mt-3 text-slate-400">Connect risk findings to maintenance review and vendor follow-up.</p>
          </Link>

          <Link href="/board/compliance-legal-review" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Compliance & Legal Review</h3>
            <p className="mt-3 text-slate-400">Route claims, disputes and legal-sensitive risk matters for review.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Surface insurance exposure and risk priorities for executive oversight.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Insurance and risk management are board-level responsibilities that require
            preparation, documentation and disciplined follow-through. This center helps the
            association avoid preventable exposure by tracking renewals, claims, vendor
            coverage and risk conditions before they become financial emergencies.
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

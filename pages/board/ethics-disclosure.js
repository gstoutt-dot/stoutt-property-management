// pages/board/ethics-disclosure.js

import Link from 'next/link'

export default function EthicsDisclosureCenter() {
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
                Board Ethics & Conflict Disclosure Center
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Governance controls for director conflict disclosures, recusals, related-party
                vendor relationships, code of conduct acknowledgments and decision integrity.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Ethics Status
              </div>
              <div className="mt-2 text-3xl font-bold text-white">Transparent</div>
              <div className="mt-1 text-sm text-slate-300">2 disclosures pending review</div>
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
              title: 'Conflict Transparency',
              text: 'Track director disclosures, related-party interests and potential conflicts before board decisions are made.',
            },
            {
              title: 'Recusal Discipline',
              text: 'Document when a board member should abstain from discussion, voting or influence over a decision.',
            },
            {
              title: 'Decision Integrity',
              text: 'Preserve a clear governance record showing that decisions were reviewed, disclosed and handled properly.',
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
            ['Open Disclosures', '2', 'Review'],
            ['Recusals Logged', '5', 'This year'],
            ['Vendor Checks', '14', 'Completed'],
            ['Acknowledgments', '100%', 'Current'],
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
          <h2 className="text-2xl font-semibold text-amber-300">Ethics Review Pathway</h2>
          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            Ethical governance depends on disclosure before action. This pathway gives the
            board a structured method for identifying conflicts, documenting recusals and
            protecting the integrity of decisions.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ['1', 'Disclose', 'Potential conflict or relationship is recorded.'],
              ['2', 'Review', 'Board or management determines relevance to the matter.'],
              ['3', 'Recuse', 'Director abstains when participation is inappropriate.'],
              ['4', 'Decide', 'Remaining board members act with a clear record.'],
              ['5', 'Preserve', 'Disclosure, recusal and decision trail are retained.'],
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
          <Panel title="Disclosure Controls" rows={[
            ['Director Conflict Form', 'Active'],
            ['Related-Party Vendor Flag', 'Enabled'],
            ['Annual Disclosure Update', 'Current'],
            ['Decision-Specific Disclosure', 'Available'],
          ]} />

          <Panel title="Recusal Tracking" rows={[
            ['Discussion Recusal', 'Tracked'],
            ['Voting Recusal', 'Tracked'],
            ['Meeting Minutes Note', 'Required'],
            ['Quorum Impact', 'Checked'],
          ]} />

          <Panel title="Governance Integrity" rows={[
            ['Code of Conduct', 'Acknowledged'],
            ['Gift Policy', 'Tracked'],
            ['Vendor Neutrality', 'Reviewed'],
            ['Board Transparency', 'Documented'],
          ]} />
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Active Ethics Queue</h2>
            <div className="mt-6 space-y-4">
              {[
                'Director relationship to proposed vendor requires disclosure review before vote.',
                'Board member recusal note pending addition to meeting minutes.',
                'Annual code of conduct acknowledgment package ready for confirmation.',
                'Procurement comparison requires related-party check before recommendation.',
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-800 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold text-amber-300">Board Ethics Readiness</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {[
                ['Disclosure Log', 'Current'],
                ['Recusal Record', 'Available'],
                ['Vendor Review Trail', 'Active'],
                ['Conduct Forms', 'Complete'],
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
          <Link href="/board/vendors" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Vendor Review</h3>
            <p className="mt-3 text-slate-400">Connect vendor selection to conflict checks and procurement integrity.</p>
          </Link>

          <Link href="/board/records-management" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Records Management</h3>
            <p className="mt-3 text-slate-400">Preserve disclosure forms, recusals and decision history in official records.</p>
          </Link>

          <Link href="/board/command-center" className="rounded-3xl border border-white/10 bg-slate-900 p-7 transition hover:border-amber-400">
            <h3 className="text-xl font-semibold text-amber-300">Command Center</h3>
            <p className="mt-3 text-slate-400">Surface ethics exceptions and pending disclosures for executive visibility.</p>
          </Link>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">Governance Commentary</h2>
          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Ethical governance is not just about avoiding wrongdoing. It is about creating a
            visible, disciplined process that protects the association, the board and the trust
            of the homeowners. Clear disclosures, proper recusals and documented decision trails
            help preserve confidence in every board action.
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

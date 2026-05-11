const pillars = [
  {
    title: "Association Onboarding",
    description:
      "SPM captures association structure, property type, board contacts, and accounting readiness before operations begin.",
  },
  {
    title: "Owner + Unit Import",
    description:
      "Owner rosters and unit records are prepared for mapping, review, and secure portal access.",
  },
  {
    title: "QuickBooks Synchronization",
    description:
      "SPM mirrors accounting data from QuickBooks while preserving QuickBooks as the accounting source of truth.",
  },
  {
    title: "Owner Financial Visibility",
    description:
      "Owners receive calm access to balances, payment status, account health, and assessment visibility.",
  },
  {
    title: "Board Financial Oversight",
    description:
      "Boards see collection exposure, delinquency risk, account health, and financial rollups without spreadsheet confusion.",
  },
  {
    title: "Operational Transparency",
    description:
      "Managers, boards, and owners operate from the same synchronized financial picture.",
  },
];

const demoLinks = [
  { label: "Launch Demo Flow", href: "/financial-demo-launch" },
  { label: "Financial Onboarding Command", href: "/financial-onboarding-command" },
  { label: "QuickBooks Command Center", href: "/accounting/quickbooks-live" },
  { label: "Board Financial Visibility", href: "/board-financial-visibility" },
];

export default function FinancialOperationsOverview() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            Stoutt Property Management
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl">
            Financial Operations for Modern HOA & Condominium Management
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            SPM helps associations onboard quickly, synchronize accounting
            records, provide owner balance visibility, and give boards calm,
            trustworthy financial oversight.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/financial-demo-launch"
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
            >
              Start Boardroom Demo
            </a>

            <a
              href="/financial-onboarding-command"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              View Onboarding Command
            </a>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Primary Focus" value="Financial Ops" />
          <Metric label="Accounting Source" value="QuickBooks" />
          <Metric label="Owner Visibility" value="Live Ready" />
          <Metric label="Board Demo" value="Green" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Platform Pillars
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              What SPM Delivers First
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Core Sales Statement
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Onboard the association. Connect accounting. Show financial
                clarity.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                SPM gives boards a financial operations platform before the
                community gets buried in spreadsheets, unclear balances, missed
                follow-ups, and disconnected accounting visibility.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Demo Navigation</h2>

              <div className="mt-6 space-y-3">
                {demoLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 font-semibold text-white transition hover:border-amber-300/40 hover:bg-white/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6">
              <p className="font-semibold text-emerald-200">
                Presentation Positioning
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Work orders matter, but financial transparency is the first
                confidence layer boards need before making a management change.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

const demoFlow = [
  {
    title: "1. Association Onboarding",
    description:
      "Show how a new HOA or condominium association enters the SPM financial operations system.",
    href: "/association-onboarding",
    status: "Ready",
  },
  {
    title: "2. Owner / Unit Import",
    description:
      "Show owner and unit records being prepared for accounting visibility.",
    href: "/owner-unit-import",
    status: "Ready",
  },
  {
    title: "3. Owner Identity Mapping",
    description:
      "Show the bridge between unit owners, portal identities, and QuickBooks customers.",
    href: "/owner-identity-mapping",
    status: "Ready",
  },
  {
    title: "4. Owner Access Provisioning",
    description:
      "Show secure owner login activation and financial visibility readiness.",
    href: "/owner-access-provisioning",
    status: "Ready",
  },
  {
    title: "5. Owner Financial Dashboard",
    description:
      "Show the owner-facing financial experience with balance and payment visibility.",
    href: "/owner-financial-dashboard-preview",
    status: "Ready",
  },
  {
    title: "6. Board Financial Visibility",
    description:
      "Show board-level account health, delinquency, and financial rollup visibility.",
    href: "/board-financial-visibility",
    status: "Ready",
  },
  {
    title: "7. QuickBooks Command Center",
    description:
      "Show the live accounting synchronization center and green financial summary.",
    href: "/accounting/quickbooks-live",
    status: "Green",
  },
];

export default function FinancialDemoLaunch() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Boardroom Demo
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Financial Operations Demo Launch
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            A clean presentation path for showing how SPM onboards an
            association, imports owners, connects accounting records, activates
            owner visibility, and delivers board-ready financial transparency.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Demo Modules" value="7" />
          <Metric label="Primary Focus" value="Financial Ops" />
          <Metric label="Accounting Sync" value="Green" />
          <Metric label="Sales Readiness" value="Boardroom" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Presentation Path
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Recommended Live Demo Sequence
            </h2>

            <div className="mt-6 grid gap-4">
              {demoFlow.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="group rounded-3xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-amber-300/40 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>
                    </div>

                    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      {item.status}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Boardroom Positioning
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Financial Transparency First.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                SPM gives boards immediate visibility into owner balances,
                delinquency exposure, account health, and accounting
                synchronization — before operational chaos becomes a board
                problem.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Talk Track</h2>

              <div className="mt-6 space-y-3">
                <TalkPoint text="We onboard the association first." />
                <TalkPoint text="Then we import owners and units." />
                <TalkPoint text="Then we connect each owner to accounting records." />
                <TalkPoint text="Then owners receive secure financial visibility." />
                <TalkPoint text="Then the board receives calm financial oversight." />
                <TalkPoint text="QuickBooks remains the accounting source of truth." />
              </div>
            </div>

            <a
              href="/financial-onboarding-command"
              className="block rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6 transition hover:bg-emerald-400/15"
            >
              <p className="font-semibold text-emerald-200">
                Open Financial Onboarding Command Center
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                View the full onboarding workflow in operational sequence.
              </p>
            </a>
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

function TalkPoint({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="h-3 w-3 rounded-full bg-emerald-300" />
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}

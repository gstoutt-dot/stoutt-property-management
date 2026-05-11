const presentationSections = [
  {
    title: "Financial Operations Overview",
    href: "/financial-operations-overview",
    purpose: "Open with the core business value and financial-first platform positioning.",
  },
  {
    title: "Financial Demo Launch",
    href: "/financial-demo-launch",
    purpose: "Run the clean boardroom demo sequence from one place.",
  },
  {
    title: "Association Onboarding Pipeline",
    href: "/association-onboarding-pipeline",
    purpose: "Show how multiple associations move from intake to financial visibility.",
  },
  {
    title: "Manager Financial Operations",
    href: "/manager-financial-operations",
    purpose: "Show the manager’s operating view for financial workflows.",
  },
  {
    title: "Owner Financial Dashboard",
    href: "/owner-financial-dashboard-preview",
    purpose: "Show what owners see for balance, payment status, and account health.",
  },
  {
    title: "Owner Payment Center",
    href: "/owner-payment-center-preview",
    purpose: "Show the payment-ready owner experience.",
  },
  {
    title: "Board Financial Visibility",
    href: "/board-financial-visibility",
    purpose: "Show board-level balances, delinquency, collections exposure, and account health.",
  },
  {
    title: "QuickBooks Command Center",
    href: "/accounting/quickbooks-live",
    purpose: "Close with the live QuickBooks synchronization and green financial summary.",
  },
];

export default function BoardroomPresentationIndex() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Boardroom Presentation
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl">
            Financial Transparency Presentation Index
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A guided boardroom path for presenting SPM as a financial operations
            platform for HOA and condominium association management.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/financial-operations-overview"
              className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
            >
              Start Presentation
            </a>

            <a
              href="/financial-demo-launch"
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Open Demo Launch
            </a>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Presentation Views" value={presentationSections.length} />
          <Metric label="Primary Message" value="Financial Clarity" />
          <Metric label="Audience" value="Boards" />
          <Metric label="Demo Status" value="Green" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Presentation Sequence
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Recommended Boardroom Flow
            </h2>

            <div className="mt-6 grid gap-4">
              {presentationSections.map((section, index) => (
                <a
                  key={section.href}
                  href={section.href}
                  className="group rounded-3xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-amber-300/40 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-lg font-semibold text-amber-300">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {section.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                          {section.purpose}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      Ready
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Boardroom Close
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                “We can provide financial clarity immediately.”
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                The strongest sales position is no longer just faster work
                orders. It is live owner balance visibility, board-level
                financial transparency, QuickBooks synchronization, and calm
                operational control.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Presenter Notes</h2>

              <div className="mt-6 space-y-3">
                <Note text="Lead with financial transparency." />
                <Note text="Show association onboarding before owner tools." />
                <Note text="Show owner visibility before board rollups." />
                <Note text="Close with QuickBooks green sync." />
                <Note text="Keep work orders secondary unless asked." />
              </div>
            </div>

            <a
              href="/financial-readiness-checklist"
              className="block rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6 transition hover:bg-emerald-400/15"
            >
              <p className="font-semibold text-emerald-200">
                Open Financial Readiness Checklist
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Confirm the presentation system is ready before a live board
                meeting.
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

function Note({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="h-3 w-3 rounded-full bg-emerald-300" />
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}

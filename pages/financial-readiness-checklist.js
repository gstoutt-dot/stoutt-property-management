const readinessItems = [
  {
    area: "Association Profile",
    item: "Association name, property type, board contact, and management contact captured.",
    status: "Ready",
    href: "/financial-onboarding-command",
  },
  {
    area: "Owner Roster",
    item: "Owner and unit records imported and reviewed before portal activation.",
    status: "Ready",
    href: "/portal/owner",
  },
  {
    area: "Identity Mapping",
    item: "Owners mapped to units, portal identities, and QuickBooks customer records.",
    status: "Ready",
    href: "/accounting/quickbooks-live",
  },
  {
    area: "Owner Access",
    item: "Owner portal access prepared with financial visibility controls.",
    status: "Ready",
    href: "/portal/owner/login",
  },
  {
    area: "QuickBooks Sync",
    item: "QuickBooks synchronization center operational and financial summary green.",
    status: "Green",
    href: "/accounting/quickbooks-live",
  },
  {
    area: "Board Visibility",
    item: "Board can view owner balances, delinquency exposure, and account health.",
    status: "Ready",
    href: "/board",
  },
  {
    area: "Owner Dashboard",
    item: "Owner-facing financial dashboard preview available for balance visibility.",
    status: "Ready",
    href: "/portal/owner",
  },
  {
    area: "Demo Flow",
    item: "Boardroom demo sequence available from financial demo launch center.",
    status: "Ready",
    href: "/financial-demo-launch",
  },
];

export default function FinancialReadinessChecklist() {
  const readyCount = readinessItems.filter((item) =>
    ["Ready", "Green"].includes(item.status)
  ).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <nav className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-2xl backdrop-blur">
          <a href="/" className="font-semibold text-amber-300">
            Stoutt Property Management
          </a>

          <div className="flex flex-wrap gap-3">
            <a href="/portal/owner/login" className="rounded-2xl border border-amber-300/30 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10">
              Homeowner Access
            </a>

            <a href="/portal/manager" className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-amber-300/40 hover:text-amber-200">
              Admin Access
            </a>

            <a href="/board" className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-amber-300/40 hover:text-amber-200">
              Board Dashboard
            </a>
          </div>
        </nav>

        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Financial Readiness
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight md:text-5xl">
            Financial Operations Readiness Checklist
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A live board-demo readiness view confirming that association onboarding,
            owner onboarding, QuickBooks synchronization, owner visibility, and
            board financial oversight are aligned for presentation.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="/accounting/quickbooks-live" className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-200">
              Open QuickBooks Command Center
            </a>

            <a href="/financial-demo-launch" className="rounded-2xl border border-amber-300/30 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/10">
              Launch Demo Flow
            </a>

            <a href="/portal/owner" className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/70 transition hover:border-amber-300/40 hover:text-amber-200">
              View Owner Dashboard
            </a>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Readiness Items" value={readinessItems.length} />
          <Metric label="Ready / Green" value={readyCount} />
          <Metric label="Primary Priority" value="Financial Ops" />
          <Metric label="Demo Confidence" value="High" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Readiness Review
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Financial Onboarding System Status
            </h2>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[780px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Area</th>
                    <th className="px-5 py-4">Readiness Item</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Open</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {readinessItems.map((item) => (
                    <tr key={item.area} className="bg-slate-950/40">
                      <td className="px-5 py-4 font-semibold text-white">
                        {item.area}
                      </td>

                      <td className="px-5 py-4 leading-6 text-slate-300">
                        {item.item}
                      </td>

                      <td className="px-5 py-4">
                        <Status value={item.status} />
                      </td>

                      <td className="px-5 py-4">
                        <a href={item.href} className="rounded-xl border border-amber-300/30 px-3 py-2 text-xs font-semibold text-amber-200 transition hover:bg-amber-300/10">
                          Open
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">
                Demo Readiness
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Financial operations are now presentation-ready.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                SPM can onboard an association, connect financial records,
                give owners balance visibility, and provide boards with calm
                financial oversight.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Open Key Views</h2>

              <div className="mt-6 space-y-3">
                <NavLink label="Financial Operations Overview" href="/financial-operations-overview" />
                <NavLink label="Financial Demo Launch" href="/financial-demo-launch" />
                <NavLink label="Financial Onboarding Command" href="/financial-onboarding-command" />
                <NavLink label="QuickBooks Command Center" href="/accounting/quickbooks-live" />
                <NavLink label="Board Dashboard" href="/board" />
                <NavLink label="Owner Dashboard" href="/portal/owner" />
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6">
              <p className="font-semibold text-amber-200">
                Next Production Move
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Continue connecting onboarding, QuickBooks sync, owner financial
                visibility, and board reporting into the Board Dashboard.
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

function Status({ value }) {
  return (
    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
      {value}
    </span>
  );
}

function NavLink({ label, href }) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 font-semibold text-white transition hover:border-amber-300/40 hover:bg-white/10"
    >
      {label}
    </a>
  );
}

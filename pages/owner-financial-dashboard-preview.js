const onboardingSteps = [
  {
    title: "Association Onboarding",
    description:
      "Capture association profile, property type, board contact, and QuickBooks readiness.",
    status: "Live",
    href: "/association-onboarding",
  },
  {
    title: "Owner / Unit Import",
    description:
      "Import and review unit-owner records before accounting identity matching.",
    status: "Live",
    href: "/owner-unit-import",
  },
  {
    title: "Owner Identity Mapping",
    description:
      "Match owners, units, portal identities, and QuickBooks customer records.",
    status: "Live",
    href: "/owner-identity-mapping",
  },
  {
    title: "Owner Access Provisioning",
    description:
      "Prepare secure owner portal access and financial visibility activation.",
    status: "Live",
    href: "/owner-access-provisioning",
  },
  {
    title: "Board Financial Visibility",
    description:
      "Present board-level financial rollups, account health, and collections exposure.",
    status: "Live",
    href: "/board-financial-visibility",
  },
  {
    title: "QuickBooks Command Center",
    description:
      "Run live QuickBooks sync and review accounting synchronization health.",
    status: "Operational",
    href: "/accounting/quickbooks-live",
  },
];

export default function FinancialOnboardingCommand() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Financial Onboarding
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Financial Onboarding Command Center
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            A complete operating path for onboarding an association, importing
            owners, mapping accounting identities, provisioning secure access,
            and activating board-ready financial visibility.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Onboarding Modules" value="6" />
          <Metric label="Financial Priority" value="Active" />
          <Metric label="QuickBooks Sync" value="Green" />
          <Metric label="Demo Readiness" value="Board Ready" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Onboarding Sequence
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Association-to-Financial Visibility Workflow
            </h2>

            <div className="mt-6 grid gap-4">
              {onboardingSteps.map((step, index) => (
                <a
                  key={step.title}
                  href={step.href}
                  className="group rounded-3xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-amber-300/40 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-300/30 bg-amber-300/10 text-lg font-semibold text-amber-300">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                      {step.status}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Core Sales Message
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Onboard. Sync. Show Financial Clarity.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                SPM can onboard your association, import owners and units,
                connect accounting records, provision owner access, and provide
                board-level financial transparency immediately.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-semibold">Production Guardrails</h2>

              <div className="mt-6 space-y-3">
                <Guardrail label="Supabase architecture preserved" />
                <Guardrail label="QuickBooks sync untouched" />
                <Guardrail label="BOS orchestration untouched" />
                <Guardrail label="notificationRouter isolated" />
                <Guardrail label="No localStorage onboarding architecture" />
                <Guardrail label="Financial operations priority maintained" />
              </div>
            </div>

            <a
              href="/accounting/quickbooks-live"
              className="block rounded-[2rem] border border-emerald-300/20 bg-emerald-400/10 p-6 transition hover:bg-emerald-400/15"
            >
              <p className="font-semibold text-emerald-200">
                Open Live QuickBooks Command Center
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Review sync health, owner balances, and board financial summary.
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

function Guardrail({ label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <div className="h-3 w-3 rounded-full bg-emerald-300" />
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
}

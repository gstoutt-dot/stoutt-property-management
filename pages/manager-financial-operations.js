const operationalQueues = [
  {
    title: "Association Onboarding",
    count: 2,
    status: "Active",
  },
  {
    title: "Owner Imports",
    count: 14,
    status: "Processing",
  },
  {
    title: "Identity Mapping Reviews",
    count: 3,
    status: "Attention",
  },
  {
    title: "Owner Access Provisioning",
    count: 6,
    status: "Ready",
  },
];

const financialAlerts = [
  {
    association: "Sunset Condominium Association",
    alert: "Critical delinquency exposure detected",
    severity: "Critical",
  },
  {
    association: "Palm Grove HOA",
    alert: "Owner import pending verification",
    severity: "Attention",
  },
  {
    association: "Bay Harbor Condominium",
    alert: "QuickBooks synchronization healthy",
    severity: "Healthy",
  },
];

const managerActions = [
  {
    label: "Open Financial Onboarding Command",
    href: "/financial-onboarding-command",
  },
  {
    label: "Open QuickBooks Command Center",
    href: "/accounting/quickbooks-live",
  },
  {
    label: "Open Board Financial Visibility",
    href: "/board-financial-visibility",
  },
  {
    label: "Launch Financial Demo",
    href: "/financial-demo-launch",
  },
];

export default function ManagerFinancialOperations() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Manager Operations
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Financial Operations Manager Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            A manager-facing operational layer for onboarding associations,
            preparing owner visibility, monitoring financial readiness, and
            maintaining synchronized accounting operations.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Onboarding Queues" value="4" />
          <Metric label="Financial Alerts" value="3" />
          <Metric label="Sync Status" value="Green" />
          <Metric label="Manager Visibility" value="Live" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Operational Queues
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Financial Workflow Activity
              </h2>

              <div className="mt-6 space-y-3">
                {operationalQueues.map((queue) => (
                  <div
                    key={queue.title}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">
                          {queue.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          {queue.count} active items
                        </p>
                      </div>

                      <QueueStatus value={queue.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Operations Message
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Financial visibility first.
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                The manager workflow now prioritizes onboarding, accounting
                synchronization, owner visibility, and board financial clarity
                before operational complexity.
              </p>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                    Financial Alerts
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    Association Financial Attention Center
                  </h2>
                </div>

                <a
                  href="/financial-readiness-checklist"
                  className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
                >
                  Open Readiness Checklist
                </a>
              </div>

              <div className="mt-6 space-y-4">
                {financialAlerts.map((alert, index) => (
                  <div
                    key={`${alert.association}-${index}`}
                    className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">
                          {alert.association}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {alert.alert}
                        </p>
                      </div>

                      <AlertStatus value={alert.severity} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Operations Navigation
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Manager Financial Tools
              </h2>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {managerActions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 font-semibold text-white transition hover:border-amber-300/40 hover:bg-white/10"
                  >
                    {action.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
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

function QueueStatus({ value }) {
  const styles =
    value === "Active"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Processing"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function AlertStatus({ value }) {
  const styles =
    value === "Healthy"
      ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
      : value === "Attention"
      ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
      : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

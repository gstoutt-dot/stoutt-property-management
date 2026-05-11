const associations = [
  {
    name: "Sunset Condominium Association",
    type: "Condominium Association",
    units: 10,
    stage: "Financial Visibility Active",
    quickbooks: "Connected",
    ownerImport: "Complete",
    boardReady: "Ready",
  },
  {
    name: "Palm Grove HOA",
    type: "HOA",
    units: 84,
    stage: "Owner Import Review",
    quickbooks: "Pending",
    ownerImport: "In Review",
    boardReady: "Pending",
  },
  {
    name: "Bay Harbor Condominium",
    type: "Condominium Association",
    units: 126,
    stage: "Association Intake",
    quickbooks: "Not Connected",
    ownerImport: "Not Started",
    boardReady: "Not Ready",
  },
];

export default function AssociationOnboardingPipeline() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Association Pipeline
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Association Onboarding Pipeline
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Track each association from intake through QuickBooks connection,
            owner import, financial visibility, and board readiness.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric label="Associations" value={associations.length} />
          <Metric label="Financial Active" value="1" />
          <Metric label="In Progress" value="2" />
          <Metric label="Property Types" value="HOA + Condo" />
        </section>

        <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Onboarding Status
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Association Financial Readiness Queue
              </h2>
            </div>

            <a
              href="/association-onboarding"
              className="rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
            >
              Start New Association
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                <tr>
                  <th className="px-5 py-4">Association</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Units</th>
                  <th className="px-5 py-4">Stage</th>
                  <th className="px-5 py-4">QuickBooks</th>
                  <th className="px-5 py-4">Owner Import</th>
                  <th className="px-5 py-4">Board Ready</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {associations.map((association) => (
                  <tr key={association.name} className="bg-slate-950/40">
                    <td className="px-5 py-4 font-semibold text-white">
                      {association.name}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {association.type}
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {association.units}
                    </td>
                    <td className="px-5 py-4">
                      <Status value={association.stage} />
                    </td>
                    <td className="px-5 py-4">
                      <Status value={association.quickbooks} />
                    </td>
                    <td className="px-5 py-4">
                      <Status value={association.ownerImport} />
                    </td>
                    <td className="px-5 py-4">
                      <Status value={association.boardReady} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <NavCard
            title="Financial Onboarding Command"
            text="Open the complete onboarding workflow."
            href="/financial-onboarding-command"
          />
          <NavCard
            title="Manager Financial Operations"
            text="Review manager-facing financial operations."
            href="/manager-financial-operations"
          />
          <NavCard
            title="QuickBooks Center"
            text="Open live sync and accounting health."
            href="/accounting/quickbooks-live"
          />
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
  const positive = ["Connected", "Complete", "Ready", "Financial Visibility Active"];
  const warning = ["Pending", "In Review", "Owner Import Review"];

  const styles = positive.includes(value)
    ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
    : warning.includes(value)
    ? "border-amber-300/30 bg-amber-400/10 text-amber-200"
    : "border-red-300/30 bg-red-400/10 text-red-200";

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${styles}`}>
      {value}
    </span>
  );
}

function NavCard({ title, text, href }) {
  return (
    <a
      href={href}
      className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl transition hover:border-amber-300/40 hover:bg-white/10"
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </a>
  );
}

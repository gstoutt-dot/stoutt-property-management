import Link from "next/link";

const workflowStages = [
  {
    step: "01",
    title: "Owner Intake",
    status: "Live",
    owner: "Owner Portal",
    href: "/portal/owner",
    description:
      "Owner submits maintenance, architectural, amenity, financial, document, violation, or general requests.",
    output: "Creates a new bos_actions record with status: open.",
  },
  {
    step: "02",
    title: "Manager Review",
    status: "Live",
    owner: "Manager Portal",
    href: "/portal/manager",
    description:
      "Manager reviews intake, confirms details, adds notes, routes, approves, or escalates.",
    output: "Updates status to in_progress, board_review, approved, rejected, or completed.",
  },
  {
    step: "03",
    title: "Board Review",
    status: "Live",
    owner: "Board Action Center",
    href: "/board/action-center",
    description:
      "Board reviews escalated items and approves, rejects, or requests more information.",
    output: "Sends decision back into the manager workflow.",
  },
  {
    step: "04",
    title: "Manager Execution",
    status: "Live",
    owner: "Manager Portal",
    href: "/portal/manager",
    description:
      "Manager acts on approved items, schedules work, assigns vendors, or closes rejected/incomplete items.",
    output: "Prepares approved work for vendor dispatch or completion.",
  },
  {
    step: "05",
    title: "Vendor Dispatch",
    status: "Live Inside Manager",
    owner: "Manager Portal",
    href: "/portal/manager",
    description:
      "Vendor details are saved, dispatch is simulated, and work can be tracked toward completion.",
    output: "Stores vendor information and dispatch timestamp.",
  },
  {
    step: "06",
    title: "Owner Visibility",
    status: "Live",
    owner: "Owner Portal",
    href: "/portal/owner",
    description:
      "Owner sees request status, progress percentage, current stage, and next step.",
    output: "Closes the communication loop with owner-facing transparency.",
  },
];

const systemRules = [
  "Owner Portal creates records.",
  "Manager Portal controls routing and execution.",
  "Board Action Center only acts on board-level decisions.",
  "Board Command Center is intelligence, not workflow editing.",
  "Manager Portal remains the operational control tower.",
  "Supabase bos_actions is the source of truth.",
];

export default function WorkflowEngineUI() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            BOS Architecture Layer
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Workflow Engine
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
            High-level operating map for how requests move through Stoutt
            Property Management’s Owner, Manager, Board, Vendor, and BOS layers.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/portal"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Portal Hub
            </Link>

            <Link
              href="/portal/manager"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-3 font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Manager Command Center
            </Link>

            <Link
              href="/board/action-center"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 hover:bg-white/10"
            >
              Board Action Center
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Metric label="Workflow Stages" value="6" />
          <Metric label="Core Portals" value="3" />
          <Metric label="Data Source" value="BOS" highlight />
          <Metric label="Loop Status" value="Closed" />
        </div>

        <section className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Current Live Flow
          </div>

          <h2 className="text-3xl font-bold">Owner → Manager → Board → Manager → Vendor → Owner</h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
            This page is the reference map for the working BOS workflow. It does
            not replace the live command centers; it documents and organizes how
            they work together.
          </p>
        </section>

        <div className="mt-10 grid gap-6">
          {workflowStages.map((stage, index) => (
            <div
              key={stage.step}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30"
            >
              <div className="grid gap-6 lg:grid-cols-[120px_1fr_260px] lg:items-start">
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400 text-xl font-black text-slate-950">
                    {stage.step}
                  </div>

                  {index < workflowStages.length - 1 && (
                    <div className="ml-8 mt-4 hidden h-14 w-px bg-amber-400/30 lg:block" />
                  )}
                </div>

                <div>
                  <div className="mb-3 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {stage.status}
                  </div>

                  <h3 className="text-3xl font-bold">{stage.title}</h3>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                    {stage.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs uppercase tracking-wide text-slate-500">
                      BOS Output
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-300">
                      {stage.output}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    Responsible Module
                  </div>

                  <div className="mt-2 text-lg font-semibold text-white">
                    {stage.owner}
                  </div>

                  <Link
                    href={stage.href}
                    className="mt-5 inline-block rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-medium text-amber-300 hover:bg-amber-400/20"
                  >
                    Open Module →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              System Rules
            </div>

            <h2 className="text-3xl font-bold">Source of Truth</h2>

            <div className="mt-6 space-y-3">
              {systemRules.map((rule) => (
                <div
                  key={rule}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300"
                >
                  {rule}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Status Map
            </div>

            <h2 className="text-3xl font-bold">BOS Status Logic</h2>

            <div className="mt-6 space-y-3">
              <StatusRow status="open" meaning="Request received from owner." />
              <StatusRow status="in_progress" meaning="Under management review." />
              <StatusRow status="board_review" meaning="Escalated to board decision layer." />
              <StatusRow status="approved" meaning="Approved and ready for execution." />
              <StatusRow status="rejected" meaning="Declined or stopped." />
              <StatusRow status="completed" meaning="Closed after execution." />
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="text-sm text-slate-400">{label}</div>
      <div
        className={`mt-2 text-2xl font-black ${
          highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function StatusRow({ status, meaning }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="font-mono text-sm text-amber-300">{status}</div>
      <div className="mt-1 text-sm text-slate-400">{meaning}</div>
    </div>
  );
}

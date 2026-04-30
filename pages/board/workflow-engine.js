import Link from "next/link";

export default function WorkflowEngine() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide text-amber-300">
            Stoutt BOS
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-amber-300">Board</Link>
            <Link href="/board/command-center" className="hover:text-amber-300">Command Center</Link>
            <Link href="/board/workflow-engine" className="text-amber-300">Workflow</Link>
            <Link href="/board/action-items" className="hover:text-amber-300">Action Items</Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">Violations</Link>
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Board Operating System
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Workflow Execution Engine
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              The operational layer that converts board decisions, owner requests,
              compliance matters, vendor tasks, and management commitments into
              trackable execution workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/board/action-items"
                className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
              >
                View Action Items
              </Link>

              <Link
                href="/board/command-center"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-300 hover:text-amber-300"
              >
                Back to Command Center
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Active Workflows",
                value: "24",
                note: "Open execution paths currently moving through BOS.",
              },
              {
                title: "Pending Decisions",
                value: "9",
                note: "Items waiting for board input, approval, or direction.",
              },
              {
                title: "Vendor Actions",
                value: "6",
                note: "Workflows connected to inspections, proposals, and dispatch.",
              },
              {
                title: "Escalations",
                value: "3",
                note: "Items elevated due to risk, delay, cost, or compliance impact.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
              >
                <p className="text-sm font-medium text-slate-400">{item.title}</p>
                <p className="mt-3 text-4xl font-bold text-amber-300">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Execution Queue
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">Workflow Pipeline</h2>
              </div>

              <span className="w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold text-amber-200">
                Supabase-Ready Engine
              </span>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "Violation notice approval and owner communication",
                  type: "Compliance",
                  stage: "Board Review",
                  next: "Approve notice language",
                  risk: "Medium",
                },
                {
                  title: "Pool light maintenance request and vendor inspection",
                  type: "Maintenance",
                  stage: "Vendor Coordination",
                  next: "Dispatch licensed vendor",
                  risk: "High",
                },
                {
                  title: "ARC fence modification request",
                  type: "Architectural",
                  stage: "Committee Review",
                  next: "Record decision and notify owner",
                  risk: "Low",
                },
                {
                  title: "Delinquency package preparation",
                  type: "Financial",
                  stage: "Document Collection",
                  next: "Treasurer/legal review",
                  risk: "High",
                },
              ].map((workflow) => (
                <div
                  key={workflow.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-amber-300/40"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{workflow.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">
                        Type: {workflow.type} · Current stage: {workflow.stage}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                        {workflow.next}
                      </span>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                        Risk: {workflow.risk}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                BOS Logic
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">How Workflows Move</h2>

              <div className="mt-6 space-y-4">
                {[
                  "Request, issue, or board decision enters BOS.",
                  "System classifies the item by module and urgency.",
                  "Workflow assigns ownership, deadline, and next action.",
                  "Events persist into BOS database for audit history.",
                  "Command Center surfaces status, delay, and escalation signals.",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-300 text-sm font-bold text-slate-950">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-6 text-slate-300">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
                Next Integration
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">State Persistence</h2>
              <p className="mt-4 text-sm leading-7 text-amber-50/90">
                Next step: persist workflow status, stage changes, assignment updates,
                completion events, and escalation history directly into Supabase.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                Cross-Module Sync
              </p>
              <h2 className="mt-3 text-xl font-bold text-white">Operational Bridge</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Violations, ARC, maintenance, vendors, reserves, financial review,
                and board decisions will eventually feed into this engine instead
                of living as separate isolated pages.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

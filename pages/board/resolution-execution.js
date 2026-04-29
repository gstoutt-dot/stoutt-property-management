import Link from "next/link";

export default function BoardResolutionExecution() {
  const resolutions = [
    {
      id: "RES-2026-014",
      title: "Pool Lighting Replacement Approval",
      status: "In Execution",
      owner: "Maintenance Committee",
      deadline: "May 8, 2026",
      progress: "65%",
    },
    {
      id: "RES-2026-013",
      title: "Reserve Study Update Authorization",
      status: "Assigned",
      owner: "Treasurer",
      deadline: "May 15, 2026",
      progress: "35%",
    },
    {
      id: "RES-2026-012",
      title: "Security Camera Contract Renewal",
      status: "Pending Vendor Action",
      owner: "Property Manager",
      deadline: "May 21, 2026",
      progress: "50%",
    },
    {
      id: "RES-2026-011",
      title: "Updated Parking Enforcement Policy",
      status: "Complete",
      owner: "Board Secretary",
      deadline: "Completed",
      progress: "100%",
    },
  ];

  const executionSteps = [
    "Resolution approved by board vote",
    "Responsible party assigned",
    "Execution deadline confirmed",
    "Supporting documents attached",
    "Progress reviewed by management",
    "Completion archived in governance record",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-400">
              Stoutt Property Management
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Board Resolution Execution Center
            </h1>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-amber-300">
              Board Portal
            </Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">
              Violations
            </Link>
            <Link href="/board/architectural-approvals" className="hover:text-amber-300">
              ARC Approvals
            </Link>
            <Link href="/board/maintenance-review" className="hover:text-amber-300">
              Maintenance
            </Link>
            <Link href="/board/financial-review" className="hover:text-amber-300">
              Financials
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
              Purpose
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Approved decisions become accountable action.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This center tracks every approved board resolution from vote to
              assignment, execution, completion, and archival record.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
              Why It Matters
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              No resolution should disappear after the meeting.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Boards often approve important actions, but execution can stall
              without ownership, deadlines, documentation, and management
              follow-through.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
              Governance Record
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Every resolution has a closing file.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Completed items can be linked back to motions, minutes, documents,
              contracts, invoices, and final board confirmation.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Active Resolutions</p>
            <p className="mt-3 text-4xl font-semibold text-white">12</p>
            <p className="mt-2 text-xs text-amber-300">4 require follow-up</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Completed This Month</p>
            <p className="mt-3 text-4xl font-semibold text-emerald-300">7</p>
            <p className="mt-2 text-xs text-slate-500">Archived with record</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Past Due Items</p>
            <p className="mt-3 text-4xl font-semibold text-rose-300">2</p>
            <p className="mt-2 text-xs text-slate-500">Needs manager review</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Average Completion</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">11d</p>
            <p className="mt-2 text-xs text-slate-500">Vote to closeout</p>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                Execution Queue
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Approved Resolution Tracker
              </h2>
            </div>
            <p className="text-sm text-slate-400">
              Vote → Assignment → Execution → Completion → Archive
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {resolutions.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-slate-950/60 p-5"
              >
                <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr] lg:items-center">
                  <div>
                    <p className="text-xs font-semibold text-amber-300">
                      {item.id}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Responsible: {item.owner}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Status
                    </p>
                    <p className="mt-2 font-semibold text-slate-200">
                      {item.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Deadline
                    </p>
                    <p className="mt-2 font-semibold text-slate-200">
                      {item.deadline}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Progress
                    </p>
                    <div className="mt-3 h-2 rounded-full bg-slate-800">
                      <div
                        className="h-2 rounded-full bg-amber-400"
                        style={{ width: item.progress }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{item.progress}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Resolution Lifecycle
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Standard Execution Path
            </h2>

            <div className="mt-6 space-y-4">
              {executionSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-sm font-semibold text-amber-300">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{step}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Step recorded for governance continuity.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Completion File
            </p>
            <h2 className="mt-2 text-2xl font-semibold">
              Required Closeout Record
            </h2>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                Board motion and vote reference
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                Assigned responsible party
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                Vendor, manager, or committee action notes
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                Supporting documents, invoice, or contract linkage
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                Final completion acknowledgment
              </div>
            </div>
          </section>
        </div>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-black/30">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                Governance Commentary
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                A board decision is only complete when the action is complete.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
                Resolution tracking protects the association by connecting board
                authority to real-world execution. It creates a defensible record
                showing what was approved, who was responsible, what was done, and
                when the matter was closed.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm font-semibold text-white">
                Execution Health Snapshot
              </p>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-400">Open resolutions</span>
                  <span className="font-semibold text-amber-300">12</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-400">Past due</span>
                  <span className="font-semibold text-rose-300">2</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-400">Archived this month</span>
                  <span className="font-semibold text-emerald-300">7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Audit trail status</span>
                  <span className="font-semibold text-slate-200">Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

import Link from "next/link";

export default function BoardInspectionCenter() {
  const inspectionItems = [
    {
      title: "Pool deck lighting inspection",
      area: "Pool / Recreation",
      status: "Follow-Up Needed",
      priority: "High",
      desc: "Several fixture outages documented during evening inspection and routed to maintenance review.",
    },
    {
      title: "Landscape condition review",
      area: "Common Areas",
      status: "Vendor Notice",
      priority: "Medium",
      desc: "Landscape beds show decline in multiple zones and require vendor correction plan.",
    },
    {
      title: "Building exterior walk-through",
      area: "Building Envelope",
      status: "Documented",
      priority: "Medium",
      desc: "Paint wear, stucco cracking and minor staining photographed for future maintenance planning.",
    },
    {
      title: "Parking compliance scan",
      area: "Parking Areas",
      status: "Violation Trigger",
      priority: "Low",
      desc: "Recurring unauthorized vehicle issue flagged for compliance review.",
    },
  ];

  const workflow = [
    "Schedule routine property inspection",
    "Capture notes, photos and condition observations",
    "Separate maintenance issues from violation triggers",
    "Route repair items to Maintenance Review",
    "Route owner compliance items to Violation Review",
    "Summarize property condition trends for board reports",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Stoutt Property Management
            </div>
            <h1 className="mt-1 text-2xl font-semibold">
              Inspection Center
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
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

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Property Conditions • Photos • Follow-Up Routing
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Turn property inspections into organized board-visible action.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track common-area conditions, photo documentation, maintenance
                issues, vendor follow-up, violation triggers and recurring property
                trends from one inspection command center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Open Inspection Items</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                4
              </div>
              <div className="mt-4 text-slate-300">
                2 have been routed for immediate follow-up.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Photos Logged", "38"],
            ["Maintenance Triggers", "6"],
            ["Violation Triggers", "3"],
            ["Vendor Follow-Ups", "4"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-3 text-4xl font-semibold text-amber-300">
                {value}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Inspection Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Active Property Condition Items
            </h3>
          </div>

          <div className="space-y-5">
            {inspectionItems.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.6fr] lg:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Area
                    </div>
                    <div className="mt-2 text-slate-200">{item.area}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Status
                    </div>
                    <div className="mt-2 text-amber-300">{item.status}</div>
                  </div>

                  <div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                      {item.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Inspection Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Condition Review Path
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {workflow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Board Visibility
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              From Walk-Through to Board Intelligence
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Routine inspections become far more valuable when observations
                are routed into the right operational queue instead of remaining
                buried in notes, emails or photos.
              </p>

              <p>
                This module allows SPM to show boards exactly what was observed,
                what requires action, what was referred to vendors and what trends
                may require future funding or policy attention.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This reinforces SPM’s proactive promise: problems are seen,
              documented and routed before they become owner complaints.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

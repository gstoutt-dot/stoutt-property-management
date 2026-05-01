import { useRouter } from "next/router";

const violations = [
  {
    id: "VIO-221",
    title: "Balcony storage item",
    unit: "Unit 712",
    source: "Inspection",
    rule: "Balcony use restriction",
    status: "Needs Accuracy Check",
    next: "Verify photo, date, and governing document reference.",
  },
  {
    id: "VIO-222",
    title: "Unauthorized door decoration",
    unit: "Unit 409",
    source: "Manager Walkthrough",
    rule: "Exterior appearance standard",
    status: "Draft Notice Review",
    next: "Confirm notice language before sending.",
  },
  {
    id: "VIO-223",
    title: "Improper trash disposal",
    unit: "Unit 1006",
    source: "Staff Report",
    rule: "Trash room policy",
    status: "Evidence Needed",
    next: "Confirm photo evidence and incident date.",
  },
];

export default function ManagerViolations() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.10),transparent_38%)]" />

      <section className="relative px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
                  Manager Violations Review
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Verify violations before notices or board escalation.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  Review reported violations, confirm evidence, check rule references,
                  and ensure accuracy before notices are sent or matters are escalated.
                </p>
              </div>

              <button
                onClick={() => router.push("/portal/manager")}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]"
              >
                Back to Manager Hub
              </button>
            </div>
          </header>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Open Violations", "12"],
              ["Needs Evidence", "3"],
              ["Draft Notices", "5"],
              ["Ready to Send", "4"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-xl"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-4xl font-semibold text-[#F3D77A]">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.55fr_0.9fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Violation Review Queue</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Demo violation items requiring manager review.
                  </p>
                </div>

                <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]">
                  Add Violation
                </button>
              </div>

              <div className="space-y-4">
                {violations.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                            Violation
                          </span>
                          <span className="text-xs text-slate-500">{item.id}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.status}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {item.unit} · Source: {item.source}
                        </p>

                        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                          <span className="text-[#F3D77A]">Rule reference:</span>{" "}
                          {item.rule}
                          <br />
                          <span className="text-[#F3D77A]">Next step:</span>{" "}
                          {item.next}
                        </p>
                      </div>

                      <div className="min-w-[240px] rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <p className="mb-3 text-sm font-semibold text-slate-300">
                          Manager Action
                        </p>

                        <div className="grid gap-2">
                          <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] transition hover:bg-[#F3D77A]">
                            Approve Notice
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Request Evidence
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Route to Board
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-red-200">
                            Dismiss / Return
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6 shadow-2xl">
                <h2 className="text-xl font-semibold text-[#F3D77A]">
                  Violation Standard
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Confirm the correct unit or owner.</p>
                  <p>2. Verify photo, date, and inspection source.</p>
                  <p>3. Match the issue to the correct rule.</p>
                  <p>4. Review notice language before sending.</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Why This Matters</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  The manager review step reduces board confusion, prevents inaccurate
                  notices, and creates a cleaner compliance record for the association.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

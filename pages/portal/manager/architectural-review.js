import { useRouter } from "next/router";

const arcRequests = [
  {
    id: "ARC-089",
    title: "Impact window replacement",
    unit: "Unit 315",
    owner: "John Smith",
    status: "Needs Manager Review",
    completeness: "Documents Missing",
    next: "Missing contractor license and insurance certificate.",
  },
  {
    id: "ARC-090",
    title: "Front door replacement",
    unit: "Unit 204",
    owner: "Maria Lopez",
    status: "Ready for Board",
    completeness: "Complete Submission",
    next: "Verify color and material match association guidelines.",
  },
  {
    id: "ARC-091",
    title: "Patio tile upgrade",
    unit: "Unit 508",
    owner: "David Chen",
    status: "Needs Clarification",
    completeness: "Partial Submission",
    next: "Confirm tile material and installation details.",
  },
];

export default function ManagerArchitecturalReview() {
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
                  Architectural Review Intake
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Clean submissions before board approval.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  Review architectural requests for completeness, compliance, and accuracy
                  before routing to the Board of Directors.
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
              ["Open Requests", "11"],
              ["Incomplete", "4"],
              ["Ready for Board", "5"],
              ["Returned to Owner", "2"],
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
                  <h2 className="text-2xl font-semibold">ARC Review Queue</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Demo architectural requests requiring manager review.
                  </p>
                </div>

                <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]">
                  Add ARC Request
                </button>
              </div>

              <div className="space-y-4">
                {arcRequests.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                            ARC
                          </span>
                          <span className="text-xs text-slate-500">{item.id}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.status}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {item.unit} · {item.owner}
                        </p>

                        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                          <span className="text-[#F3D77A]">Submission status:</span>{" "}
                          {item.completeness}
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
                            Approve to Board
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Request Info
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Add Notes
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-red-200">
                            Return to Owner
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
                  ARC Review Standard
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Confirm all required documents are submitted.</p>
                  <p>2. Verify contractor license and insurance.</p>
                  <p>3. Check compliance with association guidelines.</p>
                  <p>4. Ensure submission is board-ready.</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Why This Matters</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Clean architectural submissions reduce board delays, prevent
                  resubmissions, and maintain consistent community standards.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

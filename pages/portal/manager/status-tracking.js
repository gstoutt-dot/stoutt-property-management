import { useRouter } from "next/router";

const trackedItems = [
  {
    id: "WO-1048",
    type: "Work Order",
    title: "Pool light reported out",
    currentStatus: "Manager Review",
    timeline: ["Ava Intake", "Manager Review", "Vendor Assignment", "Completion"],
    next: "Assign vendor after responsibility is confirmed.",
  },
  {
    id: "ARC-089",
    type: "Architectural Review",
    title: "Impact window replacement",
    currentStatus: "Missing Documents",
    timeline: ["Owner Submitted", "Manager Review", "Board Review", "Decision"],
    next: "Request contractor license and insurance certificate.",
  },
  {
    id: "INV-332",
    type: "Vendor Invoice",
    title: "Landscape monthly invoice",
    currentStatus: "Verification",
    timeline: ["Vendor Submitted", "Manager Verification", "Board Approval", "Payment"],
    next: "Confirm service completion before routing to board.",
  },
];

export default function ManagerStatusTracking() {
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
                  Manager Status Tracking
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Track every item from intake to completion.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  See where each work order, violation, architectural request, invoice,
                  amenity request, or miscellaneous item stands inside the BOS workflow.
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
              ["Active Items", "42"],
              ["Manager Review", "14"],
              ["Board Review", "9"],
              ["Completed This Week", "21"],
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

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Tracked BOS Items</h2>
              <p className="mt-2 text-sm text-slate-400">
                Demo status records showing the movement of requests through the system.
              </p>
            </div>

            <div className="space-y-4">
              {trackedItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                >
                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-500">{item.id}</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                          {item.currentStatus}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>

                      <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                        <span className="text-[#F3D77A]">Next step:</span> {item.next}
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-4">
                        {item.timeline.map((step) => (
                          <div
                            key={step}
                            className={`rounded-2xl border p-4 text-sm ${
                              step === item.currentStatus
                                ? "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#F3D77A]"
                                : "border-white/10 bg-white/[0.035] text-slate-300"
                            }`}
                          >
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="mb-3 text-sm font-semibold text-slate-300">
                        Status Action
                      </p>

                      <div className="grid gap-2">
                        <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]">
                          Advance Status
                        </button>
                        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                          Add Update
                        </button>
                        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                          Notify Owner
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

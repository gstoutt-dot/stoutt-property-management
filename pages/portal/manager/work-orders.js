import { useRouter } from "next/router";

const workOrders = [
  {
    id: "WO-1048",
    title: "Pool light reported out",
    location: "Pool Area",
    source: "Ava Voice Intake",
    priority: "High",
    status: "Needs Manager Review",
    next: "Verify association responsibility and assign vendor.",
  },
  {
    id: "WO-1049",
    title: "Garage gate slow to close",
    location: "North Garage Entry",
    source: "Owner Portal",
    priority: "Medium",
    status: "Needs Inspection",
    next: "Confirm if repair or vendor service call is needed.",
  },
  {
    id: "WO-1050",
    title: "Lobby AC temperature complaint",
    location: "Main Lobby",
    source: "Front Desk",
    priority: "Normal",
    status: "Vendor Quote Needed",
    next: "Request HVAC inspection and quote.",
  },
];

export default function ManagerWorkOrders() {
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
                  Manager Work Orders
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Maintenance intake before vendor or board action.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  Review incoming maintenance issues, confirm responsibility, request inspections,
                  assign vendors, or route approval items to the board.
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
              ["Open Work Orders", "14"],
              ["Needs Inspection", "5"],
              ["Vendor Assigned", "6"],
              ["Ready for Board", "3"],
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
                  <h2 className="text-2xl font-semibold">Work Order Review Queue</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Demo maintenance items waiting for manager action.
                  </p>
                </div>

                <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]">
                  Add Work Order
                </button>
              </div>

              <div className="space-y-4">
                {workOrders.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                            Work Order
                          </span>
                          <span className="text-xs text-slate-500">{item.id}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.priority}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.status}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {item.location} · Source: {item.source}
                        </p>

                        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                          <span className="text-[#F3D77A]">Next step:</span> {item.next}
                        </p>
                      </div>

                      <div className="min-w-[240px] rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <p className="mb-3 text-sm font-semibold text-slate-300">
                          Manager Action
                        </p>

                        <div className="grid gap-2">
                          <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] transition hover:bg-[#F3D77A]">
                            Assign Vendor
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Request Inspection
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Route to Board
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-red-200">
                            Close / Reject
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
                  Ava Work Order Flow
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Owner calls Ava</p>
                  <p>2. Ava records issue and location</p>
                  <p>3. Manager verifies responsibility</p>
                  <p>4. Vendor or board action is triggered</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Review Checklist</h2>
                <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
                  <p>Confirm location and urgency.</p>
                  <p>Determine association vs. owner responsibility.</p>
                  <p>Attach photos, notes, and call transcript if available.</p>
                  <p>Route vendor estimate or board approval when needed.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

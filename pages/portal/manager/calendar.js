import { useRouter } from "next/router";

const events = [
  {
    id: "CAL-101",
    title: "Pool Light Vendor Visit",
    type: "Vendor Appointment",
    date: "May 6, 2026",
    time: "10:00 AM",
    related: "WO-1048",
    status: "Scheduled",
  },
  {
    id: "CAL-102",
    title: "Balcony Violation Inspection",
    type: "Inspection",
    date: "May 7, 2026",
    time: "2:30 PM",
    related: "VIO-221",
    status: "Needs Confirmation",
  },
  {
    id: "CAL-103",
    title: "Clubhouse Reservation",
    type: "Amenity",
    date: "May 18, 2026",
    time: "6:00 PM",
    related: "AMN-017",
    status: "Pending Approval",
  },
];

export default function ManagerCalendar() {
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
                  Manager Calendar
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Schedule inspections, vendors, amenities, and board-ready actions.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  View all time-sensitive manager items connected to work orders,
                  violations, amenity reservations, inspections, and vendor activity.
                </p>
              </div>

              <button
                onClick={() => router.push("/portal/manager/dashboard")}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]"
              >
                Manager Dashboard
              </button>
            </div>
          </header>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Today", "5"],
              ["This Week", "18"],
              ["Vendor Visits", "7"],
              ["Inspections", "6"],
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
                  <h2 className="text-2xl font-semibold">Upcoming Schedule</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Demo calendar items tied directly to BOS records.
                  </p>
                </div>

                <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]">
                  Add Calendar Item
                </button>
              </div>

              <div className="space-y-4">
                {events.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                            {item.type}
                          </span>
                          <span className="text-xs text-slate-500">{item.id}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.status}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {item.date} · {item.time} · Related: {item.related}
                        </p>
                      </div>

                      <div className="min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <p className="mb-3 text-sm font-semibold text-slate-300">
                          Calendar Action
                        </p>

                        <div className="grid gap-2">
                          <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]">
                            Confirm
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Reschedule
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:border-red-400/40 hover:text-red-200">
                            Cancel
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
                  Calendar Standard
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Every appointment is tied to a BOS item.</p>
                  <p>2. Vendors and inspections stay visible.</p>
                  <p>3. Amenity reservations are not lost in emails.</p>
                  <p>4. The board can see verified scheduled activity.</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl">
                <h2 className="text-xl font-semibold">Presentation Point</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  BOS turns the manager calendar into an operational control board,
                  not just a date list.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

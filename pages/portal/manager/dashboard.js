import { useRouter } from "next/router";
import Link from "next/link";

export default function ManagerDashboard() {
  const router = useRouter();

  const modules = [
    ["Work Orders", "/portal/manager/work-orders"],
    ["Violations", "/portal/manager/violations"],
    ["Architectural Review", "/portal/manager/architectural-review"],
    ["Vendor Invoices", "/portal/manager/vendor-invoices"],
    ["Amenity Requests", "/portal/manager/amenity-requests"],
    ["Misc Requests", "/portal/manager/misc-requests"],
    ["Inspections", "/portal/manager/inspections"],
    ["Documents", "/portal/manager/documents"],
    ["Messages", "/portal/manager/messages"],
    ["Status Tracking", "/portal/manager/status-tracking"],
    ["Notifications", "/portal/manager/notifications"],
    ["Board Ready", "/portal/manager/board-ready"],
  ];

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.10),transparent_38%)]" />

      <section className="relative px-6 py-8">
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <header className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
                  Property Manager Command Dashboard
                </div>

                <h1 className="text-3xl font-semibold sm:text-5xl">
                  Central control for all community operations.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  This is the operational layer of BOS. Every request, violation,
                  invoice, and communication flows through here before reaching
                  the board.
                </p>
              </div>

              <button
                onClick={() => router.push("/portal/board")}
                className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]"
              >
                View Board Portal
              </button>
            </div>
          </header>

  <section className="mb-8 rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/[0.06] p-6 shadow-2xl">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <div className="mb-3 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
        Live Operations
      </div>

      <h2 className="text-3xl font-semibold">
        Manager Command Center
      </h2>

      <p className="mt-3 max-w-3xl text-slate-300">
        Access the live operational intake queue, vendor dispatch system,
        BOS workflows, board review routing, and real-time management
        activity center.
      </p>
    </div>

    <div className="flex flex-wrap gap-3">
      <Link
        href="/portal/manager"
        className="rounded-2xl bg-[#D4AF37] px-6 py-4 text-sm font-semibold text-[#070B14] transition hover:bg-[#F3D77A]"
      >
        Open Command Center
      </Link>

      <Link
        href="/portal/manager/vendor-dispatch"
        className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
      >
        Vendor Dispatch
      </Link>

      <Link
        href="/portal/manager/action-center"
        className="rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08]"
      >
        Action Center
      </Link>
    </div>
  </div>
</section>

          {/* STATS */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Total Active Items", "78"],
              ["Needs Review", "22"],
              ["Ready for Board", "11"],
              ["Completed Today", "17"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-4xl font-semibold text-[#F3D77A]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* MODULE GRID */}
          <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold">Manager Modules</h2>
            <p className="mt-2 text-sm text-slate-400">
              Navigate all BOS intake and review systems.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map(([name, path]) => (
                <button
                  key={name}
                  onClick={() => router.push(path)}
                  className="group rounded-2xl border border-white/10 bg-[#0B1220] p-5 text-left transition hover:border-[#D4AF37]/40"
                >
                  <p className="text-lg font-semibold">{name}</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Open module
                  </p>

                  <div className="mt-4 text-sm text-[#D4AF37] opacity-0 transition group-hover:opacity-100">
                    Open →
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* BOS EXPLANATION */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6">
              <h2 className="text-xl font-semibold text-[#F3D77A]">
                BOS Manager Layer
              </h2>
              <p className="mt-4 text-sm text-slate-200">
                This is where raw requests are transformed into clean,
                decision-ready items. The manager verifies, organizes,
                and controls everything before it reaches the board.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6">
              <h2 className="text-xl font-semibold">
                Presentation Statement
              </h2>
              <p className="mt-4 text-sm text-slate-400">
                “We don’t just manage properties — we operate them through
                a system. Your manager becomes the control center, not
                a middleman.”
              </p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

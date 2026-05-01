import { useRouter } from "next/router";

const intakeItems = [
  {
    id: "WO-1048",
    type: "Work Order",
    title: "Pool light reported out",
    source: "Ava Voice Intake",
    status: "Needs Manager Review",
    priority: "High",
    owner: "Unit 204",
    next: "Verify association responsibility",
  },
  {
    id: "VIO-221",
    type: "Violation",
    title: "Balcony storage item reported",
    source: "Inspection",
    status: "Pending Accuracy Check",
    priority: "Medium",
    owner: "Unit 712",
    next: "Confirm photo and rule reference",
  },
  {
    id: "ARC-089",
    type: "Architectural Review",
    title: "Impact window replacement request",
    source: "Owner Portal",
    status: "Ready for Review",
    priority: "Normal",
    owner: "Unit 315",
    next: "Check documents before board routing",
  },
  {
    id: "INV-332",
    type: "Vendor Invoice",
    title: "Landscape monthly service invoice",
    source: "Vendor Upload",
    status: "Manager Approval Needed",
    priority: "Normal",
    owner: "Common Area",
    next: "Verify service completion",
  },
  {
    id: "AMN-017",
    type: "Amenity Request",
    title: "Clubhouse reservation request",
    source: "Owner Portal",
    status: "Needs Review",
    priority: "Low",
    owner: "Unit 1102",
    next: "Confirm date availability",
  },
];

export default function ManagerPortalDashboard() {
  const router = useRouter();

  const stats = [
    ["New Intake", "18"],
    ["Needs Inspection", "6"],
    ["Ready for Board", "9"],
    ["Vendor Payment Review", "4"],
  ];

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.10),transparent_38%)]" />

      <section className="relative px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 flex flex-col justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl lg:flex-row lg:items-center">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
                Property Manager Intake Hub
              </div>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Review. Verify. Route.
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Initial violations, work orders, architectural requests, vendor invoices,
                amenity requests, and miscellaneous items come here first before they are
                forwarded to the Board of Directors.
              </p>
            </div>

            <button
              onClick={() => router.push("/login")}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]"
            >
              Back to Login
            </button>
          </header>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([label, value]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-xl"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-4xl font-semibold text-[#F3D77A]">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Manager Review Queue</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Demo intake items ready to be inspected, approved, rejected, or routed.
                  </p>
                </div>

                <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]">
                  Add Manual Item
                </button>
              </div>

              <div className="space-y-4">
                {intakeItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                            {item.type}
                          </span>
                          <span className="text-xs text-slate-500">{item.id}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.priority}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {item.owner} · Source: {item.source}
                        </p>

                        <p className="mt-3 text-sm text-slate-300">
                          Next step: <span className="text-[#F3D77A]">{item.next}</span>
                        </p>
                      </div>

                      <div className="min-w-[220px]">
                        <p className="mb-3 text-sm text-slate-400">{item.status}</p>

                        <div className="grid gap-2">
                          <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] transition hover:bg-[#F3D77A]">
                            Approve to Board
                          </button>

                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Request Inspection
                          </button>

                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-red-200">
                            Return / Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Routing Rules</h2>

                <div className="mt-5 space-y-4 text-sm text-slate-300">
                  <p>
                    <span className="text-[#F3D77A]">Work Orders:</span> Manager verifies
                    photos, responsibility, urgency, and vendor need.
                  </p>
                  <p>
                    <span className="text-[#F3D77A]">Violations:</span> Manager confirms
                    rule reference, evidence, dates, and notice accuracy.
                  </p>
                  <p>
                    <span className="text-[#F3D77A]">ARC Requests:</span> Manager checks
                    completeness before board review.
                  </p>
                  <p>
                    <span className="text-[#F3D77A]">Invoices:</span> Manager verifies
                    work completion before payment approval.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6 shadow-2xl">
                <h2 className="text-xl font-semibold text-[#F3D77A]">Ava Intake Status</h2>
                <p className="mt-4 text-sm leading-6 text-slate-200">
                  Ava-submitted requests will appear here first. Once the manager approves
                  the item, it can move to the Board dashboard as a clean approval item.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Next Build Step</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Connect this queue to Supabase so Ava, owner portal forms, vendor invoices,
                  and manager-created items all feed into one intake table.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

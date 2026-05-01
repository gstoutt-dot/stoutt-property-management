import { useRouter } from "next/router";

const queueItems = [
  {
    id: "WO-1048",
    category: "Work Order",
    title: "Pool light reported out",
    unit: "Common Area / Pool",
    source: "Ava Voice Intake",
    stage: "Needs Review",
    priority: "High",
    managerNote: "Confirm association responsibility and vendor availability.",
  },
  {
    id: "VIO-221",
    category: "Violation",
    title: "Balcony storage item",
    unit: "Unit 712",
    source: "Inspection",
    stage: "Needs Accuracy Check",
    priority: "Medium",
    managerNote: "Verify photo, date, and rule reference before notice.",
  },
  {
    id: "ARC-089",
    category: "Architectural Review",
    title: "Impact window replacement request",
    unit: "Unit 315",
    source: "Owner Portal",
    stage: "Ready for Board",
    priority: "Normal",
    managerNote: "Application appears complete. Route to board packet.",
  },
  {
    id: "INV-332",
    category: "Vendor Invoice",
    title: "Landscape monthly service invoice",
    unit: "Common Area",
    source: "Vendor Upload",
    stage: "Payment Review",
    priority: "Normal",
    managerNote: "Confirm monthly service was completed before approval.",
  },
  {
    id: "AMN-017",
    category: "Amenity Request",
    title: "Clubhouse reservation request",
    unit: "Unit 1102",
    source: "Owner Portal",
    stage: "Needs Review",
    priority: "Low",
    managerNote: "Check calendar availability and deposit requirement.",
  },
];

const stageCards = [
  ["Needs Review", "7", "New items awaiting manager decision"],
  ["Needs Inspection", "4", "Items requiring site verification"],
  ["Ready for Board", "9", "Clean items ready for board approval"],
  ["Returned / Rejected", "2", "Items sent back for more information"],
];

export default function ManagerApprovalQueue() {
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
                  Manager Approval Queue
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Clean the request before it reaches the board.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  This queue organizes incoming violations, work orders, ARC forms,
                  vendor invoices, amenity requests, and miscellaneous items before they
                  are forwarded for board approval or vendor payment.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/portal/manager")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]"
                >
                  Manager Hub
                </button>

                <button
                  onClick={() => router.push("/portal/board")}
                  className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]"
                >
                  View Board Portal
                </button>
              </div>
            </div>
          </header>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stageCards.map(([label, value, caption]) => (
              <div
                key={label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-xl"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-4xl font-semibold text-[#F3D77A]">{value}</p>
                <p className="mt-2 text-sm text-slate-500">{caption}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Pending Manager Decisions</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Demo queue showing how items are approved, inspected, returned, or routed.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 px-4 py-3 text-sm text-[#F3D77A]">
                  Demo data active
                </div>
              </div>

              <div className="space-y-4">
                {queueItems.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                            {item.category}
                          </span>

                          <span className="text-xs text-slate-500">{item.id}</span>

                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.priority}
                          </span>

                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.stage}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {item.unit} · Source: {item.source}
                        </p>

                        <p className="mt-4 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                          <span className="text-[#F3D77A]">Manager note:</span>{" "}
                          {item.managerNote}
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
                            Mark for Inspection
                          </button>

                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Add Manager Note
                          </button>

                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-red-200">
                            Return / Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Board-Ready Standard</h2>

                <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
                  <p>
                    <span className="text-[#F3D77A]">Verified:</span> The item has enough
                    detail, photos, owner/unit information, and correct category.
                  </p>
                  <p>
                    <span className="text-[#F3D77A]">Reviewed:</span> Manager confirms the
                    request is valid and within association responsibility.
                  </p>
                  <p>
                    <span className="text-[#F3D77A]">Routed:</span> Only clean approval
                    items move to the board dashboard.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6 shadow-2xl">
                <h2 className="text-xl font-semibold text-[#F3D77A]">
                  BOS Workflow
                </h2>

                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Ava / Owner / Vendor submits item</p>
                  <p>2. Manager verifies and categorizes</p>
                  <p>3. Manager approves, rejects, or inspects</p>
                  <p>4. Board receives clean approval items</p>
                  <p>5. Vendor payment or action is finalized</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Presentation Talking Point</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  The board does not get flooded with raw requests. The Property Manager
                  acts as the quality-control layer, so the board sees organized, verified,
                  decision-ready items.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useRouter } from "next/router";

const boardReadyItems = [
  {
    id: "ARC-090",
    type: "Architectural Review",
    title: "Front door replacement",
    unit: "Unit 204",
    status: "Ready for Board",
    summary: "Complete submission with matching design guidelines.",
  },
  {
    id: "INV-333",
    type: "Vendor Invoice",
    title: "Pool light repair invoice",
    unit: "Common Area",
    status: "Ready for Payment Approval",
    summary: "Work completed and verified by manager.",
  },
  {
    id: "WO-1050",
    type: "Work Order",
    title: "Lobby AC repair proposal",
    unit: "Main Lobby",
    status: "Board Decision Needed",
    summary: "Vendor quote received, awaiting approval.",
  },
];

export default function ManagerBoardReady() {
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
                  Board-Ready Items
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Only clean, decision-ready items reach the board.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  These items have been reviewed, verified, and prepared by the
                  Property Manager. The Board of Directors sees only what requires
                  decision-making — not raw requests.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push("/portal/manager")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]"
                >
                  Manager Hub
                </button>

                <button
                  onClick={() => router.push("/portal/board")}
                  className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]"
                >
                  View Board Portal
                </button>
              </div>
            </div>
          </header>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Board-Ready Items", "9"],
              ["Pending Approval", "5"],
              ["Financial Decisions", "3"],
              ["ARC Decisions", "4"],
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
              <h2 className="text-2xl font-semibold">Decision Queue</h2>
              <p className="mt-2 text-sm text-slate-400">
                These items will appear in the Board Dashboard.
              </p>
            </div>

            <div className="space-y-4">
              {boardReadyItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                >
                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
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
                        {item.unit}
                      </p>

                      <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
                        <span className="text-[#F3D77A]">Summary:</span>{" "}
                        {item.summary}
                      </p>
                    </div>

                    <div className="min-w-[240px] rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="mb-3 text-sm font-semibold text-slate-300">
                        Final Manager Action
                      </p>

                      <div className="grid gap-2">
                        <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]">
                          Send to Board
                        </button>

                        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                          Add Notes
                        </button>

                        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-red-400/40 hover:text-red-200">
                          Return to Queue
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6 shadow-2xl">
              <h2 className="text-xl font-semibold text-[#F3D77A]">
                BOS Separation Advantage
              </h2>
              <p className="mt-4 text-sm text-slate-200">
                The board does not deal with raw requests, incomplete submissions,
                or unverified issues. Everything is filtered and prepared by the
                manager first.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl">
              <h2 className="text-xl font-semibold">
                Presentation Power Statement
              </h2>
              <p className="mt-4 text-sm text-slate-400">
                “Your board will never be buried in emails or confusion again.
                You only see what requires a decision — nothing else.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

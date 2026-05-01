import { useRouter } from "next/router";

const threads = [
  {
    id: "MSG-501",
    subject: "Pool light repair follow-up",
    participants: "Manager, Vendor",
    related: "WO-1048",
    lastMessage: "Vendor confirmed availability tomorrow morning.",
    status: "Active",
  },
  {
    id: "MSG-502",
    subject: "Balcony violation clarification",
    participants: "Manager, Owner (Unit 712)",
    related: "VIO-221",
    lastMessage: "Owner requested extension to correct issue.",
    status: "Pending Response",
  },
  {
    id: "MSG-503",
    subject: "Landscape invoice documentation",
    participants: "Manager, Vendor",
    related: "INV-332",
    lastMessage: "Awaiting service report upload.",
    status: "Needs Follow-Up",
  },
];

export default function ManagerMessages() {
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
                  Manager Communications
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Keep every request documented and trackable.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  Centralized communication with owners, vendors, and board members tied
                  directly to each request. No lost emails, no disconnected conversations.
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
              ["Active Threads", "18"],
              ["Pending Responses", "7"],
              ["Vendor Follow-Ups", "5"],
              ["Closed Today", "9"],
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
                  <h2 className="text-2xl font-semibold">Message Threads</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Conversations tied directly to BOS requests.
                  </p>
                </div>

                <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]">
                  New Message
                </button>
              </div>

              <div className="space-y-4">
                {threads.map((thread) => (
                  <article
                    key={thread.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                          Message Thread
                        </span>
                        <span className="text-xs text-slate-500">{thread.id}</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                          {thread.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold">{thread.subject}</h3>

                      <p className="text-sm text-slate-400">
                        Participants: {thread.participants}
                      </p>

                      <p className="text-sm text-slate-400">
                        Related to: {thread.related}
                      </p>

                      <p className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-slate-300">
                        <span className="text-[#F3D77A]">Last message:</span>{" "}
                        {thread.lastMessage}
                      </p>

                      <div className="flex gap-2">
                        <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]">
                          Open Thread
                        </button>
                        <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                          Reply
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6 shadow-2xl">
                <h2 className="text-xl font-semibold text-[#F3D77A]">
                  BOS Communication Standard
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Every message is tied to a request.</p>
                  <p>2. No communication is lost or disconnected.</p>
                  <p>3. Full history is visible to management and board.</p>
                  <p>4. Creates a permanent operational record.</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Presentation Point</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Instead of emails, texts, and calls scattered everywhere,
                  BOS keeps all communication tied directly to the issue — creating
                  clarity, accountability, and transparency.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

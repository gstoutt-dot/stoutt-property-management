import { useRouter } from "next/router";

const notifications = [
  {
    id: "NTF-701",
    audience: "Owner",
    subject: "Work order received",
    related: "WO-1048",
    channel: "Email / Text",
    status: "Ready to Send",
    message: "Your pool light work order has been received and is under manager review.",
  },
  {
    id: "NTF-702",
    audience: "Board",
    subject: "ARC request ready for approval",
    related: "ARC-090",
    channel: "Board Portal",
    status: "Pending Manager Release",
    message: "A complete architectural request is ready to be forwarded for board review.",
  },
  {
    id: "NTF-703",
    audience: "Vendor",
    subject: "Invoice documentation needed",
    related: "INV-334",
    channel: "Email",
    status: "Needs Follow-Up",
    message: "Please upload the service report before this invoice can be routed for approval.",
  },
];

export default function ManagerNotifications() {
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
                  Manager Notifications
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Keep owners, boards, and vendors updated automatically.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  Review and send status updates tied to work orders, violations,
                  architectural requests, invoices, amenities, and miscellaneous items.
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
              ["Ready to Send", "11"],
              ["Owner Updates", "7"],
              ["Board Alerts", "5"],
              ["Vendor Follow-Ups", "4"],
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
                  <h2 className="text-2xl font-semibold">Notification Queue</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Demo updates waiting for manager review or release.
                  </p>
                </div>

                <button className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]">
                  Create Notice
                </button>
              </div>

              <div className="space-y-4">
                {notifications.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                            {item.audience}
                          </span>
                          <span className="text-xs text-slate-500">{item.id}</span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {item.status}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">{item.subject}</h3>

                        <p className="mt-2 text-sm text-slate-400">
                          Related: {item.related} · Channel: {item.channel}
                        </p>

                        <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                          <span className="text-[#F3D77A]">Message:</span>{" "}
                          {item.message}
                        </p>
                      </div>

                      <div className="min-w-[240px] rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                        <p className="mb-3 text-sm font-semibold text-slate-300">
                          Notification Action
                        </p>

                        <div className="grid gap-2">
                          <button className="rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#070B14] hover:bg-[#F3D77A]">
                            Send Now
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Edit Message
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]">
                            Schedule
                          </button>
                          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:border-red-400/40 hover:text-red-200">
                            Hold
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
                  Notification Standard
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Updates are tied to a specific BOS item.</p>
                  <p>2. Owners receive clear status information.</p>
                  <p>3. Boards receive only decision-ready alerts.</p>
                  <p>4. Vendors receive action-specific follow-ups.</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Presentation Point</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  BOS turns communication from reactive emails and phone calls into
                  structured, trackable updates that keep everyone informed.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

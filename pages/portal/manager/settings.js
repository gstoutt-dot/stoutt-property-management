import { useRouter } from "next/router";

const settings = [
  {
    title: "Request Routing Rules",
    description: "Control which items stay with the manager and which items move to the board.",
    status: "Demo Active",
  },
  {
    title: "Approval Thresholds",
    description: "Set dollar limits for invoices, repairs, and vendor approvals.",
    status: "Coming Soon",
  },
  {
    title: "Notification Preferences",
    description: "Choose when owners, vendors, managers, and board members receive updates.",
    status: "Demo Active",
  },
  {
    title: "Ava Intake Rules",
    description: "Define how Ava categorizes work orders, violations, ARC requests, and misc. items.",
    status: "Demo Active",
  },
];

export default function ManagerSettings() {
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
                  Manager Portal Settings
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Configure how BOS routes work.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  Manage routing rules, approval thresholds, notification preferences,
                  and Ava intake behavior for the Property Manager review layer.
                </p>
              </div>

              <button
                onClick={() => router.push("/portal/manager")}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-[#D4AF37]/40 hover:text-[#F3D77A]"
              >
                Back to Manager Hub
              </button>
            </div>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="text-2xl font-semibold">Configuration Areas</h2>
              <p className="mt-2 text-sm text-slate-400">
                Demo settings for how the manager portal controls requests and approvals.
              </p>

              <div className="mt-6 space-y-4">
                {settings.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[1.5rem] border border-white/10 bg-[#0B1220]/80 p-5"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      </div>

                      <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
                        {item.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6 shadow-2xl">
                <h2 className="text-xl font-semibold text-[#F3D77A]">
                  Manager Control Layer
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-200">
                  <p>1. Ava and owners submit requests.</p>
                  <p>2. Manager portal controls first review.</p>
                  <p>3. Rules determine what moves forward.</p>
                  <p>4. Board only receives clean approval items.</p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold">Future Connection</h2>
                <p className="mt-4 text-sm leading-6 text-slate-400">
                  Later, this page can control real routing rules in Supabase,
                  notification triggers, QuickBooks thresholds, and Ava category handling.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

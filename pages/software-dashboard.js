import Link from "next/link";

const hubs = [
  { title: "Master Portal Hub", href: "/portal", type: "Hub", status: "Live" },
  { title: "Owner Hub", href: "/portal/owner-hub", type: "Hub", status: "Live" },
  { title: "Manager Hub", href: "/portal/manager-hub", type: "Hub", status: "Live" },
  { title: "Board Hub", href: "/board", type: "Hub", status: "Live" },
  {
    title: "Workflow Architecture Map",
    href: "/portal/workflow-engine",
    type: "System Map",
    status: "Live",
  },
  {
    title: "Workflow Live Monitor",
    href: "/portal/workflow-engine-live",
    type: "Live Monitor",
    status: "Live",
  },
];

const engines = [
  { title: "Owner Portal", href: "/portal/owner", role: "Owner intake + request visibility" },
  { title: "Manager Command Center", href: "/portal/manager", role: "Main operational engine" },
  { title: "Board Command Center", href: "/board/command-center", role: "Board intelligence" },
  { title: "Board Action Center", href: "/board/action-center", role: "Board decisions" },
];

export default function SoftwareDashboard() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            Stoutt Property Management Software
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Software Dashboard
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            One-page control map for all live hubs, engines, and BOS workflow
            reference pages.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Metric label="Hub Pages" value={hubs.length} />
          <Metric label="Core Engines" value={engines.length} />
          <Metric label="Workflow Status" value="Closed" highlight />
          <Metric label="Use Case" value="Project Map" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <div className="mb-5">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Navigation Hubs
              </div>
              <h2 className="mt-2 text-3xl font-bold">Daily Management Links</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {hubs.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-amber-400/40 hover:bg-amber-400/10">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                        {item.status}
                      </span>
                      <span className="text-xs uppercase tracking-wide text-slate-500">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <div className="mt-3 font-mono text-sm text-amber-300">
                      {item.href}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <div className="mb-5">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Core Engines
              </div>
              <h2 className="mt-2 text-3xl font-bold">Where Work Happens</h2>
            </div>

            <div className="space-y-4">
              {engines.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className="cursor-pointer rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-amber-400/40 hover:bg-amber-400/10">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-400">{item.role}</p>
                    <div className="mt-3 font-mono text-sm text-amber-300">
                      {item.href}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-7">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Working BOS Flow
          </div>

          <h2 className="mt-2 text-3xl font-bold">
            Owner → Manager → Board → Manager → Vendor → Owner
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-6">
            {[
              "Owner Intake",
              "Manager Review",
              "Board Decision",
              "Manager Execution",
              "Vendor Dispatch",
              "Owner Visibility",
            ].map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-slate-950">
                  {index + 1}
                </div>
                <div className="text-sm font-medium text-slate-200">{step}</div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value, highlight }) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        highlight
          ? "border-amber-400/40 bg-amber-400/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="text-sm text-slate-400">{label}</div>
      <div
        className={`mt-2 text-2xl font-black ${
          highlight ? "text-amber-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

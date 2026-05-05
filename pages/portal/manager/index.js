import Link from "next/link";

const managerPages = [
  {
    title: "Manager Command Center",
    status: "Live / Ready",
    href: "/portal/manager",
    description:
      "High-level operational dashboard showing intake, board routing, approvals, and vendor readiness.",
    role: "System overview and live operational awareness.",
  },
  {
    title: "Action Center",
    status: "Live / Ready",
    href: "/portal/manager/action-center",
    description:
      "Primary workflow processing area for reviewing, routing, approving, and managing requests.",
    role: "Main decision engine for management.",
  },
  {
    title: "Vendor Dispatch",
    status: "Live / Ready",
    href: "/portal/manager/vendor-dispatch",
    description:
      "Assign vendors, dispatch work orders, and track completion execution.",
    role: "Execution layer after approval.",
  },
  {
    title: "Workflow Engine",
    status: "Built / Needs Review",
    href: "/portal/manager/workflow-engine",
    description:
      "Underlying workflow routing logic and BOS automation layer.",
    role: "System automation and routing rules.",
  },
  {
    title: "Performance Dashboard",
    status: "Built / Needs Review",
    href: "/portal/manager/performance-dashboard",
    description:
      "Metrics, performance tracking, and operational insights.",
    role: "Operational analytics.",
  },
];

function statusStyle(status) {
  if (status === "Live / Ready") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Built / Needs Review") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

export default function ManagerModuleHub() {
  const liveCount = managerPages.filter((p) => p.status === "Live / Ready").length;
  const reviewCount = managerPages.filter(
    (p) => p.status === "Built / Needs Review"
  ).length;

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      {/* HEADER */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            Manager Portal Module
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Manager Hub
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
            Central directory for management operations. Separates live workflow
            tools from supporting systems and future automation layers.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/portal/manager"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg hover:bg-amber-300"
            >
              Command Center
            </Link>

            <Link
              href="/portal/manager/action-center"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-3 font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Action Center
            </Link>

            <Link
              href="/portal"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 hover:bg-white/10"
            >
              Portal Hub
            </Link>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Metric label="Manager Pages" value={managerPages.length} />
          <Metric label="Live / Ready" value={liveCount} highlight />
          <Metric label="Needs Review" value={reviewCount} />
          <Metric label="Workflow Role" value="Control" />
        </div>

        {/* GRID */}
        <div className="grid gap-6 lg:grid-cols-2">
          {managerPages.map((page) => (
            <div
              key={page.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <div
                    className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(
                      page.status
                    )}`}
                  >
                    {page.status}
                  </div>

                  <h2 className="text-3xl font-bold">{page.title}</h2>
                </div>

                <Link
                  href={page.href}
                  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 hover:bg-amber-400/20"
                >
                  Open
                </Link>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {page.description}
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">
                  Workflow Role
                </div>
                <div className="mt-2 text-sm text-slate-300">
                  {page.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RULE */}
        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Manager Module Rule
          </div>

          <h2 className="text-3xl font-bold">Source of Truth</h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
            The Manager Command Center, Action Center, and Vendor Dispatch are
            the active operational workflow. All other pages should be reviewed
            before being used in production or integrated into the BOS system.
          </p>
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
          ? "border-emerald-400/40 bg-emerald-400/10"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >
      <div className="text-sm text-slate-400">{label}</div>
      <div
        className={`mt-2 text-2xl font-black ${
          highlight ? "text-emerald-300" : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

import Link from "next/link";

export default function BoardDashboard() {
  const modules = [
    {
      title: "Board Financials",
      href: "#",
      stat: "$148K",
      label: "Operating funds",
      description: "Review financial reports, budgets, reserves, and payables.",
    },
    {
      title: "Violations Review",
      href: "#",
      stat: "12",
      label: "Pending matters",
      description: "Review compliance matters and hearing decisions.",
    },
    {
      title: "Architectural Approvals",
      href: "#",
      stat: "5",
      label: "Pending approvals",
      description: "Review ARC requests awaiting board action.",
    },
    {
      title: "Work Order Oversight",
      href: "#",
      stat: "7",
      label: "Open tickets",
      description: "Monitor maintenance requests and vendor progress.",
    },
    {
      title: "Board Documents",
      href: "#",
      stat: "32",
      label: "Available records",
      description: "Minutes, agendas, contracts, insurance, and reports.",
    },
    {
      title: "Ava Board Assistant",
      href: "#",
      stat: "AI",
      label: "Assistant online",
      description: "Ask Ava for analysis, governing references, and summaries.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]"/>

        <div className="relative mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Board Member Portal
              </p>

              <h1 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
                Board Dashboard
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Access oversight tools, approvals, reports, documents,
                compliance review, and Ava board assistance.
              </p>
            </div>

            <Link
              href="/"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Exit Portal
            </Link>

          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-8">

        <div className="grid gap-6 md:grid-cols-4">

          {[
            ["Open Work Orders","7"],
            ["Pending Violations","12"],
            ["ARC Decisions","5"],
            ["Ava Status","Online"],
          ].map(([label,value]) => (

            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">
                {label}
              </p>

              <div className="mt-3 text-3xl font-bold text-yellow-400">
                {value}
              </div>

            </div>

          ))}

        </div>

      </section>


      <section className="mx-auto max-w-7xl px-6 pb-12">

        <div className="mb-6">
          <p className="text-sm font-medium text-yellow-400">
            Board Modules
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            Oversight & Decision Tools
          </h2>
        </div>


        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {modules.map((module)=>(

            <Link
              key={module.title}
              href={module.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:border-yellow-400/40 hover:bg-white/[0.07]"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <p className="text-sm text-slate-400">
                    {module.label}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {module.title}
                  </h3>
                </div>

                <div className="rounded-2xl bg-yellow-400/10 px-4 py-2 text-lg font-bold text-yellow-300">
                  {module.stat}
                </div>

              </div>

              <p className="mt-5 text-sm leading-6 text-slate-300">
                {module.description}
              </p>

              <div className="mt-6 text-sm font-semibold text-yellow-300">
                Open Module →
              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}

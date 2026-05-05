import Link from "next/link";

const modules = [
  {
    title: "Owner Portal",
    status: "Live / Ready",
    badge: "✅",
    href: "/portal/owner",
    description:
      "Owner intake, request submission, preloaded profile data, and live status tracking.",
    role: "Creates requests and gives owners visibility.",
    links: [
      { label: "Open Owner Portal", href: "/portal/owner" },
    ],
  },
  {
    title: "Manager Portal",
    status: "Live / Ready",
    badge: "✅",
    href: "/portal/manager",
    description:
      "Manager command layer for reviewing requests, routing items, vendor dispatch, and workflow control.",
    role: "Operational control tower between owners, board, vendors, and completion.",
    links: [
      { label: "Open Manager Portal", href: "/portal/manager" },
      { label: "Manager Action Center", href: "/portal/manager/action-center" },
      { label: "Vendor Dispatch", href: "/portal/manager/vendor-dispatch" },
    ],
  },
  {
    title: "Board Portal",
    status: "Live / Ready",
    badge: "✅",
    href: "/board",
    description:
      "Board intelligence and decision layer for items escalated by management.",
    role: "Reviews board-level matters and sends decisions back into the BOS workflow.",
    links: [
      { label: "Board Module Hub", href: "/board" },
      { label: "Command Center", href: "/board/command-center" },
      { label: "Action Center", href: "/board/action-center" },
    ],
  },
  {
    title: "BOS / Supabase Layer",
    status: "Connected",
    badge: "✅",
    href: "/board/command-center",
    description:
      "Shared data layer powering owner requests, manager workflow, board decisions, and activity tracking.",
    role: "System brain and shared record source.",
    links: [
      { label: "View Board Command Center", href: "/board/command-center" },
      { label: "Open Manager Command Center", href: "/portal/manager" },
    ],
  },
];

export default function PortalHub() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
            Stoutt Property Management Software
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Portal Hub
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
            Central launchpad for the Owner, Manager, Board, and BOS workflow
            modules.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/portal/owner" className="btn-primary">
              Owner Portal
            </Link>
            <Link href="/portal/manager" className="btn-secondary">
              Manager Portal
            </Link>
            <Link href="/board" className="btn-outline">
              Board Portal
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {modules.map((module) => (
            <div
              key={module.title}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7"
            >
              <h2 className="text-2xl font-bold">{module.title}</h2>
              <p className="mt-2 text-slate-400">{module.description}</p>

              <div className="mt-4 space-y-2">
                {module.links.map((link) => (
                  <Link key={link.href} href={link.href} className="block text-amber-300">
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

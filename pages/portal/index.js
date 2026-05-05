import { useEffect, useState } from "react";
import Link from "next/link";

const portalSections = [
  {
    title: "Owner Portal",
    description:
      "Owner intake, request submission, preloaded profile data, and live status tracking.",
    links: [{ label: "Open Owner Portal", href: "/portal/owner-hub" }],
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    title: "Manager Portal",
    description:
      "Manager command layer for reviewing requests, routing items, vendor dispatch, and workflow control.",
    links: [
      { label: "Open Manager Portal", href: "/portal/manager-hub" },
      { label: "Manager Action Center", href: "/portal/manager" },
      { label: "Workflow Engine", href: "/portal/workflow-engine" },
    ],
    roles: ["manager", "admin"],
  },
  {
    title: "Board Portal",
    description:
      "Board intelligence and decision layer for items escalated by management.",
    links: [
      { label: "Board Module Hub", href: "/board" },
      { label: "Command Center", href: "/board/command-center" },
      { label: "Action Center", href: "/board/action-center" },
    ],
    roles: ["board", "manager", "admin"],
  },
];

export default function PortalHub() {
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("spmPortalRole") || "owner");
  }, []);

  const visibleSections = portalSections.filter((section) =>
    section.roles.includes(role)
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-8 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.12),transparent_32%),linear-gradient(135deg,rgba(15,23,42,1),rgba(2,6,23,1),rgba(20,20,22,1))]" />

        <div className="relative z-10 max-w-6xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            Portal Hub
          </p>

          <h1 className="text-6xl font-bold tracking-tight md:text-8xl">
            Portal Hub
          </h1>

          <p className="mt-8 max-w-4xl text-xl leading-8 text-slate-300">
            Central launchpad for your assigned Stoutt Property Management
            portal modules.
          </p>

          <div className="mt-10">
            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold capitalize text-amber-300">
              {role} Access
            </span>
          </div>
        </div>
      </section>

      <section className="px-8 py-14">
        <div className="grid gap-8 lg:grid-cols-2">
          {visibleSections.map((section) => (
            <div
              key={section.title}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl"
            >
              <h2 className="text-3xl font-semibold">{section.title}</h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                {section.description}
              </p>

              <div className="mt-7 space-y-4">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-semibold text-amber-300 transition hover:text-amber-200"
                  >
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



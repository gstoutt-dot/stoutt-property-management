import { useEffect, useState } from "react";
import Link from "next/link";

const portalSections = [
  {
    title: "Owner Portal",
    description:
      "Submit requests, view owner-facing updates, check financials, and track request status without exposing internal management notes.",
    links: [
      { label: "Open Owner Hub", href: "/homeowner" },
      { label: "Owner Request Portal", href: "/portal/owner" },
    ],
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    title: "Owner Request Status",
    description:
      "Owner-facing request visibility should show simple progress only: received, under review, approved or dispatched, completed.",
    links: [
      { label: "View Owner Status", href: "/portal/owner" },
    ],
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    title: "Manager Portal",
    description:
      "Manager command layer for reviewing requests, routing items, vendor dispatch, and workflow control.",
    links: [
      { label: "Open Manager Portal", href: "/portal/manager" },
      { label: "BOS Action Center", href: "/bos/action-center" },
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
      { label: "Approval Queue", href: "/portal/approval-queue" },
      { label: "BOS Action Center", href: "/bos/action-center" },
      { label: "Command Center", href: "/board/command-center" },
    ],
    roles: ["board", "manager", "admin"],
  },
  {
    title: "Admin Operations",
    description:
      "Full administrative oversight across Ava intake, manager verification, board routing, vendor dispatch, and completion tracking.",
    links: [
      { label: "Software Dashboard", href: "/software-dashboard" },
      { label: "BOS Action Center", href: "/bos/action-center" },
      { label: "Approval Queue", href: "/portal/approval-queue" },
    ],
    roles: ["admin"],
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

      {role === "owner" && (
        <section className="px-8 pt-12">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Owner Visibility Rule
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Simple Status, Not Internal Workflow
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
              Owners should see request progress, not internal board notes,
              manager comments, vendor routing details, or approval logic.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <StatusStep title="Received" />
              <StatusStep title="Under Review" />
              <StatusStep title="Dispatched" />
              <StatusStep title="Completed" />
            </div>
          </div>
        </section>
      )}

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

function StatusStep({ title }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-amber-400/40 bg-amber-400/10 text-sm font-bold text-amber-300">
        ✓
      </div>

      <p className="text-lg font-semibold text-white">{title}</p>
    </div>
  );
}


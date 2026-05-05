import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const modules = {
  manager: [
    {
      title: "Action Center",
      subtitle: "Review incoming requests, approvals, invoices, and follow-ups.",
      href: "/portal/action-center",
      featured: true,
      badge: "Primary",
    },
    {
      title: "Manager Hub",
      subtitle: "Central workspace for property manager operations.",
      href: "/portal/manager",
    },
    {
      title: "Workflow Engine",
      subtitle: "Track violations, work orders, requests, and board approvals.",
      href: "/portal/workflow-engine-live",
    },
    {
      title: "Violations",
      subtitle: "Review, inspect, approve, and escalate violation items.",
      href: "/portal/violations",
    },
    {
      title: "Work Orders",
      subtitle: "Create, track, assign, and follow up on maintenance requests.",
      href: "/portal/work-orders",
    },
    {
      title: "Architectural Review",
      subtitle: "Review owner ARC requests before board submission.",
      href: "/portal/architectural-review",
    },
    {
      title: "Vendor Invoices",
      subtitle: "Review invoices before board approval and payment processing.",
      href: "/portal/vendor-invoices",
    },
    {
      title: "Reports",
      subtitle: "Operational summaries, open items, and community status.",
      href: "/portal/reports",
    },
  ],

  board: [
    {
      title: "Board Hub",
      subtitle: "Review approvals, decisions, reports, and community priorities.",
      href: "/portal/board",
      featured: true,
      badge: "Board Review",
    },
    {
      title: "Approval Queue",
      subtitle: "Review items forwarded by management for board action.",
      href: "/portal/approval-queue",
    },
    {
      title: "Reports",
      subtitle: "View management summaries and operating updates.",
      href: "/portal/reports",
    },
  ],

  owner: [
    {
      title: "Owner Hub",
      subtitle: "View your account, requests, documents, and community updates.",
      href: "/portal/owner",
      featured: true,
      badge: "Owner Portal",
    },
    {
      title: "Submit Request",
      subtitle: "Send maintenance, architectural, or general requests.",
      href: "/portal/owner-requests",
    },
    {
      title: "Documents",
      subtitle: "Access association documents, forms, and notices.",
      href: "/portal/documents",
    },
  ],

  admin: [
    {
      title: "Admin Control Center",
      subtitle: "System-wide access for portal oversight and configuration.",
      href: "/portal/admin",
      featured: true,
      badge: "Admin",
    },
    {
      title: "Action Center",
      subtitle: "Review all operational activity across the system.",
      href: "/portal/action-center",
    },
    {
      title: "Manager Hub",
      subtitle: "Access management operations and workflows.",
      href: "/portal/manager",
    },
    {
      title: "Board Hub",
      subtitle: "Access board-facing approval tools.",
      href: "/portal/board",
    },
    {
      title: "Owner Hub",
      subtitle: "Access homeowner-facing tools.",
      href: "/portal/owner",
    },
    {
      title: "Workflow Engine",
      subtitle: "View and manage system workflow activity.",
      href: "/portal/workflow-engine-live",
    },
  ],
};

export default function SoftwareDashboard() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole =
      localStorage.getItem("portalRole") ||
      localStorage.getItem("userRole") ||
      localStorage.getItem("role");

    if (!storedRole) {
      router.push("/homeowner-access");
      return;
    }

    setRole(storedRole.toLowerCase());
  }, [router]);

  const visibleModules = useMemo(() => {
    if (!role) return [];
    return modules[role] || modules.owner;
  }, [role]);

  const roleLabel = role ? role.charAt(0).toUpperCase() + role.slice(1) : "";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.18),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Stoutt Property Management
              </p>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Software Dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                A role-aware command center for association operations,
                approvals, requests, and management workflow.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 shadow-2xl backdrop-blur">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Current Access
              </p>
              <p className="mt-1 text-2xl font-semibold">{roleLabel || "Loading"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Open Items</p>
            <p className="mt-2 text-3xl font-bold">24</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Awaiting Review</p>
            <p className="mt-2 text-3xl font-bold">9</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Board Approvals</p>
            <p className="mt-2 text-3xl font-bold">5</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">System Status</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">Live</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Portal Modules
          </p>
          <h2 className="text-3xl font-bold">Your Workspace</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {visibleModules.map((item) => (
            <button
              key={item.title}
              onClick={() => router.push(item.href)}
              className={`group text-left transition duration-300 ${
                item.featured
                  ? "lg:col-span-2 rounded-[2rem] border border-cyan-300/30 bg-cyan-300/10 p-8 shadow-2xl shadow-cyan-950/40 hover:bg-cyan-300/15"
                  : "rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 hover:border-cyan-300/30 hover:bg-white/[0.09]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {item.badge && (
                    <span className="mb-4 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                      {item.badge}
                    </span>
                  )}

                  <h3
                    className={`font-bold ${
                      item.featured ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-xl text-slate-300">{item.subtitle}</p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-300 transition group-hover:border-cyan-300/40 group-hover:text-cyan-200">
                  Open
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const DASHBOARD_MODULES = {
  admin: [
    {
      title: "BOS Action Center",
      description:
        "Live command center for Ava intake, manager verification, board routing, vendor dispatch, and completion tracking.",
      href: "/bos/action-center",
      featured: true,
      label: "Primary Command",
    },
    {
      title: "Approval Queue",
      description:
        "Review items routed from management for board decisions and final approval.",
      href: "/portal/approval-queue",
    },
    {
      title: "Manager Hub",
      description: "Review manager-side operations and association workflows.",
      href: "/portal/manager",
    },
    {
      title: "Board Hub",
      description: "Access board approval tools and decision queues.",
      href: "/board",
    },
    {
      title: "Owner Portal",
      description: "View the homeowner-facing experience and request flow.",
      href: "/portal",
    },
    {
      title: "Workflow Engine",
      description: "Track violations, work orders, ARC requests, and approvals.",
      href: "/portal/workflow-engine-live",
    },
    {
      title: "Reports",
      description: "View management summaries and operating snapshots.",
      href: "/portal/reports",
    },
  ],

  manager: [
    {
      title: "Action Center",
      description:
        "Review incoming owner requests, work orders, violations, ARC forms, and invoices.",
      href: "/bos/action-center",
      featured: true,
      label: "Manager Priority",
    },
    {
      title: "Approval Queue",
      description:
        "Track items sent to the board and monitor approval status.",
      href: "/portal/approval-queue",
    },
    {
      title: "Manager Hub",
      description: "Your main workspace for association management operations.",
      href: "/portal/manager",
    },
    {
      title: "Workflow Engine",
      description: "Move items from intake to review, approval, and completion.",
      href: "/portal/workflow-engine-live",
    },
    {
      title: "Violations",
      description: "Inspect, review, approve, and escalate violation matters.",
      href: "/portal/violations",
    },
    {
      title: "Work Orders",
      description: "Track maintenance items from request to vendor dispatch.",
      href: "/portal/work-orders",
    },
    {
      title: "Vendor Invoices",
      description: "Review invoices before board approval and payment.",
      href: "/portal/vendor-invoices",
    },
  ],

  board: [
    {
      title: "Board Hub",
      description:
        "Review items forwarded by management for board approval and decisions.",
      href: "/board",
      featured: true,
      label: "Board Review",
    },
    {
      title: "Approval Queue",
      description:
        "Review items routed from management for board decisions and final approval.",
      href: "/portal/approval-queue",
    },
    {
      title: "Reports",
      description: "Review association summaries and operating updates.",
      href: "/portal/reports",
    },
  ],

  owner: [
    {
      title: "Owner Hub",
      description:
        "Access owner requests, status visibility, financials, and association information.",
      href: "/homeowner",
      featured: true,
      label: "Owner Access",
    },
    {
      title: "Owner Portal",
      description:
        "Open the live owner intake and request visibility portal.",
      href: "/portal/owner",
    },
  ],
};

const ADMIN_VERIFICATION_STEPS = [
  {
    title: "Ava Intake Received",
    description:
      "Ava captures the caller, issue, urgency, unit/address, and creates the BOS action automatically.",
    notice: "Admin sees the live intake immediately.",
    complete: true,
  },
  {
    title: "Manager Verification",
    description:
      "Management reviews accuracy, confirms responsibility, checks urgency, and determines next routing.",
    notice: "Manager notification required.",
    complete: true,
  },
  {
    title: "Board Review Required?",
    description:
      "If the item requires approval, funding authorization, policy interpretation, or board direction, it routes to the board queue.",
    notice: "Board notification triggered when needed.",
    complete: false,
  },
  {
    title: "Vendor Dispatch",
    description:
      "Approved maintenance items move to vendor assignment with scope, priority, and access instructions.",
    notice: "Vendor notification pending.",
    complete: false,
  },
  {
    title: "Owner / Caller Update",
    description:
      "The caller receives an appropriate update once management has reviewed or acted on the request.",
    notice: "Owner notification pending.",
    complete: false,
  },
];

export default function SoftwareDashboard() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("spmPortalLoggedIn");
    const savedRole = localStorage.getItem("spmPortalRole");
    const savedName = localStorage.getItem("spmPortalUserName");

    if (loggedIn !== "true" || !savedRole) {
      router.push("/homeowner-login");
      return;
    }

    setRole(savedRole);
    setUserName(savedName || "Portal User");
  }, [router]);

  const modules = useMemo(() => {
    if (!role) return [];
    return DASHBOARD_MODULES[role] || DASHBOARD_MODULES.owner;
  }, [role]);

  const roleLabel = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Loading";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/80 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Stoutt Property Management
              </p>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Software Dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Welcome back, {userName}. Your dashboard is filtered for your
                assigned role and portal access.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] px-6 py-5 shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Current Role
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-300">
                {roleLabel}
              </p>

              <button
                onClick={() => {
                  localStorage.removeItem("spmPortalLoggedIn");
                  localStorage.removeItem("spmPortalUser");
                  localStorage.removeItem("spmPortalUserName");
                  localStorage.removeItem("spmPortalRole");
                  router.push("/homeowner-login");
                }}
                className="mt-4 rounded-full border border-red-300/20 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-200 transition hover:bg-red-400/15"
              >
                Logout / Switch Role
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <Stat label="Open Items" value="24" />
          <Stat label="Awaiting Review" value="9" />
          <Stat label="Approvals" value="5" />
          <Stat label="System Status" value="Live" accent />
        </div>
      </section>

      {role === "admin" && (
        <section className="mx-auto max-w-7xl px-6 pb-10">
          <div className="rounded-[2rem] border border-amber-300/15 bg-white/[0.045] p-6 shadow-2xl shadow-black/30">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              BOS Verification Chain
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Admin Oversight Workflow
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
              Every Ava-created item should move through verification,
              notification, approval, dispatch, and completion visibility so the
              right people are notified at the right stage.
            </p>

            <div className="mt-7 space-y-4">
              {ADMIN_VERIFICATION_STEPS.map((step, index) => (
                <VerificationStep
                  key={step.title}
                  index={index}
                  step={step}
                />
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/bos/action-center")}
                className="rounded-2xl border border-amber-300/30 bg-amber-300/10 px-6 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300/15"
              >
                Open BOS Action Center
              </button>

              <button
                onClick={() => router.push("/portal/approval-queue")}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-amber-300/30 hover:text-amber-200"
              >
                View Approval Queue
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Portal Modules
          </p>
          <h2 className="mt-2 text-3xl font-bold">Your Workspace</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {modules.map((module) => (
            <button
              key={module.title}
              onClick={() => router.push(module.href)}
              className={`group text-left transition duration-300 ${
                module.featured
                  ? "rounded-[2rem] border border-amber-300/30 bg-amber-300/10 p-8 shadow-2xl shadow-amber-950/30 hover:bg-amber-300/15 lg:col-span-2"
                  : "rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 hover:border-amber-300/30 hover:bg-white/[0.09]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {module.label && (
                    <span className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                      {module.label}
                    </span>
                  )}

                  <h3
                    className={`font-bold ${
                      module.featured ? "text-3xl md:text-4xl" : "text-2xl"
                    }`}
                  >
                    {module.title}
                  </h3>

                  <p className="mt-3 max-w-xl leading-7 text-slate-300">
                    {module.description}
                  </p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-300 transition group-hover:border-amber-300/40 group-hover:text-amber-200">
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

function VerificationStep({ step, index }) {
  return (
    <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5 md:grid-cols-[auto_1fr_auto] md:items-start">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold ${
          step.complete
            ? "border-amber-300/40 bg-amber-300/15 text-amber-200"
            : "border-white/10 bg-white/[0.04] text-slate-400"
        }`}
      >
        {step.complete ? "✓" : index + 1}
      </div>

      <div>
        <h3 className="text-xl font-bold">{step.title}</h3>
        <p className="mt-2 leading-7 text-slate-300">{step.description}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 md:min-w-[240px]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Notification
        </p>
        <p className="mt-1 text-amber-200">{step.notice}</p>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p
        className={`mt-2 text-3xl font-bold ${
          accent ? "text-emerald-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}


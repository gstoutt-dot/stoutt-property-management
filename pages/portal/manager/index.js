// File: /portal/manager/index.js

import Link from "next/link";

const managerModules = [
  {
    title: "Owner Intake Queue",
    description: "Review homeowner submissions before dispatch, board routing, or follow-up.",
    href: "/portal/manager/owner-intake",
    stat: "Live",
    label: "Owner Portal Feed",
  },
  {
    title: "Initial Intake",
    description: "Review incoming violations, work orders, invoices, and miscellaneous requests.",
    href: "/portal/manager/intake",
    stat: "12",
    label: "Pending Review",
  },
  {
    title: "Dispatch Queue",
    description: "Assign approved work orders and service requests to vendors.",
    href: "/portal/manager/dispatch",
    stat: "5",
    label: "Ready to Dispatch",
  },
  {
    title: "Verification",
    description: "Confirm completion, inspect work, and approve next steps.",
    href: "/portal/manager/verification",
    stat: "7",
    label: "Needs Verification",
  },
  {
    title: "Invoices",
    description: "Review vendor invoices before payment or board submission.",
    href: "/portal/manager/invoices",
    stat: "4",
    label: "Awaiting Review",
  },
  {
    title: "Submit to Board",
    description: "Prepare reviewed items for board approval and decision tracking.",
    href: "/portal/manager/submit-to-board",
    stat: "Live",
    label: "Board Pipeline",
  },
];

const priorityItems = [
  {
    title: "Owner submitted pool light request",
    category: "Owner Intake",
    status: "Needs PM Review",
  },
  {
    title: "Vendor invoice requires verification",
    category: "Invoice Review",
    status: "Pending",
  },
  {
    title: "ARC request ready for board packet",
    category: "Architectural",
    status: "Prepare",
  },
];

export default function ManagerPortal() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">SPM Manager Portal</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Manager Operations Hub</h1>
            <p className="mt-2 text-white/60">
              Intake, review, dispatch, verification, invoice control, and board submission workflow.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/portal/manager/owner-intake"
              className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
            >
              Owner Intake
            </Link>
            <Link
              href="/portal/board/live-approvals"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition"
            >
              Board Live Approvals
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Manager Review Layer</p>
          <h2 className="mt-3 text-3xl font-bold text-yellow-100">Everything flows through management first</h2>
          <p className="mt-3 max-w-4xl text-yellow-50/80">
            Owner requests, vendor invoices, violations, architectural submissions, and miscellaneous items are reviewed here before dispatch,
            payment, board submission, or owner follow-up.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Modules */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Manager Workflows</h2>
              <p className="mt-1 text-sm text-white/50">Operational queues for the property manager.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {managerModules.map((module) => (
                <Link
                  key={module.title}
                  href={module.href}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:border-yellow-400 hover:bg-white/[0.06] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-yellow-200 transition">{module.title}</h3>
                      <p className="mt-2 text-sm text-white/55">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-yellow-300">{module.stat}</p>
                      <p className="mt-1 text-xs text-white/40">{module.label}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Priority Rail */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-bold">Priority Review</h2>
              <p className="mt-1 text-sm text-white/50">Items needing manager attention.</p>

              <div className="mt-6 space-y-4">
                {priorityItems.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="font-semibold">{item.title}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="text-xs text-yellow-300">{item.category}</span>
                      <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-bold">System Loop</h2>
              <p className="mt-2 text-sm text-white/60">
                Owner Portal submissions now feed a manager review queue before vendor action or board approval.
              </p>
              <Link
                href="/portal/manager/owner-intake"
                className="mt-5 block rounded-2xl bg-yellow-400 px-5 py-3 text-center text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
              >
                Open Owner Intake Queue
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


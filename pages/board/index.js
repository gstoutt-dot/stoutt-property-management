import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const boardPages = [
  {
    title: "BOS Action Center",
    status: "Live / Ready",
    href: "/bos/action-center?returnTo=/board",
    description:
      "Track requests, approvals, vendor activity, and operational progress across the association.",
  },
  {
    title: "Executive Board Dashboard",
    status: "Live / Ready",
    href: "/board/executive-dashboard",
    description:
      "Executive board visibility for routed operational records, financial awareness, and association activity.",
  },
  {
    title: "Board Workflow Engine",
    status: "Live / Ready",
    href: "/board/workflow-engine",
    description:
      "Board workflow tracking for approvals, follow-ups, and operational decisions.",
  },
  {
    title: "Board Approval Queue",
    status: "Live / Ready",
    href: "/board/board-approval-queue",
    description:
      "Board-only approval center for items specifically routed for board approval.",
  },
  {
    title: "Board Notification Center",
    status: "Live / Ready",
    href: "/board/notification-center",
    description:
      "Board-facing notification center for routed updates, alerts, and association activity.",
  },
    {
    title: "Board Message Inbox",
    status: "Live / Ready",
    href: "/board/message-inbox",
    description:
      "Read internal messages from management and administration, including meeting follow-ups, operational updates, financial notes, and board coordination items.",
  },
  {
    title: "Monthly Accounting Reports",
    status: "Live / Ready",
    href: "/admin/monthly-accounting-reports",
    description:
      "Monthly financial packets, QuickBooks accounting reports, reserve reporting, executive summaries, and board financial visibility.",
  },
];

function statusStyle(status) {
  if (status === "Live / Ready") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

export default function BoardModuleHub() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("spmPortalLoggedIn");
    localStorage.removeItem("spmPortalUser");
    localStorage.removeItem("spmPortalUserName");
    localStorage.removeItem("spmPortalRole");

    router.push("/admin-login");
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-3 inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300">
                Board Operations Center
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
                BOARD DASHBOARD
              </h1>

              <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
                Simple operational visibility for board approvals, financial awareness,
                association activity, and community operations.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Board Access
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-300/20 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-200 hover:bg-red-400/15"
                >
                  Logout / Switch Role
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 rounded-[2rem] border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-2xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Navigation
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Board Operating Areas
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
            Board-facing approvals, notifications, workflows, financial review, and
            operational visibility are organized below. Approval items should be
            reviewed through the Board Approval Queue, not directly from the dashboard.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {boardPages.map((page) => (
            <div
              key={page.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 transition hover:border-amber-400/20"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div
                    className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(
                      page.status
                    )}`}
                  >
                    {page.status}
                  </div>

                  <h2 className="text-2xl font-bold">{page.title}</h2>
                </div>

                <Link
                  href={page.href}
                  className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 hover:bg-amber-400/20"
                >
                  Open
                </Link>
              </div>

              <p className="text-sm leading-6 text-slate-400">
                {page.description}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operations
          </div>

          <h2 className="text-3xl font-bold">
            Simple Access to Association Information
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
            This dashboard gives board members a clear landing page for approvals,
            notifications, financial review, workflows, and operational board
            responsibilities without exposing Admin queue records directly.
          </p>
        </section>
      </section>
    </main>
  );
}

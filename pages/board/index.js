import Link from "next/link";
import { useRouter } from "next/router";

const boardPages = [
  {
    title: "Approval Queue",
    status: "Live / Ready",
    href: "/portal/approval-queue",
    description:
      "Review requests requiring board approval, vendor authorization, or community decisions.",
  },
  {
    title: "BOS Action Center",
    status: "Live / Ready",
    href: "/bos/action-center",
    description:
      "Track requests, approvals, vendor activity, and operational progress across the association.",
  },
  {
    title: "Violation Review",
    status: "Live / Ready",
    href: "/board/violation-review",
    description:
      "Board review area for covenant enforcement and violation decisions.",
  },
  {
    title: "Architectural Approvals",
    status: "Live / Ready",
    href: "/board/architectural-approvals",
    description:
      "Architectural request review module for ARC and board decisions.",
  },
  {
    title: "Maintenance Review",
    status: "Live / Ready",
    href: "/board/maintenance-review",
    description:
      "Board visibility into major repairs, work orders, and maintenance escalations.",
  },
  {
    title: "Financial Review",
    status: "Live / Ready",
    href: "/board/financial-review",
    description:
      "Budget exceptions, delinquency trends, reserve items, and financial approvals.",
  },
  {
    title: "Documents",
    status: "Live / Ready",
    href: "/board/documents",
    description:
      "Association documents, records, packets, and board reference materials.",
  },
  {
    title: "Vendors",
    status: "Live / Ready",
    href: "/board/vendors",
    description:
      "Vendor visibility and board-level vendor review areas.",
  },
  {
    title: "Calendar",
    status: "Live / Ready",
    href: "/board/calendar",
    description:
      "Board calendar for meetings, deadlines, association events, and operational scheduling.",
  },
  {
    title: "Messages",
    status: "Live / Ready",
    href: "/board/messages",
    description:
      "Board communication center for association messages, updates, and internal coordination.",
  },
  {
    title: "Task Command",
    status: "Live / Ready",
    href: "/board/task-command",
    description:
      "Board task visibility for assignments, follow-ups, operational action items, and completion tracking.",
  },
  {
    title: "Committee Center",
    status: "Live / Ready",
    href: "/board/committee-center",
    description:
      "Committee coordination area for board oversight, member participation, and association initiatives.",
  },
  {
    title: "Signature Approval Log",
    status: "Live / Ready",
    href: "/board/signature-approval-log",
    description:
      "Approval and signature tracking for board actions, authorizations, and governance records.",
  },
  {
    title: "Meetings",
    status: "Live / Ready",
    href: "/portal/board/meetings",
    description:
      "Board meeting center for agendas, meeting records, discussion items, and association governance.",
  },
  {
    title: "Member Voting",
    status: "Live / Ready",
    href: "/portal/board/member-voting",
    description:
      "Voting center for board decisions, member voting workflows, and recorded association outcomes.",
  },
  {
    title: "Reports",
    status: "Live / Ready",
    href: "/portal/board/reports",
    description:
      "Board reporting center for financial summaries, compliance activity, operational records, and board-ready reports.",
  },
];

function statusStyle(status) {
  if (status === "Live / Ready") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Available") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
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
            This dashboard gives board members a clear place to review approvals,
            association activity, financial information, documents, vendors, meetings,
            messages, reports, voting, signatures, committee activity, and other
            board responsibilities.
          </p>
        </section>
      </section>
    </main>
  );
}

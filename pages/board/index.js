import Link from "next/link";
import { useRouter } from "next/router";

const boardPages = [
  {
    title: "Approval Queue",
    status: "Live / Ready",
    href: "/portal/approval-queue",
    description:
      "Review requests requiring board approval, vendor authorization, or community decisions."
  },
  
  {
    title: "BOS Action Center",
    status: "Live / Ready",
    href: "/bos/action-center",
    description:
      "Track requests, approvals, vendor activity, and operational progress across the association."
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
    status: "Available",
    href: "/board/financial-review",
    description:
      "Budget exceptions, delinquency trends, reserve items, and financial approvals.",
  },
  {
    title: "Documents",
    status: "Available",
    href: "/board/documents",
    description:
      "Association documents, records, packets, and board reference materials.",
  },
  {
    title: "Vendors",
    status: "Available",
    href: "/board/vendors",
    description:
      "Vendor visibility and board-level vendor review areas.",
  },
];

const BOARD_WORKFLOW = [
  {
    title: "Manager Verification",
    description:
      "Management validates the request, checks responsibility, confirms urgency, and determines whether board review is required.",
    status: "Completed Before Board Review",
    complete: true,
  },
  {
    title: "Board Review Queue",
    description:
      "Items requiring board direction, funding approval, or policy interpretation route into the Board Approval Queue.",
    status: "Pending Board Review",
    complete: true,
  },
  {
    title: "Board Decision",
    description:
      "Board members approve, reject, defer, or request clarification before vendor dispatch or operational execution.",
    status: "Awaiting Decision",
    complete: false,
  },
  {
    title: "Vendor Authorization",
    description:
      "Approved items move into dispatch with vendor assignment, work scope, and operational tracking.",
    status: "Pending Authorization",
    complete: false,
  },
  {
    title: "Completion & Audit Trail",
    description:
      "Final completion, vendor confirmation, timestamps, and operational history remain visible for accountability.",
    status: "Completed & Archived",
    complete: false,
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

  const liveCount = boardPages.filter(
    (p) => p.status === "Live / Ready"
  ).length;

  const reviewCount = boardPages.filter(
  (p) => p.status === "Available"
).length;

  const handleLogout = () => {
    localStorage.removeItem("spmPortalLoggedIn");
    localStorage.removeItem("spmPortalUser");
    localStorage.removeItem("spmPortalUserName");
    localStorage.removeItem("spmPortalRole");

    router.push("/homeowner-login");
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
        
        <div className="grid gap-6 lg:grid-cols-2">
          {boardPages.map((page) => (
            <div
              key={page.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30 transition hover:border-amber-400/20"
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

                  <h2 className="text-3xl font-bold">
                    {page.title}
                  </h2>
                </div>

                <Link
                  href={page.href}
                  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 hover:bg-amber-400/20"
                >
                  Open
                </Link>
              </div>

              <p className="text-sm leading-7 text-slate-400">
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
    messages, and other board responsibilities.
  </p>
</section>
      </section>
    </main>
  );
}

function WorkflowStep({ step, index }) {
  return (
    <div className="grid gap-4 rounded-3xl border border-white/10 bg-[#020617]/70 p-5 md:grid-cols-[auto_1fr_auto]">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold ${
          step.complete
            ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
            : "border-white/10 bg-white/[0.04] text-slate-400"
        }`}
      >
        {step.complete ? "✓" : index + 1}
      </div>

      <div>
        <h3 className="text-2xl font-bold">
          {step.title}
        </h3>

        <p className="mt-3 leading-7 text-slate-300">
          {step.description}
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300 md:min-w-[240px]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Workflow Status
        </p>

        <p className="mt-1 text-amber-200">
          {step.status}
        </p>
      </div>
    </div>
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
      <div className="text-sm text-slate-400">
        {label}
      </div>

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

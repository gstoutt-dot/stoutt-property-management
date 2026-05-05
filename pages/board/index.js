import Link from "next/link";
import { useRouter } from "next/router";

const boardPages = [
  {
    title: "Approval Queue",
    status: "Live / Ready",
    href: "/portal/approval-queue",
    description:
      "Review items routed from management for board decisions and final approval.",
  },
  {
    title: "Command Center",
    status: "Live / Ready",
    href: "/board/command-center",
    description:
      "Board-level intelligence, metrics, pending decisions, and clean decision history.",
  },
  {
    title: "Action Center",
    status: "Live / Ready",
    href: "/board/action-center",
    description:
      "Board approval layer for approving, rejecting, or requesting more information.",
  },
  {
    title: "Violation Review",
    status: "Built / Needs Review",
    href: "/board/violation-review",
    description:
      "Board review area for covenant enforcement and violation decisions.",
  },
  {
    title: "Architectural Approvals",
    status: "Built / Needs Review",
    href: "/board/architectural-approvals",
    description:
      "Architectural request review module for ARC and board decisions.",
  },
  {
    title: "Maintenance Review",
    status: "Built / Needs Review",
    href: "/board/maintenance-review",
    description:
      "Board visibility into major repairs, work orders, and maintenance escalations.",
  },
  {
    title: "Financial Review",
    status: "Built / Needs Review",
    href: "/board/financial-review",
    description:
      "Budget exceptions, delinquency trends, reserve items, and financial approvals.",
  },
  {
    title: "Documents",
    status: "Built / Needs Review",
    href: "/board/documents",
    description:
      "Association documents, records, packets, and board reference materials.",
  },
  {
    title: "Vendors",
    status: "Built / Needs Review",
    href: "/board/vendors",
    description:
      "Vendor visibility and board-level vendor review areas.",
  },
];

function statusStyle(status) {
  if (status === "Live / Ready") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Built / Needs Review") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

export default function BoardModuleHub() {
  const router = useRouter();

  const liveCount = boardPages.filter((p) => p.status === "Live / Ready").length;
  const reviewCount = boardPages.filter(
    (p) => p.status === "Built / Needs Review"
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
                Board Portal Module
              </div>

              <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
                Board Hub
              </h1>

              <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
                Central directory for the Board Portal. Live decision pages are
                separated from built pages that still need review or wiring.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Board Access
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => router.push("/software-dashboard")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                >
                  Back to Software Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-300/20 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-200 hover:bg-red-400/15"
                >
                  Logout / Switch Role
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/portal/approval-queue"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg hover:bg-amber-300"
            >
              Approval Queue
            </Link>

            <Link
              href="/board/command-center"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-3 font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Command Center
            </Link>

            <Link
              href="/board/action-center"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-6 py-3 font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Action Center
            </Link>

            <Link
              href="/portal"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 hover:bg-white/10"
            >
              Portal Hub
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Metric label="Board Pages Listed" value={boardPages.length} />
          <Metric label="Live / Ready" value={liveCount} highlight />
          <Metric label="Needs Review" value={reviewCount} />
          <Metric label="Workflow Role" value="Decision" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {boardPages.map((page) => (
            <div
              key={page.href}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/30"
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

                  <h2 className="text-3xl font-bold">{page.title}</h2>
                </div>

                <Link
                  href={page.href}
                  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-medium text-amber-300 hover:bg-amber-400/20"
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
            Board Module Rule
          </div>

          <h2 className="text-3xl font-bold">Source of Truth</h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
            For now, the official live Board workflow is Approval Queue,
            Command Center, and Action Center. All other Board pages should be
            treated as inventory until reviewed, cleaned, merged, or retired.
          </p>
        </section>
      </section>
    </main>
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
      <div className="text-sm text-slate-400">{label}</div>
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

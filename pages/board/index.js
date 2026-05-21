import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const boardPages = [
  {
    title: "BOS Action Center",
    status: "Live / Ready",
    href: "/bos/action-center",
    description:
      "Track requests, approvals, vendor activity, and operational progress across the association.",
  },
  {
    title: "Executive Dashboard",
    status: "Live / Ready",
    href: "/board/executive-dashboard",
    description:
      "Board-only dashboard area for association visibility and board operations.",
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
    href: "/board/approval-queue",
    description:
      "Review board approval items, pending decisions, and routed association requests.",
  },
  {
    title: "Board Notification Center",
    status: "Live / Ready",
    href: "/board/notification-center",
    description:
      "Board-facing notification center for routed updates, alerts, and association activity.",
  },
  {
    title: "Financial Review",
    status: "Live / Ready",
    href: "/board/financial-review",
    description:
      "Board-level financial visibility, delinquency trends, owner balance review, and QuickBooks-connected financial awareness.",
  },
  {
    title: "Board Notifications",
    status: "Live / Ready",
    href: "/portal/board/notifications",
    description:
      "Board notification history and communication records.",
  },
];

const closedStatuses = ["completed", "archived", "closed"];

function statusStyle(status) {
  if (status === "Live / Ready") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

function priorityStyle(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "critical") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  if (value === "high") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  if (value === "normal") {
    return "border-sky-400/30 bg-sky-400/10 text-sky-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

function formatDate(value) {
  if (!value) return "No due date";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function routeForBoardRecord(record) {
  const target = String(record.routing_target || "").toLowerCase();
  const type = String(record.request_type || "").toLowerCase();

  if (type.includes("financial")) return "/board/financial-review";
  if (type.includes("approval")) return "/board/approval-queue";
  if (target.includes("financial")) return "/board/financial-review";
  if (target.includes("approval")) return "/board/approval-queue";
  if (target.includes("notification")) return "/board/notification-center";
  if (target.includes("workflow")) return "/board/workflow-engine";
  if (target.includes("bos")) return "/bos/action-center";

  return "/board/dashboard";
}

export default function BoardModuleHub() {
  const router = useRouter();

  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadBoardRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadBoardRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadBoardRecords({ showLoading = false } = {}) {
    try {
      if (showLoading) {
        setLoadingRecords(true);
      }

      setSystemMessage("");

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.message || "Unable to load board operational records."
        );
      }

      setRecords(payload.openRecords || []);
    } catch (error) {
      console.error("Unable to load board operational records:", error);

      setSystemMessage(
        error.message || "Unable to load board operational records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  const boardAttentionRecords = useMemo(() => {
    const priorityRank = {
      critical: 1,
      high: 2,
      normal: 3,
      low: 4,
    };

    return records
      .filter((record) => {
        const status = String(record.status || "").toLowerCase();
        const assignedTo = String(record.assigned_to || "").toLowerCase();
        const target = String(record.routing_target || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (Boolean(record.board_review_required) ||
            assignedTo.includes("board") ||
            target.includes("board"))
        );
      })
      .sort((a, b) => {
        const aRank =
          priorityRank[String(a.priority || "").toLowerCase()] || 5;

        const bRank =
          priorityRank[String(b.priority || "").toLowerCase()] || 5;

        return aRank - bRank;
      });
  }, [records]);

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
        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <section className="mb-10 rounded-[2rem] border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-2xl shadow-black/30">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Board Attention Queue
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Items Requiring Board Visibility
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Records assigned to the board appear here first so board members can
                immediately see items requiring review, awareness, or action.
              </p>
            </div>

            <Link
              href="/board/dashboard"
              className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20"
            >
              Board Dashboard
            </Link>
          </div>

          <div className="space-y-4">
            {loadingRecords ? (
              <div className="rounded-3xl border border-white/10 bg-[#020617]/80 p-5 text-sm text-slate-400">
                Loading board records...
              </div>
            ) : boardAttentionRecords.length === 0 ? (
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h3 className="mt-4 text-2xl font-bold">
                  No open board attention items
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Records assigned to the board will appear here automatically.
                </p>
              </div>
            ) : (
              boardAttentionRecords.map((record) => (
                <div
                  key={record.id}
                  className="rounded-3xl border border-white/10 bg-[#020617]/80 p-5 transition hover:border-amber-400/30 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <div
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                            record.priority
                          )}`}
                        >
                          {record.priority || "Normal"}
                        </div>

                        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          {record.request_type || "Board Record"}
                        </div>

                        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          Due: {formatDate(record.due_date)}
                        </div>

                        <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                          Board Review
                        </div>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold">
                        {record.title}
                      </h3>

                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                        {record.description ||
                          "Board operational record submitted for review."}
                      </p>

                      <div className="mt-4 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                          Recommended Action
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {record.recommended_action ||
                            "Review this item and determine the next board action."}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        router.push(routeForBoardRecord(record))
                      }
                      className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

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
            association activity, financial information, notifications, workflows,
            and operational board responsibilities.
          </p>
        </section>
      </section>
    </main>
  );
}

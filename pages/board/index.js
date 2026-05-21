import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

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

const closedStatuses = ["completed", "archived", "closed"];

function statusStyle(status) {
  if (status === "Live / Ready") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Available") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
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

export default function BoardModuleHub() {
  const router = useRouter();

  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [expandedRecordId, setExpandedRecordId] = useState(null);

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
        const aRank = priorityRank[String(a.priority || "").toLowerCase()] || 5;
        const bRank = priorityRank[String(b.priority || "").toLowerCase()] || 5;

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
              href="/board"
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
                  className="block rounded-3xl border border-white/10 bg-[#020617]/80 p-5 transition hover:border-amber-400/30 hover:bg-white/[0.05]"
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
                        setExpandedRecordId(
                          expandedRecordId === record.id ? null : record.id
                        )
                      }
                      className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                    >
                      {expandedRecordId === record.id ? "Close Review" : "Review"}
                    </button>
                  </div>

                  {expandedRecordId === record.id && (
                    <div className="mt-5 rounded-3xl border border-amber-400/20 bg-slate-950/80 p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                        Board Review Actions
                      </p>

                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        Review this item from the Board Dashboard. Admin creation,
                        editing, and intake controls remain restricted to Admin and
                        Management.
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <button className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20">
                          Acknowledge
                        </button>

                        <button className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20">
                          Approve
                        </button>

                        <button className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-300 hover:bg-sky-400/20">
                          Request More Info
                        </button>

                        <button className="rounded-xl border border-violet-400/30 bg-violet-400/10 px-4 py-3 text-sm font-semibold text-violet-300 hover:bg-violet-400/20">
                          Record Decision
                        </button>
                      </div>
                    </div>
                  )}
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
            association activity, financial information, documents, vendors, meetings,
            messages, reports, voting, signatures, committee activity, and other
            board responsibilities.
          </p>
        </section>
      </section>
    </main>
  );
}

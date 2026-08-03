import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../../lib/bosClient";

const closedStatuses = ["completed", "archived", "closed", "cancelled"];

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
  href: "/board/management-accounting-reports",
  description:
    "Monthly financial packets, reserve reporting, executive summaries, board financial review, and association financial visibility.",
},
];

function statusStyle(status) {
  if (status === "Live / Ready") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

function PageLinkIcon({ title }) {
  const normalizedTitle = String(title || "").toLowerCase();
  const iconClassName = "h-5 w-5";

  if (normalizedTitle.includes("workflow") || normalizedTitle.includes("action")) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true"><path d="M9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>;
  }

  if (normalizedTitle.includes("message") || normalizedTitle.includes("notification")) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" /><path d="M8 10h8" /><path d="M8 14h5" /></svg>;
  }

  if (normalizedTitle.includes("accounting") || normalizedTitle.includes("financial")) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true"><path d="M4 19V5" /><path d="M4 19h16" /><path d="m8 16 3-4 3 2 5-7" /></svg>;
  }

  if (normalizedTitle.includes("approval") || normalizedTitle.includes("board")) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  }

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClassName} aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
}

function priorityStyle(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "critical" || value === "urgent") {
    return "border-red-400/30 bg-red-500/10 text-red-200";
  }

  if (value === "high" || value === "attention") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  return "border-sky-400/30 bg-sky-400/10 text-sky-300";
}

function formatStatus(value) {
  return String(value || "submitted")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value) {
  if (!value) return "No date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "No date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function routeForBoardItem(item) {
  const target = String(item.routing_target || "").toLowerCase();
  const response = String(item.board_response || "").toLowerCase();
  const type = String(item.request_type || item.category || "").toLowerCase();

  if (
    target.includes("approval") ||
    response.includes("approval") ||
    response.includes("board_review") ||
    String(item.status || "").toLowerCase() === "board_review"
  ) {
    return "/board/board-approval-queue";
  }

  if (type.includes("notification") || target.includes("notification")) {
    return "/board/notification-center";
  }

  if (type.includes("message") || target.includes("message")) {
    return "/board/message-inbox";
  }

  if (type.includes("financial") || target.includes("financial")) {
    return "/board/financial-review";
  }

  if (type.includes("meeting") || type.includes("calendar")) {
    return "/portal/board/meetings";
  }

  if (type.includes("vendor")) {
    return "/board/vendors";
  }

  if (type.includes("legal") || type.includes("risk")) {
    return "/board/legal-review";
  }

  if (type.includes("insurance")) {
    return "/board/insurance-risk";
  }

  if (type.includes("budget")) {
    return "/board/budget-planning";
  }

  if (type.includes("compliance")) {
    return "/board/compliance-dashboard";
  }

  if (type.includes("architectural")) {
    return "/board/architectural-approvals";
  }

  return "/bos/action-center?returnTo=/board";
}

function cleanBoardDescription(description = "") {
  return String(description || "")
    .replace(/CALENDAR_ATTACHMENT_METADATA_START[\s\S]*?CALENDAR_ATTACHMENT_METADATA_END/g, "")
    .replace(/REPORT_ATTACHMENT_METADATA_START[\s\S]*?REPORT_ATTACHMENT_METADATA_END/g, "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/Attachments?:[\s\S]*$/gi, "")
    .trim();
}

export default function BoardModuleHub() {
  const router = useRouter();

  const [associationId, setAssociationId] = useState("");
  const [associationName, setAssociationName] = useState("Selected Association");
  const [boardAlerts, setBoardAlerts] = useState([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    const queryAssociationId =
      router.query.association_id || router.query.associationId || "";

    const queryAssociationName =
      router.query.association_name || router.query.associationName || "";

    const storedAssociationId =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedAssociationId") ||
          localStorage.getItem("spm_selected_association_id") ||
          localStorage.getItem("association_id") ||
          localStorage.getItem("associationId") ||
          ""
        : "";

    const storedAssociationName =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedAssociationName") ||
          localStorage.getItem("spm_selected_association_name") ||
          localStorage.getItem("association_name") ||
          localStorage.getItem("associationName") ||
          ""
        : "";

    const finalAssociationId = String(
      queryAssociationId || storedAssociationId || ""
    ).trim();

    const finalAssociationName = String(
      queryAssociationName || storedAssociationName || "Selected Association"
    ).trim();

    if (!finalAssociationId) {
      setSystemMessage("No association selected. Please log in again.");
      setLoadingAlerts(false);
      return;
    }

    setAssociationId(finalAssociationId);
    setAssociationName(finalAssociationName);

    localStorage.setItem("selectedAssociationId", finalAssociationId);
    localStorage.setItem("spm_selected_association_id", finalAssociationId);
    localStorage.setItem("selectedAssociationName", finalAssociationName);
    localStorage.setItem("spm_selected_association_name", finalAssociationName);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!associationId) return;

    loadBoardAlerts({ showLoading: true });

    const interval = setInterval(() => {
      loadBoardAlerts({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, [associationId]);

  async function loadBoardAlerts({ showLoading = false } = {}) {
    try {
      if (showLoading) setLoadingAlerts(true);

      setSystemMessage("");

      const { data, error } = await supabase
        .from("bos_actions")
        .select("*")
        .eq("association_id", associationId)
        .order("created_at", { ascending: false })
        .limit(25);

      if (error) throw error;

      const activeItems = (data || []).filter((item) => {
        const status = String(item.status || "").toLowerCase();
        return !closedStatuses.includes(status);
      });

      setBoardAlerts(activeItems);
    } catch (error) {
      console.error("Unable to load board dashboard alerts:", error);
      setBoardAlerts([]);
      setSystemMessage("Unable to load board dashboard alerts.");
    } finally {
      setLoadingAlerts(false);
    }
  }

  function buildAssociationHref(href) {
    if (!associationId) {
      return href;
    }

    const [pathname, existingQueryString] = href.split("?");
    const params = new URLSearchParams(existingQueryString || "");

    params.set("association_id", associationId);
    params.set("association_name", associationName);

    return `${pathname}?${params.toString()}`;
  }

  const handleLogout = () => {
  localStorage.removeItem("spmPortalLoggedIn");
  localStorage.removeItem("spmPortalUser");
  localStorage.removeItem("spmPortalUserName");
  localStorage.removeItem("spmPortalRole");

  localStorage.removeItem("spm_selected_association_id");
  localStorage.removeItem("spm_selected_association_name");
  localStorage.removeItem("selectedAssociationId");
  localStorage.removeItem("selectedAssociationName");

  router.push("/admin-login");
};

  const approvalCount = useMemo(
    () =>
      boardAlerts.filter((item) => {
        const route = routeForBoardItem(item);
        return route.includes("board-approval-queue");
      }).length,
    [boardAlerts]
  );

  const urgentCount = useMemo(
    () =>
      boardAlerts.filter((item) =>
        ["critical", "urgent", "high"].includes(
          String(item.priority || "").toLowerCase()
        )
      ).length,
    [boardAlerts]
  );

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

              <p className="mt-4 text-sm font-semibold text-amber-300">
                Active Association: {associationName}
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

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Metric label="Active Board Alerts" value={boardAlerts.length} />
            <Metric label="Approval Items" value={approvalCount} />
            <Metric label="Urgent / High Priority" value={urgentCount} />
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
                Board Attention Center
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Active Items Requiring Board Visibility
              </h2>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
                Items routed to board pages also appear here first so board members
                can immediately see what requires review, acknowledgment, approval,
                or follow-up.
              </p>
            </div>

            <button
              onClick={() => loadBoardAlerts({ showLoading: true })}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Refresh Alerts
            </button>
          </div>

          <div className="space-y-4">
            {loadingAlerts ? (
              <Empty message="Loading board alerts..." />
            ) : boardAlerts.length === 0 ? (
              <Empty message="No active board alerts are currently available." />
            ) : (
              boardAlerts.slice(0, 8).map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-[#020617]/80 p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                            item.priority
                          )}`}
                        >
                          {item.priority || "Normal"}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          {item.request_type || item.category || "Board Item"}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          {formatStatus(item.status)}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          {formatDate(item.created_at)}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold">
                        {item.title || "Board Alert"}
                      </h3>

                      <p className="mt-3 max-w-4xl whitespace-pre-wrap text-sm leading-7 text-slate-400">
                        {cleanBoardDescription(item.description) ||
                          "This item has been routed for board visibility."}
                      </p>
                    </div>

                    <Link
                      href={buildAssociationHref(routeForBoardItem(item))}
                      className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-center text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                    >
                      Review
                    </Link>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Navigation
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Board Operating Areas
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
            Board-facing approvals, notifications, workflows, financial review, and
            operational visibility are organized below.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {boardPages.map((page) => (
            <div
              key={page.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 transition hover:border-amber-400/20"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div
                    className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(
                      page.status
                    )}`}
                  >
                    {page.status}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition group-hover:-translate-y-0.5 group-hover:bg-amber-400/20">
                      <PageLinkIcon title={page.title} />
                    </div>

                    <h2 className="text-2xl font-bold">{page.title}</h2>
                  </div>
                </div>

                <Link
                  href={buildAssociationHref(page.href)}
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

          <div className="mb-8 flex justify-center">
            <Link
              href="/board/training"
              className="rounded-xl bg-amber-400 px-8 py-4 text-lg font-semibold text-slate-950 hover:bg-amber-300"
            >
              Board Member Training Center
            </Link>
          </div>

          <div className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operations
          </div>

          <h2 className="text-3xl font-bold">
            Simple Access to Association Information
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
            This dashboard gives board members a clear landing page for approvals,
            notifications, financial review, workflows, and operational board
            responsibilities while still routing each item to its proper board page
            for response and action.
          </p>
        </section>
      </section>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/20">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>

      <div className="mt-3 break-words text-3xl font-black text-amber-300">
        {value}
      </div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#020617]/80 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

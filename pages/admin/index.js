import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function getSelectedAssociationContext() {
  if (typeof window === "undefined") {
    return {
      associationId: "",
      associationName: "",
    };
  }

  return {
    associationId: localStorage.getItem("spm_selected_association_id") || "",
    associationName: localStorage.getItem("spm_selected_association_name") || "",
  };
}

const operationalHealth = [
  {
    title: "QuickBooks Synchronization",
    status: "Connected",
    detail: "Production accounting sync is available.",
    tone: "stable",
  },
  {
    title: "Notification Routing",
    status: "Operational",
    detail: "Routing layer is prepared for workflow alerts.",
    tone: "stable",
  },
  {
    title: "Association Workflow Engine",
    status: "Stable",
    detail: "Core BOS workflow lifecycle is active.",
    tone: "stable",
  },
  {
    title: "Board Operations",
    status: "Live",
    detail: "Board command surfaces are online.",
    tone: "stable",
  },
  {
    title: "Owner Portal Access",
    status: "Online",
    detail: "Owner dashboard and login foundation are active.",
    tone: "stable",
  },
];

const sections = [
  {
    title: "Daily Operations Center",
    eyebrow: "Day-to-Day Command",
    description:
      "Primary operating tools for approvals, activity, messages, meetings, reporting, and association workflow movement.",
    items: [
      { title: "Manager Command Center", href: "/portal/manager#live-queue" },
      { title: "Association Work Orders", href: "/admin/association-work-orders" },
      { title: "BOS Action Center", href: "/bos/action-center?returnTo=/admin" },
      { title: "New Operational Record", href: "/admin/operations/new" },
      { title: "Association Onboarding Records", href: "/association-onboarding-records" },
      { title: "Board Message Inbox", href: "/board/messages" },
      { title: "Association Calendar", href: "/board/calendar" },
      { title: "Board & Members Meetings", href: "/portal/board/meetings" },
      { title: "Association Reporting Center", href: "/board/reports" },
      { title: "Association Search Center", href: "/board/search-center" },
    ],
  },
  {
    title: "Governance & Board Operations",
    eyebrow: "Board Administration",
    description:
      "Governance tools for voting, motions, committees, signatures, elections, documents, notifications, and board decision records.",
    items: [
      { title: "QuickBooks Live", href: "/accounting/quickbooks-live" },
      { title: "Admin Notifications", href: "/admin/notifications" },
      { title: "Association Documents", href: "/board/documents" },
      { title: "Ava Knowledge Center", href: "/portal/ava/knowledge-center" },
      { title: "Board & Member Meetings", href: "/portal/board/meetings" },
      { title: "Committee Members Center", href: "/board/committee-center" },
      { title: "Board Signature Approval Log", href: "/board/signature-approval-log" },
      { title: "Member Voting", href: "/portal/board/member-voting" },
      { title: "Association Voting Center", href: "/board/voting-center" },
      { title: "Association Motion Center", href: "/board/motion-center" },
      { title: "Association Elections", href: "/board/elections" },
    ],
  },
  {
    title: "Financial Planning & Oversight",
    eyebrow: "Annual & Strategic Financial Work",
    description:
      "Planning tools for budget preparation, financial review, capital projects, and vendor performance oversight.",
    items: [
      { title: "Financial Review", href: "/board/financial-review" },
      { title: "Management Accounting Reports", href: "/board/management-accounting-reports" },
      { title: "Budget Planning", href: "/board/budget-planning" },
      { title: "Capital Projects", href: "/board/capital-projects" },
      { title: "Vendor Performance", href: "/board/vendor-performance" },
      { title: "Association Approved Vendors", href: "/board/vendors" },
    ],
  },
  {
    title: "Legal, Risk & Compliance",
    eyebrow: "Protection Layer",
    description:
      "Controlled areas for violations, legal review, insurance, risk tracking, and policy reference.",
    items: [
      { title: "Compliance Dashboard", href: "/board/compliance-dashboard" },
      { title: "Compliance Calendar", href: "/board/compliance-calendar" },
      { title: "Violation Review", href: "/board/violation-review" },
      { title: "Legal Review", href: "/board/legal-review" },
      { title: "Insurance & Risk", href: "/board/insurance-risk" },
      { title: "Policy Library", href: "/board/policy-library" },
      { title: "Maintenance Review", href: "/board/maintenance-review" },
    ],
  },
  {
    title: "Infrastructure & Expansion",
    eyebrow: "System Growth",
    description:
      "Support tools for technology integrations, training, platform expansion, and operating continuity.",
    items: [
      { title: "Technology Integrations", href: "/board/technology-integrations" },
      { title: "Help & Training", href: "/board/help-training" },
      { title: "Architectural Approvals", href: "/board/architectural-approvals" },
    ],
  },
];

const closedStatuses = ["completed", "archived", "closed"];

function routeForRecord(record) {
  const target = String(record.routing_target || "").toLowerCase();
  const type = String(record.request_type || "").toLowerCase();

  if (type.includes("insurance")) return "/board/insurance-risk";
  if (type.includes("legal")) return "/board/legal-review";
  if (type.includes("budget")) return "/board/budget-planning";
  if (type.includes("financial")) return "/board/financial-review";
  if (type.includes("election")) return "/board/elections";
  if (type.includes("capital")) return "/board/capital-projects";
  if (type.includes("vendor")) return "/board/vendor-performance";
  if (type.includes("policy")) return "/board/policy-library";
  if (type.includes("meeting")) return "/portal/board/meetings";
  if (type.includes("violation")) return "/board/violation-review";
  if (type.includes("maintenance")) return "/board/maintenance-review";
  if (type.includes("compliance")) return "/board/compliance-dashboard";
  if (type.includes("architectural")) return "/board/architectural-approvals";

  if (target.includes("bos")) return "/bos/action-center";
  if (target.includes("approval")) return "/board/board-approval-queue";
  if (target.includes("financial")) return "/board/financial-review";
  if (target.includes("legal") || target.includes("risk")) return "/board/legal-review";
  if (target.includes("vendor")) return "/board/vendors";
  if (target.includes("owner")) return "/portal/owner";

  return "/admin/operations/new";
}

function toneStyle(tone) {
  if (tone === "attention") return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  if (tone === "critical") return "border-red-400/30 bg-red-400/10 text-red-200";
  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
}

function priorityStyle(priority) {
  const value = String(priority || "").toLowerCase();
  if (value === "critical") return "border-red-400/30 bg-red-400/10 text-red-200";
  if (value === "high") return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  if (value === "normal") return "border-sky-400/30 bg-sky-400/10 text-sky-300";
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

function formatStatus(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function cleanAdminRecordDescription(description = "") {
  function handleAdminAssociationChange(
  event,
  associations,
  setAssociationId,
  setAssociationName
) {
  const selectedId = event.target.value;

  const selectedAssociation = associations.find(
    (association) => association.id === selectedId
  );

  if (!selectedAssociation) return;

  localStorage.setItem(
    "spm_selected_association_id",
    selectedAssociation.id
  );

  localStorage.setItem(
    "spm_selected_association_name",
    selectedAssociation.name
  );

  setAssociationId(selectedAssociation.id);
  setAssociationName(selectedAssociation.name);

  window.location.reload();
}
  return String(description || "")
    .replace(/CALENDAR_ATTACHMENT_METADATA_START[\s\S]*?CALENDAR_ATTACHMENT_METADATA_END/g, "")
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/Attachments?:[\s\S]*$/gi, "")
    .trim();
}

export default function AdminDashboard() {
  const router = useRouter();

  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [portalUserName, setPortalUserName] = useState("Admin");
  const [portalRole, setPortalRole] = useState("admin");
  const [associationName, setAssociationName] = useState("");
  const [associationId, setAssociationId] = useState("");
  const [adminAssociations, setAdminAssociations] = useState([]);
  const [showAllRecords, setShowAllRecords] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("spmPortalLoggedIn");
    const role = localStorage.getItem("spmPortalRole");
    const name = localStorage.getItem("spmPortalUserName");
    const context = getSelectedAssociationContext();

    if (loggedIn !== "true" || role !== "admin") {
      router.push("/admin-login");
      return;
    }

    setPortalUserName(name || "Admin");
    setPortalRole(role || "admin");
    setAssociationName(context.associationName || "Selected Association");
    setAssociationId(context.associationId || "");
  }, [router]);

  useEffect(() => {
    loadOperationalRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadOperationalRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function handleLogout() {
    localStorage.removeItem("spmPortalLoggedIn");
    localStorage.removeItem("spmPortalUser");
    localStorage.removeItem("spmPortalUserName");
    localStorage.removeItem("spmPortalRole");
    localStorage.removeItem("spm_selected_association_id");
    localStorage.removeItem("spm_selected_association_name");

    router.push("/admin-login");
  }

  async function loadOperationalRecords({ showLoading = false } = {}) {
    try {
      if (showLoading) {
        setLoadingRecords(true);
      }

      setSystemMessage("");

      const context = getSelectedAssociationContext();

      if (!context.associationId) {
        setRecords([]);
        setSystemMessage("No association selected. Please log in again.");
        return;
      }

      setAssociationName(context.associationName || "Selected Association");
      setAssociationId(context.associationId);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${encodeURIComponent(
          context.associationId
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.message || "Unable to load admin operational records."
        );
      }

      setRecords(payload.openRecords || []);
    } catch (error) {
      console.error("Unable to load admin operational records:", error);

      setSystemMessage(
        error.message || "Unable to load admin operational records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  async function archiveRecord(recordId, event) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch("/api/admin/operational-records", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: recordId,
          status: "archived",
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to archive record.");
      }

      await loadOperationalRecords({ showLoading: false });
    } catch (error) {
      console.error("Archive error:", error);
      setSystemMessage(error.message || "Unable to archive operational record.");
    }
  }

  async function deleteRecord(recordId, event) {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm("Delete this operational record permanently?");
    if (!confirmed) return;

    try {
      const response = await fetch(
  `/api/admin/operational-records?id=${recordId}&association_id=${encodeURIComponent(
    associationId
  )}`,
  {
    method: "DELETE",
  }
);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to delete record.");
      }

      await loadOperationalRecords({ showLoading: false });
    } catch (error) {
      console.error("Delete error:", error);
      setSystemMessage(error.message || "Unable to delete operational record.");
    }
  }

  const openRecords = useMemo(
    () =>
      records.filter(
        (record) =>
          !closedStatuses.includes(String(record.status || "").toLowerCase())
      ),
    [records]
  );

  const criticalRecords = useMemo(
    () =>
      openRecords.filter(
        (record) => String(record.priority || "").toLowerCase() === "critical"
      ),
    [openRecords]
  );

  const boardReviewRecords = useMemo(
    () => openRecords.filter((record) => Boolean(record.board_review_required)),
    [openRecords]
  );

  const intelligenceMetrics = [
    { label: "Association", value: associationName || "Selected", status: "Active", tone: "stable" },
    {
      label: "Open Admin Items",
      value: openRecords.length,
      status: openRecords.length > 0 ? "Needs Review" : "Clear",
      tone: openRecords.length > 0 ? "attention" : "stable",
    },
    {
      label: "Critical Items",
      value: criticalRecords.length,
      status: criticalRecords.length > 0 ? "Immediate" : "Clear",
      tone: criticalRecords.length > 0 ? "critical" : "stable",
    },
    {
      label: "Board Review",
      value: boardReviewRecords.length,
      status: boardReviewRecords.length > 0 ? "Pending" : "Clear",
      tone: boardReviewRecords.length > 0 ? "attention" : "stable",
    },
  ];

  const priorityRecords = useMemo(() => {
    const priorityRank = {
      critical: 1,
      high: 2,
      normal: 3,
      low: 4,
    };

    return [...openRecords].sort((a, b) => {
      const aRank = priorityRank[String(a.priority || "").toLowerCase()] || 5;
      const bRank = priorityRank[String(b.priority || "").toLowerCase()] || 5;

      return aRank - bRank;
    });
  }, [openRecords]);

  const displayedRecords = showAllRecords
  ? priorityRecords
  : priorityRecords.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-5xl">
              <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
                SPM Administrative Command Center
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
                ADMIN DASHBOARD
              </h1>

              <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
                Central operational control for association oversight, board activity,
                financial coordination, compliance, annual planning, and platform
                administration.
              </p>

              <p className="mt-4 text-sm font-semibold text-amber-300">
                Active Association: {associationName || "Not selected"}
              </p>

              {associationId && (
                <p className="mt-1 text-xs text-slate-500">
                  BOSai Association UUID: {associationId}
                </p>
              )}
            </div>

            <div className="w-full rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 lg:w-80">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Secure Admin Access
              </p>

              <h2 className="mt-3 text-2xl font-bold text-amber-300">
                {portalUserName}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Current Role: {String(portalRole || "admin").toUpperCase()}
              </p>

              <div className="mt-5 grid gap-3">
                <Link href="/" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-slate-200 hover:bg-white/10">
                  Homepage
                </Link>

                <Link href="/board" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-slate-200 hover:bg-white/10">
                  Board Dashboard
                </Link>

                <Link href="/portal/owner" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-slate-200 hover:bg-white/10">
                  Homeowner Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/20"
                >
                  Logout / Switch Role
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {intelligenceMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/20"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {metric.label}
                </p>

                <div className="mt-3 break-words text-2xl font-black text-amber-300">
                  {metric.value}
                </div>

                <div
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneStyle(
                    metric.tone
                  )}`}
                >
                  {metric.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-2xl shadow-black/30">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                  Priority Attention Queue
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Live Administrative Records
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                  Showing the highest-priority operational records first. Use See More
                  when deeper review is needed.
                </p>
              </div>

              <Link
                href="/admin/operations/new"
                className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20"
              >
                New Record
              </Link>
            </div>

            <div className="space-y-4">
              {loadingRecords ? (
                <div className="rounded-3xl border border-white/10 bg-[#020617]/80 p-5 text-sm text-slate-400">
                  Loading administrative records...
                </div>
              ) : priorityRecords.length === 0 ? (
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Clear
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    No open administrative alerts
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Submitted operational records will appear here when they require
                    administrative review.
                  </p>
                </div>
              ) : (
                displayedRecords.map((record) => (
                  <Link
                    key={record.id}
                    href={routeForRecord(record)}
                    className="block rounded-3xl border border-white/10 bg-[#020617]/80 p-5 transition hover:border-amber-400/30 hover:bg-white/[0.05]"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(record.priority)}`}>
                            {record.priority || "Normal"}
                          </div>

                          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                            {record.request_type || "Operational Record"}
                          </div>

                          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                            Due: {formatDate(record.due_date)}
                          </div>

                          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                            {formatStatus(record.status || "submitted")}
                          </div>

                          {record.board_review_required && (
                            <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                              Board Review
                            </div>
                          )}
                        </div>

                        <h3 className="mt-4 text-2xl font-bold">
                          {record.title}
                        </h3>

                        <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-slate-400">
                          {cleanAdminRecordDescription(record.description) ||
                            "Administrative operational record submitted for review."}
                        </p>

                        <div className="mt-4 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                            Recommended Action
                          </p>

                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {record.recommended_action ||
                              "Review this item and determine the next operational step."}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 flex-col gap-2">
                        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-center text-sm font-semibold text-amber-300">
                          Review
                        </div>

                        <button
                          onClick={(event) => archiveRecord(record.id, event)}
                          className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300 hover:bg-sky-400/20"
                        >
                          Archive
                        </button>

                        <button
                          onClick={(event) => deleteRecord(record.id, event)}
                          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {priorityRecords.length > 5 && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowAllRecords(!showAllRecords)}
                  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                >
                  {showAllRecords ? "Show Less" : "See More"}
                </button>
              </div>
            )}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Operational Health
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                System Status
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Stability indicators for the systems that support daily association
                operations and administrative control.
              </p>
            </div>

            <div className="space-y-4">
              {operationalHealth.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#020617]/60 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {item.detail}
                      </p>
                    </div>

                    <div className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${toneStyle(item.tone)}`}>
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20"
            >
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                  {section.eyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {section.title}
                </h2>

                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {section.items.map((item) => {
                  const itemHref =
  item.title === "Ava Knowledge Center"
    ? `/portal/ava/knowledge-center?associationId=${associationId}&associationName=${encodeURIComponent(
        associationName || "Selected Association"
      )}`
    : item.title === "Committee Members Center"
    ? `/board/committee-center?associationId=${associationId}&associationName=${encodeURIComponent(
        associationName || "Selected Association"
      )}`
    : item.title === "Board Signature Approval Log"
    ? `/board/signature-approval-log?associationId=${associationId}&associationName=${encodeURIComponent(
        associationName || "Selected Association"
      )}`
    : item.href;

                  return (
                    <Link
                      key={`${section.title}-${item.href}`}
                      href={itemHref}
                      className="group rounded-3xl border border-white/10 bg-[#020617]/70 p-5 transition hover:border-amber-400/30 hover:bg-white/[0.06]"
                    >
                    <div className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Live / Ready
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>

                      <span className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm font-semibold text-amber-300 transition group-hover:bg-amber-400/20">
                        Open
                      </span>
                    </div>
                  </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Administrative Operating Philosophy
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Calm control over the entire association operating system.
          </h2>

          <p className="mt-4 max-w-5xl text-sm leading-7 text-slate-300">
            This dashboard is structured around operational awareness, governance
            coordination, financial planning, compliance protection, escalation
            management, and long-term association oversight so SPM can operate as
            a true administrative command infrastructure.
          </p>
        </section>
      </section>
    </main>
  );
}

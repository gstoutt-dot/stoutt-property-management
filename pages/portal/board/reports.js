import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed"];

export default function BoardReports() {
  const [reports, setReports] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [portalRole, setPortalRole] = useState("");

  useEffect(() => {
    const role = window.localStorage.getItem("spmPortalRole") || "";
    setPortalRole(role);

    loadReports();
    loadReportRecords();

    const interval = setInterval(() => {
      loadReports();
      loadReportRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const isBoardView = portalRole === "board";

  async function loadReports() {
    try {
      setLoadingReports(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("association_board_reports")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setReports(data || []);
    } catch (error) {
      console.error("Unable to load board reports:", error);
      setReports([]);
      setSystemMessage(error.message || "Unable to load board reports.");
    } finally {
      setLoadingReports(false);
    }
  }

  async function loadReportRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load report operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("report") ||
            combined.includes("financial summary") ||
            combined.includes("management summary") ||
            combined.includes("delinquency") ||
            combined.includes("collections") ||
            combined.includes("audit") ||
            combined.includes("board summary") ||
            combined.includes("analytics"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load report operational records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  const readyReports = useMemo(
    () => reports.filter((report) => String(report.status || "").toLowerCase() === "ready"),
    [reports]
  );

  const draftReports = useMemo(
    () => reports.filter((report) => String(report.status || "").toLowerCase() === "draft"),
    [reports]
  );

  const sharedReports = useMemo(
    () => reports.filter((report) => Boolean(report.shared_at)),
    [reports]
  );

  const financialRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return (
          combined.includes("financial") ||
          combined.includes("budget") ||
          combined.includes("collections") ||
          combined.includes("delinquency") ||
          combined.includes("audit")
        );
      }),
    [operationalRecords]
  );

  const managementRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return (
          combined.includes("management") ||
          combined.includes("summary") ||
          combined.includes("report") ||
          combined.includes("analytics")
        );
      }),
    [operationalRecords]
  );

  const priorityRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        ["critical", "high"].includes(String(record.priority || "").toLowerCase())
      ),
    [operationalRecords]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">Reports</h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Board reporting, management summaries, financial review records,
              delinquency intelligence, and governance reporting activity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={isBoardView ? "/board" : "/admin"}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              {isBoardView ? "Board Dashboard" : "Admin Dashboard"}
            </Link>

            <Link
              href={isBoardView ? "/board" : "/admin"}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Main Page
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Distributed Reporting Intelligence
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Board reporting now combines formal report records with live operational intelligence.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Management reports, financial summaries, compliance activity, collections,
            audit preparation, vendor performance, maintenance trends, and association
            governance reporting can now be reviewed from one connected reporting center.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {isBoardView ? (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-200">
                Board reports are prepared by Admin or Management and routed here for board review.
              </div>
            ) : (
              <Link
                href={`/admin/operations/new?request_type=${encodeURIComponent(
                  "Management Report"
                )}&return_path=${encodeURIComponent(
                  "/portal/board/reports"
                )}&return_label=${encodeURIComponent("Board Reports")}`}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Create Report Record
              </Link>
            )}

            <Link
              href="/board/financial-review"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Financial Review
            </Link>

            {isBoardView ? (
              <>
                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200">
                  Compliance Dashboard available from Board Dashboard
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200">
                  Meeting Packet available from Board Dashboard
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/board/compliance-dashboard"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                >
                  Compliance Dashboard
                </Link>

                <Link
                  href="/portal/board/meetings"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                >
                  Meeting Packet
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Reports Ready" value={readyReports.length} />
          <Metric label="Draft Reports" value={draftReports.length} />
          <Metric label="Shared Reports" value={sharedReports.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Financial Reporting" items={financialRecords} />
          <OperationalPanel title="Management / Analytics" items={managementRecords} />
          <OperationalPanel title="Priority Reporting" items={priorityRecords} />
        </div>

        <section className="mt-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Live Report Library
              </p>

              <h2 className="mt-2 text-3xl font-bold">Board Reports</h2>
            </div>

            {isBoardView ? (
              <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-200">
                Board reports are prepared by Admin or Management and routed here for board review.
              </div>
            ) : (
              <Link
                href={`/admin/operations/new?request_type=${encodeURIComponent(
                  "Management Report"
                )}&return_path=${encodeURIComponent(
                  "/portal/board/reports"
                )}&return_label=${encodeURIComponent("Board Reports")}`}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Create Report Record
              </Link>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {loadingReports ? (
              <Empty message="Loading board reports..." />
            ) : reports.length === 0 ? (
              <Empty message="No formal board reports are currently available." />
            ) : (
              reports.map((report) => <ReportCard key={report.id} report={report} />)
            )}
          </div>
        </section>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Reporting Intelligence Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page preserves formal report visibility while adding distributed
            operational rendering from Admin Operations Intake.
          </p>
        </div>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">{title}</h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Report Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Operational Record"}</span>
                <span>•</span>
                <span>{item.status || "Submitted"}</span>
                <span>•</span>
                <span>{item.priority || "Normal"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ReportCard({ report }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
          {titleCase(report.report_type || "report")}
        </span>

        <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
          {titleCase(report.status || "draft")}
        </span>

        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
          {report.report_period || "Current Period"}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-semibold">
        {report.report_title || "Board Report"}
      </h3>

      <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">
        {report.detail || "Association board report available for review."}
      </p>

      <div className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
        <p>
          <span className="text-slate-500">Generated By:</span>{" "}
          {report.generated_by || "SPM"}
        </p>

        <p>
          <span className="text-slate-500">Created:</span>{" "}
          {formatDate(report.created_at)}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200">
          View Report
        </button>

        <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
          Download
        </button>

        <button className="rounded-full border border-emerald-400/30 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10">
          Share
        </button>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

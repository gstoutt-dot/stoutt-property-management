import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardReports() {
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadReports();

    const interval = setInterval(() => {
      loadReports();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadReports() {
  try {
    setLoadingReports(true);
    setSystemMessage("");

    const response = await fetch(
      `/api/reports/list?association_id=${encodeURIComponent(DEFAULT_ASSOCIATION_ID)}`
    );

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Unable to load association reports.");
    }

    setReports(payload.reports || []);
  } catch (error) {
    console.error("Unable to load association reports:", error);
    setReports([]);
    setSystemMessage(error.message || "Unable to load association reports.");
  } finally {
    setLoadingReports(false);
  }
}

  const readyReports = useMemo(
    () =>
      reports.filter(
        (report) => String(report.status || "").toLowerCase() === "ready"
      ),
    [reports]
  );

  const draftReports = useMemo(
    () =>
      reports.filter(
        (report) => String(report.status || "").toLowerCase() === "draft"
      ),
    [reports]
  );

  const sharedReports = useMemo(
    () => reports.filter((report) => Boolean(report.shared_at)),
    [reports]
  );

  const linkedRecords = useMemo(
    () => reports.filter((report) => Boolean(report.file_path)),
    [reports]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Board Intelligence
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Reports
              </h1>
            </div>

            <Link
              href="/board"
              className="text-lg font-medium text-white hover:text-yellow-300"
            >
              Board Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="rounded-3xl border border-yellow-300/20 bg-gradient-to-r from-slate-900 to-slate-950 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
            Board Reporting Center
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Review association reports, financial summaries, compliance activity, and board-ready operational records.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Board members can access live reporting records for management
            activity, financial visibility, maintenance performance, violation
            activity, vendor operations, and association governance review.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Total Reports" value={reports.length} />
<Metric label="Financial Reports" value={reports.filter((report) => report.report_category === "financial").length} />
<Metric label="Compliance Reports" value={reports.filter((report) => report.report_category === "compliance").length} />
<Metric label="Board-Ready Reports" value={reports.filter((report) => Boolean(report.report_url)).length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
            Live Report Library
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Board Reports
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {loadingReports ? (
            <Empty message="Loading board reports..." />
          ) : reports.length === 0 ? (
            <Empty message="No board reports are currently available." />
          ) : (
            reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

function ReportCard({ report }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
          {titleCase(report.report_type || "report")}
        </span>

        <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
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
        <button className="rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200">
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
      <div className="text-3xl font-bold text-yellow-300">{value}</div>
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

  return new Date(value).toLocaleDateString("en-US", {
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


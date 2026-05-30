import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const reportCategories = [
  "financial",
  "operations",
  "governance",
  "compliance",
  "communication",
  "reserve_study",
  "insurance",
  "engineering",
  "audit",
  "other",
];

export default function AssociationReportingCenter() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [systemMessage, setSystemMessage] = useState("");

  const [form, setForm] = useState({
    report_name: "",
    report_category: "financial",
    description: "",
    uploaded_by: "Admin",
    file: null,
  });

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);
      setSystemMessage("");

      const response = await fetch(
        `/api/reports/list?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load association reports.");
      }

      setReports(payload.reports || []);
    } catch (error) {
      console.error("Unable to load reports:", error);
      setSystemMessage(error.message || "Unable to load association reports.");
    } finally {
      setLoading(false);
    }
  }

  async function uploadReport(event) {
    event.preventDefault();

    if (!form.file) {
      setSystemMessage("Please choose a report file to upload.");
      return;
    }

    try {
      setUploading(true);
      setSystemMessage("");

      const fileBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(form.file);
      });

      const response = await fetch("/api/reports/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          report_name: form.report_name,
          report_category: form.report_category,
          description: form.description,
          uploaded_by: form.uploaded_by,
          file_name: form.file.name,
          file_type: form.file.type,
          file_base64: fileBase64,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to upload report.");
      }

      setForm({
        report_name: "",
        report_category: "financial",
        description: "",
        uploaded_by: "Admin",
        file: null,
      });

      await loadReports();
      setSystemMessage("Association report uploaded successfully.");
    } catch (error) {
      console.error("Unable to upload report:", error);
      setSystemMessage(error.message || "Unable to upload report.");
    } finally {
      setUploading(false);
    }
  }

  async function deleteReport(reportId) {
    if (!reportId) return;

    const confirmed = window.confirm("Delete this association report permanently?");
    if (!confirmed) return;

    try {
      setSystemMessage("");

      const response = await fetch(`/api/reports/delete?id=${reportId}`, {
        method: "DELETE",
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to delete report.");
      }

      setReports((current) => current.filter((report) => report.id !== reportId));
      setSystemMessage("Association report deleted.");
    } catch (error) {
      console.error("Unable to delete report:", error);
      setSystemMessage(error.message || "Unable to delete report.");
    }
  }

  async function sendReportToBoard(report) {
    if (!report?.id) return;

    try {
      setSystemMessage("");

      const response = await fetch("/api/reports/send-to-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send report to board.");
      }

      setSystemMessage("Association report sent to the Board Approval Queue.");
    } catch (error) {
      console.error("Unable to send report to board:", error);
      setSystemMessage(error.message || "Unable to send report to board.");
    }
  }

  const groupedReports = useMemo(() => {
    return reportCategories.reduce((groups, category) => {
      groups[category] = reports.filter(
        (report) =>
          String(report.report_category || "other").toLowerCase() === category
      );
      return groups;
    }, {});
  }, [reports]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Association Reporting Center
            </h1>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
              Upload, organize, open, delete, and route association reports for
              board review, including financial, operational, governance,
              compliance, insurance, reserve, engineering, and audit reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/board/board-approval-queue"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Board Approval Queue
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Association Reporting Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            A central reporting library for financial, operational, governance,
            compliance, and board-facing association reports.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Reports uploaded here remain organized by category and can be opened,
            deleted, or routed to the Board Approval Queue for formal review.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Total Reports" value={reports.length} />
          <Metric label="Financial" value={groupedReports.financial?.length || 0} />
          <Metric label="Compliance" value={groupedReports.compliance?.length || 0} />
          <Metric label="Governance" value={groupedReports.governance?.length || 0} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <form
            onSubmit={uploadReport}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
          >
            <h3 className="text-2xl font-semibold">Upload Association Report</h3>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use this for QuickBooks management reports, reserve studies,
              engineering reports, insurance reviews, audits, board reports,
              compliance records, and operational summaries.
            </p>

            <div className="mt-6 space-y-5">
              <Field label="Report Name">
                <input
                  value={form.report_name}
                  onChange={(event) =>
                    setForm({ ...form, report_name: event.target.value })
                  }
                  required
                  className="input"
                  placeholder="Example: April 2026 Management Report"
                />
              </Field>

              <Field label="Report Category">
                <select
                  value={form.report_category}
                  onChange={(event) =>
                    setForm({ ...form, report_category: event.target.value })
                  }
                  className="input"
                >
                  {reportCategories.map((category) => (
                    <option key={category} value={category}>
                      {formatCategory(category)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  rows={5}
                  className="input"
                  placeholder="Briefly describe what this report contains and why it matters."
                />
              </Field>

              <Field label="Report File">
                <input
                  type="file"
                  required
                  onChange={(event) =>
                    setForm({ ...form, file: event.target.files?.[0] || null })
                  }
                  className="input"
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.xlsx,.xls,.csv,.doc,.docx"
                />
              </Field>

              <button
                type="submit"
                disabled={uploading}
                className="w-full rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50"
              >
                {uploading ? "Uploading Report..." : "Upload Report"}
              </button>
            </div>
          </form>

          <section>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Report Library
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Association Reports
                </h2>
              </div>

              <button
                onClick={loadReports}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Refresh Reports
              </button>
            </div>

            <div className="space-y-6">
              {loading ? (
                <Empty message="Loading association reports..." />
              ) : reports.length === 0 ? (
                <Empty message="No association reports have been uploaded yet." />
              ) : (
                reportCategories.map((category) => {
                  const items = groupedReports[category] || [];
                  if (items.length === 0) return null;

                  return (
                    <div
                      key={category}
                      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
                    >
                      <h3 className="text-xl font-semibold text-amber-200">
                        {formatCategory(category)}
                      </h3>

                      <div className="mt-5 grid gap-4">
                        {items.map((report) => (
                          <ReportCard
                            key={report.id}
                            report={report}
                            onDelete={deleteReport}
                            onSendToBoard={sendReportToBoard}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </section>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(15, 23, 42, 0.9);
          padding: 0.85rem 1rem;
          color: white;
          outline: none;
        }

        .input:focus {
          border-color: rgba(251, 191, 36, 0.45);
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.08);
        }

        option {
          background: #020617;
          color: white;
        }
      `}</style>
    </main>
  );
}

function ReportCard({ report, onDelete, onSendToBoard }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge>{formatCategory(report.report_category)}</Badge>
            <Badge>{formatFileType(report.report_type)}</Badge>
            <Badge>{formatDate(report.uploaded_at)}</Badge>
          </div>

          <h4 className="mt-4 text-xl font-semibold text-white">
            {report.report_name}
          </h4>

          <p className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-6 text-slate-300">
            {report.description || "No report description provided."}
          </p>

          <p className="mt-3 text-xs text-slate-500">
            File: {report.report_file_name || "Report file"}
          </p>
        </div>

        <div className="flex min-w-[180px] flex-wrap gap-2 lg:justify-end">
          {report.report_url && (
            <a
              href={report.report_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 hover:bg-blue-500/20"
            >
              Open
            </a>
          )}

          <button
            onClick={() => onSendToBoard(report)}
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Send to Board
          </button>

          <button
            onClick={() => onDelete(report.id)}
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </span>
      {children}
    </label>
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

function Badge({ children }) {
  return (
    <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
      {children}
    </span>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatCategory(value = "") {
  return String(value || "other")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatFileType(value = "") {
  const type = String(value || "file").toLowerCase();

  if (type.includes("pdf")) return "PDF";
  if (type.includes("image")) return "Image";
  if (type.includes("spreadsheet") || type.includes("excel")) return "Spreadsheet";
  if (type.includes("word") || type.includes("document")) return "Document";

  return "File";
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

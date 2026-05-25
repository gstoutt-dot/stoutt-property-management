import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function ManagementAccountingReports() {
  const [reports, setReports] = useState([]);
  const [balanceSheetRows, setBalanceSheetRows] = useState([]);
  const [balanceSheetMeta, setBalanceSheetMeta] = useState(null);

  const [loading, setLoading] = useState(true);
  const [balanceSheetLoading, setBalanceSheetLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadReports();
    loadBalanceSheet();
  }, []);

  async function loadReports() {
    setLoading(true);
    setSystemMessage("");

    const { data, error } = await supabase
      .from("financial_reports")
      .select("*")
      .eq("association_id", DEFAULT_ASSOCIATION_ID)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Unable to load management accounting reports:", error);
      setReports([]);
      setSystemMessage(
        "Management accounting reports table is not available yet."
      );
    } else {
      setReports(data || []);
    }

    setLoading(false);
  }

  async function loadBalanceSheet() {
    setBalanceSheetLoading(true);

    try {
      const response = await fetch(
        `/api/accounting/quickbooks/balance-sheet?association_id=${DEFAULT_ASSOCIATION_ID}&end_date=2026-04-30`
      );

      const json = await response.json();

      if (!json.success) {
        console.error("Balance sheet load failed:", json);
        setBalanceSheetRows([]);
        setBalanceSheetLoading(false);
        return;
      }

      setBalanceSheetRows(Array.isArray(json.rows) ? json.rows : []);

      setBalanceSheetMeta({
        reportName: json.report_name || "Balance Sheet",
        basis: json.report_basis || "Accrual",
        startPeriod: json.start_period || null,
        endPeriod: json.end_period || null,
        currency: json.currency || "USD",
        generatedAt: json.generated_at || null,
      });
    } catch (error) {
      console.error("Unable to load balance sheet:", error);
      setBalanceSheetRows([]);
    }

    setBalanceSheetLoading(false);
  }

  async function markReviewed(reportId) {
    const { error } = await supabase
      .from("financial_reports")
      .update({
        report_status: "reviewed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", reportId);

    if (error) {
      console.error("Unable to mark report reviewed:", error);
      setSystemMessage("Unable to mark report reviewed.");
      return;
    }

    await loadReports();
  }

  const readyReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          String(report.report_status || "").toLowerCase() !== "reviewed"
      ),
    [reports]
  );

  const reviewedReports = useMemo(
    () =>
      reports.filter(
        (report) =>
          String(report.report_status || "").toLowerCase() === "reviewed"
      ),
    [reports]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Financial Reporting
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Management Accounting Reports
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Dashboard</Link>
            <Link href="/board/financial-review">Financial Review</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            QuickBooks Management Reports
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Monthly accounting reports prepared for board review.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Board-safe financial reporting rendered inside SPM from
            QuickBooks-connected accounting data without exposing board members
            to the QuickBooks account.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Metric label="Reports Available" value={reports.length} />
          <Metric label="Ready for Review" value={readyReports.length} />
          <Metric label="Reviewed" value={reviewedReports.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-emerald-100">
                Live QuickBooks Balance Sheet
              </h3>

              <p className="mt-2 text-sm text-emerald-100/70">
                Board-level balance sheet rendered directly from QuickBooks.
              </p>
            </div>

            <button
              onClick={loadBalanceSheet}
              className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-400/20"
            >
              Refresh Balance Sheet
            </button>
          </div>

          {balanceSheetMeta && (
            <div className="mt-5 grid gap-4 rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5 text-sm text-emerald-100/80 md:grid-cols-4">
              <Info label="Report" value={balanceSheetMeta.reportName} />
              <Info label="Basis" value={balanceSheetMeta.basis} />
              <Info label="Period End" value={balanceSheetMeta.endPeriod} />
              <Info label="Currency" value={balanceSheetMeta.currency} />
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-slate-950/60 p-5">
            {balanceSheetLoading ? (
              <Empty message="Loading QuickBooks Balance Sheet..." />
            ) : balanceSheetRows.length === 0 ? (
              <Empty message="No balance sheet data is currently available." />
            ) : (
              <div className="space-y-2">
                {balanceSheetRows.map((row, index) => (
                  <BalanceSheetRow
                    key={`${row.type}-${row.name}-${index}`}
                    row={row}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">
                Management Accounting Reports Queue
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Stored board-ready accounting packets and monthly financial
                report references.
              </p>
            </div>

            <button
              onClick={loadReports}
              className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-200 hover:bg-amber-400/20"
            >
              Refresh Reports
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <Empty message="Loading management accounting reports..." />
            ) : reports.length === 0 ? (
              <Empty message="No stored management accounting reports are currently available." />
            ) : (
              reports.map((report) => (
                <div
                  key={report.id}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                    {formatStatus(report.report_status)} ·{" "}
                    {report.report_period || "Current Period"}
                  </p>

                  <h4 className="mt-2 text-lg font-semibold">
                    {report.report_name || "Management Accounting Report"}
                  </h4>

                  <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
                    <Info
                      label="Report Type"
                      value={report.report_type || "Management Report"}
                    />
                    <Info
                      label="Generated"
                      value={formatDate(report.generated_at)}
                    />
                    <Info
                      label="Last Synced"
                      value={formatDate(report.synced_at)}
                    />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {report.quickbooks_report_url ? (
                      <a
                        href={report.quickbooks_report_url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950"
                      >
                        Preview Report
                      </a>
                    ) : (
                      <span className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-slate-400">
                        No external report link
                      </span>
                    )}

                    {String(report.report_status || "").toLowerCase() !==
                      "reviewed" && (
                      <button
                        onClick={() => markReviewed(report.id)}
                        className="rounded-2xl border border-emerald-300/30 bg-emerald-400/10 px-5 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/20"
                      >
                        Mark Reviewed
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function BalanceSheetRow({ row }) {
  const depth = Number(row?.depth || 0);
  const paddingLeft = `${depth * 18}px`;
  const rowType = String(row?.type || "row").toLowerCase();

  const isHeader = rowType === "header";
  const isSummary = rowType === "summary";

  let rowClass =
    "border border-white/5 bg-slate-900/70 text-slate-200";

  if (isHeader) {
    rowClass = "bg-emerald-400/10 font-bold text-emerald-100";
  }

  if (isSummary) {
    rowClass = "bg-amber-400/10 font-semibold text-amber-200";
  }

  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${rowClass}`}
    >
      <div style={{ paddingLeft }}>{row?.name || ""}</div>

      <div className="font-mono">
        {formatReportAmount(row?.amount)}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value || "Pending"}</p>
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

function formatStatus(value) {
  return String(value || "Ready For Board Review")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDate(value) {
  if (!value) return "Pending";

  try {
    return new Date(value).toLocaleString();
  } catch {
    return "Pending";
  }
}

function formatReportAmount(value) {
  if (value === null || value === undefined || value === "") return "";

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return String(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

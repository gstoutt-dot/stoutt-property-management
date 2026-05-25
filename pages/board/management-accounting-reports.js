import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function ManagementAccountingReports() {
const [reports, setReports] = useState([]);
const [balanceSheet, setBalanceSheet] = useState([]);
const [balanceSheetMeta, setBalanceSheetMeta] = useState(null);

const [loading, setLoading] = useState(true);
const [balanceSheetLoading, setBalanceSheetLoading] = useState(true);

const [systemMessage, setSystemMessage] = useState("");
  useEffect(() => {
    loadReports();
    loadBalanceSheet();
  }, []);

  async function loadReports() {
  async function loadBalanceSheet() {
  setBalanceSheetLoading(true);

  try {
    const response = await fetch(
      `/api/accounting/quickbooks/balance-sheet?association_id=${DEFAULT_ASSOCIATION_ID}&end_date=2026-04-30`
    );

    const json = await response.json();

    if (!json.success) {
      console.error("Balance sheet load failed:", json);
      setBalanceSheet([]);
      return;
    }

    setBalanceSheet(json.rows || []);

    setBalanceSheetMeta({
      report_name: json.report_name,
      basis: json.report_basis,
      end_period: json.end_period,
      currency: json.currency,
    });
  } catch (error) {
    console.error("Unable to load balance sheet:", error);
    setBalanceSheet([]);
  }

  setBalanceSheetLoading(false);
}
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
            This page is reserved for board-level accounting packets, monthly
            financial reports, QuickBooks management reports, treasurer review,
            reserve reporting, and future audit-ready financial documents.
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

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold">
                Management Accounting Reports Queue
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Board-ready accounting reports connected to the Sunset
                Condominium Association financial review process.
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
              <Empty message="No management accounting reports are currently available." />
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
                    <Info label="Report Type" value={report.report_type || "Management Report"} />
                    <Info label="Generated" value={formatDate(report.generated_at)} />
                    <Info label="Last Synced" value={formatDate(report.synced_at)} />
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
                      <a
                        href="https://qbo.intuit.com/app/managementreports"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950"
                      >
                        Open QuickBooks Reports
                      </a>
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
      <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <h3 className="text-2xl font-semibold text-emerald-100">
        Live QuickBooks Balance Sheet
      </h3>

      <p className="mt-2 text-sm text-emerald-100/70">
        Board-level accounting visibility rendered directly from QuickBooks.
      </p>
    </div>

    {balanceSheetMeta && (
      <div className="text-sm text-emerald-100/70">
        <p>
          Basis: {balanceSheetMeta.basis}
        </p>

        <p>
          Through: {balanceSheetMeta.end_period}
        </p>
      </div>
    )}
  </div>

  <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-slate-950/60 p-5">
    {balanceSheetLoading ? (
      <p className="text-sm text-slate-400">
        Loading QuickBooks Balance Sheet...
      </p>
    ) : balanceSheet.length === 0 ? (
      <p className="text-sm text-slate-400">
        No balance sheet data available.
      </p>
    ) : (
      <div className="space-y-2">
        {balanceSheet.map((row, index) => {
          const paddingLeft = `${row.depth * 20}px`;

          const isHeader = row.type === "header";
          const isSummary = row.type === "summary";

          return (
            <div
              key={`${row.name}-${index}`}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                isHeader
                  ? "bg-emerald-400/10 font-bold text-emerald-100"
                  : isSummary
                  ? "bg-amber-400/10 font-semibold text-amber-200"
                  : "border border-white/5 bg-slate-900/70 text-slate-200"
              }`}
            >
              <div style={{ paddingLeft }}>
                {row.name}
              </div>

              <div className="font-mono">
                {row.amount || ""}
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</div>
      </section>
    </main>
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
      <p className="mt-1 font-semibold text-white">{value}</p>
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

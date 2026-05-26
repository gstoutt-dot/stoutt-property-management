import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const REPORT_TABS = [
  const REPORT_TABS = [
  { key: "balance-sheet", label: "Balance Sheet" },
  { key: "profit-loss", label: "Profit & Loss" },
  { key: "budget-vs-actual", label: "Budget vs Actual" },
  { key: "ar-aging", label: "A/R Aging" },
];

export default function ManagementAccountingReports() {
  const [activeTab, setActiveTab] = useState("balance-sheet");
  const [reportRows, setReportRows] = useState([]);
  const [reportMeta, setReportMeta] = useState(null);
  const [reportLoading, setReportLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  const activeReport = REPORT_TABS.find((tab) => tab.key === activeTab);

  useEffect(() => {
    loadReport(activeTab);
  }, [activeTab]);

  async function loadReport(tabKey) {
    setReportLoading(true);
    setSystemMessage("");

    const tab = REPORT_TABS.find((item) => item.key === tabKey);

    if (!tab) {
      setReportRows([]);
      setReportMeta(null);
      setReportLoading(false);
      return;
    }

    try {
      const response = await fetch(
  `/api/accounting/quickbooks/board-report-snapshot?association_id=${DEFAULT_ASSOCIATION_ID}&report_key=${tab.key}`
);

      const json = await response.json();

      if (!json.success) {
        console.error("QuickBooks report failed:", json);
        setReportRows([]);
        setReportMeta(null);
        setSystemMessage("Unable to load this QuickBooks report.");
        setReportLoading(false);
        return;
      }

      const rows = Array.isArray(json.rows) ? json.rows : [];

      const normalizedRows = rows.map((row) => ({
        ...row,
        displayColumns: Array.isArray(row.columns)
          ? row.columns
          : row.amount !== null && row.amount !== undefined && row.amount !== ""
          ? [row.amount]
          : [],
      }));

      const maxColumns = Math.max(
        1,
        ...normalizedRows.map((row) =>
          Array.isArray(row.displayColumns) ? row.displayColumns.length : 0
        )
      );

      const apiColumns = Array.isArray(json.columns) ? json.columns : [];

      const columnTitles =
        apiColumns.length > 0
          ? apiColumns.map((column) => column.title || "")
          : maxColumns === 1
          ? ["Total"]
          : Array.from({ length: maxColumns }).map((_, index) => `Column ${index + 1}`);

      setReportRows(normalizedRows);

      setReportMeta({
        reportName: json.report_name || tab.label,
        basis: json.report_basis || "Accrual",
        startPeriod: json.start_period || null,
        endPeriod: json.end_period || null,
        currency: json.currency || "USD",
        columns: columnTitles,
        maxColumns,
      });
    } catch (error) {
      console.error("Unable to load report:", error);
      setReportRows([]);
      setReportMeta(null);
      setSystemMessage("Unable to load this QuickBooks report.");
    }

    setReportLoading(false);
  }

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
            QuickBooks Financial Reporting
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Executive Board Accounting Visibility
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Live HOA financial reporting rendered directly from QuickBooks while keeping board members inside the SPM platform.
          </p>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <div className="flex flex-wrap gap-3">
            {REPORT_TABS.map((tab) => {
              const active = tab.key === activeTab;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-emerald-300 text-slate-950"
                      : "border border-white/10 bg-slate-900/70 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {reportMeta && (
            <div className="mt-6 grid gap-4 rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5 text-sm text-emerald-100/80 md:grid-cols-4">
              <Info label="Report" value={reportMeta.reportName} />
              <Info label="Basis" value={reportMeta.basis} />
              <Info label="Period End" value={reportMeta.endPeriod} />
              <Info label="Currency" value={reportMeta.currency} />
            </div>
          )}

          <div className="mt-6 overflow-x-auto rounded-2xl border border-emerald-300/20 bg-slate-950/60 p-5">
            {reportLoading ? (
              <Empty message="Loading QuickBooks report..." />
            ) : reportRows.length === 0 ? (
              <Empty message="No report data available." />
            ) : (
              <div className="space-y-2">
                <ReportHeader columns={reportMeta?.columns || ["Total"]} />

                {reportRows.map((row, index) => (
                  <ReportRow
                    key={`${row.type}-${row.name}-${index}`}
                    row={row}
                    maxColumns={reportMeta?.maxColumns || 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ReportHeader({ columns }) {
  return (
    <div
      className="grid min-w-[1150px] items-center gap-4 rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400"
      style={{
        gridTemplateColumns: `minmax(420px, 1.8fr) repeat(${columns.length}, minmax(130px, 1fr))`,
      }}
    >
      <div>Account / Category</div>

      {columns.map((column, index) => (
        <div key={index} className="text-right">
          {column || `Column ${index + 1}`}
        </div>
      ))}
    </div>
  );
}

function ReportRow({ row, maxColumns }) {
  const depth = Number(row?.depth || 0);
  const paddingLeft = `${depth * 22}px`;

  const rowType = String(row?.type || "row").toLowerCase();
  const isHeader = rowType === "header";
  const isSummary = rowType === "summary";

  let rowClass = "border border-white/5 bg-slate-900/70 text-slate-200";

  if (isHeader) {
    rowClass = "bg-emerald-400/10 font-bold text-emerald-100";
  }

  if (isSummary) {
    rowClass = "bg-amber-400/10 font-semibold text-amber-200";
  }

  const columns = Array.isArray(row?.displayColumns) ? row.displayColumns : [];

  return (
    <div
      className={`grid min-w-[1150px] items-center gap-4 rounded-xl px-4 py-3 text-sm ${rowClass}`}
      style={{
        gridTemplateColumns: `minmax(420px, 1.8fr) repeat(${maxColumns}, minmax(130px, 1fr))`,
      }}
    >
      <div style={{ paddingLeft }}>{row?.name || ""}</div>

      {Array.from({ length: maxColumns }).map((_, index) => (
        <div key={index} className="text-right font-mono">
          {formatValue(columns[index])}
        </div>
      ))}
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

function formatValue(value) {
  if (value === null || value === undefined || value === "") return "";

  const stringValue = String(value).trim();

  if (stringValue.includes("%")) return stringValue;

  const numeric = Number(stringValue.replace(/,/g, ""));

  if (!Number.isFinite(numeric)) return stringValue;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numeric);
}

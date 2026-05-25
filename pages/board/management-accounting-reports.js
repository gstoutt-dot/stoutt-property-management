import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const REPORT_TABS = [
  {
    key: "balance-sheet",
    label: "Balance Sheet",
    endpoint:
      "/api/accounting/quickbooks/balance-sheet",
  },
  {
    key: "profit-loss",
    label: "Profit & Loss",
    endpoint:
      "/api/accounting/quickbooks/profit-and-loss",
  },
  {
    key: "budget-vs-actual",
    label: "Budget vs Actual",
    endpoint:
      "/api/accounting/quickbooks/budget-vs-actual",
  },
  {
    key: "ar-aging",
    label: "A/R Aging",
    endpoint:
      "/api/accounting/quickbooks/ar-aging",
  },
  {
    key: "ap-aging",
    label: "A/P Aging",
    endpoint:
      "/api/accounting/quickbooks/ap-aging",
  },
];

export default function ManagementAccountingReports() {
  const [reports, setReports] = useState([]);

  const [activeTab, setActiveTab] = useState("balance-sheet");

  const [reportRows, setReportRows] = useState([]);
  const [reportMeta, setReportMeta] = useState(null);

  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(true);

  const [systemMessage, setSystemMessage] = useState("");

  const activeReport = useMemo(
    () =>
      REPORT_TABS.find((tab) => tab.key === activeTab),
    [activeTab]
  );

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    if (activeReport) {
      loadReport(activeReport.endpoint);
    }
  }, [activeReport]);

  async function loadReports() {
    setLoading(true);

    const { data, error } = await supabase
      .from("financial_reports")
      .select("*")
      .eq(
        "association_id",
        DEFAULT_ASSOCIATION_ID
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      setSystemMessage(
        "Management accounting reports table is not available yet."
      );

      setReports([]);
    } else {
      setReports(data || []);
    }

    setLoading(false);
  }

  async function loadReport(endpoint) {
    setReportLoading(true);

    try {
      const response = await fetch(
        `${endpoint}?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const json = await response.json();

      if (!json.success) {
        console.error(json);

        setReportRows([]);

        setReportMeta(null);

        setReportLoading(false);

        return;
      }

      setReportRows(
        Array.isArray(json.rows)
          ? json.rows
          : []
      );

      setReportMeta({
        reportName:
          json.report_name || "Report",
        basis:
          json.report_basis || "Accrual",
        startPeriod:
          json.start_period || null,
        endPeriod:
          json.end_period || null,
        currency:
          json.currency || "USD",
      });
    } catch (error) {
      console.error(error);

      setReportRows([]);
      setReportMeta(null);
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
            <Link href="/board">
              Board Dashboard
            </Link>

            <Link href="/board/financial-review">
              Financial Review
            </Link>
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
            Live HOA financial reporting rendered
            directly from QuickBooks while keeping
            board members inside the SPM platform.
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
              const active =
                tab.key === activeTab;

              return (
                <button
                  key={tab.key}
                  onClick={() =>
                    setActiveTab(tab.key)
                  }
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
              <Info
                label="Report"
                value={reportMeta.reportName}
              />

              <Info
                label="Basis"
                value={reportMeta.basis}
              />

              <Info
                label="Period End"
                value={reportMeta.endPeriod}
              />

              <Info
                label="Currency"
                value={reportMeta.currency}
              />
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-slate-950/60 p-5">
            {reportLoading ? (
              <Empty message="Loading QuickBooks report..." />
            ) : reportRows.length === 0 ? (
              <Empty message="No report data available." />
            ) : (
              <div className="space-y-2">
                {reportRows.map(
                  (row, index) => (
                    <ReportRow
                      key={`${row.type}-${row.name}-${index}`}
                      row={row}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ReportRow({ row }) {
  const depth = Number(row?.depth || 0);

  const paddingLeft = `${depth * 18}px`;

  const rowType = String(
    row?.type || "row"
  ).toLowerCase();

  const isHeader = rowType === "header";

  const isSummary = rowType === "summary";

  let rowClass =
    "border border-white/5 bg-slate-900/70 text-slate-200";

  if (isHeader) {
    rowClass =
      "bg-emerald-400/10 font-bold text-emerald-100";
  }

  if (isSummary) {
    rowClass =
      "bg-amber-400/10 font-semibold text-amber-200";
  }

  return (
    <div
      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${rowClass}`}
    >
      <div style={{ paddingLeft }}>
        {row?.name || ""}
      </div>

      <div className="flex gap-8 font-mono text-right">
        {Array.isArray(row?.columns) &&
        row.columns.length > 0 ? (
          row.columns.map(
            (column, index) => (
              <div key={index}>
                {formatValue(column)}
              </div>
            )
          )
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-white">
        {value || "Pending"}
      </p>
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
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "";
  }

  const numeric = Number(
    String(value).replace(/,/g, "")
  );

  if (!Number.isFinite(numeric)) {
    return String(value);
  }

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
    }
  ).format(numeric);
}

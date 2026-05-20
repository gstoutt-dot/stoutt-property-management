import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed"];

export default function BoardFinancials() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadFinancialRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadFinancialRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadFinancialRecords({ showLoading = false } = {}) {
    try {
      if (showLoading) setLoadingRecords(true);

      setSystemMessage("");

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load financial records.");
      }

      const financialRecords = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("financial") ||
            combined.includes("budget") ||
            combined.includes("collections") ||
            combined.includes("delinquency") ||
            combined.includes("invoice") ||
            combined.includes("payment") ||
            combined.includes("reserve") ||
            combined.includes("audit") ||
            combined.includes("assessment"))
        );
      });

      setRecords(financialRecords);
    } catch (error) {
      console.error("Unable to load board financial records:", error);
      setSystemMessage(error.message || "Unable to load financial records.");
    } finally {
      setLoadingRecords(false);
    }
  }

  const budgetRecords = useMemo(
    () =>
      records.filter((record) =>
        `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
          .toLowerCase()
          .includes("budget")
      ),
    [records]
  );

  const collectionsRecords = useMemo(
    () =>
      records.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return (
          combined.includes("collections") ||
          combined.includes("delinquency") ||
          combined.includes("assessment")
        );
      }),
    [records]
  );

  const paymentRecords = useMemo(
    () =>
      records.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return (
          combined.includes("payment") ||
          combined.includes("invoice") ||
          combined.includes("vendor")
        );
      }),
    [records]
  );

  const priorityRecords = useMemo(
    () =>
      records.filter((record) =>
        ["critical", "high"].includes(String(record.priority || "").toLowerCase())
      ),
    [records]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Financials
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Board financial visibility, budget review, collections oversight,
              payment review, and accounting-related operational records.
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
              href="/board"
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
            Distributed Financial Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Board financial review now renders live accounting and operational finance records.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Budget planning, collections review, delinquency oversight, reserve matters,
            invoice review, vendor payments, assessments, and audit preparation can now
            flow through the centralized Admin Operations Intake system.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Financial Review"
              )}&return_path=${encodeURIComponent(
                "/portal/board/financials"
              )}&return_label=${encodeURIComponent("Board Financials")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Financial Record
            </Link>

            <Link
              href="/board/financial-review"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Financial Review
            </Link>

            <Link
              href="/portal/board/reports"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Reports
            </Link>

            <Link
              href="/board/meeting-packet"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meeting Packet
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Financial Records" value={records.length} />
          <Metric label="Budget Items" value={budgetRecords.length} />
          <Metric label="Collections" value={collectionsRecords.length} />
          <Metric label="Priority Review" value={priorityRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Budget / Reserve Items" items={budgetRecords} />
          <OperationalPanel title="Collections / Delinquency" items={collectionsRecords} />
          <OperationalPanel title="Payments / Invoices" items={paymentRecords} />
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Financial Operations Feed
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Board Financial Records
              </h2>
            </div>

            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Financial Review"
              )}&return_path=${encodeURIComponent(
                "/portal/board/financials"
              )}&return_label=${encodeURIComponent("Board Financials")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Financial Record
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-5 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>Type</span>
              <span>Status</span>
              <span>Assigned</span>
              <span>Due</span>
              <span>Priority</span>
            </div>

            {loadingRecords ? (
              <div className="p-6 text-sm text-slate-400">
                Loading financial records...
              </div>
            ) : records.length === 0 ? (
              <div className="p-6 text-sm text-slate-400">
                No financial records found. Use Create Financial Record to add a board finance item.
              </div>
            ) : (
              records.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 border-t border-white/10 px-4 py-4 text-sm"
                >
                  <span>{item.request_type || "Financial Review"}</span>
                  <span>{item.status || "Submitted"}</span>
                  <span>{item.assigned_to || "Unassigned"}</span>
                  <span>{formatDate(item.due_date)}</span>
                  <span>{item.priority || "Normal"}</span>
                </div>
              ))
            )}
          </div>
        </section>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Financial Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            Board Financials is now aligned with the centralized operational
            record architecture while keeping QuickBooks-connected accounting
            visibility separate and protected.
          </p>
        </div>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">
        {title}
      </h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
            >
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Financial Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Financial Review"}</span>
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

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-300">
        {label}
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "No due date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "No due date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

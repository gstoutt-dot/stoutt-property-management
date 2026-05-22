import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import bosTheme from "../../styles/bos-theme";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed"];

function formatCurrency(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(amount) ? amount : 0);
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

function priorityBadge(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "critical") return "Critical Priority";
  if (value === "high") return "High Priority";
  if (value === "medium") return "Medium Priority";
  if (value === "normal") return "Normal Priority";

  return "Board Priority";
}

export default function BoardDashboard() {
  const [records, setRecords] = useState([]);
  const [financialSummary, setFinancialSummary] = useState(null);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadBoardDashboardData();

    const interval = setInterval(() => {
      loadBoardDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadBoardDashboardData() {
    await Promise.all([loadBoardRecords(), loadFinancialSummary()]);
  }

  async function loadBoardRecords() {
    try {
      setLoadingRecords(true);
      setSystemMessage("");

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load board records.");
      }

      setRecords(payload.openRecords || []);
    } catch (error) {
      console.error("Unable to load board records:", error);
      setSystemMessage(error.message || "Unable to load board records.");
      setRecords([]);
    } finally {
      setLoadingRecords(false);
    }
  }

  async function loadFinancialSummary() {
    try {
      const response = await fetch(
        `/api/accounting/quickbooks/financial-summary?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to load financial summary.");
      }

      setFinancialSummary(payload || null);
    } catch (error) {
      console.warn("Unable to load board financial summary:", error);
      setFinancialSummary(null);
    }
  }

  const boardRecords = useMemo(() => {
    return records
      .filter((record) => {
        const status = String(record.status || "").toLowerCase();
        const assignedTo = String(record.assigned_to || "").toLowerCase();
        const target = String(record.routing_target || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (Boolean(record.board_review_required) ||
            assignedTo.includes("board") ||
            target.includes("board"))
        );
      })
      .slice(0, 6);
  }, [records]);

  const vendorPaymentRecords = useMemo(() => {
    return boardRecords.filter((record) => {
      const combined = `${record.request_type || ""} ${record.title || ""} ${
        record.description || ""
      }`.toLowerCase();

      return (
        combined.includes("vendor") ||
        combined.includes("payment") ||
        combined.includes("invoice")
      );
    });
  }, [boardRecords]);

  const violationRecords = useMemo(() => {
    return boardRecords.filter((record) => {
      const combined = `${record.request_type || ""} ${record.title || ""} ${
        record.description || ""
      }`.toLowerCase();

      return combined.includes("violation") || combined.includes("compliance");
    });
  }, [boardRecords]);

  const approvalRecords = useMemo(() => {
    return boardRecords.filter((record) => {
      const combined = `${record.request_type || ""} ${record.title || ""} ${
        record.description || ""
      } ${record.status || ""}`.toLowerCase();

      return (
        combined.includes("approval") ||
        combined.includes("approve") ||
        combined.includes("review") ||
        combined.includes("vote")
      );
    });
  }, [boardRecords]);

  const ownerAccounts =
    financialSummary?.accounts_needing_attention ||
    financialSummary?.accountsNeedingAttention ||
    [];

  const totalOutstanding =
    financialSummary?.total_outstanding_balance ||
    financialSummary?.totalOutstandingBalance ||
    ownerAccounts.reduce((sum, item) => {
      const value = Number(
        item.current_balance ?? item.currentBalance ?? item.balance ?? 0
      );

      return Number.isFinite(value) ? sum + value : sum;
    }, 0);

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board of Directors Portal</p>

              <h1 className={bosTheme.title}>Executive Dashboard</h1>

              <p className={bosTheme.subtitle}>
                Review manager-verified items, monitor board-level financial
                visibility, track routed operational records, and coordinate
                association decisions from one board-safe control center.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/board" className={bosTheme.secondaryButton}>
                Main Board Page
              <Link
  href="/board/board-approval-queue"
  className={bosTheme.primaryButton}
>
  Approval Queue
</Link>
            </div>
          </div>
        </header>

        {systemMessage && (
          <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Pending Approvals", approvalRecords.length, "Require board action"],
            ["Vendor Payments", vendorPaymentRecords.length, "Awaiting visibility"],
            ["Open Violations", violationRecords.length, "Board awareness"],
            ["Routed Board Items", boardRecords.length, "Live admin-routed records"],
          ].map(([label, value, detail]) => (
            <div key={label} className={bosTheme.statCard}>
              <p className="text-sm text-slate-400">{label}</p>

              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-4xl font-semibold">{value}</h2>
                <span className={bosTheme.statDot} />
              </div>

              <p className="mt-3 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Board Action Queue</h2>

                <p className="mt-1 text-sm text-slate-400">
                  Live records routed by Admin or Management for board review.
                </p>
              </div>

              <Link
                href="/board/board-approval-queue"
                className="rounded-2xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
              >
                View All
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {loadingRecords ? (
                <div className="rounded-3xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
                  Loading board action queue...
                </div>
              ) : boardRecords.length === 0 ? (
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                  <p className="text-sm font-semibold text-emerald-300">
                    No board action items are currently open.
                  </p>

                  <p className="mt-2 text-sm text-slate-300">
                    Items created by Admin or Management and routed to the board
                    will appear here automatically.
                  </p>
                </div>
              ) : (
                boardRecords.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl border border-white/10 bg-black/20 p-5"
                  >
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className={bosTheme.badgeNeutral}>
                            {item.id}
                          </span>

                          <span className={bosTheme.badgeGold}>
                            {item.request_type || "Board Record"}
                          </span>

                          <span className={bosTheme.badgeAmber}>
                            {priorityBadge(item.priority)}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold">
                          {item.title || "Board Review Item"}
                        </h3>

                        <p className="mt-2 text-sm text-slate-400">
                          {item.association_name || "Sunset Condominium Association"} ·{" "}
                          Due: {formatDate(item.due_date)} ·{" "}
                          {item.status || "Submitted"}
                        </p>

                        {item.recommended_action && (
                          <p className="mt-3 text-sm leading-6 text-slate-300">
                            {item.recommended_action}
                          </p>
                        )}
                      </div>

                      <Link
                        href="/board/board-approval-queue"
                        className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm font-medium text-slate-200 hover:bg-white/[0.1]"
                      >
                        Review
                      </Link>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Executive Snapshot
            </p>

            <div className="mt-5 space-y-4">
              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Outstanding Balance</p>
                <p className={bosTheme.detailValue}>
                  {formatCurrency(totalOutstanding)}
                </p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Accounts Needing Attention</p>
                <p className={bosTheme.detailValue}>
                  {Array.isArray(ownerAccounts) ? ownerAccounts.length : 0}
                </p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Board Routed Items</p>
                <p className={bosTheme.detailValue}>
                  {boardRecords.length} Active
                </p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>QuickBooks Mirror</p>
                <p className={bosTheme.detailValue}>
                  {financialSummary ? "Active" : "Pending"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link href="/board/financial-review" className={bosTheme.goldButton}>
                View Financials
              <Link
  href="/board/board-approval-queue"
  className={bosTheme.whiteButton}
>
  Approval Queue
</Link>

              <Link href="/board/notification-center" className={bosTheme.outlineButton}>
                Notifications
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

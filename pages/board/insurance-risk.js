import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

const riskWorkflow = [
  "Identify insurance, claim, incident, or exposure issue",
  "Collect supporting documentation and timeline",
  "Determine whether carrier, attorney, board, or vendor review is required",
  "Track renewal dates, risk response, and follow-up responsibility",
  "Document final action and archive risk record",
];

const futureFeeds = [
  "Insurance Renewal Tracking",
  "Claim Event Monitoring",
  "Incident Log Feed",
  "Exposure Risk Dashboard",
];

function priorityStyle(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "critical") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  if (value === "high") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  if (value === "normal") {
    return "border-sky-400/30 bg-sky-400/10 text-sky-300";
  }

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

export default function InsuranceRisk() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadRiskRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadRiskRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadRiskRecords({ showLoading = false } = {}) {
    try {
      if (showLoading) {
        setLoadingRecords(true);
      }

      setSystemMessage("");

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.message || "Unable to load insurance and risk records."
        );
      }

      const riskRecords = (payload.openRecords || []).filter((record) => {
        const requestType = String(record.request_type || "").toLowerCase();
        const status = String(record.status || "").toLowerCase();

        return (
          (requestType.includes("insurance") || requestType.includes("risk")) &&
          !closedStatuses.includes(status)
        );
      });

      setRecords(riskRecords);
    } catch (error) {
      console.error("Unable to load insurance and risk records:", error);
      setSystemMessage(
        error.message || "Unable to load insurance and risk records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  const boardReviewCount = useMemo(
    () => records.filter((record) => Boolean(record.board_review_required)).length,
    [records]
  );

  const highPriorityCount = useMemo(
    () =>
      records.filter((record) =>
        ["critical", "high"].includes(
          String(record.priority || "").toLowerCase()
        )
      ).length,
    [records]
  );

  const vendorVisibleCount = useMemo(
    () => records.filter((record) => Boolean(record.vendor_visible)).length,
    [records]
  );

  const nextDueRecord = useMemo(() => {
    return [...records]
      .filter((record) => Boolean(record.due_date))
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];
  }, [records]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Insurance & Risk
            </h1>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Insurance Oversight • Risk Exposure • Claim Coordination
          </p>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Insurance and risk records now flow from the Admin Operations Intake.
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Insurance renewals, claims, incidents, exposure concerns, risk
                reviews, and follow-up items created from the Admin Dashboard now
                appear here for controlled administrative oversight.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">
                Active Risk Items
              </div>

              <div className="mt-2 text-6xl font-semibold text-amber-300">
                {records.length}
              </div>

              <div className="mt-4 text-slate-300">
                Live records requiring risk visibility.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            ["Open Risk Records", records.length],
            ["High Priority", highPriorityCount],
            ["Board Review", boardReviewCount],
            ["Vendor Visible", vendorVisibleCount],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>

              <p className="mt-3 text-3xl font-semibold text-amber-300">
                {value}
              </p>
            </div>
          ))}
        </div>

        {systemMessage && (
          <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <section className="mt-10">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
                Distributed Operational Rendering
              </p>

              <h3 className="mt-3 text-3xl font-semibold">
                Live Insurance & Risk Records
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                These records originate from the Admin Operations Intake and are
                rendered here because their request type is Insurance & Risk.
              </p>
            </div>

            <Link
  href="/admin/operations/new?request_type=Insurance%20%26%20Risk&return_path=/board/insurance-risk&return_label=Insurance%20%26%20Risk"
  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
>
  Create Risk Record
</Link>
          </div>

          <div className="space-y-5">
            {loadingRecords ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 text-sm text-slate-400">
                Loading insurance and risk records...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-8">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h4 className="mt-4 text-2xl font-semibold">
                  No open insurance or risk records
                </h4>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Create a new admin operational record with request type Insurance
                  & Risk and it will appear here automatically.
                </p>
              </div>
            ) : (
              records.map((record) => (
                <article
                  key={record.id}
                  className="rounded-3xl border border-white/10 bg-slate-900 p-6 transition hover:border-amber-400/40"
                >
                  <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr_0.75fr_0.7fr] lg:items-center">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                            record.priority
                          )}`}
                        >
                          {record.priority || "Normal"}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          {record.status || "Submitted"}
                        </span>

                        {record.board_review_required && (
                          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                            Board Review
                          </span>
                        )}
                      </div>

                      <h4 className="mt-4 text-xl font-semibold">
                        {record.title}
                      </h4>

                      <p className="mt-3 leading-relaxed text-slate-300">
                        {record.description ||
                          "Insurance and risk record submitted for review."}
                      </p>

                      {record.recommended_action && (
                        <div className="mt-4 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
                          <div className="text-xs uppercase tracking-[0.2em] text-amber-300">
                            Recommended Action
                          </div>

                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            {record.recommended_action}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Assigned To
                      </div>

                      <div className="mt-2 text-slate-200">
                        {record.assigned_to || "Unassigned"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Due Date
                      </div>

                      <div className="mt-2 text-amber-300">
                        {formatDate(record.due_date)}
                      </div>
                    </div>

                    <div>
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                        {record.routing_target || "Admin Dashboard"}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Risk Workflow
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              Exposure Control Path
            </h3>

            <div className="mt-6 space-y-4">
              {riskWorkflow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
              Future Risk Feeds
            </p>

            <h3 className="mt-3 text-2xl font-semibold text-emerald-100">
              Risk Intelligence Expansion
            </h3>

            <div className="mt-6 grid gap-4">
              {futureFeeds.map((feed) => (
                <div
                  key={feed}
                  className="rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5 text-slate-200"
                >
                  {feed}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            Distributed Rendering Status
          </h3>

          <p className="mt-3 text-slate-300">
            Insurance & Risk now receives live operational records from the
            centralized Admin Operations Intake system while remaining visible
            from the main Admin Dashboard priority queue.
          </p>

          {nextDueRecord && (
            <p className="mt-3 text-sm text-slate-400">
              Next due risk item: {formatDate(nextDueRecord.due_date)}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

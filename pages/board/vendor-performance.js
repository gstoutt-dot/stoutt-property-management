import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

const workflow = [
  "Track active vendor contracts and renewals",
  "Monitor service quality and response times",
  "Flag insurance certificate or license expirations",
  "Document owner and manager service complaints",
  "Compare bids, exclusions and warranty language",
  "Prepare vendor recommendations for board review",
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

export default function BoardVendorPerformance() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadVendorRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadVendorRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadVendorRecords({ showLoading = false } = {}) {
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
          payload.message || "Unable to load vendor performance records."
        );
      }

      const vendorRecords = (payload.openRecords || []).filter((record) => {
        const requestType = String(record.request_type || "").toLowerCase();
        const status = String(record.status || "").toLowerCase();

        return (
          requestType.includes("vendor") &&
          !closedStatuses.includes(status)
        );
      });

      setRecords(vendorRecords);
    } catch (error) {
      console.error("Unable to load vendor performance records:", error);

      setSystemMessage(
        error.message || "Unable to load vendor performance records."
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

  const nextDueRecord = useMemo(() => {
    return [...records]
      .filter((record) => Boolean(record.due_date))
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];
  }, [records]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Stoutt Property Management
            </div>

            <h1 className="mt-1 text-2xl font-semibold">
              Vendor Performance
            </h1>
          </div>

          <div className="flex items-center gap-3">
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
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Vendor Accountability • Contracts • Service Quality
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Vendor performance records now flow from the Admin Operations Intake.
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track service quality, response times, contract renewals,
                insurance certificates, complaints, bid reviews, and vendor
                accountability from one operational oversight center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">
                Active Vendor Items
              </div>

              <div className="mt-2 text-6xl font-semibold text-amber-300">
                {records.length}
              </div>

              <div className="mt-4 text-slate-300">
                Vendor oversight records requiring review.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Open Vendor Records", records.length],
            ["High Priority", highPriorityCount],
            ["Board Review", boardReviewCount],
            ["Next Due", nextDueRecord ? formatDate(nextDueRecord.due_date) : "None"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <div className="text-sm text-slate-400">{label}</div>

              <div className="mt-3 text-4xl font-semibold text-amber-300">
                {value}
              </div>
            </div>
          ))}
        </section>

        {systemMessage && (
          <section className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </section>
        )}

        <section className="mt-14">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
                Distributed Operational Rendering
              </div>

              <h3 className="mt-3 text-3xl font-semibold">
                Live Vendor Performance Records
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                These records originate from the Admin Operations Intake and are
                rendered here because their request type is Vendor Performance.
              </p>
            </div>

            <Link
              href="/admin/operations/new?request_type=Vendor%20Performance&return_path=/board/vendor-performance&return_label=Vendor%20Performance"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Vendor Record
            </Link>
          </div>

          <div className="space-y-5">
            {loadingRecords ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 text-sm text-slate-400">
                Loading vendor performance records...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-8">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h4 className="mt-4 text-2xl font-semibold">
                  No open vendor performance records
                </h4>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Create a new admin operational record with request type Vendor
                  Performance and it will appear here automatically.
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
                          "Vendor performance record submitted for review."}
                      </p>
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

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Oversight Workflow
            </div>

            <h3 className="mt-3 text-3xl font-semibold">
              Vendor Control Path
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {workflow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Board-Level Accountability
            </div>

            <h3 className="mt-3 text-3xl font-semibold">
              No More Invisible Vendor Problems
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Boards often hear about vendor issues only after owners complain
                repeatedly or service problems become visible. This module gives
                the board a cleaner way to see performance trends before renewal
                decisions are made.
              </p>

              <p>
                SPM can track service history, complaints, response time,
                insurance documents, pricing changes and contract status so vendor
                recommendations are grounded in real operating performance.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              Vendor oversight is now connected to the centralized operational
              intelligence system.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

const workflow = [
  "Identify major repair or capital need",
  "Confirm reserve study and funding assumptions",
  "Prepare scope of work and bid package",
  "Compare vendor proposals and exclusions",
  "Route recommendation to board approval",
  "Track project milestones and owner updates",
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

export default function BoardCapitalProjects() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadCapitalRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadCapitalRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadCapitalRecords({ showLoading = false } = {}) {
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
          payload.message || "Unable to load capital project records."
        );
      }

      const capitalRecords = (payload.openRecords || []).filter((record) => {
        const requestType = String(record.request_type || "").toLowerCase();
        const status = String(record.status || "").toLowerCase();

        return (
          requestType.includes("capital") &&
          !closedStatuses.includes(status)
        );
      });

      setRecords(capitalRecords);
    } catch (error) {
      console.error("Unable to load capital project records:", error);

      setSystemMessage(
        error.message || "Unable to load capital project records."
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
              Capital Projects
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
            Major Repairs • Reserve Projects • Board Approvals
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Capital project records now flow from the Admin Operations Intake.
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track roofs, painting, paving, mechanical replacements,
                reserve-funded repairs, vendor bids, project phases, board
                approvals, funding exposure and owner communication from one
                operational project center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">
                Active Capital Projects
              </div>

              <div className="mt-2 text-6xl font-semibold text-amber-300">
                {records.length}
              </div>

              <div className="mt-4 text-slate-300">
                Live capital project records requiring oversight.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Open Capital Records", records.length],
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
                Live Capital Project Records
              </h3>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                These records originate from the Admin Operations Intake and are
                rendered here because their request type is Capital Project.
              </p>
            </div>

            <Link
              href="/admin/operations/new?request_type=Capital%20Project&return_path=/board/capital-projects&return_label=Capital%20Projects"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Capital Project Record
            </Link>
          </div>

          <div className="space-y-5">
            {loadingRecords ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 text-sm text-slate-400">
                Loading capital project records...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-8">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h4 className="mt-4 text-2xl font-semibold">
                  No open capital project records
                </h4>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Create a new admin operational record with request type Capital
                  Project and it will appear here automatically.
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
                          "Capital project record submitted for review."}
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
              Project Workflow
            </div>

            <h3 className="mt-3 text-3xl font-semibold">
              Capital Project Control Path
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
              Board Project Intelligence
            </div>

            <h3 className="mt-3 text-3xl font-semibold">
              From Major Repair to Board-Ready Decision
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Capital projects require more than a work order. Boards need clear
                scope, vendor comparisons, reserve impact, funding options, owner
                communication timing and documented approval steps.
              </p>

              <p>
                This module gives SPM a polished way to show boards that major
                repairs are being managed strategically, financially and
                operationally from start to finish.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              Capital project oversight is now connected to the centralized
              operational intelligence system.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

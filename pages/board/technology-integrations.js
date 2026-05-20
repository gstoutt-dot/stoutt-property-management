import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

const integrationWorkflow = [
  "Connect core operational systems",
  "Validate sync reliability and data mapping",
  "Monitor integration health and exceptions",
  "Review governance and security exposure",
  "Prepare migration-readiness architecture",
  "Expand operational automation carefully",
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

export default function TechnologyIntegrationsCenter() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadTechnologyRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadTechnologyRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadTechnologyRecords({ showLoading = false } = {}) {
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
          payload.message || "Unable to load technology integration records."
        );
      }

      const technologyRecords = (payload.openRecords || []).filter(
        (record) => {
          const requestType = String(
            record.request_type || ""
          ).toLowerCase();

          const status = String(record.status || "").toLowerCase();

          return (
            requestType.includes("technology") &&
            !closedStatuses.includes(status)
          );
        }
      );

      setRecords(technologyRecords);
    } catch (error) {
      console.error(
        "Unable to load technology integration records:",
        error
      );

      setSystemMessage(
        error.message ||
          "Unable to load technology integration records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  const boardReviewCount = useMemo(
    () =>
      records.filter((record) =>
        Boolean(record.board_review_required)
      ).length,
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
      .sort(
        (a, b) => new Date(a.due_date) - new Date(b.due_date)
      )[0];
  }, [records]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
                Stoutt Property Management
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Board Technology Integrations Center
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Technology integration records now flow from the Admin
                Operations Intake for board-level visibility into
                QuickBooks, AI systems, sync health, migrations,
                governance controls and future SPM platform readiness.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 px-6 py-5 text-right shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Integration Status
              </div>

              <div className="mt-2 text-3xl font-bold text-white">
                Online
              </div>

              <div className="mt-1 text-sm text-slate-300">
                Core systems connected
              </div>
            </div>
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
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <section className="grid gap-6 md:grid-cols-4">
          {[
            ["Open Technology Records", records.length],
            ["High Priority", highPriorityCount],
            ["Board Review", boardReviewCount],
            [
              "Next Due",
              nextDueRecord
                ? formatDate(nextDueRecord.due_date)
                : "None",
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl"
            >
              <div className="text-sm text-slate-400">
                {label}
              </div>

              <div className="mt-3 text-4xl font-bold text-amber-300">
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

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
                Distributed Operational Rendering
              </div>

              <h2 className="mt-3 text-3xl font-semibold">
                Live Technology Integration Records
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-300">
                These records originate from the Admin Operations
                Intake and are rendered here because their request
                type is Technology Integrations.
              </p>
            </div>

            <Link
              href="/admin/operations/new?request_type=Technology%20Integrations&return_path=/board/technology-integrations&return_label=Technology%20Integrations"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Technology Record
            </Link>
          </div>

          <div className="space-y-5">
            {loadingRecords ? (
              <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 text-sm text-slate-400">
                Loading technology integration records...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/70 p-8">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h4 className="mt-4 text-2xl font-semibold">
                  No open technology integration records
                </h4>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Create a new admin operational record with request
                  type Technology Integrations and it will appear here
                  automatically.
                </p>
              </div>
            ) : (
              records.map((record) => (
                <article
                  key={record.id}
                  className="rounded-3xl border border-white/10 bg-slate-950 p-6 transition hover:border-amber-400/40"
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
                          "Technology integration record submitted for review."}
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
                        {record.routing_target ||
                          "Admin Dashboard"}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">
            Technology Integration Pathway
          </h2>

          <p className="mt-3 max-w-5xl leading-7 text-slate-300">
            The technology layer connects today’s operating tools
            with tomorrow’s proprietary platform. Each integration
            should support continuity, accuracy, security and board
            confidence without creating dependency confusion.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-6">
            {integrationWorkflow.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-800 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-slate-950">
                  {index + 1}
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/25 bg-gradient-to-r from-slate-900 to-slate-800 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-300">
            Governance Commentary
          </h2>

          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            Technology should make association management clearer,
            faster and more reliable — not more fragmented. This
            center gives the board a structured view of how systems
            connect today, how data will migrate tomorrow and how
            Stoutt Property Management is building toward a
            proprietary operating platform without losing control of
            the current environment.
          </p>
        </section>
      </main>
    </div>
  );
}

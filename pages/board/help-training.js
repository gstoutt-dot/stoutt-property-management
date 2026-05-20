import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

const trainingTopics = [
  "Review approvals",
  "Vote on motions",
  "Track resolutions",
  "Find documents",
  "Use search",
  "Review financials",
  "Read notifications",
  "Export reports",
  "Check compliance deadlines",
  "Understand user permissions",
];

const workflow = [
  "Identify board education or training need",
  "Create guidance, walkthrough, or onboarding material",
  "Review governance or compliance relevance",
  "Distribute support resources to board members",
  "Track board usage and support requests",
  "Update training content as the platform evolves",
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

export default function BoardHelpTraining() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadTrainingRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadTrainingRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadTrainingRecords({ showLoading = false } = {}) {
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
          payload.message || "Unable to load help and training records."
        );
      }

      const trainingRecords = (payload.openRecords || []).filter(
        (record) => {
          const requestType = String(
            record.request_type || ""
          ).toLowerCase();

          const status = String(record.status || "").toLowerCase();

          return (
            (requestType.includes("training") ||
              requestType.includes("help")) &&
            !closedStatuses.includes(status)
          );
        }
      );

      setRecords(trainingRecords);
    } catch (error) {
      console.error(
        "Unable to load help and training records:",
        error
      );

      setSystemMessage(
        error.message || "Unable to load help and training records."
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
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Stoutt Property Management
            </div>

            <h1 className="mt-3 text-3xl font-semibold">
              Board Help & Training Center
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

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Member Support
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Training & Guidance Operations
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            Help and training records now flow from the Admin
            Operations Intake system for board education,
            onboarding, support resources, governance walkthroughs,
            portal training and operational guidance management.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          {[
            ["Open Training Records", records.length],
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
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>

              <p className="mt-3 text-3xl font-bold text-amber-300">
                {value}
              </p>
            </div>
          ))}
        </section>

        {systemMessage && (
          <section className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </section>
        )}

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
                Distributed Operational Rendering
              </div>

              <h2 className="mt-3 text-3xl font-semibold">
                Live Help & Training Records
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-400">
                These records originate from the Admin Operations
                Intake and are rendered here because their request
                type is Help & Training.
              </p>
            </div>

            <Link
              href="/admin/operations/new?request_type=Help%20%26%20Training&return_path=/board/help-training&return_label=Help%20%26%20Training"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Training Record
            </Link>
          </div>

          <div className="space-y-5">
            {loadingRecords ? (
              <div className="rounded-3xl border border-white/10 bg-slate-950 p-6 text-sm text-slate-400">
                Loading help and training records...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/70 p-8">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h4 className="mt-4 text-2xl font-semibold">
                  No open help and training records
                </h4>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Create a new admin operational record with request
                  type Help & Training and it will appear here
                  automatically.
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
                      </div>

                      <h4 className="mt-4 text-xl font-semibold">
                        {record.title}
                      </h4>

                      <p className="mt-3 leading-relaxed text-slate-300">
                        {record.description ||
                          "Help and training record submitted for review."}
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

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-2xl font-semibold">
              Training Topics
            </h2>

            <div className="mt-6 grid gap-3">
              {trainingTopics.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-2xl font-semibold">
              Training Workflow
            </h2>

            <div className="mt-6 space-y-4">
              {workflow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Better Training Creates Better Governance
          </h2>

          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            This training center helps turn the Board Portal from a
            powerful system into an easy system. Board members get
            the guidance they need to review, approve, search, vote,
            track, and export with confidence — making the entire
            association operation feel more professional.
          </p>
        </section>
      </section>
    </main>
  );
}

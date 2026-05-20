import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

const policyAreas = [
  "Board-Adopted Policies",
  "Rules & Regulations",
  "Enforcement Policies",
  "Collection Policies",
  "ARC Guidelines",
  "Meeting Conduct",
  "Document Retention",
  "Review Dates",
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

export default function BoardPolicyLibrary() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadPolicyRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadPolicyRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadPolicyRecords({ showLoading = false } = {}) {
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
        throw new Error(payload.message || "Unable to load policy review records.");
      }

      const policyRecords = (payload.openRecords || []).filter((record) => {
        const requestType = String(record.request_type || "").toLowerCase();
        const status = String(record.status || "").toLowerCase();

        return requestType.includes("policy") && !closedStatuses.includes(status);
      });

      setRecords(policyRecords);
    } catch (error) {
      console.error("Unable to load policy review records:", error);
      setSystemMessage(error.message || "Unable to load policy review records.");
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
        ["critical", "high"].includes(String(record.priority || "").toLowerCase())
      ).length,
    [records]
  );

  const nextDueRecord = useMemo(() => {
    return [...records]
      .filter((record) => Boolean(record.due_date))
      .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];
  }, [records]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Board Policy Library
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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(30,41,59,0.9),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">
              Governance Documents & Board Standards
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
              Board Policy Library
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Policy review records created from the Admin Dashboard now appear here
              for governance tracking, annual review cycles, counsel review, board
              adoption, and policy continuity.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[
              ["Open Policy Records", records.length],
              ["High Priority", highPriorityCount],
              ["Board Review", boardReviewCount],
              ["Next Due", nextDueRecord ? formatDate(nextDueRecord.due_date) : "None"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
              >
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-3xl font-bold text-amber-300">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        {systemMessage && (
          <div className="mb-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 lg:col-span-2">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Distributed Operational Rendering
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Live Policy Review Records
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  These records originate from the Admin Operations Intake and are
                  rendered here because their request type is Policy Review.
                </p>
              </div>

              <Link
                href="/admin/operations/new"
                className="w-fit rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Create Policy Record
              </Link>
            </div>

            <div className="space-y-4">
              {loadingRecords ? (
                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-400">
                  Loading policy review records...
                </div>
              ) : records.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/70 p-6">
                  <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    Clear
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-white">
                    No open policy review records
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Create a new admin operational record with request type Policy
                    Review and it will appear here automatically.
                  </p>
                </div>
              ) : (
                records.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/70 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
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

                        <h3 className="mt-4 text-lg font-semibold text-white">
                          {record.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {record.description ||
                            "Policy review record submitted for governance review."}
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

                      <div className="shrink-0 text-sm text-slate-400">
                        Due:{" "}
                        <span className="text-amber-300">
                          {formatDate(record.due_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              Library Health
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Policy Readiness
            </h2>

            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-5xl font-bold text-white">
                    {records.length === 0 ? "100%" : "94%"}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    Current policy compliance
                  </p>
                </div>

                <p className="text-sm text-amber-300">Target: 100%</p>
              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full bg-amber-400 ${
                    records.length === 0 ? "w-full" : "w-[94%]"
                  }`}
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                ["Open Policy Records", records.length],
                ["High Priority", highPriorityCount],
                ["Board Review", boardReviewCount],
                ["Next Due", nextDueRecord ? formatDate(nextDueRecord.due_date) : "None"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span className="text-sm text-slate-400">{label}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {policyAreas.map((area) => (
            <div
              key={area}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-amber-400/40 hover:bg-white/[0.06]"
            >
              <h3 className="text-xl font-bold text-white">{area}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Track review status, adoption history, responsible party, board
                action, counsel review, and next update cycle.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                Distributed Rendering Status
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Policy review is now connected to centralized admin intake.
              </h2>

              <p className="mt-4 max-w-3xl text-slate-300">
                Policy Review records remain visible from the main Admin Dashboard
                priority queue while also rendering here inside the Policy Library
                for module-specific governance oversight.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <p className="text-sm text-slate-400">Next Policy Action</p>

              <p className="mt-2 text-xl font-semibold text-white">
                {nextDueRecord ? nextDueRecord.title : "No open policy action"}
              </p>

              <p className="mt-3 text-sm text-amber-200">
                {nextDueRecord
                  ? `Due ${formatDate(nextDueRecord.due_date)}`
                  : "Policy review queue is currently clear."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

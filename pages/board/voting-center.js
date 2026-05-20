import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

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

function voteStyle(status) {
  const value = String(status || "").toLowerCase();

  if (value.includes("approved")) {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (value.includes("denied")) {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  if (value.includes("review")) {
    return "border-amber-400/30 bg-amber-400/10 text-amber-200";
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

export default function VotingCenter() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] =
    useState(true);

  const [systemMessage, setSystemMessage] =
    useState("");

  useEffect(() => {
    loadVotingRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadVotingRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadVotingRecords({
    showLoading = false,
  } = {}) {
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
          payload.message ||
            "Unable to load voting records."
        );
      }

      const votingRecords = (
        payload.openRecords || []
      ).filter((record) => {
        const requestType = String(
          record.request_type || ""
        ).toLowerCase();

        const status = String(
          record.status || ""
        ).toLowerCase();

        return (
          (requestType.includes("board packet") ||
            requestType.includes("meeting") ||
            requestType.includes("election") ||
            requestType.includes("legal") ||
            requestType.includes("compliance")) &&
          !closedStatuses.includes(status)
        );
      });

      setRecords(votingRecords);
    } catch (error) {
      console.error(
        "Unable to load voting records:",
        error
      );

      setSystemMessage(
        error.message ||
          "Unable to load voting records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  const highPriorityVotes = useMemo(
    () =>
      records.filter((record) =>
        ["critical", "high"].includes(
          String(record.priority || "").toLowerCase()
        )
      ),
    [records]
  );

  const pendingVotes = useMemo(
    () =>
      records.filter((record) =>
        String(record.status || "")
          .toLowerCase()
          .includes("review")
      ),
    [records]
  );

  const legalVotes = useMemo(
    () =>
      records.filter((record) => {
        const type = String(
          record.request_type || ""
        ).toLowerCase();

        return (
          type.includes("legal") ||
          type.includes("compliance")
        );
      }),
    [records]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Stoutt Property Management
            </div>

            <h1 className="mt-3 text-3xl font-semibold">
              Voting Center
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
            Governance Voting Intelligence
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Centralized Board Voting Oversight
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            Voting items now flow directly from the
            Admin Operations Intake system to create
            a centralized governance voting and
            approval architecture connected to
            meeting packets, motions, elections,
            legal review and board oversight.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          {[
            ["Voting Records", records.length],
            [
              "High Priority",
              highPriorityVotes.length,
            ],
            [
              "Pending Review",
              pendingVotes.length,
            ],
            ["Legal Votes", legalVotes.length],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">
                {label}
              </p>

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
                Live Voting Records
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-400">
                These records originate from the Admin
                Operations Intake and render here as
                governance voting and approval items.
              </p>
            </div>

            <Link
              href="/admin/operations/new?request_type=Board%20Packet&return_path=/board/voting-center&return_label=Voting%20Center"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Voting Record
            </Link>
          </div>

          <div className="space-y-5">
            {loadingRecords ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-400">
                Loading voting records...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/70 p-8">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h3 className="mt-4 text-2xl font-semibold">
                  No voting records available
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Create operational governance
                  records and they will appear here
                  automatically.
                </p>
              </div>
            ) : (
              records.map((record) => (
                <div
                  key={record.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                            record.priority
                          )}`}
                        >
                          {record.priority ||
                            "Normal"}
                        </span>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${voteStyle(
                            record.status
                          )}`}
                        >
                          {record.status ||
                            "Submitted"}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-semibold">
                        {record.title}
                      </h3>
                    </div>

                    <div className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      {formatDate(record.due_date)}
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="text-slate-500">
                        Assigned To:
                      </span>{" "}
                      {record.assigned_to ||
                        "Unassigned"}
                    </p>

                    <p>
                      <span className="text-slate-500">
                        Request Type:
                      </span>{" "}
                      {record.request_type}
                    </p>

                    <p className="md:col-span-2">
                      <span className="text-slate-500">
                        Description:
                      </span>{" "}
                      {record.description ||
                        "No description provided."}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-2xl font-semibold">
              Voting Workflow
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Create governance voting records",
                "Track motions and approvals",
                "Route legal-sensitive votes",
                "Monitor unresolved decisions",
                "Connect approvals to packets",
                "Maintain searchable vote history",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-amber-200">
              Connected Governance Systems
            </h2>

            <div className="mt-6 grid gap-3">
              {[
                "Motion Center",
                "Meeting Packet",
                "Action Items",
                "Member Voting",
                "Compliance Dashboard",
                "Signature Approval Log",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Governance Voting Should Be Organized and Traceable
          </h2>

          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            This voting system transforms board
            approvals into a connected governance
            intelligence layer where motions,
            votes, packets, legal review and
            operational decisions remain fully
            organized and searchable.
          </p>
        </section>
      </section>
    </main>
  );
}

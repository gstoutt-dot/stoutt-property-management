import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

const reminderCategories = [
  "Meeting notice deadlines",
  "Election timelines",
  "Insurance renewal windows",
  "Reserve study reviews",
  "Vendor contract expirations",
  "Legal filing deadlines",
  "Policy review cycles",
  "Board certification tracking",
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

function calculateDaysUntil(dateValue) {
  if (!dateValue) return null;

  const today = new Date();
  const dueDate = new Date(dateValue);

  const difference =
    dueDate.getTime() - today.getTime();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
}

export default function BoardComplianceCalendar() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadComplianceRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadComplianceRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadComplianceRecords({
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
            "Unable to load compliance calendar records."
        );
      }

      const complianceRecords = (
        payload.openRecords || []
      ).filter((record) => {
        const requestType = String(
          record.request_type || ""
        ).toLowerCase();

        const status = String(
          record.status || ""
        ).toLowerCase();

        return (
          requestType.includes("compliance") &&
          !closedStatuses.includes(status)
        );
      });

      const sorted = [...complianceRecords].sort(
        (a, b) =>
          new Date(a.due_date || 0) -
          new Date(b.due_date || 0)
      );

      setRecords(sorted);
    } catch (error) {
      console.error(
        "Unable to load compliance calendar records:",
        error
      );

      setSystemMessage(
        error.message ||
          "Unable to load compliance calendar records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  const upcomingCount = useMemo(
    () =>
      records.filter((record) => {
        const days = calculateDaysUntil(
          record.due_date
        );

        return days !== null && days <= 30;
      }).length,
    [records]
  );

  const overdueCount = useMemo(
    () =>
      records.filter((record) => {
        const days = calculateDaysUntil(
          record.due_date
        );

        return days !== null && days < 0;
      }).length,
    [records]
  );

  const thisMonthCount = useMemo(
    () =>
      records.filter((record) => {
        if (!record.due_date) return false;

        const dueDate = new Date(record.due_date);
        const now = new Date();

        return (
          dueDate.getMonth() === now.getMonth() &&
          dueDate.getFullYear() ===
            now.getFullYear()
        );
      }).length,
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
              Compliance Calendar
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
            Deadline Intelligence
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Operational Compliance Calendar
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            Compliance review records now flow from the
            Admin Operations Intake system to create a
            centralized governance deadline and renewal
            intelligence calendar for the board.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          {[
            ["Open Compliance Dates", records.length],
            ["Due In 30 Days", upcomingCount],
            ["Overdue Items", overdueCount],
            ["Due This Month", thisMonthCount],
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
                Upcoming Compliance Deadlines
              </h2>

              <p className="mt-3 max-w-4xl leading-7 text-slate-400">
                These records originate from the Admin
                Operations Intake and render here based
                on Compliance Review request types and
                due dates.
              </p>
            </div>

            <Link
              href="/admin/operations/new?request_type=Compliance%20Review&return_path=/board/compliance-calendar&return_label=Compliance%20Calendar"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Compliance Deadline
            </Link>
          </div>

          <div className="space-y-5">
            {loadingRecords ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-400">
                Loading compliance deadlines...
              </div>
            ) : records.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/70 p-8">
                <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Clear
                </div>

                <h3 className="mt-4 text-2xl font-semibold">
                  No active compliance deadlines
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Create a compliance review record with
                  a due date and it will appear here
                  automatically.
                </p>
              </div>
            ) : (
              records.map((record) => {
                const daysUntil = calculateDaysUntil(
                  record.due_date
                );

                return (
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
                            {record.priority || "Normal"}
                          </span>

                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                            {record.status || "Submitted"}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-semibold">
                          {record.title}
                        </h3>
                      </div>

                      <div className="text-right">
                        <div className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                          {formatDate(record.due_date)}
                        </div>

                        {daysUntil !== null && (
                          <div className="mt-2 text-xs text-slate-400">
                            {daysUntil < 0
                              ? `${Math.abs(
                                  daysUntil
                                )} days overdue`
                              : `${daysUntil} days remaining`}
                          </div>
                        )}
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
                          Routing:
                        </span>{" "}
                        {record.routing_target ||
                          "Admin Dashboard"}
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
                );
              })
            )}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-2xl font-semibold">
              Tracked Reminder Categories
            </h2>

            <div className="mt-6 grid gap-3">
              {reminderCategories.map((item) => (
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
              Calendar Intelligence
            </h2>

            <div className="mt-6 space-y-4">
              {[
                "Monitor approaching deadlines",
                "Escalate overdue compliance items",
                "Track annual governance cycles",
                "Connect deadlines to board workflows",
                "Prepare meeting readiness timelines",
                "Reduce missed filing exposure",
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
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Governance Deadlines Should Never Be Invisible
          </h2>

          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            This calendar transforms compliance tracking
            into a proactive operational system. Boards
            can now see what is approaching, what is
            overdue and what requires action before risk
            exposure becomes a legal or financial problem.
          </p>
        </section>
      </section>
    </main>
  );
}

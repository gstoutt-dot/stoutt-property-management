import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed"];

export default function BoardTaskCommand() {
  const [tasks, setTasks] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadTasks();
    loadTaskRecords();

    const interval = setInterval(() => {
      loadTasks();
      loadTaskRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadTasks() {
    try {
      setLoadingTasks(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("association_board_tasks")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("due_date", { ascending: true });

      if (error) throw error;

      setTasks(data || []);
    } catch (error) {
      console.error("Unable to load board tasks:", error);
      setTasks([]);
      setSystemMessage(error.message || "Unable to load board tasks.");
    } finally {
      setLoadingTasks(false);
    }
  }

  async function loadTaskRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load task operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""} ${record.assigned_to || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("task") ||
            combined.includes("action item") ||
            combined.includes("follow-up") ||
            combined.includes("follow up") ||
            combined.includes("assigned") ||
            combined.includes("deadline") ||
            combined.includes("board review") ||
            combined.includes("operational"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load task operational records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  async function markComplete(task) {
    if (!task?.id) return;

    const { error } = await supabase
      .from("association_board_tasks")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", task.id);

    if (error) {
      setSystemMessage("Unable to mark task complete.");
      return;
    }

    await loadTasks();
    setSystemMessage("Task marked complete.");
  }

  const openTasks = tasks.filter(
    (task) => String(task.status || "").toLowerCase() !== "completed"
  );

  const highPriority = tasks.filter((task) =>
    ["high", "urgent", "critical"].includes(
      String(task.priority || "").toLowerCase()
    )
  );

  const dueThisMonth = tasks.filter((task) => isDueThisMonth(task.due_date));

  const overdue = tasks.filter(
    (task) =>
      task.due_date &&
      new Date(task.due_date) < startOfToday() &&
      String(task.status || "").toLowerCase() !== "completed"
  );

  const taskOwners = useMemo(() => {
    const counts = {};

    [...tasks, ...operationalRecords].forEach((task) => {
      const owner = task.assigned_to || "Unassigned";
      counts[owner] = (counts[owner] || 0) + 1;
    });

    return Object.entries(counts);
  }, [tasks, operationalRecords]);

  const statusTypes = useMemo(() => {
    const types = tasks
      .map((task) => String(task.status || "open").toLowerCase())
      .filter(Boolean);

    return ["all", ...Array.from(new Set(types))];
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;

    return tasks.filter(
      (task) => String(task.status || "open").toLowerCase() === filter
    );
  }, [tasks, filter]);

  const followUpRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("follow") || combined.includes("action");
      }),
    [operationalRecords]
  );

  const assignedRecords = useMemo(
    () => operationalRecords.filter((record) => record.assigned_to),
    [operationalRecords]
  );

  const priorityRecords = useMemo(
    () =>
      operationalRecords.filter((record) =>
        ["critical", "high"].includes(String(record.priority || "").toLowerCase())
      ),
    [operationalRecords]
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
              Task Command Center
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Board assignments, action items, follow-up, deadlines,
              responsibilities, and operational accountability.
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
            Distributed Task Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Task Command now combines board task records with centralized operational action tracking.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Board assignments, action items, deadlines, governance follow-up,
            vendor matters, financial planning tasks, and operational priorities can
            now flow through Admin Operations Intake while preserving live board task visibility.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Special Project"
              )}&return_path=${encodeURIComponent(
                "/board/task-command"
              )}&return_label=${encodeURIComponent("Task Command Center")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Task Record
            </Link>

            <Link
              href="/board/action-items"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Action Items
            </Link>

            <Link
              href="/board/calendar"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Calendar
            </Link>

            <Link
              href="/board/search-center"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Search Center
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Open Tasks" value={openTasks.length} />
          <Metric label="High Priority" value={highPriority.length + priorityRecords.length} />
          <Metric label="Due This Month" value={dueThisMonth.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Follow-Up Records" items={followUpRecords} />
          <OperationalPanel title="Assigned Operational Records" items={assignedRecords} />
          <OperationalPanel title="Priority Task Records" items={priorityRecords} />
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Live Task Queue
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  Board Tasks
                </h2>
              </div>

              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="rounded-full border border-amber-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-300 outline-none"
              >
                {statusTypes.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Tasks" : titleCase(status)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-5">
              {loadingTasks ? (
                <Empty message="Loading board tasks..." />
              ) : filteredTasks.length === 0 ? (
                <Empty message="No board tasks are currently available for this view." />
              ) : (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onComplete={markComplete}
                  />
                ))
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">
                Assignment Load
              </h2>

              <div className="mt-5 space-y-3">
                {taskOwners.length === 0 ? (
                  <Empty message="No assignments available." />
                ) : (
                  taskOwners.map(([owner, count]) => (
                    <div
                      key={owner}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm"
                    >
                      <span className="text-slate-300">{owner}</span>
                      <span className="font-semibold text-amber-300">
                        {count}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-emerald-100">
                Task Operations Connected
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                This page now preserves live board task records while adding
                distributed operational action tracking from Admin Operations Intake.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">{title}</h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Task Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Task Record"}</span>
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

function TaskCard({ task, onComplete }) {
  const completed = String(task.status || "").toLowerCase() === "completed";

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            {titleCase(task.priority || "normal")} Priority · Due{" "}
            {formatDate(task.due_date)}
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {task.title || "Board Task"}
          </h3>
        </div>

        <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
          {titleCase(task.status || "open")}
        </span>
      </div>

      <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
        <p>
          <span className="text-slate-500">Assigned To:</span>{" "}
          {task.assigned_to || "Unassigned"}
        </p>

        <p>
          <span className="text-slate-500">Source:</span>{" "}
          {task.task_source || "Board Operations"}
        </p>

        <p className="md:col-span-2">
          <span className="text-slate-500">Task Note:</span>{" "}
          {task.task_note || "No task note available."}
        </p>
      </div>

      {!completed && (
        <button
          onClick={() => onComplete(task)}
          className="mt-5 rounded-full border border-emerald-400/30 px-5 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
        >
          Mark Complete
        </button>
      )}
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function isDueThisMonth(value) {
  if (!value) return false;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return false;

  const now = new Date();

  return (
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

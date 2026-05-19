import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardTaskCommand() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadTasks();

    const interval = setInterval(() => {
      loadTasks();
    }, 10000);

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

    tasks.forEach((task) => {
      const owner = task.assigned_to || "Unassigned";
      counts[owner] = (counts[owner] || 0) + 1;
    });

    return Object.entries(counts);
  }, [tasks]);

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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Board Task Command
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Task Command Center
              </h1>
            </div>

            <Link
              href="/board"
              className="text-lg font-medium text-white hover:text-yellow-300"
            >
              Board Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="rounded-3xl border border-yellow-300/20 bg-gradient-to-r from-slate-900 to-slate-950 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
            Board Execution Queue
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Track board assignments, deadlines, responsibilities, and completion status.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Board members can monitor open tasks, assigned responsibilities,
            due dates, governance follow-up, financial planning items, vendor
            matters, and operational priorities from one live command center.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Open Tasks" value={openTasks.length} />
          <Metric label="High Priority" value={highPriority.length} />
          <Metric label="Due This Month" value={dueThisMonth.length} />
          <Metric label="Overdue" value={overdue.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Live Task Queue
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Board Tasks
              </h2>
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-full border border-yellow-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-yellow-300 outline-none"
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
                    <span className="font-semibold text-yellow-300">
                      {count}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-emerald-100">
              Task Operations
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              This page is the board’s live execution layer for assignments,
              governance follow-up, deadlines, financial planning, vendor
              matters, and operational accountability.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function TaskCard({ task, onComplete }) {
  const completed = String(task.status || "").toLowerCase() === "completed";

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
            {titleCase(task.priority || "normal")} Priority · Due{" "}
            {formatDate(task.due_date)}
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {task.title || "Board Task"}
          </h3>
        </div>

        <span className="rounded-full border border-yellow-300/30 px-4 py-1 text-sm text-yellow-200">
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
      <div className="text-3xl font-bold text-yellow-300">{value}</div>
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

  return new Date(value).toLocaleDateString("en-US", {
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

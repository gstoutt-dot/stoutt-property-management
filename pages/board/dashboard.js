import Head from "next/head";
import { useMemo, useState } from "react";

const initialActions = [
  {
    id: 1,
    title: "Pool light reported out",
    category: "Maintenance",
    status: "Open",
    priority: "Medium",
    assignedTo: "Management",
    dueDate: "2026-05-03",
    boardDecisionNeeded: false,
    recommendedNextStep: "Confirm responsibility, create work order, and notify vendor.",
    notes:
      "Homeowner reported a burnt-out pool light. Review governing documents before dispatch.",
  },
  {
    id: 2,
    title: "Past-due balance follow-up",
    category: "Collections",
    status: "Escalated",
    priority: "Critical",
    assignedTo: "Manager / Board Treasurer",
    dueDate: "2026-05-01",
    boardDecisionNeeded: true,
    recommendedNextStep:
      "Prepare account summary and request board authorization for the next collection step.",
    notes: "Account requires board-level review before additional action.",
  },
  {
    id: 3,
    title: "Landscape proposal review",
    category: "Vendor",
    status: "Board Decision",
    priority: "High",
    assignedTo: "Board",
    dueDate: "2026-05-06",
    boardDecisionNeeded: true,
    recommendedNextStep: "Place proposal comparison on the next board agenda.",
    notes: "Three vendor proposals need side-by-side board review.",
  },
];

const statusStyles = {
  Open: "border-amber-400/30 bg-amber-400/10 text-amber-100",
  "In Progress": "border-yellow-400/30 bg-yellow-400/10 text-yellow-100",
  "Board Decision": "border-orange-400/30 bg-orange-400/10 text-orange-100",
  Escalated: "border-red-400/30 bg-red-400/10 text-red-100",
  Completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
};

const priorityStyles = {
  Low: "bg-slate-700/70 text-slate-200",
  Medium: "bg-amber-500/20 text-amber-100",
  High: "bg-orange-500/20 text-orange-100",
  Critical: "bg-red-500/20 text-red-100",
};

export default function BoardDashboard() {
  const [actions, setActions] = useState(initialActions);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Maintenance");
  const [priority, setPriority] = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("Management");
  const [dueDate, setDueDate] = useState("");
  const [boardDecisionNeeded, setBoardDecisionNeeded] = useState(false);
  const [notes, setNotes] = useState("");

  const stats = useMemo(() => {
    return {
      open: actions.filter((item) => item.status !== "Completed").length,
      completed: actions.filter((item) => item.status === "Completed").length,
      escalated: actions.filter((item) => item.status === "Escalated").length,
      boardDecisions: actions.filter((item) => item.boardDecisionNeeded).length,
    };
  }, [actions]);

  const addAction = () => {
    if (!title.trim()) return;

    const newAction = {
      id: Date.now(),
      title: title.trim(),
      category,
      status: boardDecisionNeeded ? "Board Decision" : "Open",
      priority,
      assignedTo,
      dueDate: dueDate || "Not set",
      boardDecisionNeeded,
      recommendedNextStep: boardDecisionNeeded
        ? "Prepare item for board review and place it on the next agenda."
        : "Review, assign responsibility, and begin follow-up.",
      notes: notes.trim() || "No additional notes entered.",
    };

    setActions((current) => [newAction, ...current]);
    setTitle("");
    setCategory("Maintenance");
    setPriority("Medium");
    setAssignedTo("Management");
    setDueDate("");
    setBoardDecisionNeeded(false);
    setNotes("");
  };

  const updateStatus = (id, status) => {
    setActions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              boardDecisionNeeded:
                status === "Board Decision" ? true : item.boardDecisionNeeded,
            }
          : item
      )
    );
  };

  const deleteAction = (id) => {
    setActions((current) => current.filter((item) => item.id !== id));
  };

  return (
    <>
      <Head>
        <title>BOS Phase 3 | Stoutt Property Management</title>
        <meta
          name="description"
          content="Board Operating System dashboard for Stoutt Property Management."
        />
      </Head>

      <main className="min-h-screen bg-slate-950 text-white">
        <section className="relative overflow-hidden border-b border-amber-300/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(202,138,4,0.18),transparent_32%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-10 lg:px-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">
              Stoutt Property Management
            </p>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                  Board Operating System
                </h1>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                  A premium command center for board action items, escalations,
                  decisions, assignments, due dates, and management follow-through.
                </p>
              </div>

              <div className="rounded-3xl border border-amber-300/25 bg-amber-300/10 px-5 py-4 shadow-2xl shadow-amber-950/40">
                <p className="text-sm text-amber-100">Phase 3 Status</p>
                <p className="mt-1 text-2xl font-semibold text-amber-300">
                  Board View Active
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="grid gap-4 md:grid-cols-4">
            <DashboardCard label="Open Items" value={stats.open} tone="amber" />
            <DashboardCard
              label="Completed"
              value={stats.completed}
              tone="emerald"
            />
            <DashboardCard label="Escalated" value={stats.escalated} tone="red" />
            <DashboardCard
              label="Board Decisions"
              value={stats.boardDecisions}
              tone="orange"
            />
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-[420px_1fr] lg:px-8">
          <aside className="rounded-3xl border border-amber-300/10 bg-white/[0.04] p-6 shadow-2xl shadow-slate-950/50">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              New Action
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-white">
              Create board action item
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Use this for maintenance issues, owner concerns, collections,
              vendor follow-up, violations, and board decisions.
            </p>

            <div className="mt-6 space-y-4">
              <Field label="Action title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Example: Review roof repair proposal"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/60"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
                  >
                    <option>Maintenance</option>
                    <option>Collections</option>
                    <option>Vendor</option>
                    <option>Violation</option>
                    <option>Access Control</option>
                    <option>Board</option>
                    <option>Owner Request</option>
                  </select>
                </Field>

                <Field label="Priority">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Assigned to">
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
                  >
                    <option>Management</option>
                    <option>Board</option>
                    <option>Manager / Board Treasurer</option>
                    <option>Vendor</option>
                    <option>Attorney</option>
                  </select>
                </Field>

                <Field label="Due date">
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
                  />
                </Field>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={boardDecisionNeeded}
                  onChange={(e) => setBoardDecisionNeeded(e.target.checked)}
                />
                Board decision needed
              </label>

              <Field label="Notes">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add issue details, caller notes, vendor notes, or board context."
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/60"
                />
              </Field>

              <button
                onClick={addAction}
                className="w-full rounded-2xl bg-amber-300 px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-xl shadow-amber-950/40 transition hover:bg-amber-200"
              >
                Add to BOS
              </button>
            </div>
          </aside>

          <section className="rounded-3xl border border-amber-300/10 bg-white/[0.04] p-6 shadow-2xl shadow-slate-950/50">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
                  Board Command Center
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Active action board
                </h2>
              </div>

              <p className="text-sm text-slate-400">
                Gold = active · Green = completed · Red = escalated
              </p>
            </div>

            <div className="space-y-4">
              {actions.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 transition hover:border-amber-300/30"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                        >
                          {item.status}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[item.priority]}`}
                        >
                          {item.priority}
                        </span>

                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        {item.notes}
                      </p>

                      <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                        <Info label="Assigned to" value={item.assignedTo} />
                        <Info label="Due date" value={item.dueDate} />
                        <Info
                          label="Board decision"
                          value={
                            item.boardDecisionNeeded ? "Needed" : "Not needed"
                          }
                        />
                      </div>

                      <div className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                          Recommended next step
                        </p>

                        <p className="mt-2 text-sm leading-6 text-amber-50">
                          {item.recommendedNextStep}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-2">
                      <select
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                        className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/60"
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Board Decision</option>
                        <option>Escalated</option>
                        <option>Completed</option>
                      </select>

                      <button
                        onClick={() => deleteAction(item.id)}
                        className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-400/20"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}

function DashboardCard({ label, value, tone }) {
  const tones = {
    amber: "border-amber-300/25 bg-amber-300/10",
    emerald: "border-emerald-400/20 bg-emerald-400/10",
    red: "border-red-400/20 bg-red-400/10",
    orange: "border-orange-400/20 bg-orange-400/10",
  };

  return (
    <div
      className={`rounded-3xl border p-5 shadow-xl shadow-slate-950/30 ${tones[tone]}`}
    >
      <p className="text-sm font-medium text-slate-300">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-white">{value}</p>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 font-medium text-slate-100">{value}</p>
    </div>
  );
}


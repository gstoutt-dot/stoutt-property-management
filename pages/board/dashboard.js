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
    notes: "Homeowner reported a burnt-out pool light.",
  },
];

const statusStyles = {
  Open: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  "In Progress": "border-amber-400/30 bg-amber-400/10 text-amber-100",
  "Board Decision": "border-violet-400/30 bg-violet-400/10 text-violet-100",
  Escalated: "border-red-400/30 bg-red-400/10 text-red-100",
  Completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
};

const priorityStyles = {
  Low: "bg-slate-700/70 text-slate-200",
  Medium: "bg-sky-500/20 text-sky-100",
  High: "bg-amber-500/20 text-amber-100",
  Critical: "bg-red-500/20 text-red-100",
};

export default function BoardDashboard() {
  const [actions, setActions] = useState(initialActions);
  const [title, setTitle] = useState("");

  const stats = useMemo(() => {
    return {
      open: actions.filter((a) => a.status !== "Completed").length,
      completed: actions.filter((a) => a.status === "Completed").length,
      escalated: actions.filter((a) => a.status === "Escalated").length,
    };
  }, [actions]);

  const addAction = () => {
    if (!title) return;

    setActions([
      {
        id: Date.now(),
        title,
        category: "General",
        status: "Open",
        priority: "Medium",
        assignedTo: "Management",
        dueDate: "Not set",
        boardDecisionNeeded: false,
        recommendedNextStep: "Review and assign.",
        notes: "",
      },
      ...actions,
    ]);

    setTitle("");
  };

  return (
    <>
      <Head>
        <title>BOS Dashboard</title>
      </Head>

      <main className="min-h-screen bg-slate-950 text-white p-6">
        <h1 className="text-3xl mb-6">Board Operating System</h1>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card label="Open" value={stats.open} />
          <Card label="Completed" value={stats.completed} />
          <Card label="Escalated" value={stats.escalated} />
        </div>

        {/* ADD ACTION */}
        <div className="mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New action..."
            className="p-3 w-full bg-slate-800 rounded"
          />
          <button
            onClick={addAction}
            className="mt-3 px-4 py-2 bg-teal-400 text-black rounded"
          >
            Add Action
          </button>
        </div>

        {/* ACTION LIST */}
        <div className="space-y-4">
          {actions.map((item) => (
            <div key={item.id} className="p-4 bg-slate-900 rounded">
              <div className="flex justify-between">
                <h2>{item.title}</h2>
                <span className={`px-2 py-1 text-xs rounded ${statusStyles[item.status]}`}>
                  {item.status}
                </span>
              </div>

              <p className="text-sm text-slate-400 mt-2">
                {item.recommendedNextStep}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function Card({ label, value }) {
  return (
    <div className="p-4 bg-slate-800 rounded">
      <p className="text-sm">{label}</p>
      <p className="text-2xl">{value}</p>
    </div>
  );
}


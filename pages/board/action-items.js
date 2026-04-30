import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js"; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ActionItems() {
  const [actions, setActions] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  useEffect(() => {
    fetchActions();
  }, []);

  async function fetchActions() {
    const { data } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    setActions(data || []);
  }

  async function createAction() {
    if (!title) return;

    const { data, error } = await supabase
      .from("bos_actions")
      .insert([
        {
          title,
          status: "open",
          priority: priority,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      await logEvent(data.id, `Action created (${priority})`);
      setTitle("");
      setPriority("normal");
      fetchActions();
    }
  }

  async function updateStatus(id, status) {
    await supabase.from("bos_actions").update({ status }).eq("id", id);

    await logEvent(id, `Status changed to ${status}`);
    fetchActions();
  }

  async function togglePriority(action) {
    const newPriority = action.priority === "high" ? "normal" : "high";

    await supabase
      .from("bos_actions")
      .update({ priority: newPriority })
      .eq("id", action.id);

    await logEvent(
      action.id,
      newPriority === "high"
        ? "Escalated to HIGH priority"
        : "De-escalated to NORMAL"
    );

    fetchActions();
  }

  async function logEvent(actionId, message) {
    await supabase.from("bos_events").insert([
      {
        action_id: actionId,
        message,
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-amber-400">
        Action Items
      </h1>

      {/* CREATE ACTION */}
      <div className="mb-8 bg-slate-900 border border-white/10 p-6 rounded-2xl">
        <h2 className="text-xl mb-4">Create New Action</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter action title"
          className="w-full mb-4 p-3 rounded bg-slate-800 border border-white/10"
        />

        <div className="flex items-center gap-4 mb-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="p-2 rounded bg-slate-800 border border-white/10"
          >
            <option value="normal">Normal Priority</option>
            <option value="high">High Priority</option>
          </select>

          <button
            onClick={createAction}
            className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-black font-semibold"
          >
            Create Action
          </button>
        </div>
      </div>

      {/* ACTION LIST */}
      <div className="grid gap-4">
        {actions.map((action) => (
          <div
            key={action.id}
            className={`p-5 rounded-2xl border ${
              action.priority === "high"
                ? "border-red-500 bg-red-500/10"
                : "border-white/10 bg-slate-900"
            }`}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {action.title}
              </h3>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  action.priority === "high"
                    ? "bg-red-600"
                    : "bg-slate-700"
                }`}
              >
                {action.priority.toUpperCase()}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => updateStatus(action.id, "open")}
                className="px-3 py-1 bg-slate-700 rounded"
              >
                Open
              </button>

              <button
                onClick={() => updateStatus(action.id, "in_progress")}
                className="px-3 py-1 bg-blue-600 rounded"
              >
                In Progress
              </button>

              <button
                onClick={() => updateStatus(action.id, "completed")}
                className="px-3 py-1 bg-green-600 rounded"
              >
                Completed
              </button>

              <button
                onClick={() => togglePriority(action)}
                className="px-3 py-1 bg-amber-500 text-black rounded font-semibold"
              >
                {action.priority === "high"
                  ? "De-escalate"
                  : "Escalate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

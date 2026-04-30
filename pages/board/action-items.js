import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase, createBOSAction } from "../../lib/bosClient";

export default function ActionItems() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState([]);

  async function fetchActions() {
    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setActions(data);
  }

  useEffect(() => {
    fetchActions();
  }, []);

  async function handleCreate() {
    if (!title) return setMessage("Title is required.");

    setLoading(true);
    setMessage("Creating...");

    try {
      await createBOSAction({
        title,
        status: "open",
        priority: "normal",
        module: "Action Items",
      });

      setTitle("");
      setMessage("Created.");
      fetchActions();
    } catch (err) {
      setMessage(err.message);
    }

    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    await supabase
      .from("bos_actions")
      .update({ status: newStatus })
      .eq("id", id);

    fetchActions();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold">Action Items</h1>

        {/* CREATE */}
        <div className="mt-8 max-w-xl">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter action..."
            className="w-full p-3 rounded bg-slate-900 border border-white/10"
          />

          <button
            onClick={handleCreate}
            className="mt-4 bg-amber-400 text-slate-950 px-6 py-2 rounded-full"
          >
            Create
          </button>

          <p className="mt-3 text-amber-300">{message}</p>
        </div>

        {/* LIST */}
        <div className="mt-12 space-y-4">
          {actions.map((a) => (
            <div key={a.id} className="p-4 bg-slate-900 rounded-xl border border-white/10">
              <p className="font-semibold">{a.title}</p>

              <p className="text-sm text-slate-400 mt-1">
                Status: {a.status}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => updateStatus(a.id, "open")}
                  className="px-3 py-1 text-xs border rounded"
                >
                  Open
                </button>

                <button
                  onClick={() => updateStatus(a.id, "in_progress")}
                  className="px-3 py-1 text-xs border rounded"
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateStatus(a.id, "completed")}
                  className="px-3 py-1 text-xs border rounded"
                >
                  Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

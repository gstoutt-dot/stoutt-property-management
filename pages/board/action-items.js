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

    if (!error) setActions(data || []);
  }

  useEffect(() => {
    fetchActions();
  }, []);

  async function handleCreate() {
    if (!title.trim()) {
      setMessage("Title is required.");
      return;
    }

    setLoading(true);
    setMessage("Creating action...");

    try {
      await createBOSAction({
        title: title.trim(),
        status: "open",
        priority: "normal",
        module: "Action Items",
      });

      setTitle("");
      setMessage("Action successfully written to Supabase.");
      await fetchActions();
    } catch (err) {
      setMessage("Error: " + err.message);
    }

    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    const { data, error } = await supabase
      .from("bos_actions")
      .update({ status: newStatus })
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      await supabase.from("bos_events").insert([
        {
          action_id: id,
          event_type: "status_change",
          message: `Status changed to ${newStatus}`,
          module: "Action Items",
        },
      ]);
    }

    await fetchActions();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide text-amber-300">
            Stoutt BOS
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board" className="hover:text-amber-300">Board</Link>
            <Link href="/board/command-center" className="hover:text-amber-300">Command Center</Link>
            <Link href="/board/workflow-engine" className="hover:text-amber-300">Workflow</Link>
            <Link href="/board/action-items" className="text-amber-300">Action Items</Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">Violations</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold">Action Items</h1>
        <p className="mt-4 text-slate-300">
          Create, view, and move live BOS actions through workflow status.
        </p>

        <div className="mt-8 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="mb-4 text-xl font-semibold">Create New Action</h2>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter action title..."
            className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-300/60"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="mt-5 rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Action"}
          </button>

          {message && <p className="mt-4 text-sm text-amber-300">{message}</p>}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="mb-6 text-2xl font-bold">Live Action Feed</h2>

          {actions.length === 0 ? (
            <p className="text-sm text-slate-400">No actions yet.</p>
          ) : (
            <div className="space-y-4">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <p className="text-lg font-semibold text-white">{action.title}</p>

                  <p className="mt-2 text-sm text-slate-400">
                    Status: <span className="text-amber-300">{action.status || "open"}</span>
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(action.created_at).toLocaleString()}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => updateStatus(action.id, "open")}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:border-amber-300 hover:text-amber-300"
                    >
                      Open
                    </button>

                    <button
                      onClick={() => updateStatus(action.id, "in_progress")}
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:border-amber-300 hover:text-amber-300"
                    >
                      In Progress
                    </button>

                    <button
                      onClick={() => updateStatus(action.id, "completed")}
                      className="rounded-full bg-amber-400 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300"
                    >
                      Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

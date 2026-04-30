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
    if (!title) {
      setMessage("Title is required.");
      return;
    }

    setLoading(true);
    setMessage("Creating action...");

    try {
      await createBOSAction({
        title,
        status: "open",
        priority: "normal",
        module: "Action Items",
      });

      setTitle("");
      setMessage("Action successfully written to Supabase.");

      fetchActions(); // 🔥 refresh list

    } catch (err) {
      setMessage("Error: " + err.message);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* NAV */}
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold text-amber-300">
            Stoutt BOS
          </Link>

          <nav className="hidden md:flex gap-6 text-sm text-slate-300">
            <Link href="/board">Board</Link>
            <Link href="/board/command-center">Command Center</Link>
            <Link href="/board/workflow-engine">Workflow</Link>
            <Link href="/board/action-items" className="text-amber-300">Action Items</Link>
            <Link href="/board/violation-review">Violations</Link>
          </nav>
        </div>
      </section>

      {/* HEADER */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold">Action Items</h1>
        <p className="mt-4 text-slate-300">
          Create and view live BOS actions from the system.
        </p>
      </section>

      {/* CREATE */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Create New Action</h2>

          <input
            type="text"
            placeholder="Enter action title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 rounded-lg bg-slate-900 border border-white/10 px-4 py-2 text-white"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="rounded-full bg-amber-400 px-6 py-2 text-slate-950 font-semibold hover:bg-amber-300"
          >
            {loading ? "Creating..." : "Create Action"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-amber-300">{message}</p>
          )}
        </div>
      </section>

      {/* LIVE DATA LIST */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-bold mb-6">Live Action Feed</h2>

          {actions.length === 0 ? (
            <p className="text-slate-400 text-sm">No actions yet.</p>
          ) : (
            <div className="space-y-4">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="border border-white/10 rounded-xl p-4 bg-slate-900/60"
                >
                  <p className="text-white font-semibold">{action.title}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(action.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

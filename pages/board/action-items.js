import { useState } from "react";
import Link from "next/link";
import { createBOSAction } from "../../lib/bosClient";

export default function ActionItems() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
          Create and persist board-level actions into the BOS system.
        </p>
      </section>

      {/* CREATE ACTION */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
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
    </main>
  );
}

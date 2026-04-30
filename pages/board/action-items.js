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
      let eventType = "status_change";
      let eventMessage = `Status changed to ${newStatus}`;

      if (newStatus === "in_progress") {
        eventType = "workflow_started";
        eventMessage = `Workflow started: ${data.title}`;
      }

      if (newStatus === "completed") {
        eventType = "action_completed";
        eventMessage = `Action completed: ${data.title}`;
      }

      await supabase.from("bos_events").insert([
        {
          action_id: id,
          event_type: eventType,
          message: eventMessage,
          module: "Workflow Engine",
        },
      ]);
    }

    await fetchActions();
  }

  function statusLabel(status) {
    if (status === "in_progress") return "In Progress";
    if (status === "completed") return "Completed";
    return "Open";
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

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_36%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operating System
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Action Items
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Create, view, and move live BOS actions through workflow status with
            event history written into Supabase.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
              Create Action
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white">New Board Action</h2>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter action title..."
              className="mt-6 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-300/60"
            />

            <button
              onClick={handleCreate}
              disabled={loading}
              className="mt-5 rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Action"}
            </button>

            {message && <p className="mt-4 text-sm text-amber-300">{message}</p>}

            <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-5">
              <p className="text-sm font-semibold text-amber-200">Workflow Logic Active</p>
              <p className="mt-2 text-sm leading-6 text-amber-50/90">
                Status changes now create intelligent BOS events such as workflow started
                and action completed.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  Live Feed
                </p>
                <h2 className="mt-2 text-2xl font-bold text-white">Action Register</h2>
              </div>

              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold text-amber-200">
                {actions.length} Total
              </span>
            </div>

            {actions.length === 0 ? (
              <p className="text-sm text-slate-400">No actions yet.</p>
            ) : (
              <div className="space-y-4">
                {actions.map((action) => (
                  <div
                    key={action.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">{action.title}</p>

                        <p className="mt-2 text-sm text-slate-400">
                          Status:{" "}
                          <span className="font-semibold text-amber-300">
                            {statusLabel(action.status)}
                          </span>
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(action.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3">
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/bosClient";

export default function CommandCenter() {
  const [actions, setActions] = useState([]);
  const [events, setEvents] = useState([]);

  async function loadData() {
    const { data: actionsData } = await supabase
      .from("bos_actions")
      .select("*");

    const { data: eventsData } = await supabase
      .from("bos_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    setActions(actionsData || []);
    setEvents(eventsData || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  const open = actions.filter(a => a.status === "open").length;
  const inProgress = actions.filter(a => a.status === "in_progress").length;
  const completed = actions.filter(a => a.status === "completed").length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 px-6 py-5 flex justify-between max-w-7xl mx-auto">
        <Link href="/board" className="text-amber-300 font-semibold">
          Stoutt BOS
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-slate-300">
          <Link href="/board">Board</Link>
          <Link href="/board/command-center" className="text-amber-300">Command Center</Link>
          <Link href="/board/workflow-engine">Workflow</Link>
          <Link href="/board/action-items">Action Items</Link>
          <Link href="/board/violation-review">Violations</Link>
        </nav>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold">Command Center</h1>

        {/* KPIs */}
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="p-5 bg-white/[0.04] border border-white/10 rounded-xl">
            <p className="text-sm text-slate-400">Open</p>
            <p className="text-3xl text-amber-300">{open}</p>
          </div>

          <div className="p-5 bg-white/[0.04] border border-white/10 rounded-xl">
            <p className="text-sm text-slate-400">In Progress</p>
            <p className="text-3xl text-amber-300">{inProgress}</p>
          </div>

          <div className="p-5 bg-white/[0.04] border border-white/10 rounded-xl">
            <p className="text-sm text-slate-400">Completed</p>
            <p className="text-3xl text-amber-300">{completed}</p>
          </div>

          <div className="p-5 bg-amber-300/10 border border-amber-300/20 rounded-xl">
            <p className="text-sm">System</p>
            <p className="text-2xl text-amber-300">Live</p>
          </div>
        </div>

        {/* EVENT FEED */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">System Activity (Live Events)</h2>

          {events.length === 0 ? (
            <p className="text-slate-400 text-sm">No events yet.</p>
          ) : (
            <div className="space-y-4">
              {events.map((e) => (
                <div
                  key={e.id}
                  className="p-4 border border-white/10 rounded-xl bg-slate-900/60"
                >
                  <p className="font-semibold text-white">
                    {e.message}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {e.module} · {new Date(e.created_at).toLocaleString()}
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

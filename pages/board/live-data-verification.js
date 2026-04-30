import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function LiveDataVerification() {
  const [status, setStatus] = useState("Ready to test production database writes.");
  const [loading, setLoading] = useState(false);
  const [lastActionId, setLastActionId] = useState(null);

  async function runLiveWriteTest() {
    setLoading(true);
    setStatus("Writing BOS test action to Supabase production...");

    try {
      if (!supabase) {
        throw new Error("Supabase environment variables are missing.");
      }

      const { data: actionData, error: actionError } = await supabase
        .from("bos_actions")
        .insert([
          {
            title: "Production BOS Live Write Test",
            module: "Live Data Verification",
            status: "verified",
            priority: "normal",
            description:
              "This action confirms that the deployed BOS portal can write to Supabase from production.",
          },
        ])
        .select()
        .single();

      if (actionError) throw actionError;

      const actionId = actionData?.id || null;
      setLastActionId(actionId);

      const { error: eventError } = await supabase.from("bos_events").insert([
        {
          action_id: actionId,
          event_type: "production_write_verified",
          message:
            "Production BOS live data verification completed successfully.",
          module: "Live Data Verification",
        },
      ]);

      if (eventError) throw eventError;

      setStatus("Success. Production write confirmed in bos_actions and bos_events.");
    } catch (error) {
      setStatus(`Write failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
            <Link href="/board/action-items" className="hover:text-amber-300">Action Items</Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">Violations</Link>
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.10),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Operating System
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Live Database Verification
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            This page confirms that the deployed production BOS can write live
            records into Supabase, including both the action register and event
            audit trail.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                Production Write Test
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white">
                Verify BOS Persistence
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                Click the button below from the live Vercel site. If successful,
                Supabase will receive a new record in <strong>bos_actions</strong>
                and a matching audit event in <strong>bos_events</strong>.
              </p>

              <button
                onClick={runLiveWriteTest}
                disabled={loading}
                className="mt-8 rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Testing Production Write..." : "Run Live Supabase Test"}
              </button>

              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="text-sm font-semibold text-slate-400">Current Status</p>
                <p className="mt-3 text-base leading-7 text-white">{status}</p>

                {lastActionId && (
                  <p className="mt-3 text-sm text-amber-300">
                    Last Action ID: {lastActionId}
                  </p>
                )}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                  What This Confirms
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Production environment variables are available.",
                    "The deployed BOS can connect to Supabase.",
                    "bos_actions accepts live production writes.",
                    "bos_events records audit history.",
                    "The system is ready for workflow state persistence.",
                  ].map((item, index) => (
                    <div key={item} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-300 text-sm font-bold text-slate-950">
                        {index + 1}
                      </div>
                      <p className="pt-1 text-sm leading-6 text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
                  After Success
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">
                  Move to Workflow State
                </h2>
                <p className="mt-4 text-sm leading-7 text-amber-50/90">
                  Once this test writes successfully from production, the next
                  step is persisting real workflow stages, assignments, status
                  changes, completions, and escalations.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Navigation
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <Link href="/board/command-center" className="text-sm text-amber-300 hover:text-amber-200">
                    Return to Command Center
                  </Link>
                  <Link href="/board/workflow-engine" className="text-sm text-amber-300 hover:text-amber-200">
                    Open Workflow Engine
                  </Link>
                  <Link href="/board/action-items" className="text-sm text-amber-300 hover:text-amber-200">
                    Open Action Items
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

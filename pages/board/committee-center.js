import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardCommitteeCenter() {
  const [committees, setCommittees] = useState([]);
  const [loadingCommittees, setLoadingCommittees] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadCommittees();

    const interval = setInterval(() => {
      loadCommittees();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadCommittees() {
    try {
      setLoadingCommittees(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("association_committees")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("committee_name", { ascending: true });

      if (error) {
        throw error;
      }

      setCommittees(data || []);
    } catch (error) {
      console.error("Unable to load committees:", error);
      setCommittees([]);
      setSystemMessage(error.message || "Unable to load committees.");
    } finally {
      setLoadingCommittees(false);
    }
  }

  const totalOpenItems = useMemo(
    () =>
      committees.reduce(
        (sum, committee) => sum + Number(committee.open_items || 0),
        0
      ),
    [committees]
  );

  const totalBoardReady = useMemo(
    () =>
      committees.reduce(
        (sum, committee) =>
          sum + Number(committee.board_ready_items || 0),
        0
      ),
    [committees]
  );

  const totalMeetingNotes = useMemo(
    () =>
      committees.reduce(
        (sum, committee) =>
          sum + Number(committee.meeting_notes_count || 0),
        0
      ),
    [committees]
  );

  const totalAssignedTasks = useMemo(
    () =>
      committees.reduce(
        (sum, committee) =>
          sum + Number(committee.assigned_tasks_count || 0),
        0
      ),
    [committees]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Committee Operations Center
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Committee Center
              </h1>
            </div>

            <Link
              href="/board"
              className="text-lg font-medium text-white hover:text-yellow-300"
            >
              Board Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="rounded-3xl border border-yellow-300/20 bg-gradient-to-r from-slate-900 to-slate-950 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
            Committee Oversight Queue
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Organize committee activity, recommendations, and board-ready operational review.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Manage ARC, finance, landscape, rules, and operational committees
            from one live governance center connected to board workflows,
            recommendations, notes, and association operational oversight.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric
            label="Active Committees"
            value={committees.length}
          />

          <Metric
            label="Open Recommendations"
            value={totalOpenItems}
          />

          <Metric
            label="Board Ready"
            value={totalBoardReady}
          />

          <Metric
            label="Assigned Tasks"
            value={totalAssignedTasks}
          />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
            Live Committee Queue
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Association Committees
          </h2>
        </div>

        {loadingCommittees ? (
          <Empty message="Loading committee activity..." />
        ) : committees.length === 0 ? (
          <Empty message="No committees are currently available." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {committees.map((committee) => (
              <CommitteeCard
                key={committee.id}
                committee={committee}
              />
            ))}
          </div>
        )}

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
              Governance Workflow
            </p>

            <h3 className="mt-3 text-3xl font-semibold">
              Committee Recommendation Flow
            </h3>

            <div className="mt-8 space-y-4">
              {[
                "Assign committee members and responsibilities",
                "Track meeting notes and committee recommendations",
                "Prepare board-ready recommendation summaries",
                "Route items into board operational review",
                "Track assigned committee tasks and follow-up",
                "Archive governance history and approvals",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-200">
              Governance Oversight
            </p>

            <h3 className="mt-3 text-3xl font-semibold text-emerald-100">
              Committees should create operational clarity.
            </h3>

            <div className="mt-8 space-y-5 leading-8 text-slate-300">
              <p>
                This governance layer keeps committee activity connected to
                operational workflows, board approvals, recommendations,
                financial planning, and community oversight.
              </p>

              <p>
                ARC, finance, landscape, and rules committees can now operate
                inside the same association management ecosystem instead of
                disconnected spreadsheets and emails.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-100">
              Committee activity now scales automatically for future
              association onboarding.
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

function CommitteeCard({ committee }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-xl">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3 className="text-2xl font-semibold">
            {committee.committee_name || "Committee"}
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            {committee.focus_area || "Association Operations"}
          </p>

          <p className="mt-5 leading-7 text-slate-300">
            {committee.description ||
              "Committee operational oversight."}
          </p>
        </div>

        <div className="text-right">
          <div className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
            {titleCase(committee.status || "active")}
          </div>

          <div className="mt-5 text-3xl font-bold text-yellow-300">
            {committee.open_items || 0}
          </div>

          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
            Open Items
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
        <p>
          <span className="text-slate-500">Chair:</span>{" "}
          {committee.chair_name || "Not Assigned"}
        </p>

        <p>
          <span className="text-slate-500">Board Ready:</span>{" "}
          {committee.board_ready_items || 0}
        </p>

        <p>
          <span className="text-slate-500">Meeting Notes:</span>{" "}
          {committee.meeting_notes_count || 0}
        </p>

        <p>
          <span className="text-slate-500">Assigned Tasks:</span>{" "}
          {committee.assigned_tasks_count || 0}
        </p>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-yellow-300">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-300">
        {label}
      </div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

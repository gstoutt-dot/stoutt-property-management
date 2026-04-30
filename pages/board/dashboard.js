import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function BoardDashboard() {
  const [actions, setActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("BOS load error:", error);
      setActions([]);
    } else {
      setActions(data || []);
    }

    setLastUpdated(new Date());
    setLoading(false);
  }

  async function updateBoardInteraction(id, updates) {
    setSavingId(id);

    const { error } = await supabase
      .from("bos_actions")
      .update({
        ...updates,
        board_last_interaction_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Board interaction save error:", error);
      alert(
        "This did not save. Make sure the board interaction columns exist in Supabase."
      );
    }

    await loadData();
    setSavingId(null);
  }

  async function markResolved(id) {
    setSavingId(id);

    const { error } = await supabase
      .from("bos_actions")
      .update({
        status: "completed",
        board_response: "resolved",
        board_reviewed: true,
        board_acknowledged: true,
        board_last_interaction_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("Mark resolved error:", error);
      alert("This did not save. Check the Supabase table columns.");
    }

    await loadData();
    setSavingId(null);
  }

  const summary = useMemo(() => {
    const active = actions.filter((a) => a.status !== "completed");
    const highAttention = actions.filter(
      (a) => a.priority === "high" && a.status !== "completed"
    );
    const resolved = actions.filter((a) => a.status === "completed");
    const reviewed = actions.filter((a) => a.board_reviewed === true);
    const acknowledged = actions.filter((a) => a.board_acknowledged === true);

    return {
      active: active.length,
      highAttention: highAttention.length,
      resolved: resolved.length,
      total: actions.length,
      reviewed: reviewed.length,
      acknowledged: acknowledged.length,
    };
  }, [actions]);

  const attentionItems = actions.filter(
    (a) => a.priority === "high" && a.status !== "completed"
  );

  const inProgressItems = actions.filter((a) => a.status === "in_progress");

  const completedItems = actions
    .filter((a) => a.status === "completed")
    .slice(0, 8);

  function humanStatus(status) {
    if (status === "open") return "Awaiting Action";
    if (status === "in_progress") return "Work In Progress";
    if (status === "completed") return "Completed";
    return "Under Review";
  }

  return (
    <>
      <Head>
        <title>Board Dashboard | Stoutt Property Management</title>
      </Head>

      <main className="min-h-screen bg-slate-950 text-white">
        <section className="relative overflow-hidden border-b border-amber-300/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(202,138,4,0.16),transparent_32%)]" />

          <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-amber-400">
              Board Operating System
            </p>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="max-w-5xl text-5xl font-black tracking-tight text-white md:text-7xl">
                  Board Dashboard
                </h1>

                <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
                  A live executive view of community operations, notifications,
                  board review, decisions, and management follow-through.
                </p>

                <p className="mt-5 text-sm text-slate-500">
                  Last updated:{" "}
                  {lastUpdated ? lastUpdated.toLocaleString() : "Loading..."}
                </p>
              </div>

              <button
                onClick={loadData}
                className="rounded-full bg-amber-400 px-7 py-4 font-black text-slate-950 shadow-xl shadow-amber-500/20 transition hover:bg-amber-300"
              >
                Refresh Dashboard
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          {loading ? (
            <div className="rounded-3xl border border-amber-300/10 bg-white/[0.04] p-8 text-slate-300 shadow-2xl shadow-slate-950/50">
              Loading live board dashboard...
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
                <SummaryCard label="Active" value={summary.active} />
                <SummaryCard label="Attention" value={summary.highAttention} highlight />
                <SummaryCard label="Resolved" value={summary.resolved} />
                <SummaryCard label="Total" value={summary.total} />
                <SummaryCard label="Acknowledged" value={summary.acknowledged} />
                <SummaryCard label="Reviewed" value={summary.reviewed} />
              </div>

              <DashboardSection
                eyebrow="Priority Review"
                title="Attention Required"
                emptyTitle="No urgent items require board attention."
                emptyMessage="Current open items are being managed within normal operating priority."
                emptyTone="success"
              >
                {attentionItems.length === 0 ? null : (
                  <div className="grid gap-4">
                    {attentionItems.map((item) => (
                      <BoardItem
                        key={item.id}
                        item={item}
                        status={humanStatus(item.status)}
                        tone="danger"
                        saving={savingId === item.id}
                        onInteract={updateBoardInteraction}
                        onResolve={markResolved}
                        message="This item has been elevated for immediate attention and is being actively reviewed by management."
                      />
                    ))}
                  </div>
                )}
              </DashboardSection>

              <DashboardSection
                eyebrow="Active Management"
                title="Work In Progress"
                emptyTitle="No items are currently marked as work in progress."
                emptyMessage="When management begins work on an item, it will appear here."
                emptyTone="neutral"
              >
                {inProgressItems.length === 0 ? null : (
                  <div className="grid gap-4">
                    {inProgressItems.map((item) => (
                      <BoardItem
                        key={item.id}
                        item={item}
                        status={humanStatus(item.status)}
                        tone="progress"
                        saving={savingId === item.id}
                        onInteract={updateBoardInteraction}
                        onResolve={markResolved}
                        message="Work has begun and this matter is actively being handled by management."
                      />
                    ))}
                  </div>
                )}
              </DashboardSection>

              <DashboardSection
                eyebrow="Completed Work"
                title="Recently Resolved"
                emptyTitle="No recently completed items are currently recorded."
                emptyMessage="Resolved items will appear here once they are closed in the BOS workflow."
                emptyTone="neutral"
              >
                {completedItems.length === 0 ? null : (
                  <div className="grid gap-4">
                    {completedItems.map((item) => (
                      <BoardItem
                        key={item.id}
                        item={item}
                        status="Completed"
                        tone="success"
                        saving={savingId === item.id}
                        onInteract={updateBoardInteraction}
                        onResolve={markResolved}
                        message="This item has been successfully resolved and closed in the management workflow."
                      />
                    ))}
                  </div>
                )}
              </DashboardSection>
            </>
          )}
        </section>
      </main>
    </>
  );
}

function SummaryCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-3xl border p-5 shadow-xl ${
        highlight
          ? "border-amber-400/40 bg-amber-400/10 shadow-amber-950/20"
          : "border-white/10 bg-slate-900/70 shadow-slate-950/30"
      }`}
    >
      <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400">
        {label}
      </p>

      <p
        className={`mt-4 text-4xl font-black ${
          highlight ? "text-amber-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function DashboardSection({
  eyebrow,
  title,
  children,
  emptyTitle,
  emptyMessage,
  emptyTone,
}) {
  return (
    <section className="mt-10 rounded-3xl border border-amber-300/10 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/50">
      <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-400">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-3xl font-black text-white">{title}</h2>

      <div className="mt-6">
        {children ? (
          children
        ) : (
          <EmptyState
            title={emptyTitle}
            message={emptyMessage}
            tone={emptyTone}
          />
        )}
      </div>
    </section>
  );
}

function EmptyState({ title, message, tone }) {
  const toneClass =
    tone === "success"
      ? "border-emerald-400/30 bg-emerald-400/10"
      : "border-white/10 bg-slate-950/60";

  return (
    <div className={`rounded-2xl border p-6 ${toneClass}`}>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-slate-300">{message}</p>
    </div>
  );
}

function BoardItem({ item, status, message, tone, onInteract, onResolve, saving }) {
  const [comment, setComment] = useState(item.board_comment || "");

  const toneClasses = {
    danger: "border-red-500/40 bg-red-500/10",
    progress: "border-amber-400/30 bg-amber-400/10",
    success: "border-emerald-500/30 bg-emerald-500/10",
  };

  const badgeClasses = {
    danger: "bg-red-500 text-white",
    progress: "bg-amber-400 text-slate-950",
    success: "bg-emerald-500 text-white",
  };

  const isCompleted = item.status === "completed";

  return (
    <div
      className={`rounded-2xl border p-6 ${
        toneClasses[tone] || "border-white/10 bg-slate-950/70"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-white">{item.title}</h3>

          <p className="mt-2 max-w-3xl text-slate-300">{message}</p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 font-bold text-amber-300">
              Status: {status}
            </span>

            {item.priority && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-bold text-slate-300">
                Priority: {item.priority}
              </span>
            )}

            {item.board_acknowledged && (
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-bold text-emerald-300">
                Acknowledged
              </span>
            )}

            {item.board_reviewed && (
              <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-bold text-amber-300">
                Reviewed
              </span>
            )}

            {item.board_response && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-bold text-slate-300">
                Response: {formatResponse(item.board_response)}
              </span>
            )}
          </div>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.15em] ${
            badgeClasses[tone] || "bg-slate-700 text-white"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-400">
          Board Interaction
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <ActionButton
            label="Acknowledge"
            disabled={saving}
            onClick={() =>
              onInteract(item.id, {
                board_acknowledged: true,
                board_response: "acknowledged",
              })
            }
          />

          <ActionButton
            label="Mark Reviewed"
            disabled={saving}
            onClick={() =>
              onInteract(item.id, {
                board_reviewed: true,
                board_response: "reviewed",
              })
            }
          />

          <ActionButton
            label="Request Update"
            disabled={saving}
            onClick={() =>
              onInteract(item.id, {
                board_response: "request_update",
              })
            }
          />

          <ActionButton
            label="Approve"
            disabled={saving}
            onClick={() =>
              onInteract(item.id, {
                board_response: "approved",
                board_reviewed: true,
                board_acknowledged: true,
              })
            }
          />

          <ActionButton
            label="Table"
            disabled={saving}
            onClick={() =>
              onInteract(item.id, {
                board_response: "tabled",
                board_reviewed: true,
              })
            }
          />

          {!isCompleted && (
            <ActionButton
              label="Mark Resolved"
              disabled={saving}
              danger
              onClick={() => onResolve(item.id)}
            />
          )}
        </div>

        <div className="mt-5">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a board note, question, or instruction..."
            rows={3}
            className="w-full resize-none rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/60"
          />

          <button
            onClick={() =>
              onInteract(item.id, {
                board_comment: comment,
                board_response: "comment_added",
              })
            }
            disabled={saving}
            className="mt-3 rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Board Note"}
          </button>
        </div>

        {item.board_response && (
          <p className="mt-4 text-sm text-slate-400">
            Latest board response:{" "}
            <span className="font-bold text-amber-300">
              {formatResponse(item.board_response)}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

function ActionButton({ label, onClick, disabled, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] transition disabled:opacity-50 ${
        danger
          ? "border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500 hover:text-white"
          : "border-amber-300/20 bg-amber-300/10 text-amber-300 hover:bg-amber-300 hover:text-slate-950"
      }`}
    >
      {label}
    </button>
  );
}

function formatResponse(value) {
  if (!value) return "";
  return value.replaceAll("_", " ");
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

function priorityStyle(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "critical") return "border-red-400/30 bg-red-400/10 text-red-200";
  if (value === "high") return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  if (value === "normal") return "border-sky-400/30 bg-sky-400/10 text-sky-300";

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

function formatDate(value) {
  if (!value) return "No due date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "No due date";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PortalBoardVotingCenter() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadVotingRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadVotingRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadVotingRecords({ showLoading = false } = {}) {
    try {
      if (showLoading) setLoadingRecords(true);

      setSystemMessage("");

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load voting records.");
      }

      const votingRecords = (payload.openRecords || []).filter((record) => {
        const requestType = String(record.request_type || "").toLowerCase();
        const title = String(record.title || "").toLowerCase();
        const description = String(record.description || "").toLowerCase();
        const status = String(record.status || "").toLowerCase();

        const isVotingRelated =
          requestType.includes("vote") ||
          requestType.includes("voting") ||
          requestType.includes("motion") ||
          requestType.includes("election") ||
          requestType.includes("meeting preparation") ||
          title.includes("vote") ||
          title.includes("voting") ||
          title.includes("motion") ||
          description.includes("vote") ||
          description.includes("voting") ||
          description.includes("motion");

        return isVotingRelated && !closedStatuses.includes(status);
      });

      setRecords(votingRecords);
    } catch (error) {
      console.error("Unable to load portal board voting center:", error);
      setSystemMessage(error.message || "Unable to load voting records.");
    } finally {
      setLoadingRecords(false);
    }
  }

  const criticalItems = useMemo(
    () =>
      records.filter((record) =>
        ["critical", "high"].includes(String(record.priority || "").toLowerCase())
      ),
    [records]
  );

  const motionItems = useMemo(
    () =>
      records.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("motion");
      }),
    [records]
  );

  const electionItems = useMemo(
    () =>
      records.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("election");
      }),
    [records]
  );

  const boardReviewItems = useMemo(
    () => records.filter((record) => record.board_review_required),
    [records]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Portal Board Voting Center
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Live governance voting records flowing from Admin Operations Intake into
              the board portal voting workflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/board"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Board Dashboard
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Distributed Operational Rendering
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Board voting now renders live governance records from the centralized
            operating system.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Motions, election matters, meeting preparation items, vote-ready issues,
            and board review records can be created through Admin Operations Intake
            and surfaced here for governance visibility.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/admin/operations/new?request_type=Meeting%20Preparation&return_path=/portal/board/voting-center&return_label=Portal%20Board%20Voting%20Center"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Voting Record
            </Link>

            <Link
              href="/portal/board/member-voting"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Open Member Voting
            </Link>

            <Link
              href="/board/motion-center"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Motion Center
            </Link>

            <Link
              href="/board/meeting-packet"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meeting Packet
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Voting Records" value={records.length} />
          <Metric label="Priority Items" value={criticalItems.length} />
          <Metric label="Motion Items" value={motionItems.length} />
          <Metric label="Board Review" value={boardReviewItems.length} />
        </div>

        {systemMessage && (
          <section className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </section>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <CategoryPanel title="Priority Voting Items" tone="red" items={criticalItems} />
          <CategoryPanel title="Motion-Linked Items" tone="amber" items={motionItems} />
          <CategoryPanel title="Election Items" tone="violet" items={electionItems} />
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Governance Voting Feed
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Live Voting Center Records
              </h3>
            </div>

            <Link
              href="/admin/operations/new?request_type=Meeting%20Preparation&return_path=/portal/board/voting-center&return_label=Portal%20Board%20Voting%20Center"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Voting Record
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-5 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>Type</span>
              <span>Status</span>
              <span>Assigned</span>
              <span>Due</span>
              <span>Priority</span>
            </div>

            {loadingRecords ? (
              <div className="p-6 text-sm text-slate-400">
                Loading voting records...
              </div>
            ) : records.length === 0 ? (
              <div className="p-6 text-sm text-slate-400">
                No voting records found. Use Create Voting Record to add a governance
                voting item through Admin Operations Intake.
              </div>
            ) : (
              records.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 border-t border-white/10 px-4 py-4 text-sm"
                >
                  <span>{item.request_type || "Voting Record"}</span>
                  <span>{item.status || "Submitted"}</span>
                  <span>{item.assigned_to || "Unassigned"}</span>
                  <span>{formatDate(item.due_date)}</span>
                  <span>{item.priority || "Normal"}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            Voting Workflow Connected
          </h3>

          <p className="mt-3 max-w-4xl text-slate-300">
            This page now follows the same architecture as Meeting Packet: records are
            created through Admin Operations Intake, saved into the operational record
            system, and rendered here as a live board voting center.
          </p>
        </div>
      </section>
    </main>
  );
}

function CategoryPanel({ title, items, tone }) {
  const toneClass =
    tone === "red"
      ? "border-red-400/20 bg-red-500/10 text-red-100"
      : tone === "violet"
      ? "border-violet-400/20 bg-violet-500/10 text-violet-100"
      : "border-amber-400/20 bg-amber-400/10 text-amber-100";

  return (
    <div className={`rounded-3xl border p-6 ${toneClass}`}>
      <h3 className="text-xl font-semibold">{title}</h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No records found.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
            >
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                    item.priority
                  )}`}
                >
                  {item.priority || "Normal"}
                </span>
              </div>

              <h4 className="mt-3 font-semibold text-white">
                {item.title || "Untitled Voting Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <p className="mt-3 text-xs text-slate-500">
                Due: {formatDate(item.due_date)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

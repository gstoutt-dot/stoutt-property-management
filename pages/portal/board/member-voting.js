import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const BOARD_MEMBER_NAME = "Board Member";

export default function MemberVoting() {
  const [votes, setVotes] = useState([]);
  const [voteRecords, setVoteRecords] = useState([]);
  const [selectedVote, setSelectedVote] = useState({});
  const [loadingVotes, setLoadingVotes] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadVotingData();

    const interval = setInterval(loadVotingData, 10000);
    return () => clearInterval(interval);
  }, []);

  async function loadVotingData() {
    try {
      setLoadingVotes(true);

      const { data: voteRows, error: votesError } = await supabase
        .from("association_board_votes")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("created_at", { ascending: false });

      if (votesError) throw votesError;

      const { data: recordRows, error: recordsError } = await supabase
        .from("association_board_vote_records")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("created_at", { ascending: true });

      if (recordsError) throw recordsError;

      setVotes(Array.isArray(voteRows) ? voteRows : []);
      setVoteRecords(Array.isArray(recordRows) ? recordRows : []);
    } catch (error) {
      console.error("Unable to load member voting data:", error);
      setVotes([]);
      setVoteRecords([]);
      setSystemMessage(error?.message || "Unable to load member voting data.");
    } finally {
      setLoadingVotes(false);
    }
  }

  async function submitVote(item) {
    if (!item?.id || !selectedVote[item.id]) {
      setSystemMessage("Please select Approve, Reject, or Abstain before submitting.");
      return;
    }

    try {
      setSubmittingId(item.id);
      setSystemMessage("");

      const voteValue = String(selectedVote[item.id]).toLowerCase();

      const existingRecord = voteRecords.find(
        (record) =>
          String(record.vote_id) === String(item.id) &&
          String(record.member_name || "").toLowerCase() ===
            BOARD_MEMBER_NAME.toLowerCase()
      );

      if (existingRecord?.id) {
        const { error } = await supabase
          .from("association_board_vote_records")
          .update({
            vote: voteValue,
            voted_at: new Date().toISOString(),
          })
          .eq("id", existingRecord.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("association_board_vote_records")
          .insert({
            association_id: DEFAULT_ASSOCIATION_ID,
            vote_id: item.id,
            member_name: BOARD_MEMBER_NAME,
            vote: voteValue,
            voted_at: new Date().toISOString(),
          });

        if (error) throw error;
      }

      await loadVotingData();

      setSelectedVote((current) => ({
        ...current,
        [item.id]: "",
      }));

      setSystemMessage("Vote submitted and governance record updated.");
    } catch (error) {
      console.error("Unable to submit vote:", error);
      setSystemMessage(error?.message || "Unable to submit vote.");
    } finally {
      setSubmittingId(null);
    }
  }

  const summary = useMemo(() => {
    const openVotes = votes.filter(
      (vote) => String(vote.status || "open").toLowerCase() !== "closed"
    );

    const closedVotes = votes.filter(
      (vote) => String(vote.status || "").toLowerCase() === "closed"
    );

    const quorumMet = votes.filter((vote) => {
      const records = getRecordsForVote(vote.id, voteRecords);
      const approvals = records.filter(
        (record) => String(record.vote || "").toLowerCase() === "approve"
      ).length;

      return approvals >= Number(vote.quorum_required || 3);
    });

    const pendingRecords = voteRecords.filter(
      (record) => String(record.vote || "").toLowerCase() === "pending"
    );

    return {
      openVotes,
      closedVotes,
      quorumMet,
      pendingRecords,
    };
  }, [votes, voteRecords]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto max-w-7xl px-6 py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-yellow-300">
                Governance Voting Surface
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                Member Voting
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                Review open motions, cast director votes, monitor quorum, and preserve
                board decision history across the governance workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/admin" className="navButtonGold">
                Admin Dashboard
              </Link>

              <Link href="/" className="navButton">
                Main Page
              </Link>

              <Link href="/board" className="navButton">
                Board Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-10">
        <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-slate-900 via-slate-950 to-black p-8 shadow-2xl shadow-black/30">
          <p className="text-xs uppercase tracking-[0.35em] text-yellow-300">
            Live Voting Intelligence
          </p>

          <h2 className="mt-5 max-w-5xl text-3xl font-bold leading-tight md:text-5xl">
            A calm voting surface connected to motions, meeting packets, elections,
            and signature approvals.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-5">
            <QuickLink href="/board/voting-center" label="Voting Center" />
            <QuickLink href="/board/motion-center" label="Motion Center" />
            <QuickLink href="/board/meeting-packet" label="Meeting Packet" />
            <QuickLink href="/board/elections" label="Elections" />
            <QuickLink href="/board/signature-approval-log" label="Signatures" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Open Votes" value={summary.openVotes.length} />
          <Metric label="Quorum Met" value={summary.quorumMet.length} />
          <Metric label="Pending Records" value={summary.pendingRecords.length} />
          <Metric label="Closed Votes" value={summary.closedVotes.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-100">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="space-y-5">
          {loadingVotes ? (
            <Empty message="Loading member voting records..." />
          ) : votes.length === 0 ? (
            <Empty message="No voting items are currently available. Items created from the voting center or governance workflow will appear here." />
          ) : (
            votes.map((item) => (
              <VotingCard
                key={item.id}
                item={item}
                records={getRecordsForVote(item.id, voteRecords)}
                selectedVote={selectedVote[item.id]}
                submitting={submittingId === item.id}
                onSelectVote={(value) =>
                  setSelectedVote((current) => ({
                    ...current,
                    [item.id]: value,
                  }))
                }
                onSubmit={() => submitVote(item)}
              />
            ))
          )}
        </div>
      </section>

      <style jsx>{`
        .navButton {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.05);
          color: rgb(226, 232, 240);
          border-radius: 999px;
          padding: 0.75rem 1.1rem;
          font-size: 0.85rem;
          font-weight: 700;
          transition: 0.2s ease;
        }

        .navButton:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .navButtonGold {
          border: 1px solid rgba(250, 204, 21, 0.35);
          background: rgba(250, 204, 21, 0.12);
          color: rgb(254, 240, 138);
          border-radius: 999px;
          padding: 0.75rem 1.1rem;
          font-size: 0.85rem;
          font-weight: 800;
          transition: 0.2s ease;
        }

        .navButtonGold:hover {
          background: rgba(250, 204, 21, 0.22);
          color: white;
        }
      `}</style>
    </main>
  );
}

function VotingCard({ item, records, selectedVote, submitting, onSelectVote, onSubmit }) {
  const approvals = records.filter(
    (record) => String(record.vote || "").toLowerCase() === "approve"
  ).length;

  const rejections = records.filter(
    (record) => String(record.vote || "").toLowerCase() === "reject"
  ).length;

  const abstentions = records.filter(
    (record) => String(record.vote || "").toLowerCase() === "abstain"
  ).length;

  const quorumRequired = Number(item.quorum_required || 3);
  const quorumMet = approvals >= quorumRequired;
  const status = String(item.status || "open").toLowerCase();
  const isClosed = status === "closed";

  return (
    <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <Pill>{item.id || "Vote Item"}</Pill>
            <Pill gold>{titleCase(item.vote_type || item.category || "board vote")}</Pill>
            <Pill>{titleCase(item.status || "open")}</Pill>
            <Pill>{quorumMet ? "Quorum Met" : "Quorum Pending"}</Pill>
          </div>

          <h2 className="mt-5 text-2xl font-semibold text-white">
            {item.title || item.motion_title || "Board Voting Item"}
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
            {item.description ||
              item.notes ||
              "This voting item is available for board member review and recorded governance action."}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <DetailBox label="Amount" value={formatCurrencyOrNA(item.amount)} />
            <DetailBox label="Approvals" value={`${approvals} of ${quorumRequired}`} />
            <DetailBox label="Reject / Abstain" value={`${rejections} / ${abstentions}`} />
            <DetailBox label="Deadline" value={formatDateTime(item.deadline)} />
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold">Governance Vote Record</h3>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  quorumMet
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
                }`}
              >
                {quorumMet ? "Approval threshold reached" : "Awaiting additional approval"}
              </span>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-5">
              {records.length === 0 ? (
                <div className="md:col-span-5">
                  <Empty message="No vote records have been attached to this voting item yet." />
                </div>
              ) : (
                records.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs text-slate-500">
                      {record.member_name || "Board Member"}
                    </p>

                    <p className={`mt-2 text-sm font-semibold ${voteColor(record.vote)}`}>
                      {titleCase(record.vote || "pending")}
                    </p>

                    <p className="mt-2 text-[11px] text-slate-500">
                      {formatDateTime(record.voted_at)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="w-full rounded-3xl border border-white/10 bg-black/25 p-5 xl:w-80">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Cast Director Vote
          </p>

          <div className="mt-5 space-y-3">
            {["Approve", "Reject", "Abstain"].map((vote) => (
              <button
                key={vote}
                type="button"
                onClick={() => onSelectVote(vote)}
                disabled={isClosed || submitting}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
                  selectedVote === vote
                    ? "bg-yellow-400 text-black"
                    : "border border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]"
                } disabled:cursor-not-allowed disabled:opacity-40`}
              >
                {vote}
              </button>
            ))}

            <button
              type="button"
              onClick={onSubmit}
              disabled={!selectedVote || isClosed || submitting}
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Submitting..." : isClosed ? "Vote Closed" : "Submit Vote"}
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
}

function QuickLink({ href, label }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center text-sm font-semibold text-slate-200 transition hover:border-yellow-300/30 hover:bg-yellow-300/10 hover:text-yellow-100"
    >
      {label}
    </Link>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-200">
        {value}
      </p>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-yellow-300">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function Pill({ children, gold = false }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        gold
          ? "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
          : "border-white/10 bg-white/[0.04] text-slate-300"
      }`}
    >
      {children}
    </span>
  );
}

function getRecordsForVote(voteId, records) {
  return (records || []).filter((record) => String(record.vote_id) === String(voteId));
}

function voteColor(vote) {
  const value = String(vote || "").toLowerCase();

  if (value === "approve") return "text-emerald-300";
  if (value === "reject") return "text-red-300";
  if (value === "abstain") return "text-yellow-300";

  return "text-slate-400";
}

function formatCurrencyOrNA(value) {
  if (value === null || value === undefined || value === "") return "N/A";

  const amount = Number(value);

  if (!Number.isFinite(amount)) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDateTime(value) {
  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

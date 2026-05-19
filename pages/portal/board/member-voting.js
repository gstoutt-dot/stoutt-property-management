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
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadVotingData();

    const interval = setInterval(() => {
      loadVotingData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadVotingData() {
    try {
      setLoadingVotes(true);
      setSystemMessage("");

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

      setVotes(voteRows || []);
      setVoteRecords(recordRows || []);
    } catch (error) {
      console.error("Unable to load board voting:", error);
      setVotes([]);
      setVoteRecords([]);
      setSystemMessage(error.message || "Unable to load board voting.");
    } finally {
      setLoadingVotes(false);
    }
  }

  async function submitVote(item) {
    if (!item?.id || !selectedVote[item.id]) return;

    const voteValue = selectedVote[item.id];

    const existingRecord = voteRecords.find(
      (record) =>
        record.vote_id === item.id &&
        String(record.member_name || "").toLowerCase() ===
          BOARD_MEMBER_NAME.toLowerCase()
    );

    if (existingRecord?.id) {
      const { error } = await supabase
        .from("association_board_vote_records")
        .update({
          vote: voteValue.toLowerCase(),
          voted_at: new Date().toISOString(),
        })
        .eq("id", existingRecord.id);

      if (error) {
        setSystemMessage("Unable to update vote.");
        return;
      }
    } else {
      const { error } = await supabase
        .from("association_board_vote_records")
        .insert({
          association_id: DEFAULT_ASSOCIATION_ID,
          vote_id: item.id,
          member_name: BOARD_MEMBER_NAME,
          vote: voteValue.toLowerCase(),
          voted_at: new Date().toISOString(),
        });

      if (error) {
        setSystemMessage("Unable to submit vote.");
        return;
      }
    }

    await loadVotingData();
    setSystemMessage("Vote submitted.");
  }

  const openVotes = votes.filter(
    (vote) => String(vote.status || "").toLowerCase() !== "closed"
  );

  const closedVotes = votes.filter(
    (vote) => String(vote.status || "").toLowerCase() === "closed"
  );

  const pendingMembers = voteRecords.filter(
    (record) => String(record.vote || "").toLowerCase() === "pending"
  );

  const quorumMet = votes.filter((vote) => {
    const records = getRecordsForVote(vote.id, voteRecords);
    const approvals = records.filter(
      (record) => String(record.vote || "").toLowerCase() === "approve"
    ).length;

    return approvals >= Number(vote.quorum_required || 3);
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Board Voting Control
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Member Voting
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
            Live Board Voting
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Track member votes, quorum status, pending decisions, and recorded outcomes.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Board members can review open votes, submit responses, monitor quorum,
            and maintain decision accountability across vendor payments, violations,
            policies, budgets, contracts, and operational approvals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Open Votes" value={openVotes.length} />
          <Metric label="Quorum Met" value={quorumMet.length} />
          <Metric label="Pending Members" value={pendingMembers.length} />
          <Metric label="Closed Votes" value={closedVotes.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="space-y-5">
          {loadingVotes ? (
            <Empty message="Loading board votes..." />
          ) : votes.length === 0 ? (
            <Empty message="No board votes are currently available." />
          ) : (
            votes.map((item) => (
              <VotingCard
                key={item.id}
                item={item}
                records={getRecordsForVote(item.id, voteRecords)}
                selectedVote={selectedVote[item.id]}
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
    </main>
  );
}

function VotingCard({
  item,
  records,
  selectedVote,
  onSelectVote,
  onSubmit,
}) {
  const approvals = records.filter(
    (record) => String(record.vote || "").toLowerCase() === "approve"
  ).length;

  const quorumRequired = Number(item.quorum_required || 3);
  const quorumMet = approvals >= quorumRequired;

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
              {item.id}
            </span>

            <span className="rounded-full border border-yellow-300/30 bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-200">
              {titleCase(item.vote_type || "board_vote")}
            </span>

            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {titleCase(item.status || "open_vote")}
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-semibold">
            {item.title || "Board Vote"}
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <DetailBox
              label="Amount"
              value={
                item.amount !== null && item.amount !== undefined
                  ? formatCurrency(item.amount)
                  : "N/A"
              }
            />

            <DetailBox
              label="Quorum"
              value={`${approvals} of ${quorumRequired}`}
            />

            <DetailBox
              label="Deadline"
              value={formatDateTime(item.deadline)}
            />
          </div>

          {item.notes && (
            <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300">
              {item.notes}
            </p>
          )}

          <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold">Vote Record</h3>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  quorumMet
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-yellow-300/30 bg-yellow-300/10 text-yellow-200"
                }`}
              >
                {quorumMet ? "Quorum Met" : "Quorum Pending"}
              </span>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-5">
              {records.length === 0 ? (
                <Empty message="No member vote records have been created yet." />
              ) : (
                records.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <p className="text-xs text-slate-500">
                      {record.member_name}
                    </p>

                    <p className={`mt-2 text-sm font-semibold ${voteColor(record.vote)}`}>
                      {titleCase(record.vote || "pending")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="w-full rounded-3xl border border-white/10 bg-black/20 p-5 xl:w-72">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Cast Vote
          </p>

          <div className="mt-5 space-y-3">
            {["Approve", "Reject", "Abstain"].map((vote) => (
              <button
                key={vote}
                onClick={() => onSelectVote(vote)}
                className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
                  selectedVote === vote
                    ? "bg-yellow-400 text-black"
                    : "border border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]"
                }`}
              >
                {vote}
              </button>
            ))}

            <button
              onClick={onSubmit}
              disabled={!selectedVote}
              className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Submit Vote
            </button>
          </div>
        </aside>
      </div>
    </article>
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

function getRecordsForVote(voteId, records) {
  return records.filter((record) => record.vote_id === voteId);
}

function voteColor(vote) {
  const value = String(vote || "").toLowerCase();

  if (value === "approve") return "text-emerald-300";
  if (value === "reject") return "text-red-300";
  if (value === "abstain") return "text-yellow-300";

  return "text-slate-400";
}

function formatCurrency(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatDateTime(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleString("en-US", {
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

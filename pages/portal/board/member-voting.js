import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const votingItems = [
  {
    id: "VOTE-701",
    title: "Approve Elite Electrical payment",
    type: "Vendor Payment",
    amount: "$725.00",
    status: "Open Vote",
    quorum: "3 of 5",
    deadline: "Today · 5:00 PM",
    votes: [
      { member: "President", vote: "Approve" },
      { member: "Treasurer", vote: "Approve" },
      { member: "Secretary", vote: "Pending" },
      { member: "Director 1", vote: "Pending" },
      { member: "Director 2", vote: "Approve" },
    ],
  },
  {
    id: "VOTE-702",
    title: "Commercial vehicle enforcement action",
    type: "Violation Action",
    amount: "N/A",
    status: "Open Vote",
    quorum: "2 of 5",
    deadline: "Tomorrow · 12:00 PM",
    votes: [
      { member: "President", vote: "Approve" },
      { member: "Treasurer", vote: "Pending" },
      { member: "Secretary", vote: "Reject" },
      { member: "Director 1", vote: "Pending" },
      { member: "Director 2", vote: "Approve" },
    ],
  },
];

export default function MemberVoting() {
  const [selectedVote, setSelectedVote] = useState({});

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board Voting Control</p>
              <h1 className={bosTheme.title}>Member Voting</h1>
              <p className={bosTheme.subtitle}>
                Track individual board votes, quorum status, pending decisions,
                and voting outcomes with clear accountability.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/board/approvals"
                className={bosTheme.secondaryButton}
              >
                Approval Queue
              </Link>

              <Link
                href="/portal/board/decision-history"
                className={bosTheme.primaryButton}
              >
                Decision History
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Open Votes", "6", "Awaiting decisions"],
            ["Quorum Met", "3", "Can finalize"],
            ["Pending Members", "9", "Need response"],
            ["Closed Today", "4", "Recorded decisions"],
          ].map(([label, value, detail]) => (
            <div key={label} className={bosTheme.statCard}>
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-4xl font-semibold">{value}</h2>
                <span className={bosTheme.statDot} />
              </div>
              <p className="mt-3 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 space-y-5">
          {votingItems.map((item) => (
            <article
              key={item.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>{item.id}</span>
                    <span className={bosTheme.badgeGold}>{item.type}</span>
                    <span className={bosTheme.badgeAmber}>{item.status}</span>
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold">
                    {item.title}
                  </h2>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Amount</p>
                      <p className={bosTheme.detailValue}>{item.amount}</p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Quorum</p>
                      <p className={bosTheme.detailValue}>{item.quorum}</p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Deadline</p>
                      <p className={bosTheme.detailValue}>{item.deadline}</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-white/10 bg-black/20 p-5">
                    <h3 className="text-lg font-semibold">Vote Record</h3>

                    <div className="mt-4 grid gap-3 md:grid-cols-5">
                      {item.votes.map((vote) => (
                        <div
                          key={vote.member}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                        >
                          <p className="text-xs text-slate-500">
                            {vote.member}
                          </p>

                          <p
                            className={`mt-2 text-sm font-semibold ${
                              vote.vote === "Approve"
                                ? "text-emerald-300"
                                : vote.vote === "Reject"
                                ? "text-red-300"
                                : "text-slate-400"
                            }`}
                          >
                            {vote.vote}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className={bosTheme.actionPanel}>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Cast Vote
                  </p>

                  <div className="mt-5 space-y-3">
                    {["Approve", "Reject", "Abstain"].map((vote) => (
                      <button
                        key={vote}
                        onClick={() =>
                          setSelectedVote({
                            ...selectedVote,
                            [item.id]: vote,
                          })
                        }
                        className={`w-full rounded-xl py-3 text-sm font-semibold transition ${
                          selectedVote[item.id] === vote
                            ? "bg-yellow-400 text-black"
                            : "border border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]"
                        }`}
                      >
                        {vote}
                      </button>
                    ))}

                    <button className={bosTheme.whiteButton}>
                      Submit Vote
                    </button>

                    <button className={bosTheme.outlineButton}>
                      Request Discussion
                    </button>
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

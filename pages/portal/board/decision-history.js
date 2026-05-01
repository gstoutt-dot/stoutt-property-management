import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const approvalItems = [
  {
    id: "SUB-9001",
    type: "Vendor Payment",
    title: "Pool light replacement - Elite Electrical",
    association: "Harbor Pointe HOA",
    amount: "$725.00",
    status: "Awaiting Vote",
    votes: { approve: 1, reject: 0 },
  },
  {
    id: "SUB-9002",
    type: "Violation Action",
    title: "Commercial vehicle enforcement",
    association: "Harbor Pointe HOA",
    amount: "N/A",
    status: "Awaiting Vote",
    votes: { approve: 2, reject: 1 },
  },
];

export default function BoardApprovals() {
  const [comments, setComments] = useState({});

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        {/* HEADER */}
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board Decision Engine</p>
              <h1 className={bosTheme.title}>Approval Queue</h1>
              <p className={bosTheme.subtitle}>
                Review manager-submitted items, cast votes, and document decisions
                with a full audit trail.
              </p>
            </div>

            <Link
              href="/portal/board/dashboard"
              className={bosTheme.secondaryButton}
            >
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* KPI STRIP */}
        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Awaiting Vote", "5"],
            ["Approved Today", "3"],
            ["Rejected", "1"],
            ["Avg Decision Time", "4.2h"],
          ].map(([label, value]) => (
            <div key={label} className={bosTheme.statCard}>
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-4xl font-semibold">{value}</h2>
                <span className={bosTheme.statDot} />
              </div>
            </div>
          ))}
        </section>

        {/* APPROVAL LIST */}
        <section className="mt-6 space-y-5">
          {approvalItems.map((item) => (
            <article
              key={item.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:justify-between">
                {/* LEFT */}
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>{item.id}</span>
                    <span className={bosTheme.badgeGold}>{item.type}</span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.association} · {item.amount}
                  </p>

                  {/* VOTES */}
                  <div className="mt-5 flex gap-6 text-sm">
                    <p className="text-emerald-300">
                      ✔ Approve: {item.votes.approve}
                    </p>
                    <p className="text-red-300">
                      ✖ Reject: {item.votes.reject}
                    </p>
                  </div>

                  {/* COMMENT */}
                  <textarea
                    value={comments[item.id] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [item.id]: e.target.value,
                      })
                    }
                    className="mt-5 w-full min-h-[100px] rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none focus:border-yellow-400/40"
                    placeholder="Add comment (optional but recommended)..."
                  />
                </div>

                {/* ACTION PANEL */}
                <aside className={bosTheme.actionPanel}>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Your Vote
                  </p>

                  <div className="mt-5 space-y-3">
                    <button className="w-full rounded-xl bg-emerald-400 py-3 text-sm font-semibold text-black hover:bg-emerald-300">
                      Approve
                    </button>

                    <button className="w-full rounded-xl bg-red-400 py-3 text-sm font-semibold text-black hover:bg-red-300">
                      Reject
                    </button>

                    <button className={bosTheme.outlineButton}>
                      Request Clarification
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

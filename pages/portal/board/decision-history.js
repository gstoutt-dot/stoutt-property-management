import Link from "next/link";
import bosTheme from "../../../styles/bos-theme";

const history = [
  {
    id: "SUB-8988",
    title: "Roof repair approval",
    decision: "Approved",
    date: "Today · 2:14 PM",
    votes: "3-0",
    notes: "Urgent repair approved unanimously.",
  },
  {
    id: "SUB-8987",
    title: "Fence installation request",
    decision: "Rejected",
    date: "Yesterday · 6:02 PM",
    votes: "1-2",
    notes: "Did not meet community guidelines.",
  },
  {
    id: "SUB-8986",
    title: "Landscaping enhancement",
    decision: "Approved",
    date: "Yesterday · 3:45 PM",
    votes: "2-1",
    notes: "Approved with budget adjustment.",
  },
];

export default function DecisionHistory() {
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
              <p className={bosTheme.eyebrow}>Board Audit Trail</p>
              <h1 className={bosTheme.title}>Decision History</h1>
              <p className={bosTheme.subtitle}>
                Full record of board decisions, votes, and comments for
                transparency and compliance.
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

        {/* HISTORY LIST */}
        <section className="space-y-5">
          {history.map((item) => (
            <article
              key={item.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>
                      {item.id}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        item.decision === "Approved"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-red-400/10 text-red-300"
                      }`}
                    >
                      {item.decision}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.date} · Vote: {item.votes}
                  </p>

                  <p className="mt-3 text-sm text-slate-300">
                    {item.notes}
                  </p>
                </div>

                <div className="flex items-center">
                  <button className={bosTheme.outlineButton}>
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

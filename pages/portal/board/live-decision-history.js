import Link from "next/link";
import { useEffect, useState } from "react";
import bosTheme from "../../../styles/bos-theme";

export default function LiveDecisionHistory() {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadDecisions = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/bos-demo-store");
      const result = await response.json();

      if (!result.success) {
        throw new Error("Unable to load decision history.");
      }

      setDecisions(result.data.boardDecisions || []);
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDecisions();
  }, []);

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
              <p className={bosTheme.eyebrow}>Live Audit Trail</p>
              <h1 className={bosTheme.title}>Live Decision History</h1>
              <p className={bosTheme.subtitle}>
                View Board decisions recorded through the live approvals flow,
                including vote result, decision status, notes, and timestamp.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/board/live-approvals"
                className={bosTheme.secondaryButton}
              >
                Live Approvals
              </Link>

              <button onClick={loadDecisions} className={bosTheme.primaryButton}>
                Refresh History
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Total Decisions", decisions.length, "Recorded actions"],
            [
              "Approved",
              decisions.filter((item) => item.decision === "Approved").length,
              "Passed items",
            ],
            [
              "Rejected",
              decisions.filter((item) => item.decision === "Rejected").length,
              "Declined items",
            ],
            ["Audit Ready", decisions.length, "Logged records"],
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

        {message && (
          <section className="mt-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-200">
            {message}
          </section>
        )}

        <section className="mt-6 space-y-4">
          {loading ? (
            <div className={bosTheme.card}>
              <p className="text-sm text-slate-400">Loading decision history...</p>
            </div>
          ) : decisions.length === 0 ? (
            <div className={bosTheme.card}>
              <h2 className="text-xl font-semibold">No decisions recorded yet</h2>
              <p className="mt-2 text-sm text-slate-400">
                Use Live Approvals to approve or reject an item. The decision
                will appear here automatically.
              </p>
            </div>
          ) : (
            decisions.map((item) => (
              <article
                key={item.id}
                className={`${bosTheme.card} ${bosTheme.cardHover}`}
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className={bosTheme.badgeNeutral}>{item.id}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          item.decision === "Approved"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {item.decision}
                      </span>
                      <span className={bosTheme.badgeGold}>
                        Vote {item.vote}
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {item.notes}
                    </p>

                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Submission ID</p>
                        <p className={bosTheme.detailValue}>
                          {item.submissionId}
                        </p>
                      </div>

                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Decision</p>
                        <p className={bosTheme.detailValue}>
                          {item.decision}
                        </p>
                      </div>

                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Decided At</p>
                        <p className={bosTheme.detailValue}>
                          {item.decidedAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <aside className={bosTheme.actionPanel}>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Audit Actions
                    </p>

                    <div className="mt-5 space-y-3">
                      <button className={bosTheme.goldButton}>
                        View Record
                      </button>

                      <button className={bosTheme.whiteButton}>
                        Export PDF
                      </button>

                      <Link
                        href="/portal/board/live-approvals"
                        className={bosTheme.outlineButton}
                      >
                        Back to Queue
                      </Link>
                    </div>
                  </aside>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

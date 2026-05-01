import Link from "next/link";
import { useEffect, useState } from "react";
import bosTheme from "../../../styles/bos-theme";

export default function BoardLiveApprovals() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const loadSubmissions = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/bos-demo-store");
      const result = await response.json();

      if (!result.success) {
        throw new Error("Unable to load submissions.");
      }

      setSubmissions(result.data.managerSubmissions || []);
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const recordDecision = async (submission, decision) => {
    setMessage("");

    try {
      const response = await fetch("/api/bos-demo-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "recordDecision",
          payload: {
            submissionId: submission.id,
            title: submission.title,
            decision,
            vote: decision === "Approved" ? "3-0" : "1-2",
            notes:
              decision === "Approved"
                ? "Board approved the manager-verified item."
                : "Board rejected the item and requested further review.",
          },
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Decision failed.");
      }

      setMessage(`${decision}: ${submission.id}`);
      await loadSubmissions();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    loadSubmissions();
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
              <p className={bosTheme.eyebrow}>Live Board Queue</p>
              <h1 className={bosTheme.title}>Live Approvals</h1>
              <p className={bosTheme.subtitle}>
                Pull manager-submitted items from the BOS demo store and record
                board decisions back into the shared workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/submit-to-board"
                className={bosTheme.secondaryButton}
              >
                Manager Submit
              </Link>

              <button onClick={loadSubmissions} className={bosTheme.primaryButton}>
                Refresh Queue
              </button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Live Submissions", submissions.length, "From manager queue"],
            [
              "Vendor Payments",
              submissions.filter((item) => item.type === "Vendor Payment").length,
              "Payment decisions",
            ],
            [
              "Violation Actions",
              submissions.filter((item) => item.type === "Violation Action").length,
              "Board review items",
            ],
            [
              "High Priority",
              submissions.filter((item) => item.priority === "High").length,
              "Needs attention",
            ],
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
              <p className="text-sm text-slate-400">Loading live queue...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className={bosTheme.card}>
              <h2 className="text-xl font-semibold">No submissions yet</h2>
              <p className="mt-2 text-sm text-slate-400">
                Use the Manager Submit page to send an item into this live Board
                queue.
              </p>
            </div>
          ) : (
            submissions.map((item) => (
              <article
                key={item.id}
                className={`${bosTheme.card} ${bosTheme.cardHover}`}
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className={bosTheme.badgeNeutral}>{item.id}</span>
                      <span className={bosTheme.badgeGold}>{item.type}</span>
                      <span className={bosTheme.badgeAmber}>
                        {item.priority} Priority
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {item.notes}
                    </p>

                    <div className="mt-5 grid gap-3 md:grid-cols-4">
                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Association</p>
                        <p className={bosTheme.detailValue}>
                          {item.association}
                        </p>
                      </div>

                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Amount</p>
                        <p className={bosTheme.detailValue}>{item.amount}</p>
                      </div>

                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Risk</p>
                        <p className={bosTheme.detailValue}>{item.risk}</p>
                      </div>

                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Status</p>
                        <p className={bosTheme.detailValue}>{item.status}</p>
                      </div>
                    </div>
                  </div>

                  <aside className={bosTheme.actionPanel}>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Board Decision
                    </p>

                    <div className="mt-5 space-y-3">
                      <button
                        onClick={() => recordDecision(item, "Approved")}
                        className="w-full rounded-xl bg-emerald-400 py-3 text-sm font-semibold text-black hover:bg-emerald-300"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => recordDecision(item, "Rejected")}
                        className="w-full rounded-xl bg-red-400 py-3 text-sm font-semibold text-black hover:bg-red-300"
                      >
                        Reject
                      </button>

                      <button className={bosTheme.outlineButton}>
                        Request Clarification
                      </button>
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

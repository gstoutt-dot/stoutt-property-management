import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const sampleItems = [
  {
    sourceId: "INV-7780",
    type: "Vendor Payment",
    title: "Pool light replacement - Elite Electrical",
    association: "Harbor Pointe HOA",
    amount: "$725.00",
    priority: "High",
    risk: "Low",
    notes:
      "Manager verified completed work order, matched invoice, and recommends approval for payment.",
  },
  {
    sourceId: "REQ-1047",
    type: "Violation Action",
    title: "Commercial vehicle enforcement",
    association: "Harbor Pointe HOA",
    amount: "N/A",
    priority: "Medium",
    risk: "Medium",
    notes:
      "Manager recommends board review before formal enforcement action proceeds.",
  },
  {
    sourceId: "ARC-301",
    type: "Architectural Review",
    title: "Fence installation request - Unit 301",
    association: "Harbor Pointe HOA",
    amount: "N/A",
    priority: "Medium",
    risk: "High",
    notes:
      "Owner request requires board review because proposed fence height may exceed community standards.",
  },
];

export default function SubmitToBoard() {
  const [selectedItem, setSelectedItem] = useState(sampleItems[0]);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitToBoard = async () => {
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/bos-demo-store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "submitToBoard",
          payload: selectedItem,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Submission failed.");
      }

      setStatus(`Submitted successfully: ${result.data.id}`);
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

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
              <p className={bosTheme.eyebrow}>Manager → Board Flow</p>
              <h1 className={bosTheme.title}>Submit to Board</h1>
              <p className={bosTheme.subtitle}>
                Send manager-verified items into the shared BOS demo store so
                they can appear in Board-facing review and approval queues.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/board-submission"
                className={bosTheme.secondaryButton}
              >
                Board Submission Gate
              </Link>

              <Link
                href="/portal/board/approvals"
                className={bosTheme.primaryButton}
              >
                Board Approvals
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <h2 className="text-xl font-semibold">Choose Item to Submit</h2>
            <p className="mt-2 text-sm text-slate-400">
              Select a verified item below, then submit it to the Board demo
              queue.
            </p>

            <div className="mt-6 space-y-4">
              {sampleItems.map((item) => {
                const active = selectedItem.sourceId === item.sourceId;

                return (
                  <button
                    key={item.sourceId}
                    onClick={() => {
                      setSelectedItem(item);
                      setStatus("");
                    }}
                    className={`w-full rounded-3xl border p-5 text-left transition ${
                      active
                        ? "border-yellow-400/50 bg-yellow-400/10"
                        : "border-white/10 bg-black/20 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className={bosTheme.badgeNeutral}>
                        {item.sourceId}
                      </span>
                      <span className={bosTheme.badgeGold}>{item.type}</span>
                      <span className={bosTheme.badgeAmber}>
                        {item.priority} Priority
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {item.association} · {item.amount} · {item.risk} Risk
                    </p>

                    <p className="mt-4 text-sm leading-6 text-slate-300">
                      {item.notes}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Submission Preview
            </p>

            <div className="mt-5 space-y-4">
              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Type</p>
                <p className={bosTheme.detailValue}>{selectedItem.type}</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Title</p>
                <p className={bosTheme.detailValue}>{selectedItem.title}</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Amount</p>
                <p className={bosTheme.detailValue}>{selectedItem.amount}</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Risk</p>
                <p className={bosTheme.detailValue}>{selectedItem.risk}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={submitToBoard}
                disabled={submitting}
                className={bosTheme.goldButton}
              >
                {submitting ? "Submitting..." : "Submit to Board"}
              </button>

              <Link href="/api/bos-demo-store" className={bosTheme.whiteButton}>
                View Demo Store
              </Link>

              <Link
                href="/portal/board/approvals"
                className={bosTheme.outlineButton}
              >
                Open Board Queue
              </Link>
            </div>

            {status && (
              <div className="mt-5 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 text-sm text-yellow-200">
                {status}
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const checklistItems = [
  "Vendor completed assigned scope",
  "Photos or documentation received",
  "Area inspected by manager",
  "Resident or board concern resolved",
  "Ready for invoice/payment review",
];

export default function CompletionVerification() {
  const [checkedItems, setCheckedItems] = useState([]);

  const toggleItem = (item) => {
    setCheckedItems((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item]
    );
  };

  const complete = checkedItems.length === checklistItems.length;

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
              <p className={bosTheme.eyebrow}>Manager Control Point</p>
              <h1 className={bosTheme.title}>Completion Verification</h1>
              <p className={bosTheme.subtitle}>
                Confirm vendor work is complete, documented, and manager
                approved before the item moves to invoice or Board payment
                review.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/vendor-tracking"
                className={bosTheme.secondaryButton}
              >
                Vendor Tracking
              </Link>

              <Link
                href="/portal/manager/vendor-invoices"
                className={bosTheme.primaryButton}
              >
                Invoice Review
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <div className="flex flex-wrap gap-2">
              <span className={bosTheme.badgeNeutral}>WO-2046</span>
              <span className={bosTheme.badgeGold}>Completed</span>
              <span className={bosTheme.badgeAmber}>Verification Required</span>
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              Broken irrigation head near clubhouse
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Brightscape Landscaping reported completion of the irrigation
              repair. Manager verification is required before this work order
              can be closed or matched to a vendor invoice.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-4">
              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Vendor</p>
                <p className={bosTheme.detailValue}>Brightscape Landscaping</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Association</p>
                <p className={bosTheme.detailValue}>Harbor Pointe HOA</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Location</p>
                <p className={bosTheme.detailValue}>Clubhouse Grounds</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Completed</p>
                <p className={bosTheme.detailValue}>Today · 11:35 AM</p>
              </div>
            </div>

            <div className="mt-7 rounded-3xl border border-white/10 bg-black/20 p-5">
              <h3 className="text-lg font-semibold">Verification Checklist</h3>

              <div className="mt-4 space-y-3">
                {checklistItems.map((item) => {
                  const selected = checkedItems.includes(item);

                  return (
                    <button
                      key={item}
                      onClick={() => toggleItem(item)}
                      className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm transition ${
                        selected
                          ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-200"
                          : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                      }`}
                    >
                      <span>{item}</span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                          selected
                            ? "border-yellow-400 bg-yellow-400 text-black"
                            : "border-white/20 text-slate-500"
                        }`}
                      >
                        {selected ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Verification Status
            </p>

            <div className="mt-5 rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-sm text-slate-400">Checklist Complete</p>
              <p className="mt-2 text-4xl font-semibold">
                {checkedItems.length}/{checklistItems.length}
              </p>

              <div className="mt-4 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-yellow-400 transition-all"
                  style={{
                    width: `${(checkedItems.length / checklistItems.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <button
                className={complete ? bosTheme.goldButton : bosTheme.outlineButton}
                disabled={!complete}
              >
                Approve Completion
              </button>

              <button className={bosTheme.whiteButton}>
                Return to Vendor
              </button>

              <button className={bosTheme.outlineButton}>
                Add Manager Note
              </button>

              <button className={bosTheme.outlineButton}>
                Upload Inspection Photos
              </button>
            </div>

            {!complete && (
              <p className="mt-4 text-xs leading-5 text-amber-300">
                Complete all verification items before approval is enabled.
              </p>
            )}
          </aside>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className={bosTheme.card}>
            <h2 className="text-xl font-semibold">Vendor Completion Notes</h2>
            <p className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">
              Replaced broken irrigation head, tested zone operation, and
              confirmed water pressure restored near clubhouse landscape bed.
            </p>
          </div>

          <div className={bosTheme.card}>
            <h2 className="text-xl font-semibold">Manager Verification Notes</h2>

            <textarea
              className="mt-4 min-h-36 w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-yellow-400/40"
              placeholder="Add inspection findings, photos reviewed, resident update, or closeout notes..."
            />

            <div className="mt-4 flex justify-end">
              <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-black hover:bg-yellow-300">
                Save Verification Notes
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

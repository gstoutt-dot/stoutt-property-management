import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const submissions = [
  {
    id: "SUB-9001",
    type: "Vendor Payment",
    title: "Pool light replacement - Elite Electrical",
    association: "Harbor Pointe HOA",
    amount: "$725.00",
    status: "Ready",
    risk: "Low",
  },
  {
    id: "SUB-9002",
    type: "Violation Action",
    title: "Commercial vehicle enforcement",
    association: "Harbor Pointe HOA",
    amount: "N/A",
    status: "Ready",
    risk: "Medium",
  },
  {
    id: "SUB-9003",
    type: "Architectural Review",
    title: "Fence installation request - Unit 301",
    association: "Harbor Pointe HOA",
    amount: "N/A",
    status: "Needs Manager Review",
    risk: "High",
  },
];

export default function BoardSubmission() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((i) => i !== id)
        : [...current, id]
    );
  };

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
              <p className={bosTheme.eyebrow}>Manager Final Control</p>
              <h1 className={bosTheme.title}>Board Submission Gate</h1>
              <p className={bosTheme.subtitle}>
                Final manager validation before items are submitted to the Board
                of Directors. Only fully verified items should be released.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/invoice-matching"
                className={bosTheme.secondaryButton}
              >
                Invoice Matching
              </Link>

              <button
                className={bosTheme.primaryButton}
                disabled={selected.length === 0}
              >
                Submit to Board
              </button>
            </div>
          </div>
        </header>

        {/* KPI STRIP */}
        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Ready for Board", "7", "Fully verified"],
            ["Pending Review", "3", "Manager action needed"],
            ["High Risk", "2", "Requires attention"],
            ["Submitted Today", "5", "Already sent"],
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

        {/* LIST */}
        <section className="mt-6 space-y-4">
          {submissions.map((item) => {
            const isSelected = selected.includes(item.id);

            return (
              <article
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`${bosTheme.card} ${bosTheme.cardHover} cursor-pointer ${
                  isSelected ? "border-yellow-400/40 bg-yellow-400/10" : ""
                }`}
              >
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      <span className={bosTheme.badgeNeutral}>
                        {item.id}
                      </span>
                      <span className={bosTheme.badgeGold}>
                        {item.type}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          item.risk === "Low"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : item.risk === "Medium"
                            ? "bg-amber-400/10 text-amber-300"
                            : "bg-red-400/10 text-red-300"
                        }`}
                      >
                        {item.risk} Risk
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold">
                      {item.title}
                    </h3>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Association</p>
                        <p className={bosTheme.detailValue}>
                          {item.association}
                        </p>
                      </div>

                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Amount</p>
                        <p className={bosTheme.detailValue}>
                          {item.amount}
                        </p>
                      </div>

                      <div className={bosTheme.detailBox}>
                        <p className={bosTheme.detailLabel}>Status</p>
                        <p className={bosTheme.detailValue}>
                          {item.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <aside className={bosTheme.actionPanel}>
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                      Selection
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-sm text-slate-300">
                        {isSelected ? "Selected" : "Click to Select"}
                      </p>

                      <div
                        className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs ${
                          isSelected
                            ? "bg-yellow-400 border-yellow-400 text-black"
                            : "border-white/20 text-slate-500"
                        }`}
                      >
                        {isSelected ? "✓" : ""}
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <button className={bosTheme.whiteButton}>
                        Review Details
                      </button>

                      <button className={bosTheme.outlineButton}>
                        Flag for Revision
                      </button>
                    </div>
                  </aside>
                </div>
              </article>
            );
          })}
        </section>

        {/* FOOTER ACTION */}
        <section className="mt-8 flex justify-end">
          <button
            className={bosTheme.primaryButton}
            disabled={selected.length === 0}
          >
            Submit {selected.length} Item(s) to Board
          </button>
        </section>
      </div>
    </main>
  );
}

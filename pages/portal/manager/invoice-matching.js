import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const invoices = [
  {
    id: "INV-7781",
    vendor: "Brightscape Landscaping",
    amount: "$485.00",
    workOrder: "WO-2046",
    association: "Harbor Pointe HOA",
    service: "Irrigation head repair near clubhouse",
    status: "Matched",
    confidence: "98%",
  },
  {
    id: "INV-7780",
    vendor: "Elite Electrical Solutions",
    amount: "$725.00",
    workOrder: "WO-2048",
    association: "Harbor Pointe HOA",
    service: "Pool light replacement near east gate",
    status: "Needs Review",
    confidence: "74%",
  },
  {
    id: "INV-7779",
    vendor: "AquaTech Pool Services",
    amount: "$310.00",
    workOrder: "WO-2047",
    association: "Harbor Pointe HOA",
    service: "Pool equipment pressure inspection",
    status: "Matched",
    confidence: "91%",
  },
];

export default function InvoiceMatching() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Matched", "Needs Review"];

  const filteredInvoices =
    activeFilter === "All"
      ? invoices
      : invoices.filter((invoice) => invoice.status === activeFilter);

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
              <p className={bosTheme.eyebrow}>Manager Financial Control</p>
              <h1 className={bosTheme.title}>Invoice Matching</h1>
              <p className={bosTheme.subtitle}>
                Match vendor invoices to completed work orders before payment
                approval is prepared for the Board.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/completion-verification"
                className={bosTheme.secondaryButton}
              >
                Completion Verification
              </Link>

              <Link
                href="/portal/manager/board-ready"
                className={bosTheme.primaryButton}
              >
                Send to Board
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Invoices Received", "12", "Awaiting match"],
            ["Auto Matched", "8", "High-confidence matches"],
            ["Needs Review", "3", "Manager attention required"],
            ["Board Ready", "6", "Ready for approval"],
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

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Invoice Review Queue</h2>
              <p className="mt-1 text-sm text-slate-400">
                Confirm service, amount, work order, and supporting
                documentation.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    activeFilter === filter
                      ? bosTheme.filterActive
                      : bosTheme.filterInactive
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          {filteredInvoices.map((invoice) => (
            <article
              key={invoice.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>{invoice.id}</span>
                    <span className={bosTheme.badgeGold}>{invoice.status}</span>
                    <span className={bosTheme.badgeAmber}>
                      Match Confidence {invoice.confidence}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {invoice.vendor}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {invoice.service}
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Amount</p>
                      <p className={bosTheme.detailValue}>{invoice.amount}</p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Work Order</p>
                      <p className={bosTheme.detailValue}>
                        {invoice.workOrder}
                      </p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Association</p>
                      <p className={bosTheme.detailValue}>
                        {invoice.association}
                      </p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Review Status</p>
                      <p className={bosTheme.detailValue}>{invoice.status}</p>
                    </div>
                  </div>
                </div>

                <aside className={bosTheme.actionPanel}>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Invoice Actions
                  </p>

                  <div className="mt-5 space-y-3">
                    <button className={bosTheme.goldButton}>
                      Confirm Match
                    </button>

                    <button className={bosTheme.whiteButton}>
                      View Invoice
                    </button>

                    <button className={bosTheme.outlineButton}>
                      Compare Work Order
                    </button>

                    <button className={bosTheme.outlineButton}>
                      Send to Board Approval
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

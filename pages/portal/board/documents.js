import Link from "next/link";
import bosTheme from "../../../styles/bos-theme";

const documents = [
  {
    id: "DOC-801",
    name: "Declaration of Covenants",
    category: "Governing Docs",
    updated: "Jan 12, 2026",
    status: "Active",
  },
  {
    id: "DOC-802",
    name: "Bylaws",
    category: "Governing Docs",
    updated: "Jan 12, 2026",
    status: "Active",
  },
  {
    id: "DOC-803",
    name: "Rules & Regulations",
    category: "Policies",
    updated: "Mar 2, 2026",
    status: "Active",
  },
  {
    id: "DOC-804",
    name: "April Financial Statement",
    category: "Financial",
    updated: "May 1, 2026",
    status: "New",
  },
  {
    id: "DOC-805",
    name: "Vendor Contract - Landscaping",
    category: "Vendor Contracts",
    updated: "Feb 14, 2026",
    status: "Active",
  },
];

export default function BoardDocuments() {
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
              <p className={bosTheme.eyebrow}>Board Document Center</p>
              <h1 className={bosTheme.title}>Documents</h1>
              <p className={bosTheme.subtitle}>
                Centralized access to governing documents, financials, vendor
                contracts, and board-related files.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/board/dashboard"
                className={bosTheme.secondaryButton}
              >
                Dashboard
              </Link>

              <Link
                href="/portal/board/reports"
                className={bosTheme.primaryButton}
              >
                Reports
              </Link>
            </div>
          </div>
        </header>

        {/* KPI STRIP */}
        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Total Documents", "42", "Across all categories"],
            ["New Uploads", "5", "Last 7 days"],
            ["Contracts", "9", "Active vendor agreements"],
            ["Financial Docs", "12", "Statements & reports"],
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

        {/* DOCUMENT LIST */}
        <section className="mt-6 space-y-4">
          {documents.map((doc) => (
            <article
              key={doc.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>{doc.id}</span>
                    <span className={bosTheme.badgeGold}>{doc.category}</span>
                    <span className={bosTheme.badgeAmber}>{doc.status}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">{doc.name}</h3>

                  <p className="mt-2 text-sm text-slate-400">
                    Last Updated: {doc.updated}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className={bosTheme.goldButton}>
                    View Document
                  </button>

                  <button className={bosTheme.whiteButton}>
                    Download
                  </button>

                  <button className={bosTheme.outlineButton}>
                    Share
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

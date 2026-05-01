import Link from "next/link";
import bosTheme from "../../../styles/bos-theme";

const reports = [
  {
    id: "RPT-501",
    title: "Monthly Manager Report",
    period: "May 2026",
    status: "Ready",
    detail: "Operations, violations, work orders, vendor activity, and board-ready items.",
  },
  {
    id: "RPT-502",
    title: "Financial Summary",
    period: "May 2026",
    status: "Ready",
    detail: "Cash position, receivables, pending vendor payments, and budget activity.",
  },
  {
    id: "RPT-503",
    title: "Violation Activity Report",
    period: "Last 30 Days",
    status: "Draft",
    detail: "Open violations, inspections, notices, and manager recommendations.",
  },
  {
    id: "RPT-504",
    title: "Work Order Performance",
    period: "Last 30 Days",
    status: "Ready",
    detail: "Response times, dispatch activity, completion verification, and vendor follow-up.",
  },
];

export default function BoardReports() {
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
              <p className={bosTheme.eyebrow}>Board Intelligence</p>
              <h1 className={bosTheme.title}>Reports</h1>
              <p className={bosTheme.subtitle}>
                Board-ready operational and financial reports prepared from the
                manager-controlled BOS workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/board/dashboard"
                className={bosTheme.secondaryButton}
              >
                Board Dashboard
              </Link>

              <Link
                href="/portal/board/financials"
                className={bosTheme.primaryButton}
              >
                Financials
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Reports Ready", "8", "Available to board"],
            ["Draft Reports", "3", "Manager review"],
            ["Shared This Month", "12", "Sent to directors"],
            ["Decision Links", "21", "Connected records"],
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

        <section className="mt-6 grid gap-5 md:grid-cols-2">
          {reports.map((report) => (
            <article
              key={report.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-wrap gap-2">
                <span className={bosTheme.badgeNeutral}>{report.id}</span>
                <span className={bosTheme.badgeGold}>{report.status}</span>
                <span className={bosTheme.badgeAmber}>{report.period}</span>
              </div>

              <h2 className="mt-5 text-2xl font-semibold">{report.title}</h2>

              <p className="mt-3 min-h-12 text-sm leading-6 text-slate-300">
                {report.detail}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <button className={bosTheme.goldButton}>View Report</button>
                <button className={bosTheme.whiteButton}>Download</button>
                <button className={bosTheme.outlineButton}>Share</button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

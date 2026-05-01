import Link from "next/link";
import bosTheme from "../../../styles/bos-theme";

const boardItems = [
  {
    id: "SUB-9001",
    type: "Vendor Payment",
    title: "Pool light replacement - Elite Electrical",
    association: "Harbor Pointe HOA",
    amount: "$725.00",
    status: "Board Approval Needed",
    priority: "High",
  },
  {
    id: "SUB-9002",
    type: "Violation Action",
    title: "Commercial vehicle enforcement",
    association: "Harbor Pointe HOA",
    amount: "N/A",
    status: "Board Review",
    priority: "Medium",
  },
  {
    id: "SUB-9003",
    type: "Architectural Review",
    title: "Fence installation request - Unit 301",
    association: "Harbor Pointe HOA",
    amount: "N/A",
    status: "Pending Vote",
    priority: "Medium",
  },
];

export default function BoardDashboard() {
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
              <p className={bosTheme.eyebrow}>Board of Directors Portal</p>
              <h1 className={bosTheme.title}>Board Dashboard</h1>
              <p className={bosTheme.subtitle}>
                Review manager-verified items, approve vendor payments, monitor
                operational decisions, and track association activity from one
                executive-level control center.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/login-board" className={bosTheme.secondaryButton}>
                Board Login
              </Link>

              <Link
                href="/portal/board/approvals"
                className={bosTheme.primaryButton}
              >
                Approval Queue
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Pending Approvals", "7", "Require board action"],
            ["Vendor Payments", "$4,820", "Awaiting approval"],
            ["Open Violations", "12", "Board visibility"],
            ["ARC Requests", "5", "Pending review"],
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

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Board Action Queue</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Items released by management for board review.
                </p>
              </div>

              <Link
                href="/portal/board/approvals"
                className="rounded-2xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
              >
                View All
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {boardItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className={bosTheme.badgeNeutral}>
                          {item.id}
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
                        {item.association} · {item.amount} · {item.status}
                      </p>
                    </div>

                    <Link
                      href="/portal/board/approvals"
                      className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm font-medium text-slate-200 hover:bg-white/[0.1]"
                    >
                      Review
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Executive Snapshot
            </p>

            <div className="mt-5 space-y-4">
              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Cash Position</p>
                <p className={bosTheme.detailValue}>$184,250.00</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Delinquencies</p>
                <p className={bosTheme.detailValue}>$18,430.00</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Open Work Orders</p>
                <p className={bosTheme.detailValue}>14 Active</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Next Meeting</p>
                <p className={bosTheme.detailValue}>May 14 · 6:30 PM</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/portal/board/financials"
                className={bosTheme.goldButton}
              >
                View Financials
              </Link>

              <Link href="/portal/board/reports" className={bosTheme.whiteButton}>
                Board Reports
              </Link>

              <Link
                href="/portal/board/documents"
                className={bosTheme.outlineButton}
              >
                Documents
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

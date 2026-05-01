import Link from "next/link";
import bosTheme from "../../../styles/bos-theme";

const financialRows = [
  {
    label: "Operating Cash",
    value: "$184,250.00",
    status: "Healthy",
  },
  {
    label: "Reserve Cash",
    value: "$426,800.00",
    status: "Stable",
  },
  {
    label: "Accounts Receivable",
    value: "$18,430.00",
    status: "Needs Monitoring",
  },
  {
    label: "Vendor Payments Pending",
    value: "$4,820.00",
    status: "Board Approval",
  },
];

const pendingPayments = [
  {
    id: "PAY-3011",
    vendor: "Elite Electrical Solutions",
    service: "Pool light replacement",
    amount: "$725.00",
    status: "Awaiting Approval",
  },
  {
    id: "PAY-3012",
    vendor: "Brightscape Landscaping",
    service: "Irrigation repair",
    amount: "$485.00",
    status: "Awaiting Approval",
  },
  {
    id: "PAY-3013",
    vendor: "AquaTech Pool Services",
    service: "Pool pressure inspection",
    amount: "$310.00",
    status: "Manager Verified",
  },
];

export default function BoardFinancials() {
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
              <p className={bosTheme.eyebrow}>Board Financial Center</p>
              <h1 className={bosTheme.title}>Financials</h1>
              <p className={bosTheme.subtitle}>
                Review association cash position, receivables, pending vendor
                payments, and manager-verified financial activity before Board
                action.
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
                href="/portal/board/approvals"
                className={bosTheme.primaryButton}
              >
                Approval Queue
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {financialRows.map((item) => (
            <div key={item.label} className={bosTheme.statCard}>
              <p className="text-sm text-slate-400">{item.label}</p>
              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-3xl font-semibold tracking-tight">
                  {item.value}
                </h2>
                <span className={bosTheme.statDot} />
              </div>
              <p className="mt-3 text-xs text-yellow-300">{item.status}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Pending Vendor Payments
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Manager-verified payments awaiting Board visibility or
                  approval.
                </p>
              </div>

              <Link
                href="/portal/board/approvals"
                className="rounded-2xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
              >
                Review Approvals
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {pendingPayments.map((payment) => (
                <article
                  key={payment.id}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className={bosTheme.badgeNeutral}>
                          {payment.id}
                        </span>
                        <span className={bosTheme.badgeGold}>
                          {payment.status}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold">
                        {payment.vendor}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        {payment.service} · {payment.amount}
                      </p>
                    </div>

                    <Link
                      href="/portal/board/approvals"
                      className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-center text-sm font-medium text-slate-200 hover:bg-white/[0.1]"
                    >
                      Review Payment
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Financial Snapshot
            </p>

            <div className="mt-5 space-y-4">
              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Monthly Budget</p>
                <p className={bosTheme.detailValue}>$42,000.00</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Month-to-Date Spend</p>
                <p className={bosTheme.detailValue}>$27,850.00</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Budget Remaining</p>
                <p className={bosTheme.detailValue}>$14,150.00</p>
              </div>

              <div className={bosTheme.detailBox}>
                <p className={bosTheme.detailLabel}>Collection Rate</p>
                <p className={bosTheme.detailValue}>94.8%</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                href="/portal/board/reports"
                className={bosTheme.goldButton}
              >
                View Reports
              </Link>

              <Link
                href="/portal/board/decision-history"
                className={bosTheme.whiteButton}
              >
                Decision History
              </Link>

              <Link
                href="/portal/board/documents"
                className={bosTheme.outlineButton}
              >
                Financial Documents
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

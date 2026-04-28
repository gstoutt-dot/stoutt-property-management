import Link from "next/link";

const transactions = [
  {
    date: "Apr 1, 2026",
    description: "Monthly Assessment",
    type: "Assessment",
    charge: "$350.00",
    payment: "—",
    balance: "$350.00",
  },
  {
    date: "Apr 7, 2026",
    description: "Late Fee",
    type: "Fee",
    charge: "$25.00",
    payment: "—",
    balance: "$375.00",
  },
  {
    date: "Apr 10, 2026",
    description: "Owner Payment",
    type: "Payment",
    charge: "—",
    payment: "$200.00",
    balance: "$175.00",
  },
  {
    date: "Apr 15, 2026",
    description: "Pool Special Assessment",
    type: "Special Assessment",
    charge: "$310.00",
    payment: "—",
    balance: "$485.00",
  },
];

export default function HomeownerLedgerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Stoutt Property Management"
              className="h-16 w-auto object-contain lg:h-20"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/homeowner-dashboard" className="transition hover:text-white">
              Dashboard
            </Link>
            <Link href="/homeowner/ledger" className="text-amber-300">
              Ledger
            </Link>
            <Link href="/homeowner/work-orders" className="transition hover:text-white">
              Work Orders
            </Link>
            <Link href="/homeowner/documents" className="transition hover:text-white">
              Documents
            </Link>
          </nav>

          <Link
            href="/homeowner-login"
            className="rounded-full border border-amber-400/40 bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Sign Out
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_28%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Account Ledger
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Balance & Payment History
              </h1>
              <p className="mt-3 text-lg text-white/65">
                Environ Towers I — Unit 1204
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/homeowner/payment"
                className="rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-amber-300"
              >
                Make Payment
              </Link>
              <Link
                href="/homeowner-dashboard"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                Current Balance
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                $485.00
              </h2>
              <p className="mt-2 text-sm text-white/60">Amount due</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                Next Assessment
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white">
                $350.00
              </h2>
              <p className="mt-2 text-sm text-white/60">Due May 1, 2026</p>
            </div>

            <div className="rounded-[1.75rem] border border-amber-400/25 bg-amber-400 p-6 text-slate-950">
              <p className="text-xs font-bold uppercase tracking-[0.22em]">
                Aging Status
              </p>
              <h2 className="mt-4 text-3xl font-semibold">Current</h2>
              <p className="mt-2 text-sm text-slate-800">No 30/60/90 aging</p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                Auto-Pay
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Off</h2>
              <p className="mt-2 text-sm text-white/60">Setup coming soon</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                    Transaction History
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">
                    Running Ledger
                  </h2>
                </div>

                <select className="rounded-full border border-white/10 bg-slate-900 px-5 py-3 text-sm text-white outline-none">
                  <option>All Transactions</option>
                  <option>Assessments</option>
                  <option>Payments</option>
                  <option>Fees</option>
                  <option>Special Assessments</option>
                </select>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-[0.18em] text-white/45">
                    <tr>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Description</th>
                      <th className="px-5 py-4">Type</th>
                      <th className="px-5 py-4 text-right">Charge</th>
                      <th className="px-5 py-4 text-right">Payment</th>
                      <th className="px-5 py-4 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {transactions.map((item) => (
                      <tr key={`${item.date}-${item.description}`} className="text-white/75">
                        <td className="px-5 py-5">{item.date}</td>
                        <td className="px-5 py-5 font-medium text-white">
                          {item.description}
                        </td>
                        <td className="px-5 py-5">
                          <span className="rounded-full border border-amber-400/25 px-3 py-1 text-xs text-amber-300">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-5 py-5 text-right">{item.charge}</td>
                        <td className="px-5 py-5 text-right">{item.payment}</td>
                        <td className="px-5 py-5 text-right font-semibold text-white">
                          {item.balance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/homeowner/payment"
                  className="rounded-full bg-amber-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-amber-300"
                >
                  Make Payment
                </Link>
                <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
                  Download Statement
                </button>
                <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
                  Request Ledger Review
                </button>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-emerald-400/25 bg-emerald-500/10 p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-300">
                  Account Standing
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white">
                  In Good Standing
                </h2>
                <p className="mt-4 text-sm leading-6 text-white/65">
                  Your account is current with no 30, 60, or 90-day aging balance
                  showing in this demo ledger.
                </p>
              </div>

              <div className="rounded-[2rem] border border-amber-400/25 bg-amber-400 p-7 text-slate-950">
                <p className="text-sm font-bold uppercase tracking-[0.25em]">
                  Ask Ava
                </p>
                <h2 className="mt-4 text-3xl font-semibold">
                  Ledger help
                </h2>
                <p className="mt-4 text-sm leading-6 text-slate-800">
                  Ava can explain balances, assessments, payments, fees, and
                  posting dates.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "What is my current balance?",
                    "Why is there a late fee?",
                    "When is my next payment due?",
                    "Show my last payment.",
                  ].map((prompt) => (
                    <Link
                      key={prompt}
                      href="/homeowner/ava"
                      className="block rounded-2xl bg-slate-950/90 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
                    >
                      {prompt}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

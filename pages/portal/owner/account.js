// File: /portal/owner/account.js

import Link from "next/link";

const accountSummary = {
  ownerName: "Michael Reynolds",
  propertyAddress: "1842 Harbor Palm Drive, Unit 204",
  association: "Harbor Palm Villas HOA",
  accountStatus: "Current",
  balance: "$0.00",
  nextAssessment: "$425.00",
  dueDate: "June 1, 2026",
  autopay: "Enabled",
};

const ledgerItems = [
  {
    date: "May 1, 2026",
    description: "Monthly Assessment Payment",
    type: "Payment",
    amount: "-$425.00",
    status: "Posted",
  },
  {
    date: "May 1, 2026",
    description: "Monthly Assessment Charge",
    type: "Charge",
    amount: "$425.00",
    status: "Posted",
  },
  {
    date: "Apr 1, 2026",
    description: "Monthly Assessment Payment",
    type: "Payment",
    amount: "-$425.00",
    status: "Posted",
  },
  {
    date: "Apr 1, 2026",
    description: "Monthly Assessment Charge",
    type: "Charge",
    amount: "$425.00",
    status: "Posted",
  },
];

export default function OwnerAccount() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Top Navigation */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-green-400 hover:text-green-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">My Account</h1>
            <p className="mt-2 text-white/60">
              View your balance, assessment history, and payment information.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-green-400 hover:text-white transition">
              Download Statement
            </button>
            <button className="rounded-2xl bg-green-500 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-green-400 transition">
              Make Payment
            </button>
          </div>
        </div>

        {/* Account Hero */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-green-400">Owner Account</p>
                  <h2 className="mt-3 text-3xl font-bold">{accountSummary.ownerName}</h2>
                  <p className="mt-2 text-white/60">{accountSummary.propertyAddress}</p>
                  <p className="mt-1 text-white/50">{accountSummary.association}</p>
                </div>

                <div className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-300">
                  {accountSummary.accountStatus}
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <p className="text-sm text-white/50">Current Balance</p>
                  <p className="mt-2 text-3xl font-bold text-green-300">{accountSummary.balance}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <p className="text-sm text-white/50">Next Assessment</p>
                  <p className="mt-2 text-3xl font-bold">{accountSummary.nextAssessment}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                  <p className="text-sm text-white/50">Due Date</p>
                  <p className="mt-2 text-3xl font-bold">{accountSummary.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <h3 className="text-xl font-bold">Payment Settings</h3>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60">Autopay</span>
                  <span className="font-semibold text-green-300">{accountSummary.autopay}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60">Payment Method</span>
                  <span className="font-semibold">ACH •••• 4182</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-white/60">Delivery</span>
                  <span className="font-semibold">Email</span>
                </div>
                <div className="pt-2">
                  <button className="w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/80 hover:border-green-400 hover:text-white transition">
                    Manage Payment Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Ledger */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Recent Ledger Activity</h2>
                <p className="mt-1 text-sm text-white/50">Latest charges, payments, and account postings.</p>
              </div>
              <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-green-400 hover:text-white transition">
                View All
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-900/90 text-white/50">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                    <th className="px-4 py-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {ledgerItems.map((item, index) => (
                    <tr key={index} className="bg-slate-950/30 hover:bg-white/[0.04] transition">
                      <td className="px-4 py-4 text-white/60">{item.date}</td>
                      <td className="px-4 py-4 font-medium">{item.description}</td>
                      <td className="px-4 py-4 text-white/60">{item.type}</td>
                      <td className={`px-4 py-4 text-right font-semibold ${item.amount.includes("-") ? "text-green-300" : "text-white"}`}>
                        {item.amount}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-300">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Quick Actions</h2>
            <p className="mt-1 text-sm text-white/50">Common account tasks.</p>

            <div className="mt-6 space-y-3">
              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left hover:border-green-400 transition">
                <p className="font-semibold">Make a Payment</p>
                <p className="mt-1 text-sm text-white/50">Pay your assessment balance.</p>
              </button>

              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left hover:border-green-400 transition">
                <p className="font-semibold">Set Up Autopay</p>
                <p className="mt-1 text-sm text-white/50">Automate monthly payments.</p>
              </button>

              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left hover:border-green-400 transition">
                <p className="font-semibold">Request Ledger Review</p>
                <p className="mt-1 text-sm text-white/50">Ask management to review an item.</p>
              </button>

              <button className="w-full rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-left hover:border-green-400 transition">
                <p className="font-semibold">Update Contact Info</p>
                <p className="mt-1 text-sm text-white/50">Keep your owner profile current.</p>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// File: /portal/owner/payments.js

import Link from "next/link";

const paymentMethods = [
  {
    id: "PM-1001",
    type: "ACH Bank Account",
    label: "Operating Checking •••• 4182",
    status: "Primary",
    autopay: "Enabled",
  },
  {
    id: "PM-1002",
    type: "Credit Card",
    label: "Visa •••• 7741",
    status: "Backup",
    autopay: "Not Used",
  },
];

const upcomingPayments = [
  {
    id: "PAY-7008",
    description: "June Monthly Assessment",
    amount: "$425.00",
    dueDate: "June 1, 2026",
    status: "Scheduled",
  },
  {
    id: "PAY-7009",
    description: "Special Assessment Installment",
    amount: "$150.00",
    dueDate: "June 15, 2026",
    status: "Not Scheduled",
  },
];

const recentPayments = [
  {
    id: "RCPT-6104",
    date: "May 1, 2026",
    description: "May Monthly Assessment",
    method: "ACH •••• 4182",
    amount: "$425.00",
    status: "Posted",
  },
  {
    id: "RCPT-6049",
    date: "Apr 1, 2026",
    description: "April Monthly Assessment",
    method: "ACH •••• 4182",
    amount: "$425.00",
    status: "Posted",
  },
  {
    id: "RCPT-5992",
    date: "Mar 1, 2026",
    description: "March Monthly Assessment",
    method: "ACH •••• 4182",
    amount: "$425.00",
    status: "Posted",
  },
];

function statusClass(status) {
  if (status === "Scheduled" || status === "Posted" || status === "Primary") {
    return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
  }

  if (status === "Not Scheduled" || status === "Backup") {
    return "border-yellow-400/30 bg-yellow-400/10 text-yellow-300";
  }

  return "border-white/10 bg-white/5 text-white/70";
}

export default function OwnerPayments() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Payments</h1>
            <p className="mt-2 text-white/60">
              Make payments, manage autopay, and review posted receipts.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition">
              Add Payment Method
            </button>
            <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
              Make Payment
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Payment Center</p>
          <h2 className="mt-3 text-3xl font-bold text-yellow-100">Current Balance: $0.00</h2>
          <p className="mt-3 max-w-3xl text-yellow-50/80">
            Your account is current. The next scheduled assessment payment is set for June 1, 2026.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Current Balance</p>
            <p className="mt-2 text-4xl font-bold text-yellow-300">$0</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Next Payment</p>
            <p className="mt-2 text-4xl font-bold">$425</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Autopay</p>
            <p className="mt-2 text-4xl font-bold">On</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Payment Method</p>
            <p className="mt-2 text-4xl font-bold">ACH</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Upcoming Payments */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Upcoming Payments</h2>
                <p className="mt-1 text-sm text-white/50">Scheduled charges and upcoming assessment obligations.</p>
              </div>

              <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                Manage Autopay
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {upcomingPayments.map((payment) => (
                <div key={payment.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-white/50">{payment.id} • Due {payment.dueDate}</p>
                      <h3 className="mt-1 text-xl font-semibold">{payment.description}</h3>
                      <p className="mt-2 text-2xl font-bold text-yellow-300">{payment.amount}</p>
                    </div>

                    <div className="flex flex-col gap-3 md:items-end">
                      <span className={`w-fit rounded-full border px-4 py-2 text-sm font-semibold ${statusClass(payment.status)}`}>
                        {payment.status}
                      </span>
                      <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-2xl font-bold">Payment Methods</h2>
            <p className="mt-1 text-sm text-white/50">Saved payment options for this owner account.</p>

            <div className="mt-6 space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 hover:border-yellow-400 transition">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{method.type}</p>
                      <p className="mt-1 text-sm text-white/50">{method.label}</p>
                      <p className="mt-1 text-sm text-yellow-300">Autopay: {method.autopay}</p>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(method.status)}`}>
                      {method.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recent Receipts</h2>
              <p className="mt-1 text-sm text-white/50">Posted owner payments and receipts.</p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
              Download Receipts
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/90 text-white/50">
                <tr>
                  <th className="px-4 py-3 font-medium">Receipt</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Method</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="bg-slate-950/30 hover:bg-white/[0.04] transition">
                    <td className="px-4 py-4 text-white/60">{payment.id}</td>
                    <td className="px-4 py-4 text-white/60">{payment.date}</td>
                    <td className="px-4 py-4 font-medium">{payment.description}</td>
                    <td className="px-4 py-4 text-white/60">{payment.method}</td>
                    <td className="px-4 py-4 text-right font-semibold text-yellow-300">{payment.amount}</td>
                    <td className="px-4 py-4 text-right">
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

import { useMemo, useState } from "react"; 

const ownerAccount = {
  associationName: "Sunset Condominium Association",
  ownerName: "Robert Mitchell",
  unitNumber: "101",
  accountNumber: "SUN-101",
  currentBalance: 450,
  monthlyAssessment: 600,
  paymentStatus: "Attention",
  paymentMethod: "ACH / Card Ready",
};

const paymentOptions = [
  {
    label: "Pay Current Balance",
    amount: 450,
    description: "Bring the owner account current based on mirrored balance.",
  },
  {
    label: "Pay Monthly Assessment",
    amount: 600,
    description: "Pay the standard monthly assessment for this unit.",
  },
  {
    label: "Custom Payment",
    amount: null,
    description: "Allow owner to enter a custom amount for partial payment.",
  },
];

const paymentHistory = [
  {
    date: "2026-05-01",
    type: "ACH Payment",
    amount: 600,
    status: "Posted",
  },
  {
    date: "2026-04-03",
    type: "Card Payment",
    amount: 600,
    status: "Posted",
  },
  {
    date: "2026-03-05",
    type: "ACH Payment",
    amount: 550,
    status: "Posted",
  },
];

export default function OwnerPaymentCenterPreview() {
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);

  const totalPaid = useMemo(() => {
    return paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-8">
        <header className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            SPM Owner Payments
          </p>

          <h1 className="mt-4 max-w-5xl text-4xl font-semibold tracking-tight md:text-5xl">
            Owner Payment Center Preview
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A calm owner-facing payment experience for reviewing balances,
            choosing a payment amount, and preparing ACH or card payments.
          </p>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <Metric
            label="Current Balance"
            value={`$${ownerAccount.currentBalance.toLocaleString()}`}
          />
          <Metric
            label="Monthly Assessment"
            value={`$${ownerAccount.monthlyAssessment.toLocaleString()}`}
          />
          <Metric label="Payment Status" value={ownerAccount.paymentStatus} />
          <Metric label="Methods" value={ownerAccount.paymentMethod} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 shadow-2xl">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">
                Owner Account
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                {ownerAccount.ownerName}
              </h2>

              <div className="mt-6 space-y-4">
                <SnapshotRow label="Association" value={ownerAccount.associationName} />
                <SnapshotRow label="Unit" value={ownerAccount.unitNumber} />
                <SnapshotRow label="Account" value={ownerAccount.accountNumber} />
                <SnapshotRow label="Total Paid Recently" value={`$${totalPaid.toLocaleString()}`} />
              </div>
            </div>

            <a
              href="/owner-financial-dashboard-preview"
              className="block rounded-[2rem] border border-white/10 bg-white/5 p-6 font-semibold text-white transition hover:border-amber-300/40 hover:bg-white/10"
            >
              Back to Owner Financial Dashboard
            </a>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                Payment Selection
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Choose Payment Option
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {paymentOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setSelectedPayment(option)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    selectedPayment.label === option.label
                      ? "border-amber-300/50 bg-amber-300/10"
                      : "border-white/10 bg-slate-950/40 hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold text-white">{option.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-amber-300">
                    {option.amount ? `$${option.amount.toLocaleString()}` : "Custom"}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {option.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-400/10 p-6">
              <p className="font-semibold text-emerald-200">
                Payment Ready
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                This preview prepares the owner payment experience. The future
                production version will connect to the selected payment processor
                and post payment status back into the accounting workflow.
              </p>

              <button
                type="button"
                className="mt-5 rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-400/20"
              >
                Continue to Payment
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Type</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {paymentHistory.map((payment) => (
                    <tr key={`${payment.date}-${payment.type}`} className="bg-slate-950/40">
                      <td className="px-5 py-4 text-slate-400">{payment.date}</td>
                      <td className="px-5 py-4 text-slate-300">{payment.type}</td>
                      <td className="px-5 py-4 font-semibold text-emerald-300">
                        ${payment.amount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <Status value={payment.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

function SnapshotRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-right text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function Status({ value }) {
  return (
    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
      {value}
    </span>
  );
}

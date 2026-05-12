import Link from "next/link";

export default function HomeownerDashboard() {
  const owner = {
    name: "Robert Mitchell",
    unit: "101",
    association: "Sunset Condominium Association",
    balance: "$0.00",
    monthlyAssessment: "$450.00",
    lastPayment: "$450.00 on May 1, 2026",
    paymentStatus: "Current",
    accountHealth: "Healthy",
    syncedAt: "Synced from QuickBooks today",
  };

  const requests = [
    ["Maintenance Request", "Under Review", "Kitchen sink leak reported"],
    ["Account Review", "Received", "Requested balance confirmation"],
    ["Document Request", "Completed", "Statement copy available"],
  ];

  const notices = [
    "Your account is current.",
    "May statement is available for download.",
    "Next monthly assessment posts June 1, 2026.",
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Welcome, {owner.name}
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Unit {owner.unit} · {owner.association}
              </p>
            </div>

            <Link
              href="/homeowner-login"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/10 p-7 lg:col-span-2">
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">
              Current Balance
            </p>

            <div className="mt-4 text-5xl font-bold text-yellow-300">
              {owner.balance}
            </div>

            <p className="mt-4 text-slate-300">
              Payment status:{" "}
              <span className="font-semibold text-emerald-300">
                {owner.paymentStatus}
              </span>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/homeowner/ledger"
                className="rounded-full bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                View Ledger & Payments
              </Link>

              <Link
                href="/homeowner/account-review"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
              >
                Request Account Review
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
            <p className="text-sm text-slate-400">Account Health</p>
            <div className="mt-3 text-3xl font-bold text-emerald-300">
              {owner.accountHealth}
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Your account is in good standing with no urgent payment action
              needed.
            </p>
            <p className="mt-5 text-xs text-slate-500">{owner.syncedAt}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Monthly Assessment", owner.monthlyAssessment],
            ["Last Payment", owner.lastPayment],
            ["Open Requests", "2 Active"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 text-2xl font-bold text-white">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:col-span-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-yellow-400">
                Requests & Updates
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Recent Activity
              </h2>
            </div>

            <Link
              href="/homeowner/work-orders"
              className="text-sm font-semibold text-yellow-300"
            >
              Submit Request →
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {requests.map(([title, status, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                    {status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Notices & Messages
            </p>

            <div className="mt-5 space-y-3">
              {notices.map((notice) => (
                <div
                  key={notice}
                  className="rounded-2xl bg-slate-900/70 p-4 text-sm text-slate-300"
                >
                  {notice}
                </div>
              ))}
            </div>

            <Link
              href="/homeowner/messages"
              className="mt-5 inline-block text-sm font-semibold text-yellow-300"
            >
              View Messages →
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Documents & Statements
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Download statements, notices, forms, and association documents.
            </p>

            <Link
              href="/homeowner/documents"
              className="mt-5 inline-block rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Open Documents
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Need Help?
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ask Ava for help with payments, documents, notices, requests, and
              account questions.
            </p>

            <Link
              href="/homeowner/ava"
              className="mt-5 inline-block text-sm font-semibold text-yellow-300"
            >
              Ask Ava →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

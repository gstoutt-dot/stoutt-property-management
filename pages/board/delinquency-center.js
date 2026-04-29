import Link from "next/link";

export default function BoardDelinquencyCenter() {
  const accounts = [
    {
      title: "Owner account over 90 days",
      stage: "Attorney Review",
      balance: "$3,840",
      status: "High Priority",
      desc: "Account has exceeded internal escalation threshold and requires board visibility before attorney referral.",
    },
    {
      title: "Payment plan request",
      stage: "Board Consideration",
      balance: "$1,925",
      status: "Sensitive",
      desc: "Owner has requested payment arrangement requiring manager summary and board review.",
    },
    {
      title: "Recurring late payment pattern",
      stage: "Manager Review",
      balance: "$875",
      status: "Watch",
      desc: "Account has repeated late-payment activity and should be monitored for escalation.",
    },
    {
      title: "Pre-lien notice pending",
      stage: "Collection Step",
      balance: "$2,460",
      status: "Action Needed",
      desc: "Collection timeline requires confirmation before next formal notice is issued.",
    },
  ];

  const workflow = [
    "Import receivable data from QuickBooks",
    "Identify aging balances and repeat delinquency patterns",
    "Review owner communication and payment history",
    "Prepare payment plan or escalation recommendation",
    "Route attorney referral items for board visibility",
    "Document board direction and archive collection steps",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Stoutt Property Management
            </div>
            <h1 className="mt-1 text-2xl font-semibold">
              Delinquency & Collections Center
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/board" className="hover:text-amber-300">
              Board Portal
            </Link>
            <Link href="/board/violation-review" className="hover:text-amber-300">
              Violations
            </Link>
            <Link href="/board/architectural-approvals" className="hover:text-amber-300">
              ARC Approvals
            </Link>
            <Link href="/board/maintenance-review" className="hover:text-amber-300">
              Maintenance
            </Link>
            <Link href="/board/financial-review" className="hover:text-amber-300">
              Financials
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-14">
        <section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
            Receivables • Payment Plans • Attorney Referrals
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Give boards clear visibility into collections without turning every balance into a meeting problem.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track aging balances, payment plans, collection stages, attorney
                referrals, owner hardship requests and QuickBooks-linked receivable
                trends from one controlled oversight center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Past-Due Exposure</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                $18.7K
              </div>
              <div className="mt-4 text-slate-300">
                4 accounts require review or escalation.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Past-Due Accounts", "9"],
            ["Over 90 Days", "3"],
            ["Payment Plans", "2"],
            ["Attorney Review", "1"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-7"
            >
              <div className="text-sm text-slate-400">{label}</div>
              <div className="mt-3 text-4xl font-semibold text-amber-300">
                {value}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Collections Queue
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Accounts Requiring Review
            </h3>
          </div>

          <div className="space-y-5">
            {accounts.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.75fr_0.65fr_0.7fr] lg:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{item.title}</h4>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Stage
                    </div>
                    <div className="mt-2 text-slate-200">{item.stage}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Balance
                    </div>
                    <div className="mt-2 text-amber-300">{item.balance}</div>
                  </div>

                  <div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Collections Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Receivable Control Path
            </h3>

            <div className="mt-8 space-y-4 text-slate-300">
              {workflow.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              QuickBooks Receivable Intelligence
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Collections Without Chaos
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                Boards need visibility into delinquency trends without being buried
                in raw accounting reports. This module turns receivable data into
                clear collection stages, decision points and manager recommendations.
              </p>

              <p>
                SPM can connect QuickBooks receivable activity with owner
                communication, payment plans, attorney referrals and board-sensitive
                decisions so collections stay organized and consistent.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This supports SPM’s stronger collections positioning while keeping
              board oversight structured, professional and documented.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

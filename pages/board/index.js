import Link from "next/link";

export default function BoardDashboard() {
  const primaryCards = [
    {
      title: "Violation Review",
      href: "/board/violation-review",
      stat: "12 Open",
      desc: "Pending covenant enforcement decisions requiring board review."
    },
    {
      title: "ARC Approvals",
      href: "/board/architectural-approvals",
      stat: "7 Pending",
      desc: "Architectural requests awaiting decision and vote."
    },
    {
      title: "Maintenance Review",
      href: "/board/maintenance-review",
      stat: "5 Priority",
      desc: "Work orders and major repairs requiring board visibility."
    },
    {
      title: "Financial Review",
      href: "/board/financial-review",
      stat: "3 Alerts",
      desc: "Budget exceptions, delinquency trends and reserve items."
    }
  ];

  const operationsCards = [
    { title: "Documents", href: "/board/documents" },
    { title: "Action Items", href: "/board/action-items" },
    { title: "Messages", href: "/board/messages" },
    { title: "Calendar", href: "/board/calendar" },
    { title: "Reports", href: "/board/reports" },
    { title: "Vendors", href: "/board/vendors" },
    { title: "Reserves", href: "/board/reserves" },
    { title: "Settings", href: "/board/settings" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-5">
            <div>
              <div className="text-xs tracking-[0.25em] uppercase text-amber-400">
                Stoutt Property Management
              </div>
              <h1 className="text-2xl font-semibold mt-1">
                Board Portal Command Center
              </h1>
            </div>

            {/* 5-Item Max Header Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/board" className="hover:text-amber-300 transition">
                Board Portal
              </Link>
              <Link href="/board/violation-review" className="hover:text-amber-300 transition">
                Violations
              </Link>
              <Link href="/board/architectural-approvals" className="hover:text-amber-300 transition">
                ARC Approvals
              </Link>
              <Link href="/board/maintenance-review" className="hover:text-amber-300 transition">
                Maintenance
              </Link>
              <Link href="/board/financial-review" className="hover:text-amber-300 transition">
                Financials
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Metrics */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["Pending Decisions","24"],
            ["Open Action Items","18"],
            ["Reserve Alerts","3"],
            ["Delinquency Cases","9"]
          ].map(([label,val]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl"
            >
              <div className="text-slate-400 text-sm">{label}</div>
              <div className="text-4xl font-semibold mt-3 text-amber-300">
                {val}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Primary Decision Queues */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="text-amber-400 uppercase tracking-[0.2em] text-xs">
            Board Decision Queues
          </div>
          <h2 className="text-3xl font-semibold mt-3">
            Priority Review Modules
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {primaryCards.map((item)=>(
            <Link key={item.title} href={item.href}>
              <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8 hover:border-amber-400/50 transition cursor-pointer">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold group-hover:text-amber-300">
                    {item.title}
                  </h3>
                  <span className="px-4 py-2 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm">
                    {item.stat}
                  </span>
                </div>

                <p className="text-slate-300 mt-5 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-8 text-amber-300 font-medium">
                  Open Module →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Operations Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="text-amber-400 uppercase tracking-[0.2em] text-xs">
            Supporting Modules
          </div>
          <h2 className="text-3xl font-semibold mt-3">
            Operations & Governance
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {operationsCards.map((item)=>(
            <Link key={item.title} href={item.href}>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:border-amber-400/40 transition cursor-pointer">
                <h3 className="text-xl font-medium mb-4">
                  {item.title}
                </h3>
                <div className="text-amber-300 text-sm">
                  Open →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* QuickBooks + AI Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-amber-400 uppercase text-xs tracking-[0.2em]">
              Accounting Layer
            </div>
            <h3 className="text-3xl font-semibold mt-3">
              QuickBooks Integration
            </h3>

            <ul className="mt-6 space-y-4 text-slate-300">
              <li>• AP approvals awaiting authorization</li>
              <li>• Delinquency reporting sync</li>
              <li>• Reserve funding monitoring</li>
              <li>• Budget variance alerts</li>
            </ul>

            <div className="mt-8">
              <Link
                href="/board/settings"
                className="inline-block rounded-2xl bg-amber-400 text-slate-900 px-6 py-3 font-semibold"
              >
                Open Integration Settings
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <div className="text-amber-400 uppercase text-xs tracking-[0.2em]">
              Intelligent Systems
            </div>
            <h3 className="text-3xl font-semibold mt-3">
              AI Assistant Escalations
            </h3>

            <ul className="mt-6 space-y-4 text-slate-300">
              <li>• Resident issue escalations flagged</li>
              <li>• Policy exceptions requiring board review</li>
              <li>• High-priority maintenance AI alerts</li>
              <li>• Meeting agenda recommendations</li>
            </ul>

            <div className="mt-8">
              <Link
                href="/board/settings"
                className="inline-block rounded-2xl border border-amber-400/40 px-6 py-3 text-amber-300 font-semibold"
              >
                Open AI Assistant Settings
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Board Activity */}
      <section className="max-w-7xl mx-auto px-6 py-14 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="text-amber-400 uppercase text-xs tracking-[0.2em]">
            Recent Activity
          </div>

          <h3 className="text-3xl font-semibold mt-3 mb-8">
            Board Decision Feed
          </h3>

          <div className="space-y-5">
            {[
              "Roof vendor proposal moved to board vote",
              "Architectural request approved pending conditions",
              "Reserve transfer exception flagged for review",
              "Delinquency escalation sent from QuickBooks workflow"
            ].map((item)=>(
              <div
                key={item}
                className="p-5 rounded-2xl border border-white/10 bg-slate-900"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

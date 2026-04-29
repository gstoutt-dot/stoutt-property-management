import Link from "next/link";

export default function HomeownerDashboard() {
  const modules = [
    {
      title: "Ledger & Payments",
      description: "View balances, charges, payments, and account history.",
      href: "/homeowner/ledger",
      stat: "$0.00",
      label: "Current balance",
    },
    {
      title: "Work Orders",
      description: "Submit maintenance requests and track ticket progress.",
      href: "/homeowner/work-orders",
      stat: "3",
      label: "Open requests",
    },
    {
      title: "Violations",
      description: "Review notices, respond, and track compliance matters.",
      href: "/homeowner/violations",
      stat: "1",
      label: "Pending response",
    },
    {
      title: "Architectural Review",
      description: "Submit ARC requests and follow approval status.",
      href: "/homeowner/architectural-review-requests",
      stat: "2",
      label: "Active requests",
    },
    {
      title: "Documents",
      description: "Access governing documents, forms, notices, and records.",
      href: "/homeowner/documents",
      stat: "39",
      label: "Available files",
    },
    {
      title: "Messages",
      description: "View announcements, reminders, alerts, and direct messages.",
      href: "/homeowner/messages",
      stat: "1",
      label: "Unread notice",
    },
    {
      title: "Ask Ava",
      description: "Get AI-powered help with rules, notices, documents, and requests.",
      href: "/homeowner/ava",
      stat: "AI",
      label: "Assistant online",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.22),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Homeowner Dashboard
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Manage your association account, requests, notices, documents,
                messages, and Ava support from one secure location.
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
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Account Status", "Good"],
            ["Open Requests", "3"],
            ["Unread Notices", "1"],
            ["Ava Status", "Online"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 text-3xl font-bold text-yellow-400">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6">
          <p className="text-sm font-medium text-yellow-400">
            Portal Modules
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            What would you like to do?
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.title}
              href={module.href}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-yellow-400/40 hover:bg-white/[0.07]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{module.label}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    {module.title}
                  </h3>
                </div>

                <div className="rounded-2xl bg-yellow-400/10 px-4 py-2 text-lg font-bold text-yellow-300">
                  {module.stat}
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-300">
                {module.description}
              </p>

              <div className="mt-6 text-sm font-semibold text-yellow-300 transition group-hover:translate-x-1">
                Open Module →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

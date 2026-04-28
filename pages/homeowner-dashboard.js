import Link from "next/link";

const dashboardCards = [
  {
    title: "Current Balance",
    value: "$485.00 Due",
    detail: "Next assessment due May 1, 2026",
    href: "/homeowner/ledger",
    action: "View Ledger",
  },
  {
    title: "Last Payment",
    value: "$350.00",
    detail: "Received April 1, 2026",
    href: "/homeowner/payment",
    action: "Make Payment",
  },
  {
    title: "Work Orders",
    value: "1 Active Request",
    detail: "Pool light repair pending assignment",
    href: "/homeowner/work-orders",
    action: "View Requests",
  },
  {
    title: "Violations",
    value: "Account in Compliance",
    detail: "Account currently in compliance",
    href: "/homeowner/violations",
    action: "View Compliance",
  },
  {
    title: "ARC Requests",
    value: "No Active Requests",
    detail: "Submit exterior changes for review",
    href: "/homeowner/arc",
    action: "Submit Request",
  },
  {
    title: "Documents",
    value: "Documents Available",
    detail: "Declaration, bylaws, rules, forms",
    href: "/homeowner/documents",
    action: "View Documents",
  },
];

export default function HomeownerDashboardPage() {
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
            <Link href="/homeowner-dashboard" className="text-amber-300">
              Dashboard
            </Link>
            <Link href="/homeowner/ledger" className="transition hover:text-white">
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
                Homeowner Dashboard
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Welcome, Homeowner
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
                href="/homeowner/ava"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Ask Ava
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-5 sm:grid-cols-2">
              {dashboardCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                    {card.title}
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">
                    {card.value}
                  </h2>
                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-white/60">
                    {card.detail}
                  </p>
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex rounded-full border border-amber-400/35 px-5 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400 hover:text-slate-950"
                  >
                    {card.action}
                  </Link>
                </div>
              ))}
            </div>

            <aside className="rounded-[2rem] border border-amber-400/25 bg-amber-400 p-7 text-slate-950 shadow-2xl shadow-amber-500/10">
              <p className="text-sm font-bold uppercase tracking-[0.25em]">
                Ava Assistant
              </p>
              <h2 className="mt-4 text-3xl font-semibold">
                How can I help today?
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-800">
                I can help with balances, payments, work orders, documents,
                violations, ARC requests, and community questions.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "What is my current balance?",
                  "Do I have open work orders?",
                  "Where are the pool rules?",
                  "Do I have any violations?",
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

              <div className="mt-7 rounded-3xl bg-white/45 p-5">
  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-800">
    Action Items
  </p>

  <div className="mt-4 space-y-3 text-sm font-medium text-slate-900">
    <div className="flex items-center justify-between gap-4">
      <span>Payment due</span>
      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
        $485
      </span>
    </div>

    <div className="flex items-center justify-between gap-4">
      <span>Compliance status</span>
      <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
        Good
      </span>
    </div>

    <div className="flex items-center justify-between gap-4">
      <span>Work order</span>
      <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
        1 Open
      </span>
    </div>
  </div>
</div>

<Link
  href="/homeowner/ava"
  className="mt-5 block rounded-full bg-slate-950 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:scale-[1.02]"
>
  Start Conversation
</Link>
            </aside>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/45">
                  Private Access
                </p>
                <p className="mt-2 text-white/70">
                  Secure homeowner records, association documents, and service
                  tools in one Stoutt-controlled operating environment.
                </p>
              </div>

              <Link
                href="/homeowner/messages"
                className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                View Messages
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

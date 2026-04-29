import Link from "next/link";

const approvals = [
  {
    title: "Pool Lighting Vendor Agreement",
    category: "Contract",
    priority: "High",
    status: "Ready for Vote",
    reviewer: "Board President",
    deadline: "May 8, 2026",
    linked: "Document Approval / Motion Center",
    history: "Reviewed by manager and attached to pending motion.",
  },
  {
    title: "Updated Collection Policy",
    category: "Policy",
    priority: "High",
    status: "Board Review",
    reviewer: "Treasurer",
    deadline: "May 10, 2026",
    linked: "Policy Library / Resolution Tracker",
    history: "Draft updated after attorney comments.",
  },
  {
    title: "Annual Budget Draft",
    category: "Budget",
    priority: "Medium",
    status: "Comments Requested",
    reviewer: "Treasurer / Finance Committee",
    deadline: "May 30, 2026",
    linked: "Budget Planning / Annual Requirements",
    history: "Initial draft uploaded for board review.",
  },
  {
    title: "Insurance Renewal Recommendation",
    category: "Insurance",
    priority: "Medium",
    status: "Awaiting Review",
    reviewer: "Board President",
    deadline: "June 12, 2026",
    linked: "Insurance Center / Compliance Calendar",
    history: "Carrier comparison prepared and routed.",
  },
];

const queueTypes = [
  "Contracts ready for vote",
  "Policies awaiting adoption",
  "Budget items awaiting approval",
  "Insurance items awaiting approval",
  "Documents awaiting review",
  "Legal items pending board action",
  "Vendor approvals",
  "Resolution attachments",
];

export default function BoardApprovalQueue() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/board" className="text-lg font-semibold tracking-wide">
            Stoutt Board Portal
          </Link>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Portal</Link>
            <Link href="/board/violation-review">Violations</Link>
            <Link href="/board/architectural-approvals">ARC Approvals</Link>
            <Link href="/board/maintenance-review">Maintenance</Link>
            <Link href="/board/financial-review">Financials</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Approval Workflow
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Approval Queue
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            A centralized queue for pending board approvals, vote-ready items,
            documents awaiting review, contracts, policies, budget approvals,
            insurance decisions, assigned reviewers, deadlines, and approval
            history.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Boards often lose time because approval items are scattered across
              emails, packets, notes, and follow-up messages. This queue brings
              every pending decision into one clean command center.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Decision-Ready Items</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The board can instantly see what is ready for vote, what needs
              review, what is missing documentation, and who owns the next step.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Approval Discipline</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Each item includes a deadline, category, priority, reviewer,
              linked workflow, and history so approval decisions stay organized
              and defensible.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Pending Approvals", "16"],
            ["Ready for Vote", "5"],
            ["High Priority", "4"],
            ["Approved This Month", "21"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-bold text-amber-300">{value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Approval Queue</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Items awaiting review, comments, vote, approval, or archive.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Add Approval Item
              </button>
            </div>

            <div className="space-y-5">
              {approvals.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.category} · {item.priority} Priority · Due{" "}
                        {item.deadline}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="text-slate-500">Reviewer:</span>{" "}
                      {item.reviewer}
                    </p>
                    <p>
                      <span className="text-slate-500">Linked Workflow:</span>{" "}
                      {item.linked}
                    </p>
                    <p className="md:col-span-2">
                      <span className="text-slate-500">Approval History:</span>{" "}
                      {item.history}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Queue Categories</h2>
              <div className="mt-5 grid gap-3">
                {queueTypes.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Approval Statuses</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Awaiting review</p>
                <p>• Comments requested</p>
                <p>• Missing documents</p>
                <p>• Legal review complete</p>
                <p>• Ready for vote</p>
                <p>• Approved and archived</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            The Board’s Decision Command Center
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This approval queue gives every board a disciplined way to manage
            pending decisions. Instead of chasing emails or wondering what still
            needs approval, the board can see each item, its owner, its deadline,
            its documents, and its approval path in one place.
          </p>
        </section>
      </section>
    </main>
  );
}

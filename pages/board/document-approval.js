import Link from "next/link";

const documents = [
  {
    title: "Updated Collection Policy Draft",
    category: "Policy",
    status: "Pending Board Approval",
    reviewer: "Treasurer / Legal Counsel",
    due: "May 10, 2026",
    linked: "Policy Library / Resolution Tracker",
    history: "Reviewed by manager, routed to board",
  },
  {
    title: "Pool Lighting Vendor Agreement",
    category: "Contract",
    status: "Needs Final Vote",
    reviewer: "Board President",
    due: "May 8, 2026",
    linked: "Maintenance / Motion Center",
    history: "Proposal approved, contract packet attached",
  },
  {
    title: "Annual Budget Draft Package",
    category: "Budget",
    status: "In Review",
    reviewer: "Treasurer",
    due: "May 30, 2026",
    linked: "Budget Planning / Annual Requirements",
    history: "Draft uploaded for board review",
  },
  {
    title: "Insurance Renewal Summary",
    category: "Insurance",
    status: "Awaiting Comments",
    reviewer: "Board President",
    due: "June 12, 2026",
    linked: "Insurance Center / Compliance Calendar",
    history: "Carrier comparison prepared",
  },
];

const approvalTypes = [
  "Policy drafts",
  "Contract drafts",
  "Budget documents",
  "Meeting packet items",
  "Legal review documents",
  "Insurance documents",
  "Vendor documents",
  "Resolution attachments",
];

export default function BoardDocumentApproval() {
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
            Controlled Document Review
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Document Approval Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Review, track, approve, and archive board-facing documents including
            policy drafts, contracts, budget packages, meeting packet items,
            legal documents, insurance summaries, and vendor materials.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Important documents should not be approved from scattered emails
              or informal text chains. This center gives the board a clean,
              controlled approval path.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Clear Review Ownership</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every document has an assigned reviewer, due date, linked module,
              status, approval history, and supporting governance trail.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Approval Confidence</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Board members can see which documents are drafts, which need legal
              review, which are ready for vote, and which have already been
              approved.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Pending Approval", "11"],
            ["In Review", "7"],
            ["Needs Vote", "4"],
            ["Approved This Year", "63"],
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
                <h2 className="text-2xl font-semibold">
                  Documents Pending Action
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Documents routed for board review, comments, vote, or final
                  approval.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Upload Document
              </button>
            </div>

            <div className="space-y-5">
              {documents.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.category} · Due {item.due}
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
              <h2 className="text-xl font-semibold">Approval Categories</h2>
              <div className="mt-5 grid gap-3">
                {approvalTypes.map((item) => (
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
                <p>• Draft uploaded</p>
                <p>• Manager reviewed</p>
                <p>• Legal review needed</p>
                <p>• Board comments pending</p>
                <p>• Ready for motion</p>
                <p>• Approved and archived</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            A More Professional Approval Process
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This center gives boards a disciplined way to approve important
            documents. Every draft, contract, policy, budget, insurance summary,
            and legal document can be routed, reviewed, approved, linked, and
            archived with a clean governance trail.
          </p>
        </section>
      </section>
    </main>
  );
}

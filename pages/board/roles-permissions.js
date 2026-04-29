import Link from "next/link";

const roles = [
  {
    role: "Board President",
    access: "Full Governance Access",
    approvals: "Contracts, resolutions, emergency actions",
    documents: "View / approve / request changes",
    financials: "View financial summaries and budget packets",
    legal: "View legal matters and privileged summaries",
    status: "Active",
  },
  {
    role: "Treasurer",
    access: "Financial & Budget Access",
    approvals: "Budgets, assessments, collections, financial reports",
    documents: "View / approve financial documents",
    financials: "Full financial review access",
    legal: "View financial-related legal items",
    status: "Active",
  },
  {
    role: "Secretary",
    access: "Records & Meeting Access",
    approvals: "Minutes, notices, motions, governance records",
    documents: "Manage packets, minutes, motions, resolutions",
    financials: "View budget summaries",
    legal: "View board-approved legal records",
    status: "Active",
  },
  {
    role: "Director",
    access: "Board Member Access",
    approvals: "Vote and comment on assigned board items",
    documents: "View board packets and assigned documents",
    financials: "View approved financial summaries",
    legal: "Limited legal summary access",
    status: "Active",
  },
  {
    role: "Community Manager",
    access: "Operational Management Access",
    approvals: "Prepare items, route approvals, update statuses",
    documents: "Upload, organize, assign, and archive documents",
    financials: "Prepare budget and QuickBooks-linked summaries",
    legal: "Track legal items and attorney follow-ups",
    status: "Active",
  },
];

const permissionAreas = [
  "View-only access",
  "Approval authority",
  "Document upload",
  "Document approval",
  "Financial visibility",
  "Legal visibility",
  "Vendor access",
  "Committee access",
  "Report exports",
  "Audit trail access",
];

export default function BoardRolesPermissions() {
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
            Secure Board Access
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board User Roles & Permissions
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Control access for presidents, treasurers, secretaries, directors,
            managers, committee members, view-only users, approval authority,
            document permissions, financial access, legal visibility, and
            permission change history.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Not every user should see or approve the same information. This
              center protects sensitive records while giving each board role the
              access needed to do its job.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Role-Based Access</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Presidents, treasurers, secretaries, directors, managers, and
              committee members can each have different viewing, approval,
              document, financial, and legal permissions.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Permission Audit Trail</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Permission changes can be logged so the board knows who changed
              access, when it changed, and what authority was added or removed.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Active Roles", "12"],
            ["Approval Users", "5"],
            ["View-Only Users", "8"],
            ["Recent Changes", "3"],
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
                <h2 className="text-2xl font-semibold">Role Matrix</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Access levels organized by board position, approval authority,
                  document access, financial visibility, and legal permissions.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Add Role
              </button>
            </div>

            <div className="space-y-5">
              {roles.map((item) => (
                <div
                  key={item.role}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.access}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.role}
                      </h3>
                    </div>

                    <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="text-slate-500">Approval Authority:</span>{" "}
                      {item.approvals}
                    </p>
                    <p>
                      <span className="text-slate-500">Document Permissions:</span>{" "}
                      {item.documents}
                    </p>
                    <p>
                      <span className="text-slate-500">Financial Access:</span>{" "}
                      {item.financials}
                    </p>
                    <p>
                      <span className="text-slate-500">Legal Access:</span>{" "}
                      {item.legal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Permission Areas</h2>
              <div className="mt-5 grid gap-3">
                {permissionAreas.map((item) => (
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
              <h2 className="text-xl font-semibold">Recent Permission Changes</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Treasurer granted budget export access</p>
                <p>• Committee chair added as view-only user</p>
                <p>• Former director access removed</p>
                <p>• Manager legal tracking access confirmed</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Secure Access With Clear Authority
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This permissions center gives the Board Portal the control layer it
            needs before becoming operational. Each user sees what they should
            see, approves only what they are authorized to approve, and every
            permission change can be reviewed as part of the portal’s governance
            audit trail.
          </p>
        </section>
      </section>
    </main>
  );
}

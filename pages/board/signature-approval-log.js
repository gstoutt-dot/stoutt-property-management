import Link from "next/link";

const signatureItems = [
  {
    title: "Pool Lighting Vendor Agreement",
    category: "Contract Approval",
    signer: "Board President",
    date: "May 8, 2026",
    status: "Pending Signature",
    linked: "Approval Queue / Motion Center",
    certification:
      "Awaiting final board signature after vote-ready contract packet review.",
  },
  {
    title: "Updated Collection Policy Adoption",
    category: "Policy Approval",
    signer: "Treasurer",
    date: "May 10, 2026",
    status: "Awaiting Approval",
    linked: "Policy Library / Resolution Tracker",
    certification:
      "Policy draft reviewed with attorney comments and routed for approval certification.",
  },
  {
    title: "Annual Budget Adoption Packet",
    category: "Budget Approval",
    signer: "Treasurer / Secretary",
    date: "May 30, 2026",
    status: "In Review",
    linked: "Budget Planning / Annual Requirements",
    certification:
      "Budget packet will require approval timestamp and board certification after adoption.",
  },
  {
    title: "Insurance Renewal Authorization",
    category: "Insurance Approval",
    signer: "Board President",
    date: "June 12, 2026",
    status: "Pending Review",
    linked: "Insurance Center / Compliance Calendar",
    certification:
      "Insurance renewal approval will be logged with signer, date, and supporting documents.",
  },
];

const approvalTypes = [
  "Contract approvals",
  "Policy approvals",
  "Resolution approvals",
  "Budget approvals",
  "Insurance approvals",
  "Vendor authorizations",
  "Meeting packet certifications",
  "Legal document acknowledgments",
  "Board vote confirmations",
  "Archive-ready approval records",
];

export default function BoardSignatureApprovalLog() {
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
            Certified Board Approvals
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Digital Signature & Approval Log
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Track electronic approvals, digital signatures, approval timestamps,
            signer identity, contract approvals, policy approvals, resolution
            approvals, budget approvals, insurance authorizations, and approval
            certification history.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Board approvals need more than informal consent. This log creates
              a clear record of who approved what, when it was approved, and
              which documents supported the approval.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Signature Accountability</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Every approval can include the signer, timestamp, document link,
              approval category, vote reference, and certification status.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Audit-Ready Records</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Signed approvals can connect back to motions, resolutions,
              documents, contracts, policies, budgets, insurance items, and the
              governance archive.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Pending Signatures", "6"],
            ["Signed This Month", "14"],
            ["Certified Approvals", "82"],
            ["Linked Records", "119"],
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
                <h2 className="text-2xl font-semibold">Signature Queue</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Board approvals awaiting signature, certification, archive, or
                  linked governance record completion.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Add Signature Item
              </button>
            </div>

            <div className="space-y-5">
              {signatureItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.category} · Due {item.date}
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
                      <span className="text-slate-500">Required Signer:</span>{" "}
                      {item.signer}
                    </p>
                    <p>
                      <span className="text-slate-500">Linked Workflow:</span>{" "}
                      {item.linked}
                    </p>
                    <p className="md:col-span-2">
                      <span className="text-slate-500">
                        Certification Record:
                      </span>{" "}
                      {item.certification}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300">
                      Review Packet
                    </button>
                    <button className="rounded-full bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950">
                      Sign / Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Approval Types</h2>
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
              <h2 className="text-xl font-semibold">Signature History</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• Budget workshop minutes certified</p>
                <p>• Vendor proposal approval signed</p>
                <p>• Insurance comparison acknowledged</p>
                <p>• Resolution archive certification completed</p>
                <p>• Policy adoption record timestamped</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            A Clean Certification Trail for Board Decisions
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This approval log gives the board a professional record of signed
            decisions. Contracts, policies, resolutions, budgets, insurance
            authorizations, and other board approvals can be certified,
            timestamped, linked, and archived with confidence.
          </p>
        </section>
      </section>
    </main>
  );
}

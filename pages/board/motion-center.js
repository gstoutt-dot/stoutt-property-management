import Link from "next/link";

const motions = [
  {
    id: "MOT-2026-021",
    title: "Approve Pool Lighting Replacement Proposal",
    madeBy: "Board President",
    secondedBy: "Treasurer",
    meetingDate: "April 24, 2026",
    vote: "5-0",
    result: "Passed",
    linkedResolution: "RES-2026-014",
    docs: "Vendor proposal, inspection photos, maintenance note",
  },
  {
    id: "MOT-2026-020",
    title: "Adopt Updated Collection Follow-Up Timeline",
    madeBy: "Treasurer",
    secondedBy: "Secretary",
    meetingDate: "April 24, 2026",
    vote: "4-1",
    result: "Passed",
    linkedResolution: "RES-2026-013",
    docs: "Policy draft, delinquency report, attorney comments",
  },
  {
    id: "MOT-2026-019",
    title: "Table Gate Access Modernization Until Vendor Packet Is Complete",
    madeBy: "Director At Large",
    secondedBy: "Vice President",
    meetingDate: "April 24, 2026",
    vote: "5-0",
    result: "Tabled",
    linkedResolution: "Pending",
    docs: "Vendor comparison, missing insurance certificate",
  },
];

const votingRecord = [
  ["President", "Yes", "Yes", "Yes"],
  ["Vice President", "Yes", "Yes", "Yes"],
  ["Treasurer", "Yes", "Yes", "Yes"],
  ["Secretary", "Yes", "No", "Yes"],
  ["Director", "Yes", "Yes", "Yes"],
];

export default function BoardMotionCenter() {
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
            Board Governance
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Board Motion Center
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Capture every formal board motion from the moment it is made,
            seconded, voted on, linked to a resolution, and archived for future
            reference.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-300/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-200">
              Why This Matters
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Motions are where board decisions officially begin. This center
              keeps the association’s decision trail clear, organized, and easy
              to verify.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Clean Voting History</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Each motion tracks who made it, who seconded it, the meeting date,
              the vote result, and the supporting documents behind the action.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Connected Governance</h2>
            <p className="mt-4 leading-7 text-slate-300">
              Passed motions can connect directly to resolutions, action items,
              contracts, budget approvals, compliance matters, and board packets.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Motions This Year", "38"],
            ["Passed", "31"],
            ["Tabled", "5"],
            ["Failed", "2"],
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
                <h2 className="text-2xl font-semibold">Recent Motions</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Formal motions ready for review, linking, or archive.
                </p>
              </div>

              <button className="rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-950">
                Add Motion
              </button>
            </div>

            <div className="space-y-5">
              {motions.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                        {item.id}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {item.title}
                      </h3>
                    </div>

                    <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                      {item.result}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="text-slate-500">Made By:</span>{" "}
                      {item.madeBy}
                    </p>
                    <p>
                      <span className="text-slate-500">Seconded By:</span>{" "}
                      {item.secondedBy}
                    </p>
                    <p>
                      <span className="text-slate-500">Meeting Date:</span>{" "}
                      {item.meetingDate}
                    </p>
                    <p>
                      <span className="text-slate-500">Vote:</span> {item.vote}
                    </p>
                    <p>
                      <span className="text-slate-500">
                        Linked Resolution:
                      </span>{" "}
                      {item.linkedResolution}
                    </p>
                    <p>
                      <span className="text-slate-500">Documents:</span>{" "}
                      {item.docs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Voting Record Snapshot</h2>

              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr>
                      <th className="px-4 py-3">Member</th>
                      <th className="px-4 py-3">M1</th>
                      <th className="px-4 py-3">M2</th>
                      <th className="px-4 py-3">M3</th>
                    </tr>
                  </thead>
                  <tbody>
                    {votingRecord.map((row) => (
                      <tr key={row[0]} className="border-t border-white/10">
                        {row.map((cell) => (
                          <td key={cell} className="px-4 py-3 text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">Motion Archive</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                  2026 Annual Budget Adoption Motion
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                  Reserve Study Engagement Motion
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                  Insurance Appraisal Authorization Motion
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            Governance Advantage
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            This is the type of board recordkeeping that separates Stoutt
            Property Management from ordinary management companies. Every
            decision is traceable, every vote is documented, every resolution is
            connected, and every board action has a clear path from discussion to
            completion.
          </p>
        </section>
      </section>
    </main>
  );
}

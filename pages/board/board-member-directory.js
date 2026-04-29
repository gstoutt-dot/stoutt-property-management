import Link from "next/link";

export default function BoardMemberDirectory() {
  const boardMembers = [
    {
      name: "Board President",
      role: "President",
      term: "2025–2027",
      access: "Full Board Access",
      status: "Voting Member",
      desc: "Primary board contact for executive direction, meeting leadership and final board coordination.",
    },
    {
      name: "Board Vice President",
      role: "Vice President",
      term: "2025–2027",
      access: "Full Board Access",
      status: "Voting Member",
      desc: "Supports president, assists with board coordination and reviews escalated operational matters.",
    },
    {
      name: "Treasurer",
      role: "Treasurer",
      term: "2024–2026",
      access: "Financial Access",
      status: "Voting Member",
      desc: "Reviews financial reports, budget planning, reserves, delinquencies and QuickBooks-linked summaries.",
    },
    {
      name: "Secretary",
      role: "Secretary",
      term: "2024–2026",
      access: "Records Access",
      status: "Voting Member",
      desc: "Reviews meeting minutes, notices, official records, board packets and communication archives.",
    },
    {
      name: "Director at Large",
      role: "Director",
      term: "2025–2026",
      access: "Standard Board Access",
      status: "Voting Member",
      desc: "Reviews board decisions, owner matters, vendor issues and assigned committee items.",
    },
  ];

  const workflow = [
    "Maintain current board roster and officer roles",
    "Track terms, vacancies and committee assignments",
    "Control access by role and responsibility",
    "Connect voting access to Board Voting Center",
    "Route notices and packets to active members",
    "Archive board history and role changes",
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
              Board Member Directory
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
            Board Roles • Terms • Permissions • Committees
          </div>

          <div className="mt-5 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight">
                Keep board roles, access and responsibilities organized in one official directory.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-300">
                Track officer roles, terms, committee assignments, communication
                preferences, voting access, financial permissions and board packet
                distribution from one controlled role center.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-400/30 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Active Board Members</div>
              <div className="mt-2 text-6xl font-semibold text-amber-300">
                5
              </div>
              <div className="mt-4 text-slate-300">
                All voting seats currently active.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ["Voting Members", "5"],
            ["Officer Roles", "4"],
            ["Committees", "3"],
            ["Terms Expiring", "2"],
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
              Board Roster
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Current Board Members & Access
            </h3>
          </div>

          <div className="space-y-5">
            {boardMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-3xl border border-white/10 bg-slate-900 p-6 hover:border-amber-400/40 transition"
              >
                <div className="grid gap-6 lg:grid-cols-[1.25fr_0.65fr_0.65fr_0.85fr_0.7fr] lg:items-center">
                  <div>
                    <h4 className="text-xl font-semibold">{member.name}</h4>
                    <p className="mt-3 leading-relaxed text-slate-300">
                      {member.desc}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Role
                    </div>
                    <div className="mt-2 text-slate-200">{member.role}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Term
                    </div>
                    <div className="mt-2 text-slate-200">{member.term}</div>
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                      Access
                    </div>
                    <div className="mt-2 text-amber-300">{member.access}</div>
                  </div>

                  <div>
                    <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-300">
                      {member.status}
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
              Directory Workflow
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              Board Role Control Path
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
              Governance Visibility
            </div>
            <h3 className="mt-3 text-3xl font-semibold">
              The Right Board Access for the Right Responsibility
            </h3>

            <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
              <p>
                A board portal becomes much stronger when officer roles, access
                rights, voting permissions, packet distribution and committee
                responsibilities are tied to a clean directory.
              </p>

              <p>
                This gives SPM a professional way to control board visibility,
                protect sensitive financial or legal information and keep meeting
                workflows aligned with the current roster.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-amber-200">
              This module supports governance discipline while keeping the portal
              polished and easy for board members to understand.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

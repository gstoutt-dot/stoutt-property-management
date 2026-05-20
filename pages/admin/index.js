import Link from "next/link";

const intelligenceMetrics = [
  { label: "Associations", value: "1", status: "Active", tone: "stable" },
  { label: "Open Approvals", value: "14", status: "Needs Review", tone: "attention" },
  { label: "Financial Sync", value: "QB", status: "Connected", tone: "stable" },
  { label: "Operations", value: "Live", status: "Stable", tone: "stable" },
];

const priorityAlerts = [
  {
    title: "Urgent Approvals Pending",
    level: "Critical",
    count: "4 Items",
    detail:
      "Board or management approvals have remained unresolved and require immediate review.",
    action: "Review pending board decisions and clear approval bottlenecks.",
    href: "/portal/approval-queue",
  },
  {
    title: "Vendor Escalation Review",
    level: "Needs Review",
    count: "2 Follow-Ups",
    detail:
      "Open vendor tasks and maintenance items require coordination, confirmation, or status updates.",
    action: "Open BOS Action Center and verify vendor progress.",
    href: "/bos/action-center",
  },
  {
    title: "Financial Review Alerts",
    level: "Needs Review",
    count: "3 Items",
    detail:
      "Delinquency, reserve, or financial visibility items require administrative review.",
    action: "Review financial exceptions and confirm next administrative steps.",
    href: "/board/financial-review",
  },
  {
    title: "Governance Deadlines",
    level: "Upcoming",
    count: "1 Deadline",
    detail:
      "Meeting preparation, voting workflows, or governance records need upcoming attention.",
    action: "Review meeting agenda and governance calendar items.",
    href: "/portal/board/meetings",
  },
];

const operationalHealth = [
  {
    title: "QuickBooks Synchronization",
    status: "Connected",
    detail: "Production accounting sync is available.",
    tone: "stable",
  },
  {
    title: "Notification Routing",
    status: "Operational",
    detail: "Routing layer is prepared for workflow alerts.",
    tone: "stable",
  },
  {
    title: "Association Workflow Engine",
    status: "Stable",
    detail: "Core BOS workflow lifecycle is active.",
    tone: "stable",
  },
  {
    title: "Board Operations",
    status: "Live",
    detail: "Board command surfaces are online.",
    tone: "stable",
  },
  {
    title: "Owner Portal Access",
    status: "Online",
    detail: "Owner dashboard and login foundation are active.",
    tone: "stable",
  },
];

const sections = [
  {
    title: "Daily Operations Center",
    eyebrow: "Day-to-Day Command",
    description:
      "Primary operating tools for approvals, activity, messages, meetings, reporting, and association workflow movement.",
    items: [
      { title: "BOS Action Center", href: "/bos/action-center" },
      { title: "Approval Queue", href: "/portal/approval-queue" },
      { title: "Messages", href: "/board/messages" },
      { title: "Calendar", href: "/board/calendar" },
      { title: "Meetings", href: "/portal/board/meetings" },
      { title: "Reports", href: "/portal/board/reports" },
      { title: "Task Command", href: "/board/task-command" },
      { title: "Search Center", href: "/board/search-center" },
    ],
  },
  {
    title: "Governance & Board Operations",
    eyebrow: "Board Administration",
    description:
      "Governance tools for voting, motions, committees, signatures, elections, documents, and board decision records.",
    items: [
      { title: "Financials", href: "/portal/board/financials" },
      { title: "Documents", href: "/board/documents" },
      { title: "Committee Center", href: "/board/committee-center" },
      { title: "Signature Approval Log", href: "/board/signature-approval-log" },
      { title: "Member Voting", href: "/portal/board/member-voting" },
      { title: "Voting Center", href: "/board/voting-center" },
      { title: "Motion Center", href: "/board/motion-center" },
      { title: "Elections", href: "/board/elections" },
    ],
  },
  {
    title: "Financial Planning & Oversight",
    eyebrow: "Annual & Strategic Financial Work",
    description:
      "Planning tools for budget preparation, financial review, capital projects, and vendor performance oversight.",
    items: [
      { title: "Financial Review", href: "/board/financial-review" },
      { title: "Budget Planning", href: "/board/budget-planning" },
      { title: "Capital Projects", href: "/board/capital-projects" },
      { title: "Vendor Performance", href: "/board/vendor-performance" },
      { title: "Vendors", href: "/board/vendors" },
    ],
  },
  {
    title: "Legal, Risk & Compliance",
    eyebrow: "Protection Layer",
    description:
      "Controlled areas for violations, legal review, insurance, risk tracking, and policy reference.",
    items: [
      { title: "Violation Review", href: "/board/violation-review" },
      { title: "Legal Review", href: "/board/legal-review" },
      { title: "Insurance & Risk", href: "/board/insurance-risk" },
      { title: "Policy Library", href: "/board/policy-library" },
      { title: "Maintenance Review", href: "/board/maintenance-review" },
    ],
  },
  {
    title: "Infrastructure & Expansion",
    eyebrow: "System Growth",
    description:
      "Support tools for technology integrations, training, platform expansion, and operating continuity.",
    items: [
      { title: "Technology Integrations", href: "/board/technology-integrations" },
      { title: "Help & Training", href: "/board/help-training" },
      { title: "Architectural Approvals", href: "/board/architectural-approvals" },
    ],
  },
];

function toneStyle(tone) {
  if (tone === "attention") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  if (tone === "critical") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  return "border-emerald-400/30 bg-emerald-400/10 text-emerald-300";
}

function priorityStyle(level) {
  if (level === "Critical") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  if (level === "Needs Review") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  return "border-sky-400/30 bg-sky-400/10 text-sky-300";
}

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="max-w-5xl">
            <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
              SPM Administrative Command Center
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              ADMIN DASHBOARD
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
              Central operational control for association oversight, board activity,
              financial coordination, compliance, annual planning, and platform
              administration.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {intelligenceMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-black/20"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                  {metric.label}
                </p>

                <div className="mt-3 text-3xl font-black text-amber-300">
                  {metric.value}
                </div>

                <div
                  className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${toneStyle(
                    metric.tone
                  )}`}
                >
                  {metric.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <section className="rounded-[2rem] border border-amber-400/20 bg-amber-400/[0.05] p-6 shadow-2xl shadow-black/30">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                Priority Attention Queue
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Immediate Operational Attention
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
                Operational issues, governance deadlines, financial concerns,
                and escalation items requiring active administrative oversight.
              </p>
            </div>

            <div className="space-y-4">
              {priorityAlerts.map((alert) => (
                <Link
                  key={alert.title}
                  href={alert.href}
                  className="block rounded-3xl border border-white/10 bg-[#020617]/80 p-5 transition hover:border-amber-400/30 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <div
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                            alert.level
                          )}`}
                        >
                          {alert.level}
                        </div>

                        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                          {alert.count}
                        </div>
                      </div>

                      <h3 className="mt-4 text-2xl font-bold">
                        {alert.title}
                      </h3>

                      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                        {alert.detail}
                      </p>

                      <div className="mt-4 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
                          Recommended Action
                        </p>

                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {alert.action}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
                      Review
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                Operational Health
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                System Status
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Stability indicators for the systems that support daily association
                operations and administrative control.
              </p>
            </div>

            <div className="space-y-4">
              {operationalHealth.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#020617]/60 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {item.detail}
                      </p>
                    </div>

                    <div
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${toneStyle(
                        item.tone
                      )}`}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20"
            >
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                  {section.eyebrow}
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  {section.title}
                </h2>

                <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-400">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((item) => (
                  <Link
                    key={`${section.title}-${item.href}`}
                    href={item.href}
                    className="group rounded-3xl border border-white/10 bg-[#020617]/70 p-5 transition hover:border-amber-400/30 hover:bg-white/[0.06]"
                  >
                    <div className="mb-4 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      Live / Ready
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-white">
                        {item.title}
                      </h3>

                      <span className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-sm font-semibold text-amber-300 transition group-hover:bg-amber-400/20">
                        Open
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Administrative Operating Philosophy
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Calm control over the entire association operating system.
          </h2>

          <p className="mt-4 max-w-5xl text-sm leading-7 text-slate-300">
            This dashboard is structured around operational awareness, governance
            coordination, financial planning, compliance protection, escalation
            management, and long-term association oversight so SPM can operate as
            a true administrative command infrastructure.
          </p>
        </section>
      </section>
    </main>
  );
}

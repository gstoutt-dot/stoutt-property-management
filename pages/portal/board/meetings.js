import Link from "next/link";
import bosTheme from "../../../styles/bos-theme";

const meetings = [
  {
    id: "MTG-601",
    title: "May Board Meeting",
    date: "May 14, 2026 · 6:30 PM",
    location: "Clubhouse / Zoom Hybrid",
    status: "Upcoming",
  },
  {
    id: "MTG-600",
    title: "April Board Meeting",
    date: "April 10, 2026 · 6:30 PM",
    location: "Clubhouse",
    status: "Completed",
  },
];

const agenda = [
  {
    item: "Financial Review",
    detail: "Cash position, receivables, vendor payments",
    status: "Ready",
  },
  {
    item: "Vendor Approvals",
    detail: "Pool light, irrigation repair, inspections",
    status: "Pending Vote",
  },
  {
    item: "Violation Actions",
    detail: "Commercial vehicle enforcement case",
    status: "Review",
  },
  {
    item: "ARC Requests",
    detail: "Fence installation - Unit 301",
    status: "Pending",
  },
];

export default function BoardMeetings() {
  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        {/* HEADER */}
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board Coordination</p>
              <h1 className={bosTheme.title}>Meetings & Agenda</h1>
              <p className={bosTheme.subtitle}>
                Manage board meetings, review agendas, and align decisions with
                real-time operational data.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/board/dashboard"
                className={bosTheme.secondaryButton}
              >
                Dashboard
              </Link>

              <button className={bosTheme.primaryButton}>
                Create Meeting
              </button>
            </div>
          </div>
        </header>

        {/* KPI STRIP */}
        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Upcoming Meetings", "1", "Next scheduled"],
            ["Agenda Items", "9", "Across all meetings"],
            ["Pending Votes", "4", "Requires decision"],
            ["Completed Meetings", "12", "Historical"],
          ].map(([label, value, detail]) => (
            <div key={label} className={bosTheme.statCard}>
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 flex items-end justify-between">
                <h2 className="text-4xl font-semibold">{value}</h2>
                <span className={bosTheme.statDot} />
              </div>
              <p className="mt-3 text-xs text-slate-500">{detail}</p>
            </div>
          ))}
        </section>

        {/* MAIN GRID */}
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* MEETING LIST */}
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <h2 className="text-xl font-semibold">Meetings</h2>

            <div className="mt-5 space-y-4">
              {meetings.map((mtg) => (
                <article
                  key={mtg.id}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className={bosTheme.badgeNeutral}>
                          {mtg.id}
                        </span>
                        <span className={bosTheme.badgeGold}>
                          {mtg.status}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-semibold">
                        {mtg.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        {mtg.date} · {mtg.location}
                      </p>
                    </div>

                    <button className={bosTheme.outlineButton}>
                      View Agenda
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* AGENDA PANEL */}
          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Current Agenda
            </p>

            <div className="mt-5 space-y-4">
              {agenda.map((item) => (
                <div
                  key={item.item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-sm font-semibold">{item.item}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.detail}
                  </p>

                  <p className="mt-2 text-xs text-yellow-300">
                    {item.status}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <button className={bosTheme.goldButton}>
                Add Agenda Item
              </button>

              <button className={bosTheme.whiteButton}>
                Export Agenda
              </button>

              <button className={bosTheme.outlineButton}>
                Share with Board
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

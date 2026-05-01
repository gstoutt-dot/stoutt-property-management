import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const notifications = [
  {
    id: "NOT-901",
    title: "Vote Needed: Elite Electrical payment",
    category: "Approval",
    priority: "High",
    time: "10 minutes ago",
    detail:
      "A manager-verified vendor payment is awaiting board action before release.",
    status: "Unread",
  },
  {
    id: "NOT-902",
    title: "New agenda item added",
    category: "Meeting",
    priority: "Medium",
    time: "1 hour ago",
    detail:
      "Commercial vehicle enforcement has been added to the May Board Meeting agenda.",
    status: "Unread",
  },
  {
    id: "NOT-903",
    title: "Financial report ready",
    category: "Report",
    priority: "Medium",
    time: "Yesterday",
    detail:
      "The May financial summary is ready for review in the Board Reports section.",
    status: "Read",
  },
  {
    id: "NOT-904",
    title: "Decision recorded",
    category: "Audit Trail",
    priority: "Low",
    time: "Yesterday",
    detail:
      "The irrigation repair payment approval has been recorded in Decision History.",
    status: "Read",
  },
];

export default function BoardNotifications() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Unread", "Approval", "Meeting", "Report"];

  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : notifications.filter(
          (item) =>
            item.status === activeFilter || item.category === activeFilter
        );

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Board Alerts</p>
              <h1 className={bosTheme.title}>Notifications</h1>
              <p className={bosTheme.subtitle}>
                Track board alerts, vote reminders, financial updates, agenda
                changes, and recorded decisions from one centralized notification
                center.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/board/dashboard"
                className={bosTheme.secondaryButton}
              >
                Board Dashboard
              </Link>

              <Link
                href="/portal/board/approvals"
                className={bosTheme.primaryButton}
              >
                Approval Queue
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Unread Alerts", "2", "Need attention"],
            ["Votes Needed", "4", "Pending decisions"],
            ["Agenda Updates", "3", "Meeting changes"],
            ["Reports Ready", "5", "Available now"],
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

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Notification Center</h2>
              <p className="mt-1 text-sm text-slate-400">
                Filter alerts by status or category.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    activeFilter === filter
                      ? bosTheme.filterActive
                      : bosTheme.filterInactive
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          {filteredNotifications.map((notice) => (
            <article
              key={notice.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>{notice.id}</span>
                    <span className={bosTheme.badgeGold}>
                      {notice.category}
                    </span>
                    <span className={bosTheme.badgeAmber}>
                      {notice.priority} Priority
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        notice.status === "Unread"
                          ? "bg-yellow-400/10 text-yellow-300"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {notice.status}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {notice.title}
                  </h3>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                    {notice.detail}
                  </p>

                  <p className="mt-4 text-xs text-slate-500">{notice.time}</p>
                </div>

                <aside className={bosTheme.actionPanel}>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Actions
                  </p>

                  <div className="mt-5 space-y-3">
                    <button className={bosTheme.goldButton}>Open Item</button>
                    <button className={bosTheme.whiteButton}>
                      Mark as Read
                    </button>
                    <button className={bosTheme.outlineButton}>
                      Snooze Alert
                    </button>
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

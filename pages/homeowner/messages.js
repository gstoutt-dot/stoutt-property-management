import Link from "next/link";

export default function HomeownerMessages() {
  const messages = [
    {
      id: "MSG-7821",
      title: "Pool Area Maintenance Notice",
      category: "Association Notice",
      status: "Unread",
      date: "Apr 28, 2026",
      preview: "The pool area will be temporarily closed for scheduled maintenance.",
    },
    {
      id: "MSG-7814",
      title: "Board Meeting Reminder",
      category: "Meeting Notice",
      status: "Read",
      date: "Apr 26, 2026",
      preview: "The next board meeting is scheduled for Thursday at 6:30 PM.",
    },
    {
      id: "MSG-7799",
      title: "Landscape Service Update",
      category: "Service Update",
      status: "Read",
      date: "Apr 24, 2026",
      preview: "Landscape crews will be onsite this week for seasonal trimming.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Messages & Notifications
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                View association announcements, service updates, meeting
                reminders, direct messages, and important homeowner notices.
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Unread", "1"],
            ["Announcements", "7"],
            ["Service Updates", "4"],
            ["Direct Messages", "2"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <div className="mt-3 text-4xl font-bold text-yellow-400">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5">
            <p className="text-sm font-medium text-yellow-400">
              Message Center
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Recent Notices</h2>
          </div>

          <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <input
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
              placeholder="Search messages, notices, meetings, or updates..."
            />
          </div>

          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">
                      {message.category} • {message.id}
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {message.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {message.date}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {message.status}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
                  {message.preview}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">
                    Open Message
                  </button>

                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
                    Mark Read
                  </button>

                  <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
                    Ask Ava
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Message Categories
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Association Announcements",
                "Board Meeting Notices",
                "Service & Maintenance Updates",
                "Compliance Notices",
                "Architectural Review Updates",
                "Financial Notices",
                "Direct Messages",
              ].map((category) => (
                <button
                  key={category}
                  className="block w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Ask Ava About a Notice
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Need help understanding a message?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can summarize announcements, explain what action may be
              needed, locate related documents, and help homeowners understand
              deadlines or next steps.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Notification Preferences
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Email notifications enabled",
                "Text alerts for urgent notices",
                "Maintenance updates enabled",
                "Meeting reminders enabled",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <button className="mt-5 w-full rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
              Manage Preferences
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

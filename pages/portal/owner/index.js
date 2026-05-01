// File: /portal/owner/index.js

import Link from "next/link";

const ownerModules = [
  {
    title: "My Account",
    description: "View balance, ledger activity, and account summary.",
    href: "/portal/owner/account",
    stat: "$0.00",
    label: "Current Balance",
  },
  {
    title: "Payments",
    description: "Make payments, manage autopay, and review receipts.",
    href: "/portal/owner/payments",
    stat: "On",
    label: "Autopay",
  },
  {
    title: "Requests",
    description: "Submit and track maintenance or general requests.",
    href: "/portal/owner/requests",
    stat: "2",
    label: "Open Items",
  },
  {
    title: "Violations",
    description: "Review notices, deadlines, and compliance updates.",
    href: "/portal/owner/violations",
    stat: "1",
    label: "Open Notice",
  },
  {
    title: "Architectural Review",
    description: "Submit improvement requests and track ARC approvals.",
    href: "/portal/owner/architectural",
    stat: "1",
    label: "Under Review",
  },
  {
    title: "Amenity Requests",
    description: "Reserve amenities and review access requirements.",
    href: "/portal/owner/amenities",
    stat: "1",
    label: "Pending",
  },
  {
    title: "Documents",
    description: "Access governing documents, forms, and community resources.",
    href: "/portal/owner/documents",
    stat: "14",
    label: "Documents",
  },
  {
    title: "Announcements",
    description: "Read community updates, alerts, and board notices.",
    href: "/portal/owner/announcements",
    stat: "2",
    label: "Unread",
  },
  {
    title: "Messages",
    description: "Communicate with management and review responses.",
    href: "/portal/owner/messages",
    stat: "1",
    label: "New Message",
  },
  {
    title: "Notifications",
    description: "View real-time updates and account activity alerts.",
    href: "/portal/owner/notifications",
    stat: "2",
    label: "Unread Alerts",
  },
  {
    title: "Profile",
    description: "Manage contact details and communication preferences.",
    href: "/portal/owner/profile",
    stat: "Verified",
    label: "Owner Record",
  },
  {
    title: "Support",
    description: "Submit questions and track support tickets.",
    href: "/portal/owner/support",
    stat: "1",
    label: "Open Ticket",
  },
];

const recentActivity = [
  {
    title: "Pool light service request dispatched",
    category: "Maintenance",
    time: "Today",
  },
  {
    title: "May assessment payment posted",
    category: "Accounting",
    time: "Today",
  },
  {
    title: "Architectural request under review",
    category: "ARC",
    time: "Apr 28, 2026",
  },
  {
    title: "Compliance photo received",
    category: "Violations",
    time: "Apr 30, 2026",
  },
];

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">SPM Owner Portal</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Welcome back, Michael</h1>
            <p className="mt-2 text-white/60">
              Harbor Palm Villas HOA • 1842 Harbor Palm Drive, Unit 204
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/portal/owner/support"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/80 hover:border-yellow-400 hover:text-white transition"
            >
              Contact Management
            </Link>
            <Link
              href="/portal/owner/requests"
              className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
            >
              New Request
            </Link>
          </div>
        </div>

        {/* Hero Summary */}
        <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
          <div className="grid gap-6 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Account Status</p>
              <h2 className="mt-3 text-3xl font-bold text-yellow-100">Current and in good standing</h2>
              <p className="mt-3 max-w-3xl text-yellow-50/80">
                Your current balance is $0.00. Your next assessment of $425.00 is scheduled for June 1, 2026.
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-slate-950/30 p-5">
              <p className="text-sm text-yellow-50/60">Open Requests</p>
              <p className="mt-2 text-4xl font-bold text-yellow-100">2</p>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-slate-950/30 p-5">
              <p className="text-sm text-yellow-50/60">Unread Updates</p>
              <p className="mt-2 text-4xl font-bold text-yellow-100">2</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Portal Modules */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Owner Services</h2>
                <p className="mt-1 text-sm text-white/50">Everything connected to your owner account.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {ownerModules.map((module) => (
                <Link
                  key={module.title}
                  href={module.href}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 hover:border-yellow-400 hover:bg-white/[0.06] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-yellow-200 transition">{module.title}</h3>
                      <p className="mt-2 text-sm text-white/55">{module.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-yellow-300">{module.stat}</p>
                      <p className="mt-1 text-xs text-white/40">{module.label}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Rail */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-bold">Recent Activity</h2>
              <p className="mt-1 text-sm text-white/50">Latest account and community updates.</p>

              <div className="mt-6 space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-sm font-semibold">{item.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <span className="text-xs text-yellow-300">{item.category}</span>
                      <span className="text-xs text-white/40">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-bold">Need Help?</h2>
              <p className="mt-2 text-sm text-white/60">
                Send a question to management or open a support ticket from the owner portal.
              </p>
              <Link
                href="/portal/owner/support"
                className="mt-5 block rounded-2xl bg-yellow-400 px-5 py-3 text-center text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
              >
                Open Support
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

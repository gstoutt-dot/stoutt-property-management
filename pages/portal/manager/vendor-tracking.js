import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const jobs = [
  {
    id: "WO-2048",
    vendor: "Elite Electrical Solutions",
    issue: "Pool light out near east gate",
    association: "Harbor Pointe HOA",
    unit: "Common Area",
    priority: "Urgent",
    status: "Dispatched",
    eta: "Today · 2:30 PM",
    manager: "Pending vendor arrival",
  },
  {
    id: "WO-2047",
    vendor: "AquaTech Pool Services",
    issue: "Pool equipment pressure check",
    association: "Harbor Pointe HOA",
    unit: "Pool Room",
    priority: "Standard",
    status: "In Progress",
    eta: "On site now",
    manager: "Vendor is inspecting equipment",
  },
  {
    id: "WO-2046",
    vendor: "Brightscape Landscaping",
    issue: "Broken irrigation head near clubhouse",
    association: "Harbor Pointe HOA",
    unit: "Clubhouse Grounds",
    priority: "Standard",
    status: "Completed",
    eta: "Completed today",
    manager: "Awaiting manager verification",
  },
];

export default function VendorTracking() {
  const [activeStatus, setActiveStatus] = useState("All");

  const statuses = ["All", "Dispatched", "In Progress", "Completed"];

  const filteredJobs =
    activeStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === activeStatus);

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
              <p className={bosTheme.eyebrow}>Vendor Operations</p>
              <h1 className={bosTheme.title}>Vendor Tracking</h1>
              <p className={bosTheme.subtitle}>
                Monitor dispatched work orders, vendor progress, completion
                notes, and manager verification before closing or forwarding for
                payment approval.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager/assign-dispatch"
                className={bosTheme.secondaryButton}
              >
                Assign Dispatch
              </Link>

              <Link
                href="/portal/manager/vendor-invoices"
                className={bosTheme.primaryButton}
              >
                Vendor Invoices
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {[
            ["Open Jobs", "14", "Active vendor work"],
            ["Dispatched", "5", "Awaiting arrival"],
            ["In Progress", "6", "Currently active"],
            ["Needs Verification", "3", "Before payment"],
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
              <h2 className="text-lg font-semibold">Active Vendor Queue</h2>
              <p className="mt-1 text-sm text-slate-400">
                Track where each job stands after manager dispatch.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    activeStatus === status
                      ? bosTheme.filterActive
                      : bosTheme.filterInactive
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className={`${bosTheme.card} ${bosTheme.cardHover}`}
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>{job.id}</span>
                    <span className={bosTheme.badgeGold}>{job.status}</span>
                    <span className={bosTheme.badgeAmber}>
                      {job.priority} Priority
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">{job.issue}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Vendor assigned:{" "}
                    <span className="font-medium text-white">{job.vendor}</span>
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Association</p>
                      <p className={bosTheme.detailValue}>{job.association}</p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Location</p>
                      <p className={bosTheme.detailValue}>{job.unit}</p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>ETA / Timing</p>
                      <p className={bosTheme.detailValue}>{job.eta}</p>
                    </div>

                    <div className={bosTheme.detailBox}>
                      <p className={bosTheme.detailLabel}>Manager Note</p>
                      <p className={bosTheme.detailValue}>{job.manager}</p>
                    </div>
                  </div>
                </div>

                <aside className={bosTheme.actionPanel}>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Job Actions
                  </p>

                  <div className="mt-5 space-y-3">
                    <button className={bosTheme.goldButton}>
                      Verify Completion
                    </button>

                    <button className={bosTheme.whiteButton}>
                      View Vendor Notes
                    </button>

                    <button className={bosTheme.outlineButton}>
                      Upload Photos
                    </button>

                    <button className={bosTheme.outlineButton}>
                      Move to Invoice Review
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

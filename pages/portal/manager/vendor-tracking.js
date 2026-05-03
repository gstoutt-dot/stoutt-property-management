import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

const initialJobs = [
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
  const [jobs, setJobs] = useState(initialJobs);
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(initialJobs[0].id);

  const statuses = ["All", "Dispatched", "In Progress", "Completed"];

  const filteredJobs =
    activeStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === activeStatus);

  const selected = jobs.find((j) => j.id === selectedId) || jobs[0];

  function updateStatus(id, status) {
    setJobs((current) =>
      current.map((job) =>
        job.id === id
          ? {
              ...job,
              status,
              manager: getManagerNote(status),
            }
          : job
      )
    );
  }

  function getManagerNote(status) {
    if (status === "In Progress") return "Vendor currently on-site";
    if (status === "Completed") return "Work completed — awaiting verification";
    if (status === "Verified") return "Manager verified — ready for invoice";
    return "Pending vendor arrival";
  }

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
                Execute vendor work orders, monitor progress, verify completion,
                and route clean jobs into invoice review.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager"
                className={bosTheme.secondaryButton}
              >
                Command Center
              </Link>

              <Link
                href="/vendor/invoices"
                className={bosTheme.primaryButton}
              >
                Invoice Review
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          <Stat label="Open Jobs" value={jobs.length} />
          <Stat label="Dispatched" value={jobs.filter(j => j.status === "Dispatched").length} />
          <Stat label="In Progress" value={jobs.filter(j => j.status === "In Progress").length} />
          <Stat label="Awaiting Verification" value={jobs.filter(j => j.status === "Completed").length} />
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
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
        </section>

        <section className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedId(job.id)}
                className={`${bosTheme.card} ${bosTheme.cardHover} ${
                  selectedId === job.id ? "border-[#D4AF37]/50" : ""
                }`}
              >
                <div className="flex flex-wrap gap-2">
                  <span className={bosTheme.badgeNeutral}>{job.id}</span>
                  <span className={bosTheme.badgeGold}>{job.status}</span>
                  <span className={bosTheme.badgeAmber}>{job.priority}</span>
                </div>

                <h3 className="mt-3 text-xl font-semibold">{job.issue}</h3>
                <p className="text-sm text-slate-400">{job.vendor}</p>
              </button>
            ))}
          </div>

          <aside className={bosTheme.actionPanel}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Execution Console
            </p>

            <h2 className="mt-3 text-xl font-semibold">{selected.issue}</h2>

            <div className="mt-4 space-y-3 text-sm">
              <Detail label="Vendor" value={selected.vendor} />
              <Detail label="Association" value={selected.association} />
              <Detail label="Location" value={selected.unit} />
              <Detail label="ETA" value={selected.eta} />
              <Detail label="Status" value={selected.status} />
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={() => updateStatus(selected.id, "In Progress")}
                className={bosTheme.goldButton}
              >
                Mark In Progress
              </button>

              <button
                onClick={() => updateStatus(selected.id, "Completed")}
                className={bosTheme.whiteButton}
              >
                Mark Completed
              </button>

              <button
                onClick={() => updateStatus(selected.id, "Verified")}
                className={bosTheme.outlineButton}
              >
                Verify Completion
              </button>

              <Link
                href="/vendor/invoices"
                className={`${bosTheme.outlineButton} block text-center`}
              >
                Move to Invoice Review →
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className={bosTheme.statCard}>
      <p className="text-sm text-slate-400">{label}</p>
      <h2 className="mt-3 text-4xl font-semibold">{value}</h2>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

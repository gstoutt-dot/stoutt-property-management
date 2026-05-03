import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import bosTheme from "../../../styles/bos-theme";
import { supabase } from "../../../lib/supabaseClient";

export default function VendorTracking() {
  const [jobs, setJobs] = useState([]);
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const statuses = ["All", "Dispatched", "In Progress", "Completed", "Verified"];

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);

    const { data, error } = await supabase
      .from("vendor_tracking")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Vendor tracking fetch error:", error);
      setLoading(false);
      return;
    }

    const safeData = data || [];
    setJobs(safeData);

    if (!selectedId && safeData.length > 0) {
      setSelectedId(safeData[0].id);
    }

    setLoading(false);
  }

  const filteredJobs =
    activeStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === activeStatus);

  const selected = jobs.find((j) => j.id === selectedId) || jobs[0] || null;

  const stats = useMemo(() => {
    return {
      open: jobs.length,
      dispatched: jobs.filter((j) => j.status === "Dispatched").length,
      progress: jobs.filter((j) => j.status === "In Progress").length,
      completed: jobs.filter((j) => j.status === "Completed").length,
      verified: jobs.filter((j) => j.status === "Verified").length,
    };
  }, [jobs]);

  function getManagerNote(status) {
    if (status === "In Progress") return "Vendor currently on-site";
    if (status === "Completed") return "Work completed — awaiting manager verification";
    if (status === "Verified") return "Manager verified — ready for invoice review";
    return "Pending vendor arrival";
  }

  async function updateStatus(id, status) {
    setSaving(true);

    const updatePayload = {
      status,
      manager_note: getManagerNote(status),
    };

    if (status === "Verified") {
      updatePayload.verified_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from("vendor_tracking")
      .update(updatePayload)
      .eq("id", id);

    if (error) {
      console.error("Vendor status update error:", error);
      setSaving(false);
      return;
    }

    setJobs((current) =>
      current.map((job) =>
        job.id === id
          ? {
              ...job,
              ...updatePayload,
            }
          : job
      )
    );

    setSaving(false);
  }

  function formatDate(date) {
    if (!date) return "—";
    return new Date(date).toLocaleString();
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
                Live Supabase vendor execution console for dispatched work
                orders, progress tracking, manager verification, and invoice
                readiness.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/portal/manager" className={bosTheme.secondaryButton}>
                Command Center
              </Link>

              <Link
                href="/portal/manager/vendor-invoices"
                className={bosTheme.primaryButton}
              >
                Invoice Review
              </Link>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-5">
          <Stat label="Open Jobs" value={stats.open} detail="Live work orders" />
          <Stat label="Dispatched" value={stats.dispatched} detail="Awaiting arrival" />
          <Stat label="In Progress" value={stats.progress} detail="Currently active" />
          <Stat label="Completed" value={stats.completed} detail="Needs verification" />
          <Stat label="Verified" value={stats.verified} detail="Ready for invoice" />
        </section>

        <section className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Active Vendor Queue</h2>
              <p className="mt-1 text-sm text-slate-400">
                {loading
                  ? "Loading live vendor jobs..."
                  : `${filteredJobs.length} job${filteredJobs.length === 1 ? "" : "s"} shown.`}
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

        <section className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            {!loading &&
              filteredJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedId(job.id)}
                  className={`${bosTheme.card} ${bosTheme.cardHover} w-full text-left ${
                    selectedId === job.id ? "border-[#D4AF37]/50" : ""
                  }`}
                >
                  <div className="flex flex-wrap gap-2">
                    <span className={bosTheme.badgeNeutral}>
                      {job.work_order_id || "No WO #"}
                    </span>
                    <span className={bosTheme.badgeGold}>{job.status}</span>
                    <span className={bosTheme.badgeAmber}>
                      {job.priority || "Standard"} Priority
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    {job.issue || "Untitled Work Order"}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Vendor assigned:{" "}
                    <span className="font-medium text-white">
                      {job.vendor || "Unassigned"}
                    </span>
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <DetailBox label="Association" value={job.association || "—"} />
                    <DetailBox label="Location" value={job.unit || "—"} />
                    <DetailBox label="ETA / Timing" value={job.eta || "—"} />
                    <DetailBox label="Manager Note" value={job.manager_note || "—"} />
                  </div>
                </button>
              ))}

            {!loading && filteredJobs.length === 0 && (
              <div className={bosTheme.card}>
                <p className="text-sm text-slate-400">No vendor jobs found.</p>
              </div>
            )}
          </div>

          <aside className={bosTheme.actionPanel}>
            {!selected ? (
              <p className="text-sm text-slate-400">Select a vendor job.</p>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Execution Console
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                  {selected.issue || "Untitled Work Order"}
                </h2>

                <div className="mt-4 space-y-3 text-sm">
                  <Detail label="Work Order" value={selected.work_order_id || "—"} />
                  <Detail label="Vendor" value={selected.vendor || "—"} />
                  <Detail label="Association" value={selected.association || "—"} />
                  <Detail label="Location" value={selected.unit || "—"} />
                  <Detail label="ETA" value={selected.eta || "—"} />
                  <Detail label="Status" value={selected.status || "—"} />
                  <Detail label="Verified" value={formatDate(selected.verified_at)} />
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => updateStatus(selected.id, "In Progress")}
                    disabled={saving}
                    className={bosTheme.goldButton}
                  >
                    Mark In Progress
                  </button>

                  <button
                    onClick={() => updateStatus(selected.id, "Completed")}
                    disabled={saving}
                    className={bosTheme.whiteButton}
                  >
                    Mark Completed
                  </button>

                  <button
                    onClick={() => updateStatus(selected.id, "Verified")}
                    disabled={saving}
                    className={bosTheme.outlineButton}
                  >
                    Verify Completion
                  </button>

                  <Link
                    href="/portal/manager/vendor-invoices"
                    className={`${bosTheme.outlineButton} block text-center`}
                  >
                    Move to Invoice Review →
                  </Link>

                  <button
                    onClick={fetchJobs}
                    disabled={saving}
                    className={bosTheme.outlineButton}
                  >
                    Refresh Jobs
                  </button>
                </div>
              </>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value, detail }) {
  return (
    <div className={bosTheme.statCard}>
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <h2 className="text-4xl font-semibold">{value}</h2>
        <span className={bosTheme.statDot} />
      </div>
      <p className="mt-3 text-xs text-slate-500">{detail}</p>
    </div>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className={bosTheme.detailBox}>
      <p className={bosTheme.detailLabel}>{label}</p>
      <p className={bosTheme.detailValue}>{value}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-white">{value}</span>
    </div>
  );
}

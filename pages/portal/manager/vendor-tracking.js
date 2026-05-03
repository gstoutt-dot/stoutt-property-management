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
  const [feedback, setFeedback] = useState({});

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
      console.error(error);
      setLoading(false);
      return;
    }

    const safeData = data && data.length > 0 ? data : [
      {
        id: "1",
        work_order_id: "WO-2048",
        issue: "Pool light out",
        vendor: "Elite Electrical",
        status: "Dispatched",
        association: "Demo HOA",
        unit: "Common Area",
        eta: "Today",
        manager_note: "",
      },
      {
        id: "2",
        work_order_id: "WO-2047",
        issue: "Pool pressure issue",
        vendor: "AquaTech",
        status: "In Progress",
        association: "Demo HOA",
        unit: "Pump Room",
        eta: "On Site",
        manager_note: "",
      },
      {
        id: "3",
        work_order_id: "WO-2046",
        issue: "Irrigation broken",
        vendor: "Brightscape",
        status: "Completed",
        association: "Demo HOA",
        unit: "Grounds",
        eta: "Completed",
        manager_note: "",
      },
    ];

    setJobs(safeData);
    setSelectedId(safeData[0]?.id || null);
    setLoading(false);
  }

  const filteredJobs =
    activeStatus === "All"
      ? jobs
      : jobs.filter((job) => job.status === activeStatus);

  const selected =
    jobs.find((j) => String(j.id) === String(selectedId)) ||
    jobs[0] ||
    null;

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
    if (status === "In Progress") return "Vendor on site";
    if (status === "Completed") return "Awaiting verification";
    if (status === "Verified") return "Verified and ready for invoice";
    return "Pending dispatch";
  }

  async function updateLinkedInvoice(job) {
    if (!job?.work_order_id) return;

    await supabase
      .from("vendor_invoices")
      .update({
        status: "Needs Verification",
        manager_note: `Verified from tracking: ${job.work_order_id}`,
      })
      .eq("work_order_id", job.work_order_id);
  }

  async function updateStatus(id, status) {
    if (!id) return;

    setSaving(true);
    setFeedback({});

    const job = jobs.find((j) => String(j.id) === String(id));

    const payload = {
      status,
      manager_note: getManagerNote(status),
      verified_at: status === "Verified" ? new Date().toISOString() : null,
    };

    const { error } = await supabase
      .from("vendor_tracking")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error);
      setFeedback({ type: "error", message: "Update failed" });
      setSaving(false);
      return;
    }

    if (status === "Verified" && job) {
      await updateLinkedInvoice(job);
      setFeedback({ type: "success", message: "Verified + invoice updated" });
    }

    await fetchJobs();
    setSaving(false);
  }

  function formatDate(date) {
    if (!date) return "—";
    return new Date(date).toLocaleString();
  }

  return (
    <main className={bosTheme.page}>
      <div className={bosTheme.container}>
        <header className={bosTheme.header}>
          <h1 className={bosTheme.title}>Vendor Tracking</h1>
          <div className="flex gap-3">
            <Link href="/portal/manager" className={bosTheme.secondaryButton}>
              Command Center
            </Link>
            <Link href="/vendor/invoices" className={bosTheme.primaryButton}>
              Invoice Review
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-5">
          <Stat label="Open" value={stats.open} />
          <Stat label="Dispatched" value={stats.dispatched} />
          <Stat label="In Progress" value={stats.progress} />
          <Stat label="Completed" value={stats.completed} />
          <Stat label="Verified" value={stats.verified} />
        </section>

        {feedback.message && (
          <div className="mt-4 text-sm">{feedback.message}</div>
        )}

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedId(job.id)}
                className={`p-4 border mb-3 cursor-pointer ${
                  selectedId === job.id ? "border-yellow-400" : "border-white/10"
                }`}
              >
                <div>{job.work_order_id}</div>
                <div>{job.issue}</div>
                <div>{job.vendor}</div>
                <div>{job.status}</div>
              </div>
            ))}
          </div>

          <div>
            {!selected ? (
              <div>Select job</div>
            ) : (
              <div className="p-4 border border-yellow-400">
                <h2>{selected.issue}</h2>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => updateStatus(selected.id, "In Progress")}
                    disabled={saving}
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => updateStatus(selected.id, "Completed")}
                    disabled={saving}
                  >
                    Completed
                  </button>

                  <button
                    onClick={() => updateStatus(selected.id, "Verified")}
                    disabled={saving}
                  >
                    Verify
                  </button>

                  <button onClick={fetchJobs}>Refresh</button>
                </div>

                <div className="mt-4 text-xs">
                  Verified: {formatDate(selected.verified_at)}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-4 border border-white/10">
      <div className="text-sm">{label}</div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}

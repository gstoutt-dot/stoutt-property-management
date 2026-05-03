import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import bosTheme from "../../../styles/bos-theme";
import { supabase } from "../../../lib/supabaseClient";

export default function VendorTracking() {
  const [jobs, setJobs] = useState([]);
  const [activeStatus, setActiveStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [feedback, setFeedback] = useState("");

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
      setJobs([]);
      setLoading(false);
      return;
    }

    const safe = data || [];
    setJobs(safe);
    setSelectedId(safe[0]?.id || null);
    setLoading(false);
  }

  const filteredJobs =
    activeStatus === "All"
      ? jobs
      : jobs.filter((j) => j.status === activeStatus);

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

  async function updateStatus(id, status) {
    if (!id) return;

    setSavingId(id);
    setFeedback("");

    const payload = {
      status,
      manager_note: `Updated to ${status}`,
      verified_at: status === "Verified" ? new Date().toISOString() : null,
    };

    const { error } = await supabase
      .from("vendor_tracking")
      .update(payload)
      .eq("id", id);

    if (error) {
      console.error(error);
      setFeedback("Update failed");
      setSavingId(null);
      return;
    }

    setFeedback("Updated");
    await fetchJobs();
    setSavingId(null);
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

        {feedback && (
          <div className="mt-4 text-sm text-green-400">{feedback}</div>
        )}

        <section className="mt-6 rounded-2xl border border-white/10 p-5">
          <div className="flex gap-2 flex-wrap">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                className={`px-4 py-2 rounded ${
                  activeStatus === s ? "bg-yellow-400 text-black" : "bg-white/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            {!loading &&
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedId(job.id)}
                  className={`p-4 mb-3 border cursor-pointer ${
                    selectedId === job.id
                      ? "border-yellow-400"
                      : "border-white/10"
                  }`}
                >
                  <div className="text-sm opacity-60">
                    {job.work_order_id}
                  </div>
                  <div className="text-lg">{job.issue}</div>
                  <div className="text-sm">{job.vendor}</div>
                  <div className="text-xs mt-1">{job.status}</div>
                </div>
              ))}
          </div>

          <div>
            {!selected ? (
              <div>Select job</div>
            ) : (
              <div className="p-4 border border-yellow-400 rounded-xl">
                <h2 className="text-xl">{selected.issue}</h2>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() =>
                      updateStatus(selected.id, "In Progress")
                    }
                    disabled={savingId === selected.id}
                    className="w-full bg-yellow-400 text-black p-2 rounded"
                  >
                    {savingId === selected.id ? "Saving..." : "In Progress"}
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selected.id, "Completed")
                    }
                    disabled={savingId === selected.id}
                    className="w-full border border-white/10 p-2 rounded"
                  >
                    Completed
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selected.id, "Verified")
                    }
                    disabled={savingId === selected.id}
                    className="w-full border border-white/10 p-2 rounded"
                  >
                    Verified
                  </button>

                  <button
                    onClick={fetchJobs}
                    className="w-full border border-white/10 p-2 rounded"
                  >
                    Refresh
                  </button>
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
    <div className="p-4 border border-white/10 rounded">
      <div className="text-sm">{label}</div>
      <div className="text-2xl">{value}</div>
    </div>
  );
}

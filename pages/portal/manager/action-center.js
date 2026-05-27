import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";

export default function ManagerActionCenter() {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    loadLiveItems();

    const interval = setInterval(() => {
      loadLiveItems(false);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  async function loadLiveItems(showLoading = true) {
    if (showLoading) setLoading(true);

    setStatusMessage("");

    const { data: bosData, error: bosError } = await supabase
      .from("bos_actions")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: adminData, error: adminError } = await supabase
      .from("admin_operational_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (bosError) {
      console.error("Live BOS action load failed:", bosError);
    }

    if (adminError) {
      console.error("Admin operational record load failed:", adminError);
    }

    const normalizedBos = (bosData || []).map((item) => ({
      ...item,
      manager_source_table: "bos_actions",
      manager_source_type: "bos",
      original_id: item.id,
      title: item.title || item.request_type || "BOS Action",
      description: item.description || "Live BOS action submitted for review.",
      status: item.status || "open",
      priority: item.priority || "medium",
      association_name:
        item.association_name || "Sunset Condominium Association",
      owner_name: item.owner_name || "—",
      owner_phone: item.owner_phone || "",
      property_address: item.property_address || item.unit_number || "—",
      source: item.source || "Ava / BOS Intake",
    }));

    const normalizedAdmin = (adminData || []).map((item) => {
      const normalizedStatus = String(item.status || "submitted")
        .toLowerCase()
        .replaceAll(" ", "_");

      return {
        id: `admin-${item.id}`,
        original_id: item.id,
        manager_source_table: "admin_operational_records",
        manager_source_type: "admin",
        title: item.title || "Administrative Operational Record",
        description:
          item.description ||
          "Administrative operational record submitted for manager review.",
        request_type: item.request_type || "admin_record",
        category: item.request_type || "admin_record",
        status:
          normalizedStatus === "submitted" ? "open" : normalizedStatus,
        priority: String(item.priority || "medium").toLowerCase(),
        association_name:
          item.association_name || "Sunset Condominium Association",
        owner_name: item.created_by || "Admin / Ava Intake",
        owner_phone: "",
        property_address:
          item.routing_target || item.source_module || "Admin Operations",
        source: item.source_module || "Admin Operational Record",
        created_at: item.created_at,
        updated_at: item.updated_at,
        recommended_action: item.recommended_action || "",
      };
    });

    const combined = [...normalizedBos, ...normalizedAdmin].sort((a, b) => {
      return (
        new Date(b.created_at || 0).getTime() -
        new Date(a.created_at || 0).getTime()
      );
    });

    setItems(combined);

    if (!selectedId && combined.length > 0) {
      setSelectedId(combined[0].id);
    }

    if (showLoading) setLoading(false);
  }

  function managerStatusLabel(status) {
    if (status === "open") return "Request Received";
    if (status === "in_progress") return "Management Review";
    if (status === "board_review") return "Board Review";
    if (status === "approved") return "Approved / Scheduled";
    if (status === "completed") return "Completed";
    if (status === "rejected") return "Rejected";
    return "Request Received";
  }

  function adminStatusLabel(status) {
    if (status === "open") return "Submitted";
    if (status === "in_progress") return "In Progress";
    if (status === "board_review") return "Board Review";
    if (status === "approved") return "Approved";
    if (status === "completed") return "Completed";
    if (status === "rejected") return "Rejected";
    return "Submitted";
  }

  async function updateStatus(item, nextStatus) {
    if (!item) return;

    setStatusMessage("");

    if (item.manager_source_table === "admin_operational_records") {
      const { error } = await supabase
        .from("admin_operational_records")
        .update({
          status: adminStatusLabel(nextStatus),
          updated_at: new Date().toISOString(),
        })
        .eq("id", item.original_id);

      if (error) {
        console.error("Admin record status update failed:", error);
        setStatusMessage("Unable to update this admin operational record.");
        return;
      }

      setStatusMessage("Admin operational record updated.");
      await loadLiveItems(false);
      return;
    }

    const { error } = await supabase
      .from("bos_actions")
      .update({
        status: nextStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.original_id || item.id);

    if (error) {
      console.error("BOS action status update failed:", error);
      setStatusMessage("Unable to update this BOS action.");
      return;
    }

    setStatusMessage("BOS action updated.");
    await loadLiveItems(false);
  }

  const filteredItems = useMemo(() => {
    if (filter === "all") return items;
    return items.filter((item) => item.status === filter);
  }, [items, filter]);

  const selected =
    items.find((item) => item.id === selectedId) || filteredItems[0] || null;

  const stats = {
    total: items.length,
    managerReview: items.filter(
      (item) => item.status === "open" || item.status === "in_progress"
    ).length,
    boardReview: items.filter((item) => item.status === "board_review").length,
    approved: items.filter((item) => item.status === "approved").length,
  };

  const statusStyles = {
    open: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    in_progress: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
    board_review: "border-purple-400/30 bg-purple-400/10 text-purple-300",
    approved: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    completed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    rejected: "border-red-400/30 bg-red-400/10 text-red-300",
  };

  const priorityStyles = {
    high: "border-red-400/30 bg-red-400/10 text-red-300",
    medium: "border-orange-400/30 bg-orange-400/10 text-orange-300",
    low: "border-slate-400/30 bg-slate-400/10 text-slate-300",
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
                BOS Manager Portal
              </p>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Live Action Center
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Process live BOS actions and admin operational records from the
                same production queue used by the Manager Command Center.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portal/manager"
                className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300"
              >
                Manager Command Center
              </Link>

              <button
                type="button"
                onClick={() => loadLiveItems(false)}
                className="rounded-xl bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300"
              >
                Refresh Live Data
              </button>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <Stat label="Live Actions" value={stats.total} />
          <Stat label="Manager Review" value={stats.managerReview} />
          <Stat label="Board Review" value={stats.boardReview} />
          <Stat label="Approved" value={stats.approved} />
        </section>

        <section className="mb-8 grid gap-3 md:grid-cols-6">
          {[
            ["all", "All"],
            ["open", "Received"],
            ["in_progress", "Mgmt Review"],
            ["board_review", "Board Review"],
            ["approved", "Approved"],
            ["completed", "Completed"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                filter === key
                  ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-300"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-yellow-400/30"
              }`}
            >
              {label}
            </button>
          ))}
        </section>

        {statusMessage && (
          <div className="mb-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-4 text-sm text-yellow-200">
            {statusMessage}
          </div>
        )}

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/30">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Live Incoming Queue</h2>
                <p className="text-sm text-slate-400">
                  Review, approve, escalate, complete, or reject live records.
                </p>
              </div>

              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                Live Connected
              </span>
            </div>

            {loading ? (
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-400">
                Loading live action center...
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      selected?.id === item.id
                        ? "border-yellow-400/60 bg-yellow-400/10"
                        : "border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Badge>{item.manager_source_type === "admin" ? "Admin Record" : "BOS Action"}</Badge>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          statusStyles[item.status] ||
                          "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {managerStatusLabel(item.status)}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                          priorityStyles[item.priority] ||
                          "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {item.priority || "medium"} priority
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {item.title || "Untitled Action"}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">
                      {item.description || "No description provided."}
                    </p>

                    <div className="mt-4 flex flex-wrap justify-between gap-3 text-xs text-slate-500">
                      <span>{item.association_name || "Association"}</span>
                      <span>
                        {item.created_at
                          ? new Date(item.created_at).toLocaleString()
                          : "No date"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-400">
                No live action items found for this filter.
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30">
            {selected ? (
              <>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
                  Review Detail
                </p>

                <h2 className="text-2xl font-bold">
                  {selected.title || "Untitled Action"}
                </h2>

                <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm leading-6 text-slate-300">
                  {selected.description || "No description provided."}
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <Detail label="Record ID" value={selected.original_id || selected.id} />
                  <Detail label="Source" value={selected.source || selected.manager_source_type} />
                  <Detail label="Association" value={selected.association_name || "—"} />
                  <Detail label="Owner / Source" value={selected.owner_name || "—"} />
                  <Detail label="Location" value={selected.property_address || "—"} />
                  <Detail label="Current Status" value={managerStatusLabel(selected.status)} />
                </div>

                {selected.recommended_action && (
                  <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.06] p-4">
                    <p className="text-sm font-semibold text-yellow-300">
                      Recommended Action
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {selected.recommended_action}
                    </p>
                  </div>
                )}

                <div className="mt-6 grid gap-3">
                  <button
                    onClick={() => updateStatus(selected, "in_progress")}
                    className="rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-4 py-3 text-sm font-bold text-yellow-300 hover:bg-yellow-400/15"
                  >
                    Move to Management Review
                  </button>

                  <button
                    onClick={() => updateStatus(selected, "board_review")}
                    className="rounded-xl border border-purple-400/40 bg-purple-400/10 px-4 py-3 text-sm font-bold text-purple-300 hover:bg-purple-400/15"
                  >
                    Send to Board Review
                  </button>

                  <button
                    onClick={() => updateStatus(selected, "approved")}
                    className="rounded-xl bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300"
                  >
                    Approve / Schedule
                  </button>

                  <button
                    onClick={() => updateStatus(selected, "completed")}
                    className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm font-bold text-emerald-300 hover:bg-emerald-400/15"
                  >
                    Mark Completed
                  </button>

                  <button
                    onClick={() => updateStatus(selected, "rejected")}
                    className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm font-bold text-red-300 hover:bg-red-400/15"
                  >
                    Reject / Close
                  </button>
                </div>
              </>
            ) : (
              <div className="text-sm text-slate-400">
                Select a live action item to process.
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-xl shadow-black/20">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-yellow-300">{value}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300">
      {children}
    </span>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-100">
        {value || "—"}
      </span>
    </div>
  );
}

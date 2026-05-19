import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function MaintenanceReview() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [actions, setActions] = useState([]);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadMaintenanceActions();

    const interval = setInterval(() => {
      loadMaintenanceActions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadMaintenanceActions() {
    const { data, error } = await supabase
      .from("bos_actions")
      .select("*")
      .eq("association_id", DEFAULT_ASSOCIATION_ID)
      .or("request_type.ilike.%maintenance%,category.ilike.%maintenance%,title.ilike.%maintenance%,description.ilike.%maintenance%,request_type.ilike.%repair%,category.ilike.%repair%,title.ilike.%repair%,description.ilike.%repair%,request_type.ilike.%plumbing%,request_type.ilike.%electrical%,request_type.ilike.%roof%,request_type.ilike.%hvac%")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Unable to load maintenance review items:", error);
      setSystemMessage("Unable to load maintenance review items.");
      return;
    }

    setActions(data || []);
  }

  const maintenanceSignals = useMemo(() => actions, [actions]);

  const maintenanceAiEvents = useMemo(
    () =>
      actions.filter((item) =>
        String(item.source || item.description || "")
          .toLowerCase()
          .includes("ava")
      ),
    [actions]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Maintenance Review Center
            </p>
            <h1 className="mt-2 text-2xl font-semibold">Maintenance Review</h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
  <Link href="/board">Board Dashboard</Link>
</nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
  Maintenance Review Queue
</p>

<h2 className="mt-3 text-4xl font-semibold">
  Review maintenance requests and operational activity.
</h2>

<p className="mt-4 max-w-3xl text-slate-300">
  Review maintenance requests, repair activity, operational concerns,
  and items requiring board awareness or action.
</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Maintenance Requests</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {maintenanceSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">Ava / Owner Reports</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {maintenanceAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Active Maintenance Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {maintenanceSignals.length + maintenanceAiEvents.length}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">Maintenance Review Queue</h3>

            <div className="mt-6 space-y-4">
              {maintenanceSignals.map((item) => {
  const isOpen = selectedItem?.type === "maintenance" && selectedItem?.data?.id === item.id;

  return (
    <div
      key={item.id}
      className="rounded-2xl border border-white/10 bg-slate-900 p-5"
    >
      <button
        onClick={() =>
          setSelectedItem(isOpen ? null : { type: "maintenance", data: item })
        }
        className="block w-full text-left"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
          {item.id} · {formatCategory(item.category || item.request_type)}
        </p>

                <h4 className="mt-2 font-semibold">
          {item.title || "Maintenance Request"}
        </h4>

        <p className="mt-2 text-sm text-slate-400">
          Current Status: {formatStatus(item.status)}
        </p>

        <p className="mt-2 text-xs text-slate-500">
                    Owner: {item.owner_name || "Resident"} · Unit:{" "}
          {item.property_address || "Pending"}
        </p>

        <p className="mt-4 text-sm font-semibold text-amber-300">
          {isOpen ? "Hide Details" : "View Details"}
        </p>
      </button>

      {isOpen && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
          <h5 className="text-lg font-semibold text-amber-200">
            Full Maintenance Details
          </h5>

         <div className="mt-4 grid gap-3 text-sm text-slate-300">
  <p>
    <span className="text-slate-500">Request ID:</span> {item.id}
  </p>

  <p>
    <span className="text-slate-500">Category:</span>{" "}
    {formatCategory(item.category || item.request_type)}
  </p>

  <p>
    <span className="text-slate-500">Title:</span>{" "}
    {item.title || "Maintenance Request"}
  </p>

  <p>
    <span className="text-slate-500">Owner:</span>{" "}
    {item.owner_name || "Resident"}
  </p>

  <p>
    <span className="text-slate-500">Unit:</span>{" "}
    {item.property_address || "Pending"}
  </p>

  <p>
    <span className="text-slate-500">Status:</span>{" "}
    {formatStatus(item.status)}
  </p>

  <p>
    <span className="text-slate-500">Created:</span>{" "}
    {item.created_at
      ? new Date(item.created_at).toLocaleString()
      : "N/A"}
  </p>
</div>
        </div>
      )}
    </div>
  );
})}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
  Maintenance Activity
</h3>

<p className="mt-2 text-sm text-violet-100/70">
  Reported maintenance concerns and operational activity.
</p>

            <div className="mt-6 space-y-4">
  {maintenanceAiEvents.map((event) => (
    <div
      key={event.id}
      className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
    >
      <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
        {event.id} ·{" "}
        {formatCategory(event.category || event.request_type)}
      </p>

      <h4 className="mt-2 font-semibold">
        {event.title || "Maintenance Activity"}
      </h4>

      <p className="mt-2 text-sm text-slate-300">
        Source: {event.source || "Owner / Ava Intake"}
      </p>

      <p className="mt-2 text-xs text-slate-400">
        Status: {formatStatus(event.status)} · Priority:{" "}
        {titleCase(event.priority || "medium")}
      </p>
    </div>
  ))}
</div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
  <h3 className="text-xl font-semibold text-amber-200">
    Maintenance Oversight
  </h3>

  <p className="mt-3 text-slate-300">
    This area helps board members monitor maintenance activity,
    operational concerns, repair requests, and community upkeep.
  </p>
</div>
      </section>
    </main>
  );
}
function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCategory(category) {
  return titleCase(
    String(category || "General").replace(/_/g, " ")
  );
}

function formatStatus(status) {
  return titleCase(status || "Open");
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const searchableAreas = [
  "Budget Planning",
  "Elections",
  "Legal Review",
  "Insurance & Risk",
  "Vendor Performance",
  "Capital Projects",
  "Technology Integrations",
  "Help & Training",
  "Policies",
  "Compliance",
  "Board Reviews",
  "Special Projects",
];

function priorityStyle(priority) {
  const value = String(priority || "").toLowerCase();

  if (value === "critical") {
    return "border-red-400/30 bg-red-400/10 text-red-200";
  }

  if (value === "high") {
    return "border-amber-400/30 bg-amber-400/10 text-amber-300";
  }

  if (value === "normal") {
    return "border-sky-400/30 bg-sky-400/10 text-sky-300";
  }

  return "border-slate-400/30 bg-slate-400/10 text-slate-300";
}

function formatDate(value) {
  if (!value) return "No due date";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BoardSearchCenter() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [requestFilter, setRequestFilter] = useState("All");
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadOperationalRecords();
  }, []);

  useEffect(() => {
    let filtered = [...records];

    if (requestFilter !== "All") {
      filtered = filtered.filter(
        (record) =>
          String(record.request_type || "").toLowerCase() ===
          requestFilter.toLowerCase()
      );
    }

    if (searchTerm.trim()) {
      const value = searchTerm.toLowerCase();

      filtered = filtered.filter((record) => {
        return (
          String(record.title || "")
            .toLowerCase()
            .includes(value) ||
          String(record.description || "")
            .toLowerCase()
            .includes(value) ||
          String(record.request_type || "")
            .toLowerCase()
            .includes(value) ||
          String(record.assigned_to || "")
            .toLowerCase()
            .includes(value) ||
          String(record.status || "")
            .toLowerCase()
            .includes(value) ||
          String(record.routing_target || "")
            .toLowerCase()
            .includes(value)
        );
      });
    }

    setFilteredRecords(filtered);
  }, [records, searchTerm, requestFilter]);

  async function loadOperationalRecords() {
    try {
      setLoadingRecords(true);
      setSystemMessage("");

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.message ||
            "Unable to load operational records."
        );
      }

      setRecords(payload.openRecords || []);
    } catch (error) {
      console.error(
        "Unable to load operational records:",
        error
      );

      setSystemMessage(
        error.message ||
          "Unable to load operational records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  const requestTypes = useMemo(() => {
    const unique = new Set();

    records.forEach((record) => {
      if (record.request_type) {
        unique.add(record.request_type);
      }
    });

    return ["All", ...Array.from(unique)];
  }, [records]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-400">
              Stoutt Property Management
            </div>

            <h1 className="mt-3 text-3xl font-semibold">
              Board Search Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/board"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Main Page
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Unified Operational Search
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Distributed Operational Record Search
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            Search across budget planning, legal review,
            elections, insurance, vendor oversight, policies,
            training, technology integrations, capital projects,
            compliance records and operational workflows from
            one unified board search center.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          {[
            ["Indexed Operational Records", records.length],
            ["Filtered Results", filteredRecords.length],
            ["Connected Modules", searchableAreas.length],
            ["Request Types", requestTypes.length - 1],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl"
            >
              <p className="text-sm text-slate-400">{label}</p>

              <p className="mt-3 text-3xl font-bold text-amber-300">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Search Operational Records
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Search titles, descriptions, routing targets,
              request types, assignments and operational records.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search operational records..."
              className="min-h-[56px] rounded-2xl border border-white/10 bg-slate-900 px-6 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-300/60"
            />

            <select
              value={requestFilter}
              onChange={(event) =>
                setRequestFilter(event.target.value)
              }
              className="min-h-[56px] rounded-2xl border border-white/10 bg-slate-900 px-5 text-sm text-white outline-none focus:border-amber-300/60"
            >
              {requestTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </section>

        {systemMessage && (
          <section className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </section>
        )}

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                Live Operational Search Results
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Search results now render directly from the
                centralized Admin Operations Intake system.
              </p>
            </div>

            <div className="space-y-5">
              {loadingRecords ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-400">
                  Loading operational records...
                </div>
              ) : filteredRecords.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/70 p-8">
                  <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    No Results
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">
                    No matching operational records found
                  </h3>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                    Try adjusting the search term or request
                    type filter.
                  </p>
                </div>
              ) : (
                filteredRecords.map((record) => (
                  <div
                    key={record.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/80 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                              record.priority
                            )}`}
                          >
                            {record.priority || "Normal"}
                          </span>

                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                            {record.request_type ||
                              "Operational Record"}
                          </span>

                          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300">
                            {record.status || "Submitted"}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-semibold">
                          {record.title}
                        </h3>
                      </div>

                      <span className="rounded-full border border-amber-300/30 px-4 py-1 text-sm text-amber-200">
                        {formatDate(record.due_date)}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
                      <p>
                        <span className="text-slate-500">
                          Assigned To:
                        </span>{" "}
                        {record.assigned_to || "Unassigned"}
                      </p>

                      <p>
                        <span className="text-slate-500">
                          Routing:
                        </span>{" "}
                        {record.routing_target ||
                          "Admin Dashboard"}
                      </p>

                      <p className="md:col-span-2">
                        <span className="text-slate-500">
                          Description:
                        </span>{" "}
                        {record.description ||
                          "No description provided."}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">
                Searchable Areas
              </h2>

              <div className="mt-5 grid gap-3">
                {searchableAreas.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
              <h2 className="text-xl font-semibold">
                Useful Searches
              </h2>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p>• “insurance renewal”</p>
                <p>• “reserve study”</p>
                <p>• “vendor performance”</p>
                <p>• “budget adoption”</p>
                <p>• “capital project”</p>
                <p>• “policy review”</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-400/20 bg-gradient-to-r from-amber-300/10 to-slate-900 p-8 shadow-2xl">
          <h2 className="text-2xl font-semibold text-amber-200">
            One Search Layer Across the Entire Operating System
          </h2>

          <p className="mt-4 max-w-5xl leading-8 text-slate-300">
            This search center transforms the Board Portal into a
            true operational intelligence layer. Board members can
            find the exact record they need, follow governance
            history, review operational context and track workflow
            progression without digging through disconnected systems.
          </p>
        </section>
      </section>
    </main>
  );
}

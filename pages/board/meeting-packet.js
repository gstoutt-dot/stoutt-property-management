import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const closedStatuses = ["completed", "archived", "closed"];

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

export default function MeetingPacket() {
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] =
    useState(true);

  const [systemMessage, setSystemMessage] =
    useState("");

  useEffect(() => {
    loadPacketRecords({ showLoading: true });

    const interval = setInterval(() => {
      loadPacketRecords({ showLoading: false });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadPacketRecords({
    showLoading = false,
  } = {}) {
    try {
      if (showLoading) {
        setLoadingRecords(true);
      }

      setSystemMessage("");

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(
          payload.message ||
            "Unable to load meeting packet records."
        );
      }

      const packetRecords = (
        payload.openRecords || []
      ).filter((record) => {
        const requestType = String(
          record.request_type || ""
        ).toLowerCase();

        const status = String(
          record.status || ""
        ).toLowerCase();

        return (
          (requestType.includes("board packet") ||
            requestType.includes("budget") ||
            requestType.includes("legal") ||
            requestType.includes("compliance") ||
            requestType.includes("election")) &&
          !closedStatuses.includes(status)
        );
      });

      setRecords(packetRecords);
    } catch (error) {
      console.error(
        "Unable to load meeting packet records:",
        error
      );

      setSystemMessage(
        error.message ||
          "Unable to load meeting packet records."
      );
    } finally {
      setLoadingRecords(false);
    }
  }

  const executiveItems = useMemo(
    () =>
      records.filter((record) =>
        ["critical", "high"].includes(
          String(record.priority || "").toLowerCase()
        )
      ),
    [records]
  );

  const financialItems = useMemo(
    () =>
      records.filter((record) =>
        String(record.request_type || "")
          .toLowerCase()
          .includes("budget")
      ),
    [records]
  );

  const legalItems = useMemo(
    () =>
      records.filter((record) => {
        const value = String(
          record.request_type || ""
        ).toLowerCase();

        return (
          value.includes("legal") ||
          value.includes("compliance")
        );
      }),
    [records]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Meeting Packet
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

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Board Packet Assembly
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Meeting packet now assembles live
            operational governance records.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Budget planning, legal review,
            compliance deadlines, elections,
            governance items and executive matters
            now flow directly from the Admin
            Operations Intake system into
            board-ready packet preparation.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            ["Packet Items", records.length],
            [
              "Executive Items",
              executiveItems.length,
            ],
            [
              "Financial Matters",
              financialItems.length,
            ],
            ["Legal Matters", legalItems.length],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-sm text-slate-400">
                {label}
              </p>

              <p className="mt-3 text-4xl font-semibold text-amber-300">
                {value}
              </p>
            </div>
          ))}
        </div>

        {systemMessage && (
          <section className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </section>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-amber-400">
              Distributed Operational Rendering
            </div>

            <h2 className="mt-3 text-3xl font-semibold">
              Live Meeting Packet Feed
            </h2>
          </div>

          <Link
            href="/admin/operations/new?request_type=Board%20Packet&return_path=/board/meeting-packet&return_label=Meeting%20Packet"
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Create Packet Record
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6">
            <h3 className="text-xl font-semibold text-red-100">
              Executive Session Items
            </h3>

            <div className="mt-6 space-y-4">
              {executiveItems.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
                  No executive items.
                </div>
              ) : (
                executiveItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-red-300/20 bg-slate-950/60 p-5"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <h4 className="mt-3 font-semibold">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
            <h3 className="text-xl font-semibold text-amber-100">
              Financial Agenda
            </h3>

            <div className="mt-6 space-y-4">
              {financialItems.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
                  No financial items.
                </div>
              ) : (
                financialItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-amber-300/20 bg-slate-950/60 p-5"
                  >
                    <h4 className="font-semibold">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              Legal & Compliance
            </h3>

            <div className="mt-6 space-y-4">
              {legalItems.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
                  No legal or compliance items.
                </div>
              ) : (
                legalItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                  >
                    <h4 className="font-semibold">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <h3 className="text-xl font-semibold">
            Full Packet Feed
          </h3>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-5 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              <span>Type</span>
              <span>Status</span>
              <span>Assigned</span>
              <span>Due</span>
              <span>Priority</span>
            </div>

            {loadingRecords ? (
              <div className="p-6 text-sm text-slate-400">
                Loading packet records...
              </div>
            ) : records.length === 0 ? (
              <div className="p-6 text-sm text-slate-400">
                No meeting packet records found.
              </div>
            ) : (
              records.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-5 border-t border-white/10 px-4 py-4 text-sm"
                >
                  <span>
                    {item.request_type}
                  </span>

                  <span>{item.status}</span>

                  <span>
                    {item.assigned_to ||
                      "Unassigned"}
                  </span>

                  <span>
                    {formatDate(item.due_date)}
                  </span>

                  <span>{item.priority}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            Operational Packet Intelligence Active
          </h3>

          <p className="mt-3 text-slate-300">
            Meeting Packet now assembles live
            governance records directly from the
            centralized operational intelligence
            system.
          </p>
        </div>
      </section>
    </main>
  );
}

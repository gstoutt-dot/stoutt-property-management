import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  typeof window !== "undefined"
    ? localStorage.getItem("spm_selected_association_id") || ""
    : "";

const categories = [
  "Association Announcements",
  "Board Meeting Notices",
  "Service & Maintenance Updates",
  "Compliance Notices",
  "Architectural Review Updates",
  "Financial Notices",
  "Direct Messages",
  "Emergency Notice",
  "Document Notice",
];

const priorities = ["Normal", "High", "Emergency"];

export default function AdminHomeownerNotifications() {
  const [associationId] = useState(DEFAULT_ASSOCIATION_ID);  
  const [sendTo, setSendTo] = useState("Entire Association");
  const [category, setCategory] = useState("Association Announcements");
  const [priority, setPriority] = useState("Normal");
  const [unitNumber, setUnitNumber] = useState("");
  const [ownerUserId, setOwnerUserId] = useState("");
  const [owners, setOwners] = useState([]);
  const [units, setUnits] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recentNotifications, setRecentNotifications] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadNotificationTargets() {
    try {
      const response = await fetch(
        `/api/admin/homeowner-notification-targets?associationId=${encodeURIComponent(
          associationId
        )}`
      );

      const data = await response.json();

      if (data.success) {
        setOwners(data.owners || []);
        setUnits(data.units || []);
      }
    } catch (error) {
      console.error("Notification targets load failed:", error);
    }
  }

  async function loadRecentNotifications() {
    try {
      const response = await fetch(
        `/api/admin/send-homeowner-notification?associationId=${encodeURIComponent(
          associationId
        )}`
      );

      const data = await response.json();

      if (data.success) {
        setRecentNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Recent notifications load failed:", error);
    }
  }

  useEffect(() => {
    if (associationId) {
      loadRecentNotifications();
      loadNotificationTargets();
    }
  }, [associationId]);

  const targetLabel = useMemo(() => {
    if (sendTo === "Specific Unit") return `Unit ${unitNumber || "—"}`;
    if (sendTo === "Specific Owner") return ownerUserId || "Owner not selected";
    return "Entire Association";
  }, [sendTo, unitNumber, ownerUserId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const payload = {
        associationId,
        sendTo,
        category,
        priority,
        title,
        message,
        unitNumber: sendTo === "Specific Unit" ? unitNumber : null,
        ownerUserId: sendTo === "Specific Owner" ? ownerUserId : null,
      };

      const response = await fetch("/api/admin/send-homeowner-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Notification failed.");
      }

      setStatus({
        type: "success",
        message: "Homeowner notification sent successfully.",
      });

      setTitle("");
      setMessage("");
      setUnitNumber("");
      setOwnerUserId("");

      await loadRecentNotifications();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300/80">
                SPM Admin Operations
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Send Homeowner Notification
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                Send association-wide, unit-specific, or owner-specific notices into
                the live homeowner message center.
              </p>
            </div>

            <Link
              href="/manager/dashboard"
              className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-center text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl"
          >
            <div className="grid gap-5">
              
              <div className="grid gap-5 md:grid-cols-3">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">
                    Send To
                  </span>
                  <select
                    value={sendTo}
                    onChange={(event) => setSendTo(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
                  >
                    <option>Entire Association</option>
                    <option>Specific Unit</option>
                    <option>Specific Owner</option>
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">
                    Category
                  </span>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
                  >
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">
                    Priority
                  </span>
                  <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
                  >
                    {priorities.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>

              {sendTo === "Specific Unit" && (
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">
                    Target Unit
                  </span>
                  <select
                    value={unitNumber}
                    onChange={(event) => setUnitNumber(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
                  >
                    <option value="">Select a unit</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        Unit {unit}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              {sendTo === "Specific Owner" && (
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">
                    Target Owner
                  </span>
                  <select
                    value={ownerUserId}
                    onChange={(event) => setOwnerUserId(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
                  >
                    <option value="">Select an owner</option>
                    {owners.map((owner) => (
  <option
    key={`${owner.unit_number}-${owner.owner_name}`}
    value={owner.owner_user_id || ""}
  >
    Unit {owner.unit_number} · {owner.owner_name}
  </option>
))}
                  </select>
                </label>
              )}

              {sendTo === "Specific Owner" && (
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">
                    Target Owner User ID
                  </span>
                  <input
                    value={ownerUserId}
                    onChange={(event) => setOwnerUserId(event.target.value)}
                    placeholder="Paste owner_user_id"
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
                  />
                </label>
              )}

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-300">
                  Notification Title
                </span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: Pool Maintenance Scheduled"
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-amber-300/70"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-300">
                  Message
                </span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={7}
                  placeholder="Write the homeowner-facing message here..."
                  className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-amber-300/70"
                />
              </label>

              <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-4 text-sm text-amber-100">
                <strong>Target:</strong> {targetLabel}
              </div>

              {status && (
                <div
                  className={`rounded-2xl border p-4 text-sm ${
                    status.type === "success"
                      ? "border-emerald-300/30 bg-emerald-300/[0.08] text-emerald-100"
                      : "border-red-300/30 bg-red-300/[0.08] text-red-100"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Homeowner Notification"}
              </button>
            </div>
          </form>

          <section className="rounded-3xl border border-white/10 bg-white/[0.045] p-6 shadow-2xl">
            <h2 className="text-xl font-semibold">Recent Sent Notifications</h2>
            <p className="mt-2 text-sm text-slate-400">
              Latest notices sent for this association.
            </p>

            <div className="mt-6 grid gap-4">
              {recentNotifications.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-400">
                  No notifications found yet.
                </div>
              ) : (
                recentNotifications.map((notice) => (
                  <div
                    key={notice.id}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-white">
                          {notice.title || "Untitled notice"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {notice.category || "General"} ·{" "}
                          {notice.priority || "Normal"}
                        </p>
                      </div>

                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                        {notice.unit_number
                          ? `Unit ${notice.unit_number}`
                          : notice.owner_user_id
                          ? "Owner"
                          : "Association"}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
                      {notice.message}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      {notice.created_at
                        ? new Date(notice.created_at).toLocaleString()
                        : ""}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

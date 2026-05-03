import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

export default function ManagerVendorInvoices() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    setLoading(true);

    const { data, error } = await supabase
      .from("vendor_invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Invoice fetch error:", error);
      setLoading(false);
      return;
    }

    const safeData = data || [];
    setInvoices(safeData);

    if (!selectedId && safeData.length > 0) {
      setSelectedId(safeData[0].id);
    }

    const noteMap = {};
    safeData.forEach((item) => {
      noteMap[item.id] = item.manager_note || "";
    });
    setNotes(noteMap);

    setLoading(false);
  }

  const selected =
    invoices.find((item) => item.id === selectedId) || invoices[0] || null;

  <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
  <Stat label="Open Invoices" value={stats.open} />
  <Stat label="Needs Verification" value={stats.verification} />
  <Stat label="Ready for Board" value={stats.board} />
  <Stat label="Needs Documentation" value={stats.documentation} />
  <Stat label="Approved Payment" value={stats.payment} />
</div>

  function getNextStep(status) {
    if (status === "Approved for Payment") return "Send to payment processing queue.";
    if (status === "Ready for Board") return "Route to board approval packet.";
    if (status === "Needs Documentation") return "Request missing invoice support from vendor.";
    if (status === "Rejected") return "Notify vendor and document rejection reason.";
    return "Confirm service completion and contract scope.";
  }

  async function updateInvoiceStatus(id, status) {
    setSaving(true);

    const { error } = await supabase
      .from("vendor_invoices")
      .update({
        status,
        manager_note: notes[id] || "",
      })
      .eq("id", id);

    if (error) {
      console.error("Invoice status update error:", error);
      setSaving(false);
      return;
    }

    setInvoices((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              manager_note: notes[id] || "",
            }
          : item
      )
    );

    setSaving(false);
  }

  async function saveManagerNote(id) {
    setSaving(true);

    const { error } = await supabase
      .from("vendor_invoices")
      .update({
        manager_note: notes[id] || "",
      })
      .eq("id", id);

    if (error) {
      console.error("Manager note save error:", error);
    }

    setSaving(false);
    fetchInvoices();
  }

  function formatAmount(amount) {
    const number = Number(amount || 0);
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  function formatDate(date) {
    if (!date) return "—";
    return new Date(date).toLocaleDateString();
  }

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.10),transparent_38%)]" />

      <section className="relative px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <header className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <div className="mb-4 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
                  BOS Vendor Invoice Console
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Verify before payment approval.
                </h1>

                <p className="mt-4 max-w-3xl text-slate-300">
                  Live Supabase invoice review for vendor accuracy, manager
                  verification, board routing, and payment readiness.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => router.push("/portal/manager")}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A]"
                >
                  Manager Command Center
                </button>

                <button
                  onClick={() => router.push("/vendor/tracking")}
                  className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]"
                >
                  Vendor Tracking
                </button>
              </div>
            </div>
          </header>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Open Invoices" value={stats.open} />
            <Stat label="Needs Verification" value={stats.verification} />
            <Stat label="Ready for Board" value={stats.board} />
            <Stat label="Approved Payment" value={stats.payment} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
            <section className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-2xl font-semibold">Invoice Review Queue</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    {loading
                      ? "Loading live invoices..."
                      : `${invoices.length} live invoice records from Supabase.`}
                  </p>
                </div>

                <button
                  onClick={fetchInvoices}
                  className="rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]"
                >
                  Refresh Invoices
                </button>
              </div>

              <div className="space-y-4">
                {!loading &&
                  invoices.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full rounded-[1.5rem] border p-5 text-left transition ${
                        selectedId === item.id
                          ? "border-[#D4AF37]/50 bg-[#D4AF37]/10"
                          : "border-white/10 bg-[#0B1220]/80 hover:border-white/20"
                      }`}
                    >
                      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge>Invoice</Badge>
                            <span className="text-xs text-slate-500">
                              {item.invoice_number || "No invoice #"}
                            </span>
                            <StatusBadge status={item.status} />
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                              {item.priority || "Normal"} Priority
                            </span>
                          </div>

                          <h3 className="mt-4 text-xl font-semibold">
                            {item.vendor || "Unknown Vendor"}
                          </h3>

                          <p className="mt-2 text-sm text-slate-400">
                            {item.description || "No description provided."}
                          </p>

                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <Mini label="Amount" value={formatAmount(item.amount)} />
                            <Mini label="Association" value={item.association || "—"} />
                            <Mini label="Work Order" value={item.work_order_id || "—"} />
                          </div>

                          <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                            <span className="text-[#F3D77A]">Next step:</span>{" "}
                            {getNextStep(item.status)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}

                {!loading && invoices.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 text-sm text-slate-400">
                    No invoices found in Supabase.
                  </div>
                )}
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-6 shadow-2xl">
                {!selected ? (
                  <p className="text-sm text-slate-300">Select an invoice.</p>
                ) : (
                  <>
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#F3D77A]">
                      Selected Invoice
                    </p>

                    <h2 className="text-2xl font-semibold">
                      {selected.vendor || "Unknown Vendor"}
                    </h2>

                    <p className="mt-2 text-sm text-slate-300">
                      {selected.description || "No description provided."}
                    </p>

                    <div className="mt-5 space-y-3">
                      <Detail label="Invoice #" value={selected.invoice_number || "—"} />
                      <Detail label="Amount" value={formatAmount(selected.amount)} />
                      <Detail label="Association" value={selected.association || "—"} />
                      <Detail label="Work Order" value={selected.work_order_id || "—"} />
                      <Detail label="Submitted" value={formatDate(selected.submitted_at)} />
                      <Detail label="Status" value={selected.status || "—"} />
                    </div>

                    <textarea
                      value={notes[selected.id] || ""}
                      onChange={(e) =>
                        setNotes({
                          ...notes,
                          [selected.id]: e.target.value,
                        })
                      }
                      placeholder="Add manager verification note..."
                      rows={4}
                      className="mt-5 w-full rounded-2xl border border-white/10 bg-[#070B14]/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#D4AF37]/50"
                    />

                    <button
                      onClick={() => saveManagerNote(selected.id)}
                      disabled={saving}
                      className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A] disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Manager Note"}
                    </button>

                    <div className="mt-5 grid gap-3">
                      <button
                        onClick={() =>
                          updateInvoiceStatus(selected.id, "Approved for Payment")
                        }
                        disabled={saving}
                        className="rounded-xl bg-[#D4AF37] px-4 py-3 text-sm font-semibold text-[#070B14] transition hover:bg-[#F3D77A] disabled:opacity-50"
                      >
                        Approve for Payment
                      </button>

                      <button
                        onClick={() =>
                          updateInvoiceStatus(selected.id, "Ready for Board")
                        }
                        disabled={saving}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A] disabled:opacity-50"
                      >
                        Route to Board
                      </button>

                      <button
                        onClick={() =>
                          updateInvoiceStatus(selected.id, "Needs Documentation")
                        }
                        disabled={saving}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#F3D77A] disabled:opacity-50"
                      >
                        Request Info
                      </button>

                      <button
                        onClick={() => updateInvoiceStatus(selected.id, "Rejected")}
                        disabled={saving}
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-red-400/40 hover:text-red-200 disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-xl">
                <h2 className="text-xl font-semibold text-[#F3D77A]">
                  Invoice Verification Checklist
                </h2>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  <p>1. Confirm service was completed.</p>
                  <p>2. Match invoice to contract or scope.</p>
                  <p>3. Verify amount and billing frequency.</p>
                  <p>4. Attach supporting documentation.</p>
                  <p>5. Route to board only when decision-ready.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6 shadow-xl">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-[#F3D77A]">{value}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#F3D77A]">
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "Needs Verification": "border-amber-400/30 bg-amber-400/10 text-amber-300",
    "Ready for Board": "border-purple-400/30 bg-purple-400/10 text-purple-300",
    "Needs Documentation": "border-orange-400/30 bg-orange-400/10 text-orange-300",
    "Approved for Payment": "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    Rejected: "border-red-400/30 bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs ${
        styles[status] || "border-white/10 bg-white/5 text-slate-300"
      }`}
    >
      {status || "Needs Verification"}
    </span>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-100">{value}</span>
    </div>
  );
}

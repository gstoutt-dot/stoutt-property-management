import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../lib/supabaseClient";

export default function ManagerVendorInvoices() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    setLoading(true);

    const { data } = await supabase
      .from("vendor_invoices")
      .select("*")
      .order("created_at", { ascending: false });

    const fallback = [
      {
        id: "1",
        invoice_number: "INV-332",
        vendor: "GreenScape Landscaping",
        description: "Monthly landscape maintenance",
        amount: 4200,
        status: "Needs Verification",
        association: "Demo Lakes Association",
      },
      {
        id: "2",
        invoice_number: "INV-333",
        vendor: "AquaTech Pool Services",
        description: "Pool repair - lighting replacement",
        amount: 850,
        status: "Ready for Board",
        association: "Demo Lakes Association",
      },
      {
        id: "3",
        invoice_number: "INV-334",
        vendor: "Elevate Elevator Co.",
        description: "Quarterly elevator maintenance",
        amount: 2100,
        status: "Needs Documentation",
        association: "Demo Towers Association",
      },
    ];

    const safe = data && data.length > 0 ? data : fallback;

    setInvoices(safe);
    setSelectedId(safe[0]?.id || null);

    const map = {};
    safe.forEach((i) => (map[i.id] = i.manager_note || ""));
    setNotes(map);

    setLoading(false);
  }

  const selected =
    invoices.find((i) => String(i.id) === String(selectedId)) ||
    invoices[0] ||
    null;

  const stats = useMemo(() => {
    return {
      open: invoices.length,
      verification: invoices.filter((i) => i.status === "Needs Verification").length,
      board: invoices.filter((i) => i.status === "Ready for Board").length,
      documentation: invoices.filter((i) => i.status === "Needs Documentation").length,
      payment: invoices.filter((i) => i.status === "Approved for Payment").length,
    };
  }, [invoices]);

  async function updateStatus(id, status) {
    if (!id) return;

    setSaving(true);

    try {
      await supabase
        .from("vendor_invoices")
        .update({
          status: status,
          manager_note: notes[id] || "",
        })
        .eq("id", id);

      // force refresh from DB
      await fetchInvoices();
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
  }

  function formatAmount(a) {
    return `$${Number(a || 0).toLocaleString()}`;
  }

  return (
    <main className="min-h-screen bg-[#070B14] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-semibold">
            Verify before payment approval.
          </h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/portal/manager")}
              className="px-5 py-3 bg-white/10 rounded-xl"
            >
              Manager Command Center
            </button>

            <button
              onClick={() => router.push("/portal/manager/vendor-tracking")}
              className="px-5 py-3 bg-yellow-400 text-black rounded-xl"
            >
              Vendor Tracking
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mb-8">
          <Stat label="Open" value={stats.open} />
          <Stat label="Needs Verification" value={stats.verification} />
          <Stat label="Board" value={stats.board} />
          <Stat label="Docs" value={stats.documentation} />
          <Stat label="Approved" value={stats.payment} />
        </div>

        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div>
            <div className="mb-4 flex justify-between">
              <h2 className="text-2xl">Invoice Queue</h2>

              <button
                onClick={fetchInvoices}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg"
              >
                Refresh
              </button>
            </div>

            {invoices.map((i) => (
              <div
                key={i.id}
                onClick={() => setSelectedId(i.id)}
                className={`p-5 mb-4 border rounded-xl cursor-pointer ${
                  String(selectedId) === String(i.id)
                    ? "border-yellow-400"
                    : "border-white/10"
                }`}
              >
                <div className="text-sm opacity-60">{i.invoice_number}</div>
                <div className="text-xl font-semibold">{i.vendor}</div>
                <div className="text-sm opacity-70">{i.description}</div>
                <div className="mt-3">{formatAmount(i.amount)}</div>
                <div className="text-xs mt-2">{i.status}</div>
              </div>
            ))}
          </div>

          <div>
            {!selected ? (
              <div>Select invoice</div>
            ) : (
              <div className="p-5 border border-yellow-400 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">
                  {selected.vendor}
                </h2>

                <div className="mb-3">{selected.description}</div>

                <textarea
                  value={notes[selected.id] || ""}
                  onChange={(e) =>
                    setNotes({
                      ...notes,
                      [selected.id]: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-black border border-white/10 rounded-lg"
                />

                <div className="mt-4 grid gap-2">
                  <button
                    onClick={() =>
                      updateStatus(selected.id, "Approved for Payment")
                    }
                    disabled={saving}
                    className="bg-yellow-400 text-black p-3 rounded-lg"
                  >
                    {saving ? "Saving..." : "Approve"}
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selected.id, "Ready for Board")
                    }
                    disabled={saving}
                    className="border border-white/10 p-3 rounded-lg"
                  >
                    Board
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(selected.id, "Needs Documentation")
                    }
                    disabled={saving}
                    className="border border-white/10 p-3 rounded-lg"
                  >
                    Docs
                  </button>

                  <button
                    onClick={() => updateStatus(selected.id, "Rejected")}
                    disabled={saving}
                    className="border border-red-400 p-3 rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-5 border border-white/10 rounded-xl">
      <div className="text-sm opacity-60">{label}</div>
      <div className="text-3xl">{value}</div>
    </div>
  );
}

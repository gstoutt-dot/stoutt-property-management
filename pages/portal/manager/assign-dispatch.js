import Link from "next/link";
import { useState } from "react";
import bosTheme from "../../../styles/bos-theme";

export default function AssignDispatch() {
  const [selectedVendor, setSelectedVendor] = useState("");
  const [priority, setPriority] = useState("Standard");

  const vendors = [
    "Brightscape Landscaping",
    "AquaTech Pool Services",
    "Elite Electrical Solutions",
    "Sunrise Plumbing Co.",
  ];

  return (
    <main className={bosTheme.page}>
      {/* Glow */}
      <div className={bosTheme.glowShell}>
        <div className={bosTheme.glowGoldTop} />
        <div className={bosTheme.glowGoldBottom} />
      </div>

      <div className={bosTheme.container}>
        {/* HEADER */}
        <header className={bosTheme.header}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={bosTheme.eyebrow}>Manager Dispatch</p>
              <h1 className={bosTheme.title}>
                Assign Vendor & Dispatch Work
              </h1>
              <p className={bosTheme.subtitle}>
                Select the appropriate vendor, define priority, and initiate
                service dispatch for this request.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href="/portal/manager/request-detail"
                className={bosTheme.secondaryButton}
              >
                Back to Request
              </Link>

              <Link
                href="/portal/manager/work-orders"
                className={bosTheme.primaryButton}
              >
                Work Orders
              </Link>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* LEFT: REQUEST SUMMARY */}
          <div className={`${bosTheme.card} lg:col-span-2`}>
            <h2 className="text-xl font-semibold">Request Summary</h2>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                <span className="text-slate-500">Issue:</span>{" "}
                Pool light out near east gate
              </p>
              <p>
                <span className="text-slate-500">Resident:</span> Maria Hernandez
              </p>
              <p>
                <span className="text-slate-500">Unit:</span> 214
              </p>
              <p>
                <span className="text-slate-500">Association:</span> Harbor Pointe HOA
              </p>
              <p>
                <span className="text-slate-500">AI Notes:</span> Likely HOA
                responsibility per lighting/common area clause.
              </p>
            </div>

            {/* VENDOR SELECTION */}
            <div className="mt-6">
              <p className="text-sm text-slate-400">Select Vendor</p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {vendors.map((vendor) => (
                  <button
                    key={vendor}
                    onClick={() => setSelectedVendor(vendor)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selectedVendor === vendor
                        ? "border-yellow-400 bg-yellow-400/10"
                        : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]"
                    }`}
                  >
                    <p className="font-medium">{vendor}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* PRIORITY */}
            <div className="mt-6">
              <p className="text-sm text-slate-400">Priority Level</p>

              <div className="mt-3 flex gap-3">
                {["Low", "Standard", "Urgent"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setPriority(level)}
                    className={`rounded-xl px-4 py-2 text-sm transition ${
                      priority === level
                        ? "bg-yellow-400 text-black"
                        : "border border-white/10 bg-white/[0.05] text-slate-300 hover:bg-white/[0.1]"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div className="mt-6">
              <p className="text-sm text-slate-400">Dispatch Instructions</p>

              <textarea
                className="mt-3 w-full min-h-[140px] rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-slate-200 outline-none focus:border-yellow-400/40"
                placeholder="Add instructions for the vendor (access details, urgency, contact info, etc.)"
              />
            </div>
          </div>

          {/* RIGHT: ACTION PANEL */}
          <aside className={bosTheme.card}>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Dispatch Control
            </p>

            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                <span className="text-slate-500">Vendor:</span>{" "}
                {selectedVendor || "Not selected"}
              </p>
              <p>
                <span className="text-slate-500">Priority:</span> {priority}
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                className={bosTheme.goldButton}
                disabled={!selectedVendor}
              >
                Dispatch Work Order
              </button>

              <button className={bosTheme.whiteButton}>
                Save Draft
              </button>

              <button className={bosTheme.outlineButton}>
                Cancel
              </button>
            </div>

            {!selectedVendor && (
              <p className="mt-4 text-xs text-red-400">
                Select a vendor to enable dispatch.
              </p>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

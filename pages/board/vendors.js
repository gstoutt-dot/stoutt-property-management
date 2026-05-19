import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadVendors();
  }, []);

  async function loadVendors() {
    try {
      setLoadingVendors(true);
      setSystemMessage("");

      const response = await fetch(
        `/api/accounting/quickbooks/vendors?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load QuickBooks vendors.");
      }

      setVendors(data.vendors || []);
    } catch (error) {
      console.error("Unable to load board vendors:", error);
      setVendors([]);
      setSystemMessage(error.message || "Unable to load vendors.");
    } finally {
      setLoadingVendors(false);
    }
  }

  const filteredVendors = useMemo(() => {
    const searchValue = String(searchTerm || "").toLowerCase().trim();

    if (!searchValue) return vendors;

    return vendors.filter((vendor) =>
      [
        vendor.vendor_name,
        vendor.company_name,
        vendor.email,
        vendor.phone,
        vendor.address,
        vendor.vendor_type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );
  }, [vendors, searchTerm]);

  const activeVendors = vendors.filter((vendor) => vendor.active !== false);
  const vendorsWithBalances = vendors.filter(
    (vendor) => Number(vendor.balance || 0) > 0
  );
  const totalVendorBalance = vendors.reduce((sum, vendor) => {
    const value = Number(vendor.balance || 0);
    return Number.isFinite(value) ? sum + value : sum;
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Vendor Registry
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Board Vendors
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
            <Link href="/board">Board Dashboard</Link>
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            QuickBooks Vendor Registry
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Review association vendors synced from QuickBooks.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Board members can review active association vendors, vendor balances,
            contact details, and vendor records connected to the association’s
            accounting system.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Synced Vendors" value={vendors.length} />
          <Metric label="Active Vendors" value={activeVendors.length} />
          <Metric label="Vendors With Balances" value={vendorsWithBalances.length} />
          <Metric label="Total Vendor Balance" value={formatCurrency(totalVendorBalance)} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                Vendor Directory
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Live vendor records retrieved from the association’s QuickBooks connection.
              </p>
            </div>

            <button
              onClick={loadVendors}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Refresh Vendors
            </button>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/70 p-4">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-400"
              placeholder="Search vendors, companies, services, phone, email, or address..."
            />
          </div>

          <div className="mt-6 space-y-4">
            {loadingVendors ? (
              <Empty message="Loading QuickBooks vendors..." />
            ) : filteredVendors.length === 0 ? (
              <Empty message="No vendor records match the current search." />
            ) : (
              filteredVendors.map((vendor, index) => (
                <VendorCard key={vendor.quickbooks_vendor_id || index} vendor={vendor} />
              ))
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Vendor Operations Foundation
          </h3>

          <p className="mt-3 text-slate-300">
            This page now uses live QuickBooks vendor records as the foundation
            for future vendor insurance tracking, work order dispatch, invoice
            approval routing, and board vendor oversight.
          </p>
        </div>
      </section>
    </main>
  );
}

function VendorCard({ vendor }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
            {vendor.vendor_type || "Vendor"} · QuickBooks ID{" "}
            {vendor.quickbooks_vendor_id || "N/A"}
          </p>

          <h4 className="mt-2 text-xl font-semibold">
            {vendor.vendor_name || vendor.company_name || "Vendor"}
          </h4>

          <p className="mt-3 text-sm text-slate-400">
            {vendor.company_name || "Association vendor record"}
          </p>

          <div className="mt-4 grid gap-2 text-xs text-slate-500 md:grid-cols-3">
            <p>Email: {vendor.email || "Not Provided"}</p>
            <p>Phone: {vendor.phone || "Not Provided"}</p>
            <p>Status: {vendor.active === false ? "Inactive" : "Active"}</p>
          </div>

          {vendor.address && (
            <p className="mt-3 text-xs text-slate-500">
              Address: {vendor.address}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-right">
          <p className="text-xs text-emerald-100/70">
            Vendor Balance
          </p>

          <p className="mt-2 text-2xl font-semibold text-emerald-100">
            {formatCurrency(vendor.balance)}
          </p>

          <p className="mt-2 text-xs text-emerald-100/60">
            {vendor.sync_status || "vendor_synced"}
          </p>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-amber-300">{value}</p>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function formatCurrency(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(amount) ? amount : 0);
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const closedStatuses = ["completed", "archived", "closed"];

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadVendors();
    loadVendorRecords();

    const interval = setInterval(() => {
      loadVendorRecords();
    }, 30000);

    return () => clearInterval(interval);
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

  async function loadVendorRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${DEFAULT_ASSOCIATION_ID}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load vendor operational records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        } ${record.recommended_action || ""}`.toLowerCase();

        const status = String(record.status || "").toLowerCase();

        return (
          !closedStatuses.includes(status) &&
          (combined.includes("vendor") ||
            combined.includes("contractor") ||
            combined.includes("invoice") ||
            combined.includes("payment") ||
            combined.includes("performance") ||
            combined.includes("insurance") ||
            combined.includes("maintenance") ||
            combined.includes("service provider"))
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load vendor operational records:", error);
    } finally {
      setLoadingRecords(false);
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

  const paymentRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("payment") || combined.includes("invoice");
      }),
    [operationalRecords]
  );

  const performanceRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("performance") || combined.includes("service");
      }),
    [operationalRecords]
  );

  const insuranceRecords = useMemo(
    () =>
      operationalRecords.filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return combined.includes("insurance") || combined.includes("contract");
      }),
    [operationalRecords]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Board Vendors
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              QuickBooks vendor registry, vendor balances, service provider oversight,
              payment review, insurance tracking, and vendor operational records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            QuickBooks Vendor Registry + Operational Oversight
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Vendor operations now combine live QuickBooks vendor records with board operational oversight.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Board members can review active association vendors, balances, contact details,
            vendor payments, performance matters, insurance records, and service provider
            issues connected through the centralized Admin Operations Intake system.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Vendor Performance"
              )}&return_path=${encodeURIComponent(
                "/board/vendors"
              )}&return_label=${encodeURIComponent("Board Vendors")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Vendor Record
            </Link>

            <Link
              href="/board/maintenance-review"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Maintenance Review
            </Link>

            <Link
              href="/board/insurance-risk"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Insurance & Risk
            </Link>

            <button
              onClick={loadVendors}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Refresh Vendors
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Synced Vendors" value={vendors.length} />
          <Metric label="Active Vendors" value={activeVendors.length} />
          <Metric label="Vendor Balances" value={vendorsWithBalances.length} />
          <Metric label="Total Balance" value={formatCurrency(totalVendorBalance)} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Vendor Payments / Invoices" items={paymentRecords} />
          <OperationalPanel title="Vendor Performance" items={performanceRecords} />
          <OperationalPanel title="Insurance / Contracts" items={insuranceRecords} />
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Live QuickBooks Vendor Feed
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Vendor Directory
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Live vendor records retrieved from the association’s QuickBooks connection.
              </p>
            </div>

            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Vendor Performance"
              )}&return_path=${encodeURIComponent(
                "/board/vendors"
              )}&return_label=${encodeURIComponent("Board Vendors")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Vendor Record
            </Link>
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
            Vendor Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page preserves live QuickBooks vendor visibility while adding
            distributed vendor operational records from Admin Operations Intake.
          </p>
        </div>
      </section>
    </main>
  );
}

function OperationalPanel({ title, items }) {
  return (
    <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
      <h3 className="text-xl font-semibold text-amber-100">{title}</h3>

      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 text-sm text-slate-400">
            No operational records found.
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-5">
              <h4 className="font-semibold text-white">
                {item.title || "Untitled Vendor Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Vendor Record"}</span>
                <span>•</span>
                <span>{item.status || "Submitted"}</span>
                <span>•</span>
                <span>{item.priority || "Normal"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
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

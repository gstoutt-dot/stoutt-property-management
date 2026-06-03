import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const documentTypes = [
  "W9",
  "Certificate of Insurance",
  "License",
  "Contract",
  "Proposal",
  "Invoice",
  "Photos",
  "Other",
];

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
      console.error("Unable to load association vendors:", error);
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
        vendor.vendor_display_name,
        vendor.company_name,
        vendor.email,
        vendor.primary_email,
        vendor.phone,
        vendor.primary_phone,
        vendor.address,
        vendor.vendor_type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );
  }, [vendors, searchTerm]);

  const activeVendors = vendors.filter((vendor) => vendor.active !== false);

  const vendorsWithEmail = vendors.filter(
    (vendor) => vendor.email || vendor.primary_email
  );

  const vendorsWithPhone = vendors.filter(
    (vendor) => vendor.phone || vendor.primary_phone
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
              Association Approved Vendors
            </h1>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
              Legal vendor file, compliance documentation, board authorization,
              signature approval readiness, dispatch support, and QuickBooks
              vendor visibility.
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
              href="/portal/manager/vendor-dispatch"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Vendor Dispatch
            </Link>

            <Link
              href="/board/signature-approval-log"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Signature Log
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Vendor Compliance + Governance Readiness
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Convert QuickBooks vendors into association-approved vendors by
            maintaining their legal file, compliance documents, and governance
            authorization trail.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            A vendor becomes association approved when the association can
            document the W9, insurance, license, contract, board authorization,
            and signature approval pathway required for future invoice and
            payment processing.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={loadVendors}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Refresh Vendors
            </button>

            <Link
              href="/portal/manager/vendor-dispatch"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Open Vendor Dispatch
            </Link>

            <Link
              href="/board/signature-approval-new"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Create Signature Authorization
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Synced Vendors" value={vendors.length} />
          <Metric label="Active Vendors" value={activeVendors.length} />
          <Metric label="Email Ready" value={vendorsWithEmail.length} />
          <Metric label="Phone Ready" value={vendorsWithPhone.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Live QuickBooks Vendor Feed
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Approved Vendor Registry
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Vendors below are sourced from the association vendor feed. The
                next connection layer will attach legal documentation, board
                review, and signature certification to each vendor file.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/70 p-4">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="input"
              placeholder="Search vendors, companies, services, phone, email, or address..."
            />
          </div>

          <div className="mt-6 space-y-6">
            {loadingVendors ? (
              <Empty message="Loading association vendors..." />
            ) : filteredVendors.length === 0 ? (
              <Empty message="No vendor records match the current search." />
            ) : (
              filteredVendors.map((vendor, index) => (
                <VendorCard
                  key={vendor.id || vendor.quickbooks_vendor_id || index}
                  vendor={vendor}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background-color: rgba(15, 23, 42, 0.9) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
          padding: 0.85rem 1rem;
          outline: none;
          appearance: none;
          -webkit-appearance: none;
        }

        .input::placeholder {
          color: rgba(148, 163, 184, 0.95) !important;
          -webkit-text-fill-color: rgba(148, 163, 184, 0.95) !important;
        }

        .input:focus {
          border-color: rgba(251, 191, 36, 0.45);
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.08);
        }

        input.input,
        textarea.input,
        select.input {
          background-color: rgba(15, 23, 42, 0.9) !important;
          color: #ffffff !important;
          -webkit-text-fill-color: #ffffff !important;
        }

        option {
          background: #020617;
          color: #ffffff;
        }
      `}</style>
    </main>
  );
}

function VendorCard({ vendor }) {
  const vendorName =
    vendor.vendor_name ||
    vendor.vendor_display_name ||
    vendor.company_name ||
    "Vendor";

  const vendorEmail = vendor.email || vendor.primary_email || "";
  const vendorPhone = vendor.phone || vendor.primary_phone || "";

  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                {vendor.vendor_type || "Vendor"} · QuickBooks ID{" "}
                {vendor.quickbooks_vendor_id || vendor.id || "N/A"}
              </p>

              <h4 className="mt-2 text-2xl font-semibold">
                {vendorName}
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Association vendor record synchronized from the accounting
                vendor source. Compliance documentation and governance approvals
                will determine association-approved status.
              </p>
            </div>

            <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
              {vendor.active === false ? "Inactive" : "Active"}
            </div>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <Info label="Email" value={vendorEmail || "Not Provided"} />
            <Info label="Phone" value={vendorPhone || "Not Provided"} />
            <Info label="Address" value={vendor.address || "Not Provided"} />
            <Info label="Sync Status" value={vendor.sync_status || "vendor_synced"} />
          </div>

          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              Approval Status
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StatusPill label="Legal File" value="Pending Documents" />
              <StatusPill label="Board Authorization" value="Not Sent" />
              <StatusPill label="Signature Certification" value="Not Certified" />
              <StatusPill label="Payment Readiness" value="Not Authorized" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {vendorPhone ? (
              <a
                href={`tel:${vendorPhone}`}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              >
                Call Vendor
              </a>
            ) : (
              <button
                disabled
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-500"
              >
                Call Vendor
              </button>
            )}

            {vendorEmail ? (
              <a
                href={`mailto:${vendorEmail}`}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Email Vendor
              </a>
            ) : (
              <button
                disabled
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-500"
              >
                Email Vendor
              </button>
            )}

            <Link
              href="/portal/manager/vendor-dispatch"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Open Dispatch
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <h4 className="text-lg font-semibold text-blue-200">
              Vendor Legal Documents
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Phase 1 structure only. Next step will connect upload, view, and
              delete controls using the existing document pattern.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {documentTypes.map((documentType) => (
                <div
                  key={documentType}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <p className="text-sm font-semibold text-slate-200">
                    {documentType}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Not uploaded
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Document name..."
                className="input"
                disabled
              />

              <select className="input" disabled>
                {documentTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              <input
                type="file"
                className="input sm:col-span-2"
                disabled
              />

              <textarea
                placeholder="Document notes..."
                rows={3}
                className="input sm:col-span-2"
                disabled
              />

              <button
                disabled
                className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-200 opacity-50 sm:col-span-2"
              >
                Upload Vendor Document — Next Connection
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <h4 className="text-lg font-semibold text-emerald-200">
              Governance + Payment Readiness
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Vendor authorization should connect to board review and signature
              certification before future Ava-assisted invoice processing.
            </p>

            <div className="mt-4 grid gap-3">
              <GovernanceLine label="Board Review" value="Not Sent" />
              <GovernanceLine label="Signature Approval" value="Not Created" />
              <GovernanceLine label="Certification" value="Not Signed" />
              <GovernanceLine label="Invoice Processing" value="Locked" />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                disabled
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 opacity-50"
              >
                Send Vendor To Board — Next Connection
              </button>

              <Link
                href="/board/signature-approval-new"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Create Signature Approval
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <h4 className="text-lg font-semibold text-red-200">
              Administrative Cleanup
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Vendor documents, test notes, and vendor review records will be
              deletable after the document layer is connected. QuickBooks vendors
              should be deactivated rather than permanently deleted.
            </p>

            <button
              disabled
              className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 opacity-50"
            >
              Deactivate Vendor — Next Connection
            </button>
          </section>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p>
      <span className="text-slate-500">{label}:</span>{" "}
      {value || "—"}
    </p>
  );
}

function StatusPill({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-amber-200">
        {value}
      </p>
    </div>
  );
}

function GovernanceLine({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="font-semibold text-slate-200">{value}</span>
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

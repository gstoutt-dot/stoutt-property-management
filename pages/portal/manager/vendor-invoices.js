import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const requiredDocumentTypes = [
  "W9",
  "Certificate of Insurance",
  "Business License",
  "Executed Contract",
  "Vendor Proposal",
];

const invoiceStatuses = [
  "Needs Verification",
  "Needs Documentation",
  "Ready for Board",
  "Approved for Payment",
  "Rejected",
];

export default function ManagerVendorInvoices() {
  const [vendors, setVendors] = useState([]);
  const [vendorDocuments, setVendorDocuments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [invoiceForm, setInvoiceForm] = useState({
    vendor_id: "",
    invoice_number: "",
    invoice_date: "",
    due_date: "",
    amount: "",
    description: "",
    file: null,
  });
  const [managerNotes, setManagerNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      setLoading(true);
      setSystemMessage("");

      await Promise.all([
        loadVendors(),
        loadVendorDocuments(),
        loadInvoices(),
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function loadVendors() {
    try {
      const response = await fetch(
        `/api/accounting/quickbooks/vendors?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.error || "Unable to load vendors.");
      }

      setVendors(payload.vendors || []);
    } catch (error) {
      console.error("Unable to load vendors:", error);
      setVendors([]);
      setSystemMessage(error.message || "Unable to load vendors.");
    }
  }

  async function loadVendorDocuments() {
    try {
      const response = await fetch(
        `/api/vendors/list-documents?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load vendor documents.");
      }

      setVendorDocuments(payload.documents || []);
    } catch (error) {
      console.error("Unable to load vendor documents:", error);
      setVendorDocuments([]);
    }
  }

  async function loadInvoices() {
    try {
      const response = await fetch(
        `/api/vendors/list-invoices?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load vendor invoices.");
      }

      const safeInvoices = payload.invoices || [];

      setInvoices(safeInvoices);
      setSelectedId((current) => {
        if (current && safeInvoices.some((invoice) => invoice.id === current)) {
          return current;
        }

        return safeInvoices[0]?.id || "";
      });

      const noteMap = {};
      safeInvoices.forEach((invoice) => {
        noteMap[invoice.id] = invoice.manager_note || "";
      });
      setManagerNotes(noteMap);
    } catch (error) {
      console.error("Unable to load vendor invoices:", error);
      setInvoices([]);
      setSystemMessage(error.message || "Unable to load vendor invoices.");
    }
  }

  async function uploadInvoice(event) {
    event.preventDefault();

    const selectedVendor = vendors.find(
      (vendor) => String(getVendorId(vendor)) === String(invoiceForm.vendor_id)
    );

    if (!selectedVendor) {
      setSystemMessage("Choose an approved vendor before uploading an invoice.");
      return;
    }

    if (!invoiceForm.invoice_number) {
      setSystemMessage("Invoice number is required.");
      return;
    }

    if (!invoiceForm.file) {
      setSystemMessage("Choose an invoice file to upload.");
      return;
    }

    try {
      setUploading(true);
      setSystemMessage("");

      const fileBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(invoiceForm.file);
      });

      const response = await fetch("/api/vendors/upload-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          vendor_id: getVendorId(selectedVendor),
          quickbooks_vendor_id: selectedVendor.quickbooks_vendor_id || "",
          vendor_name: getVendorName(selectedVendor),
          vendor_email:
            selectedVendor.email || selectedVendor.primary_email || "",
          invoice_number: invoiceForm.invoice_number,
          invoice_date: invoiceForm.invoice_date || null,
          due_date: invoiceForm.due_date || null,
          amount: invoiceForm.amount || 0,
          description: invoiceForm.description || "",
          uploaded_by: "Manager",
          file_name: invoiceForm.file.name,
          file_type: invoiceForm.file.type,
          file_base64: fileBase64,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to upload invoice.");
      }

      setInvoiceForm({
        vendor_id: "",
        invoice_number: "",
        invoice_date: "",
        due_date: "",
        amount: "",
        description: "",
        file: null,
      });

      await loadInvoices();

      setSystemMessage("Vendor invoice uploaded for verification.");
    } catch (error) {
      console.error("Unable to upload invoice:", error);
      setSystemMessage(error.message || "Unable to upload invoice.");
    } finally {
      setUploading(false);
    }
  }

  async function updateInvoiceStatus(invoice, status) {
    if (!invoice?.id) return;

    const readiness =
      status === "Approved for Payment" ? "Ready for Payment Review" : "Locked";

    try {
      setSavingId(invoice.id);
      setSystemMessage("");

      const response = await fetch("/api/vendors/update-invoice-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: invoice.id,
          status,
          manager_note: managerNotes[invoice.id] || "",
          board_note: invoice.board_note || "",
          payment_readiness: readiness,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to update invoice.");
      }

      await loadInvoices();

      setSystemMessage(`Invoice marked ${status}.`);
    } catch (error) {
      console.error("Unable to update invoice:", error);
      setSystemMessage(error.message || "Unable to update invoice.");
    } finally {
      setSavingId("");
    }
  }

  async function deleteInvoice(invoice) {
    if (!invoice?.id) return;

    const confirmed = window.confirm(
      "Delete this vendor invoice permanently?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(invoice.id);
      setSystemMessage("");

      const response = await fetch(
        `/api/vendors/delete-invoice?id=${encodeURIComponent(invoice.id)}`,
        {
          method: "DELETE",
        }
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to delete invoice.");
      }

      await loadInvoices();

      setSystemMessage("Vendor invoice deleted.");
    } catch (error) {
      console.error("Unable to delete invoice:", error);
      setSystemMessage(error.message || "Unable to delete invoice.");
    } finally {
      setDeletingId("");
    }
  }

  const selected =
    invoices.find((invoice) => String(invoice.id) === String(selectedId)) ||
    invoices[0] ||
    null;

  const stats = useMemo(() => {
    return {
      total: invoices.length,
      verification: invoices.filter(
        (invoice) => invoice.status === "Needs Verification"
      ).length,
      documentation: invoices.filter(
        (invoice) => invoice.status === "Needs Documentation"
      ).length,
      board: invoices.filter((invoice) => invoice.status === "Ready for Board")
        .length,
      payment: invoices.filter(
        (invoice) => invoice.status === "Approved for Payment"
      ).length,
    };
  }, [invoices]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Manager Operations
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Vendor Invoice Processing
            </h1>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
              Upload vendor invoices, verify approved vendor compliance,
              review documentation, and prepare payment authorization without
              bypassing board or signature controls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/board/vendors"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Approved Vendors
            </Link>

            <Link
              href="/portal/manager"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Manager Command Center
            </Link>

            <button
              onClick={loadAll}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Invoice Verification + Payment Readiness
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Vendor invoices are reviewed against the approved vendor file before
            payment readiness is allowed.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            This page does not pay vendors automatically. It creates the
            operational verification layer required before future Ava-assisted
            payment processing can safely occur.
          </p>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-5">
          <Metric label="Invoices" value={stats.total} />
          <Metric label="Verification" value={stats.verification} />
          <Metric label="Docs Needed" value={stats.documentation} />
          <Metric label="Board Ready" value={stats.board} />
          <Metric label="Payment Ready" value={stats.payment} />
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Vendor Invoice Upload
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Upload Vendor Invoice
          </h2>

          <form onSubmit={uploadInvoice} className="mt-6 grid gap-4 lg:grid-cols-2">
            <select
              value={invoiceForm.vendor_id}
              onChange={(event) =>
                setInvoiceForm({
                  ...invoiceForm,
                  vendor_id: event.target.value,
                })
              }
              className="input"
              required
            >
              <option value="">Select Approved Vendor</option>
              {vendors.map((vendor) => (
                <option key={getVendorId(vendor)} value={getVendorId(vendor)}>
                  {getVendorName(vendor)}
                </option>
              ))}
            </select>

            <input
              value={invoiceForm.invoice_number}
              onChange={(event) =>
                setInvoiceForm({
                  ...invoiceForm,
                  invoice_number: event.target.value,
                })
              }
              placeholder="Invoice number..."
              className="input"
              required
            />

            <input
              type="date"
              value={invoiceForm.invoice_date}
              onChange={(event) =>
                setInvoiceForm({
                  ...invoiceForm,
                  invoice_date: event.target.value,
                })
              }
              className="input"
            />

            <input
              type="date"
              value={invoiceForm.due_date}
              onChange={(event) =>
                setInvoiceForm({
                  ...invoiceForm,
                  due_date: event.target.value,
                })
              }
              className="input"
            />

            <input
              type="number"
              step="0.01"
              value={invoiceForm.amount}
              onChange={(event) =>
                setInvoiceForm({
                  ...invoiceForm,
                  amount: event.target.value,
                })
              }
              placeholder="Invoice amount..."
              className="input"
            />

            <input
              type="file"
              onChange={(event) =>
                setInvoiceForm({
                  ...invoiceForm,
                  file: event.target.files?.[0] || null,
                })
              }
              className="input"
              accept=".pdf,.png,.jpg,.jpeg,.webp,.xlsx,.xls,.csv,.doc,.docx"
              required
            />

            <textarea
              value={invoiceForm.description}
              onChange={(event) =>
                setInvoiceForm({
                  ...invoiceForm,
                  description: event.target.value,
                })
              }
              placeholder="Invoice description, work order reference, service period, or manager note..."
              rows={4}
              className="input lg:col-span-2"
            />

            <button
              type="submit"
              disabled={uploading}
              className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 py-4 font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50 lg:col-span-2"
            >
              {uploading ? "Uploading Invoice..." : "Upload Vendor Invoice"}
            </button>
          </form>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Live Invoice Queue
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Vendor Invoices
              </h2>
            </div>

            {loading ? (
              <Empty message="Loading vendor invoices..." />
            ) : invoices.length === 0 ? (
              <Empty message="No vendor invoices have been uploaded yet." />
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <button
                    key={invoice.id}
                    onClick={() => setSelectedId(invoice.id)}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      String(selectedId) === String(invoice.id)
                        ? "border-amber-400/60 bg-amber-400/10"
                        : "border-white/10 bg-slate-950/60 hover:border-amber-400/30"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Invoice {invoice.invoice_number || "N/A"}
                        </p>

                        <h3 className="mt-2 text-xl font-semibold text-white">
                          {invoice.vendor_name || "Vendor"}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {invoice.description || "No description provided."}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-semibold text-amber-300">
                          {formatCurrency(invoice.amount)}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          {invoice.status || "Needs Verification"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            {!selected ? (
              <Empty message="Select an invoice to review." />
            ) : (
              <InvoiceReviewPanel
                invoice={selected}
                vendor={vendors.find(
                  (vendor) =>
                    String(getVendorId(vendor)) === String(selected.vendor_id)
                )}
                vendorDocuments={vendorDocuments.filter(
                  (document) =>
                    String(document.vendor_id) === String(selected.vendor_id)
                )}
                managerNote={managerNotes[selected.id] || ""}
                onManagerNoteChange={(value) =>
                  setManagerNotes((current) => ({
                    ...current,
                    [selected.id]: value,
                  }))
                }
                onUpdateStatus={updateInvoiceStatus}
                onDeleteInvoice={deleteInvoice}
                savingId={savingId}
                deletingId={deletingId}
              />
            )}
          </aside>
        </section>
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

function InvoiceReviewPanel({
  invoice,
  vendor,
  vendorDocuments,
  managerNote,
  onManagerNoteChange,
  onUpdateStatus,
  onDeleteInvoice,
  savingId,
  deletingId,
}) {
  const missingRequiredDocuments = getMissingRequiredDocuments(vendorDocuments);
  const legalFileComplete = missingRequiredDocuments.length === 0;

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
        Invoice Review
      </p>

      <h2 className="mt-3 text-2xl font-bold">
        {invoice.vendor_name || "Vendor"}
      </h2>

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
        <Detail label="Invoice Number" value={invoice.invoice_number || "N/A"} />
        <Detail label="Amount" value={formatCurrency(invoice.amount)} />
        <Detail label="Status" value={invoice.status || "Needs Verification"} />
        <Detail label="Payment Readiness" value={invoice.payment_readiness || "Locked"} />
      </div>

      {invoice.file_url && (
        <a
          href={invoice.file_url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 block rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-100 hover:bg-blue-500/20"
        >
          Open Uploaded Invoice
        </a>
      )}

      <div
        className={`mt-5 rounded-2xl border p-5 ${
          legalFileComplete
            ? "border-emerald-400/30 bg-emerald-500/10"
            : "border-red-400/30 bg-red-500/10"
        }`}
      >
        <p
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            legalFileComplete ? "text-emerald-300" : "text-red-300"
          }`}
        >
          Vendor Compliance Check
        </p>

        <h3 className="mt-3 text-xl font-semibold">
          {legalFileComplete
            ? "Approved Vendor Legal File Complete"
            : "Vendor Legal File Incomplete"}
        </h3>

        {!legalFileComplete && (
          <div className="mt-4 space-y-2">
            {missingRequiredDocuments.map((documentType) => (
              <div
                key={documentType}
                className="rounded-xl border border-red-400/20 bg-slate-950/60 px-4 py-3 text-sm text-red-100"
              >
                Missing: {documentType}
              </div>
            ))}
          </div>
        )}
      </div>

      <textarea
        value={managerNote}
        onChange={(event) => onManagerNoteChange(event.target.value)}
        placeholder="Manager verification note..."
        rows={4}
        className="input mt-5"
      />

      <div className="mt-5 grid gap-3">
        {invoiceStatuses.map((status) => (
          <button
            key={status}
            onClick={() => onUpdateStatus(invoice, status)}
            disabled={savingId === invoice.id}
            className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold disabled:opacity-50 ${
              status === "Approved for Payment"
                ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                : status === "Rejected"
                ? "border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20"
                : "border-white/10 bg-white/[0.04] text-slate-200 hover:bg-white/10"
            }`}
          >
            {savingId === invoice.id ? "Saving..." : status}
          </button>
        ))}

        <button
          onClick={() => onDeleteInvoice(invoice)}
          disabled={deletingId === invoice.id}
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-200 hover:bg-red-500/20 disabled:opacity-50"
        >
          {deletingId === invoice.id ? "Deleting..." : "Delete Invoice"}
        </button>
      </div>
    </div>
  );
}

function getVendorId(vendor) {
  return vendor?.id || "";
}

function getVendorName(vendor) {
  return (
    vendor?.vendor_name ||
    vendor?.vendor_display_name ||
    vendor?.company_name ||
    "Vendor"
  );
}

function hasDocumentCategory(documents, category) {
  return documents.some(
    (document) =>
      String(document.document_category || "").toLowerCase() ===
      String(category || "").toLowerCase()
  );
}

function getMissingRequiredDocuments(documents) {
  return requiredDocumentTypes.filter(
    (type) => !hasDocumentCategory(documents, type)
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

function Detail({ label, value }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4 border-b border-white/10 pb-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-semibold text-slate-100">
        {value || "—"}
      </span>
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

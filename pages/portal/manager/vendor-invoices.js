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
  const [returnNotes, setReturnNotes] = useState({});
  const [paymentReferences, setPaymentReferences] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [sendingToBoardId, setSendingToBoardId] = useState("");
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
      const returnMap = {};
      const paymentMap = {};

      safeInvoices.forEach((invoice) => {
        noteMap[invoice.id] = invoice.manager_note || "";
        returnMap[invoice.id] = invoice.returned_to_vendor_note || "";
        paymentMap[invoice.id] = invoice.payment_reference || "";
      });

      setManagerNotes(noteMap);
      setReturnNotes(returnMap);
      setPaymentReferences(paymentMap);
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

  async function sendInvoiceToBoard(invoice, managerNote, legalFileComplete, missingRequiredDocuments) {
    if (!invoice?.id) return;

    try {
      setSendingToBoardId(invoice.id);
      setSystemMessage("");

      const response = await fetch("/api/vendors/send-invoice-to-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          invoice,
          manager_note: managerNote || "",
          compliance_status: legalFileComplete
            ? "Vendor Legal File Complete"
            : "Vendor Legal File Incomplete",
          missing_documents: missingRequiredDocuments,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send invoice to board.");
      }

      await loadInvoices();

      setSystemMessage("Invoice sent to Board Approval Queue.");
    } catch (error) {
      console.error("Unable to send invoice to board:", error);
      setSystemMessage(error.message || "Unable to send invoice to board.");
    } finally {
      setSendingToBoardId("");
    }
  }

  async function updateInvoiceAction(invoice, action) {
    if (!invoice?.id) return;

    const actionConfig = {
      manager_approval: {
        status: "Manager Approved",
        payment_readiness: "Manager Approved",
        actor_name: "Manager",
      },
      return_to_vendor: {
        status: "Returned To Vendor",
        payment_readiness: "Locked",
        actor_name: "Manager",
      },
      pay_now: {
        status: "Paid",
        payment_readiness: "Paid",
        actor_name: "Manager",
      },
    };

    const config = actionConfig[action];

    if (!config) return;

    if (action === "pay_now" && !invoice.board_approved_at) {
      const confirmed = window.confirm(
        "This invoice does not show board approval yet. Continue with Pay Now anyway?"
      );

      if (!confirmed) return;
    }

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
          status: config.status,
          manager_note: managerNotes[invoice.id] || "",
          board_note: invoice.board_note || "",
          payment_readiness: config.payment_readiness,
          action,
          actor_name: config.actor_name,
          returned_to_vendor_note: returnNotes[invoice.id] || "",
          payment_reference: paymentReferences[invoice.id] || "",
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to update invoice.");
      }

      await loadInvoices();

      setSystemMessage(`Invoice updated: ${config.status}.`);
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
      manager: invoices.filter((invoice) => invoice.manager_approved_at).length,
      board: invoices.filter((invoice) => invoice.board_approved_at).length,
      returned: invoices.filter((invoice) => invoice.status === "Returned To Vendor").length,
      paid: invoices.filter((invoice) => invoice.payment_status === "Paid").length,
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
              Upload, verify, send to board, return, and mark vendor invoices
              paid while preserving manager review, board treasurer approval,
              and payment execution history.
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
            Invoice Approval + Payment Control
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Vendor invoices move from manager verification to board treasurer
            approval before payment is executed.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Pay Now records payment execution inside SPM. It does not yet
            transmit a live bank payment. Future Ava automation can use this
            same chain after board approval.
          </p>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-5">
          <Metric label="Invoices" value={stats.total} />
          <Metric label="Manager Approved" value={stats.manager} />
          <Metric label="Board Approved" value={stats.board} />
          <Metric label="Returned" value={stats.returned} />
          <Metric label="Paid" value={stats.paid} />
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

                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                          <StatusBadge label={invoice.status || "Needs Verification"} />
                          <StatusBadge label={invoice.payment_status || "Not Paid"} />
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-semibold text-amber-300">
                          {formatCurrency(invoice.amount)}
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          {invoice.payment_readiness || "Locked"}
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
                vendorDocuments={vendorDocuments.filter(
                  (document) =>
                    String(document.vendor_id) === String(selected.vendor_id)
                )}
                managerNote={managerNotes[selected.id] || ""}
                returnNote={returnNotes[selected.id] || ""}
                paymentReference={paymentReferences[selected.id] || ""}
                sendingToBoardId={sendingToBoardId}
                onManagerNoteChange={(value) =>
                  setManagerNotes((current) => ({
                    ...current,
                    [selected.id]: value,
                  }))
                }
                onReturnNoteChange={(value) =>
                  setReturnNotes((current) => ({
                    ...current,
                    [selected.id]: value,
                  }))
                }
                onPaymentReferenceChange={(value) =>
                  setPaymentReferences((current) => ({
                    ...current,
                    [selected.id]: value,
                  }))
                }
                onUpdateAction={updateInvoiceAction}
                onSendToBoard={sendInvoiceToBoard}
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
  vendorDocuments,
  managerNote,
  returnNote,
  paymentReference,
  sendingToBoardId,
  onManagerNoteChange,
  onReturnNoteChange,
  onPaymentReferenceChange,
  onUpdateAction,
  onSendToBoard,
  onDeleteInvoice,
  savingId,
  deletingId,
}) {
  const missingRequiredDocuments = getMissingRequiredDocuments(vendorDocuments);
  const legalFileComplete = missingRequiredDocuments.length === 0;
  const managerApproved = !!invoice.manager_approved_at;
  const boardApproved = !!invoice.board_approved_at;
  const paid = invoice.payment_status === "Paid";

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
        <Detail label="Payment Status" value={invoice.payment_status || "Not Paid"} />
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

      <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
          Approval Trail
        </p>

                <ApprovalLine
          label="Manager Approval"
          value={
            managerApproved
              ? `Approved by ${invoice.manager_approved_by || "Manager"}`
              : "Pending"
          }
          complete={managerApproved}
        />

        <ApprovalLine
          label="Board Acknowledgement"
          value={
            invoice.board_acknowledged_at
              ? `Acknowledged by ${
                  invoice.board_acknowledged_by || "Board Member"
                }`
              : "Pending"
          }
          complete={!!invoice.board_acknowledged_at}
        />

        <ApprovalLine
          label="Board Treasurer Approval"
          value={
            boardApproved
              ? `Approved by ${invoice.board_approved_by || "Board Treasurer"}`
              : "Pending"
          }
          complete={boardApproved}
        />

        {invoice.board_last_message && (
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
            <div className="text-slate-400">Latest Board Message</div>
            <div className="mt-1 whitespace-pre-wrap font-semibold text-slate-200">
              {invoice.board_last_message}
            </div>
          </div>
        )}

        <ApprovalLine
          label="Payment Execution"
          value={paid ? `Paid by ${invoice.paid_by || "Manager"}` : "Not Paid"}
          complete={paid}
        />
      </div>

      <textarea
        value={managerNote}
        onChange={(event) => onManagerNoteChange(event.target.value)}
        placeholder="Manager verification note..."
        rows={3}
        className="input mt-5"
      />

      <textarea
        value={returnNote}
        onChange={(event) => onReturnNoteChange(event.target.value)}
        placeholder="Return-to-vendor note or correction request..."
        rows={3}
        className="input mt-3"
      />

      <input
        value={paymentReference}
        onChange={(event) => onPaymentReferenceChange(event.target.value)}
        placeholder="Payment reference / check number / confirmation..."
        className="input mt-3"
      />

      <div className="mt-5 grid gap-3">
        <button
          onClick={() => onUpdateAction(invoice, "manager_approval")}
          disabled={savingId === invoice.id}
          className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-left text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50"
        >
          {savingId === invoice.id ? "Saving..." : "Manager Approval"}
        </button>

        <button
          onClick={() =>
            onSendToBoard(
              invoice,
              managerNote,
              legalFileComplete,
              missingRequiredDocuments
            )
          }
          disabled={sendingToBoardId === invoice.id}
          className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-left text-sm font-semibold text-blue-200 hover:bg-blue-500/20 disabled:opacity-50"
        >
          {sendingToBoardId === invoice.id
            ? "Sending To Board..."
            : "Send Invoice To Board"}
        </button>

        <button
          onClick={() => onUpdateAction(invoice, "return_to_vendor")}
          disabled={savingId === invoice.id}
          className="rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-3 text-left text-sm font-semibold text-sky-200 hover:bg-sky-500/20 disabled:opacity-50"
        >
          {savingId === invoice.id ? "Saving..." : "Return To Vendor"}
        </button>

        <button
          onClick={() => onUpdateAction(invoice, "pay_now")}
          disabled={savingId === invoice.id}
          className="rounded-xl border border-yellow-400/40 bg-yellow-400 px-4 py-3 text-left text-sm font-bold text-slate-950 hover:bg-yellow-300 disabled:opacity-50"
        >
          {savingId === invoice.id ? "Saving..." : "Pay Now"}
        </button>

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

function StatusBadge({ label }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-slate-300">
      {label}
    </span>
  );
}

function ApprovalLine({ label, value, complete }) {
  return (
    <div
      className={`mt-3 rounded-xl border px-4 py-3 text-sm ${
        complete
          ? "border-emerald-400/30 bg-emerald-500/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="text-slate-400">{label}</div>
      <div
        className={`mt-1 font-semibold ${
          complete ? "text-emerald-200" : "text-slate-200"
        }`}
      >
        {value}
      </div>
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

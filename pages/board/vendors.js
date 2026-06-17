import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID =
  "79893883-6141-4dcc-ba1a-034d70a0dc96";

const requiredDocumentTypes = [
  "W9",
  "Certificate of Insurance",
  "Business License",
  "Executed Contract",
  "Vendor Proposal",
];

const optionalDocumentTypes = [
  "Invoice",
  "Photos",
  "Additional Documentation",
];

const documentTypes = [...requiredDocumentTypes, ...optionalDocumentTypes];

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [vendorDocuments, setVendorDocuments] = useState([]);
  const [boardResponses, setBoardResponses] = useState([]);
  const [documentForms, setDocumentForms] = useState({});
  const [uploadingDocumentId, setUploadingDocumentId] = useState("");
  const [sendingVendorId, setSendingVendorId] = useState("");
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    await Promise.all([
      loadVendors(),
      loadVendorDocuments(),
      loadBoardResponses(),
    ]);
  }

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

  async function loadVendorDocuments() {
    try {
      setLoadingDocuments(true);

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
      setSystemMessage(error.message || "Unable to load vendor documents.");
    } finally {
      setLoadingDocuments(false);
    }
  }

  async function loadBoardResponses() {
    try {
      const response = await fetch(
        `/api/admin/operational-records?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load board responses.");
      }

      const records = payload.records || payload.openRecords || [];

      const vendorBoardItems = records.filter((record) => {
        return (
          record.source_module === "association_approved_vendors" ||
          record.request_type === "vendor_authorization" ||
          String(record.title || "")
            .toLowerCase()
            .includes("vendor authorization review")
        );
      });

      setBoardResponses(vendorBoardItems);
    } catch (error) {
      console.error("Unable to load vendor board responses:", error);
      setBoardResponses([]);
    }
  }

  async function uploadVendorDocument(vendor) {
    const vendorId = getVendorId(vendor);
    const form = documentForms[vendorId] || {};

    if (!vendorId) {
      setSystemMessage("Unable to upload. Vendor id is missing.");
      return;
    }

    if (!form.document_category) {
      setSystemMessage("Choose the required vendor document type.");
      return;
    }

    if (!form.file) {
      setSystemMessage("Choose a vendor document to upload.");
      return;
    }

    try {
      setUploadingDocumentId(vendorId);
      setSystemMessage("");

      const fileBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(form.file);
      });

      const response = await fetch("/api/vendors/upload-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          vendor_id: vendorId,
          document_name: form.document_category,
          document_category: form.document_category,
          description: form.description || "",
          uploaded_by: "Admin",
          file_name: form.file.name,
          file_type: form.file.type,
          file_base64: fileBase64,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to upload vendor document.");
      }

      setDocumentForms((current) => ({
        ...current,
        [vendorId]: {
          document_category: "W9",
          description: "",
          file: null,
        },
      }));

      await loadVendorDocuments();
      setSystemMessage("Vendor document uploaded.");
    } catch (error) {
      console.error("Unable to upload vendor document:", error);
      setSystemMessage(error.message || "Unable to upload vendor document.");
    } finally {
      setUploadingDocumentId("");
    }
  }

  async function deleteVendorDocument(document) {
    if (!document?.id) return;

    const confirmed = window.confirm(
      "Delete this vendor document permanently?"
    );

    if (!confirmed) return;

    try {
      setSystemMessage("");

      const response = await fetch(
        `/api/vendors/delete-document?id=${encodeURIComponent(document.id)}`,
        {
          method: "DELETE",
        }
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to delete vendor document.");
      }

      await loadVendorDocuments();
      setSystemMessage("Vendor document deleted.");
    } catch (error) {
      console.error("Unable to delete vendor document:", error);
      setSystemMessage(error.message || "Unable to delete vendor document.");
    }
  }

  async function sendVendorToBoard(vendor) {
    const vendorId = getVendorId(vendor);

    if (!vendorId) {
      setSystemMessage("Unable to send vendor to board. Vendor id is missing.");
      return;
    }

    const vendorDocs = vendorDocuments.filter(
      (document) => String(document.vendor_id) === String(vendorId)
    );

    const missingDocuments = getMissingRequiredDocuments(vendorDocs);

    if (missingDocuments.length > 0) {
      const confirmed = window.confirm(
        `This vendor is missing required documents:\n\n${missingDocuments.join(
          "\n"
        )}\n\nSend to board anyway?`
      );

      if (!confirmed) return;
    }

    try {
      setSendingVendorId(vendorId);
      setSystemMessage("");

      const response = await fetch("/api/vendors/send-vendor-to-board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          vendor,
          documents: vendorDocs,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to send vendor to board.");
      }

      await loadBoardResponses();
      setSystemMessage("Vendor authorization sent to Board Approval Queue.");
    } catch (error) {
      console.error("Unable to send vendor to board:", error);
      setSystemMessage(error.message || "Unable to send vendor to board.");
    } finally {
      setSendingVendorId("");
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

  const vendorsWithDocuments = vendors.filter((vendor) => {
    const vendorId = getVendorId(vendor);
    return vendorDocuments.some(
      (document) => String(document.vendor_id) === String(vendorId)
    );
  });

  const vendorsWithCompleteLegalFiles = vendors.filter((vendor) => {
    const vendorId = getVendorId(vendor);
    const documents = vendorDocuments.filter(
      (document) => String(document.vendor_id) === String(vendorId)
    );

    return getMissingRequiredDocuments(documents).length === 0;
  });

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
            document the W9, insurance, license, contract, proposal, board
            authorization, and signature approval pathway required for future
            invoice and payment processing.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={loadAll}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Refresh Vendors
            </button>

                <Link
  href="/portal/manager/vendor-invoices"
  className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/20"
>
  Vendor Invoice Processing
</Link>

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
          <Metric label="Documented Vendors" value={vendorsWithDocuments.length} />
          <Metric
            label="Complete Legal Files"
            value={vendorsWithCompleteLegalFiles.length}
          />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
              Live QuickBooks Vendor Feed
            </p>

            <h3 className="mt-3 text-2xl font-semibold">
              Approved Vendor Registry
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Vendors below are sourced from the association vendor feed.
              Required legal documents are tracked by exact document type so
              the compliance status remains accurate.
            </p>
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
            {loadingVendors || loadingDocuments ? (
              <Empty message="Loading association vendors and documents..." />
            ) : filteredVendors.length === 0 ? (
              <Empty message="No vendor records match the current search." />
            ) : (
              filteredVendors.map((vendor, index) => {
                const vendorId = getVendorId(vendor);

                return (
                  <VendorCard
                    key={vendorId || vendor.quickbooks_vendor_id || index}
                    vendor={vendor}
                    documents={vendorDocuments.filter(
                      (document) =>
                        String(document.vendor_id) === String(vendorId)
                    )}
                    boardResponse={findBoardResponseForVendor(
                      vendor,
                      boardResponses
                    )}
                    documentForm={
                      documentForms[vendorId] || {
                        document_category: "W9",
                        description: "",
                        file: null,
                      }
                    }
                    uploadingDocumentId={uploadingDocumentId}
                    sendingVendorId={sendingVendorId}
                    onDocumentFormChange={(updates) =>
                      setDocumentForms((current) => ({
                        ...current,
                        [vendorId]: {
                          document_category:
                            current[vendorId]?.document_category || "W9",
                          description: current[vendorId]?.description || "",
                          file: current[vendorId]?.file || null,
                          ...updates,
                        },
                      }))
                    }
                    onUploadDocument={() => uploadVendorDocument(vendor)}
                    onDeleteDocument={deleteVendorDocument}
                    onSendToBoard={() => sendVendorToBoard(vendor)}
                  />
                );
              })
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

function VendorCard({
  vendor,
  documents,
  boardResponse,
  documentForm,
  uploadingDocumentId,
  sendingVendorId,
  onDocumentFormChange,
  onUploadDocument,
  onDeleteDocument,
  onSendToBoard,
}) {
  const vendorId = getVendorId(vendor);

  const vendorName =
    vendor.vendor_name ||
    vendor.vendor_display_name ||
    vendor.company_name ||
    "Vendor";

  const vendorEmail = vendor.email || vendor.primary_email || "";
  const vendorPhone = vendor.phone || vendor.primary_phone || "";

  const missingRequiredDocuments = getMissingRequiredDocuments(documents);
  const uploadedRequiredCount =
    requiredDocumentTypes.length - missingRequiredDocuments.length;
  const legalFileComplete = missingRequiredDocuments.length === 0;

  return (
    <article
      className={`rounded-3xl border p-6 shadow-xl ${
        legalFileComplete
          ? "border-emerald-400/30 bg-slate-900"
          : "border-white/10 bg-slate-900"
      }`}
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                {vendor.vendor_type || "Vendor"} · QuickBooks ID{" "}
                {vendor.quickbooks_vendor_id || vendor.id || "N/A"}
              </p>

              <h4 className="mt-2 text-2xl font-semibold">{vendorName}</h4>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Association vendor record synchronized from the accounting
                vendor source. Compliance documentation and governance approvals
                determine association-approved status.
              </p>
            </div>

            <div
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                legalFileComplete
                  ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
                  : "border-amber-300/30 bg-amber-300/10 text-amber-200"
              }`}
            >
              {legalFileComplete ? "Legal File Complete" : "Documents Pending"}
            </div>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <Info label="Email" value={vendorEmail || "Not Provided"} />
            <Info label="Phone" value={vendorPhone || "Not Provided"} />
            <Info label="Address" value={vendor.address || "Not Provided"} />
            <Info label="Sync Status" value={vendor.sync_status || "vendor_synced"} />
          </div>

          <div
            className={`mt-6 rounded-2xl border p-5 ${
              legalFileComplete
                ? "border-emerald-400/20 bg-emerald-400/10"
                : "border-amber-400/20 bg-amber-400/10"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.25em] ${
                legalFileComplete ? "text-emerald-300" : "text-amber-300"
              }`}
            >
              Required Legal File
            </p>

            <h5 className="mt-3 text-xl font-semibold">
              {legalFileComplete
                ? "Vendor Legal File Complete"
                : `${uploadedRequiredCount} / ${requiredDocumentTypes.length} Required Documents Uploaded`}
            </h5>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {requiredDocumentTypes.map((type) => (
                <DocumentChecklistItem
                  key={type}
                  label={type}
                  uploaded={hasDocumentCategory(documents, type)}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
              Approval Status
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <StatusPill
                label="Legal File"
                value={legalFileComplete ? "Complete" : "Pending Documents"}
                complete={legalFileComplete}
              />
              <StatusPill
                label="Board Authorization"
                value={boardResponse ? titleCase(boardResponse.status || "Submitted") : "Not Sent"}
                complete={!!boardResponse}
              />
              <StatusPill
                label="Signature Certification"
                value="Not Certified"
                complete={false}
              />
              <StatusPill
                label="Payment Readiness"
                value="Not Authorized"
                complete={false}
              />
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
              Upload documents using the exact required document type. The legal
              checklist turns green only when every required document type is
              present for this vendor.
            </p>

            <div className="mt-4 space-y-3">
              {documents.length === 0 ? (
                <p className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-500">
                  No vendor documents uploaded yet.
                </p>
              ) : (
                documents.map((document) => (
                  <div
                    key={document.id}
                    className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4"
                  >
                    <a
                      href={document.file_url}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm font-semibold text-blue-100 hover:underline"
                    >
                      {documentButtonLabel(document)}
                    </a>

                    <p className="mt-2 text-xs text-slate-400">
                      {document.document_category || "Vendor Document"}
                      {document.description ? ` · ${document.description}` : ""}
                    </p>

                    <button
                      onClick={() => onDeleteDocument(document)}
                      className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20"
                    >
                      Delete Document
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 grid gap-3">
              <select
                value={documentForm.document_category}
                onChange={(event) =>
                  onDocumentFormChange({
                    document_category: event.target.value,
                  })
                }
                className="input"
              >
                <optgroup label="Required Vendor Documents">
                  {requiredDocumentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </optgroup>

                <optgroup label="Optional Vendor Documents">
                  {optionalDocumentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </optgroup>
              </select>

              <input
                type="file"
                onChange={(event) =>
                  onDocumentFormChange({
                    file: event.target.files?.[0] || null,
                  })
                }
                className="input"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.xlsx,.xls,.csv,.doc,.docx,.ppt,.pptx"
              />

              <textarea
                value={documentForm.description}
                onChange={(event) =>
                  onDocumentFormChange({ description: event.target.value })
                }
                placeholder="Document notes..."
                rows={3}
                className="input"
              />

              <button
                onClick={onUploadDocument}
                disabled={uploadingDocumentId === vendorId}
                className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-200 hover:bg-blue-500/20 disabled:opacity-50"
              >
                {uploadingDocumentId === vendorId
                  ? "Uploading..."
                  : "Upload Vendor Document"}
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <h4 className="text-lg font-semibold text-emerald-200">
              Governance + Payment Readiness
            </h4>

            <div className="mt-4 grid gap-3">
              <GovernanceLine
                label="Legal File"
                value={legalFileComplete ? "Complete" : "Incomplete"}
                complete={legalFileComplete}
              />
              <GovernanceLine
                label="Board Review"
                value={boardResponse ? titleCase(boardResponse.status || "Submitted") : "Not Sent"}
                complete={!!boardResponse}
              />
              <GovernanceLine label="Signature Approval" value="Not Created" />
              <GovernanceLine label="Certification" value="Not Signed" />
              <GovernanceLine label="Invoice Processing" value="Locked" />
            </div>

            {boardResponse && (
              <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                  Board Response Received
                </p>

                <p className="mt-3 text-sm text-slate-300">
                  <span className="text-slate-500">Status:</span>{" "}
                  {titleCase(boardResponse.status || "board review")}
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  <span className="text-slate-500">Last Action:</span>{" "}
                  {titleCase(boardResponse.board_last_action || "Pending")}
                </p>

                {boardResponse.board_last_message && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
                      {boardResponse.board_last_message}
                    </p>
                  </div>
                )}

                <p className="mt-3 text-xs text-slate-500">
                  Updated:{" "}
                  {boardResponse.board_updated_at
                    ? new Date(boardResponse.board_updated_at).toLocaleString()
                    : "Not yet updated"}
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={onSendToBoard}
                disabled={sendingVendorId === vendorId}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50"
              >
                {sendingVendorId === vendorId
                  ? "Sending Vendor..."
                  : "Send Vendor To Board"}
              </button>

              <Link
                href="/board/signature-approval-new"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                Create Signature Approval
              </Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

function getVendorId(vendor) {
  return vendor?.id || "";
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

function findBoardResponseForVendor(vendor, boardResponses) {
  const vendorName = String(
    vendor.vendor_name ||
      vendor.vendor_display_name ||
      vendor.company_name ||
      ""
  ).toLowerCase();

  const expectedTitle = `${vendorName} vendor authorization review`;

  return (
    boardResponses.find((record) => {
      const title = String(record.title || "").toLowerCase();
      const description = String(record.description || "").toLowerCase();

      return (
        title === expectedTitle ||
        description.includes(`vendor: ${vendorName}`)
      );
    }) || null
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
      <span className="text-slate-500">{label}:</span> {value || "—"}
    </p>
  );
}

function DocumentChecklistItem({ label, uploaded }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        uploaded
          ? "border-emerald-400/30 bg-emerald-500/10"
          : "border-red-400/30 bg-red-500/10"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          uploaded ? "text-emerald-200" : "text-red-200"
        }`}
      >
        {uploaded ? "Uploaded" : "Missing"}
      </p>

      <p className="mt-1 text-xs text-slate-300">{label}</p>
    </div>
  );
}

function StatusPill({ label, value, complete }) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        complete
          ? "border-emerald-400/30 bg-emerald-500/10"
          : "border-white/10 bg-slate-950/60"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p
        className={`mt-1 text-sm font-semibold ${
          complete ? "text-emerald-200" : "text-amber-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function GovernanceLine({ label, value, complete }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${
        complete
          ? "border-emerald-400/30 bg-emerald-500/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <span className="text-slate-400">{label}</span>
      <span
        className={`font-semibold ${
          complete ? "text-emerald-200" : "text-slate-200"
        }`}
      >
        {value}
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

function documentButtonLabel(document) {
  const type = String(document.file_type || "").toLowerCase();
  const name = document.document_name || document.file_name || "Vendor Document";

  if (type.includes("pdf")) return `Open PDF: ${name}`;
  if (type.startsWith("image/")) return `View Image: ${name}`;
  if (type.includes("spreadsheet") || /\.(xlsx|xls|csv)$/i.test(name)) {
    return `Open Spreadsheet: ${name}`;
  }
  if (type.includes("word") || /\.(doc|docx)$/i.test(name)) {
    return `Open Document: ${name}`;
  }
  if (type.includes("presentation") || /\.(ppt|pptx)$/i.test(name)) {
    return `Open Presentation: ${name}`;
  }

  return `Open File: ${name}`;
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function getAssociationId() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("spm_selected_association_id") || "";
}

export default function Documents() {
  const associationId = getAssociationId();

  const [documents, setDocuments] = useState([]);
  const [operationalRecords, setOperationalRecords] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadDocuments();
    loadDocumentRecords();

    const interval = setInterval(() => {
      loadDocumentRecords();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function loadDocuments() {
    try {
      setLoadingDocuments(true);
      setSystemMessage("");

      const params = new URLSearchParams({
        associationId,
        limit: "100",
      });

      const response = await fetch(`/api/homeowner/documents/list?${params}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load association documents.");
      }

      setDocuments(data.documents || []);
    } catch (error) {
      console.error("Unable to load board documents:", error);
      setDocuments([]);
      setSystemMessage(error.message || "Unable to load association documents.");
    } finally {
      setLoadingDocuments(false);
    }
  }

  async function loadDocumentRecords() {
    try {
      setLoadingRecords(true);

      const response = await fetch(
        `/api/admin/operational-records?association_id=${associationId}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load document records.");
      }

      const records = (payload.openRecords || []).filter((record) => {
        const combined = `${record.request_type || ""} ${record.title || ""} ${
          record.description || ""
        }`.toLowerCase();

        return (
          combined.includes("document") ||
          combined.includes("policy") ||
          combined.includes("record") ||
          combined.includes("contract") ||
          combined.includes("insurance") ||
          combined.includes("governing") ||
          combined.includes("minutes") ||
          combined.includes("packet")
        );
      });

      setOperationalRecords(records);
    } catch (error) {
      console.error("Unable to load document operational records:", error);
    } finally {
      setLoadingRecords(false);
    }
  }

  async function openDocument(documentId) {
    try {
      const response = await fetch(
        `/api/homeowner/documents/signed-url?documentId=${documentId}`
      );

      const result = await response.json();

      if (!response.ok || !result?.success || !result?.signedUrl) {
        throw new Error(result?.error || "Unable to open document.");
      }

      window.open(result.signedUrl, "_blank");
    } catch (error) {
      console.error("Open board document failed:", error);
      alert(error.message || "Unable to open document.");
    }
  }

  const categories = useMemo(() => {
    const values = documents.map((doc) => getDocumentCategory(doc)).filter(Boolean);
    return ["all", ...Array.from(new Set(values))];
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    const searchValue = String(searchTerm || "").toLowerCase().trim();

    return documents.filter((doc) => {
      const matchesCategory =
        selectedCategory === "all" || getDocumentCategory(doc) === selectedCategory;

      const matchesSearch =
        !searchValue ||
        [doc.title, doc.description, doc.document_type, doc.category, doc.status]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [documents, selectedCategory, searchTerm]);

  const governingDocs = documents.filter((doc) =>
    ["governing", "declaration", "covenants", "bylaws", "rules", "regulations"].some(
      (term) =>
        `${getDocumentCategory(doc)} ${getDocumentTitle(doc)}`.toLowerCase().includes(term)
    )
  );

  const financialDocs = documents.filter((doc) =>
    ["financial", "budget", "reserve", "audit", "insurance"].some((term) =>
      `${getDocumentCategory(doc)} ${getDocumentTitle(doc)}`.toLowerCase().includes(term)
    )
  );

  const policyRecords = operationalRecords.filter((record) =>
    `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
      .toLowerCase()
      .includes("policy")
  );

  const contractRecords = operationalRecords.filter((record) =>
    `${record.request_type || ""} ${record.title || ""} ${record.description || ""}`
      .toLowerCase()
      .includes("contract")
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">Board Documents</h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
              Association document access and operational document review records for board governance.
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
            Association Records Library
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Board document access now combines permanent association files with live operational record tracking.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Governing documents, financial records, meeting records, contracts, insurance files,
            and document-related operational work can now be reviewed from one board document center.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/admin/operations/new?request_type=${encodeURIComponent(
                "Policy Review"
              )}&return_path=${encodeURIComponent(
                "/board/documents"
              )}&return_label=${encodeURIComponent("Board Documents")}`}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Create Document Record
            </Link>

            <Link
              href="/board/policy-library"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Policy Library
            </Link>

            <Link
              href="/board/meeting-packet"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Meeting Packet
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Total Documents" value={documents.length} />
          <Metric label="Governing Records" value={governingDocs.length} />
          <Metric label="Financial Records" value={financialDocs.length} />
          <Metric label="Operational Records" value={operationalRecords.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <OperationalPanel title="Policy Review Records" items={policyRecords} />
          <OperationalPanel title="Contract / File Records" items={contractRecords} />
          <OperationalPanel title="All Document Operations" items={operationalRecords} />
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-amber-300">
                Permanent Association Records
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Association Document Library
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Board-accessible documents retrieved from the association document library.
              </p>
            </div>

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-2xl border border-amber-400/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-300 outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Documents" : titleCase(category)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/70 p-4">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-amber-400"
              placeholder="Search documents, policies, financial records, forms, or meeting records..."
            />
          </div>

          <div className="mt-6 space-y-4">
            {loadingDocuments ? (
              <Empty message="Loading association documents..." />
            ) : filteredDocuments.length === 0 ? (
              <Empty message="No association documents are currently available in this category." />
            ) : (
              filteredDocuments.map((doc, index) => (
                <DocumentCard key={doc.id || index} document={doc} onOpen={openDocument} />
              ))
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Document Operations Connected
          </h3>

          <p className="mt-3 text-slate-300">
            This page now preserves the permanent association document library while also rendering
            document-related operational records from the centralized Admin Operations Intake system.
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
                {item.title || "Untitled Record"}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {item.description || "No description provided."}
              </p>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span>{item.request_type || "Operational Record"}</span>
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

function DocumentCard({ document, onOpen }) {
  const title = getDocumentTitle(document);
  const category = getDocumentCategory(document);
  const description =
    document.description ||
    document.summary ||
    document.notes ||
    "Association document available for board review.";

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
            {titleCase(category)}
          </p>

          <h4 className="mt-2 text-xl font-semibold">{title}</h4>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            {description}
          </p>

          <div className="mt-4 grid gap-2 text-xs text-slate-500 md:grid-cols-3">
            <p>Type: {titleCase(document.document_type || document.type || category)}</p>
            <p>Status: {titleCase(document.status || "available")}</p>
            <p>Posted: {formatDocumentDate(document)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onOpen(document.id)}
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Open Document
          </button>

          <button
            onClick={() => onOpen(document.id)}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-300 hover:border-amber-400/30 hover:text-amber-300"
          >
            Download
          </button>
        </div>
      </div>
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-semibold text-amber-300">{value}</p>
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

function formatDocumentDate(document) {
  const value = document.posted_at || document.created_at || document.updated_at;

  if (!value) return "N/A";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString();
}

function getDocumentTitle(document) {
  return (
    document.title ||
    document.name ||
    document.document_name ||
    document.file_name ||
    document.filename ||
    "Association Document"
  );
}

function getDocumentCategory(document) {
  return String(
    document.category ||
      document.document_category ||
      document.folder ||
      document.document_type ||
      document.type ||
      "general"
  ).toLowerCase();
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}


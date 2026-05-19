import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    try {
      setLoadingDocuments(true);
      setSystemMessage("");

      const params = new URLSearchParams({
        associationId: DEFAULT_ASSOCIATION_ID,
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
    const values = documents
      .map((doc) => getDocumentCategory(doc))
      .filter(Boolean);

    return ["all", ...Array.from(new Set(values))];
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    const searchValue = String(searchTerm || "").toLowerCase().trim();

    return documents.filter((doc) => {
      const matchesCategory =
        selectedCategory === "all" ||
        getDocumentCategory(doc) === selectedCategory;

      const matchesSearch =
        !searchValue ||
        [
          doc.title,
          doc.description,
          doc.document_type,
          doc.category,
          doc.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [documents, selectedCategory, searchTerm]);

  const governingDocs = documents.filter((doc) =>
    ["governing", "declaration", "covenants", "bylaws", "rules", "regulations"].some(
      (term) =>
        `${getDocumentCategory(doc)} ${getDocumentTitle(doc)}`
          .toLowerCase()
          .includes(term)
    )
  );

  const financialDocs = documents.filter((doc) =>
    ["financial", "budget", "reserve", "audit", "insurance"].some((term) =>
      `${getDocumentCategory(doc)} ${getDocumentTitle(doc)}`
        .toLowerCase()
        .includes(term)
    )
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Association Document Library
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Board Documents
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
            Required Association Records
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Access governing documents, financial records, meeting records, and association files.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Board members can access the association records stored for their
            community. As new associations are onboarded, their uploaded
            documents will appear here automatically.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Total Documents" value={documents.length} />
          <Metric label="Governing Records" value={governingDocs.length} />
          <Metric label="Financial Records" value={financialDocs.length} />
          <Metric label="Categories" value={Math.max(categories.length - 1, 0)} />
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
                <DocumentCard
                  key={doc.id || index}
                  document={doc}
                  onOpen={openDocument}
                />
              ))
            )}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Association Records Access
          </h3>

          <p className="mt-3 text-slate-300">
            This page is reserved for permanent association documents only:
            governing records, financial records, meeting records, contracts,
            insurance files, policies, notices, and other board-accessible
            association materials.
          </p>
        </div>
      </section>
    </main>
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

          <h4 className="mt-2 text-xl font-semibold">
            {title}
          </h4>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            {description}
          </p>

          <div className="mt-4 grid gap-2 text-xs text-slate-500 md:grid-cols-3">
            <p>
              Type:{" "}
              {titleCase(document.document_type || document.type || category)}
            </p>

            <p>Status: {titleCase(document.status || "available")}</p>

            <p>
              Posted:{" "}
              {document.posted_at
                ? new Date(document.posted_at).toLocaleDateString()
                : document.created_at
                ? new Date(document.created_at).toLocaleDateString()
                : "N/A"}
            </p>
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

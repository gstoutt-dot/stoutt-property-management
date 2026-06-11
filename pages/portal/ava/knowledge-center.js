import { useState } from "react";
import Link from "next/link";

const SUNSET_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const SUNSET_ASSOCIATION_NAME = "Sunset Condominium Association";

export default function AvaKnowledgeCenter() {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentCategory, setDocumentCategory] = useState("Rules & Regulations");
  const [chunkText, setChunkText] = useState("");
  const [sourcePage, setSourcePage] = useState("");
  const [testQuestion, setTestQuestion] = useState("");
  const [testAnswer, setTestAnswer] = useState("");
  const [testSources, setTestSources] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  async function saveKnowledge() {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/ava/create-knowledge-chunk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          associationId: SUNSET_ASSOCIATION_ID,
          associationName: SUNSET_ASSOCIATION_NAME,
          documentTitle,
          documentCategory,
          chunkText,
          sourcePage,
          uploadedBy: "Admin",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "Unable to save Ava knowledge.");
      }

      setMessage("Ava knowledge saved successfully.");
      setDocumentTitle("");
      setChunkText("");
      setSourcePage("");
    } catch (saveError) {
      setError(saveError.message || "Unable to save Ava knowledge.");
    }

    setSaving(false);
  }

  async function testKnowledge() {
  setTesting(true);
  setTestAnswer("");
  setTestSources([]);
  setError("");

  try {
    const response = await fetch("/api/ava/knowledge-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        associationId: SUNSET_ASSOCIATION_ID,
        question: testQuestion,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data?.success) {
      throw new Error(data?.error || "Unable to search Ava knowledge.");
    }

    setTestAnswer(data.answer || "No answer returned.");
    setTestSources(data.sources || []);
  } catch (testError) {
    setError(testError.message || "Unable to test Ava knowledge.");
  }

  setTesting(false);
}

async function uploadKnowledgeDocument() {
  if (!uploadedFile) {
    setError("Please select a DOCX file.");
    return;
  }

  setUploading(true);
  setError("");
  setMessage("");

  try {
    const formData = new FormData();

    formData.append("file", uploadedFile);
    formData.append("associationId", SUNSET_ASSOCIATION_ID);
    formData.append("associationName", SUNSET_ASSOCIATION_NAME);
    formData.append("documentTitle", documentTitle);
    formData.append("documentCategory", documentCategory);
    formData.append("sourcePage", sourcePage);
    formData.append("uploadedBy", "Admin");

    const response = await fetch(
      "/api/ava/upload-knowledge-document",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data?.success) {
      throw new Error(
        data?.error || "Unable to upload knowledge document."
      );
    }

    setMessage(
      `Document processed successfully. ${data.chunk_count} knowledge chunks created.`
    );

    setUploadedFile(null);
  } catch (uploadError) {
    setError(
      uploadError.message || "Unable to upload knowledge document."
    );
  }

  setUploading(false);
}

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Ava Knowledge Center
            </h1>
            <p className="mt-4 max-w-3xl text-slate-300">
              Add association-specific knowledge for Ava using the association ID.
              This is the Organizational Brain for each onboarded association.
            </p>
          </div>

          <Link
            href="/portal"
            className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
          >
            Back to Admin Dashboard
          </Link>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold">Add Knowledge</h2>

            <div className="mt-6 grid gap-5">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Association
                </label>
                <input
                  value={SUNSET_ASSOCIATION_NAME}
                  disabled
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-slate-300"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Document Title
                </label>
                <input
                  value={documentTitle}
                  onChange={(event) => setDocumentTitle(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/50"
                  placeholder="Example: Sunset Rules and Regulations"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Document Category
                </label>
                <select
                  value={documentCategory}
                  onChange={(event) => setDocumentCategory(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/50"
                >
                  <option>Association Overview</option>
                  <option>Declaration</option>
                  <option>Rules & Regulations</option>
                  <option>Maintenance Matrix</option>
                  <option>FAQ</option>
                  <option>Company Information</option>
                  <option>Resident Accounts</option>
                  <option>Board Policies</option>
                  <option>Committee Policies</option>
                  <option>General</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Source / Section
                </label>
                <input
                  value={sourcePage}
                  onChange={(event) => setSourcePage(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-yellow-400/50"
                  placeholder="Example: Section 9.4, Page 12, FAQ Item 3"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Knowledge Content
                </label>
                <textarea
                  rows="10"
                  value={chunkText}
                  onChange={(event) => setChunkText(event.target.value)}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-yellow-400/50"
                  placeholder="Paste the association-specific rule, FAQ, maintenance responsibility, policy, or governing document excerpt here."
                />
              </div>

              {message ? (
                <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                  {message}
                </div>
              ) : null}

              {error ? (
                <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              ) : null}

              <button
                type="button"
                onClick={saveKnowledge}
                disabled={saving || !documentTitle || !chunkText}
                className="rounded-xl bg-yellow-400 px-6 py-4 text-sm font-semibold text-slate-950 hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save to Ava Knowledge Base"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold">Test Ava Knowledge</h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Ask a question exactly as a homeowner or board member would ask it.
              Ava will search only this association&apos;s knowledge base.
            </p>

            <div className="mt-6 grid gap-5">
              <textarea
                rows="4"
                value={testQuestion}
                onChange={(event) => setTestQuestion(event.target.value)}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none focus:border-yellow-400/50"
                placeholder="Example: Can I have a pet?"
              />

              <button
                type="button"
                onClick={testKnowledge}
                disabled={testing || !testQuestion}
                className="rounded-xl border border-yellow-400/30 px-6 py-4 text-sm font-semibold text-yellow-300 hover:bg-yellow-400/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {testing ? "Searching..." : "Ask Ava"}
              </button>

              {testAnswer ? (
                <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-5">
                  <p className="text-sm font-semibold text-yellow-300">
                    Ava Answer
                  </p>
                  <p className="mt-3 text-sm leading-7 text-yellow-50">
                    {testAnswer}
                  </p>
                </div>
              ) : null}

              {testSources?.length > 0 ? (
                <div className="rounded-3xl border border-white/10 bg-slate-900 p-5">
                  <p className="text-sm font-semibold text-slate-200">
                    Sources
                  </p>

                  <div className="mt-3 space-y-3">
                    {testSources.map((source, index) => (
                      <div
                        key={`${source.document_title}-${index}`}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300"
                      >
                        <div className="font-semibold text-white">
                          {source.document_title}
                        </div>
                        <div className="mt-1 text-xs text-slate-400">
                          {source.document_category}
                          {source.source_page ? ` • ${source.source_page}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

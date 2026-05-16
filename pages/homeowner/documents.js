import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function HomeownerDocuments() {
  const router = useRouter();
    const [ownerProfile, setOwnerProfile] = useState(null);
  const [documents, setDocuments] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [loadingDocuments, setLoadingDocuments] = useState(true);

useEffect(() => {
  async function loadOwnerProfile() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user?.email) {
        router.replace("/portal/owner/login");
        return;
      }

      const normalizedEmail = String(session.user.email)
        .toLowerCase()
        .trim();

      const profileResponse = await fetch(
        `/api/owner/profile?ownerEmail=${encodeURIComponent(
          normalizedEmail
        )}&authUserId=${encodeURIComponent(session.user.id || "")}`
      );

      const profileResult = await profileResponse.json();

      if (!profileResponse.ok || !profileResult?.success) {
        router.replace("/portal/owner/login");
        return;
      }

      setOwnerProfile(profileResult.ownerProfile);
    } catch (error) {
      console.error("Unable to load homeowner profile for documents:", error);
      router.replace("/portal/owner/login");
    }
  }

  loadOwnerProfile();
}, [router]);

useEffect(() => {
  async function loadDocuments() {
    if (!ownerProfile?.association_id) return;

    try {
      setLoadingDocuments(true);

      const params = new URLSearchParams({
        associationId: ownerProfile.association_id,
        limit: "50",
      });

      const response = await fetch(`/api/homeowner/documents/list?${params}`);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to load documents.");
      }

      setDocuments(data.documents || []);
    } catch (error) {
      console.error("Unable to load homeowner documents:", error);
      setDocuments([]);
    } finally {
      setLoadingDocuments(false);
    }
  }

  loadDocuments();
}, [ownerProfile?.association_id]);

    const filteredDocuments = documents.filter((doc) => {
    const searchValue = String(searchTerm || "").toLowerCase().trim();

    if (!searchValue) return true;

    return [
      doc.title,
      doc.description,
      doc.document_type,
      doc.category,
      doc.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,179,8,0.18),transparent_35%),radial-gradient(circle_at_top_left,rgba(15,23,42,1),transparent_40%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
                Homeowner Portal
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
                Documents Center
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Access governing documents, meeting records, financial files,
                forms, applications, and association notices.
              </p>
            </div>

            <Link
              href="/homeowner"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-slate-200 hover:border-yellow-400/60 hover:text-yellow-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
  <div className="grid gap-6 md:grid-cols-4">
    {[
      [
        "Governing Docs",
        String(
          documents.filter((doc) =>
            String(doc.document_type || doc.category || "")
              .toLowerCase()
              .includes("governing")
          ).length
        ),
      ],
      [
        "Meeting Records",
        String(
          documents.filter((doc) =>
            String(doc.document_type || doc.category || "")
              .toLowerCase()
              .includes("meeting")
          ).length
        ),
      ],
      [
        "Financial Files",
        String(
          documents.filter((doc) =>
            String(doc.document_type || doc.category || "")
              .toLowerCase()
              .includes("financial")
          ).length
        ),
      ],
      [
        "Forms",
        String(
          documents.filter((doc) =>
            String(doc.document_type || doc.category || "")
              .toLowerCase()
              .includes("form")
          ).length
        ),
      ],
    ].map(([label, value]) => (
      <div
        key={label}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <p className="text-sm text-slate-400">{label}</p>
        <div className="mt-3 text-4xl font-bold text-yellow-400">
          {value}
        </div>
      </div>
    ))}
  </div>
</section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-5">
            <p className="text-sm font-medium text-yellow-400">
              Association Library
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Available Documents</h2>
          </div>

          <div className="mb-5 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                        <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400"
              placeholder="Search documents, forms, policies, or meeting records..."
            />
          </div>

          <div className="space-y-5">
  {loadingDocuments ? (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-300">
      Loading homeowner documents...
    </div>
    ) : filteredDocuments.length > 0 ? (
    filteredDocuments.map((doc) => (
      <div
        key={doc.id}
        className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">
              {doc.document_type || "Association Document"}
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              {doc.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              {doc.posted_at
                ? new Date(doc.posted_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Recently Posted"}
            </p>
          </div>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {doc.status || "Available"}
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm text-slate-300">
          {doc.description ||
            "Association document available for homeowner review."}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-yellow-300">
            View Document
          </button>

          <button className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300">
            Download
          </button>

          <Link
            href="/homeowner/ava"
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-yellow-400/50 hover:text-yellow-300"
          >
            Ask Ava
          </Link>
        </div>
      </div>
    ))
  ) : (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-300">
            No documents match your current search.
    </div>
  )}
</div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Document Categories
            </p>

            <div className="mt-5 space-y-3">
              {[
                "Declaration & Bylaws",
                "Rules & Regulations",
                "Meeting Minutes",
                "Budgets & Financials",
                "Insurance Documents",
                "Forms & Applications",
                "Notices & Announcements",
              ].map((category) => (
                <button
                  key={category}
                  className="block w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm text-slate-200 hover:border-yellow-400/40 hover:text-yellow-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm font-medium text-yellow-300">
              Ask Ava About Documents
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Need help understanding a rule?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              Ava can help explain governing document language, locate relevant
              sections, summarize policies, and guide homeowners to the right
              form or process.
            </p>

            <button className="mt-5 rounded-2xl border border-yellow-400/40 px-5 py-3 text-sm font-semibold text-yellow-300 hover:bg-yellow-400 hover:text-slate-950">
              Ask Ava
            </button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm font-medium text-yellow-400">
              Recent Uploads
            </p>

            <div className="mt-5 space-y-4">
              {[
                "April Board Meeting Minutes",
                "Updated Pool Rules Notice",
                "2026 Insurance Certificate",
                "ARC Paint Color Chart",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-slate-900 p-4 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// File: /portal/owner/documents.js

import Link from "next/link";

const documents = [
  {
    id: "DOC-1001",
    title: "Declaration of Covenants",
    category: "Governing Documents",
    updated: "Jan 12, 2026",
    type: "PDF",
  },
  {
    id: "DOC-1002",
    title: "Bylaws",
    category: "Governing Documents",
    updated: "Jan 12, 2026",
    type: "PDF",
  },
  {
    id: "DOC-1003",
    title: "Rules & Regulations",
    category: "Community Standards",
    updated: "Mar 4, 2026",
    type: "PDF",
  },
  {
    id: "DOC-1004",
    title: "Architectural Review Application",
    category: "Forms",
    updated: "Apr 15, 2026",
    type: "Form",
  },
  {
    id: "DOC-1005",
    title: "Pool & Amenity Rules",
    category: "Amenities",
    updated: "Apr 22, 2026",
    type: "PDF",
  },
];

export default function OwnerDocuments() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/portal/owner" className="text-sm text-yellow-400 hover:text-yellow-300">
              ← Back to Owner Portal
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Documents</h1>
            <p className="mt-2 text-white/60">
              Access governing documents, forms, policies, and community notices.
            </p>
          </div>

          <button className="rounded-2xl bg-yellow-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
            Request Document
          </button>
        </div>

        {/* Featured Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-300">Most Used</p>
            <h2 className="mt-3 text-2xl font-bold">Rules & Regulations</h2>
            <p className="mt-2 text-yellow-50/70">Quick reference for common community standards.</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Governing Docs</p>
            <p className="mt-2 text-4xl font-bold">3</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-white/50">Forms Available</p>
            <p className="mt-2 text-4xl font-bold">6</p>
          </div>
        </div>

        {/* Search / Filter Bar */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white/50">
              Search documents...
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white/50">
              Category: All
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white/50">
              Type: All
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">Association Document Library</h2>
              <p className="mt-1 text-sm text-white/50">Documents available to homeowners for this association.</p>
            </div>

            <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
              Download Packet
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 hover:border-yellow-400 transition">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-white/50">{doc.id} • {doc.category}</p>
                    <h3 className="mt-1 text-xl font-semibold">{doc.title}</h3>
                    <p className="mt-2 text-sm text-white/50">Updated: {doc.updated}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                      {doc.type}
                    </span>
                    <button className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-yellow-400 hover:text-white transition">
                      View
                    </button>
                    <button className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

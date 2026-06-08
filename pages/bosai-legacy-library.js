import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function BosaiLegacyLibraryPage() {
  const volumes = [
    {
      volume: "Volume I",
      title: "The BOSai℠ Executive Playbook",
      theme: "Leadership • Stewardship • Service • Executive Playbook",
      text: "A professional framework for community association leadership, board alignment, governance support, operational discipline, and the management philosophy behind BOSai℠.",
      pdf: "/bosai-volume-1.pdf",
    },
    {
      volume: "Volume II",
      title: "The BOSai℠ Community Association Operations Platform",
      theme: "Leadership • Stewardship • Service • Communities",
      text: "A practical operating framework for self-managed communities, board dashboards, homeowner access, association calendars, approval queues, committees, vendors, and resident engagement.",
      pdf: "/bosai-volume-2.pdf",
    },
    {
      volume: "Volume III",
      title: "The BOSai℠ Financial Intelligence Platform",
      theme: "Leadership • Stewardship • Service • Finance",
      text: "A financial stewardship framework focused on assessment intelligence, accounts receivable, accounts payable, vendor oversight, budget intelligence, reserves, and transparency.",
      pdf: "/bosai-volume-3.pdf",
    },
    {
      volume: "Volume IV",
      title: "The BOSai℠ CAM Enterprise Platform",
      theme: "Leadership • Stewardship • Service • CAM Enterprise",
      text: "A professional enterprise framework for community association managers seeking to build scalable, accountable, service-driven management organizations.",
      pdf: "/bosai-volume-4.pdf",
    },
    {
      volume: "Volume V",
      title: "The BOSai℠ Leadership Legacy",
      theme: "Leadership • Stewardship • Service • Legacy",
      text: "A personal leadership and legacy volume preserving the principles of character, stewardship, mentorship, service, faith, hope, and love.",
      pdf: "/bosai-volume-5.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
    <SiteHeader />
      <main>
        <section className="relative overflow-hidden px-5 py-24 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.14),transparent_45%)]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <img
              src="/bosai-seal.png"
              alt="The BOSai Legacy Library Seal"
              className="mx-auto h-44 w-44 object-contain sm:h-56 sm:w-56"
            />

            <div className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-yellow-300">
              The BOSai℠ Legacy Library
            </div>

            <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Five Volumes. One Philosophy. One Standard.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/70">
              A professional leadership, stewardship, service, operations,
              financial intelligence, enterprise management, and legacy library
              created by Glenn Stoutt, founder of Stoutt Property Management and
              creator of the BOSai℠ Method.
            </p>

            <div className="mt-10 overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-4 shadow-[0_20px_90px_rgba(0,0,0,0.45)]">
              <img
                src="/5-vol-library.png"
                alt="The BOSai Legacy Library Five Volume Collection"
                className="w-full rounded-[1.5rem] object-cover"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
                Leadership Before Technology
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                BOSai℠ was built from principles before it became software.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-white/70">
              <p>
                The BOSai℠ Legacy Library documents the philosophy behind the
                BOSai℠ ecosystem: leadership before technology, transparency
                before control, accountability before authority, community
                before systems, and the belief that community management is not
                a job — it is a relationship.
              </p>

              <p>
                These volumes were created to support boards, managers,
                homeowners, accounting professionals, vendors, CAMs, and future
                leaders with a clear framework for responsible community
                stewardship.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
              The Five Volume Collection
            </div>

            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
              The intellectual foundation behind the BOSai℠ ecosystem.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {volumes.map((book) => (
              <div
                key={book.volume}
                className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-7 shadow-[0_0_35px_rgba(234,179,8,0.08)]"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  {book.volume}
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {book.title}
                </h3>

                <div className="mt-3 text-sm font-semibold text-yellow-100/80">
                  {book.theme}
                </div>

                <p className="mt-5 text-base leading-8 text-white/70">
                  {book.text}
                </p>
                  <a
  href={book.pdf}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 inline-flex rounded-full border border-yellow-400/30 px-5 py-2.5 text-sm font-semibold text-yellow-200 transition hover:bg-yellow-400 hover:text-slate-950"
>
  View PDF
</a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-10 rounded-[2rem] border border-yellow-400/20 bg-black/30 p-8 shadow-[0_20px_90px_rgba(0,0,0,0.45)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-12">
            <div>
              <img
  src="/vol-v.png"
  alt="The BOSai Leadership Legacy Volume V Founder's Edition"
  className="max-w-full h-auto rounded-[1.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
/>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
                Featured Volume
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Volume V: The BOSai℠ Leadership Legacy
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/70">
                Volume V preserves the leadership and legacy philosophy behind
                the entire BOSai℠ Library. It reflects on service, stewardship,
                mentorship, character, faith, hope, and love — the principles
                that give purpose to every system built under the BOSai℠ name.
              </p>

              <p className="mt-5 text-lg leading-8 text-white/70">
                More than a leadership book, it is the personal foundation of a
                professional movement.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/proposal"
                  className="rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-3.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  Request a Proposal
                </a>

                <a
                  href="https://glennstoutt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/5"
                >
                  Visit GlennStoutt.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

<StickyMobileCTA />
</div>
  );
}

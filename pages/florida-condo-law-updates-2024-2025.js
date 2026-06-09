import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function FloridaCondoLawUpdates20242025() {
  const sections = [
    {
      title: "Kickbacks Are Now a Criminal Issue",
      text:
        "Florida condominium officers, directors, and managers may not solicit, offer to accept, or accept a kickback. A knowing violation can be prosecuted as a third-degree felony, with civil penalties and removal from office.",
    },
    {
      title: "Board Members Must Treat Vendor Decisions Carefully",
      text:
        "Vendor gifts, favors, personal benefits, undisclosed compensation, or benefits to immediate family members can create serious legal exposure when connected to association business.",
    },
    {
      title: "Official Records and Transparency Matter",
      text:
        "Boards must maintain accurate records, respond properly to owner access rights, and avoid any conduct that could be viewed as concealing records or obstructing accountability.",
    },
    {
      title: "Milestone Inspections and SIRS Remain Major Obligations",
      text:
        "Florida condominium boards must understand structural inspection duties, reserve study requirements, repair obligations, funding decisions, and disclosure responsibilities.",
    },
    {
      title: "Poor Decisions Can Have Real Consequences",
      text:
        "The modern condominium board environment now includes financial, statutory, civil, and in some cases criminal consequences for misconduct or neglect of required duties.",
    },
  ];

    return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <a
            href="/"
            className="inline-flex rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/80 transition hover:border-yellow-400/40 hover:bg-white/5 hover:text-yellow-200"
          >
            ← Back to Home
          </a>

          <div className="mt-10 rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
              Board Resources
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Florida Condo Law Updates 2024–2025
            </h1>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-white/75">
              Florida condominium law has changed significantly. Board members
              now face expanded responsibilities involving kickbacks, vendor
              relationships, official records, milestone inspections, structural
              integrity reserve studies, reserve funding, transparency, and
              governance decisions.
            </p>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-yellow-100/90">
              This page is designed to help board members understand the current
              legal environment and why careful, documented, transparent
              decision-making matters more than ever.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {sections.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-7 shadow-[0_0_30px_rgba(234,179,8,0.08)]"
              >
                <h2 className="text-2xl font-semibold text-yellow-300">
                  {item.title}
                </h2>

                <p className="mt-4 text-base leading-8 text-white/75">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-yellow-400/10 bg-black/30 py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-red-400/30 bg-red-950/30 p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-red-200">
                Criminal Liability Warning
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white">
                Kickbacks can now expose condominium officers, directors, and
                managers to felony charges.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/75">
                Under Florida condominium law, an officer, director, or manager
                may not solicit, offer to accept, or accept a kickback. A
                knowing violation may constitute a third-degree felony,
                punishable under Florida criminal statutes. The law also
                provides for civil penalties and removal from office.
              </p>

              <p className="mt-5 text-base leading-8 text-white/75">
                Board members should be especially careful with vendor
                relationships, gifts, personal favors, undisclosed benefits,
                referral arrangements, or anything of value connected to goods
                or services provided to the association.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
              <h2 className="text-2xl font-semibold text-yellow-300">
                2024 Governance Changes
              </h2>

              <ul className="mt-5 space-y-4 text-base leading-8 text-white/75">
                <li>• Kickback misconduct can trigger felony exposure.</li>
                <li>• Election and voting misconduct can create criminal risk.</li>
                <li>• Destruction or concealment of records may carry penalties.</li>
                <li>• Theft or embezzlement of association funds can trigger removal and prosecution.</li>
                <li>• Board members must treat association records and funds with heightened care.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7">
              <h2 className="text-2xl font-semibold text-yellow-300">
                2025 Condo Safety and Reserve Updates
              </h2>

              <ul className="mt-5 space-y-4 text-base leading-8 text-white/75">
                <li>• Milestone inspection obligations remain central to board compliance.</li>
                <li>• Structural Integrity Reserve Studies continue to affect budgeting.</li>
                <li>• Repair timing and local enforcement requirements have increased importance.</li>
                <li>• Conflicts of interest involving inspection and repair professionals require attention.</li>
                <li>• Transparency and documentation are now essential board protections.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-8">
            <h2 className="text-3xl font-semibold text-yellow-200">
              What Board Members Should Do Now
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Review vendor-selection practices.",
                "Document all contract decisions.",
                "Avoid gifts, favors, or undisclosed benefits from vendors.",
                "Confirm required milestone inspection obligations.",
                "Confirm Structural Integrity Reserve Study requirements.",
                "Budget realistically for reserves and repairs.",
                "Maintain complete official records.",
                "Consult qualified association legal counsel when unsure.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-yellow-400/20 bg-slate-950/70 p-4 text-sm font-semibold text-yellow-100"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-semibold text-white">
              How Stoutt Property Management Helps
            </h2>

            <p className="mt-5 text-base leading-8 text-white/75">
              Stoutt Property Management supports board members through
              organized records, transparent workflows, meeting support,
              vendor coordination, financial reporting, compliance tracking,
              communication systems, and board education designed to reduce
              confusion and strengthen decision-making.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/proposal"
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
              >
                Request a Proposal
              </a>

              <a
                href="/board-education"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/5"
              >
                Board Education
              </a>
            </div>

            <p className="mt-8 text-xs leading-6 text-white/50">
              Important Notice: This page is provided for general educational
              purposes only and does not constitute legal advice. Condominium
              associations, officers, directors, managers, and owners should
              consult qualified Florida association legal counsel regarding
              specific statutory obligations and legal questions.
            </p>
          </div>
        </section>
            </main>

      <StickyMobileCTA />
    </div>
  );
}

import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function OfficialRecordsGuidePage() {
  const recordCards = [
    {
      title: "Governing Documents",
      text:
        "Declarations, bylaws, articles of incorporation, rules, amendments, policies, and related association documents must be organized and available when required.",
    },
    {
      title: "Financial Records",
      text:
        "Budgets, financial reports, bank records, invoices, ledgers, reserve information, assessments, collection records, and audits must be handled with care.",
    },
    {
      title: "Meeting Records",
      text:
        "Notices, agendas, minutes, votes, board packets, owner meeting records, committee records, and supporting documents should be maintained properly.",
    },
    {
      title: "Contracts and Vendor Records",
      text:
        "Vendor agreements, bids, insurance certificates, warranties, scopes of work, proposals, and contract decisions should be organized and preserved.",
    },
    {
      title: "Inspection and Safety Records",
      text:
        "Milestone inspection reports, SIRS reports, engineering studies, repair documentation, permits, and related structural safety records require careful handling.",
    },
    {
      title: "Owner and Association Records",
      text:
        "Owner rosters, voting records, notices, correspondence, architectural requests, violations, approvals, and other official association records must be managed responsibly.",
    },
  ];

  const accessItems = [
    "Know which records are official records.",
    "Maintain records in an organized and searchable way.",
    "Respond to owner inspection requests within required timeframes.",
    "Avoid withholding records without proper legal basis.",
    "Protect confidential or restricted information.",
    "Track records requests and responses.",
    "Keep board decisions, bids, contracts, and reports accessible.",
    "Consult association counsel when a request involves sensitive information.",
  ];

  const riskItems = [
    "Losing or misplacing important association records.",
    "Failing to respond properly to owner records requests.",
    "Destroying, hiding, or altering records.",
    "Not retaining contracts, bids, inspection reports, or financial documents.",
    "Failing to document board votes and major decisions.",
    "Mixing personal emails or informal communications with association business.",
    "Ignoring website posting or transparency requirements.",
    "Treating official records as optional paperwork.",
  ];

  const supportItems = [
    "Document organization",
    "Records request tracking",
    "Board packet support",
    "Contract and bid files",
    "Inspection report storage",
    "Financial document coordination",
    "Owner communication records",
    "Digital records structure",
  ];

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition hover:-translate-y-0.5 hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  const premiumCard =
    "rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(234,179,8,0.06),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(234,179,8,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_28%)]" />

          <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-5xl">
              <div className="inline-flex rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Board Resources • Transparency • Official Records
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Official Records Guide
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Official records are the backbone of association transparency.
                Florida condominium and HOA boards must maintain records
                carefully, respond properly to owner requests, preserve important
                documents, and treat records management as a core governance
                responsibility.
              </p>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <p className="text-lg leading-8 text-yellow-100">
                  Strong records protect the board, the association, and the
                  community. Poor records create confusion, mistrust, compliance
                  exposure, and unnecessary conflict.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/board-fiduciary-duties" className={secondaryBtn}>
                  View Fiduciary Duties
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Why official records matter
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                If a board decision matters, the records behind it matter too.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-white/70">
              <p>
                Official records show how the association is governed, how money
                is handled, how contracts are approved, how meetings are
                conducted, how repairs are tracked, and how owners are informed.
                Good records help create trust and accountability.
              </p>

              <p>
                In today&apos;s Florida association environment, records are not
                simply administrative files. They are part of board governance,
                fiduciary duty, owner transparency, legal compliance, and risk
                management.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {recordCards.map((card) => (
              <div
                key={card.title}
                className={`${premiumCard} p-8 transition hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/[0.07]`}
              >
                <h3 className="text-2xl font-semibold text-yellow-300">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-yellow-100/90">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div className={`${premiumCard} p-8 sm:p-10`}>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Owner access and transparency
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Boards must understand both access rights and confidentiality
                  limits.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/70">
                  Owners generally have rights to inspect and copy many official
                  association records, but not every record is open for
                  inspection. Boards must balance transparency with privacy,
                  confidentiality, attorney-client protections, personnel
                  information, security concerns, and statutory restrictions.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {accessItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-semibold leading-6 text-yellow-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-red-400/30 bg-red-950/30 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-red-200">
                  Important warning
                </div>

                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Record misconduct can create serious exposure.
                </h3>

                <p className="mt-5 text-base leading-8 text-white/75">
                  Florida condominium law includes penalties for certain records
                  violations. Destroying, concealing, or failing to maintain
                  records can create legal and governance consequences,
                  especially when tied to financial records, investigations,
                  owner access rights, or efforts to conceal wrongdoing.
                </p>

                <p className="mt-5 text-base leading-8 text-white/75">
                  Boards should avoid informal practices that make records hard
                  to locate, incomplete, inconsistent, or dependent on one
                  individual&apos;s personal files.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Common board mistakes
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Records problems often begin when associations rely on memory
                instead of systems.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                Associations need consistent records practices. When board
                members change, managers change, vendors change, or disputes
                arise, the association should not lose institutional knowledge
                because documents were scattered, missing, or never saved.
              </p>
            </div>

            <div className={`${premiumCard} p-8`}>
              <ul className="grid gap-4">
                {riskItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-7 text-white/80"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-yellow-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="border-y border-yellow-400/10 bg-black/30 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Better records management
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Strong records systems make board transitions easier and
                  decisions more defensible.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/70">
                  Associations should maintain organized records for meetings,
                  budgets, reserves, contracts, insurance, repairs, official
                  notices, owner communications, inspections, bids, and board
                  decisions.
                </p>

                <p className="mt-5 text-base leading-8 text-white/70">
                  Good records allow future boards to understand what happened,
                  why decisions were made, what obligations remain, and what
                  follow-up is still required.
                </p>
              </div>

              <div className={`${premiumCard} p-8`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Central document storage",
                    "Meeting minutes",
                    "Board packets",
                    "Contracts and bids",
                    "Financial records",
                    "Inspection reports",
                    "Owner notices",
                    "Records request log",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-semibold leading-6 text-yellow-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm leading-7 text-white/75">
                    Records management is not just filing. It is the memory of
                    the association and the evidence of responsible governance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className={`${premiumCard} p-8 sm:p-10`}>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                The Stoutt approach
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Organized records support better governance.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                Stoutt Property Management helps boards organize association
                documents, support meeting records, preserve contracts and bids,
                track official reports, maintain communication history, and
                strengthen the association&apos;s ability to retrieve important
                information when it matters.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {supportItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-semibold leading-6 text-yellow-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Board leadership
              </div>

              <h3 className="mt-4 text-3xl font-semibold text-white">
                Transparency is easier when records are already organized.
              </h3>

              <p className="mt-5 text-base leading-8 text-white/70">
                A board should not have to search across personal inboxes,
                old computers, incomplete binders, and scattered folders to
                answer basic association questions. Better organization creates
                better confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
          <div className={`${premiumCard} p-8 text-center sm:p-10 lg:p-14`}>
            <div className="mx-auto max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Related board resources
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Continue the board education path.
              </h2>

              <p className="mt-5 text-base leading-8 text-yellow-100/90">
                Official records connect directly to fiduciary duties, vendor
                selection, reserve studies, milestone inspections, and Florida
                condominium law updates.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <a
                href="/board-fiduciary-duties"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Board Fiduciary Duties
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Understand board responsibility and accountability.
                </p>
              </a>

              <a
                href="/vendor-selection-procurement-guide"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Vendor Selection
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Improve contract review, documentation, and vendor oversight.
                </p>
              </a>

              <a
                href="/reserve-studies-sirs-guide"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Reserve Studies & SIRS
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Understand reserve planning and structural funding.
                </p>
              </a>

              <a
                href="/florida-condo-law-updates-2024-2025"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Florida Law Updates
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Review 2024–2025 legal changes affecting boards.
                </p>
              </a>
            </div>

            <p className="mt-8 text-xs leading-6 text-white/50">
              Important Notice: This page is provided for general educational
              purposes only and does not constitute legal advice. Associations,
              officers, directors, managers, and owners should consult qualified
              Florida association legal counsel regarding specific statutory
              obligations and legal questions.
            </p>
          </div>
        </section>
      </main>

      <StickyMobileCTA />
    </div>
  );
}

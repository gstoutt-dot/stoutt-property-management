import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function VendorSelectionProcurementGuidePage() {
  const processCards = [
    {
      title: "Define the Scope",
      text:
        "Before bids are requested, the board should clearly define the work, materials, expectations, timeline, access requirements, insurance needs, and evaluation criteria.",
    },
    {
      title: "Request Comparable Bids",
      text:
        "Competitive bids are only useful when vendors are bidding on the same scope. Boards should avoid comparing incomplete, vague, or materially different proposals.",
    },
    {
      title: "Review Qualifications",
      text:
        "Boards should evaluate licensing, insurance, experience, references, financial stability, warranty terms, project capacity, and prior association experience.",
    },
    {
      title: "Document the Decision",
      text:
        "The board should document the bids reviewed, questions asked, reasons for selection, conflicts disclosed, and final decision in the association records.",
    },
  ];

  const riskItems = [
    "Approving work without a clear written scope.",
    "Comparing bids that do not include the same services or materials.",
    "Selecting vendors based on personal relationships instead of association need.",
    "Accepting gifts, favors, referral benefits, or private advantages from vendors.",
    "Failing to disclose conflicts of interest.",
    "Treating the lowest bid as automatically the best bid.",
    "Failing to confirm licensing, insurance, or qualifications.",
    "Not documenting why the board selected a vendor.",
  ];

  const bidItems = [
    "Written scope of work",
    "Comparable bid format",
    "Licensing verification",
    "Insurance verification",
    "References and experience",
    "Warranty terms",
    "Timeline and access requirements",
    "Board decision documentation",
  ];

  const supportItems = [
    "Bid package organization",
    "Vendor communication",
    "Scope clarification",
    "Board packet preparation",
    "Contract tracking",
    "Insurance certificate coordination",
    "Decision documentation",
    "Follow-through oversight",
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
                Board Resources • Vendor Oversight • Procurement
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Vendor Selection & Procurement Guide
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Vendor selection is one of the most important responsibilities
                of a condominium or HOA board. Contracts affect association
                finances, property condition, owner confidence, legal exposure,
                and the long-term performance of the community.
              </p>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <p className="text-lg leading-8 text-yellow-100">
                  In today's Florida association environment, boards must treat
                  vendor decisions with transparency, documentation, competitive
                  review, conflict awareness, and zero tolerance for kickbacks or
                  private benefits.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a
                  href="/florida-condo-law-updates-2024-2025"
                  className={secondaryBtn}
                >
                  View Florida Law Updates
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Why procurement matters
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                A good vendor decision begins before the first bid is received.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-white/70">
              <p>
                Boards often focus on the final price, but the most important
                procurement work happens earlier. A clear scope, comparable
                proposals, proper documentation, verified qualifications, and
                conflict-free decision-making help protect the association.
              </p>

              <p>
                Florida condominium law requires competitive bids for many
                contracts exceeding the statutory threshold, while also making
                clear that the association is not required to accept the lowest
                bid. The board's responsibility is to make a careful,
                documented, defensible decision.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {processCards.map((card) => (
              <div
                key={card.title}
                className={`${premiumCard} p-7 transition hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/[0.07]`}
              >
                <h3 className="text-xl font-semibold text-yellow-300">
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
                  Competitive bidding
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Competitive bids help boards compare options and protect the
                  decision-making process.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/70">
                  For condominium associations, contracts for materials,
                  equipment, or services that exceed 5% of the association's
                  total annual budget, including reserves, generally require
                  competitive bids unless an exception applies. The law does not
                  require the association to select the lowest bid.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {bidItems.map((item) => (
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
                  Kickback warning
                </div>

                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Vendor benefits can create serious legal exposure.
                </h3>

                <p className="mt-5 text-base leading-8 text-white/75">
                  Florida condominium law prohibits officers, directors, and
                  managers from soliciting, offering to accept, or accepting
                  kickbacks. A knowing violation may constitute a third-degree
                  felony.
                </p>

                <p className="mt-5 text-base leading-8 text-white/75">
                  Boards should avoid gifts, personal favors, referral payments,
                  side arrangements, undisclosed benefits, or anything that
                  could appear to influence an association contract decision.
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
                Vendor problems often start with unclear scope, weak
                documentation, or conflicts of interest.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                The goal is not to slow the board down. The goal is to create a
                clean process that allows the board to move quickly while still
                protecting the association and its members.
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
                  Better vendor decisions
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Boards should select vendors based on value, capability,
                  compliance, and community need.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/70">
                  The lowest price is not always the best decision. Boards may
                  consider quality, experience, timeline, warranty, references,
                  insurance, prior performance, communication, and the vendor's
                  ability to complete the work properly.
                </p>

                <p className="mt-5 text-base leading-8 text-white/70">
                  What matters is that the board follows a fair process, reviews
                  meaningful information, avoids conflicts, and documents why
                  the selected vendor is in the association's best interests.
                </p>
              </div>

              <div className={`${premiumCard} p-8`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Value over price alone",
                    "Comparable proposals",
                    "Clear scope",
                    "Verified insurance",
                    "Qualified vendors",
                    "Conflict disclosure",
                    "Board vote documentation",
                    "Contract follow-through",
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
                    A strong procurement process helps the board defend its
                    decisions and helps owners understand why the selected vendor
                    was chosen.
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
                Vendor oversight requires organization from bid to completion.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                Stoutt Property Management helps boards organize scopes, gather
                vendor information, prepare board packets, track insurance and
                documentation, communicate with contractors, support decision
                transparency, and follow through after the contract is approved.
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
                Procurement is not just purchasing. It is stewardship.
              </h3>

              <p className="mt-5 text-base leading-8 text-white/70">
                Every contract affects owners. A disciplined procurement process
                helps protect money, property, trust, transparency, and the
                long-term condition of the community.
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
                Vendor selection connects directly to fiduciary duties, official
                records, reserve planning, milestone inspections, and Florida
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
                href="/official-records-guide"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Official Records
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Understand documentation, transparency, and owner access.
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

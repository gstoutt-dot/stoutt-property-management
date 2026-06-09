import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function MilestoneInspectionGuidePage() {
  const phaseCards = [
    {
      title: "Phase One Inspection",
      text:
        "A licensed architect or engineer performs a visual examination of habitable and non-habitable areas to determine whether there is substantial structural deterioration.",
    },
    {
      title: "Phase Two Inspection",
      text:
        "If substantial structural deterioration is identified, a more detailed inspection may be required to determine the extent of damage and recommend repairs.",
    },
    {
      title: "Inspection Report",
      text:
        "The engineer or architect prepares a report and summary. Boards must understand, distribute, post, and retain inspection information as required.",
    },
    {
      title: "Repair Follow-Through",
      text:
        "A milestone inspection is not simply a report. Boards must evaluate findings, plan repairs, coordinate professionals, communicate with owners, and document decisions.",
    },
  ];

  const boardResponsibilities = [
    "Determine whether the association has received notice requiring a milestone inspection.",
    "Engage a qualified Florida licensed engineer or architect.",
    "Track the inspection deadline and completion status.",
    "Notify unit owners within required statutory timelines.",
    "Review the phase one or phase two inspection report carefully.",
    "Distribute required summaries to owners.",
    "Post inspection information where required.",
    "Coordinate repairs, budgeting, reserves, financing, and owner communication.",
  ];

  const riskItems = [
    "Missing statutory inspection deadlines.",
    "Failing to notify owners after receiving official notice.",
    "Ignoring substantial structural deterioration findings.",
    "Failing to coordinate repairs recommended by professionals.",
    "Treating inspection reports as paperwork instead of action items.",
    "Failing to connect inspection findings to reserve planning.",
    "Poor communication with owners before assessments or repairs.",
    "Not documenting board review, decisions, and professional recommendations.",
  ];

  const supportItems = [
    "Inspection deadline tracking",
    "Engineer and architect coordination",
    "Board packet preparation",
    "Owner notice support",
    "Report organization",
    "Repair follow-up tracking",
    "Budget and reserve coordination",
    "Vendor and project communication",
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
                Board Resources • Building Safety • Milestone Inspections
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Milestone Inspection Guide
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Florida milestone inspections require many condominium
                associations to evaluate the structural condition of qualifying
                buildings and respond responsibly to professional findings,
                owner notice requirements, repair recommendations, and
                disclosure obligations.
              </p>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <p className="text-lg leading-8 text-yellow-100">
                  A milestone inspection is not just a compliance item. It is a
                  building-safety obligation that affects budgets, reserves,
                  repairs, owner communication, sales disclosures, and board
                  fiduciary responsibility.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/reserve-studies-sirs-guide" className={secondaryBtn}>
                  View Reserve Studies & SIRS
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                What is a milestone inspection?
              </div>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                A milestone inspection evaluates whether a building shows signs
                of substantial structural deterioration.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-white/70">
              <p>
                Florida law requires qualifying condominium and cooperative
                buildings to complete milestone inspections under specific
                circumstances. The inspection is performed by a licensed
                architect or engineer and is intended to help identify structural
                conditions that may require further investigation or repair.
              </p>

              <p>
                Once an association receives written notice from the local
                enforcement agency, the board must treat the inspection process
                as a priority, track statutory deadlines, notify owners, review
                findings, and coordinate required follow-through.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-4">
            {phaseCards.map((card) => (
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
                  Board responsibilities
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Boards must manage the inspection process from notice through
                  follow-through.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/70">
                  The association is responsible for arranging required
                  milestone inspections and ensuring compliance. If officers or
                  directors willfully and knowingly fail to have a required
                  milestone inspection performed, Florida law ties that failure
                  to breach of fiduciary duty.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {boardResponsibilities.map((item) => (
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
                  Timing matters
                </div>

                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Owner notice and inspection deadlines should not be treated
                  casually.
                </h3>

                <p className="mt-5 text-base leading-8 text-white/75">
                  Florida law includes specific notice and timing requirements
                  once a local enforcement agency determines that a milestone
                  inspection is required. Boards should immediately calendar
                  deadlines, notify owners, and coordinate qualified
                  professionals.
                </p>

                <p className="mt-5 text-base leading-8 text-white/75">
                  The board should also understand how inspection reports affect
                  official records, website posting, owner communication,
                  reserve planning, repair decisions, and resale disclosures.
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
                Inspection reports create decisions, not just documents.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                Boards create risk when they receive engineering information but
                fail to act on it, budget for it, communicate it, or document
                the process. The inspection should become part of the board's
                operating plan.
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
                  Repairs, reserves, and disclosures
                </div>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Milestone inspection findings can affect the entire community.
                </h2>

                <p className="mt-5 text-base leading-8 text-white/70">
                  Findings from a milestone inspection may trigger repair
                  planning, budget adjustments, reserve analysis, special
                  assessments, financing discussions, insurance questions, and
                  owner disclosure obligations.
                </p>

                <p className="mt-5 text-base leading-8 text-white/70">
                  Boards should avoid separating the inspection from the
                  association's financial and operational planning. Structural
                  findings must be evaluated in the context of reserves,
                  contracts, owner communication, and long-term stewardship.
                </p>
              </div>

              <div className={`${premiumCard} p-8`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    "Repair planning",
                    "Reserve coordination",
                    "Owner communication",
                    "Budget impact",
                    "Contractor selection",
                    "Official records",
                    "Website posting",
                    "Resale disclosures",
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
                    The inspection process should be organized, documented, and
                    connected to board decision-making from the beginning.
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
                Building safety requires organized follow-through.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                Stoutt Property Management helps boards organize milestone
                inspection requirements, coordinate qualified professionals,
                prepare board discussions, communicate with owners, track repair
                recommendations, and connect inspection findings to reserve and
                budget planning.
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
                The goal is not panic. The goal is disciplined stewardship.
              </h3>

              <p className="mt-5 text-base leading-8 text-white/70">
                A well-supported board can move through milestone inspection
                requirements with structure, transparency, and confidence. The
                key is to keep the process organized and avoid surprises.
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
                Milestone inspections connect directly to reserve funding,
                fiduciary duties, official records, vendor selection, and
                Florida condominium law updates.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <a
                href="/reserve-studies-sirs-guide"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Reserve Studies & SIRS
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Understand structural reserve planning and funding.
                </p>
              </a>

              <a
                href="/board-fiduciary-duties"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Board Fiduciary Duties
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Understand board responsibility and legal accountability.
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
                href="/official-records-guide"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Official Records
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Understand records, transparency, and owner access.
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

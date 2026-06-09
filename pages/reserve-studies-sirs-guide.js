import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function ReserveStudiesSirsGuidePage() {
  const components = [
    "Roof",
    "Load-bearing walls",
    "Primary structural members",
    "Floors",
    "Foundation",
    "Fireproofing and fire protection systems",
    "Plumbing",
    "Electrical systems",
    "Waterproofing and exterior painting",
    "Windows and exterior doors",
  ];

  const mistakeItems = [
    "Treating reserve funding as optional.",
    "Waiting until a crisis before planning repairs.",
    "Ignoring engineer or reserve specialist recommendations.",
    "Relying on repeated special assessments instead of long-term planning.",
    "Failing to explain reserve realities to owners early.",
    "Using outdated budgets that do not reflect current construction costs.",
    "Separating reserve decisions from fiduciary responsibility.",
    "Avoiding difficult funding conversations until they become emergencies.",
  ];

  const boardSteps = [
    "Confirm whether the association is required to complete a SIRS.",
    "Review the most recent reserve study and structural reports.",
    "Identify components with mandatory funding requirements.",
    "Coordinate with qualified engineers and reserve professionals.",
    "Build reserve funding into the annual budget process.",
    "Communicate clearly with owners before major increases or assessments.",
    "Document board decisions and professional recommendations.",
    "Update reserve planning as conditions, costs, and legal requirements change.",
  ];

  const supportItems = [
    "Reserve planning support",
    "Budget coordination",
    "Engineer and vendor communication",
    "Board meeting preparation",
    "Owner communication support",
    "Document and report organization",
    "Capital project tracking",
    "Long-term financial visibility",
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
                Board Resources • Reserves • Structural Integrity
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Reserve Studies & SIRS Guide
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Florida condominium boards must now approach reserve planning
                with greater discipline, transparency, and urgency. Structural
                Integrity Reserve Studies affect budgets, assessments, owner
                communication, property values, and board decision-making.
              </p>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <p className="text-lg leading-8 text-yellow-100">
                  Reserve funding is no longer simply a financial preference.
                  For many Florida condominiums, it is now tied directly to
                  statutory compliance, structural safety, and fiduciary
                  responsibility.
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
                Reserve study basics
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                A reserve study is a long-term financial planning tool.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-white/70">
              <p>
                A reserve study helps an association identify major common
                elements, estimate useful life, estimate future replacement
                costs, and plan funding over time. It gives boards a structured
                way to prepare for large expenses before they become emergency
                assessments.
              </p>
              <p>
                In the past, many communities treated reserves as flexible.
                Today's legal and structural environment requires boards to be
                more realistic about repair costs, deferred maintenance, and
                long-term capital planning.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className={`${premiumCard} p-8`}>
              <h3 className="text-2xl font-semibold text-yellow-300">
                What is a Structural Integrity Reserve Study?
              </h3>
              <p className="mt-4 text-sm leading-7 text-yellow-100/90">
                A Structural Integrity Reserve Study, commonly referred to as a
                SIRS, evaluates specified building components and helps determine
                reserve funding needs for structural and safety-related items.
              </p>
            </div>

            <div className={`${premiumCard} p-8`}>
              <h3 className="text-2xl font-semibold text-yellow-300">
                Why it matters now
              </h3>
              <p className="mt-4 text-sm leading-7 text-yellow-100/90">
                After the major changes to Florida condominium law, boards must
                pay closer attention to structural components, reserve funding,
                milestone inspection requirements, professional reports, and
                how funding decisions are explained to owners.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  SIRS components
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Structural reserve planning focuses on the components that
                  carry the greatest long-term risk.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/70">
                  Covered components may vary depending on the building and
                  applicable law, but boards should understand the core systems
                  commonly evaluated in structural reserve planning.
                </p>
              </div>

              <div className={`${premiumCard} p-8`}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {components.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-semibold leading-6 text-yellow-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
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
                Reserve problems usually begin years before the assessment.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                When boards delay funding, avoid difficult conversations, or
                ignore professional recommendations, the community often pays
                later through emergency repairs, special assessments, financing
                pressure, owner frustration, and reduced confidence.
              </p>
            </div>

            <div className={`${premiumCard} p-8`}>
              <ul className="grid gap-4">
                {mistakeItems.map((item) => (
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
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className={`${premiumCard} p-8 sm:p-10`}>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Board responsibility
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Boards must connect reserve planning to fiduciary duty.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/70">
                  Reserve decisions affect every owner. Boards should review
                  studies carefully, understand professional recommendations,
                  budget realistically, and communicate clearly. Avoiding the
                  topic does not make the obligation disappear.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {boardSteps.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-red-400/30 bg-red-950/30 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-red-200">
                  Financial reality
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Underfunded reserves eventually become owner pain.
                </h3>
                <p className="mt-5 text-base leading-8 text-white/75">
                  Communities that postpone reserve funding may face large
                  special assessments, emergency loans, delayed repairs,
                  insurance concerns, marketability issues, and owner distrust.
                </p>
                <p className="mt-5 text-base leading-8 text-white/75">
                  The earlier a board addresses reserve realities, the more
                  options the community usually has.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                The Stoutt approach
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Reserve planning needs structure, communication, and
                follow-through.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                Stoutt Property Management helps boards organize information,
                coordinate professionals, prepare budget discussions, track
                capital needs, and communicate more clearly with owners as
                reserve obligations evolve.
              </p>
            </div>

            <div className={`${premiumCard} p-8`}>
              <div className="grid gap-4 sm:grid-cols-2">
                {supportItems.map((item) => (
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
                  The goal is not simply to produce a report. The goal is to
                  help the board understand what the report means, what must be
                  planned, and how to move the community forward responsibly.
                </p>
              </div>
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
                Reserve planning connects directly to milestone inspections,
                fiduciary duties, official records, and Florida condominium law
                updates.
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
                  Understand the duties behind board decision-making.
                </p>
              </a>

              <a
                href="/milestone-inspection-guide"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  Milestone Inspections
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Understand structural safety inspections and board obligations.
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

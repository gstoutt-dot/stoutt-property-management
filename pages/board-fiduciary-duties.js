import React from "react";
import SiteHeader from "../components/SiteHeader";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function BoardFiduciaryDutiesPage() {
  const dutyCards = [
    {
      title: "Duty of Care",
      text:
        "Board members should make informed decisions, review important documents, ask questions, attend meetings, evaluate financial information, and act with the care expected of someone responsible for association business.",
    },
    {
      title: "Duty of Loyalty",
      text:
        "Board members should place the association's interests above personal interests, avoid self-dealing, disclose conflicts, and never allow personal benefit to influence association decisions.",
    },
    {
      title: "Duty of Good Faith",
      text:
        "Board members should act honestly, transparently, and for a proper association purpose. Decisions should be documented and based on the best interests of the community.",
    },
    {
      title: "Duty to Protect Association Funds",
      text:
        "Board members oversee money that belongs to the community. Budgeting, reserves, collections, insurance, contracts, invoices, and financial controls must be handled responsibly.",
    },
    {
      title: "Duty to Maintain Records",
      text:
        "Official records, contracts, financial reports, meeting minutes, inspection reports, budgets, and owner records must be maintained and handled according to Florida association requirements.",
    },
    {
      title: "Duty to Follow the Law and Governing Documents",
      text:
        "Board decisions should be consistent with Florida law, the declaration, bylaws, articles of incorporation, rules, policies, and properly adopted association procedures.",
    },
  ];

  const riskItems = [
    "Ignoring reserve obligations or structural inspection requirements.",
    "Approving contracts without proper review or documentation.",
    "Accepting gifts, favors, or benefits from vendors.",
    "Failing to maintain or produce official records when required.",
    "Allowing personal relationships to influence association decisions.",
    "Making financial decisions without reviewing budgets, bids, or reports.",
    "Failing to address known maintenance, safety, or compliance issues.",
    "Treating board service as informal instead of fiduciary responsibility.",
  ];

  const protectionItems = [
    "Read board packets before meetings.",
    "Ask questions before voting.",
    "Disclose conflicts of interest.",
    "Avoid vendor gifts, favors, and private benefits.",
    "Document major decisions in the minutes.",
    "Rely on qualified professionals when needed.",
    "Review budgets, reserves, bids, and contracts carefully.",
    "Keep decisions focused on the association's best interests.",
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
                Board Resources • Fiduciary Duty • Responsible Governance
              </div>

              <h1 className="mt-7 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Board fiduciary duties are not optional.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
                Florida condominium officers and directors have a fiduciary
                relationship to the unit owners. That means board service is not
                simply volunteer participation — it is a position of trust,
                responsibility, and legal accountability.
              </p>

              <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-6">
                <p className="text-lg leading-8 text-yellow-100">
                  Modern Florida board members must understand budgets,
                  reserves, contracts, records, inspections, vendor decisions,
                  insurance, maintenance, and owner communication through the
                  lens of fiduciary responsibility.
                </p>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/florida-condo-law-updates-2024-2025" className={secondaryBtn}>
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
                What fiduciary duty means
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Board members are entrusted with the community's money,
                property, records, and decisions.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-white/70">
              <p>
                A fiduciary relationship means directors and officers must act
                for the benefit of the association and its members, not for
                personal advantage, convenience, favoritism, or outside
                pressure.
              </p>
              <p>
                In practice, this requires preparation, documentation,
                transparency, financial discipline, proper records, careful
                vendor review, and willingness to seek professional guidance
                when a decision carries legal, financial, or structural risk.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {dutyCards.map((card) => (
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
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                  Where boards get into trouble
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Most fiduciary problems begin with poor process.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/70">
                  Boards do not need to be perfect. But they do need to act
                  carefully, document decisions, avoid conflicts, and treat
                  association business as serious business.
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
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className={`${premiumCard} p-8 sm:p-10`}>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Board protection practices
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Good governance protects the association and the board.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                Fiduciary responsibility is strengthened when boards use a
                consistent process. The goal is not to make board service
                difficult. The goal is to make decisions defensible,
                transparent, and aligned with the community's best interests.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {protectionItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm font-semibold leading-6 text-yellow-100"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="rounded-[2rem] border border-red-400/30 bg-red-950/30 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-red-200">
                  Important reminder
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Fiduciary duty now intersects with stronger enforcement.
                </h3>
                <p className="mt-5 text-base leading-8 text-white/75">
                  Florida law now expressly prohibits condominium officers,
                  directors, and managers from soliciting, offering to accept,
                  or accepting kickbacks. A knowing violation may constitute a
                  third-degree felony.
                </p>
                <p className="mt-5 text-base leading-8 text-white/75">
                  Vendor relationships, contract awards, personal benefits, and
                  conflicts of interest should be handled with care,
                  disclosure, and documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-yellow-400/10 bg-black/30 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                The Stoutt approach
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Better systems help boards make better decisions.
              </h2>
              <p className="mt-6 text-base leading-8 text-white/70 sm:text-lg">
                Stoutt Property Management supports fiduciary governance through
                organized records, transparent workflows, board communication,
                meeting support, vendor coordination, financial visibility, and
                follow-through systems that help directors stay informed and
                accountable.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className={`${premiumCard} p-8 text-center sm:p-10 lg:p-14`}>
            <div className="mx-auto max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Board resources
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Continue the board education path.
              </h2>
              <p className="mt-5 text-base leading-8 text-yellow-100/90">
                Fiduciary duty connects directly to reserves, inspections,
                vendor selection, records, and compliance. These are the areas
                where informed boards protect their communities.
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
                  Understand reserve obligations and structural reserve studies.
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
                  Understand inspection duties and structural safety timelines.
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
                  Reduce conflicts, improve documentation, and protect decisions.
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
                  Understand records, transparency, and owner access obligations.
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

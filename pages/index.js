import { useState } from "react";
import StickyMobileCTA from "../components/StickyMobileCTA";
export default function StouttPropertyManagementHomepage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/why-switch", label: "Why Switch" },
    { href: "https://glennstoutt.com", label: "Founder", external: true },
    { href: "/collections", label: "Collections" },
    { href: "/coverage", label: "Coverage" },
    { href: "/proposal", label: "Proposal" },
  ];

  const services = [
    {
      title: "Community Association Management",
      description:
        "Hands-on leadership for condominium and HOA boards with proactive site presence, vendor coordination, communication, and operational follow-through.",
    },
    {
      title: "Financial Oversight",
      description:
        "Budget support, reporting, collections coordination, financial controls, and board-ready transparency that protects the long-term health of the association.",
    },
    {
      title: "Maintenance & Vendor Coordination",
      description:
        "Fast issue tracking, smarter vendor management, and accountable follow-up so problems do not sit unresolved.",
    },
    {
      title: "Board & Resident Communication",
      description:
        "Clear communication, faster response times, and systems that reduce frustration for both board members and residents.",
    },
  ];

  const reasons = [
    "Slow response times that frustrate boards and residents",
    "Missed inspections and inconsistent site follow-through",
    "Weak collections follow-up and unresolved delinquencies",
    "High staff turnover and lack of continuity",
    "No real relationship-building with the board",
    "Too much reacting and not enough proactive leadership",
  ];

  const counties = [
    "Broward County",
    "Miami-Dade County",
    "Palm Beach County",
  ];

  const linkClasses =
    "text-sm font-medium text-white/80 transition hover:text-white";
  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300";
  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 pb-24 text-white lg:pb-0">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-sm font-bold text-yellow-300">
              S
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.22em] text-yellow-300">
                STOUTT PROPERTY
              </div>
              <div className="text-sm text-white/70">Management</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={linkClasses}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="/services" className={secondaryBtn}>
              View Services
            </a>
            <a href="/proposal" className={primaryBtn}>
              Request a Proposal
            </a>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-slate-950 lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className={secondaryBtn}
                >
                  View Services
                </a>
                <a
                  href="/proposal"
                  onClick={() => setMobileOpen(false)}
                  className={primaryBtn}
                >
                  Request a Proposal
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_38%),linear-gradient(180deg,#020617_0%,#020617_48%,#08111f_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-yellow-300">
                Florida HOA & Condo Specialists
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Redefining property management through experience, intelligent systems, and being proactive.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                Stoutt Property Management helps condominium and HOA boards move beyond slow response times, missed details, and reactive management with a systems-driven, relationship-focused approach built for Florida communities.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/why-switch" className={secondaryBtn}>
                  Why Communities Switch
                </a>
              </div>

              <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { value: "82", label: "Associations Managed" },
                  { value: "$500M+", label: "Assets Overseen" },
                  { value: "20,000+", label: "Lives Impacted Through KDA" },
                  { value: "FL", label: "HOA & Condo Focus" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]"
                  >
                    <div className="text-2xl font-semibold text-white sm:text-3xl">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-stretch">
              <div className="w-full rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-yellow-950/30">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                    Built for boards that expect more
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      "Proactive inspections and operational follow-through",
                      "Stronger collections coordination at no extra charge to the association",
                      "Faster communication backed by intelligent systems",
                      "Hands-on board relationships, not distant management",
                    ].map((item) => (
                      <div key={item} className="flex gap-3">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-300" />
                        <p className="text-sm leading-7 text-white/75">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                    <div className="text-sm font-semibold text-yellow-200">
                      Founder-led credibility
                    </div>
                    <p className="mt-2 text-sm leading-7 text-white/70">
                      Backed by decades of association leadership and a legacy built on stewardship, systems, and long-term trust.
                    </p>
                    <a
                      href="https://glennstoutt.com"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex text-sm font-semibold text-yellow-300 hover:text-yellow-200"
                    >
                      Explore Founder Story →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-slate-900/70">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              "Proactive Site Presence",
              "Board-Ready Communication",
              "Smarter Operational Systems",
              "Relationship-Driven Leadership",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm font-medium text-white/75"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-14">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Why communities switch management companies
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Boards do not switch because they want change. They switch because they need leadership.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                Most boards reach out after dealing with the same frustrations over and over. Stoutt Property Management is built to solve those frustrations with stronger follow-through, better systems, and real accountability.
              </p>
              <div className="mt-8">
                <a href="/proposal" className={primaryBtn}>
                  Start the Conversation
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]"
                >
                  <div className="mb-3 h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <p className="text-sm leading-7 text-white/75">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Core services
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Disciplined property management for Florida condominium and HOA communities.
              </h2>
              <p className="mt-5 text-base leading-8 text-white/70">
                We combine operational structure, financial discipline, communication, and proactive field execution so boards can lead with confidence.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href="/services" className={secondaryBtn}>
                View All Services
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 rounded-[2rem] border border-yellow-400/15 bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-950 p-8 lg:grid-cols-[1fr_.9fr] lg:p-12">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Intelligent systems advantage
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Real-time property management powered by intelligent systems.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
                Stoutt Property Management is building a different kind of management experience. Intelligent systems help process requests faster, improve communication, strengthen follow-through, and free leadership to focus on relationships and decision-making.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Faster resident and board response handling",
                  "Smarter issue tracking and operational follow-up",
                  "Stronger visibility into unresolved items",
                  "More time dedicated to relationships and leadership",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Why it matters
              </div>
              <div className="mt-6 space-y-5">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]">
                  <div className="text-base font-semibold text-white">
                    Faster answers
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Reduce frustration by responding faster and tracking requests more intelligently.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]">
                  <div className="text-base font-semibold text-white">
                    Better accountability
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Issues do not disappear into email chains. Systems create visibility and follow-up.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/40 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)]">
                  <div className="text-base font-semibold text-white">
                    Stronger leadership focus
                  </div>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    When repetitive tasks are handled better, leadership can focus on boards, strategy, and relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_.85fr]">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Stronger collections
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Stronger collections at no extra charge to the association.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
                  Delinquencies affect cash flow, operations, and community stability. We bring disciplined follow-up, stronger coordination, and clearer processes that help protect the financial position of the association.
                </p>
                <div className="mt-8">
                  <a href="/collections" className={secondaryBtn}>
                    Explore Collections
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  "Disciplined follow-up and communication",
                  "Board visibility into status and unresolved items",
                  "Processes built to support stronger financial outcomes",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                Coverage area
              </div>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Serving condominium and HOA communities across South Florida.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                We are focused on Broward County and expanding strategically across the surrounding markets where boards need responsive, experienced, systems-driven management.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {counties.map((county) => (
                <a
                  key={county}
                  href="/coverage"
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-yellow-300/30 hover:bg-white/[0.07]"
                >
                  <div className="text-lg font-semibold text-white">{county}</div>
                  <div className="mt-2 text-sm leading-7 text-white/65">
                    View coverage and community focus.
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-8 text-center sm:p-10 lg:p-14">
              <div className="mx-auto max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Start the conversation
                </div>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  If your board is considering a change, let’s have the right conversation.
                </h2>
                <p className="mt-5 text-base leading-8 text-white/75">
                  We built Stoutt Property Management to deliver a different level of responsiveness, structure, and leadership for Florida communities.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href="/proposal" className={primaryBtn}>
                  Request a Proposal
                </a>
                <a href="/proposal" className={secondaryBtn}>
                  Schedule a Conversation
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
              Stoutt Property Management
            </div>
            <p className="mt-2 text-sm text-white/60">
              Florida HOA and condominium association management built on experience, systems, and proactive leadership.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-white/65">
            <a href="/services" className="hover:text-white">
              Services
            </a>
            <a href="/why-switch" className="hover:text-white">
              Why Switch
            </a>
            <a href="/collections" className="hover:text-white">
              Collections
            </a>
            <a href="/coverage" className="hover:text-white">
              Coverage
            </a>
            <a
              href="https://glennstoutt.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              Founder Story
            </a>
            <a href="/proposal" className="hover:text-white">
              Request a Proposal
            </a>
          </div>
        </div>
      </footer>
    <StickyMobileCTA />         
    </div>
  );
}


import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const PHONE_NUMBER_DISPLAY = "(754) 600-4755";
  const PHONE_NUMBER_HREF = "tel:+17546004755";

  const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Why Switch", href: "/why-switch" },
  { label: "Founder", href: "https://glennstoutt.com" }, // external
  { label: "Collections", href: "/collections" },
  { label: "Coverage", href: "/coverage" },
  { label: "Proposal", href: "/proposal" },
];

  const trustStats = [
    { value: "82", label: "Associations Managed" },
    { value: "$500M+", label: "Assets Overseen" },
    { value: "20,000+", label: "Lives Impacted Through KDA" },
    { value: "Florida", label: "HOA & Condo Focus" },
  ];

  const pillars = [
    {
      title: "Operational Excellence",
      text: "Structured management systems, cleaner execution, and consistent follow-through that help boards regain confidence in daily operations.",
    },
    {
      title: "Intelligent Systems",
      text: "A more modern operating model supported by AI, faster communication workflows, and better visibility across key tasks.",
    },
    {
      title: "Steady Leadership",
      text: "Experienced oversight, accountability, and a more proactive management style built for communities that expect more.",
    },
  ];

  const reasons = [
    "Slow response times and unresolved issues",
    "Missed inspections and weak follow-through",
    "Poor vendor coordination and delayed updates",
    "Weak collections discipline and lack of urgency",
    "High staff turnover and constant re-explaining",
    "No real relationship-building with the board",
  ];

  const servicesPreview = [
    {
      title: "Full-Service Association Management",
      text: "Day-to-day operational support for condominium and HOA communities with stronger structure and responsiveness.",
      href: "/services",
    },
    {
      title: "Financial Oversight & Reporting",
      text: "Clearer board visibility, stronger processes, and better financial coordination to support decision-making.",
      href: "/services",
    },
    {
      title: "Maintenance & Vendor Coordination",
      text: "Proactive issue tracking, vendor follow-up, and better communication around maintenance progress.",
      href: "/services",
    },
  ];

  const serviceAreas = [
    {
      title: "Broward County",
      href: "/broward-county-property-management",
      text: "Management support for Broward County condominium and HOA communities with stronger responsiveness, proactive oversight, and more consistent board support.",
    },
    {
      title: "Miami-Dade County",
      href: "/miami-dade-county-property-management",
      text: "Association management for Miami-Dade communities that need better communication, cleaner execution, and a more disciplined operating partner.",
    },
    {
      title: "Palm Beach County",
      href: "/palm-beach-county-property-management",
      text: "Proactive HOA and condominium association management for Palm Beach County boards seeking stronger follow-through and more reliable service.",
    },
  ];

  return (
    <>
      <Head>
        <title>Stoutt Property Management | Florida HOA & Condo Management</title>
        <meta
          name="description"
          content="Stoutt Property Management helps Florida condominium and HOA boards with proactive management, intelligent systems, and experienced leadership."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(250,204,21,0.10),transparent_20%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.92),rgba(2,6,23,1))]" />
          <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        </div>

        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-500/20 bg-white/5 shadow-[0_0_40px_rgba(234,179,8,0.16)]">
                <span className="text-sm font-semibold tracking-[0.2em] text-yellow-400">
                  SPM
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-white/70">
                  Florida HOA & Condo Management
                </div>
                <div className="text-lg font-semibold tracking-tight">
                  Stoutt Property Management
                </div>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
  {navLinks.map((item) => {
    const isExternal =
      item.href &&
      typeof item.href === "string" &&
      item.href.startsWith("http");

    return isExternal ? (
      <a
        key={item.label}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-white/75 transition hover:text-white"
      >
        {item.label}
      </a>
    ) : (
      <Link
        key={item.label}
        href={item.href || "#"}
        className="text-sm font-medium text-white/75 transition hover:text-white"
      >
        {item.label}
      </Link>
    );
  })}
</nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/proposal"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Request Proposal
              </Link>

              <a
                href={PHONE_NUMBER_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-yellow-400"
              >
                <span className="text-base leading-none">☎</span>
                Call Now
              </a>
            </div>

            <button
              type="button"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            >
              <span className="text-xl leading-none">{mobileOpen ? "✕" : "☰"}</span>
            </button>
          </div>

          {mobileOpen && (
            <div className="border-t border-white/10 bg-slate-950/95 lg:hidden">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5">
                {navLinks.map((item) => (
                  {item.href.startsWith("http") ? (
  <a
    key={item.label}
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium text-white/75 hover:text-white"
  >
    {item.label}
  </a>
) : (
  <Link
    key={item.label}
    href={item.href}
    className="text-sm font-medium text-white/75 hover:text-white"
  >
    {item.label}
  </Link>
)}
                ))}

                <Link
                  href="/proposal"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950"
                >
                  Request Proposal
                </Link>

                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-500 px-4 py-3 text-sm font-semibold text-slate-950"
                >
                  <span className="text-base leading-none">☎</span>
                  Call Now
                </a>
              </div>
            </div>
          )}
        </header>

        <main className="relative">
          <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8 lg:pb-24 lg:pt-24">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Florida property management built for boards that expect more.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                Proactive systems, stronger accountability, and faster response times built for modern HOA and condo boards.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/proposal"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01]"
                >
                  Request Proposal
                  <span>→</span>
                </Link>

                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-yellow-500/30 bg-transparent px-6 py-4 text-base font-semibold text-yellow-300 transition hover:border-yellow-400/40 hover:bg-yellow-500/10"
                >
                  <span className="text-base leading-none">☎</span>
                  Call Now
                </a>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-white/10 bg-slate-900/70 p-6"
                >
                  <div className="text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
                What sets us apart
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                A more disciplined, proactive, and intelligent management model.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                We are building a system-driven company designed to help boards feel supported, informed, and confident in the execution.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {pillars.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-yellow-400/20 hover:bg-white/[0.07]"
                >
                  <div className="inline-flex rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-yellow-300">
                    ✦
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-white/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-y border-white/10 bg-slate-900/50">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
                  Why communities switch
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Boards usually start looking when the basics are no longer getting done well.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/70">
                  The decision to change management usually comes after a pattern: repeated delays, weak visibility, inconsistent execution, and a board that no longer feels supported.
                </p>

                <div className="mt-8">
                  <Link
                    href="/why-switch"
                    className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-yellow-400"
                  >
                    Explore Why Switch
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-yellow-300">✓</span>
                      <p className="text-sm leading-6 text-white/75">{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
                  Services
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Management support built around execution, responsiveness, and board confidence.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/70">
                  We help associations operate more effectively with stronger systems, clearer communication, and more disciplined follow-through.
                </p>

                <div className="mt-8">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                  >
                    View Services
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <div className="grid gap-6">
                {servicesPreview.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-yellow-400/20 hover:bg-white/[0.07]"
                  >
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-base leading-7 text-white/70">{service.text}</p>
                    <div className="mt-5 text-sm font-semibold text-yellow-300">
                      Learn more →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
                  Coverage
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Focused on South Florida communities that need responsive leadership.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {serviceAreas.map((area) => (
                  <Link
                    key={area.title}
                    href={area.href}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-white/[0.07]"
                  >
                    <div className="text-lg font-semibold text-white">
                      {area.title}
                    </div>

                    <div className="mt-3 text-sm leading-7 text-white/65">
                      {area.text}
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300">
                      Explore →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/15 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-yellow-950/20 lg:p-12">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-400">
                  Start the conversation
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  If your board is considering a change, let’s talk.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/70">
                  Whether your community needs better responsiveness, stronger systems, or a more proactive operating partner, this is the next step.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-yellow-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-yellow-400"
                >
                  <span className="text-base leading-none">☎</span>
                  Call Now
                </a>

                <Link
                  href="/proposal"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Request Proposal
                  <span>→</span>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-slate-950/80">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-white/55 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              © {new Date().getFullYear()} Stoutt Property Management. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Link href="/services" className="transition hover:text-white">
                Services
              </Link>
              <Link href="/coverage" className="transition hover:text-white">
                Coverage
              </Link>
              <Link href="/proposal" className="transition hover:text-white">
                Proposal
              </Link>
              <a
                href={PHONE_NUMBER_HREF}
                className="inline-flex items-center gap-2 font-medium text-yellow-300 transition hover:text-yellow-200"
              >
                <span className="text-base leading-none">☎</span>
                {PHONE_NUMBER_DISPLAY}
              </a>
            </div>
          </div>
        </footer>

        <a
          href={PHONE_NUMBER_HREF}
          aria-label="Call Now"
          className="fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500 text-slate-950 shadow-2xl shadow-yellow-950/30 transition hover:scale-105 lg:hidden"
        >
          <span className="text-2xl leading-none">☎</span>
        </a>
      </div>
    </>
  );
}

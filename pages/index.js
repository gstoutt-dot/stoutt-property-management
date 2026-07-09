import React, { useState } from "react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [boardMenuOpen, setBoardMenuOpen] = useState(false);

  const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Alignment", href: "/alignment" },
  { label: "Why Switch", href: "/why-switch" },
  { label: "BOSai Library", href: "/bosai-legacy-library" },
  { label: "About Us", href: "/about-us" },
  { label: "Founder", href: "https://glennstoutt.com", external: true },
  { label: "Collections", href: "/collections" },
  { label: "Coverage", href: "/coverage" },
];
  const boardEducationLinks = [
  { href: "/board-education", label: "Education & Compliance" },
  { href: "/board-workshops", label: "Board Workshops" },
  { href: "/compliance-alerts", label: "Compliance Alerts" },

  {
    href: "/florida-board-education-requirements",
    label: "Florida Education Requirements"
  },

  {
    href: "/florida-condo-law-updates-2024-2025",
    label: "Florida Condo Law Updates 2024–2025"
  },

  {
    href: "/board-fiduciary-duties",
    label: "Board Fiduciary Duties"
  },

  {
    href: "/reserve-studies-sirs-guide",
    label: "Reserve Studies & SIRS Guide"
  },

  {
    href: "/milestone-inspection-guide",
    label: "Milestone Inspection Guide"
  },

  {
    href: "/vendor-selection-procurement-guide",
    label: "Vendor Selection & Procurement Guide"
  },

  {
    href: "/official-records-guide",
    label: "Official Records Guide"
  },
];

  const selectedProperties = [
    {
      image: "/bocawest.jpeg",
      title: "Luxury Residential Community",
      text: "Curated environments shaped by high standards, disciplined oversight, and long-term property value protection.",
    },
    {
      image: "/environtowers2.jpeg",
      title: "High-Rise Condominium Setting",
      text: "Experience across larger condominium environments where visibility, consistency, and operational follow-through matter.",
    },
    {
      image: "/hoapic2.jpg",
      title: "HOA Community Environment",
      text: "Board-focused support built around responsiveness, accountability, and a proactive management structure.",
    },
    {
      image: "/condo.jpeg",
      title: "South Florida Condominium Property",
      text: "Real communities and real-world property experience informing the service model behind Stoutt Property Management.",
    },
  ];

  const premiumCard =
    "rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(234,179,8,0.06),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/40 hover:bg-white/[0.07] hover:shadow-[0_0_0_1px_rgba(234,179,8,0.14),0_0_40px_rgba(234,179,8,0.18)]";

  const premiumButton =
    "rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-3.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(234,179,8,0.32)]";

  const subtleButton =
    "inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/5";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-0 top-[20%] h-[420px] w-[420px] rounded-full bg-amber-300/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-0 h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
    <a href="/" className="flex min-w-[300px] items-center">
      <img
        src="/logo.png"
        alt="Stoutt Property Management"
        className="h-36 w-auto object-contain lg:h-40"
      />
    </a>

    <nav className="hidden items-center gap-2 xl:flex">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? "_blank" : "_self"}
          rel={link.external ? "noopener noreferrer" : undefined}
          className="whitespace-nowrap rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
        >
          {link.label}
        </a>
      ))}

      <div className="relative">
  <button
    type="button"
    onClick={() => setBoardMenuOpen((prev) => !prev)}
    className="whitespace-nowrap rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
    aria-expanded={boardMenuOpen}
  >
    Board Resources ▾
  </button>

  {boardMenuOpen && (
    <div className="absolute left-0 top-full z-50 mt-3 w-64 rounded-3xl border border-yellow-400/20 bg-slate-950/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      {boardEducationLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={() => setBoardMenuOpen(false)}
          className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {item.label}
        </a>
      ))}
    </div>
  )}
</div>

            <a
        href="/admin-login"
        className="ml-2 whitespace-nowrap rounded-full border border-amber-400/40 bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
      >
        Homeowner Access
      </a>

      <a
  href="/admin-login"
  className="ml-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/85 transition hover:border-yellow-400/40 hover:bg-white/10 hover:text-yellow-200"
>
  Admin Access
</a>

      <a
        href="tel:+17546004755"
        className="ml-2 whitespace-nowrap rounded-full border border-yellow-400/30 bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(234,179,8,0.28)]"
      >
        Call Now
      </a>
    </nav>

    <button
      type="button"
      aria-label="Toggle menu"
      onClick={() => setMobileOpen(!mobileOpen)}
className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10 xl:hidden"    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {mobileOpen ? (
          <path d="M6 6l12 12M18 6L6 18" />
        ) : (
          <>
            <path d="M3 6h18" />
            <path d="M3 12h18" />
            <path d="M3 18h18" />
          </>
        )}
      </svg>
    </button>
  </div>

  {mobileOpen && (
    <div className="max-h-[calc(100vh-96px)] overflow-y-auto border-t border-white/10 bg-slate-950/98 backdrop-blur-xl xl:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 sm:px-6">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? "_blank" : "_self"}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}

                {boardEducationLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </a>
        ))}

        <a
  href="/admin-login"
  className="rounded-2xl border border-amber-400/40 bg-amber-400 px-4 py-3 text-center text-sm font-semibold text-slate-950"
  onClick={() => setMobileOpen(false)}
>
  Homeowner Access
</a>

<a
  href="/admin-login"
  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white/85 transition hover:border-yellow-400/40 hover:bg-white/10 hover:text-yellow-200"
  onClick={() => setMobileOpen(false)}
>
  Admin Access
</a>

<a
  href="/proposal"
  className="rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.18)]"
  onClick={() => setMobileOpen(false)}
>
  Request a Proposal
</a>
      </div>
    </div>
  )}
</header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-16 lg:px-8 lg:pb-12 lg:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-6 flex justify-center">
                <div className="inline-flex max-w-[900px] justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-200 sm:text-xs">
                    Redefining Property Management Through Experience, Intelligent
                    Systems and Being Proactive
                  </span>
                </div>
              </div>

              <div className="mb-8 flex justify-center">
                <img
                  src="/logo.png"
                  alt="Stoutt Property Management"
                  className="h-48 w-auto object-contain sm:h-56 lg:h-64 xl:h-72"
                />
              </div>

              <h1 className="max-w-5xl text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl xl:text-6xl">
  We didn't build software to start a technology company.
  <span className="mt-4 block text-yellow-300">
    We built it to become a better management company.
  </span>
</h1>

<p className="mt-6 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
  After more than <span className="text-yellow-300 font-semibold">36 years</span> 
   serving community associations, we came to one unavoidable conclusion:
  the industry's software wasn't keeping pace with the responsibilities
  boards and managers now face. Rather than adapting our standards to fit
  existing technology, we built <span className="text-yellow-300 font-semibold">
  BOSai Software℠</span>—an intelligent operating system designed around the
  real work of protecting communities. Today, Stoutt Property Management
  combines experienced leadership with intelligent systems built from decades
  of real-world community management.
</p>

              <div className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  ["82", "Associations Managed"],
                  ["$500M+", "Assets Overseen"],
                  ["20,000+", "Lives Impacted"],
                  ["24/7", "Systems-Driven Response"],
                ].map(([value, label]) => (
                  <div key={label} className={`${premiumCard} p-5`}>
                    <div className="text-2xl font-semibold text-yellow-300">
                      {value}
                    </div>
                    <div className="mt-1 text-sm leading-6 text-yellow-100/90">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-yellow-400/10 to-transparent blur-2xl" />
              <div className="relative flex flex-col items-center gap-4">
                <div
                  className={`${premiumCard} relative w-full p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8`}
                >
                  <div className="rounded-[1.5rem] border border-yellow-400/15 bg-slate-900/85 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium uppercase tracking-[0.18em] text-yellow-300/85">
                          Board Confidence Dashboard
                        </div>
                        <div className="mt-1 text-xl font-semibold text-yellow-200">
                          Proactive. Responsive. Systems-Driven.
                        </div>
                      </div>
                      <div className="h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_20px_rgba(253,224,71,0.7)]" />
                    </div>

                    <div className="space-y-4">
                      {[
                        "Faster communication and follow-through",
                        "Missed items identified before they become problems",
                        "Stronger collections at no extra charge",
                        "A more responsive board-management relationship",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-yellow-400/15 bg-white/[0.04] p-4 shadow-[0_0_20px_rgba(234,179,8,0.06)]"
                        >
                          <div className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-300" />
                          <p className="text-sm leading-7 text-yellow-100/90">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-yellow-400/25 bg-yellow-400/10 p-4 shadow-[0_0_24px_rgba(234,179,8,0.10)]">
                      <p className="text-sm leading-7 text-yellow-100">
                        Built for associations that want experienced leadership,
                        better systems, and a management company that acts before
                        small issues become expensive ones.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative -mt-3 flex w-full justify-center sm:-mt-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-[260px] w-[260px] rounded-full bg-yellow-400/10 blur-3xl sm:h-[320px] sm:w-[320px]" />
                  </div>

                  <img
                    src="/logo.png"
                    alt="Stoutt Property Management"
                    className="relative w-full max-w-[520px] object-contain sm:max-w-[580px] lg:max-w-[640px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-yellow-400/10 bg-black/30 py-20 sm:py-24 lg:py-28">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
          The BOSai℠ Legacy Library
        </div>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Five volumes. One philosophy. Leadership before technology.
        </h2>

        <p className="mt-6 text-lg leading-8 text-white/70">
          The BOSai℠ Legacy Library is a five-volume professional collection
          documenting the leadership principles, operational frameworks,
          financial intelligence systems, enterprise management models, and
          legacy philosophy behind the BOSai℠ ecosystem.
        </p>

        <p className="mt-5 text-lg leading-8 text-white/70">
          These volumes support the software, the service model, and the
          management philosophy behind Stoutt Property Management.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a href="/bosai-legacy-library" className={premiumButton}>
            Explore The Library
          </a>

          <a
            href="https://glennstoutt.com"
            target="_blank"
            rel="noopener noreferrer"
            className={subtleButton}
          >
            Visit Founder Site
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[360px] w-[360px] rounded-full bg-yellow-400/10 blur-3xl" />
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
          <img
            src="/5-vol-library.png"
            alt="The BOSai Legacy Library Five Volume Set"
            className="w-full rounded-[1.5rem] object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</section>

        <section className="border-y border-white/10 bg-white/[0.03] py-20 sm:py-24 lg:py-28">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">

      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300">
          Alignment
        </div>

        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Better educated boards make better governed communities.
        </h2>

        <p className="mt-6 text-lg leading-8 text-white/70">
          Our Board Alignment Process helps boards understand fiduciary
          responsibilities, improve decision-making, reduce friction,
          and create stronger operational relationships before problems begin.
        </p>

        <p className="mt-5 text-lg leading-8 text-white/70">
          This is not simply how we manage communities.
          It is the philosophy behind how we help boards govern well.
        </p>

        <div className="mt-8">
          <a
            href="/alignment"
            className="inline-flex items-center rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
          >
            Explore Our Board Alignment Process
          </a>
        </div>
      </div>

      <div className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-8 sm:p-10">
        <div className="grid gap-5">

          {[
            "Establish Responsibilities",
            "Define Protection Protocols",
            "Create Operational Alignment",
            "Reduce Friction Before It Forms",
            "Build Better Communities Through Better Governance",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-yellow-100/90"
            >
              {item}
            </div>
          ))}

        </div>
      </div>

    </div>

  </div>
</section>

                      <section className="border-y border-yellow-400/10 bg-black/30 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
                Why BOSai Software℠ Exists
              </div>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Experience taught me that protecting communities requires more
                than good intentions.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/70">
                Following the tragic Surfside condominium collapse, community
                association management changed forever. Today&apos;s boards and
                managers are expected to navigate structural integrity reserve
                studies, milestone inspections, engineering reports, reserve
                funding, major restoration projects, insurance recovery, and an
                ever-growing body of legislation designed to better protect
                Florida&apos;s communities.
              </p>

              <p className="mt-5 text-lg leading-8 text-white/70">
                Long before these issues became statewide priorities, Glenn
                Stoutt had already spent years leading complex building
                restoration, insurance recovery, engineering coordination, and
                capital improvement projects for the communities under his care.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              <div className={premiumCard + " p-7"}>
                <div className="text-4xl font-semibold text-yellow-300">
                  $25M+
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Restoration Oversight
                </h3>
                <p className="mt-4 text-sm leading-7 text-yellow-100/90">
                  Following Hurricane Andrew, Glenn assembled multidisciplinary
                  teams of architects, engineers, contractors, consultants,
                  attorneys, insurance specialists, and restoration
                  professionals to oversee more than $25 million in building
                  restoration and remediation projects.
                </p>
              </div>

              <div className={premiumCard + " p-7"}>
                <div className="text-4xl font-semibold text-yellow-300">
                  36+
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Years of Experience
                </h3>
                <p className="mt-4 text-sm leading-7 text-yellow-100/90">
                  BOSai Software℠ was not created from theory. It was shaped by
                  decades of hands-on property management, architectural
                  understanding, construction awareness, and real community
                  leadership.
                </p>
              </div>

              <div className={premiumCard + " p-7"}>
                <div className="text-4xl font-semibold text-yellow-300">
                  BOSai℠
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  Built From the Work
                </h3>
                <p className="mt-4 text-sm leading-7 text-yellow-100/90">
                  After meeting with many of the largest property management
                  software companies several months ago, Glenn reached one
                  conclusion: great managers should not have to adapt to
                  software. Software should support the way exceptional
                  management is actually performed.
                </p>
              </div>
            </div>

            <div className="mx-auto mt-12 max-w-5xl rounded-[2rem] border border-yellow-400/20 bg-yellow-400/10 p-8 text-center shadow-[0_0_40px_rgba(234,179,8,0.12)] sm:p-10">
              <p className="text-2xl font-semibold leading-10 text-yellow-100 sm:text-3xl">
                Great communities deserve software that performs as well as the
                professionals entrusted to protect them.
              </p>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/70">
                BOSai Software℠ was created to support the real work of
                protecting communities — bringing governance, communication,
                financial transparency, engineering awareness, operational
                workflows, and intelligent systems together in one environment.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="https://bosaisoftware.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={premiumButton}
                >
                  Discover Why BOSai Software Exists
                </a>

                <a
                  href="https://www.glennstoutt.com/story.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={subtleButton}
                >
                  Read Glenn&apos;s Story
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Hands-On Leadership",
                text: "Experienced oversight, stronger accountability, and a more direct relationship with your board.",
              },
              {
                title: "Intelligent Systems",
                text: "Technology that accelerates communication, tracking, follow-up, and operational clarity.",
              },
              {
                title: "Proactive Management",
                text: "A management approach built to identify issues early and keep communities moving forward.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${premiumCard} bg-gradient-to-b from-white/8 to-white/[0.03] p-7`}
              >
                <h3 className="text-2xl font-semibold text-yellow-300">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-yellow-100/90">
                  {item.text}
                </p>
                <a
                  href="/services"
                  className="mt-6 inline-flex text-sm font-semibold text-yellow-300 transition-all duration-300 hover:text-yellow-200"
                >
                  Explore
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[320px] w-[320px] rounded-full bg-yellow-400/10 blur-3xl" />
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                <img
                  src="/cessna414.jpeg"
                  alt="Founder flying to meetings"
                  className="h-[420px] w-full object-cover object-[75%_center] sm:object-[65%_center] transition duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
                Founder-led
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Leadership that shows up.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                Stoutt Property Management is built on hands-on leadership,
                discipline, and a level of accountability that boards can rely
                on. This is not a layered corporate structure — it is direct,
                experienced oversight backed by systems designed to execute.
              </p>

              <p className="mt-4 text-base leading-8 text-white/70">
                When service matters, responsiveness is not limited by distance —
                it is driven by commitment.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://glennstoutt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300"
                >
                  Meet the Founder
                </a>

                <a
                  href="/proposal"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:bg-white/5"
                >
                  Request a Proposal
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-yellow-400/10 bg-black/30 py-24 sm:py-28 lg:py-32">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

    <div className="mx-auto max-w-5xl text-center">

      <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
        Why I Built BOSai Software℠
      </div>

      <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Experience taught me that protecting communities requires
        better tools.
      </h2>

      <p className="mt-8 text-xl leading-9 text-white/70">
        Following the tragic Surfside condominium collapse,
        community association management entered an entirely new era.
        Boards and property managers are now expected to navigate
        structural integrity reserve studies (SIRS), milestone inspections,
        engineering reports, reserve funding, insurance recovery,
        major restoration projects, and an ever-growing body of legislation
        designed to better protect Florida's communities.
      </p>

    </div>

    <div className="mt-20 grid gap-8 lg:grid-cols-3">

      <div className={premiumCard + " p-8"}>

        <div className="text-5xl font-semibold text-yellow-300">
          $25M+
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-white">
          Restoration Leadership
        </h3>

        <p className="mt-5 text-base leading-8 text-yellow-100/90">
          Following Hurricane Andrew, Glenn Stoutt assembled architects,
          engineers, contractors, consultants, attorneys,
          insurance specialists and restoration professionals to oversee
          more than $25 million in community restoration and remediation
          projects.
        </p>

      </div>

      <div className={premiumCard + " p-8"}>

        <div className="text-5xl font-semibold text-yellow-300">
          36+
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-white">
          Years Serving Communities
        </h3>

        <p className="mt-5 text-base leading-8 text-yellow-100/90">
          Long before today's legislation,
          Glenn had already spent decades working with construction,
          architecture, engineering, landscape design,
          restoration, insurance recovery,
          budgeting and operational leadership throughout South Florida.
        </p>

      </div>

      <div className={premiumCard + " p-8"}>

        <div className="text-5xl font-semibold text-yellow-300">
          BOSai℠
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-white">
          Built From Experience
        </h3>

        <p className="mt-5 text-base leading-8 text-yellow-100/90">
          Several months ago Glenn met with many of the largest property
          management software companies in America.
          After countless demonstrations he reached one conclusion:
          the software expected great managers to adapt to technology
          instead of technology adapting to great management.
        </p>

      </div>

    </div>

    <div className="mx-auto mt-20 max-w-6xl rounded-[2rem] border border-yellow-400/20 bg-gradient-to-b from-yellow-400/10 to-transparent p-10 text-center shadow-[0_0_50px_rgba(234,179,8,0.15)]">

      <h3 className="text-3xl font-semibold leading-tight text-yellow-200 sm:text-4xl">
        Great communities deserve software that performs
        as well as the professionals entrusted to protect them.
      </h3>

      <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-white/70">

        BOSai Software℠ was never intended to become another property
        management platform.

        It was created as an intelligent operating system built around
        the real work of protecting communities —
        bringing governance, communication,
        financial transparency, engineering awareness,
        operational excellence and artificial intelligence together
        into one integrated environment.

      </p>

      <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-white/70">

        Today, Stoutt Property Management uses BOSai Software℠ every day
        because it reflects the same philosophy that has guided our company
        for more than three decades:

      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        {[
          "Integrity",
          "Preparation",
          "Transparency",
          "Communication",
          "Accountability",
          "Leadership",
        ].map((item) => (

          <div
            key={item}
            className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-6 py-3 text-sm font-semibold tracking-wide text-yellow-100"
          >
            {item}
          </div>

        ))}

      </div>

      <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">

        <a
          href="https://bosaisoftware.com"
          target="_blank"
          rel="noopener noreferrer"
          className={premiumButton}
        >
          Discover BOSai Software℠
        </a>

        <a
          href="https://www.glennstoutt.com/story.html"
          target="_blank"
          rel="noopener noreferrer"
          className={subtleButton}
        >
          Read Glenn's Story
        </a>

      </div>

    </div>

  </div>
</section>

                <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
                Selected properties
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Curated examples of real property environments behind the standard.
              </h2>

              <p className="mt-5 text-base leading-8 text-white/70">
                A controlled glimpse into the types of communities and property settings
                that have shaped the operating discipline behind Stoutt Property Management.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {selectedProperties.map((property) => (
              <div
                key={property.title}
                className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-yellow-300/40 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(250,204,21,0.12)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-[240px] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white transition group-hover:text-yellow-200">
                    {property.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/70 transition group-hover:text-yellow-100/90">
                    {property.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="/proposal" className={premiumButton}>
              Request a Proposal
            </a>

            <a href="/admin-login" className={subtleButton}>
              Homeowner Access
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div
            className={`${premiumCard} p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-10 lg:p-12`}
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300/80">
                  Next step
                </div>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  If your community is ready for a more responsive management
                  partner, let’s talk.
                </h2>

                <p className="mt-5 text-base leading-8 text-yellow-100/90 sm:text-lg">
                  Request a proposal and start the conversation with a company
                  built for stronger service, better systems, and long-term
                  stewardship.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <a href="/proposal" className={premiumButton}>
                  Request a Proposal
                </a>

                <a href="/admin-login" className={subtleButton}>
                  Homeowner Access
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
















import React, { useState } from "react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false); 

  const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Why Switch", href: "/why-switch" },
  { label: "Founder", href: "https://glennstoutt.com", external: true },
  { label: "Collections", href: "/collections" },
  { label: "Coverage", href: "/coverage" },
  { label: "Proposal", href: "/proposal" },
];

  const premiumCard =
    "rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(234,179,8,0.06),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/40 hover:bg-white/[0.07] hover:shadow-[0_0_0_1px_rgba(234,179,8,0.14),0_0_40px_rgba(234,179,8,0.18)]";

  const premiumButton =
    "rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-3.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_45px_rgba(234,179,8,0.32)]";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-0 top-[20%] h-[420px] w-[420px] rounded-full bg-amber-300/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-0 h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center">
  <img
    src="/logo.png"
    alt="Stoutt Property Management"
    className="h-20 w-auto object-contain"
  />
</a>
          
      <nav className="hidden items-center gap-2 lg:flex">
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

  <a
    href="/proposal"
    className="ml-2 whitespace-nowrap rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(234,179,8,0.28)]"
  >
    Request a Proposal
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10 lg:hidden"
          >
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
          <div className="border-t border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden">
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
              <a
                href="/proposal"
                className="mt-2 rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(234,179,8,0.18)]"
                onClick={() => setMobileOpen(false)}
              >
                Request a Proposal
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
            <div className="max-w-3xl">
  <div className="mb-8">
    <img
      src="/logo.png"
      alt="Stoutt Property Management"
      className="h-40 w-auto object-contain sm:h-48 lg:h-56"
    />
  </div>

  <div className="mb-6 inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-3">
    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300 sm:text-sm">
      Redefining Property Management Through Experience, Intelligent Systems and Being Proactive
    </span>
  </div>

  <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
    Florida premier property management built for boards that expect more.
  </h1>

  <p className="mt-8 max-w-2xl text-lg leading-8 text-white/75 sm:text-xl">
    Stoutt Property Management delivers a higher standard of HOA and condominium association management through deep experience, faster execution, stronger follow-through, and intelligent systems that keep communities running smoothly.
  </p>
</div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
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
              <div
                className={`${premiumCard} relative p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-8`}
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
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300/80">
              Why communities switch
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Boards do not change management companies lightly.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
              They switch when response times slow down, inspections are missed,
              collections lose momentum, and trust begins to erode. That is
              where Stoutt Property Management is built to be different.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Slow Response Times",
                text: "Questions linger, follow-through slips, and boards are left waiting too long for answers.",
              },
              {
                title: "Missed Inspections",
                text: "Small issues go unnoticed until they become larger operational or financial problems.",
              },
              {
                title: "Weak Collections",
                text: "Delinquency follow-up lacks consistency, urgency, and process discipline.",
              },
              {
                title: "High Turnover",
                text: "Communities lose continuity when staff changes constantly and relationships never deepen.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${premiumCard} p-6 hover:-translate-y-1`}
              >
                <h3 className="text-xl font-semibold text-yellow-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-yellow-100/90">
                  {item.text}
                </p>
              </div>
            ))}
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
  <a href="tel:+17546004755" className={premiumButton}>
    Call Now
  </a>
</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


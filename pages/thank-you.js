import React, { useState } from "react";

export default function ThankYouPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Why Switch", href: "/why-switch" },
    { label: "Founder", href: "/founder" },
    { label: "Coverage", href: "/coverage" },
    { label: "Proposal", href: "/proposal" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-0 top-[18%] h-[420px] w-[420px] rounded-full bg-amber-300/5 blur-3xl" />
        <div className="absolute left-0 bottom-[10%] h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/25 bg-white/5 shadow-[0_0_30px_rgba(234,179,8,0.08)] transition-all duration-300 group-hover:border-yellow-400/50 group-hover:bg-white/10">
              <span className="text-lg font-semibold tracking-[0.2em] text-yellow-300">
                S
              </span>
            </div>
            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-[0.28em] text-yellow-300/80">
                Florida HOA & Condo Management
              </div>
              <div className="text-base font-semibold text-white sm:text-lg">
                Stoutt Property Management
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-white/80 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/5 hover:text-white hover:shadow-[0_0_20px_rgba(234,179,8,0.12)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/proposal"
              className="ml-2 rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(234,179,8,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(234,179,8,0.28)]"
            >
              Request a Proposal
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
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-yellow-400/10 to-transparent blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 lg:p-8">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 sm:p-10 lg:p-12">
                  <div className="mx-auto max-w-3xl text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-yellow-400/25 bg-yellow-400/10 shadow-[0_0_40px_rgba(234,179,8,0.12)]">
                      <svg
                        className="h-10 w-10 text-yellow-300"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>

                    <div className="mt-6 inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-yellow-200">
                      Proposal Request Received
                    </div>

                    <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
                      Thank you. Your request has been received.
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
                      You’ve taken the right next step. We’ll review your
                      community details and follow up with a thoughtful,
                      tailored response regarding your association’s management
                      needs.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {[
                      {
                        title: "Reviewed Personally",
                        text: "Your request is not dropped into a cold generic system. We review every community inquiry with care and intent.",
                      },
                      {
                        title: "Tailored Follow-Up",
                        text: "We look at your association’s needs, priorities, and service expectations before responding.",
                      },
                      {
                        title: "Professional Next Steps",
                        text: "Our goal is clarity, responsiveness, and a proposal process that reflects the level of service you expect.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:border-yellow-400/35 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(234,179,8,0.12)]"
                      >
                        <h2 className="text-lg font-semibold text-white">
                          {item.title}
                        </h2>
                        <p className="mt-3 text-sm leading-7 text-white/65">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6 sm:p-7">
                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300/80">
                        What happens next
                      </div>

                      <div className="mt-6 space-y-5">
                        {[
                          [
                            "01",
                            "We review your submission and community details.",
                          ],
                          [
                            "02",
                            "We evaluate your needs, priorities, and service expectations.",
                          ],
                          [
                            "03",
                            "We follow up to discuss fit, next steps, and a tailored proposal.",
                          ],
                        ].map(([num, text]) => (
                          <div key={num} className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-sm font-semibold text-yellow-200">
                              {num}
                            </div>
                            <p className="pt-1 text-sm leading-7 text-white/75">
                              {text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 sm:p-7">
                      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300/80">
                        Why boards choose Stoutt
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        {[
                          ["82", "Associations Managed"],
                          ["$500M+", "Assets Overseen"],
                          ["24/7", "Systems-Driven Mindset"],
                          ["Proactive", "Service Approach"],
                        ].map(([value, label]) => (
                          <div
                            key={label}
                            className="rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                          >
                            <div className="text-2xl font-semibold text-white">
                              {value}
                            </div>
                            <div className="mt-1 text-sm leading-6 text-white/60">
                              {label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <p className="mt-5 text-sm leading-7 text-white/65">
                        Built for associations that want experienced leadership,
                        intelligent systems, stronger follow-through, and a more
                        proactive management relationship.
                      </p>
                    </div>
                  </div>

                 <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
  <a
    href="https://calendly.com/YOUR-LINK"
    className="rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-3.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(234,179,8,0.3)]"
  >
    Schedule a Conversation Now
  </a>

  <a
    href="/"
    className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-yellow-400/30 hover:bg-white/10"
  >
    Return to Homepage
  </a>
</div>

                  <p className="mt-6 text-center text-xs leading-6 text-white/45">
                    We appreciate the opportunity to learn more about your
                    community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

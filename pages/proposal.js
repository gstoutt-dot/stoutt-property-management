import React, { useState } from "react";

export default function ProposalPage() {
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
            {navLinks.map((link) => {
              const isActive = link.href === "/proposal";
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-yellow-400/30 bg-white/5 text-white shadow-[0_0_20px_rgba(234,179,8,0.12)]"
                      : "border border-transparent text-white/80 hover:border-yellow-400/30 hover:bg-white/5 hover:text-white hover:shadow-[0_0_20px_rgba(234,179,8,0.12)]"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
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
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    link.href === "/proposal"
                      ? "border-yellow-400/30 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/85 hover:border-yellow-400/30 hover:bg-white/10"
                  }`}
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
        <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="grid items-start gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-yellow-200">
                Request a Proposal
              </div>

              <h1 className="text-4xl font-semibold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl">
                Start the conversation with a management company built
                differently.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
                Tell us about your association and what you are looking for. We
                will review your needs and follow up with a thoughtful, tailored
                proposal.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Experienced HOA and condominium association leadership",
                  "Proactive systems built for stronger communication and follow-through",
                  "Collections strength and operational discipline",
                  "A proposal process designed to be clear, responsive, and professional",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-300" />
                    <p className="text-sm leading-7 text-white/75">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300/80">
                  What to expect
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    ["01", "Submit your community details"],
                    ["02", "We review your needs and priorities"],
                    ["03", "We follow up and prepare a tailored proposal"],
                  ].map(([num, text]) => (
                    <div key={num} className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-sm font-semibold text-yellow-200">
                        {num}
                      </div>
                      <p className="text-sm leading-7 text-white/75">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-yellow-400/10 to-transparent blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-6 lg:p-7">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-5 sm:p-6 lg:p-7">
                  <div className="mb-6">
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] text-yellow-300/80">
                      Proposal Request Form
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                      Tell us about your association
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
                      Complete the form below and we will follow up to discuss
                      your community, current challenges, and the level of
                      support you need.
                    </p>
                  </div>

                  <form
                    action="https://formspree.io/f/mwvwywgp"
                    method="POST"
                    className="space-y-5"
                  >
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Title / Role
                        </label>
                        <input
                          type="text"
                          name="role"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Board member, president, manager, etc."
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="(000) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Association Name
                        </label>
                        <input
                          type="text"
                          name="associationName"
                          required
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Community / association name"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Community Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="City / County"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Property Type
                        </label>
                        <select
                          name="propertyType"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          defaultValue=""
                        >
                          <option value="" className="bg-slate-900 text-white">
                            Select one
                          </option>
                          <option value="Condominium" className="bg-slate-900 text-white">
                            Condominium
                          </option>
                          <option value="HOA" className="bg-slate-900 text-white">
                            HOA
                          </option>
                          <option value="Townhome" className="bg-slate-900 text-white">
                            Townhome
                          </option>
                          <option value="Mixed Community" className="bg-slate-900 text-white">
                            Mixed Community
                          </option>
                          <option value="Other" className="bg-slate-900 text-white">
                            Other
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white/80">
                          Number of Units
                        </label>
                        <input
                          type="text"
                          name="units"
                          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                          placeholder="Approximate number of units"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Services Needed
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {[
                          "Full Service Management",
                          "Financial Management",
                          "Collections Support",
                          "Board Guidance",
                          "Operational Oversight",
                          "Proposal Review / Transition Help",
                        ].map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition-all duration-300 hover:border-yellow-400/30 hover:bg-white/10"
                          >
                            <input
                              type="checkbox"
                              name="servicesNeeded"
                              value={item}
                              className="h-4 w-4 rounded border-white/20 bg-transparent accent-yellow-400"
                            />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Current Challenges / What You’re Looking For
                      </label>
                      <textarea
                        name="message"
                        rows={6}
                        required
                        className="w-full rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                        placeholder="Tell us about your community, current management concerns, response issues, collections needs, service expectations, or anything else you would like us to know."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Best Time to Contact You
                      </label>
                      <input
                        type="text"
                        name="bestTime"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-yellow-400/40 focus:bg-white/10"
                        placeholder="Morning, afternoon, specific days, etc."
                      />
                    </div>

                    <input
                      type="hidden"
                      name="_subject"
                      value="New Proposal Request - Stoutt Property Management"
                    />
<input
  type="hidden"
  name="_next"
  value="https://stouttmgmt.com/thank-you"
/>
                    <button
                      type="submit"
                      className="w-full rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-4 text-center text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_0_45px_rgba(234,179,8,0.3)] active:scale-[0.99]"
                    >
                      Submit Proposal Request
                    </button>

                    <p className="text-center text-xs leading-6 text-white/45">
                      Your information is kept confidential and used only to
                      review your request and follow up regarding management
                      services.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Professional First Impression",
                text: "Your proposal page should feel as strong and credible as the service you intend to deliver.",
              },
              {
                title: "Clear Intake Structure",
                text: "The form captures the essential information without feeling cold, heavy, or overwhelming.",
              },
              {
                title: "Built to Convert",
                text: "This page supports trust, clarity, and momentum so interested boards actually take the next step.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-7 transition-all duration-300 hover:border-yellow-400/35 hover:shadow-[0_0_30px_rgba(234,179,8,0.12)]"
              >
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/65">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

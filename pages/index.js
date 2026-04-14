import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import {
  Phone,
  Menu,
  X,
  ArrowRight,
  Building2,
  ShieldCheck,
  Brain,
  Users,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const PHONE_NUMBER_DISPLAY = "(754) 600-4755";
  const PHONE_NUMBER_HREF = "tel:+17546004755";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Founder", href: "/founder" },
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
      icon: Building2,
      title: "Operational Excellence",
      text: "Responsive, structured management systems that help boards regain confidence and control.",
    },
    {
      icon: Brain,
      title: "Intelligent Systems",
      text: "AI-powered support, faster communication, and streamlined execution across daily operations.",
    },
    {
      icon: ShieldCheck,
      title: "Steady Leadership",
      text: "Experienced oversight with the discipline, follow-through, and accountability communities expect.",
    },
  ];

  const reasons = [
    "Slow response times from management",
    "Missed inspections and inconsistent follow-through",
    "Weak collections process and lack of urgency",
    "High staff turnover and constant re-explaining",
    "No real relationship-building with the board",
    "Too much reactivity and not enough proactive leadership",
  ];

  const serviceAreas = [
    "Broward County",
    "Miami-Dade County",
    "Palm Beach County",
  ];

  return (
    <>
      <Head>
        <title>Stoutt Property Management | Florida HOA & Condo Management</title>
        <meta
          name="description"
          content="Stoutt Property Management helps Florida condominium and HOA boards with proactive management, intelligent systems, and experienced leadership."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.14),transparent_20%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.9),rgba(2,6,23,1))]" />
          <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-white/5 shadow-[0_0_40px_rgba(6,182,212,0.18)]">
                <span className="text-sm font-semibold tracking-[0.2em] text-cyan-300">
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
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/75 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/proposal"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/10"
              >
                Request a Proposal
              </Link>

              <a
                href={PHONE_NUMBER_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-300"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>

            <button
              type="button"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileOpen && (
            <div className="border-t border-white/10 bg-slate-950/95 lg:hidden">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="/proposal"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950"
                >
                  Request a Proposal
                </Link>

                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </div>
            </div>
          )}
        </header>

        <main className="relative">
          {/* Hero */}
          <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-24">
            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200">
                  <ShieldCheck className="h-4 w-4" />
                  Redefining Property Management Through Experience, Intelligent Systems and Being Proactive
                </div>

                <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Florida property management built for boards that expect more.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                  Stoutt Property Management helps condominium and HOA boards move
                  beyond slow response times, inconsistent follow-through, and outdated
                  management habits with a more proactive, higher-accountability model.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/proposal"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01]"
                  >
                    Request a Proposal
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={PHONE_NUMBER_HREF}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-4 text-base font-semibold text-cyan-200 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>

                <div className="mt-10 flex items-center gap-3 text-sm text-white/60">
                  <MapPin className="h-4 w-4 text-cyan-300" />
                  Serving Broward, Miami-Dade, and Palm Beach counties
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-6 rounded-[2rem] bg-cyan-400/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/40 backdrop-blur-sm">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-cyan-200">
                        Why boards switch
                      </div>
                      <div className="mt-1 text-2xl font-semibold text-white">
                        A stronger operating partner
                      </div>
                    </div>
                    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                      <Users className="h-6 w-6 text-cyan-300" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      "Faster communication and cleaner accountability",
                      "More proactive inspections and follow-through",
                      "Collections discipline without added confusion",
                      "A better board relationship, not just a vendor relationship",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                        <p className="text-sm leading-6 text-white/75">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-white/8 to-cyan-400/10 p-5">
                    <div className="text-sm text-white/60">Direct line</div>
                    <a
                      href={PHONE_NUMBER_HREF}
                      className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-white transition hover:text-cyan-200"
                    >
                      <Phone className="h-5 w-5 text-cyan-300" />
                      {PHONE_NUMBER_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Trust Strip */}
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

          {/* Pillars */}
          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                What sets us apart
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                A more disciplined, proactive, and intelligent management model.
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/70">
                We are building a system-driven company designed to help boards
                feel supported, informed, and confident in the execution.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.07]"
                  >
                    <div className="inline-flex rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                      <Icon className="h-6 w-6 text-cyan-300" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/70">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Why Switch */}
          <section className="border-y border-white/10 bg-slate-900/50">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-28">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Why communities switch
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Boards usually start looking when the basics are no longer getting done well.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/70">
                  The decision to change management usually comes after a pattern:
                  repeated delays, lack of visibility, inconsistent execution, and a
                  board that no longer feels supported.
                </p>

                <div className="mt-8">
                  <a
                    href={PHONE_NUMBER_HREF}
                    className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-300"
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {reasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                      <p className="text-sm leading-6 text-white/75">{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Service Area */}
          <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Coverage
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Focused on South Florida communities that need responsive leadership.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {serviceAreas.map((area) => (
                  <div
                    key={area}
                    className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
                  >
                    <div className="text-lg font-semibold text-white">{area}</div>
                    <div className="mt-2 text-sm leading-6 text-white/65">
                      HOA and condominium association management with a more proactive service model.
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/15 via-slate-900 to-slate-950 p-8 shadow-2xl shadow-cyan-950/30 lg:p-12">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Start the conversation
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  If your board is considering a change, let’s talk.
                </h2>
                <p className="mt-5 text-lg leading-8 text-white/70">
                  This homepage version now keeps the experience simple and direct:
                  one strong call to action for faster response and cleaner conversion.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={PHONE_NUMBER_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-300"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>

                <Link
                  href="/proposal"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Request a Proposal
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
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
                className="inline-flex items-center gap-2 font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                <Phone className="h-4 w-4" />
                {PHONE_NUMBER_DISPLAY}
              </a>
            </div>
          </div>
        </footer>

        {/* Floating Mobile Call Button */}
        <a
          href={PHONE_NUMBER_HREF}
          aria-label="Call Now"
          className="fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-2xl shadow-cyan-950/50 transition hover:scale-105 lg:hidden"
        >
          <Phone className="h-7 w-7" />
        </a>
      </div>
    </>
  );
}

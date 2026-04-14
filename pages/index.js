import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const PHONE_NUMBER_DISPLAY = "(954) 000-0000";
  const PHONE_NUMBER_HREF = "tel:+19540000000";

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
      title: "Operational Excellence",
      text: "Structured systems, faster response, and consistent follow-through.",
    },
    {
      title: "Intelligent Systems",
      text: "AI-supported communication and streamlined operations.",
    },
    {
      title: "Steady Leadership",
      text: "Experienced oversight boards can rely on.",
    },
  ];

  const serviceAreas = [
    {
      title: "Broward County",
      href: "/broward-county-property-management",
      text: "Management support for Broward County communities with stronger responsiveness and consistent follow-through.",
    },
    {
      title: "Miami-Dade County",
      href: "/miami-dade-county-property-management",
      text: "Association management for Miami-Dade communities that need better communication and execution.",
    },
    {
      title: "Palm Beach County",
      href: "/palm-beach-county-property-management",
      text: "Proactive HOA and condo management for Palm Beach County boards seeking reliability.",
    },
  ];

  return (
    <>
      <Head>
        <title>Stoutt Property Management</title>
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">

        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-yellow-400 font-semibold">SPM</span>
              </div>
              <div>
                <div className="text-sm text-white/60">Florida HOA & Condo</div>
                <div className="font-semibold">Stoutt Property Management</div>
              </div>
            </div>

            <nav className="hidden lg:flex gap-8">
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} className="text-white/70 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex gap-3">
              <Link href="/proposal" className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10">
                Request Proposal
              </Link>

              <a href={PHONE_NUMBER_HREF} className="px-5 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400">
                ☎ Call Now
              </a>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-xl">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>

          {mobileOpen && (
            <div className="bg-slate-950 px-6 pb-6">
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} className="block py-3 text-white/80">
                  {item.label}
                </Link>
              ))}
              <a href={PHONE_NUMBER_HREF} className="block mt-4 bg-yellow-500 text-black text-center py-3 rounded-xl">
                ☎ Call Now
              </a>
            </div>
          )}
        </header>

        {/* HERO */}
        <section className="px-6 pt-20 pb-24 max-w-7xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-semibold max-w-3xl">
            Florida property management built for boards that expect more.
          </h1>

          <p className="mt-6 text-white/70 max-w-2xl">
            Proactive systems, stronger accountability, and faster response times built for modern HOA and condo boards.
          </p>

          <div className="mt-10 flex gap-4 flex-col sm:flex-row">
            <Link href="/proposal" className="px-6 py-4 bg-white text-black rounded-full font-semibold">
              Request Proposal →
            </Link>

            <a href={PHONE_NUMBER_HREF} className="px-6 py-4 border border-yellow-500/40 rounded-full text-yellow-300">
              ☎ Call Now
            </a>
          </div>
        </section>

        {/* TRUST */}
        <section className="px-6 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustStats.map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="text-2xl font-semibold">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* PILLARS */}
        <section className="px-6 py-24 max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-4 text-white/70">{p.text}</p>
            </div>
          ))}
        </section>

        {/* COVERAGE FIXED */}
        <section className="px-6 py-24 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-yellow-400 uppercase text-sm">Coverage</p>
            <h2 className="text-3xl mt-4 font-semibold">
              Focused on South Florida communities that need responsive leadership.
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {serviceAreas.map((area) => (
              <Link
                key={area.title}
                href={area.href}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-400/40 transition"
              >
                <div className="font-semibold">{area.title}</div>
                <div className="mt-3 text-sm text-white/60">{area.text}</div>
                <div className="mt-4 text-yellow-300 text-sm font-semibold">
                  Explore →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-10 text-center">
            <h2 className="text-3xl font-semibold">
              If your board is considering a change, let’s talk.
            </h2>

            <div className="mt-6 flex justify-center gap-4 flex-col sm:flex-row">
              <a href={PHONE_NUMBER_HREF} className="px-6 py-4 bg-yellow-500 text-black rounded-full font-semibold">
                ☎ Call Now
              </a>

              <Link href="/proposal" className="px-6 py-4 border border-white/20 rounded-full">
                Request Proposal →
              </Link>
            </div>
          </div>
        </section>

        {/* FLOAT BUTTON */}
        <a
          href={PHONE_NUMBER_HREF}
          className="fixed bottom-6 right-6 bg-yellow-500 text-black w-16 h-16 flex items-center justify-center rounded-full text-xl shadow-lg lg:hidden"
        >
          ☎
        </a>

      </div>
    </>
  );
}

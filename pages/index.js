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

  return (
    <>
      <Head>
        <title>Stoutt Property Management</title>
      </Head>

      <div className="min-h-screen bg-slate-950 text-white">
        
        {/* Background */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_30%)]" />
          <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

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
              <Link
                href="/proposal"
                className="px-5 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
              >
                Request Proposal
              </Link>

              <a
                href={PHONE_NUMBER_HREF}
                className="px-5 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
              >
                ☎ Call Now
              </a>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-xl"
            >
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
        <section className="relative px-6 pt-20 pb-24 max-w-7xl mx-auto">
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

        {/* TRUST STRIP */}
        <section className="px-6 max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {["82 Associations", "$500M Assets", "20,000+ Lives", "Florida Focus"].map((item) => (
            <div key={item} className="bg-white/5 border border-white/10 rounded-xl p-6">
              {item}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="px-6 py-24 max-w-7xl mx-auto">
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

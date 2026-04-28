import { useState } from "react";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const boardEducationLinks = [
    { href: "/board-member-certification", label: "Board Member Certification" },
    { href: "/financial-reporting", label: "Financial Reporting" },
    { href: "/records-compliance", label: "Records Compliance" },
    { href: "/governance-support", label: "Governance Support" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between py-5">

          {/* Logo */}
          <a href="/" className="text-xl font-semibold tracking-tight text-white">
            Stoutt Property Management
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-white/90">

            <a href="/" className="hover:text-yellow-300 transition">
              Home
            </a>

            <a href="/services" className="hover:text-yellow-300 transition">
              Services
            </a>

            <a href="/why-switch" className="hover:text-yellow-300 transition">
              Why Switch
            </a>

            <a href="/about-us" className="hover:text-yellow-300 transition">
              About Us
            </a>

            {/* NO HOVER DROPDOWN — Static label only */}
            <a
              href="/board-education"
              className="hover:text-yellow-300 transition"
            >
              Board Education
            </a>

            <a href="/coverage" className="hover:text-yellow-300 transition">
              Coverage
            </a>

            <a
              href="/proposal"
              className="rounded-full bg-yellow-400 px-5 py-2 font-medium text-slate-900 hover:bg-yellow-300 transition"
            >
              Request Proposal
            </a>

          </nav>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white"
          >
            ☰
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950 px-6 py-6 space-y-4">

          <a href="/" className="block text-white/90">
            Home
          </a>

          <a href="/services" className="block text-white/90">
            Services
          </a>

          <a href="/why-switch" className="block text-white/90">
            Why Switch
          </a>

          <a href="/about-us" className="block text-white/90">
            About Us
          </a>

          {/* FIXED:
             no mapped descriptions
             no dropdown-style listing
             just one simple link like desktop */}
          <a href="/board-education" className="block text-white/90">
            Board Education
          </a>

          <a href="/coverage" className="block text-white/90">
            Coverage
          </a>

          <a
            href="/proposal"
            className="block rounded-full bg-yellow-400 px-5 py-3 text-center font-medium text-slate-900"
          >
            Request Proposal
          </a>

        </div>
      )}
    </header>
  );
}








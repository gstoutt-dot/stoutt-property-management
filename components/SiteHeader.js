import { useState } from "react";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/why-switch", label: "Why Switch" },
    { href: "/about-us", label: "About Us" },
    { href: "https://glennstoutt.com", label: "Founder", external: true },
    { href: "/collections", label: "Collections" },
    { href: "/coverage", label: "Coverage" },
  ];

  const boardEducationLinks = [
    {
      href: "/board-education",
      label: "Education & Compliance",
      text: "Board guidance, governance support, and statutory awareness.",
    },
    {
      href: "/board-workshops",
      label: "Board Workshops",
      text: "Educational sessions for stronger board leadership.",
      badge: "NEW",
    },
    {
      href: "/compliance-alerts",
      label: "Compliance Alerts",
      text: "Updates and proactive compliance support.",
    },
  ];

  const PHONE_HREF = "tel:+17546004755";

  const linkClasses =
    "whitespace-nowrap text-sm font-medium text-white/80 transition hover:text-white";

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-300";

  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="flex min-w-[220px] items-center">
          <img
            src="/logo.png"
            alt="Stoutt Property Management"
            className="h-28 w-auto object-contain lg:h-32"
          />
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

          <div className="relative group">
            <button type="button" className={linkClasses}>
              Board Education ▾
            </button>

            <div className="absolute left-0 top-full z-50 mt-4 hidden w-80 rounded-3xl border border-yellow-400/20 bg-slate-950/95 p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl group-hover:block">
              {boardEducationLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-2xl px-4 py-3 transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    {item.label}
                    {item.badge && (
                      <span className="rounded-full bg-yellow-400/20 px-2 py-0.5 text-[10px] font-bold tracking-wide text-yellow-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-white/60">
                    {item.text}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href="/homeowner-login" className={secondaryBtn}>
            Homeowner Access
          </a>
          <a href={PHONE_HREF} className={primaryBtn}>
            Call Now
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
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

              <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-2">
                <div className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-300">
                  Board Education
                </div>

                {boardEducationLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                      {item.badge && (
                        <span className="rounded-full bg-yellow-400/20 px-2 py-0.5 text-[10px] font-bold text-yellow-300">
                          {item.badge}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/55">
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
            </nav>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="/homeowner-login"
                onClick={() => setMobileOpen(false)}
                className={secondaryBtn}
              >
                Homeowner Access
              </a>
              <a
                href={PHONE_HREF}
                onClick={() => setMobileOpen(false)}
                className={primaryBtn}
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

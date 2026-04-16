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
    "rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] shadow-[0_0_0_1px_rgba(234,179,8,0.06),0_0_30px_rgba(234,179,8,0.10)] backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/40 hover:bg-white/[0.07]";

  const premiumButton =
    "rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-3.5 text-center text-sm font-semibold text-slate-950 shadow-[0_0_35px_rgba(234,179,8,0.22)] transition-all duration-300 hover:-translate-y-0.5";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="/" className="flex items-center">
            <img src="/logo.png" className="h-20" />
          </a>

          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="px-4 py-2 text-sm text-white/80 hover:text-white">
                {link.label}
              </a>
            ))}

            <a href="/proposal" className="ml-2 bg-yellow-400 px-5 py-2.5 rounded-full text-black font-semibold">
              Request a Proposal
            </a>

            <a href="tel:+17546004755" className="ml-2 bg-yellow-400 px-5 py-2.5 rounded-full text-black font-semibold">
              Call Now
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-5 pt-16 pb-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="text-yellow-300 text-xs uppercase tracking-widest">
                  Redefining Property Management Through Experience, Intelligent Systems and Being Proactive
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-semibold leading-tight">
                Florida premier property management built for boards that expect more.
              </h1>

              <p className="mt-6 text-white/70 text-lg max-w-xl">
                Stoutt Property Management delivers a higher standard of HOA and condominium association management through deep experience, faster execution, stronger follow-through, and intelligent systems that keep communities running smoothly.
              </p>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  ["82", "Associations Managed"],
                  ["$500M+", "Assets Overseen"],
                  ["20,000+", "Lives Impacted"],
                  ["24/7", "Systems-Driven Response"],
                ].map(([value, label]) => (
                  <div key={label} className={`${premiumCard} p-5 text-center`}>
                    <div className="text-2xl text-yellow-300 font-semibold">{value}</div>
                    <div className="text-sm text-yellow-100">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - DASHBOARD + LOGO */}
            <div className="flex flex-col items-center gap-10">

              {/* DASHBOARD (UNCHANGED) */}
              <div className={`${premiumCard} p-6 w-full max-w-lg`}>
                <div className="text-yellow-300 text-sm uppercase tracking-widest mb-3">
                  Board Confidence Dashboard
                </div>

                <div className="space-y-3 text-sm text-yellow-100">
                  <div>✔ Faster communication and follow-through</div>
                  <div>✔ Missed items identified early</div>
                  <div>✔ Stronger collections at no extra charge</div>
                  <div>✔ More responsive board relationship</div>
                </div>

                <div className="mt-4 text-sm text-yellow-100/80">
                  Built for associations that want experienced leadership, better systems, and proactive execution.
                </div>
              </div>

              {/* LOGO UNDERNEATH */}
              <div className="relative flex justify-center items-center">

                <div className="absolute w-[400px] h-[400px] bg-yellow-400/10 blur-3xl rounded-full" />

                <img
                  src="/logo.png"
                  alt="Stoutt Property Management"
                  className="relative w-full max-w-[420px] lg:max-w-[480px] xl:max-w-[540px] object-contain"
                />
              </div>

            </div>

          </div>
        </section>

        {/* KEEP REST OF YOUR PAGE SAME */}

      </main>
    </div>
  );
}




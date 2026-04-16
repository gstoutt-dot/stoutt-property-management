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
    "rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-300 to-amber-400 px-7 py-3.5 text-sm font-semibold text-slate-950";

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <img src="/logo.png" className="h-20" />

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

        {/* HERO */}
        <section className="mx-auto max-w-7xl px-5 pt-16 pb-10 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr]">

            {/* LEFT */}
            <div className="flex flex-col items-center text-center">
              <span className="text-yellow-300 text-xs uppercase tracking-widest mb-6">
                Redefining Property Management Through Experience, Intelligent Systems and Being Proactive
              </span>

              <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight max-w-3xl">
                Florida premier property management built for boards that expect more.
              </h1>

              <p className="mt-6 text-white/70 max-w-2xl">
                Stoutt Property Management delivers a higher standard of HOA and condominium association management through deep experience, faster execution, stronger follow-through, and intelligent systems that keep communities running smoothly.
              </p>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {[
                  ["82", "Associations Managed"],
                  ["$500M+", "Assets Overseen"],
                  ["20,000+", "Lives Impacted"],
                  ["24/7", "Systems-Driven Response"],
                ].map(([value, label]) => (
                  <div key={label} className={`${premiumCard} p-5`}>
                    <div className="text-2xl text-yellow-300 font-semibold">{value}</div>
                    <div className="text-sm text-yellow-100">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center gap-4">

              {/* DASHBOARD */}
              <div className={`${premiumCard} w-full p-6`}>
                <div className="text-yellow-300 text-sm uppercase tracking-widest mb-3">
                  Board Confidence Dashboard
                </div>

                <div className="space-y-3 text-sm text-yellow-100">
                  <div>✔ Faster communication and follow-through</div>
                  <div>✔ Missed items identified before they become problems</div>
                  <div>✔ Stronger collections at no extra charge</div>
                  <div>✔ A more responsive board-management relationship</div>
                </div>

                <div className="mt-4 text-sm text-yellow-100/80">
                  Built for associations that want experienced leadership, better systems, and proactive execution.
                </div>
              </div>

              {/* LOGO */}
              <div className="relative flex justify-center -mt-4">
                <div className="absolute w-[320px] h-[320px] bg-yellow-400/10 blur-3xl rounded-full" />
                <img src="/logo.png" className="relative w-full max-w-[620px]" />
              </div>

            </div>
          </div>
        </section>

        {/* WHY SWITCH (pulled up slightly) */}
        <section className="mx-auto max-w-7xl px-5 pt-12 pb-20 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-yellow-300 uppercase tracking-widest text-sm">
              Why communities switch
            </div>

            <h2 className="text-4xl mt-4 font-semibold">
              Boards do not change management companies lightly.
            </h2>

            <p className="mt-5 text-white/70">
              They switch when response times slow down, inspections are missed,
              collections lose momentum, and trust begins to erode.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}




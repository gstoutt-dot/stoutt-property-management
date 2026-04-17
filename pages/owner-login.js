import Link from "next/link";

export default function OwnerLoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <img
              src="/stoutt-logo.png"
              alt="Stoutt Property Management"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* NAV */}
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/services" className="hover:text-white">Services</Link>
            <Link href="/founder" className="hover:text-white">Founder</Link>
            <Link href="/coverage" className="hover:text-white">Coverage</Link>
            <Link href="/proposal" className="hover:text-white">Request a Proposal</Link>
          </nav>

          {/* BUTTON */}
          <Link
            href="/owner-login"
            className="rounded-full border border-amber-400/40 bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Owner Access
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          
          <div className="mb-6 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-amber-300">
            Private Access for Homeowners
          </div>

          <h1 className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
            Secure owner access built for the communities we manage.
          </h1>

          <p className="mt-6 text-lg text-white/70">
            Access association documents, communications, financial information,
            service requests, and owner resources through a secure portal
            experience designed to feel like a seamless part of Stoutt Property
            Management.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-slate-950">
              Enter Portal
            </button>

            <Link
              href="/proposal"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/5"
            >
              Request Management Services
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/40">
            Access is provided to homeowners within communities managed by
            Stoutt Property Management.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-8 lg:grid-cols-2">

          {/* LEFT */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h2 className="text-2xl font-semibold">
              Your community information in one place.
            </h2>

            <p className="mt-4 text-white/70">
              Homeowners will be able to securely access approved association
              information, payment details, notices, governing documents,
              account updates, and service tools.
            </p>

            <ul className="mt-6 space-y-3 text-white/70">
              <li>• Association documents and notices</li>
              <li>• Owner account and payment visibility</li>
              <li>• Service requests and communication tools</li>
              <li>• Private access by managed community</li>
            </ul>

            <div className="mt-8 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
              <p className="text-sm text-white/70">
                Portal access is being prepared and will be connected once your
                secure homeowner system is live.
              </p>
              <button className="mt-4 rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950">
                Launching Soon
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">
            <h3 className="text-xl font-semibold">
              A more private, elevated experience.
            </h3>

            <p className="mt-4 text-white/70">
              This portal separates public-facing information from private owner
              resources, protecting operational visibility while creating a
              seamless experience for homeowners.
            </p>

            <p className="mt-4 text-white/70">
              When your system goes live, this page becomes the direct entry
              point—no redesign needed.
            </p>

            <div className="mt-8">
              <Link
                href="/contact"
                className="block text-center rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/5"
              >
                Contact Our Office
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Stoutt Property Management. All rights reserved.
      </footer>
    </main>
  );
}

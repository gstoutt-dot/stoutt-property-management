import Link from "next/link";

export default function OwnerLoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-sm font-semibold tracking-[0.22em] text-amber-300">
              SPM
            </div>
            <div>
              <div className="text-sm font-semibold tracking-[0.28em] text-white">
                STOUTT
              </div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                Property Management
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="/founder" className="transition hover:text-white">
              Founder
            </Link>
            <Link href="/coverage" className="transition hover:text-white">
              Coverage
            </Link>
            <Link href="/proposal" className="transition hover:text-white">
              Request a Proposal
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/owner-login"
              className="rounded-full border border-amber-400/40 bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              Owner Access
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.10),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.15),rgba(15,23,42,0.9))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
              Private Access for Homeowners
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Secure owner access built for the communities we manage.
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/70 sm:text-xl">
              Access association documents, communications, financial
              information, service requests, and owner resources through a
              secure portal experience designed to feel like a seamless part of
              Stoutt Property Management.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#portal-access"
                className="rounded-full bg-amber-400 px-7 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Enter Portal
              </a>

              <Link
                href="/proposal"
                className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
              >
                Request Management Services
              </Link>
            </div>

            <p className="mt-6 text-sm text-white/45">
              Access is provided to homeowners within communities managed by
              Stoutt Property Management.
            </p>
          </div>
        </div>
      </section>

      {/* Main Access Card */}
      <section id="portal-access" className="relative py-8 lg:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
                  Owner Portal Gateway
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Your community information, all in one secure place.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
                Homeowners will be able to securely access approved association
                information, payment details, notices, governing documents,
                account updates, and service tools through a dedicated portal
                environment.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Association documents and notices",
                  "Owner account and payment visibility",
                  "Service request and communication tools",
                  "Private access by managed community",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-sm text-white/75"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-[1.75rem] border border-amber-400/20 bg-amber-400/8 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
                      Portal Status
                    </div>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      White-labeled homeowner portal access is being prepared for
                      launch. This page is ready now, and your final portal link
                      can be connected as soon as PayHOA access is live.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="min-w-[180px] rounded-full border border-amber-400/30 bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                  >
                    Launching Soon
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side Info Panel */}
            <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:p-10">
              <div className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                Why This Matters
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-white">
                A more private, elevated experience for homeowners.
              </h3>

              <div className="mt-6 space-y-5 text-sm leading-7 text-white/65">
                <p>
                  This portal access point is intentionally designed to separate
                  public-facing marketing from private owner tools and community
                  resources.
                </p>

                <p>
                  It reinforces exclusivity, protects operational visibility,
                  and creates a smoother experience for homeowners who want fast,
                  secure access without friction.
                </p>

                <p>
                  As your white-labeled software environment goes live, this page
                  becomes the front door to that experience without requiring a
                  redesign later.
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
                  Need assistance?
                </div>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  If you are a homeowner within a community managed by Stoutt
                  Property Management and need portal assistance, please contact
                  our office directly.
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                  >
                    Contact Our Office
                  </Link>

                  <Link
                    href="/"
                    className="rounded-full border border-white/10 px-6 py-3 text-center text-sm font-semibold text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future-Ready Section */}
      <section className="py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                  Built for what comes next
                </div>
                <h3 className="mt-4 text-3xl font-semibold text-white">
                  Ready now. Connected later.
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                  This page gives you the right structure today so you can
                  connect the white-labeled PayHOA portal later with minimal
                  effort. It preserves your premium branding now while keeping
                  the path open for your future software platform.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Brand Consistency",
                    text: "Keeps your private-access experience aligned with the Stoutt brand.",
                  },
                  {
                    title: "Future White Labeling",
                    text: "Lets you swap in the final portal URL once PayHOA is active.",
                  },
                  {
                    title: "Competitive Protection",
                    text: "Separates public messaging from owner-only systems and resources.",
                  },
                  {
                    title: "AI-Ready Foundation",
                    text: "Supports your broader vision for Ava and mirrored owner data workflows.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="text-base font-semibold text-white">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm leading-7 text-white/60">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-white/45 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            © {new Date().getFullYear()} Stoutt Property Management. All rights
            reserved.
          </div>
          <div className="flex flex-wrap gap-5">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Services
            </Link>
            <Link href="/proposal" className="transition hover:text-white">
              Proposal
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

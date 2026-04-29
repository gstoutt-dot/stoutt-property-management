import Link from "next/link";

export default function HomeownerLoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Stoutt Property Management"
              className="h-16 w-auto object-contain lg:h-20"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/why-switch">Why Switch</Link>
            <Link href="/founder">Founder</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/coverage">Coverage</Link>
          </nav>

          <a
            href="tel:7546004755"
            className="rounded-full border border-amber-400/40 bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
          >
            Call Now
          </a>
        </div>
      </header>

      <section className="relative flex min-h-[calc(100vh-96px)] items-center justify-center overflow-hidden px-6 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />

        <div className="relative z-10 grid w-full max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Private Homeowner Portal
            </p>

            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Secure access to your association account.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              View balances, payments, service requests, violations,
              architectural requests, governing documents, and Ava assistant
              support from one secure Stoutt-controlled location.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-2xl font-semibold text-amber-300">24/7</p>
                <p className="mt-2 text-sm text-slate-300">Portal access</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-2xl font-semibold text-amber-300">AI</p>
                <p className="mt-2 text-sm text-slate-300">Ava assistance</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <p className="text-2xl font-semibold text-amber-300">SPM</p>
                <p className="mt-2 text-sm text-slate-300">Private records</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white p-8 text-slate-950 shadow-2xl shadow-black/30 md:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
                Stoutt Property Management
              </p>
              <h2 className="mt-3 text-3xl font-semibold">Homeowner Login</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Sign in to access your private homeowner or board member
                dashboard.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Association Code{" "}
                  <span className="font-normal text-slate-400">optional</span>
                </label>
                <input
                  type="text"
                  placeholder="Example: ENVIRON1"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 uppercase text-slate-950 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10"
                />
              </div>

              <Link
  href="/homeowner"
  className="block w-full rounded-2xl bg-amber-400 px-5 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
>
  Sign In
</Link>
            </form>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <Link href="#" className="hover:text-amber-700">
                Forgot Password?
              </Link>
              <Link href="/proposal" className="hover:text-amber-700">
                Need Portal Access?
              </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              Private access. Secure records. Stoutt-controlled management data.
            </div>

            <div className="mt-5 text-center text-sm text-slate-500">
              Need help?{" "}
              <a href="tel:7546004755" className="font-semibold text-amber-700">
                Call 754-600-4755
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 shadow-2xl">
          <div className="mb-8 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
            Stoutt Property Management Portal
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Portal Access
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Temporary access gateway for the owner, manager, board, and admin modules.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <a
              href="/portal"
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:border-[#D4AF37]/50"
            >
              <h2 className="text-2xl font-semibold text-[#F3D77A]">Owner Portal</h2>
              <p className="mt-3 text-slate-300">Owner requests and account access.</p>
            </a>

            <a
              href="/portal"
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:border-[#D4AF37]/50"
            >
              <h2 className="text-2xl font-semibold text-[#F3D77A]">Manager Portal</h2>
              <p className="mt-3 text-slate-300">Manager review and workflow access.</p>
            </a>

            <a
              href="/board"
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:border-[#D4AF37]/50"
            >
              <h2 className="text-2xl font-semibold text-[#F3D77A]">Board Portal</h2>
              <p className="mt-3 text-slate-300">Board approvals and oversight.</p>
            </a>

            <a
              href="/board/command-center"
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:border-[#D4AF37]/50"
            >
              <h2 className="text-2xl font-semibold text-[#F3D77A]">Admin</h2>
              <p className="mt-3 text-slate-300">Command center access.</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}



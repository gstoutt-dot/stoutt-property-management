import { useRouter } from "next/router";

export default function OwnerLogin() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/portal/owner");
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.12),transparent_38%)]" />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-xl">
          <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div className="flex flex-col justify-between border-r border-white/10 bg-white/[0.025] p-8 sm:p-12">
              <div>
                <div className="mb-10 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
                  Owner Portal Access
                </div>

                <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Your community, simplified.
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                  View your account balance, submit requests, track violations,
                  access documents, and communicate with management — all in one place.
                </p>
              </div>

              <div className="mt-12 space-y-4">
                {[
                  "View balance & payment history",
                  "Submit and track work orders",
                  "Architectural review requests",
                  "Community documents & updates",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center p-8 sm:p-12">
              <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0B1220]/90 p-8 shadow-2xl"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Secure Owner Login
                </p>

                <h2 className="mt-4 text-3xl font-semibold">Sign in</h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Access your account and community information instantly.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="owner@community.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]"
                  >
                    Enter Owner Portal
                  </button>
                </div>

                <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-4 text-sm leading-6 text-[#F3D77A]">
                  Demo mode: This will route directly into the Owner Dashboard for presentation purposes.
                </div>

                <div className="mt-6 text-center text-sm text-slate-400">
                  Board member?{" "}
                  <span
                    onClick={() => router.push("/login-board")}
                    className="cursor-pointer text-[#D4AF37] hover:underline"
                  >
                    Access Board Portal
                  </span>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

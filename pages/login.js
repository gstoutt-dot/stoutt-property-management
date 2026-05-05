import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("owner");

  const routes = {
    owner: "/portal/owner",
    board: "/portal/board",
    admin: "/portal/board/command-center",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    router.push(routes[role]);
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.12),transparent_38%)]" />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-xl">
          <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-between border-r border-white/10 bg-white/[0.025] p-8 sm:p-12">
              <div>
                <div className="mb-10 inline-flex rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-2 text-sm font-medium text-[#F3D77A]">
                  Stoutt Property Management Portal
                </div>

                <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  Secure access for owners, boards, and management.
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                  A single gateway for account balances, work orders, violations,
                  architectural requests, board actions, documents, calendars, and
                  Ava-powered support.
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  ["Owner", "Balances, requests, documents"],
                  ["Board", "Actions, approvals, oversight"],
                  ["Admin", "Command center and BOS"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl"
                  >
                    <p className="text-xl font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-5 text-slate-400">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center p-8 sm:p-12">
              <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#0B1220]/90 p-8 shadow-2xl"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Portal Access
                </p>

                <h2 className="mt-4 text-3xl font-semibold">Sign in</h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Demo mode is active. Choose the portal role below to enter the
                  correct dashboard.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="demo@stouttpm.com"
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

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Demo Portal Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-[#070B14] px-4 py-3 text-white outline-none transition focus:border-[#D4AF37]"
                    >
                      <option value="owner">Owner Portal</option>
                      <option value="board">Board Portal</option>
                      <option value="admin">Admin / BOS Command Center</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-[#D4AF37] px-5 py-4 text-base font-semibold text-[#070B14] shadow-lg shadow-[#D4AF37]/20 transition hover:bg-[#F3D77A]"
                  >
                    Enter Portal
                  </button>
                </div>

                <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/10 p-4 text-sm leading-6 text-[#F3D77A]">
                  Presentation mode: credentials are not validated yet. This routes
                  each user type to the correct dashboard.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}



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
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.18),transparent_35%)]" />

      <section className="relative flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
          <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-between bg-white/[0.03] p-8 sm:p-12">
              <div>
                <div className="mb-10 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  Stoutt Property Management Portal
                </div>

                <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  One secure gateway for owners, boards, and management.
                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">
                  Access balances, work orders, violations, architectural requests,
                  board actions, documents, calendars, and Ava-powered community support.
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-semibold">Owner</p>
                  <p className="mt-2 text-sm text-slate-400">Balances, requests, documents</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-semibold">Board</p>
                  <p className="mt-2 text-sm text-slate-400">Actions, approvals, oversight</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-2xl font-semibold">Admin</p>
                  <p className="mt-2 text-sm text-slate-400">Command center and BOS</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-8 sm:p-12">
              <form
                onSubmit={handleLogin}
                className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl"
              >
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">
                    Secure Access
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold">Sign in</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Demo mode is active. Choose a portal role below to route into the correct dashboard.
                  </p>
                </div>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="demo@stouttpm.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-300">
                      Demo Portal Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-blue-400"
                    >
                      <option value="owner">Owner Portal</option>
                      <option value="board">Board Portal</option>
                      <option value="admin">Admin / BOS Command Center</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-blue-500 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
                  >
                    Enter Portal
                  </button>
                </div>

                <div className="mt-8 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                  Presentation mode: credentials are not validated yet. This page routes users
                  to the correct dashboard for demo purposes.
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const TEMP_USERS = {
  owner: {
    password: "owner2026",
    name: "Homeowner User",
    role: "owner",
  },
  manager: {
    password: "manager2026",
    name: "Property Manager",
    role: "manager",
  },
  board: {
    password: "board2026",
    name: "Board Member",
    role: "board",
  },
  glenn: {
    password: "stoutt2026",
    name: "Glenn Stoutt",
    role: "admin",
  },
};

export default function HomeownerLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    // ROLE-BASED ROUTING FUNCTION
  const getRouteByRole = (role) => {
    if (role === "owner") return "/portal/owner";
    if (role === "manager") return "/portal/manager";
    if (role === "board") return "/board";
    if (role === "admin") return "/admin";
    return "/";
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim().toLowerCase();
    const user = TEMP_USERS[cleanUsername];

    if (user && password === user.password) {
      localStorage.setItem("spmPortalLoggedIn", "true");
      localStorage.setItem("spmPortalUser", cleanUsername);
      localStorage.setItem("spmPortalUserName", user.name);
      localStorage.setItem("spmPortalRole", user.role);

      router.push(getRouteByRole(user.role));
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,1),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950 to-slate-950" />

        <div className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur-xl md:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-2xl font-bold text-amber-300 shadow-lg shadow-amber-500/10">
              S
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Secure Portal Access
            </p>

            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Stoutt Property Management
            </h1>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Login to access your assigned portal tools, dashboards, workflows,
              and approval systems.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60 focus:ring-2 focus:ring-amber-400/20"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
            >
              Enter Portal
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}





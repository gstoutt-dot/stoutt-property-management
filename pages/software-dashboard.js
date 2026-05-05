import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SoftwareDashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("spmPortalLoggedIn");
    localStorage.removeItem("spmPortalUser");
    router.push("/homeowner-login");
  };

  const portals = [
    {
      title: "Portal Hub",
      description: "Main access point for all Stoutt portal systems.",
      href: "/portal",
      label: "Open Portal",
    },
    {
      title: "Owner Hub",
      description: "Homeowner requests, account support, and owner tools.",
      href: "/portal/owner-hub",
      label: "Open Owner Hub",
    },
    {
      title: "Manager Hub",
      description: "Manager intake, review, inspections, and workflow routing.",
      href: "/portal/manager-hub",
      label: "Open Manager Hub",
    },
    {
      title: "Board Hub",
      description: "Board approvals, community oversight, and decisions.",
      href: "/board",
      label: "Open Board Hub",
    },
    {
      title: "Workflow Map",
      description: "Visual overview of how requests move through the system.",
      href: "/portal/workflow-engine",
      label: "Open Workflow Map",
    },
    {
      title: "Workflow Live",
      description: "Live operating workflow for intake, review, and approvals.",
      href: "/portal/workflow-engine-live",
      label: "Open Workflow Live",
    },
    {
      title: "Owner Engine",
      description: "Core owner-facing request and support engine.",
      href: "/portal/owner",
      label: "Open Owner Engine",
    },
    {
      title: "Manager Engine",
      description: "Core management review and processing engine.",
      href: "/portal/manager",
      label: "Open Manager Engine",
    },
    {
      title: "Board Command Center",
      description: "Board-level command center for oversight and approval flow.",
      href: "/board/command-center",
      label: "Open Command Center",
    },
    {
      title: "Board Action Center",
      description: "Board action items, decisions, and approval queue.",
      href: "/board/action-center",
      label: "Open Action Center",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden px-6 py-10 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(30,41,59,0.55),transparent_38%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950 to-slate-950" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <header className="mb-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            
            {/* LEFT SIDE */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Stoutt Software Dashboard
              </p>
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Command Access Center
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                One secure operating dashboard for owner access, manager review,
                board approvals, workflow routing, and software training.
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-3">
              
              {/* LOGOUT BUTTON (VISIBLE) */}
              <button
                onClick={handleLogout}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-xl transition hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
              >
                Logout
              </button>

              {/* USER DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 shadow-lg backdrop-blur-xl transition hover:border-amber-400/40 hover:bg-amber-400/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-xs font-bold text-amber-300">
                    GS
                  </div>

                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-white">
                      Glenn Stoutt
                    </p>
                    <p className="text-xs text-slate-400">Admin</p>
                  </div>

                  <span className="text-amber-300">▾</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 z-50 mt-3 w-64 rounded-3xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <p className="text-sm font-semibold text-white">
                        Glenn Stoutt
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Temporary Portal Access
                      </p>
                    </div>

                    <div className="mt-3 space-y-2">
                      <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-300 hover:bg-white/[0.06] hover:text-amber-300">
                        Profile
                      </button>

                      <button className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-300 hover:bg-white/[0.06] hover:text-amber-300">
                        Settings
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-left text-sm font-semibold text-amber-300 hover:bg-amber-400 hover:text-slate-950"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* PORTALS GRID */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portals.map((portal) => (
              <Link
                key={portal.href}
                href={portal.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.09]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-lg font-bold text-amber-300">
                  S
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {portal.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {portal.description}
                </p>

                <div className="mt-6 inline-flex rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950">
                  {portal.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

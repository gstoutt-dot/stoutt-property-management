import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const allPortals = [
  {
    title: "Portal Hub",
    description: "Main access point for all Stoutt portal systems.",
    href: "/portal",
    label: "Open Portal",
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    title: "Owner Hub",
    description: "Homeowner requests, account support, and owner tools.",
    href: "/portal/owner-hub",
    label: "Open Owner Hub",
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    title: "Owner Engine",
    description: "Core owner-facing request and support engine.",
    href: "/portal/owner",
    label: "Open Owner Engine",
    roles: ["owner", "manager", "board", "admin"],
  },
  {
    title: "Manager Hub",
    description: "Manager intake, review, inspections, and workflow routing.",
    href: "/portal/manager-hub",
    label: "Open Manager Hub",
    roles: ["manager", "admin"],
  },
  {
    title: "Manager Engine",
    description: "Core management review and processing engine.",
    href: "/portal/manager",
    label: "Open Manager Engine",
    roles: ["manager", "admin"],
  },
  {
    title: "Workflow Map",
    description: "Visual overview of how requests move through the system.",
    href: "/portal/workflow-engine",
    label: "Open Workflow Map",
    roles: ["manager", "admin"],
  },
  {
    title: "Workflow Live",
    description: "Live operating workflow for intake, review, and approvals.",
    href: "/portal/workflow-engine-live",
    label: "Open Workflow Live",
    roles: ["manager", "admin"],
  },
  {
    title: "Board Hub",
    description: "Board approvals, community oversight, and decisions.",
    href: "/board",
    label: "Open Board Hub",
    roles: ["board", "manager", "admin"],
  },
  {
    title: "Board Command Center",
    description: "Board-level command center for oversight and approval flow.",
    href: "/board/command-center",
    label: "Open Command Center",
    roles: ["board", "manager", "admin"],
  },
  {
    title: "Board Action Center",
    description: "Board action items, decisions, and approval queue.",
    href: "/board/action-center",
    label: "Open Action Center",
    roles: ["board", "manager", "admin"],
  },
];

export default function SoftwareDashboard() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Portal User");
  const [role, setRole] = useState("owner");

  useEffect(() => {
    const storedName = localStorage.getItem("spmPortalUserName");
    const storedRole = localStorage.getItem("spmPortalRole");

    if (storedName) setUserName(storedName);
    if (storedRole) setRole(storedRole);
  }, []);

  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const visiblePortals = allPortals.filter((portal) =>
    portal.roles.includes(role)
  );

  const handleLogout = () => {
    localStorage.removeItem("spmPortalLoggedIn");
    localStorage.removeItem("spmPortalUser");
    localStorage.removeItem("spmPortalUserName");
    localStorage.removeItem("spmPortalRole");
    router.push("/homeowner-login");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden px-6 py-10 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(30,41,59,0.55),transparent_38%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950 to-slate-950" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <header className="mb-10 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
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

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-xl transition hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
              >
                Logout
              </button>

              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 shadow-lg backdrop-blur-xl transition hover:border-amber-400/40 hover:bg-amber-400/10"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-xs font-bold text-amber-300">
                    {initials}
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-white">
                      {userName}
                    </p>
                    <p className="text-xs capitalize text-slate-400">
                      {role} Access
                    </p>
                  </div>

                  <span className="text-amber-300">▾</span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 z-50 mt-3 w-64 rounded-3xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-xl">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                      <p className="text-sm font-semibold text-white">
                        {userName}
                      </p>
                      <p className="mt-1 text-xs capitalize text-slate-400">
                        {role} Portal Access
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

          <div className="mb-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Role
              </p>
              <h2 className="mt-3 text-2xl font-semibold capitalize">
                {role} Access
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                This dashboard only displays the portals assigned to your login
                role.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Session
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Active Login</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Your temporary development login keeps you inside the software
                environment until you log out.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Visible Tools
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                {visiblePortals.length} Portals
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Admin sees all tools. Owners, managers, and board members see
                role-specific systems.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePortals.map((portal) => (
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

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-300">
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

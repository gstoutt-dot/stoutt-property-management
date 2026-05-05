import Link from "next/link";
import { useRouter } from "next/router";

export default function SoftwareDashboard() {
  const router = useRouter();

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

            <button
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-slate-200 shadow-lg backdrop-blur-xl transition hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
            >
              Logout
            </button>
          </header>

          <div className="mb-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Access
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Locked Portal</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                This dashboard is now protected behind the homeowner login gate.
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
                Build Mode
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Training View</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Use this page as your master screen to learn and access every
                working portal page.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portals.map((portal) => (
              <Link
                key={portal.href}
                href={portal.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-amber-400/40 hover:bg-white/[0.09] hover:shadow-amber-500/10"
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

                <div className="mt-6 inline-flex rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition group-hover:bg-amber-300">
                  {portal.label}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6 text-sm leading-6 text-amber-100 shadow-xl shadow-amber-500/10 backdrop-blur-xl">
            <strong className="text-amber-300">Development Login:</strong>{" "}
            Username <span className="font-semibold">glenn</span> / Password{" "}
            <span className="font-semibold">stoutt2026</span>
          </div>
        </div>
      </section>
    </main>
  );
}

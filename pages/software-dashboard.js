import Link from "next/link";
import { useRouter } from "next/router";

const cards = [
  {
    title: "Portal Hub",
    description: "Main access point for all Stoutt portal systems.",
    button: "Open Portal",
    href: "/portal",
  },
  {
    title: "Owner Hub",
    description: "Homeowner requests, account support, and owner tools.",
    button: "Open Owner Hub",
    href: "/portal",
  },
  {
    title: "Manager Hub",
    description: "Manager intake, review, inspections, and workflow routing.",
    button: "Open Manager Hub",
    href: "/portal",
  },
  {
    title: "Board Hub",
    description: "Board approvals, community oversight, and decisions.",
    button: "Open Board Hub",
    href: "/board",
  },
  {
    title: "Workflow Map",
    description: "Visual overview of how requests move through the system.",
    button: "Open Workflow Map",
    href: "/portal/workflow-engine",
  },
  {
    title: "Workflow Live",
    description: "Live operating workflow for intake, review, and approvals.",
    button: "Open Workflow Live",
    href: "/portal/workflow-engine",
  },
];

export default function SoftwareDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("spmPortalLoggedIn");
      localStorage.removeItem("spmPortalUser");
      localStorage.removeItem("spmPortalUserName");
      localStorage.removeItem("spmPortalRole");
    }

    router.push("/homeowner-login");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
              Stoutt Software Dashboard
            </p>

            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
              Command Access Center
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-8 text-slate-300">
              One secure operating dashboard for owner access, manager review,
              board approvals, workflow routing, and software training.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Logout
            </button>

            <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4">
              <p className="font-semibold text-white">Glenn Stoutt</p>
              <p className="text-sm text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-xl"
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-2xl font-bold text-amber-300">
              S
            </div>

            <h2 className="text-3xl font-bold">{card.title}</h2>

            <p className="mt-5 min-h-[60px] text-lg leading-8 text-slate-300">
              {card.description}
            </p>

            <Link
              href={card.href}
              className="mt-7 inline-flex rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-300"
            >
              {card.button}
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}

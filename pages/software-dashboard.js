import Link from "next/link";
import { useRouter } from "next/router";

export default function SoftwareDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("spmPortalLoggedIn");
    localStorage.removeItem("spmPortalUser");
    localStorage.removeItem("spmPortalUserName");
    localStorage.removeItem("spmPortalRole");

    router.push("/homeowner-login");
  };

  const cards = [
    { title: "Portal Hub", href: "/portal" },
    { title: "Owner Hub", href: "/portal" },
    { title: "Manager Hub", href: "/portal" },
    { title: "Board Hub", href: "/board" },
    { title: "Command Center", href: "/board/command-center" },
    { title: "Action Center", href: "/board/action-center" },
    { title: "Workflow Engine", href: "/portal/workflow-engine" },
    { title: "Workflow Live", href: "/portal/workflow-engine-live" },
    { title: "Manager Intake", href: "/portal/manager" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-white">
      <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
              Stoutt Software Dashboard
            </p>
            <h1 className="text-5xl font-bold mt-2">
              Command Access Center
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 px-5 py-2 bg-white/10 hover:bg-white/20"
          >
            Logout
          </button>
        </div>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-8"
          >
            <h2 className="text-2xl font-bold">{card.title}</h2>

            <Link
              href={card.href}
              className="mt-6 inline-block bg-amber-400 text-slate-900 px-5 py-2 rounded-xl font-semibold"
            >
              Open
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}

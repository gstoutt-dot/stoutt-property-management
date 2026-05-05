import Link from "next/link";
import { useRouter } from "next/router";

const ownerModules = [
  {
    title: "Owner Request Portal",
    status: "Live",
    href: "/portal/owner",
    description:
      "Owner intake, request submission, profile-based request creation, and live progress visibility.",
  },
  {
    title: "Financials",
    status: "Planned",
    href: null,
    description:
      "Owner account balance, payment status, ledger visibility, and assessment history.",
  },
  {
    title: "Request Status Center",
    status: "Integrated",
    href: null,
    description:
      "Request tracking, progress timeline, and next steps are built directly into the Owner Portal.",
  },
  {
    title: "Board Review Visibility",
    status: "Integrated",
    href: null,
    description:
      "Board review stages and approvals are automatically reflected inside each request.",
  },
];

export default function OwnerHub() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("spmPortalLoggedIn");
    localStorage.removeItem("spmPortalUser");
    localStorage.removeItem("spmPortalUserName");
    localStorage.removeItem("spmPortalRole");
    router.push("/homeowner-login");
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.3em] text-amber-400">
                Owner Module
              </div>

              <h1 className="mt-4 text-5xl font-black">Owner Hub</h1>

              <p className="mt-4 max-w-2xl text-slate-300">
                Navigation layer for owner-facing software. The live Owner
                Portal is the active intake and request visibility engine.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Owner Access
              </p>

              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => router.push("/software-dashboard")}
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
                >
                  Back to Software Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-300/20 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-200 hover:bg-red-400/15"
                >
                  Logout / Switch Role
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/portal/owner"
              className="rounded-xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300"
            >
              Open Owner Portal
            </Link>

            <Link
              href="/portal"
              className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-200 hover:bg-white/10"
            >
              Portal Hub
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {ownerModules.map((mod) =>
            mod.href ? (
              <Link key={mod.title} href={mod.href}>
                <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/40">
                  <ModuleCard mod={mod} />
                </div>
              </Link>
            ) : (
              <div
                key={mod.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-75"
              >
                <ModuleCard mod={mod} />
              </div>
            )
          )}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
          <h3 className="text-xl font-semibold">System Rule</h3>

          <p className="mt-3 text-sm text-slate-300">
            The Owner Portal is the live request intake and owner visibility
            engine. Request tracking, Board review visibility, and future
            financial access are integrated features inside the owner
            experience.
          </p>
        </div>
      </section>
    </main>
  );
}

function ModuleCard({ mod }) {
  return (
    <>
      <div className="mb-2 text-sm text-emerald-300">{mod.status}</div>

      <h2 className="text-2xl font-semibold">{mod.title}</h2>

      <p className="mt-3 text-sm text-slate-400">{mod.description}</p>

      {mod.href ? (
        <div className="mt-5 text-sm text-amber-300">Open →</div>
      ) : (
        <div className="mt-5 text-sm text-slate-500">Integrated Feature</div>
      )}
    </>
  );
}

import Link from "next/link";
import NotificationBell from "../../components/NotificationBell";

const managerModules = [
  {
    title: "Manager Command Center",
    status: "Live",
    href: "/portal/manager",
    description:
      "Main operational dashboard and live intake queue.",
  },
  {
    title: "Action Center",
    status: "Live",
    href: "/portal/manager",
    description:
      "Workflow controls embedded inside the command center.",
  },
  {
    title: "Vendor Dispatch",
    status: "Live",
    href: "/portal/manager",
    description:
      "Vendor assignment and dispatch handled within command center.",
  },
];

export default function ManagerHub() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-amber-400 text-sm uppercase tracking-[0.3em]">
                Manager Module
              </div>

              <h1 className="mt-4 text-5xl font-black">
                Manager Hub
              </h1>

              <p className="mt-4 text-slate-300 max-w-2xl">
                Navigation layer for manager operations.
                The command center is the active engine—this
                page helps organize and locate functions.
              </p>
            </div>

            <div className="flex items-start">
              <NotificationBell
                recipientRole="manager"
                label="Manager Alerts"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-6">
          {managerModules.map((mod) => (
            <Link key={mod.title} href={mod.href}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-amber-400/40 transition cursor-pointer">
                <div className="text-sm text-emerald-300 mb-2">
                  {mod.status}
                </div>

                <h2 className="text-2xl font-semibold">
                  {mod.title}
                </h2>

                <p className="mt-3 text-slate-400 text-sm">
                  {mod.description}
                </p>

                <div className="mt-5 text-amber-300 text-sm">
                  Open →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
          <h3 className="text-xl font-semibold">
            System Rule
          </h3>

          <p className="mt-3 text-sm text-slate-300">
            The Manager Command Center is the active
            workflow engine. This page is strictly for
            navigation and organization.
          </p>
        </div>
      </section>
    </main>
  );
}

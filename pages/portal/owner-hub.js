import Link from "next/link";

const ownerModules = [
  {
    title: "Owner Request Portal",
    status: "Live",
    href: "/portal/owner",
    description:
      "Owner intake, request submission, profile-based request creation, and live progress visibility.",
  },
  {
    title: "Request Status Center",
    status: "Live",
    href: "/portal/owner",
    description:
      "Owners can see request status, progress timeline, next step, and management/board review stages.",
  },
  {
    title: "Board Review Visibility",
    status: "Live",
    href: "/portal/owner",
    description:
      "Owner requests reflect when items are routed to board review, approved, scheduled, or completed.",
  },
];

export default function OwnerHub() {
  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 to-stone-900">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-sm uppercase tracking-[0.3em] text-amber-400">
            Owner Module
          </div>

          <h1 className="mt-4 text-5xl font-black">Owner Hub</h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Navigation layer for owner-facing software. The live Owner Portal is
            the active intake and request visibility engine.
          </p>

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
          {ownerModules.map((mod) => (
            <Link key={mod.title} href={mod.href}>
              <div className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/40">
                <div className="mb-2 text-sm text-emerald-300">
                  {mod.status}
                </div>

                <h2 className="text-2xl font-semibold">{mod.title}</h2>

                <p className="mt-3 text-sm text-slate-400">
                  {mod.description}
                </p>

                <div className="mt-5 text-sm text-amber-300">Open →</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-6">
          <h3 className="text-xl font-semibold">System Rule</h3>

          <p className="mt-3 text-sm text-slate-300">
            The Owner Portal is the live request intake and owner visibility
            engine. This page is strictly for navigation, module clarity, and
            project organization.
          </p>
        </div>
      </section>
    </main>
  );
}

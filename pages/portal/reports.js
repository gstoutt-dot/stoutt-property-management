import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Reports() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("spmPortalLoggedIn");
    const savedRole = localStorage.getItem("spmPortalRole");

    if (loggedIn !== "true" || !savedRole) {
      router.push("/homeowner-login");
      return;
    }

    setRole(savedRole);
  }, [router]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_34%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/85 to-slate-950" />

        <div className="relative mx-auto max-w-7xl px-6 py-10">
          <button
            onClick={() => router.push("/software-dashboard")}
            className="mb-8 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 transition hover:border-amber-300/40 hover:text-amber-200"
          >
            ← Back to Dashboard
          </button>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
            Stoutt Property Management
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Reports
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Operational reporting dashboard for association performance,
            management activity, board insights, and workflow summaries.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Open Work Orders</p>
            <p className="mt-2 text-3xl font-bold">12</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Open Violations</p>
            <p className="mt-2 text-3xl font-bold">18</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Pending Board Items</p>
            <p className="mt-2 text-3xl font-bold">5</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Current Role</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">
              {role || "Loading"}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Report Categories
          </p>

          <h2 className="mt-3 text-3xl font-bold">Management Reporting</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              "Work Order Summary",
              "Violation Activity",
              "Architectural Review Log",
              "Vendor Invoice Status",
              "Board Approval Summary",
              "Community Activity Snapshot",
            ].map((report) => (
              <div
                key={report}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-6"
              >
                <h3 className="text-xl font-bold">{report}</h3>
                <p className="mt-2 text-slate-400">
                  Placeholder report section for future live data.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

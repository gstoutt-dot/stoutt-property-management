import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

export default function ApprovalQueue() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("spmPortalLoggedIn");
    const savedRole = localStorage.getItem("spmPortalRole");

    if (loggedIn !== "true" || !savedRole) {
      router.push("/homeowner-login");
      return;
    }

    if (savedRole !== "admin" && savedRole !== "board") {
      router.push("/software-dashboard");
      return;
    }

    setRole(savedRole);

    const savedItems = localStorage.getItem("spmActionItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, [router]);

  const boardItems = useMemo(() => {
    return items.filter((item) => item.status === "Sent to Board");
  }, [items]);

  const updateBoardDecision = (id, decision) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            status: decision === "approved" ? "Complete" : "Manager Review",
            note:
              decision === "approved"
                ? "Approved by board and completed"
                : "Returned by board for manager follow-up",
            nextStep:
              decision === "approved"
                ? "Workflow completed after board approval"
                : "Manager must review board comments and follow up",
          }
        : item
    );

    setItems(updatedItems);
    localStorage.setItem("spmActionItems", JSON.stringify(updatedItems));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_34%)]" />
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
            Board Approval Queue
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Items forwarded by management for board review, approval, or return.
          </p>

          <p className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm text-slate-300">
            Access Level: {role === "admin" ? "Admin" : "Board"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Pending Board Review</p>
            <p className="mt-2 text-3xl font-bold">{boardItems.length}</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Source</p>
            <p className="mt-2 text-3xl font-bold text-amber-300">
              Action Center
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="text-sm text-slate-400">Status</p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">Live</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Board Decisions
          </p>
          <h2 className="mt-2 text-3xl font-bold">Items Awaiting Action</h2>
        </div>

        {boardItems.length === 0 ? (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-8">
            <h3 className="text-2xl font-bold">No items awaiting board review</h3>
            <p className="mt-3 text-slate-400">
              When management sends an item to the board, it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {boardItems.map((item) => (
              <div
                key={item.id}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
                        {item.type}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
                        {item.id}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-300">
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold">{item.title}</h3>

                    <p className="mt-2 text-slate-300">
                      {item.association} • Submitted by {item.submittedBy}
                    </p>

                    <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                      Board action needed: approve or return to management.
                    </p>
                  </div>

                  <div className="flex min-w-[190px] flex-col gap-3">
                    <button
                      onClick={() => updateBoardDecision(item.id, "approved")}
                      className="rounded-2xl bg-emerald-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-200"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateBoardDecision(item.id, "rejected")}
                      className="rounded-2xl border border-red-300/30 bg-red-400/10 px-5 py-3 font-semibold text-red-200 transition hover:bg-red-400/15"
                    >
                      Return to Manager
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

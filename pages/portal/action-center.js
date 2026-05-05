import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const WORKFLOW_STAGES = [
  "New",
  "Manager Review",
  "Approved",
  "Sent to Board",
  "Complete",
];

const INITIAL_ACTION_ITEMS = [
  {
    id: "AC-1001",
    type: "Work Order",
    title: "Pool light reported out",
    association: "Demo Association",
    submittedBy: "Homeowner",
    status: "New",
    priority: "High",
    nextStep: "Review responsibility and assign vendor",
  },
  {
    id: "AC-1002",
    type: "Violation",
    title: "Landscaping maintenance issue",
    association: "Demo Association",
    submittedBy: "Manager Inspection",
    status: "Manager Review",
    priority: "Medium",
    nextStep: "Confirm photo evidence and prepare notice",
  },
  {
    id: "AC-1003",
    type: "Architectural",
    title: "Fence installation request",
    association: "Demo Association",
    submittedBy: "Owner",
    status: "Approved",
    priority: "Medium",
    nextStep: "Route approved request to board",
  },
  {
    id: "AC-1004",
    type: "Invoice",
    title: "Landscape vendor monthly invoice",
    association: "Demo Association",
    submittedBy: "Vendor",
    status: "Sent to Board",
    priority: "High",
    nextStep: "Await board approval",
  },
];

const filters = ["All", "Work Order", "Violation", "Architectural", "Invoice"];

export default function ActionCenter() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState(INITIAL_ACTION_ITEMS);

  useEffect(() => {
    const loggedIn = localStorage.getItem("spmPortalLoggedIn");
    const savedRole = localStorage.getItem("spmPortalRole");

    if (loggedIn !== "true" || !savedRole) {
      router.push("/homeowner-login");
      return;
    }

    if (savedRole !== "admin" && savedRole !== "manager") {
      router.push("/software-dashboard");
      return;
    }

    setRole(savedRole);
  }, [router]);

  const moveForward = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;

        const currentIndex = WORKFLOW_STAGES.indexOf(item.status);
        const nextStatus =
          currentIndex < WORKFLOW_STAGES.length - 1
            ? WORKFLOW_STAGES[currentIndex + 1]
            : item.status;

        return {
          ...item,
          status: nextStatus,
          nextStep:
            nextStatus === "Manager Review"
              ? "Manager review in progress"
              : nextStatus === "Approved"
              ? "Ready to route for board decision or completion"
              : nextStatus === "Sent to Board"
              ? "Awaiting board approval"
              : nextStatus === "Complete"
              ? "Workflow completed"
              : item.nextStep,
        };
      })
    );
  };

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((item) => item.type === activeFilter);
  }, [activeFilter, items]);

  const countByStatus = (status) =>
    items.filter((item) => item.status === status).length;

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

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-amber-300">
                Stoutt Property Management
              </p>

              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                Action Center
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                Operational workflow routing for violations, work orders,
                architectural requests, vendor invoices, and board approvals.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.07] px-6 py-5 shadow-2xl backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                Access Level
              </p>
              <p className="mt-2 text-2xl font-bold text-amber-300">
                {role === "admin" ? "Admin" : "Manager"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-5">
          {WORKFLOW_STAGES.map((stage) => (
            <div
              key={stage}
              className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"
            >
              <p className="text-sm text-slate-400">{stage}</p>
              <p className="mt-2 text-3xl font-bold">{countByStatus(stage)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Workflow Queue
            </p>
            <h2 className="mt-2 text-3xl font-bold">Items Requiring Action</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-amber-300 text-slate-950"
                    : "border border-white/10 bg-white/[0.06] text-slate-300 hover:border-amber-300/40 hover:text-amber-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredItems.map((item) => {
            const currentIndex = WORKFLOW_STAGES.indexOf(item.status);
            const isComplete = item.status === "Complete";

            return (
              <div
                key={item.id}
                className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl transition hover:border-amber-300/30 hover:bg-white/[0.085]"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
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
                        Next step: {item.nextStep}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                      <div
                        className={`rounded-2xl border px-4 py-3 text-center text-sm font-semibold ${
                          item.priority === "High"
                            ? "border-amber-300/30 bg-amber-300/10 text-amber-200"
                            : "border-white/10 bg-white/[0.06] text-slate-300"
                        }`}
                      >
                        {item.priority} Priority
                      </div>

                      <button
                        onClick={() => moveForward(item.id)}
                        disabled={isComplete}
                        className={`rounded-2xl px-5 py-3 font-semibold transition ${
                          isComplete
                            ? "cursor-not-allowed border border-emerald-300/30 bg-emerald-300/10 text-emerald-200"
                            : "bg-amber-300 text-slate-950 hover:bg-amber-200"
                        }`}
                      >
                        {isComplete ? "Completed" : "Advance Workflow"}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-5">
                    {WORKFLOW_STAGES.map((stage, index) => (
                      <div key={stage} className="flex items-center gap-2">
                        <div
                          className={`h-2 flex-1 rounded-full ${
                            index <= currentIndex
                              ? "bg-amber-300"
                              : "bg-white/10"
                          }`}
                        />
                        <span
                          className={`hidden text-xs md:block ${
                            index <= currentIndex
                              ? "text-amber-200"
                              : "text-slate-500"
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

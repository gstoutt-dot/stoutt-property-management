import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const STATUS_FLOW = [
  "Request received",
  "Management review",
  "Board review if needed",
  "Approved / scheduled",
];

function normalizeStatus(status) {
  if (!status) return "Request received";

  const value = String(status).toLowerCase();

  if (value.includes("approved") || value.includes("scheduled") || value.includes("complete")) {
    return "Approved / scheduled";
  }

  if (value.includes("board")) {
    return "Board review if needed";
  }

  if (value.includes("manager") || value.includes("management") || value.includes("review")) {
    return "Management review";
  }

  return "Request received";
}

function getStatusIndex(status) {
  const normalized = normalizeStatus(status);
  return STATUS_FLOW.indexOf(normalized);
}

export default function OwnerPortal() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    request_type: "Maintenance Request",
    title: "",
    description: "",
    unit: "",
    owner_name: "",
  });
  const [loading, setLoading] = useState(false);

  async function loadRequests() {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("owner_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
  }

  useEffect(() => {
    loadRequests();
  }, []);

  async function submitRequest(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      request_type: form.request_type,
      title: form.title,
      description: form.description,
      unit: form.unit,
      owner_name: form.owner_name,
      status: "Request received",
      manager_note: "",
      board_note: "",
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { error } = await supabase.from("owner_requests").insert([payload]);

      if (!error) {
        setForm({
          request_type: "Maintenance Request",
          title: "",
          description: "",
          unit: "",
          owner_name: "",
        });
        await loadRequests();
      } else {
        alert("Request could not be submitted. Please check Supabase.");
      }
    }

    setLoading(false);
  }

  const liveRequests = useMemo(() => requests || [], [requests]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.12),transparent_35%)]" />

      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-semibold tracking-wide text-white">
            Stoutt Property Management
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/" className="hover:text-yellow-300">
              Home
            </Link>
            <Link href="/portal/manager" className="hover:text-yellow-300">
              Manager Portal
            </Link>
            <Link href="/portal/board" className="hover:text-yellow-300">
              Board Portal
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300">
            Owner Portal
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
            Submit requests and track every step through management review.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Owners can submit requests, see live status updates, and review notes as the item moves
            from intake to manager review, board review if needed, and final approval or scheduling.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
            <h2 className="text-2xl font-semibold text-white">Submit a Request</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This request will enter the property manager intake queue first.
            </p>

            <form onSubmit={submitRequest} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Request Type
                </label>
                <select
                  value={form.request_type}
                  onChange={(e) => setForm({ ...form, request_type: e.target.value })}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none ring-yellow-300/40 focus:ring-2"
                >
                  <option>Maintenance Request</option>
                  <option>Clubhouse Rental</option>
                  <option>Architectural Review</option>
                  <option>Amenity Request</option>
                  <option>Violation Question</option>
                  <option>General Owner Request</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Request Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  placeholder="Example: Pool light is out"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 ring-yellow-300/40 focus:ring-2"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Owner Name
                  </label>
                  <input
                    value={form.owner_name}
                    onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
                    placeholder="Owner name"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 ring-yellow-300/40 focus:ring-2"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Unit / Address
                  </label>
                  <input
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    placeholder="Unit 204"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 ring-yellow-300/40 focus:ring-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  rows={5}
                  placeholder="Describe the request or issue..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 ring-yellow-300/40 focus:ring-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-yellow-300 px-5 py-4 font-semibold text-slate-950 shadow-lg shadow-yellow-300/20 transition hover:bg-yellow-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </form>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Live Owner Requests</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Each request keeps the full status path visible on the right side.
                </p>
              </div>

              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-300">
                Live
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {liveRequests.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/60 p-8 text-center">
                  <p className="text-lg font-semibold text-white">No owner requests yet.</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Submit a request and it will appear here with its status tracker.
                  </p>
                </div>
              ) : (
                liveRequests.map((request) => {
                  const activeIndex = getStatusIndex(request.status);

                  return (
                    <article
                      key={request.id}
                      className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-5 md:grid-cols-[1fr_260px]"
                    >
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-yellow-300/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                            {request.request_type || "Owner Request"}
                          </span>

                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                            {normalizeStatus(request.status)}
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold text-white">
                          {request.title || "Untitled Request"}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-slate-300">
                          {request.description || "No description provided."}
                        </p>

                        <div className="mt-5 grid gap-3 text-sm text-slate-400 md:grid-cols-2">
                          <p>
                            <span className="text-slate-500">Owner:</span>{" "}
                            {request.owner_name || "Not provided"}
                          </p>
                          <p>
                            <span className="text-slate-500">Unit:</span>{" "}
                            {request.unit || "Not provided"}
                          </p>
                        </div>

                        {request.manager_note && (
                          <div className="mt-5 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-300">
                              Manager Note
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-200">
                              {request.manager_note}
                            </p>
                          </div>
                        )}

                        {request.board_note && (
                          <div className="mt-4 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4">
                            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                              Board Note
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-200">
                              {request.board_note}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                        <p className="mb-5 text-sm font-semibold text-white">Status Flow</p>

                        <div className="space-y-4">
                          {STATUS_FLOW.map((step, index) => {
                            const isComplete = index <= activeIndex;

                            return (
                              <div key={step} className="flex gap-3">
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                                      isComplete
                                        ? "border-yellow-300 bg-yellow-300 text-slate-950"
                                        : "border-white/15 bg-white/5 text-slate-500"
                                    }`}
                                  >
                                    {index + 1}
                                  </div>

                                  {index < STATUS_FLOW.length - 1 && (
                                    <div
                                      className={`mt-2 h-8 w-px ${
                                        index < activeIndex
                                          ? "bg-yellow-300"
                                          : "bg-white/10"
                                      }`}
                                    />
                                  )}
                                </div>

                                <div>
                                  <p
                                    className={`text-sm font-medium ${
                                      isComplete ? "text-white" : "text-slate-500"
                                    }`}
                                  >
                                    {step}
                                  </p>
                                  <p className="mt-1 text-xs text-slate-500">
                                    {isComplete ? "Active / completed" : "Pending"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}


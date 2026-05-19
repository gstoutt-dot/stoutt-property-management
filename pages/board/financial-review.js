import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function FinancialReview() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [actions, setActions] = useState([]);
  const [ownerBalances, setOwnerBalances] = useState([]);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadFinancialData();

    const interval = setInterval(() => {
      loadFinancialData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadFinancialData() {
    const { data: financialActions, error: actionsError } = await supabase
      .from("bos_actions")
      .select("*")
      .eq("association_id", DEFAULT_ASSOCIATION_ID)
      .or("request_type.ilike.%financial%,category.ilike.%financial%,title.ilike.%financial%,description.ilike.%financial%,request_type.ilike.%payment%,category.ilike.%payment%,title.ilike.%payment%,description.ilike.%payment%,request_type.ilike.%statement%,category.ilike.%statement%,title.ilike.%statement%,description.ilike.%statement%,request_type.ilike.%balance%,category.ilike.%balance%,title.ilike.%balance%,description.ilike.%balance%,request_type.ilike.%delinquency%,category.ilike.%delinquency%,title.ilike.%delinquency%,description.ilike.%delinquency%")
      .order("created_at", { ascending: false });

    if (actionsError) {
      console.error("Unable to load financial review items:", actionsError);
      setSystemMessage("Unable to load financial review items.");
      return;
    }

    const { data: balances, error: balancesError } = await supabase
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", DEFAULT_ASSOCIATION_ID)
      .order("current_balance", { ascending: false });

    if (balancesError) {
      console.warn("Unable to load owner balance records:", balancesError);
    }

    setActions(financialActions || []);
    setOwnerBalances(balances || []);
  }

  const financialSignals = useMemo(() => actions, [actions]);

  const financialAiEvents = useMemo(
    () =>
      actions.filter((item) =>
        String(item.source || item.description || "")
          .toLowerCase()
          .includes("ava")
      ),
    [actions]
  );

  const highRiskItems = useMemo(
    () =>
      ownerBalances.filter((item) =>
        ["elevated", "severe", "critical"].includes(
          String(item.delinquency_level || item.account_health || "")
            .toLowerCase()
        )
      ),
    [ownerBalances]
  );

  const openFinancialItems = useMemo(
    () =>
      financialSignals.filter(
        (item) => String(item.status || "open").toLowerCase() !== "completed"
      ),
    [financialSignals]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Financial Review Center
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Financial Review
            </h1>
          </div>

          <nav className="hidden gap-4 text-sm text-slate-300 md:flex">
  <Link href="/board">Board Dashboard</Link>
</nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
  Financial Review Queue
</p>

<h2 className="mt-3 text-4xl font-semibold">
  Review financial activity, delinquency trends, and board-related financial items.
</h2>

<p className="mt-4 max-w-3xl text-slate-300">
  Review financial concerns, delinquency activity, balance-related issues,
  and financial items requiring board awareness or approval.
</p>
        </div>

                <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Financial Requests</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {financialSignals.length}
            </p>
          </div>

          <div className="rounded-3xl border border-violet-300/20 bg-violet-500/10 p-6">
            <p className="text-sm text-violet-100">Owner / Ava Reports</p>
            <p className="mt-3 text-4xl font-semibold text-violet-200">
              {financialAiEvents.length}
            </p>
          </div>

          <div className="rounded-3xl border border-red-300/20 bg-red-500/10 p-6">
            <p className="text-sm text-red-100">High Risk Accounts</p>
            <p className="mt-3 text-4xl font-semibold text-red-200">
              {highRiskItems.length}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm text-slate-400">Open Financial Items</p>
            <p className="mt-3 text-4xl font-semibold text-amber-300">
              {openFinancialItems.length}
            </p>
          </div>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">
  Financial Review Queue
</h3>

<p className="mt-2 text-sm text-slate-400">
  Financial items requiring board review or awareness.
</p>

            <div className="mt-6 space-y-4">
              {financialSignals.map((item) => {
  const isOpen =
    selectedItem?.type === "financial" &&
    selectedItem?.data?.id === item.id;

  return (
    <div
      key={item.id}
      className="rounded-2xl border border-white/10 bg-slate-900 p-5"
    >
      <button
        onClick={() =>
                <button
        onClick={() =>
          setSelectedItem(isOpen ? null : { type: "financial", data: item })
        }
        className="block w-full text-left"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
          {item.id} · {formatCategory(item.category || item.request_type || "Financial")}
        </p>

        <h4 className="mt-2 font-semibold">
          {item.title || "Financial Review Item"}
        </h4>

        <p className="mt-2 text-sm text-slate-400">
          Current Status: {formatStatus(item.status)}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Owner: {item.owner_name || "Resident"} · Unit:{" "}
          {item.property_address || "Pending"}
        </p>

          <p className="mt-4 text-sm font-semibold text-amber-300">
          {isOpen ? "Hide Details" : "View Details"}
        </p>
      </button>
     
      {isOpen && (
        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5">
          <h5 className="text-lg font-semibold text-amber-200">
            Full Financial Review Details
          </h5>

          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <p>
              <span className="text-slate-500">Item ID:</span> {item.id}
            </p>

            <p>
              <span className="text-slate-500">Category:</span>{" "}
              {formatCategory(item.category || item.request_type || "Financial")}
            </p>

            <p>
              <span className="text-slate-500">Title:</span>{" "}
              {item.title || "Financial Review Item"}
            </p>

            <p>
              <span className="text-slate-500">Owner:</span>{" "}
              {item.owner_name || "Resident"}
            </p>

            <p>
              <span className="text-slate-500">Unit:</span>{" "}
              {item.property_address || "Pending"}
            </p>

            <p>
              <span className="text-slate-500">Status:</span>{" "}
              {formatStatus(item.status)}
            </p>

            <p>
              <span className="text-slate-500">Priority:</span>{" "}
              {titleCase(item.priority || "standard")}
            </p>

            <p>
              <span className="text-slate-500">Created:</span>{" "}
              {item.created_at
                ? new Date(item.created_at).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
})}
    
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
  Financial Activity
</h3>

<p className="mt-2 text-sm text-violet-100/70">
  Delinquency activity, owner financial concerns, and reported financial issues.
</p>

            <div className="mt-6 space-y-4">
              {financialAiEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                    {event.id} · {event.type}
                  </p>

                  <h4 className="mt-2 font-semibold">{event.event}</h4>

                  <p className="mt-2 text-sm text-slate-300">
                    Source: {event.source}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Status: {event.status} · Priority: {event.priority}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Financial Visibility
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Budget Variances
            </div>

            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Delinquency Watchlist
            </div>

            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Cash Position
            </div>

            <div className="rounded-2xl border border-emerald-300/20 p-5">
              Reserve Balances
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
  <h3 className="text-xl font-semibold text-amber-200">
    Financial Oversight
  </h3>

  <p className="mt-3 text-slate-300">
    This area helps board members monitor financial activity,
    delinquency trends, owner financial concerns, and association financial visibility.
  </p>
</div>
      </section>
    </main>
  );
}

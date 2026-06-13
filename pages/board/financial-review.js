import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

function getSelectedAssociationContext() {
  if (typeof window === "undefined") {
    return {
      associationId: "",
      associationName: "",
    };
  }

  return {
    associationId: localStorage.getItem("spm_selected_association_id") || "",
    associationName: localStorage.getItem("spm_selected_association_name") || "",
  };
}

export default function FinancialReview() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [actions, setActions] = useState([]);
  const [ownerBalances, setOwnerBalances] = useState([]);
  const [systemMessage, setSystemMessage] = useState("");
  const [associationName, setAssociationName] = useState("");

  useEffect(() => {
    loadFinancialData();

    const interval = setInterval(() => {
      loadFinancialData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadFinancialData() {
    setSystemMessage("");

    const { associationId, associationName: storedAssociationName } =
      getSelectedAssociationContext();

    setAssociationName(storedAssociationName);

    if (!associationId) {
      setSystemMessage("No association selected. Please log in again.");
      setActions([]);
      setOwnerBalances([]);
      return;
    }

    const { data: financialActions, error: actionsError } = await supabase
      .from("bos_actions")
      .select("*")
      .eq("association_id", associationId)
      .or(
        "request_type.ilike.%financial%,category.ilike.%financial%,title.ilike.%financial%,description.ilike.%financial%,request_type.ilike.%payment%,category.ilike.%payment%,title.ilike.%payment%,description.ilike.%payment%,request_type.ilike.%statement%,category.ilike.%statement%,title.ilike.%statement%,description.ilike.%statement%,request_type.ilike.%balance%,category.ilike.%balance%,title.ilike.%balance%,description.ilike.%balance%,request_type.ilike.%delinquency%,category.ilike.%delinquency%,title.ilike.%delinquency%,description.ilike.%delinquency%"
      )
      .order("created_at", { ascending: false });

    if (actionsError) {
      console.error("Unable to load financial review items:", actionsError);
      setSystemMessage("Unable to load financial review items.");
      setActions([]);
    } else {
      setActions(financialActions || []);
    }

    try {
      const balanceResponse = await fetch(
        `/api/accounting/quickbooks/financial-summary?association_id=${associationId}`
      );

      const balanceJson = await balanceResponse.json();

      const balanceRows =
        balanceJson?.accounts_needing_attention ||
        balanceJson?.accountsNeedingAttention ||
        balanceJson?.owner_balances ||
        balanceJson?.ownerBalances ||
        balanceJson?.balances ||
        [];

      setOwnerBalances(Array.isArray(balanceRows) ? balanceRows : []);
    } catch (balanceError) {
      console.warn("Unable to load owner balance records:", balanceError);
      setOwnerBalances([]);
    }
  }

  const financialSignals = useMemo(() => actions || [], [actions]);

  const financialAiEvents = useMemo(
    () =>
      financialSignals.filter((item) =>
        String(item.source || item.description || "")
          .toLowerCase()
          .includes("ava")
      ),
    [financialSignals]
  );

  const openFinancialItems = useMemo(
    () =>
      financialSignals.filter(
        (item) => String(item.status || "open").toLowerCase() !== "completed"
      ),
    [financialSignals]
  );

  const highRiskAccounts = useMemo(
    () =>
      ownerBalances.filter((item) => {
        const level = String(
          item.delinquency_level ||
            item.account_health ||
            item.payment_status ||
            ""
        ).toLowerCase();

        return (
          level.includes("elevated") ||
          level.includes("severe") ||
          level.includes("critical") ||
          level.includes("delinquent")
        );
      }),
    [ownerBalances]
  );

  const totalOutstanding = useMemo(
    () =>
      ownerBalances.reduce((sum, item) => {
        const value = Number(
          item.current_balance ?? item.currentBalance ?? item.balance ?? 0
        );

        return Number.isFinite(value) ? sum + value : sum;
      }, 0),
    [ownerBalances]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Financial Review Center
            </p>

            <h1 className="mt-2 text-2xl font-semibold">Financial Review</h1>

            {associationName && (
              <p className="mt-1 text-sm text-slate-400">{associationName}</p>
            )}
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
            Review financial activity, delinquency trends, and board-related
            financial items.
          </h2>

          <p className="mt-4 max-w-3xl text-slate-300">
            Review owner financial requests, delinquency visibility, payment
            concerns, statement requests, and financial items requiring board
            awareness.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Financial Requests" value={financialSignals.length} />
          <Metric
            label="Owner / Ava Reports"
            value={financialAiEvents.length}
            tone="violet"
          />
          <Metric
            label="High Risk Accounts"
            value={highRiskAccounts.length}
            tone="red"
          />
          <Metric label="Open Financial Items" value={openFinancialItems.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-semibold">Financial Review Queue</h3>

            <p className="mt-2 text-sm text-slate-400">
              Financial items requiring board review or awareness.
            </p>

            <div className="mt-6 space-y-4">
              {financialSignals.length === 0 ? (
                <Empty message="No financial review items are currently active." />
              ) : (
                financialSignals.map((item) => {
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
                          setSelectedItem(
                            isOpen ? null : { type: "financial", data: item }
                          )
                        }
                        className="block w-full text-left"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">
                          {item.id} ·{" "}
                          {formatCategory(
                            item.category || item.request_type || "Financial"
                          )}
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
                              <span className="text-slate-500">Item ID:</span>{" "}
                              {item.id}
                            </p>

                            <p>
                              <span className="text-slate-500">Category:</span>{" "}
                              {formatCategory(
                                item.category || item.request_type || "Financial"
                              )}
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
                })
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-400/20 bg-violet-500/10 p-6">
            <h3 className="text-xl font-semibold text-violet-100">
              Financial Activity
            </h3>

            <p className="mt-2 text-sm text-violet-100/70">
              Owner financial concerns, Ava intake activity, and reported
              financial issues.
            </p>

            <div className="mt-6 space-y-4">
              {financialAiEvents.length === 0 ? (
                <Empty message="No owner or Ava financial reports are currently active." />
              ) : (
                financialAiEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-violet-300/20 bg-slate-950/60 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
                      {event.id} ·{" "}
                      {formatCategory(event.category || event.request_type)}
                    </p>

                    <h4 className="mt-2 font-semibold">
                      {event.title || "Financial Activity"}
                    </h4>

                    <p className="mt-2 text-sm text-slate-300">
                      Source: {event.source || "Owner / Ava Intake"}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Status: {formatStatus(event.status)} · Priority:{" "}
                      {titleCase(event.priority || "medium")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
          <h3 className="text-xl font-semibold text-emerald-100">
            Live Financial Visibility
          </h3>

          <p className="mt-2 text-sm text-emerald-100/70">
            Board-level visibility into synced owner balances, payment status,
            account health, and delinquency risk.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <FinancialTile
              label="Synced Owner Accounts"
              value={ownerBalances.length}
            />
            <FinancialTile
              label="Total Outstanding Balance"
              value={formatCurrency(totalOutstanding)}
            />
            <FinancialTile
              label="Delinquency Watchlist"
              value={highRiskAccounts.length}
            />
            <FinancialTile
              label="QuickBooks Mirror"
              value={ownerBalances.length > 0 ? "Active" : "Pending"}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-slate-950/50 p-5">
            <h4 className="text-lg font-semibold text-emerald-100">
              Owner Balance Snapshot
            </h4>

            <div className="mt-4 space-y-3">
              {ownerBalances.length === 0 ? (
                <Empty message="No synced owner balance records are currently available." />
              ) : (
                ownerBalances.map((owner, index) => {
                  const ownerName =
                    owner.owner_name ||
                    owner.ownerName ||
                    owner.customer_name ||
                    "Owner";

                  const unitNumber =
                    owner.unit_number || owner.unitNumber || owner.unit || "Pending";

                  const balance =
                    owner.current_balance ?? owner.currentBalance ?? owner.balance ?? 0;

                  const paymentStatus =
                    owner.payment_status || owner.paymentStatus || "unknown";

                  const accountHealth =
                    owner.account_health ||
                    owner.accountHealth ||
                    owner.delinquency_level ||
                    owner.delinquencyLevel ||
                    "normal";

                  return (
                    <div
                      key={
                        owner.id ||
                        owner.owner_user_id ||
                        owner.ownerUserId ||
                        unitNumber ||
                        index
                      }
                      className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm md:grid-cols-5"
                    >
                      <div>
                        <p className="text-slate-500">Owner</p>
                        <p className="mt-1 font-semibold text-white">
                          {ownerName}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Unit</p>
                        <p className="mt-1 text-slate-200">{unitNumber}</p>
                      </div>

                      <div>
                        <p className="text-slate-500">Balance</p>
                        <p className="mt-1 font-semibold text-emerald-100">
                          {formatCurrency(balance)}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Payment Status</p>
                        <p className="mt-1 text-slate-200">
                          {formatStatus(paymentStatus)}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-500">Account Health</p>
                        <p className="mt-1 text-slate-200">
                          {formatStatus(accountHealth)}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
          <h3 className="text-xl font-semibold text-amber-200">
            Financial Oversight
          </h3>

          <p className="mt-3 text-slate-300">
            This area helps board members monitor owner financial requests,
            delinquency trends, payment concerns, statement requests, and
            QuickBooks-connected association financial visibility.
          </p>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value, tone }) {
  const styles = {
    red: "border-red-300/20 bg-red-500/10 text-red-200",
    violet: "border-violet-300/20 bg-violet-500/10 text-violet-200",
    default: "border-white/10 bg-white/[0.04] text-amber-300",
  };

  const style = styles[tone] || styles.default;

  return (
    <div className={`rounded-3xl border p-6 ${style}`}>
      <p className="text-sm opacity-80">{label}</p>
      <p className="mt-3 text-4xl font-semibold">{value}</p>
    </div>
  );
}

function FinancialTile({ label, value }) {
  return (
    <div className="rounded-2xl border border-emerald-300/20 p-5">
      <p className="text-sm text-emerald-100/70">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-emerald-100">{value}</p>
    </div>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCategory(category) {
  return titleCase(String(category || "General").replace(/_/g, " "));
}

function formatStatus(status) {
  return titleCase(status || "Open");
}

function formatCurrency(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number.isFinite(amount) ? amount : 0);
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardSignatureApprovalLog() {
  const [approvals, setApprovals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loadingApprovals, setLoadingApprovals] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  useEffect(() => {
    loadApprovals();

    const interval = setInterval(() => {
      loadApprovals();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  async function loadApprovals() {
    try {
      setLoadingApprovals(true);
      setSystemMessage("");

      const { data, error } = await supabase
        .from("association_signature_approvals")
        .select("*")
        .eq("association_id", DEFAULT_ASSOCIATION_ID)
        .order("due_date", { ascending: true });

      if (error) throw error;

      setApprovals(data || []);
    } catch (error) {
      console.error("Unable to load signature approvals:", error);
      setApprovals([]);
      setSystemMessage(error.message || "Unable to load signature approvals.");
    } finally {
      setLoadingApprovals(false);
    }
  }

  async function signApproval(item) {
    if (!item?.id) return;

    const { error } = await supabase
      .from("association_signature_approvals")
      .update({
        status: "signed",
        signed_at: new Date().toISOString(),
        signed_by: item.required_signer || "Board",
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (error) {
      setSystemMessage("Unable to sign approval item.");
      return;
    }

    await loadApprovals();
    setSystemMessage("Approval item signed and certified.");
  }

  const pendingSignatures = approvals.filter((item) =>
    ["pending_signature", "awaiting_approval", "in_review"].includes(
      String(item.status || "").toLowerCase()
    )
  );

  const signedItems = approvals.filter(
    (item) => String(item.status || "").toLowerCase() === "signed"
  );

  const highPriority = approvals.filter((item) =>
    ["high", "urgent", "critical"].includes(
      String(item.priority || "").toLowerCase()
    )
  );

  const statusTypes = useMemo(() => {
    const types = approvals
      .map((item) => String(item.status || "pending_signature").toLowerCase())
      .filter(Boolean);

    return ["all", ...Array.from(new Set(types))];
  }, [approvals]);

  const filteredApprovals = useMemo(() => {
    if (filter === "all") return approvals;

    return approvals.filter(
      (item) => String(item.status || "").toLowerCase() === filter
    );
  }, [approvals, filter]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
                Signature Approval Log
              </p>

              <h1 className="mt-3 text-4xl font-bold">
                Digital Signatures
              </h1>
            </div>

            <Link
              href="/board"
              className="text-lg font-medium text-white hover:text-yellow-300"
            >
              Board Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="rounded-3xl border border-yellow-300/20 bg-gradient-to-r from-slate-900 to-slate-950 p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
            Certified Board Approvals
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Track signed approvals, required signers, certification records, and governance authorization history.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Board approvals can be tracked with signer identity, approval category,
            linked workflow, signature status, certification notes, and audit-ready
            timestamp history.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric label="Approval Records" value={approvals.length} />
          <Metric label="Pending Signatures" value={pendingSignatures.length} />
          <Metric label="Signed Items" value={signedItems.length} />
          <Metric label="High Priority" value={highPriority.length} />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 px-5 py-4 text-sm font-semibold text-yellow-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-300">
                Live Approval Queue
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Signature Items
              </h2>
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-full border border-yellow-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-yellow-300 outline-none"
            >
              {statusTypes.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Signature Items" : titleCase(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-5">
            {loadingApprovals ? (
              <Empty message="Loading signature approvals..." />
            ) : filteredApprovals.length === 0 ? (
              <Empty message="No signature approvals are currently available for this view." />
            ) : (
              filteredApprovals.map((item) => (
                <ApprovalCard
                  key={item.id}
                  item={item}
                  onSign={signApproval}
                />
              ))
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
            <h2 className="text-xl font-semibold">
              Approval Categories
            </h2>

            <div className="mt-5 grid gap-3">
              {[
                "Contract Approval",
                "Policy Approval",
                "Budget Approval",
                "Insurance Approval",
                "Vendor Authorization",
                "Resolution Approval",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-emerald-100">
              Audit-Ready Approval Trail
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Signed approval records can connect contracts, policies,
              resolutions, budgets, insurance authorizations, vendor approvals,
              and governance archives into a clear board certification history.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function ApprovalCard({ item, onSign }) {
  const signed = String(item.status || "").toLowerCase() === "signed";

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
            {titleCase(item.approval_category || "Approval")} · Due{" "}
            {formatDate(item.due_date)}
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {item.title || "Signature Approval"}
          </h3>
        </div>

        <span className="rounded-full border border-yellow-300/30 px-4 py-1 text-sm text-yellow-200">
          {titleCase(item.status || "pending_signature")}
        </span>
      </div>

      <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
        <p>
          <span className="text-slate-500">Required Signer:</span>{" "}
          {item.required_signer || "Board"}
        </p>

        <p>
          <span className="text-slate-500">Linked Workflow:</span>{" "}
          {item.linked_workflow || "Board Operations"}
        </p>

        <p className="md:col-span-2">
          <span className="text-slate-500">Certification Record:</span>{" "}
          {item.certification_record || "No certification record available."}
        </p>

        {item.signed_at && (
          <p>
            <span className="text-slate-500">Signed:</span>{" "}
            {formatDate(item.signed_at)}
          </p>
        )}

        {item.signed_by && (
          <p>
            <span className="text-slate-500">Signed By:</span>{" "}
            {item.signed_by}
          </p>
        )}
      </div>

      {!signed && (
        <button
          onClick={() => onSign(item)}
          className="mt-5 rounded-full bg-yellow-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-yellow-200"
        >
          Sign / Certify
        </button>
      )}
    </article>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-yellow-300">{value}</div>
      <div className="mt-2 text-sm text-slate-300">{label}</div>
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

function formatDate(value) {
  if (!value) return "N/A";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

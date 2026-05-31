import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

const DEFAULT_ASSOCIATION_ID =
  "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

export default function BoardSignatureApprovalLog() {
  const [approvals, setApprovals] = useState([]);
  const [filter, setFilter] = useState("all");
  const [boardNotes, setBoardNotes] = useState({});
  const [loadingApprovals, setLoadingApprovals] =
    useState(true);

  const [systemMessage, setSystemMessage] =
    useState("");

    useEffect(() => {
    loadApprovals();
  }, []);

  async function loadApprovals() {
    try {
      setLoadingApprovals(true);
      setSystemMessage("");

            const response = await fetch(
        `/api/signature-approvals/list?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load signature approvals.");
      }

      setApprovals(result.approvals || []);
    } catch (error) {
      console.error(
        "Unable to load signature approvals:",
        error
      );

      setApprovals([]);

      setSystemMessage(
        error.message ||
          "Unable to load signature approvals."
      );
    } finally {
      setLoadingApprovals(false);
    }
  }

        async function signApproval(item) {
    if (!item?.id) return;

    if (
      String(item.status || "").toLowerCase() !==
      "board_approved"
    ) {
      setSystemMessage(
        "Board approval is required before certification."
      );

      return;
    }

    const response = await fetch("/api/signature-approvals/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        status: "signed",
        signed_at: new Date().toISOString(),
        signed_by: item.required_signer || "Board",
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      setSystemMessage(
        result.message || "Unable to sign approval item."
      );

      return;
    }

    await loadApprovals();

    setSystemMessage(
      "Approval item signed and certified."
    );
  }

      async function updateBoardApprovalStatus(item, newStatus, message) {
    if (!item?.id) return;

    const note = String(boardNotes[item.id] || "").trim();

    const existingRecord =
      item.certification_record ||
      "No certification record available.";

    const governanceEntry = [
      "",
      "BOARD SIGNATURE AUTHORIZATION UPDATE",
      `Action: ${message}`,
      `Date: ${new Date().toLocaleString()}`,
      note ? `Board Note: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch(
      "/api/signature-approvals/update-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          status: newStatus,
          certification_record: `${existingRecord}\n${governanceEntry}`,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      setSystemMessage(
        result.message ||
          "Unable to update signature approval item."
      );

      return;
    }

    setBoardNotes((current) => ({
      ...current,
      [item.id]: "",
    }));

    await loadApprovals();

    setSystemMessage(message);
  }

  async function deleteSignatureApproval(item) {
    if (!item?.id) return;

    const confirmed = window.confirm(
      "Delete this signature approval record permanently?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `/api/signature-approvals/delete?id=${encodeURIComponent(item.id)}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      setSystemMessage(
        result.message || "Unable to delete signature approval."
      );

      return;
    }

    await loadApprovals();

    setSystemMessage("Signature approval deleted.");
  }

    const pendingSignatures =
    approvals.filter((item) =>
      [
        "pending_signature",
        "awaiting_approval",
        "in_review",
        "board_acknowledged",
        "board_approved",
        "more_info_requested",
      ].includes(
        String(item.status || "").toLowerCase()
      )
    );

  const signedItems = approvals.filter(
    (item) =>
      String(item.status || "").toLowerCase() ===
      "signed"
  );

  const highPriority = approvals.filter(
    (item) =>
      ["high", "urgent", "critical"].includes(
        String(item.priority || "").toLowerCase()
      )
  );

  const statusTypes = useMemo(() => {
    const types = approvals
      .map((item) =>
        String(
          item.status ||
            "pending_signature"
        ).toLowerCase()
      )
      .filter(Boolean);

    return [
      "all",
      ...Array.from(new Set(types)),
    ];
  }, [approvals]);

  const filteredApprovals = useMemo(() => {
    if (filter === "all") return approvals;

    return approvals.filter(
      (item) =>
        String(item.status || "").toLowerCase() ===
        filter
    );
  }, [approvals, filter]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Governance Authorization Layer
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Signature Approval Log
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Admin Dashboard
            </Link>

            <Link
              href="/board"
              className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Main Page
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pt-12">
        <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-r from-slate-900 to-slate-950 p-10 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">
            Certified Governance Trail
          </p>

          <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
            Track signed approvals,
            certifications, governance
            authorizations and executive
            approval history.
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Signature approvals now connect
            contracts, vendor authorizations,
            reserve expenditures, resolutions,
            banking approvals, legal-sensitive
            actions and governance records into
            a centralized operational approval
            intelligence layer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-5 md:grid-cols-4">
          <Metric
            label="Approval Records"
            value={approvals.length}
          />

          <Metric
            label="Pending Signatures"
            value={pendingSignatures.length}
          />

          <Metric
            label="Signed Items"
            value={signedItems.length}
          />

          <Metric
            label="High Priority"
            value={highPriority.length}
          />
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-300">
    Live Governance Queue
  </p>

  <h2 className="mt-2 text-3xl font-bold">
    Signature Approval Records
  </h2>
</div>

<Link
  href="/board/signature-approval-new"
  className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
>
  Create Signature Approval
</Link>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
              className="rounded-full border border-amber-300/20 bg-slate-950 px-5 py-3 text-sm font-semibold text-amber-300 outline-none"
            >
              {statusTypes.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status === "all"
                    ? "All Signature Items"
                    : titleCase(status)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-5">
            {loadingApprovals ? (
              <Empty message="Loading signature approvals..." />
            ) : filteredApprovals.length ===
              0 ? (
              <Empty message="No signature approvals are currently available for this view." />
            ) : (
              filteredApprovals.map((item) => (
                                                <ApprovalCard
                  key={item.id}
                  item={item}
                  boardNote={boardNotes[item.id] || ""}
                  onBoardNoteChange={(value) =>
                    setBoardNotes((current) => ({
                      ...current,
                      [item.id]: value,
                    }))
                  }
                  onBoardAction={updateBoardApprovalStatus}
                  onSign={signApproval}
                  onDelete={deleteSignatureApproval}
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
                "Reserve Expenditure",
                "Legal Authorization",
                "Emergency Approval",
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

          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-amber-100">
              Connected Governance Systems
            </h2>

            <div className="mt-5 grid gap-3">
              {[
                "Motion Center",
                "Voting Center",
                "Meeting Packet",
                "Compliance Dashboard",
                "Legal Review",
                "Action Items",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-emerald-100">
              Audit-Ready Governance Trail
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Signed approval records now
              create a traceable governance
              authorization history connected
              to resolutions, contracts,
              insurance approvals, vendor
              authorizations and executive
              board actions.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function ApprovalCard({
  item,
  boardNote,
  onBoardNoteChange,
  onBoardAction,
  onSign,
  onDelete,
}) {
  const status = String(item.status || "").toLowerCase();
  const signed = status === "signed";
  const boardApproved = status === "board_approved";
  const lockedForSignature =
    signed ||
    boardApproved;

  return (
    <article className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            {titleCase(
              item.approval_category ||
                "Approval"
            )}{" "}
            · Due {formatDate(item.due_date)}
          </p>

          <h3 className="mt-2 text-xl font-semibold">
            {item.title ||
              "Signature Approval"}
          </h3>
        </div>

        <span
          className={`rounded-full border px-4 py-1 text-sm ${
            signed
              ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200"
              : boardApproved
              ? "border-amber-300/40 bg-amber-400/10 text-amber-200"
              : "border-amber-300/30 text-amber-200"
          }`}
        >
          {titleCase(
            item.status ||
              "pending_signature"
          )}
        </span>
      </div>

      {signed && (
        <div className="mt-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
            Signed and Certified
          </p>

          <h4 className="mt-3 text-2xl font-bold text-emerald-100">
            Signature Authorization Completed
          </h4>

          <div className="mt-4 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            <p>
              <span className="text-slate-500">
                Signed By:
              </span>{" "}
              {item.signed_by ||
                item.required_signer ||
                "Board"}
            </p>

            <p>
              <span className="text-slate-500">
                Signed Date:
              </span>{" "}
              {item.signed_at
                ? new Date(item.signed_at).toLocaleString()
                : "N/A"}
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-emerald-100/80">
            This approval is now locked as a signed governance authorization record.
          </p>
        </div>
      )}

      <div className="mt-5 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
        <p>
          <span className="text-slate-500">
            Required Signer:
          </span>{" "}
          {item.required_signer ||
            "Board"}
        </p>

        <p>
          <span className="text-slate-500">
            Linked Workflow:
          </span>{" "}
          {item.linked_workflow ||
            "Board Operations"}
        </p>

                <div className="md:col-span-2 rounded-xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
            Governance Timeline
          </p>

          <div className="mt-4 space-y-4">
            
            {extractGovernanceUpdates(item.certification_record).map(
              (entry, index) => (
                <div
                  key={`${entry.action}-${entry.date}-${index}`}
                  className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                    Board Authorization Update
                  </p>

                  <p className="mt-2 text-sm font-semibold text-white">
                    {entry.action || "Board action recorded."}
                  </p>

                  {entry.date && (
                    <p className="mt-2 text-xs text-slate-400">
                      {entry.date}
                    </p>
                  )}

                  {entry.note && (
                    <p className="mt-3 whitespace-pre-wrap rounded-lg border border-white/10 bg-slate-950/60 p-3 text-sm leading-6 text-slate-200">
                      {entry.note}
                    </p>
                  )}
                </div>
              )
            )}

            {signed && (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Signed And Certified
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  Signed by {item.signed_by || item.required_signer || "Board"}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {item.signed_at
                    ? new Date(item.signed_at).toLocaleString()
                    : "Signature date not recorded."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!signed && !lockedForSignature && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-sm font-semibold text-amber-200">
            Board Authorization Actions
          </p>

          <textarea
            value={boardNote}
            onChange={(event) =>
              onBoardNoteChange(event.target.value)
            }
            placeholder="Optional board note for the signature authorization record..."
            className="mt-3 min-h-[100px] w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-amber-400/50"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() =>
                onBoardAction(
                  item,
                  "board_acknowledged",
                  "Board acknowledged signature approval request."
                )
              }
              className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20"
            >
              Acknowledge
            </button>

            <button
              onClick={() =>
                onBoardAction(
                  item,
                  "board_approved",
                  "Board approved signature authorization."
                )
              }
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
            >
              Approve Signature
            </button>

            <button
              onClick={() =>
                onBoardAction(
                  item,
                  "more_info_requested",
                  "Board requested more information before signature authorization."
                )
              }
              className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-300 hover:bg-sky-400/20"
            >
              Request More Info
            </button>
          </div>
        </div>
      )}

            {boardApproved && (
        <div className="mt-5 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">
            Board Approved For Signature
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-200">
            Board authorization has been completed. This record is now ready for certification by the required signer.
          </p>

          <button
            onClick={() => onSign(item)}
            className="mt-4 rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-200"
          >
            Sign / Certify
          </button>
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={() => onDelete(item)}
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/20"
        >
          Delete Signature Approval
        </button>
      </div>
    </article>
  );
}

function extractGovernanceUpdates(record = "") {
  const text = String(record || "");

  if (!text.includes("BOARD SIGNATURE AUTHORIZATION UPDATE")) {
    return [];
  }

  return text
    .split("BOARD SIGNATURE AUTHORIZATION UPDATE")
    .slice(1)
    .map((entry) => {
      const lines = entry
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const actionLine =
        lines.find((line) => line.startsWith("Action:")) || "";

      const dateLine =
        lines.find((line) => line.startsWith("Date:")) || "";

      const noteLine =
        lines.find((line) => line.startsWith("Board Note:")) || "";

      return {
        action: actionLine.replace("Action:", "").trim(),
        date: dateLine.replace("Date:", "").trim(),
        note: noteLine.replace("Board Note:", "").trim(),
      };
    })
    .filter((entry) => entry.action || entry.date || entry.note);
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
      <div className="text-3xl font-bold text-amber-300">
        {value}
      </div>

      <div className="mt-2 text-sm text-slate-300">
        {label}
      </div>
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

  return new Date(value).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}

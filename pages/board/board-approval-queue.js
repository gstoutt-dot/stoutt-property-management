import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function BoardApprovalQueue() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");
  const [boardNotes, setBoardNotes] = useState({});

  useEffect(() => {
  loadApprovals({ showLoading: true });

  const refreshInterval = setInterval(() => {
    loadApprovals({ showLoading: false });
  }, 10000);

  return () => clearInterval(refreshInterval);
}, []);

  async function loadApprovals({ showLoading = false } = {}) {
    try {
      if (showLoading) setLoading(true);

      setSystemMessage("");

      const response = await fetch("/api/admin/operational-records");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to load board approval queue.");
      }

      const filteredItems = (result.records || []).filter((record) => {
        return (
          record.routing_target === "Board Approval Queue" ||
          record.routing_target === "board_approval_queue" ||
          record.assigned_to === "board" ||
          record.board_review_required === true
        );
      });

      setActions(filteredItems);
    } catch (error) {
      console.error("Unable to load board approval queue:", error);
      setSystemMessage("Unable to load board approval queue.");
    } finally {
      setLoading(false);
    }
  }

    async function updateApproval(action, newStatus, eventType, message) {
    try {
      setSystemMessage("");

      const note = String(boardNotes[action.id] || "").trim();

      const response = await fetch("/api/admin/update-operational-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: action.id,
          status: newStatus,
          board_event_type: eventType,
          board_message: message,
          board_note: note,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to update board approval item.");
      }

            const vendorInvoiceId = extractVendorInvoiceId(action.description);

      if (vendorInvoiceId) {
        if (eventType === "board_approved") {
          await fetch("/api/vendors/update-invoice-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: vendorInvoiceId,
              status: "Board Approved",
              board_note: note || message,
              payment_readiness: "Board Approved",
              action: "board_approval",
              actor_name: "Board Treasurer",
              authorized_board_role: "Treasurer",
            }),
          });
        }

        if (eventType === "more_info_requested") {
          await fetch("/api/vendors/update-invoice-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: vendorInvoiceId,
              status: "Needs Documentation",
              board_note: note || message,
              payment_readiness: "Locked",
              action: "return_to_vendor",
              actor_name: "Board Treasurer",
              authorized_board_role: "Treasurer",
              returned_to_vendor_note: note || message,
            }),
          });
        }

                if (eventType === "board_acknowledged") {
          await fetch("/api/vendors/update-invoice-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: vendorInvoiceId,
              status: "Board Review In Progress",
              board_note: note || message,
              payment_readiness: "Board Review In Progress",
              action: "board_acknowledged",
              actor_name: "Board Member",
            }),
          });
        }
      }

      setBoardNotes((current) => ({
        ...current,
        [action.id]: "",
      }));

      await loadApprovals({ showLoading: false });
      setSystemMessage(message);
    } catch (error) {
      console.error("Unable to update approval:", error);
      setSystemMessage(error.message || "Unable to update approval item.");
    }
  }

  const approvalItems = useMemo(() => {
    return actions.filter((action) => {
      const status = String(action.status || "submitted").toLowerCase();
      return !["completed", "archived", "closed"].includes(status);
    });
  }, [actions]);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Board Decision Center
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Board Approval Queue
            </h1>
          </div>

          <Link
            href="/board"
            className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          >
            Return to Board Dashboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Approval Only
          </p>

          <h2 className="mt-3 text-4xl font-semibold">
            Items sent specifically for board approval appear here.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            Admin and Management create and route approval items. Attachments are
            displayed as clean file buttons instead of raw links or metadata.
          </p>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Metric label="Approval Items" value={approvalItems.length} />
          <Metric
            label="Pending Review"
            value={
              approvalItems.filter((item) =>
                ["submitted", "open", "pending", "pending_review", "board_review"].includes(
                  String(item.status || "submitted").toLowerCase()
                )
              ).length
            }
          />
          <Metric
            label="In Progress"
            value={
              approvalItems.filter((item) =>
                ["in_progress", "board_acknowledged", "more_info_requested"].includes(
                  String(item.status || "").toLowerCase()
                )
              ).length
            }
          />
        </div>

        <section className="mt-10 space-y-5">
          {loading ? (
            <Empty message="Loading board approval items..." />
          ) : approvalItems.length === 0 ? (
            <Empty message="No board approval items are currently active." />
          ) : (
            approvalItems.map((action) => {
              const attachments = extractBoardAttachments(action.description);

              return (
                <article
                  key={action.id}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="w-full">
                      <div className="flex flex-wrap gap-2">
                        <Badge>{action.id}</Badge>
                        <Badge>{action.category || action.request_type || "Approval"}</Badge>
                        <Badge>{action.status || "Submitted"}</Badge>
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold">
                        {action.title || "Board Approval Item"}
                      </h3>

                      <div className="mt-3 max-w-5xl rounded-2xl border border-white/10 bg-slate-950/60 p-5">
                        <div className="whitespace-pre-wrap text-sm leading-7 text-slate-200">
                          {cleanApprovalDescription(action.description) ||
                            action.recommended_action ||
                            "This item was routed for board approval."}
                        </div>

                        {attachments.length > 0 && (
                          <div className="mt-5 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-4">
                            <p className="text-sm font-semibold text-blue-200">
                              Attachments
                            </p>

                            <div className="mt-3 grid gap-3">
                              {attachments.map((file, index) => (
                                <a
                                  key={`${file.url}-${index}`}
                                  href={file.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-100 hover:bg-blue-500/20"
                                >
                                  {attachmentButtonLabel(file)}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                                        <div className="grid min-w-[280px] gap-3">
                      <textarea
                        value={boardNotes[action.id] || ""}
                        onChange={(event) =>
                          setBoardNotes((current) => ({
                            ...current,
                            [action.id]: event.target.value,
                          }))
                        }
                        placeholder="Optional board note to Admin..."
                        className="min-h-[110px] rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-amber-400/50"
                      />

                      <button
                        onClick={() =>
                          updateApproval(
                            action,
                            "board_acknowledged",
                            "board_acknowledged",
                            `Board acknowledged: ${action.title}`
                          )
                        }
                        className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300 hover:bg-emerald-400/20"
                      >
                        Acknowledge
                      </button>

                      <button
                        onClick={() =>
                          updateApproval(
                            action,
                            "board_approved",
                            "board_approved",
                            `Board approved: ${action.title}`
                          )
                        }
                        className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateApproval(
                            action,
                            "more_info_requested",
                            "more_info_requested",
                            `Board requested more information: ${action.title}`
                          )
                        }
                        className="rounded-xl border border-sky-400/30 bg-sky-400/10 px-4 py-3 text-sm font-semibold text-sky-300 hover:bg-sky-400/20"
                      >
                        Request More Info
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </section>
    </main>
  );
}

function extractVendorInvoiceId(description = "") {
  const match = String(description || "").match(
    /SPM_VENDOR_INVOICE_ID:\s*([a-f0-9-]+)/i
  );

  return match ? match[1] : "";
}

function cleanApprovalDescription(description = "") {
  return String(description || "")
    .replace(/CALENDAR_ATTACHMENT_METADATA_START[\s\S]*?CALENDAR_ATTACHMENT_METADATA_END/g, "")
    .replace(/REPORT_ATTACHMENT_METADATA_START[\s\S]*?REPORT_ATTACHMENT_METADATA_END/g, "")
    .replace(/Association Report:[^\n]*\n?/gi, "")
    .replace(/Report Category:[^\n]*\n?/gi, "")
    .replace(/Uploaded By:[^\n]*\n?/gi, "")
    .replace(/Uploaded At:[^\n]*\n?/gi, "")
    .replace(/Report Summary:\s*/gi, "")
    .trim();
}

function extractBoardAttachments(description = "") {
  const text = String(description || "");

  const structuredMatches = [
    ...text.matchAll(
      /CALENDAR_ATTACHMENT_METADATA_START\s*([\s\S]*?)\s*CALENDAR_ATTACHMENT_METADATA_END/g
    ),
    ...text.matchAll(
      /REPORT_ATTACHMENT_METADATA_START\s*([\s\S]*?)\s*REPORT_ATTACHMENT_METADATA_END/g
    ),
  ];

  const structuredAttachments = structuredMatches
    .map((match) => {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((file) => file.url);

  if (structuredAttachments.length > 0) {
    return structuredAttachments;
  }

  return extractAttachmentLinks(description);
}

function extractAttachmentLinks(description = "") {
  const text = String(description || "");

  const attachmentSection =
    text.split("Attachments:")[1]?.split("Available Board Actions:")[0] || text;

  const matches =
    attachmentSection.match(
      /https:\/\/[^\s]+supabase\.co\/storage\/v1\/object\/public\/meeting-packets\/[^\s]+/g
    ) || [];

  return matches.map((rawUrl) => {
    let cleanUrl = rawUrl.trim();

    [".pdf", ".png", ".jpg", ".jpeg", ".webp", ".xlsx", ".xls", ".csv", ".doc", ".docx"].forEach(
      (extension) => {
        const index = cleanUrl.toLowerCase().indexOf(extension);
        if (index !== -1) {
          cleanUrl = cleanUrl.slice(0, index + extension.length);
        }
      }
    );

    return {
      url: cleanUrl,
      label: decodeURIComponent(cleanUrl.split("/").pop() || "Open Attachment"),
      name: decodeURIComponent(cleanUrl.split("/").pop() || "Open Attachment"),
      category: inferCategoryFromUrl(cleanUrl),
      type: "",
    };
  });
}

function attachmentButtonLabel(file) {
  const category = String(file.category || "").toLowerCase();
  const type = String(file.type || "").toLowerCase();
  const name = file.name || file.label || "Attachment";

  if (category === "pdf" || type.includes("pdf") || name.toLowerCase().endsWith(".pdf")) {
    return `Open PDF: ${name}`;
  }

  if (
    category === "image" ||
    type.startsWith("image/") ||
    /\.(png|jpg|jpeg|webp)$/i.test(name)
  ) {
    return `View Image: ${name}`;
  }

  if (
    category === "spreadsheet" ||
    /\.(xlsx|xls|csv)$/i.test(name)
  ) {
    return `Open Spreadsheet: ${name}`;
  }

  if (
    category === "document" ||
    /\.(doc|docx)$/i.test(name)
  ) {
    return `Open Document: ${name}`;
  }

  return `Open Attachment: ${name}`;
}

function inferCategoryFromUrl(url = "") {
  const lower = String(url).toLowerCase();

  if (lower.endsWith(".pdf")) return "pdf";
  if (/\.(png|jpg|jpeg|webp)$/.test(lower)) return "image";
  if (/\.(xlsx|xls|csv)$/.test(lower)) return "spreadsheet";
  if (/\.(doc|docx)$/.test(lower)) return "document";

  return "other";
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-4xl font-bold text-amber-300">{value}</p>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
      {children}
    </span>
  );
}

function Empty({ message }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

const committeeTypes = [
  "general",
  "architectural",
  "finance",
  "landscape",
  "rules",
  "insurance",
  "reserve",
  "social",
  "technology",
  "special_project",
];

const documentCategories = [
  "charter",
  "meeting_notes",
  "guidelines",
  "application",
  "financial",
  "proposal",
  "photos",
  "legal",
  "other",
];

export default function CommitteeMembersCenter() {
  const [committees, setCommittees] = useState([]);
  const [members, setMembers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [boardResponses, setBoardResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [systemMessage, setSystemMessage] = useState("");

  const [creatingCommittee, setCreatingCommittee] = useState(false);
  const [addingMemberId, setAddingMemberId] = useState("");
  const [uploadingDocumentId, setUploadingDocumentId] = useState("");

  const [committeeForm, setCommitteeForm] = useState({
    committee_name: "",
    committee_type: "general",
    purpose: "",
    chair_name: "",
    status: "active",
  });

  const [memberForms, setMemberForms] = useState({});
  const [documentForms, setDocumentForms] = useState({});
  const [recommendationForms, setRecommendationForms] = useState({});
  const [creatingRecommendationId, setCreatingRecommendationId] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

    async function loadAll() {
    setLoading(true);
    await Promise.all([
      loadCommittees(),
      loadCommitteeMembers(),
      loadCommitteeRecommendations(),
      loadCommitteeDocuments(),
      loadBoardResponses(),
    ]);
    setLoading(false);
  }

  async function loadCommittees() {
    try {
      const response = await fetch(
        `/api/committees/list?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load committees.");
      }

      setCommittees(payload.committees || []);
    } catch (error) {
      console.error("Unable to load committees:", error);
      setSystemMessage(error.message || "Unable to load committees.");
    }
  }

  async function loadCommitteeMembers() {
    try {
      const response = await fetch(
        `/api/committees/list-members?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load committee members.");
      }

      setMembers(payload.members || []);
    } catch (error) {
      console.error("Unable to load committee members:", error);
    }
  }

  async function loadCommitteeRecommendations() {
    try {
      const response = await fetch(
        `/api/committees/list-recommendations?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load recommendations.");
      }

      setRecommendations(payload.recommendations || []);
    } catch (error) {
      console.error("Unable to load committee recommendations:", error);
    }
  }

    async function loadCommitteeDocuments() {
    try {
      const response = await fetch(
        `/api/committees/list-documents?association_id=${encodeURIComponent(
          DEFAULT_ASSOCIATION_ID
        )}`
      );

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load committee documents.");
      }

      setDocuments(payload.documents || []);
    } catch (error) {
      console.error("Unable to load committee documents:", error);
    }
  }

  async function loadBoardResponses() {
    try {
      const response = await fetch("/api/admin/operational-records");
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to load board responses.");
      }

      const committeeBoardItems = (payload.records || []).filter((record) => {
        return (
          record.source_module === "committee_members_center" ||
          record.request_type === "committee_review" ||
          record.routing_target === "board_approval_queue"
        );
      });

      setBoardResponses(committeeBoardItems);
    } catch (error) {
      console.error("Unable to load board responses:", error);
    }
  }

  async function createCommittee(event) {
    event.preventDefault();

    try {
      setCreatingCommittee(true);
      setSystemMessage("");

      const response = await fetch("/api/committees/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          ...committeeForm,
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to create committee.");
      }

      setCommitteeForm({
        committee_name: "",
        committee_type: "general",
        purpose: "",
        chair_name: "",
        status: "active",
      });

      await loadCommittees();
      setSystemMessage("Committee created successfully.");
    } catch (error) {
      console.error("Unable to create committee:", error);
      setSystemMessage(error.message || "Unable to create committee.");
    } finally {
      setCreatingCommittee(false);
    }
  }

  async function addCommitteeMember(committeeId) {
    const form = memberForms[committeeId] || {};

    if (!form.member_name) {
      setSystemMessage("Member name is required.");
      return;
    }

    try {
      setAddingMemberId(committeeId);
      setSystemMessage("");

      const response = await fetch("/api/committees/add-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          committee_id: committeeId,
          member_name: form.member_name,
          member_role: form.member_role || "member",
          email: form.email || "",
          phone: form.phone || "",
          status: "active",
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to add committee member.");
      }

      setMemberForms((current) => ({
        ...current,
        [committeeId]: {
          member_name: "",
          member_role: "member",
          email: "",
          phone: "",
        },
      }));

      await loadCommitteeMembers();
      setSystemMessage("Committee member added.");
    } catch (error) {
      console.error("Unable to add committee member:", error);
      setSystemMessage(error.message || "Unable to add committee member.");
    } finally {
      setAddingMemberId("");
    }
  }

  async function sendCommitteeToBoard(committee) {
  if (!committee?.id) return;

  try {
    setSystemMessage("");

    const response = await fetch("/api/committees/send-committee-to-board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ committee }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Unable to send committee to board.");
    }

    setSystemMessage("Committee sent to Board Approval Queue.");
  } catch (error) {
    console.error("Unable to send committee to board:", error);
    setSystemMessage(error.message || "Unable to send committee to board.");
  }
}

  async function deleteCommittee(committeeId) {
    if (!committeeId) return;

    const confirmed = window.confirm(
      "Delete this committee and its members/documents permanently?"
    );

    if (!confirmed) return;

    try {
      setSystemMessage("");

      const response = await fetch(`/api/committees/delete?id=${committeeId}`, {
        method: "DELETE",
      });

      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to delete committee.");
      }

      setCommittees((current) =>
        current.filter((committee) => committee.id !== committeeId)
      );

      setMembers((current) =>
        current.filter((member) => member.committee_id !== committeeId)
      );

      setDocuments((current) =>
        current.filter((document) => document.committee_id !== committeeId)
      );

      setSystemMessage("Committee deleted.");
    } catch (error) {
      console.error("Unable to delete committee:", error);
      setSystemMessage(error.message || "Unable to delete committee.");
    }
  }

  async function deleteCommitteeMember(memberId) {
  if (!memberId) return;

  const confirmed = window.confirm("Delete this committee member?");
  if (!confirmed) return;

  try {
    setSystemMessage("");

    const response = await fetch("/api/committees/delete-members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: memberId }),
    });

    const payloadText = await response.text();

    let payload = {};
    try {
      payload = JSON.parse(payloadText);
    } catch {
      throw new Error("Delete member API route is not returning JSON.");
    }

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Unable to delete committee member.");
    }

    setMembers((current) =>
      current.filter((member) => String(member.id) !== String(memberId))
    );

    await loadCommitteeMembers();

    setSystemMessage("Committee member deleted.");
  } catch (error) {
    console.error("Unable to delete committee member:", error);
    setSystemMessage(error.message || "Unable to delete committee member.");
  }
}

  async function createRecommendation(committeeId) {
  const form = recommendationForms[committeeId] || {};

  if (!form.recommendation_title) {
    setSystemMessage("Recommendation title is required.");
    return;
  }

  try {
    setCreatingRecommendationId(committeeId);
    setSystemMessage("");

    const response = await fetch(
      "/api/committees/create-recommendation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          association_id: DEFAULT_ASSOCIATION_ID,
          committee_id: committeeId,
          recommendation_title: form.recommendation_title,
          recommendation_summary:
            form.recommendation_summary || "",
          recommendation_category:
            form.recommendation_category || "general",
          priority: form.priority || "normal",
          status: "draft",
          submitted_by: "Committee",
        }),
      }
    );

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(
        payload.message || "Unable to create recommendation."
      );
    }

    setRecommendationForms((current) => ({
      ...current,
      [committeeId]: {
        recommendation_title: "",
        recommendation_summary: "",
        recommendation_category: "general",
        priority: "normal",
      },
    }));

    await loadCommitteeRecommendations();

    setSystemMessage(
      "Recommendation created successfully."
    );
  } catch (error) {
    console.error(error);

    setSystemMessage(
      error.message || "Unable to create recommendation."
    );
  } finally {
    setCreatingRecommendationId("");
  }
}

async function uploadCommitteeDocument(committeeId) {
  const form = documentForms[committeeId] || {};

  if (!form.file) {
    setSystemMessage("Choose a committee document to upload.");
    return;
  }

  try {
    setUploadingDocumentId(committeeId);
    setSystemMessage("");

    const fileBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(form.file);
    });

    const response = await fetch("/api/committees/upload-document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        association_id: DEFAULT_ASSOCIATION_ID,
        committee_id: committeeId,
        document_name: form.document_name || form.file.name,
        document_category: form.document_category || "other",
        description: form.description || "",
        uploaded_by: "Admin",
        file_name: form.file.name,
        file_type: form.file.type,
        file_base64: fileBase64,
      }),
    });

    const payload = await response.json();

    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Unable to upload committee document.");
    }

    setDocumentForms((current) => ({
      ...current,
      [committeeId]: {
        document_name: "",
        document_category: "other",
        description: "",
        file: null,
      },
    }));

    await loadCommitteeDocuments();
    setSystemMessage("Committee document uploaded.");
  } catch (error) {
    console.error("Unable to upload committee document:", error);
    setSystemMessage(error.message || "Unable to upload committee document.");
  } finally {
    setUploadingDocumentId("");
  }
}

  const activeMembers = useMemo(
    () =>
      members.filter(
        (member) => String(member.status || "").toLowerCase() === "active"
      ),
    [members]
  );

  const boardRecommendations = useMemo(
    () =>
      recommendations.filter(
        (recommendation) =>
          String(recommendation.status || "").toLowerCase() === "sent_to_board"
      ),
    [recommendations]
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
              Stoutt Property Management
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              Committee Members Center
            </h1>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-400">
              Committee membership, documents, governance participation,
              recommendations, and board-directed review workflows.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Committee Governance Operations
          </p>

          <h2 className="mt-3 max-w-5xl text-4xl font-semibold leading-tight">
            Manage association committees, members, records, documents, and
            board-ready recommendations from one connected center.
          </h2>

          <p className="mt-4 max-w-4xl text-slate-300">
            ARC, finance, landscape, rules, insurance, reserve, social,
            technology, and special committees can now operate through a clean
            governance workspace built for larger associations.
          </p>
        </div>

        {systemMessage && (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-5 py-4 text-sm font-semibold text-amber-200">
            {systemMessage}
          </div>
        )}

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Committee Setup
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Create Committee
          </h2>

          <form onSubmit={createCommittee} className="mt-6 grid gap-4 lg:grid-cols-2">
            <input
              value={committeeForm.committee_name}
              onChange={(event) =>
                setCommitteeForm({
                  ...committeeForm,
                  committee_name: event.target.value,
                })
              }
              required
              placeholder="Committee name..."
              className="input"
            />

            <select
              value={committeeForm.committee_type}
              onChange={(event) =>
                setCommitteeForm({
                  ...committeeForm,
                  committee_type: event.target.value,
                })
              }
              className="input"
            >
              {committeeTypes.map((type) => (
                <option key={type} value={type}>
                  {titleCase(type)}
                </option>
              ))}
            </select>

            <input
              value={committeeForm.chair_name}
              onChange={(event) =>
                setCommitteeForm({
                  ...committeeForm,
                  chair_name: event.target.value,
                })
              }
              placeholder="Chairperson name..."
              className="input"
            />

            <select
              value={committeeForm.status}
              onChange={(event) =>
                setCommitteeForm({
                  ...committeeForm,
                  status: event.target.value,
                })
              }
              className="input"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="paused">Paused</option>
            </select>

            <textarea
              value={committeeForm.purpose}
              onChange={(event) =>
                setCommitteeForm({
                  ...committeeForm,
                  purpose: event.target.value,
                })
              }
              placeholder="Committee purpose, scope, responsibilities, or board direction..."
              rows={4}
              className="input lg:col-span-2"
            />

            <button
              type="submit"
              disabled={creatingCommittee}
              className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-6 py-4 font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50 lg:col-span-2"
            >
              {creatingCommittee ? "Creating Committee..." : "Create Committee"}
            </button>
          </form>
        </section>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <Metric label="Active Committees" value={committees.length} />
          <Metric label="Committee Members" value={activeMembers.length} />
          <Metric label="Recommendations" value={recommendations.length} />
          <Metric label="Documents" value={documents.length} />
        </div>

        <section className="mt-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300">
              Live Committee Queue
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Association Committees
            </h2>
          </div>

          {loading ? (
            <Empty message="Loading committee activity..." />
          ) : committees.length === 0 ? (
            <Empty message="No committees are currently available." />
          ) : (
            <div className="grid gap-6">
              {committees.map((committee) => (
                <CommitteeCard
                  key={committee.id}
                  committee={committee}
                  members={members.filter(
                    (member) => member.committee_id === committee.id
                  )}
                  documents={documents.filter(
                    (document) => document.committee_id === committee.id
                  )}
                  memberForm={
                    memberForms[committee.id] || {
                      member_name: "",
                      member_role: "member",
                      email: "",
                      phone: "",
                    }
                  }
                  documentForm={
                    documentForms[committee.id] || {
                      document_name: "",
                      document_category: "other",
                      description: "",
                      file: null,
                    }
                  }
                  addingMemberId={addingMemberId}
                  uploadingDocumentId={uploadingDocumentId}
                  onMemberFormChange={(updates) =>
                    setMemberForms((current) => ({
                      ...current,
                      [committee.id]: {
                        member_name: current[committee.id]?.member_name || "",
                        member_role: current[committee.id]?.member_role || "member",
                        email: current[committee.id]?.email || "",
                        phone: current[committee.id]?.phone || "",
                        ...updates,
                      },
                    }))
                  }
                  onDocumentFormChange={(updates) =>
                    setDocumentForms((current) => ({
                      ...current,
                      [committee.id]: {
                        document_name: current[committee.id]?.document_name || "",
                        document_category:
                          current[committee.id]?.document_category || "other",
                        description: current[committee.id]?.description || "",
                        file: current[committee.id]?.file || null,
                        ...updates,
                      },
                    }))
                  }
                  onAddMember={() => addCommitteeMember(committee.id)}
                  onDeleteMember={deleteCommitteeMember}
                  onDeleteCommittee={() => deleteCommittee(committee.id)}
                  onSendToBoard={() => sendCommitteeToBoard(committee)}
                  onUploadDocument={() => uploadCommitteeDocument(committee.id)}
                  boardResponse={findBoardResponseForCommittee(
                    committee,
                    boardResponses
                  )}

recommendationForm={
  recommendationForms[committee.id] || {
    recommendation_title: "",
    recommendation_summary: "",
    recommendation_category: "general",
    priority: "normal",
  }
}

creatingRecommendationId={
  creatingRecommendationId
}

onRecommendationFormChange={(updates) =>
  setRecommendationForms((current) => ({
    ...current,
    [committee.id]: {
      recommendation_title:
        current[committee.id]
          ?.recommendation_title || "",
      recommendation_summary:
        current[committee.id]
          ?.recommendation_summary || "",
      recommendation_category:
        current[committee.id]
          ?.recommendation_category ||
        "general",
      priority:
        current[committee.id]?.priority ||
        "normal",
      ...updates,
    },
  }))
}

onCreateRecommendation={() =>
  createRecommendation(committee.id)
}
                />
              ))}
            </div>
          )}
        </section>
      </section>

      <style jsx global>{`
  .input {
    width: 100%;
    border-radius: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background-color: rgba(15, 23, 42, 0.9) !important;
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
    padding: 0.85rem 1rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
  }

  .input::placeholder {
    color: rgba(148, 163, 184, 0.95) !important;
    -webkit-text-fill-color: rgba(148, 163, 184, 0.95) !important;
  }

  .input:focus {
    border-color: rgba(251, 191, 36, 0.45);
    box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.08);
  }

  input.input,
  textarea.input,
  select.input {
    background-color: rgba(15, 23, 42, 0.9) !important;
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
  }

  option {
    background: #020617;
    color: #ffffff;
  }
`}</style>
    </main>
  );
}

function CommitteeCard({
  committee,
  members,
  documents,
  memberForm,
  documentForm,
  addingMemberId,
  uploadingDocumentId,
  onMemberFormChange,
  onDocumentFormChange,
  onAddMember,
  onDeleteMember,
  onDeleteCommittee,
  onSendToBoard,
  onUploadDocument,
  boardResponse,

recommendationForm,
creatingRecommendationId,
onRecommendationFormChange,
onCreateRecommendation,
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-xl">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-2xl font-semibold">
                {committee.committee_name || "Committee"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {titleCase(committee.committee_type || "general")}
              </p>

              <p className="mt-5 leading-7 text-slate-300">
                {committee.purpose || "Committee operational oversight."}
              </p>
            </div>

            <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
              {titleCase(committee.status || "active")}
            </div>
          </div>

          <div className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <p>
              <span className="text-slate-500">Chairperson:</span>{" "}
              {committee.chair_name || "Not Assigned"}
            </p>

            <p>
              <span className="text-slate-500">Members:</span>{" "}
              {members.length}
            </p>

            <p>
              <span className="text-slate-500">Documents:</span>{" "}
              {documents.length}
            </p>

            <p>
              <span className="text-slate-500">Status:</span>{" "}
              {titleCase(committee.status || "active")}
            </p>
          </div>

                    {boardResponse && (
            <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Board Response Received
              </p>

              <p className="mt-3 text-sm text-slate-300">
                <span className="text-slate-500">Status:</span>{" "}
                {titleCase(boardResponse.status || "board review")}
              </p>

              <p className="mt-2 text-sm text-slate-300">
                <span className="text-slate-500">Last Action:</span>{" "}
                {titleCase(boardResponse.board_last_action || "Pending")}
              </p>

              {boardResponse.board_last_message && (
                <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
                    {boardResponse.board_last_message}
                  </p>
                </div>
              )}

              <p className="mt-3 text-xs text-slate-500">
                Updated:{" "}
                {boardResponse.board_updated_at
                  ? new Date(boardResponse.board_updated_at).toLocaleString()
                  : "Not yet updated"}
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
  <button
    onClick={onSendToBoard}
    className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
  >
    Send to Board
  </button>

  <button
    onClick={onDeleteCommittee}
    className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/20"
  >
    Delete Committee
  </button>
</div>
        </div>

        <div className="space-y-5">

  <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
    <h4 className="text-lg font-semibold text-amber-200">
      Committee Members
    </h4>

    <div className="mt-4 space-y-3">
              {members.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No members have been added yet.
                </p>
              ) : (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-white">
                        {member.member_name}
                      </p>

                      <p className="text-sm text-slate-400">
                        {titleCase(member.member_role || "member")}
                      </p>
                    </div>

                    <button
                      onClick={() => onDeleteMember(member.id)}
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 hover:bg-red-500/20"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input
                value={memberForm.member_name}
                onChange={(event) =>
                  onMemberFormChange({ member_name: event.target.value })
                }
                placeholder="Member name..."
                className="input"
              />

              <select
                value={memberForm.member_role}
                onChange={(event) =>
                  onMemberFormChange({ member_role: event.target.value })
                }
                className="input"
              >
                <option value="chairperson">Chairperson</option>
                <option value="member">Member</option>
              </select>

              <input
                value={memberForm.email}
                onChange={(event) =>
                  onMemberFormChange({ email: event.target.value })
                }
                placeholder="Email..."
                className="input"
              />

              <input
                value={memberForm.phone}
                onChange={(event) =>
                  onMemberFormChange({ phone: event.target.value })
                }
                placeholder="Phone..."
                className="input"
              />

              <button
                onClick={onAddMember}
                disabled={addingMemberId === committee.id}
                className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-50 sm:col-span-2"
              >
                {addingMemberId === committee.id ? "Adding..." : "Add Member"}
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <h4 className="text-lg font-semibold text-blue-200">
              Committee Documents
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Upload documents that committee members and board members need to access.
            </p>

            <div className="mt-4 space-y-3">
              {documents.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No committee documents uploaded yet.
                </p>
              ) : (
                documents.map((document) => (
                  <a
                    key={document.id}
                    href={document.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-100 hover:bg-blue-500/20"
                  >
                    {documentButtonLabel(document)}
                  </a>
                ))
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <input
                value={documentForm.document_name}
                onChange={(event) =>
                  onDocumentFormChange({ document_name: event.target.value })
                }
                placeholder="Document name..."
                className="input"
              />

              <select
                value={documentForm.document_category}
                onChange={(event) =>
                  onDocumentFormChange({ document_category: event.target.value })
                }
                className="input"
              >
                {documentCategories.map((category) => (
                  <option key={category} value={category}>
                    {titleCase(category)}
                  </option>
                ))}
              </select>

              <input
                type="file"
                onChange={(event) =>
                  onDocumentFormChange({
                    file: event.target.files?.[0] || null,
                  })
                }
                className="input sm:col-span-2"
                accept=".pdf,.png,.jpg,.jpeg,.webp,.xlsx,.xls,.csv,.doc,.docx,.ppt,.pptx"
              />

              <textarea
                value={documentForm.description}
                onChange={(event) =>
                  onDocumentFormChange({ description: event.target.value })
                }
                placeholder="Document notes..."
                rows={3}
                className="input sm:col-span-2"
              />

              <button
                onClick={onUploadDocument}
                disabled={uploadingDocumentId === committee.id}
                className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-200 hover:bg-blue-500/20 disabled:opacity-50 sm:col-span-2"
              >
                {uploadingDocumentId === committee.id
                  ? "Uploading..."
                  : "Upload Committee Document"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
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
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

function findBoardResponseForCommittee(committee, boardResponses) {
  const committeeName = String(committee.committee_name || "").toLowerCase();
  const expectedTitle = `${committeeName} review`;

  return (
    boardResponses.find((record) => {
      const title = String(record.title || "").toLowerCase();
      const description = String(record.description || "").toLowerCase();

      return (
        title === expectedTitle ||
        description.includes(`committee: ${committeeName}`)
      );
    }) || null
  );
}

function documentButtonLabel(document) {
  const type = String(document.file_type || "").toLowerCase();
  const name = document.document_name || document.file_name || "Committee Document";

  if (type.includes("pdf")) return `Open PDF: ${name}`;
  if (type.startsWith("image/")) return `View Image: ${name}`;
  if (type.includes("spreadsheet") || /\.(xlsx|xls|csv)$/i.test(name)) {
    return `Open Spreadsheet: ${name}`;
  }
  if (type.includes("word") || /\.(doc|docx)$/i.test(name)) {
    return `Open Document: ${name}`;
  }
  if (type.includes("presentation") || /\.(ppt|pptx)$/i.test(name)) {
    return `Open Presentation: ${name}`;
  }

  return `Open File: ${name}`;
}

function titleCase(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

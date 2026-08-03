import { useEffect, useState } from "react";
function formatDate(value) {
  return value ? new Date(value).toLocaleString() : "Just now";
}
function normalizeQuestion(question, index) {
  if (typeof question === "string") return { key: question, label: question, type: "textarea" };
  return { key: question.key || `question_${index + 1}`, label: question.label || `Question ${index + 1}`, type: question.type || "textarea", options: question.options || [], min: question.min, max: question.max };
}
function displayText(value) {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map((item, index) => displayText(item) || `Item ${index + 1}`).join(", ");
  if (value && typeof value === "object") return value.label || value.message || value.text || JSON.stringify(value);
  return "";
}
export default function GuidedServiceRequestDetails({ serviceRequest, associationId, bosActionId = "", audience = "homeowner", homeownerName = "Homeowner", managerName = "Management" }) {
  const [messages, setMessages] = useState([]);
  const [followUps, setFollowUps] = useState([]);
  const [answers, setAnswers] = useState({});
  const [updateText, setUpdateText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const requestId = String(serviceRequest?.id || "");
  async function loadDetails() {
    if (!requestId || !associationId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ associationId, serviceRequestId: requestId, bosActionId, requestTitle: serviceRequest?.title || "", unitNumber: serviceRequest?.unit_number || "", ownerUserId: serviceRequest?.owner_user_id || "" });
      const response = await fetch(`/api/homeowner/service-request/guided-details?${params}`);
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Unable to load request updates.");
      setMessages(data.messages || []);
      setFollowUps(data.followUps || []);
    } catch (loadError) {
      setError(loadError.message || "Unable to load request updates.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { loadDetails(); }, [requestId, associationId]);
  async function submit(action, payload = {}) {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/homeowner/service-request/guided-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ associationId, serviceRequestId: requestId, bosActionId, requestTitle: serviceRequest?.title || "", unitNumber: serviceRequest?.unit_number || "", ownerUserId: serviceRequest?.owner_user_id || "", requestType: serviceRequest?.request_type, action, authorName: audience === "manager" ? managerName : homeownerName, ...payload }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || "Unable to save request update.");
      setAnswers({});
      setUpdateText("");
      await loadDetails();
    } catch (submitError) {
      setError(submitError.message || "Unable to save request update.");
    } finally {
      setSaving(false);
    }
  }
  const pendingFollowUp = followUps.find((item) => item.status === "pending_homeowner_response");
  return <section className="mt-5 rounded-2xl border border-sky-400/20 bg-sky-400/[0.05] p-4">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div><p className="text-xs font-semibold uppercase tracking-wide text-sky-300">Request Updates & Required Details</p><p className="mt-1 text-sm text-slate-400">This is the official public record for this request.</p></div>
      {loading && <span className="text-xs text-slate-500">Loading…</span>}
    </div>
    {error && <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
    {audience === "manager" && <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <p className="font-semibold text-white">Management controls</p>
      <button type="button" disabled={saving} onClick={() => submit("send_guided_details")} className="rounded-xl bg-yellow-400 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">Request Guided Details</button>
      <textarea value={updateText} onChange={(event) => setUpdateText(event.target.value)} placeholder="Post a homeowner-visible status update…" className="min-h-24 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-yellow-400/60" />
      <button type="button" disabled={saving || !updateText.trim()} onClick={() => submit("post_public_update", { message: updateText })} className="rounded-xl border border-sky-400/40 px-4 py-3 text-sm font-semibold text-sky-200 disabled:opacity-60">Post Public Update</button>
      <p className="text-xs text-slate-500">Private manager notes remain in the manager workflow record and are never shown here.</p>
    </div>}
    {audience === "homeowner" && pendingFollowUp && <div className="mt-4 rounded-2xl border border-yellow-400/30 bg-slate-950/60 p-4">
      <p className="font-semibold text-yellow-300">Management needs additional information</p><p className="mt-2 whitespace-pre-line text-sm text-slate-200">{displayText(pendingFollowUp.intro_message)}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{(pendingFollowUp.questions || []).map((rawQuestion, index) => { const question = normalizeQuestion(rawQuestion, index); const fieldClass = "mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none focus:border-yellow-400/60"; return <label key={question.key} className={question.type === "textarea" ? "block text-sm text-slate-200 md:col-span-2" : "block text-sm text-slate-200"}>{displayText(question.label)}{question.type === "select" ? <select value={answers[question.key] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [question.key]: event.target.value }))} className={fieldClass}><option value="">Select one</option>{question.options.map((option) => <option key={displayText(option)} value={displayText(option)}>{displayText(option)}</option>)}</select> : question.type === "textarea" ? <textarea value={answers[question.key] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [question.key]: event.target.value }))} className={`${fieldClass} min-h-20`} /> : <input type={question.type} min={question.min} max={question.max} value={answers[question.key] || ""} onChange={(event) => setAnswers((current) => ({ ...current, [question.key]: event.target.value }))} className={fieldClass} />}</label>})}</div>
      <button type="button" disabled={saving || (pendingFollowUp.questions || []).map(normalizeQuestion).some((question) => !String(answers[question.key] || "").trim())} onClick={() => submit("submit_answers", { followUpId: pendingFollowUp.id, answers })} className="mt-4 rounded-xl bg-yellow-400 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60">Send Requested Details</button>
    </div>}
    <div className="mt-4 space-y-3">{messages.length === 0 && !loading ? <p className="rounded-xl bg-slate-950/60 px-3 py-3 text-sm text-slate-400">No public updates have been posted yet.</p> : messages.map((item) => <article key={item.id} className="rounded-xl border border-white/10 bg-slate-950/60 p-3"><div className="flex justify-between gap-3 text-xs"><span className="font-semibold text-sky-200">{displayText(item.author_name) || (item.author_role === "manager" ? "Management" : "Homeowner")}</span><span className="text-slate-500">{formatDate(item.created_at)}</span></div><p className="mt-2 whitespace-pre-line text-sm text-slate-200">{displayText(item.message)}</p></article>)}</div>
  </section>;
}

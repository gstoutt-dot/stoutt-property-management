import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
const TEMPLATE_GROUPS = {
  amenity: {
    intro: "Thank you for your amenity reservation request. Please provide the details below so management can review availability, applicable rules, and any required deposit or fee.",
    questions: [
      { key: "event_type", label: "Type of event", type: "select", options: ["Birthday party", "Graduation party", "Family gathering", "Holiday celebration", "Meeting", "Community event", "Other"] },
      { key: "event_start_date", label: "Event start date", type: "date" },
      { key: "event_start_time", label: "Event start time", type: "time" },
      { key: "event_end_date", label: "Event end date", type: "date" },
      { key: "event_end_time", label: "Event end time", type: "time" },
      { key: "guest_count", label: "Expected number of guests", type: "number", min: 1, max: 500 },
      { key: "alcohol", label: "Will alcohol be served?", type: "select", options: ["No", "Yes"] },
      { key: "bar_service", label: "Will there be bar service?", type: "select", options: ["No", "Yes", "Not applicable"] },
      { key: "catering", label: "Will catering be used?", type: "select", options: ["No", "Yes"] },
      { key: "outside_vendors", label: "Will outside vendors be involved?", type: "select", options: ["No", "Yes"] },
      { key: "band_dj", label: "Will there be a band, DJ, or amplified music?", type: "select", options: ["No", "Yes"] },
      { key: "decorations", label: "Will decorations be used?", type: "select", options: ["No", "Yes"] },
      { key: "tables", label: "Will additional tables be needed?", type: "select", options: ["No", "Yes"] },
      { key: "chairs", label: "Will additional chairs be needed?", type: "select", options: ["No", "Yes"] },
      { key: "rules_acknowledgment", label: "I have reviewed and will follow the applicable clubhouse rules.", type: "select", options: ["Yes", "No"] },
    ],
  },
  architectural: {
    intro: "Thank you for your architectural request. Please provide the information below so the Architectural Review process can begin.",
    questions: [
      "Describe the proposed change",
      "Materials, colors, and dimensions",
      "Contractor name and contact information, if known",
      "Have plans, photographs, or supporting documents been provided?",
    ],
  },
  maintenance: {
    intro: "Thank you for reporting this issue. Please provide the details below so management can determine the proper response and vendor access needs.",
    questions: [
      "Is the issue still occurring?",
      "When was it first noticed?",
      "Is access to your unit needed? If so, what is the best contact time?",
      "Are there any safety concerns or conditions that have changed?",
    ],
  },
  compliance: {
    intro: "Management needs a few details to review this concern fairly and accurately.",
    questions: [
      "When did the issue occur?",
      "Please describe the concern or your response",
      "Is there any additional information management should consider?",
    ],
  },
  financial: {
    intro: "Thank you for contacting management. Please provide the information below so the account or billing matter can be researched.",
    questions: [
      "What charge, payment, or statement item is involved?",
      "What date or amount should management review?",
      "What outcome or clarification are you requesting?",
    ],
  },
  documents: {
    intro: "Please provide the details below so management can locate or prepare the correct document.",
    questions: [
      "Which document or record do you need?",
      "What date range or property information applies?",
      "How would you like to receive it?",
    ],
  },
  move_vehicle: {
    intro: "Please provide the information below so management can review and coordinate this request.",
    questions: [
      "Requested date and time",
      "Vehicle, moving company, or vendor details",
      "Any access, elevator, gate, or parking accommodations needed",
    ],
  },
  general: {
    intro: "Thank you for your request. Please provide the details below so management can assist you promptly.",
    questions: [
      "Please provide any additional details needed to review your request",
      "What outcome are you requesting?",
    ],
  },
};
const REQUEST_TYPE_TEMPLATE_KEYS = {
  "Common Area Maintenance": "common_maintenance",
  "Building Maintenance": "common_maintenance",
  "Roof Leak": "water_intrusion",
  "Water Intrusion": "water_intrusion",
  Plumbing: "common_maintenance",
  Electrical: "common_maintenance",
  "Lighting / Electrical": "common_maintenance",
  "HVAC / Air Conditioning": "common_maintenance",
  "Elevator Issue": "elevator",
  "Landscape / Irrigation": "landscape",
  "Tree Trimming": "landscape",
  "Pool / Spa Issue": "amenity_issue",
  "Gate / Access Control": "security",
  "Security Concern": "security",
  "Parking Violation": "parking",
  "Noise Complaint": "compliance",
  "Pet Violation": "compliance",
  "Architectural Request": "architectural",
  "ARC Modification Request": "architectural",
  "Clubhouse Reservation": "amenity",
  "Amenity Issue": "amenity_issue",
  "Janitorial / Cleaning": "common_maintenance",
  "Pest Control": "common_maintenance",
  "Trash / Recycling": "common_maintenance",
  "Billing Question": "financial",
  "Assessment Question": "financial",
  "Account Review Request": "financial",
  "Collections Question": "financial",
  "Violation Dispute": "violation_dispute",
  "Document Request": "documents",
  "Insurance Request": "documents",
  "Estoppel Request": "documents",
  "Move In / Move Out Request": "move_vehicle",
  "Vendor Damage Report": "vendor_damage",
  "Vehicle Registration": "vehicle",
  "General Question": "general",
  Other: "general",
};
Object.assign(TEMPLATE_GROUPS, {
  common_maintenance: { intro: "Please provide the information below so management can assess the issue, determine the next step, and coordinate access if needed.", questions: [{ key: "issue_location", label: "Exact location of the issue", type: "text" }, { key: "first_noticed", label: "When was the issue first noticed?", type: "date" }, { key: "still_occurring", label: "Is the issue still occurring?", type: "select", options: ["Yes", "No", "Intermittently"] }, { key: "severity", label: "Current severity", type: "select", options: ["Routine", "Needs prompt attention", "Safety concern", "Emergency"] }, { key: "unit_access", label: "Is access to your unit needed?", type: "select", options: ["No", "Yes", "Not sure"] }, { key: "access_time", label: "Best time for access or follow-up", type: "text" }, { key: "additional_details", label: "Additional details management should know", type: "textarea" }] },
  water_intrusion: { intro: "Water intrusion requires prompt review. Please provide the details below so management can coordinate the proper response.", questions: [{ key: "water_location", label: "Exact location of water or leak", type: "text" }, { key: "first_noticed", label: "When was it first noticed?", type: "date" }, { key: "active_now", label: "Is water actively entering now?", type: "select", options: ["Yes", "No", "Intermittently"] }, { key: "source", label: "Known or suspected source", type: "select", options: ["Roof", "Window or door", "Plumbing", "Wall or ceiling", "Unknown"] }, { key: "damage", label: "Visible damage or safety concern", type: "textarea" }, { key: "access_time", label: "Best time for access", type: "text" }] },
  elevator: { intro: "Please provide the details below so management can assess the elevator condition and dispatch the appropriate service response.", questions: [{ key: "elevator_location", label: "Building and elevator location", type: "text" }, { key: "issue_time", label: "Date and time the issue occurred", type: "datetime-local" }, { key: "condition", label: "What is the elevator doing?", type: "select", options: ["Not operating", "Door issue", "Stuck between floors", "Unusual noise", "Intermittent issue", "Other"] }, { key: "people_affected", label: "Were any persons trapped or injured?", type: "select", options: ["No", "Yes", "Unknown"] }, { key: "emergency_contacted", label: "Were emergency services contacted?", type: "select", options: ["No", "Yes"] }, { key: "details", label: "Additional details", type: "textarea" }] },
  landscape: { intro: "Please provide the details below so management can review the landscape or irrigation concern.", questions: [{ key: "location", label: "Exact location", type: "text" }, { key: "issue_type", label: "Type of concern", type: "select", options: ["Irrigation", "Tree", "Planting", "Drainage", "Lawn", "Other"] }, { key: "safety", label: "Is there a safety concern or obstruction?", type: "select", options: ["No", "Yes"] }, { key: "details", label: "Additional details", type: "textarea" }] },
  amenity_issue: { intro: "Please provide the details below so management can review the amenity concern.", questions: [{ key: "amenity", label: "Amenity involved", type: "select", options: ["Pool / Spa", "Clubhouse", "Fitness area", "Playground", "Other"] }, { key: "location", label: "Exact location", type: "text" }, { key: "occurred_at", label: "Date and time observed", type: "datetime-local" }, { key: "safety", label: "Is there an immediate safety concern?", type: "select", options: ["No", "Yes"] }, { key: "details", label: "Details", type: "textarea" }] },
  security: { intro: "Please provide the details below so management can review the access or security concern promptly.", questions: [{ key: "location", label: "Exact location", type: "text" }, { key: "occurred_at", label: "Date and time", type: "datetime-local" }, { key: "issue_type", label: "Type of concern", type: "select", options: ["Gate not operating", "Access credential", "Door or lock", "Suspicious activity", "Lighting", "Other"] }, { key: "emergency_contacted", label: "Were law enforcement or emergency services contacted?", type: "select", options: ["No", "Yes"] }, { key: "details", label: "Details", type: "textarea" }] },
  parking: { intro: "Please provide the information below so management can review the parking concern.", questions: [{ key: "location", label: "Parking location", type: "text" }, { key: "occurred_at", label: "Date and time observed", type: "datetime-local" }, { key: "vehicle", label: "Vehicle description, tag, or space number", type: "text" }, { key: "concern", label: "Type of parking concern", type: "select", options: ["Unauthorized vehicle", "Blocked access", "Parking in reserved space", "Expired registration", "Other"] }, { key: "details", label: "Additional details", type: "textarea" }] },
  violation_dispute: { intro: "Please provide the details below so management can review your dispute fairly and accurately.", questions: [{ key: "notice_reference", label: "Notice date or reference", type: "text" }, { key: "dispute_reason", label: "Reason for dispute", type: "textarea" }, { key: "requested_resolution", label: "Requested resolution", type: "textarea" }, { key: "supporting_information", label: "Supporting information or documents", type: "textarea" }] },
  vendor_damage: { intro: "Please provide the information below so management can document and investigate the reported damage.", questions: [{ key: "damage_location", label: "Location of damage", type: "text" }, { key: "incident_date", label: "Date damage occurred or was discovered", type: "date" }, { key: "vendor_name", label: "Vendor or company involved, if known", type: "text" }, { key: "damage_description", label: "Description of damage", type: "textarea" }, { key: "safety", label: "Is there an immediate safety concern?", type: "select", options: ["No", "Yes"] }] },
  vehicle: { intro: "Please provide the vehicle details below for association registration.", questions: [{ key: "vehicle_make_model", label: "Vehicle make and model", type: "text" }, { key: "vehicle_color", label: "Vehicle color", type: "text" }, { key: "license_plate", label: "License plate number and state", type: "text" }, { key: "parking_space", label: "Assigned parking space, if applicable", type: "text" }, { key: "vehicle_type", label: "Vehicle type", type: "select", options: ["Car", "Truck", "Motorcycle", "Commercial vehicle", "Other"] }] },
});
function cleanText(value, fallback = "") {
  return String(value || "").trim() || fallback;
}
function getTemplateKey(requestType) {
  const exactKey = REQUEST_TYPE_TEMPLATE_KEYS[cleanText(requestType)];
  if (exactKey) return exactKey;
  const value = cleanText(requestType).toLowerCase();
  if (value.includes("clubhouse") || value.includes("amenity")) return "amenity";
  if (value.includes("architectural") || value.includes("arc")) return "architectural";
  if (value.includes("parking") || value.includes("noise") || value.includes("pet") || value.includes("violation")) return "compliance";
  if (value.includes("billing") || value.includes("assessment") || value.includes("account") || value.includes("collection")) return "financial";
  if (value.includes("document") || value.includes("insurance") || value.includes("estoppel")) return "documents";
  if (value.includes("move") || value.includes("vehicle")) return "move_vehicle";
  if (value.includes("maintenance") || value.includes("roof") || value.includes("water") || value.includes("plumbing") || value.includes("electrical") || value.includes("hvac") || value.includes("elevator") || value.includes("landscape") || value.includes("pool") || value.includes("gate") || value.includes("security") || value.includes("cleaning") || value.includes("pest") || value.includes("trash") || value.includes("damage")) return "maintenance";
  return "general";
}
async function resolveServiceRequest({ associationId, candidateId, bosActionId, requestTitle, unitNumber, ownerUserId }) {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(candidateId);
  if (isUuid) {
    const directRequest = await supabaseAdmin.from("homeowner_service_requests").select("id").eq("association_id", associationId).eq("id", candidateId).maybeSingle();
    if (directRequest.error) throw directRequest.error;
    if (directRequest.data) return { serviceRequestId: directRequest.data.id, bosActionId: cleanText(bosActionId) || null };
  }
  const resolvedBosActionId = cleanText(bosActionId) || candidateId;
  const { data: bosAction, error: bosActionError } = await supabaseAdmin.from("bos_actions").select("id, source, owner_user_id, unit_number, title").eq("association_id", associationId).eq("id", resolvedBosActionId).maybeSingle();
  if (bosActionError) throw bosActionError;
  if (!bosAction) {
    let directFallbackQuery = supabaseAdmin.from("homeowner_service_requests").select("id").eq("association_id", associationId).eq("title", requestTitle || "").order("created_at", { ascending: false }).limit(1);
    if (ownerUserId) directFallbackQuery = directFallbackQuery.eq("owner_user_id", ownerUserId);
    if (unitNumber) directFallbackQuery = directFallbackQuery.eq("unit_number", unitNumber);
    const { data: directFallback, error: directFallbackError } = await directFallbackQuery;
    if (directFallbackError) throw directFallbackError;
    return { serviceRequestId: directFallback?.[0]?.id || candidateId, bosActionId: cleanText(bosActionId) || null };
  }
  const trackingMatch = String(bosAction.source || "").match(/homeowner_request\s*:\s*([^|\s]+)/i);
  if (trackingMatch) return { serviceRequestId: trackingMatch[1], bosActionId: bosAction.id };
  let fallbackQuery = supabaseAdmin.from("homeowner_service_requests").select("id").eq("association_id", associationId).eq("title", bosAction.title || requestTitle || "").order("created_at", { ascending: false }).limit(1);
  if (bosAction.owner_user_id || ownerUserId) fallbackQuery = fallbackQuery.eq("owner_user_id", bosAction.owner_user_id || ownerUserId);
  if (bosAction.unit_number || unitNumber) fallbackQuery = fallbackQuery.eq("unit_number", bosAction.unit_number || unitNumber);
  const { data: fallbackRequests, error: fallbackError } = await fallbackQuery;
  if (fallbackError) throw fallbackError;
  return { serviceRequestId: fallbackRequests?.[0]?.id || candidateId, bosActionId: bosAction.id };
}
export default async function handler(req, res) {
  try {
    const candidateId = cleanText(req.method === "GET" ? req.query?.serviceRequestId : req.body?.serviceRequestId);
    const associationId = cleanText(req.method === "GET" ? req.query?.associationId : req.body?.associationId);
    const sourceData = req.method === "GET" ? req.query || {} : req.body || {};
    const requestedBosActionId = cleanText(sourceData.bosActionId);
    if (!candidateId || !associationId) return res.status(400).json({ success: false, error: "Missing service request or association." });
    const resolvedRequest = await resolveServiceRequest({ associationId, candidateId, bosActionId: requestedBosActionId, requestTitle: cleanText(sourceData.requestTitle), unitNumber: cleanText(sourceData.unitNumber), ownerUserId: cleanText(sourceData.ownerUserId) });
    const serviceRequestId = resolvedRequest.serviceRequestId;
    const resolvedBosActionId = resolvedRequest.bosActionId;
    if (req.method === "GET") {
      let messagesQuery = supabaseAdmin.from("homeowner_service_request_messages").select("*").eq("service_request_id", serviceRequestId).eq("association_id", associationId).order("created_at", { ascending: true });
      messagesQuery = messagesQuery.eq("visible_to_homeowner", true);
      const [{ data: messages, error: messagesError }, { data: followUps, error: followUpsError }] = await Promise.all([
        messagesQuery,
        supabaseAdmin.from("homeowner_service_request_follow_ups").select("*").eq("service_request_id", serviceRequestId).eq("association_id", associationId).order("created_at", { ascending: false }),
      ]);
      if (messagesError || followUpsError) throw messagesError || followUpsError;
      return res.status(200).json({ success: true, messages: messages || [], followUps: followUps || [] });
    }
    if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed." });
    const { action, requestType, authorName, message, answers, templateKey } = req.body || {};
    if (action === "send_guided_details") {
      const { data: originalRequest, error: originalRequestError } = await supabaseAdmin.from("homeowner_service_requests").select("request_type").eq("association_id", associationId).eq("id", serviceRequestId).maybeSingle();
      if (originalRequestError) throw originalRequestError;
      const originalRequestType = cleanText(originalRequest?.request_type) || cleanText(requestType);
      const key = TEMPLATE_GROUPS[templateKey] ? templateKey : getTemplateKey(originalRequestType);
      const template = TEMPLATE_GROUPS[key];
      const { data: followUp, error } = await supabaseAdmin.from("homeowner_service_request_follow_ups").insert({ association_id: associationId, service_request_id: serviceRequestId, bos_action_id: resolvedBosActionId, request_type: originalRequestType, template_key: key, intro_message: template.intro, questions: template.questions, status: "pending_homeowner_response" }).select("*").single();
      if (error) throw error;
      await supabaseAdmin.from("homeowner_service_request_messages").insert({ association_id: associationId, service_request_id: serviceRequestId, bos_action_id: resolvedBosActionId, author_role: "manager", author_name: cleanText(authorName, "Management"), message_type: "manager_question", message: template.intro, visible_to_homeowner: true });
      return res.status(200).json({ success: true, followUp });
    }
    if (action === "submit_answers") {
      const followUpId = cleanText(req.body?.followUpId);
      if (!followUpId) return res.status(400).json({ success: false, error: "Missing guided details record." });
      const { data: existingFollowUp, error: existingFollowUpError } = await supabaseAdmin.from("homeowner_service_request_follow_ups").select("questions").eq("id", followUpId).eq("service_request_id", serviceRequestId).maybeSingle();
      if (existingFollowUpError) throw existingFollowUpError;
      const labelsByKey = Object.fromEntries((existingFollowUp?.questions || []).map((question, index) => typeof question === "string" ? [question, question] : [question.key || `question_${index + 1}`, question.label || question.key || `Question ${index + 1}`]));
      const answerText = Object.entries(answers || {}).map(([question, answer]) => `${labelsByKey[question] || question}\n${cleanText(answer)}`).join("\n\n");
      const { data: followUp, error } = await supabaseAdmin.from("homeowner_service_request_follow_ups").update({ answers: answers || {}, status: "homeowner_responded", responded_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", followUpId).eq("service_request_id", serviceRequestId).select("*").single();
      if (error) throw error;
      await supabaseAdmin.from("homeowner_service_request_messages").insert({ association_id: associationId, service_request_id: serviceRequestId, bos_action_id: resolvedBosActionId, author_role: "homeowner", author_name: cleanText(authorName, "Homeowner"), message_type: "homeowner_answer", message: answerText, visible_to_homeowner: true });
      return res.status(200).json({ success: true, followUp });
    }
    if (action === "post_public_update") {
      const safeMessage = cleanText(message);
      if (!safeMessage) return res.status(400).json({ success: false, error: "Enter an update before posting." });
      const { data: entry, error } = await supabaseAdmin.from("homeowner_service_request_messages").insert({ association_id: associationId, service_request_id: serviceRequestId, bos_action_id: resolvedBosActionId, author_role: "manager", author_name: cleanText(authorName, "Management"), message_type: "public_update", message: safeMessage, visible_to_homeowner: true }).select("*").single();
      if (error) throw error;
      return res.status(200).json({ success: true, entry });
    }
    return res.status(400).json({ success: false, error: "Unknown guided-details action." });
  } catch (error) {
    console.error("service-request guided-details error:", error);
    return res.status(500).json({ success: false, error: error.message || "Unable to process request details." });
  }
}

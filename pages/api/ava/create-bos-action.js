import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getToolArgs(body) {
  try {
    if (body?.title || body?.description || body?.category) return body;

    const toolCall =
      body?.message?.toolCalls?.[0] ||
      body?.toolCalls?.[0] ||
      body?.toolCall ||
      null;

    if (toolCall?.function?.arguments) {
      const args = toolCall.function.arguments;
      return typeof args === "string" ? JSON.parse(args) : args;
    }

    if (body?.message?.functionCall?.arguments) {
      const args = body.message.functionCall.arguments;
      return typeof args === "string" ? JSON.parse(args) : args;
    }

    return body || {};
  } catch (error) {
    console.error("Unable to parse Ava tool args:", error);
    return {};
  }
}

function cleanText(value) {
  return String(value || "").trim();
}

function titleCase(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function normalizeCategory(category, title, description) {
  const clean = `${category || ""} ${title || ""} ${description || ""}`.toLowerCase();

  if (
    clean.includes("maintenance") ||
    clean.includes("repair") ||
    clean.includes("pool") ||
    clean.includes("light") ||
    clean.includes("gate") ||
    clean.includes("leak") ||
    clean.includes("broken") ||
    clean.includes("burned out") ||
    clean.includes("burnt out") ||
    clean.includes("clubhouse") ||
    clean.includes("landscape") ||
    clean.includes("irrigation") ||
    clean.includes("elevator") ||
    clean.includes("electrical")
  ) {
    return "maintenance";
  }

  if (
    clean.includes("violation") ||
    clean.includes("parking") ||
    clean.includes("trash") ||
    clean.includes("noise") ||
    clean.includes("pet") ||
    clean.includes("rules")
  ) {
    return "violation";
  }

  if (
    clean.includes("billing") ||
    clean.includes("financial") ||
    clean.includes("account") ||
    clean.includes("balance") ||
    clean.includes("payment") ||
    clean.includes("ledger")
  ) {
    return "financial";
  }

  if (
    clean.includes("proposal") ||
    clean.includes("sales") ||
    clean.includes("management quote") ||
    clean.includes("new association")
  ) {
    return "sales_opportunity";
  }

  if (
    clean.includes("architectural") ||
    clean.includes("arc") ||
    clean.includes("paint") ||
    clean.includes("roof") ||
    clean.includes("fence")
  ) {
    return "architectural";
  }

  if (
    clean.includes("amenity") ||
    clean.includes("reservation") ||
    clean.includes("access card") ||
    clean.includes("fob")
  ) {
    return "amenity";
  }

  if (
    clean.includes("document") ||
    clean.includes("estoppel") ||
    clean.includes("questionnaire") ||
    clean.includes("records")
  ) {
    return "documents";
  }

  if (
    clean.includes("owner request") ||
    clean.includes("management follow") ||
    clean.includes("follow up") ||
    clean.includes("message") ||
    clean.includes("complaint")
  ) {
    return "owner_request";
  }

  return "owner_request";
}

function normalizePriority(priority, title, description) {
  const clean = `${priority || ""} ${title || ""} ${description || ""}`.toLowerCase();

  if (
    clean.includes("emergency") ||
    clean.includes("high") ||
    clean.includes("flood") ||
    clean.includes("active leak") ||
    clean.includes("no water") ||
    clean.includes("fire") ||
    clean.includes("danger") ||
    clean.includes("unsafe") ||
    clean.includes("electrical hazard") ||
    clean.includes("elevator") ||
    clean.includes("security concern") ||
    clean.includes("gate stuck open")
  ) {
    return "high";
  }

  if (
    clean.includes("low") ||
    clean.includes("not urgent") ||
    clean.includes("whenever") ||
    clean.includes("general question")
  ) {
    return "low";
  }

  return "medium";
}

function generateTitle(title, description, category) {
  const providedTitle = cleanText(title);
  const cleanDescription = cleanText(description);
  const combined = `${providedTitle} ${cleanDescription} ${category || ""}`.toLowerCase();

  if (providedTitle) {
    return titleCase(providedTitle.length > 90 ? `${providedTitle.slice(0, 87)}...` : providedTitle);
  }

  if (
    (combined.includes("pool") || combined.includes("clubhouse")) &&
    (combined.includes("light") || combined.includes("burned") || combined.includes("burnt"))
  ) {
    return "Pool Light Near Clubhouse Burned Out";
  }

  if (combined.includes("gate")) return "Gate Access Issue Reported";
  if (combined.includes("leak")) return "Water Leak Reported";
  if (combined.includes("elevator")) return "Elevator Service Issue Reported";
  if (combined.includes("violation")) return "Violation Concern Reported";
  if (combined.includes("payment") || combined.includes("balance") || combined.includes("billing")) {
    return "Owner Billing Question Reported";
  }
  if (combined.includes("proposal") || combined.includes("sales")) return "New Management Proposal Inquiry";

  if (cleanDescription) {
    return titleCase(cleanDescription.length > 90 ? `${cleanDescription.slice(0, 87)}...` : cleanDescription);
  }

  return "New Ava Intake Request";
}

function buildDescription({ description, title, callerName, callerPhone, unit, category, priority }) {
  const cleanDescription = cleanText(description);
  const cleanTitle = cleanText(title);

  const lines = [];

  if (cleanDescription) {
    lines.push(`Caller reported: ${cleanDescription}`);
  } else if (cleanTitle) {
    lines.push(`Caller reported: ${cleanTitle}`);
  } else {
    lines.push("Ava created a new intake item requiring property manager review.");
  }

  lines.push("");
  lines.push(`Caller: ${callerName || "Ava Caller"}`);
  lines.push(`Phone: ${callerPhone || "Not provided"}`);
  lines.push(`Unit/Address: ${unit || "Pending manager confirmation"}`);
  lines.push(`Category: ${category}`);
  lines.push(`Priority: ${priority}`);
  lines.push("");
  lines.push("Source: Ava AI phone assistant");

  return lines.join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const args = getToolArgs(req.body);

    const rawTitle = cleanText(args.title);
    const rawDescription =
      cleanText(args.description) ||
      cleanText(args.request) ||
      cleanText(args.summary) ||
      cleanText(args.issue_summary);

    const callerName =
      cleanText(args.caller_name) ||
      cleanText(args.callerName) ||
      cleanText(args.customer_name) ||
      "Ava Caller";

    const callerPhone =
      cleanText(args.caller_phone) ||
      cleanText(args.callerPhone) ||
      cleanText(args.customer_phone) ||
      "Not provided";

    const unit =
      cleanText(args.unit) ||
      cleanText(args.address) ||
      cleanText(args.property_address) ||
      "Pending manager confirmation";

    const category = normalizeCategory(args.category, rawTitle, rawDescription);
    const priority = normalizePriority(args.priority, rawTitle, rawDescription);

    const finalTitle = generateTitle(rawTitle, rawDescription, category);

    const finalDescription = buildDescription({
      description: rawDescription,
      title: rawTitle,
      callerName,
      callerPhone,
      unit,
      category,
      priority,
    });

    const insertPayload = {
      title: finalTitle,
      description: finalDescription,
      request_type: category,
      category,
      priority,
      status: "open",

      association_name: cleanText(args.association_name) || "Demo Association",
      owner_name: callerName,
      owner_phone: callerPhone,
      owner_email: "",
      property_address: unit,
      best_contact_time: cleanText(args.best_contact_time) || "Normal business hours",
      source: "Ava AI Phone Intake",

      board_comment: finalDescription,
      board_response: "new_request_from_ava",
      board_acknowledged: false,
      board_reviewed: false,
      board_last_interaction_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("bos_actions")
      .insert(insertPayload)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "The request has been logged in the Board Operating System for management review.",
      action_id: data?.id,
      title: data?.title,
    });
  } catch (error) {
    console.error("Ava BOS route error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to create BOS action.",
    });
  }
}

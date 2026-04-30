import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getToolArgs(body) {
  try {
    if (body?.title) return body;

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

function cleanPriority(priority) {
  const value = String(priority || "medium").toLowerCase();

  if (value === "high") return "high";
  if (value === "low") return "low";
  return "medium";
}

function cleanCategory(category) {
  return category || "Owner Request";
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

    const title = args.title || "Owner request received";
    const description =
      args.description ||
      args.request ||
      args.summary ||
      "Ava received a request from a caller.";

    const callerName = args.caller_name || args.callerName || "Not provided";
    const callerPhone = args.caller_phone || args.callerPhone || "Not provided";
    const unit = args.unit || args.address || "Not provided";

    const category = cleanCategory(args.category);
    const priority = cleanPriority(args.priority);

    const fullTitle = title;

    const boardNote = [
      description,
      "",
      `Caller: ${callerName}`,
      `Phone: ${callerPhone}`,
      `Unit/Address: ${unit}`,
      "",
      "Source: Ava AI phone assistant",
    ].join("\n");

    const insertPayload = {
      title: fullTitle,
      category,
      priority,
      status: "open",
      board_comment: boardNote,
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

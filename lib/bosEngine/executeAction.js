import { supabase } from "../supabaseClient";
import { publishEvent } from "./eventBus";

export async function executeAction(action) {
  try {
    // 1. Save action
    const { data: actionData, error: actionError } = await supabase
      .from("bos_actions")
      .insert([
        {
          action_type: action.type,
          module: action.module,
          label: action.label,
          payload: action.payload || {},
          status: "completed",
        },
      ])
      .select()
      .single();

    if (actionError) throw actionError;

    // 2. Save event
    const eventMessage = `${action.label} executed`;

    const { error: eventError } = await supabase.from("bos_events").insert([
      {
        event_type: action.type,
        source_module: action.module,
        message: eventMessage,
        metadata: action.payload || {},
      },
    ]);

    if (eventError) throw eventError;

    // 3. Publish to live console
    publishEvent({
      type: action.type,
      message: eventMessage,
      module: action.module,
    });

    return actionData;
  } catch (error) {
    console.error("BOS Execution Error:", error);

    publishEvent({
      type: "error",
      message: "Action failed",
      module: action.module,
    });

    throw error;
  }
}

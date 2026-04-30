import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // Get all non-completed actions
    const { data: actions, error } = await supabase
      .from("bos_actions")
      .select("*")
      .neq("status", "completed");

    if (error) throw error;

    const now = new Date();
    let escalatedCount = 0;

    for (const action of actions) {
      if (!action.created_at) continue;

      const created = new Date(action.created_at);
      const hoursOld = (now - created) / (1000 * 60 * 60);

      // RULE: escalate if older than 24 hours and still not high priority
      if (hoursOld > 24 && action.priority !== "high") {
        await supabase
          .from("bos_actions")
          .update({ priority: "high" })
          .eq("id", action.id);

        await supabase.from("bos_events").insert([
          {
            action_id: action.id,
            message: "Auto-escalated due to inactivity (24h)",
          },
        ]);

        escalatedCount++;
      }
    }

    return res.status(200).json({
      success: true,
      escalated: escalatedCount,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

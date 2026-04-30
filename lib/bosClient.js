import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// CREATE ACTION
export async function createBOSAction(payload) {
  const { data, error } = await supabase
    .from("bos_actions")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;

  await supabase.from("bos_events").insert([
    {
      action_id: data.id,
      event_type: "action_created",
      message: `Action created: ${payload.title}`,
      module: payload.module || "Action Items",
    },
  ]);

  return data;
}

import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { audience, status, limit } = req.query || {};

    let query = supabase
      .from("bos_notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(Number(limit) || 50);

    if (audience) {
      query = query.eq("audience", audience);
    }

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Notification list failed:", error);

      return res.status(500).json({
        success: false,
        error: error.message || "Unable to load notifications.",
      });
    }

    return res.status(200).json({
      success: true,
      notifications: data || [],
    });
  } catch (error) {
    console.error("Notification list API failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unexpected notification list error.",
    });
  }
}

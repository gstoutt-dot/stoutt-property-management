import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeEmail(value) {
  return cleanText(value).toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const email = normalizeEmail(req.body?.email);

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Missing email.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("portal_access_approvals")
      .select(
        "id, association_id, association_name, email, role, status, approved_at, created_at"
      )
      .eq("email", email)
      .eq("status", "approved")
      .order("association_name", { ascending: true });

    if (error) {
      console.error("Portal my-access lookup failed:", error);

      return res.status(500).json({
        success: false,
        error: "Unable to load portal access.",
      });
    }

    const accessRows = Array.isArray(data) ? data : [];

    const roles = Array.from(
      new Set(accessRows.map((row) => String(row.role || "").toLowerCase()))
    ).filter(Boolean);

    const associations = accessRows.map((row) => ({
      access_id: row.id,
      association_id: row.association_id,
      association_name: row.association_name || "Association",
      role: String(row.role || "").toLowerCase(),
    }));

    return res.status(200).json({
      success: true,
      email,
      roles,
      associations,
    });
  } catch (error) {
    console.error("Portal my-access API failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unexpected portal access error.",
    });
  }
}

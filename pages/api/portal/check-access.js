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
      approved: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId =
      cleanText(req.body?.association_id) ||
      cleanText(req.body?.associationId);

    const email = normalizeEmail(req.body?.email);
    const role = cleanText(req.body?.role).toLowerCase();

    if (!associationId || !email || !role) {
      return res.status(400).json({
        approved: false,
        error: "Missing association, email, or role.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("portal_access_approvals")
      .select("id, association_id, email, role, status")
      .eq("association_id", associationId)
      .eq("email", email)
      .eq("role", role)
      .eq("status", "approved")
      .maybeSingle();

    if (error) {
      console.error("Portal access approval lookup failed:", error);

      return res.status(500).json({
        approved: false,
        error: "Unable to verify portal access.",
      });
    }

    return res.status(200).json({
      approved: Boolean(data?.id),
    });
  } catch (error) {
    console.error("Portal check-access API failed:", error);

    return res.status(500).json({
      approved: false,
      error: "Unexpected portal access verification error.",
    });
  }
}

import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId = String(
      req.query.associationId || req.query.association_id || ""
    ).trim();

    const unitNumber = String(req.query.unitNumber || "").trim();

    const ownerEmail = String(req.query.ownerEmail || "")
      .toLowerCase()
      .trim();

    let query = supabaseAdmin
      .from("owner_access_provisioning_records")
      .select("*")
      .order("created_at", { ascending: false });

    if (unitNumber) {
      query = query.eq("unit_number", unitNumber);
    }

    if (ownerEmail) {
      query = query.eq("owner_email", ownerEmail);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    const accessRecords = data || [];

    const summary = {
      total: accessRecords.length,
      active: accessRecords.filter(
        (record) =>
          String(record.access_status || "").toLowerCase() === "active"
      ).length,
      pending: accessRecords.filter(
        (record) =>
          String(record.access_status || "").toLowerCase() === "pending"
      ).length,
      invited: accessRecords.filter(
        (record) =>
          String(record.invite_status || "").toLowerCase() === "sent"
      ).length,
      notInvited: accessRecords.filter(
        (record) =>
          String(record.invite_status || "").toLowerCase() !== "sent"
      ).length,
    };

    return res.status(200).json({
      success: true,
      associationId: associationId || null,
      summary,
      accessRecords,
    });
  } catch (error) {
    console.error("List owner access records failed:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to load owner access records.",
    });
  }
}

import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
};

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";
const STORAGE_BUCKET = "meeting-packets";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed.",
      });
    }

    const {
      association_id,
      report_name,
      report_category,
      description,
      uploaded_by,
      file_name,
      file_type,
      file_base64,
    } = req.body || {};

    if (!report_name || !file_name || !file_base64) {
      return res.status(400).json({
        success: false,
        message: "Report name, file name, and file data are required.",
      });
    }

    const associationId = association_id || DEFAULT_ASSOCIATION_ID;
    const cleanFileName = String(file_name).replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `${associationId}/association-reports/${Date.now()}-${cleanFileName}`;

    const base64Data = file_base64.split(",").pop();
    const buffer = Buffer.from(base64Data, "base64");

    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: file_type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    const now = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from("association_reports")
      .insert({
        association_id: associationId,
        report_name: String(report_name).trim(),
        report_category: report_category || "other",
        description: description || "",
        report_url: publicUrlData?.publicUrl || "",
        report_file_name: file_name,
        report_type: file_type || "file",
        uploaded_by: uploaded_by || "Admin",
        uploaded_at: now,
        created_at: now,
        updated_at: now,
      })
      .select("*")
      .single();

    if (error) throw error;

    return res.status(200).json({
      success: true,
      report: data,
    });
  } catch (error) {
    console.error("Association report upload error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to upload association report.",
    });
  }
}

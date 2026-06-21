import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "15mb",
    },
  },
};

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
      file_name,
      file_type,
      file_base64,
      attachment_category,
    } = req.body || {};

    const associationId = String(association_id || "").trim();

    if (!associationId) {
      return res.status(400).json({
        success: false,
        message: "Association ID is required.",
      });
    }

    if (!file_name || !file_base64) {
      return res.status(400).json({
        success: false,
        message: "File name and file data are required.",
      });
    }

    const cleanFileName = String(file_name).replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `${associationId}/calendar/${Date.now()}-${cleanFileName}`;

    const base64Data = String(file_base64).split(",").pop();
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

    return res.status(200).json({
      success: true,
      attachment: {
        name: file_name,
        type: file_type || "application/octet-stream",
        category: attachment_category || "other",
        url: publicUrlData?.publicUrl || "",
        path: filePath,
      },
    });
  } catch (error) {
    console.error("Calendar attachment upload error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to upload calendar attachment.",
    });
  }
}

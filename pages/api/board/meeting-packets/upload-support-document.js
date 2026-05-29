import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
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
      packet_id,
      file_name,
      file_type,
      file_base64,
      document_category,
    } = req.body || {};

    if (!packet_id || !file_name || !file_base64) {
      return res.status(400).json({
        success: false,
        message: "Packet ID, file name, and file data are required.",
      });
    }

    const associationId = association_id || DEFAULT_ASSOCIATION_ID;
    const cleanFileName = String(file_name).replace(/[^a-zA-Z0-9._-]/g, "-");
    const filePath = `${associationId}/${packet_id}/${Date.now()}-${cleanFileName}`;

    const base64Data = file_base64.split(",").pop();
    const buffer = Buffer.from(base64Data, "base64");

    const { error: uploadError } = await supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, buffer, {
        contentType: file_type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath);

    const { data: packet, error: packetError } = await supabaseAdmin
      .from("board_meeting_packets")
      .select("*")
      .eq("id", packet_id)
      .maybeSingle();

    if (packetError) {
      throw packetError;
    }

    if (!packet) {
      return res.status(404).json({
        success: false,
        message: "Meeting record was not found.",
      });
    }

    const existingAttachments = Array.isArray(packet.attachments)
      ? packet.attachments
      : [];

    const nextAttachment = {
      file_name,
      file_path: filePath,
      file_url: publicUrlData?.publicUrl || "",
      file_type: file_type || "file",
      document_category: document_category || "other",
      uploaded_at: new Date().toISOString(),
    };

    const nextAttachments = [...existingAttachments, nextAttachment];

    const { data: updatedPacket, error: updateError } = await supabaseAdmin
      .from("board_meeting_packets")
      .update({
        attachments: nextAttachments,
        updated_at: new Date().toISOString(),
      })
      .eq("id", packet_id)
      .select("*")
      .maybeSingle();

    if (updateError) {
      throw updateError;
    }

    return res.status(200).json({
      success: true,
      packet: updatedPacket || {
        ...packet,
        attachments: nextAttachments,
      },
      attachment: nextAttachment,
    });
  } catch (error) {
    console.error("Support document upload error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to upload support document.",
    });
  }
}

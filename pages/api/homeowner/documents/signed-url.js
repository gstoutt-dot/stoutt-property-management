import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

const DOCUMENT_BUCKET = "association-documents";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { documentId } = req.query || {};

    const cleanDocumentId = String(documentId || "").trim();

    if (!cleanDocumentId) {
      return res.status(400).json({
        success: false,
        error: "Document ID is required.",
      });
    }

    const { data: documentRecord, error: documentError } =
      await supabaseAdmin
        .from("association_documents")
        .select("*")
        .eq("id", cleanDocumentId)
        .maybeSingle();

    if (documentError || !documentRecord) {
      return res.status(404).json({
        success: false,
        error: "Document not found.",
      });
    }

    if (!documentRecord.file_path) {
      return res.status(400).json({
        success: false,
        error: "Document file path is not available yet.",
      });
    }

    const { data: signedUrlData, error: signedUrlError } =
      await supabaseAdmin.storage
        .from(DOCUMENT_BUCKET)
        .createSignedUrl(documentRecord.file_path, 60 * 10);

    if (signedUrlError || !signedUrlData?.signedUrl) {
      throw signedUrlError || new Error("Unable to create signed URL.");
    }

    return res.status(200).json({
      success: true,
      signedUrl: signedUrlData.signedUrl,
      document: documentRecord,
    });
  } catch (error) {
    console.error("Create homeowner document signed URL failed:", error);

    return res.status(500).json({
      success: false,
      error:
        error.message ||
        "Unable to create homeowner document link.",
    });
  }
}

import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const associationId =
      clean(req.body.associationId) || clean(req.body.association_id);

    const associationName =
      clean(req.body.associationName) || clean(req.body.association_name);

    const documentTitle =
      clean(req.body.documentTitle) ||
      clean(req.body.document_title) ||
      "Ava Knowledge Document";

    const documentCategory =
      clean(req.body.documentCategory) ||
      clean(req.body.document_category) ||
      "general";

    const chunkText =
      clean(req.body.chunkText) ||
      clean(req.body.chunk_text) ||
      clean(req.body.content);

    const sourcePage =
      clean(req.body.sourcePage) || clean(req.body.source_page);

    const uploadedBy =
      clean(req.body.uploadedBy) || clean(req.body.uploaded_by) || "Admin";

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    if (!chunkText) {
      return res.status(400).json({
        success: false,
        error: "Missing chunkText.",
      });
    }

    const { data: fileRecord, error: fileError } = await supabaseAdmin
      .from("association_ava_knowledge_files")
      .insert({
        association_id: associationId,
        association_name: associationName || null,
        document_title: documentTitle,
        document_category: documentCategory,
        file_name: documentTitle,
        file_url: null,
        file_type: "manual-entry",
        knowledge_status: "active",
        uploaded_by: uploadedBy,
      })
      .select()
      .single();

    if (fileError) throw fileError;

    const { data: chunkRecord, error: chunkError } = await supabaseAdmin
      .from("association_ava_knowledge_chunks")
      .insert({
        association_id: associationId,
        knowledge_file_id: fileRecord.id,
        document_title: documentTitle,
        document_category: documentCategory,
        chunk_text: chunkText,
        source_page: sourcePage || null,
        chunk_order: 1,
        knowledge_status: "active",
      })
      .select()
      .single();

    if (chunkError) throw chunkError;

    return res.status(200).json({
      success: true,
      message: "Ava knowledge chunk created successfully.",
      file: fileRecord,
      chunk: chunkRecord,
    });
  } catch (error) {
    console.error("Create Ava knowledge chunk failed:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unable to create Ava knowledge chunk.",
    });
  }
}

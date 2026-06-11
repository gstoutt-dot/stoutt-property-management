import fs from "fs";
import formidable from "formidable";
import mammoth from "mammoth";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

function clean(value) {
  return String(value || "").trim();
}

function splitIntoChunks(text, maxLength = 1800) {
  const paragraphs = clean(text)
    .split(/\n+/)
    .map((item) => clean(item))
    .filter(Boolean);

  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    if ((current + "\n\n" + paragraph).length > maxLength) {
      if (current) chunks.push(current);
      current = paragraph;
    } else {
      current = current ? `${current}\n\n${paragraph}` : paragraph;
    }
  }

  if (current) chunks.push(current);

  return chunks;
}

function parseForm(req) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) reject(error);
      else resolve({ fields, files });
    });
  });
}

function firstField(value) {
  if (Array.isArray(value)) return clean(value[0]);
  return clean(value);
}

function firstFile(value) {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { fields, files } = await parseForm(req);

    const associationId =
      firstField(fields.associationId) || firstField(fields.association_id);

    const associationName =
      firstField(fields.associationName) || firstField(fields.association_name);

    const documentTitle =
      firstField(fields.documentTitle) ||
      firstField(fields.document_title) ||
      "Ava Knowledge Document";

    const documentCategory =
      firstField(fields.documentCategory) ||
      firstField(fields.document_category) ||
      "General";

    const sourcePage =
      firstField(fields.sourcePage) || firstField(fields.source_page);

    const uploadedBy =
      firstField(fields.uploadedBy) || firstField(fields.uploaded_by) || "Admin";

    const uploadedFile = firstFile(files.file);

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    if (!uploadedFile?.filepath) {
      return res.status(400).json({
        success: false,
        error: "Missing uploaded file.",
      });
    }

    const originalFilename =
      uploadedFile.originalFilename || uploadedFile.newFilename || "document";

    const extension = originalFilename.split(".").pop()?.toLowerCase();

    if (extension !== "docx") {
      return res.status(400).json({
        success: false,
        error: "Only DOCX files are supported in this first upload version.",
      });
    }

    const result = await mammoth.extractRawText({
      path: uploadedFile.filepath,
    });

    const extractedText = clean(result.value);

    if (!extractedText) {
      return res.status(400).json({
        success: false,
        error: "No readable text was found in this document.",
      });
    }

    const chunks = splitIntoChunks(extractedText);

    const { data: fileRecord, error: fileError } = await supabaseAdmin
      .from("association_ava_knowledge_files")
      .insert({
        association_id: associationId,
        association_name: associationName || null,
        document_title: documentTitle,
        document_category: documentCategory,
        file_name: originalFilename,
        file_url: null,
        file_type: "docx",
        knowledge_status: "active",
        uploaded_by: uploadedBy,
      })
      .select()
      .single();

    if (fileError) throw fileError;

    const chunkRows = chunks.map((chunk, index) => ({
      association_id: associationId,
      knowledge_file_id: fileRecord.id,
      document_title: documentTitle,
      document_category: documentCategory,
      chunk_text: chunk,
      source_page: sourcePage || null,
      chunk_order: index + 1,
      knowledge_status: "active",
    }));

    const { data: chunkRecords, error: chunkError } = await supabaseAdmin
      .from("association_ava_knowledge_chunks")
      .insert(chunkRows)
      .select();

    if (chunkError) throw chunkError;

    try {
      fs.unlinkSync(uploadedFile.filepath);
    } catch (cleanupError) {
      console.warn("Unable to clean uploaded temp file:", cleanupError);
    }

    return res.status(200).json({
      success: true,
      message: "Ava knowledge document uploaded and processed successfully.",
      file: fileRecord,
      chunk_count: chunkRecords?.length || 0,
    });
  } catch (error) {
    console.error("Ava knowledge document upload failed:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unable to upload Ava knowledge document.",
    });
  }
}

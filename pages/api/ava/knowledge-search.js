import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

function normalize(value) {
  return clean(value).toLowerCase();
}

function keywordScore(text, question) {
  const source = normalize(text);
  const words = normalize(question)
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter((word) => word.length > 3);

  let score = 0;

  for (const word of words) {
    if (source.includes(word)) score += 1;
  }

  return score;
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const source = req.method === "GET" ? req.query || {} : req.body || {};

    const associationId =
      clean(source.associationId) || clean(source.association_id);

    const question =
      clean(source.question) ||
      clean(source.prompt) ||
      clean(source.message);

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Missing question.",
      });
    }

    const { data: chunks, error } = await supabaseAdmin
      .from("association_ava_knowledge_chunks")
      .select(
        "id, association_id, document_title, document_category, chunk_text, source_page, chunk_order"
      )
      .eq("association_id", associationId)
      .eq("knowledge_status", "active")
      .limit(250);

    if (error) throw error;

    const ranked = (chunks || [])
      .map((chunk) => ({
        ...chunk,
        score: keywordScore(
          `${chunk.document_title} ${chunk.document_category} ${chunk.chunk_text}`,
          question
        ),
      }))
      .filter((chunk) => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (ranked.length === 0) {
      return res.status(200).json({
        success: true,
        found: false,
        answer:
          "I do not see a clear answer in the association knowledge base. Management can review this and follow up directly.",
        sources: [],
      });
    }

    const best = ranked[0];

    return res.status(200).json({
      success: true,
      found: true,
      answer: best.chunk_text,
      sources: ranked.map((chunk) => ({
        document_title: chunk.document_title,
        document_category: chunk.document_category,
        source_page: chunk.source_page,
      })),
    });
  } catch (error) {
    console.error("Ava knowledge search failed:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unable to search Ava knowledge base.",
    });
  }
}

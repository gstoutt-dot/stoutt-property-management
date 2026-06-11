import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function clean(value) {
  return String(value || "").trim();
}

function normalize(value) {
  return clean(value).toLowerCase();
}

function tokenize(value) {
  return normalize(value)
    .split(/\s+/)
    .map((word) => word.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean)
    .filter(
      (word) =>
        ![
          "the",
          "and",
          "for",
          "are",
          "with",
          "this",
          "that",
          "from",
          "what",
          "when",
          "where",
          "which",
          "there",
          "their",
          "about",
          "please",
          "have",
          "does",
          "can",
          "may",
          "will",
          "shall",
          "should",
          "would",
          "my",
          "your",
          "our",
          "unit",
          "association",
          "policy",
          "rules",
          "rule",
        ].includes(word)
    );
}

function getIntent(question) {
  const text = normalize(question);

  if (
    text.includes("pet") ||
    text.includes("pets") ||
    text.includes("dog") ||
    text.includes("cat") ||
    text.includes("animal")
  ) {
    return "pet";
  }

  if (
    text.includes("park") ||
    text.includes("parking") ||
    text.includes("car") ||
    text.includes("vehicle") ||
    text.includes("guest space") ||
    text.includes("commercial vehicle")
  ) {
    return "parking";
  }

  if (
    text.includes("rent") ||
    text.includes("rental") ||
    text.includes("lease") ||
    text.includes("tenant")
  ) {
    return "rental";
  }

  if (
    text.includes("pool") ||
    text.includes("clubhouse") ||
    text.includes("amenity")
  ) {
    return "pool";
  }

  if (
    text.includes("noise") ||
    text.includes("quiet") ||
    text.includes("party") ||
    text.includes("loud")
  ) {
    return "noise";
  }

  if (
    text.includes("architectural") ||
    text.includes("modification") ||
    text.includes("modify") ||
    text.includes("exterior") ||
    text.includes("window covering")
  ) {
    return "architectural";
  }

  if (
    text.includes("repair") ||
    text.includes("maintenance") ||
    text.includes("responsible") ||
    text.includes("responsibility")
  ) {
    return "maintenance";
  }

  return "general";
}

function expandQuestionTerms(question) {
  const terms = new Set(tokenize(question));
  const intent = getIntent(question);

  if (intent === "pet") {
    terms.add("pet");
    terms.add("pets");
    terms.add("animal");
    terms.add("animals");
    terms.add("dog");
    terms.add("dogs");
    terms.add("cat");
    terms.add("cats");
    terms.add("leashed");
    terms.add("cleanup");
  }

  if (intent === "parking") {
    terms.add("parking");
    terms.add("park");
    terms.add("vehicle");
    terms.add("vehicles");
    terms.add("guest");
    terms.add("commercial");
    terms.add("assigned");
    terms.add("towed");
  }

  if (intent === "rental") {
    terms.add("rent");
    terms.add("rental");
    terms.add("rentals");
    terms.add("lease");
    terms.add("leases");
    terms.add("leasing");
    terms.add("tenant");
    terms.add("occupancy");
    terms.add("application");
  }

  if (intent === "pool") {
    terms.add("pool");
    terms.add("amenity");
    terms.add("amenities");
    terms.add("clubhouse");
    terms.add("reservation");
    terms.add("hours");
    terms.add("glass");
    terms.add("swim");
    terms.add("attire");
  }

  if (intent === "noise") {
    terms.add("noise");
    terms.add("quiet");
    terms.add("hours");
    terms.add("disturb");
    terms.add("disturbs");
    terms.add("party");
    terms.add("loud");
  }

  if (intent === "architectural") {
    terms.add("architectural");
    terms.add("exterior");
    terms.add("modification");
    terms.add("modifications");
    terms.add("approval");
    terms.add("window");
    terms.add("coverings");
  }

  if (intent === "maintenance") {
    terms.add("maintenance");
    terms.add("repair");
    terms.add("repairs");
    terms.add("responsibility");
    terms.add("responsible");
    terms.add("owner");
    terms.add("association");
  }

  return Array.from(terms);
}

function expectedHeadingForIntent(intent) {
  if (intent === "pet") return "pet rules";
  if (intent === "parking") return "parking rules";
  if (intent === "rental") return "rental rules";
  if (intent === "pool") return "pool rules";
  if (intent === "noise") return "noise rules";
  if (intent === "architectural") return "architectural rules";
  if (intent === "maintenance") return "maintenance responsibility";
  return "";
}

function keywordScore(text, question) {
  const source = normalize(text);
  const terms = expandQuestionTerms(question);
  const intent = getIntent(question);
  const expectedHeading = expectedHeadingForIntent(intent);

  let score = 0;

  for (const term of terms) {
    if (source.includes(term)) score += 1;
  }

  if (expectedHeading && source.includes(expectedHeading)) {
    score += 25;
  }

  if (intent === "pet" && source.includes("pet rules")) score += 40;
  if (intent === "parking" && source.includes("parking rules")) score += 40;
  if (intent === "rental" && source.includes("rental rules")) score += 40;
  if (intent === "pool" && source.includes("pool rules")) score += 40;
  if (intent === "noise" && source.includes("noise rules")) score += 40;
  if (intent === "architectural" && source.includes("architectural rules")) {
    score += 40;
  }

  return score;
}

function isHeading(value) {
  const lower = normalize(value);

  if (!lower) return false;

  return (
    lower === "pool rules" ||
    lower === "parking rules" ||
    lower === "noise rules" ||
    lower === "pet rules" ||
    lower === "rental rules" ||
    lower === "architectural rules" ||
    lower.includes("maintenance responsibility") ||
    lower.includes("resident accounts") ||
    lower.includes("association overview") ||
    lower.includes("company information") ||
    lower.includes("declaration excerpts")
  );
}

function splitIntoAnswerUnits(text) {
  return clean(text)
    .replace(/\s+-\s+/g, "\n")
    .replace(/\. - /g, ".\n")
    .replace(
      /(Pool Rules|Parking Rules|Noise Rules|Pet Rules|Rental Rules|Architectural Rules)/gi,
      "\n$1\n"
    )
    .split(/\n+/)
    .map((item) => clean(item))
    .filter(Boolean);
}

function buildSectionFromHeading(units, headingIndex) {
  const selected = [units[headingIndex]];

  for (let index = headingIndex + 1; index < units.length; index += 1) {
    if (isHeading(units[index])) break;

    selected.push(units[index]);

    if (selected.join(" ").length > 900) break;
  }

  return selected.join(" ");
}

function findIntentHeadingIndex(units, question) {
  const intent = getIntent(question);
  const heading = expectedHeadingForIntent(intent);

  if (!heading) return -1;

  return units.findIndex((unit) => normalize(unit) === heading);
}

function findBestAnswerText(chunkText, question) {
  const units = splitIntoAnswerUnits(chunkText);
  const intentHeadingIndex = findIntentHeadingIndex(units, question);

  if (intentHeadingIndex >= 0) {
    const sectionAnswer = buildSectionFromHeading(units, intentHeadingIndex);

    if (sectionAnswer.length <= 1000) {
      return sectionAnswer;
    }

    return `${sectionAnswer.slice(0, 997)}...`;
  }

  const rankedUnits = units
    .map((unit, index) => ({
      text: unit,
      index,
      score: keywordScore(unit, question),
      heading: isHeading(unit),
    }))
    .filter((unit) => unit.score > 0)
    .sort((a, b) => {
      if (a.heading && !b.heading) return -1;
      if (!a.heading && b.heading) return 1;
      return b.score - a.score;
    });

  if (rankedUnits.length === 0) {
    return chunkText;
  }

  const bestUnit = rankedUnits[0];

  if (bestUnit.heading) {
    const sectionAnswer = buildSectionFromHeading(units, bestUnit.index);

    if (sectionAnswer.length <= 1000) {
      return sectionAnswer;
    }

    return `${sectionAnswer.slice(0, 997)}...`;
  }

  const relatedHeadingIndex = units
    .slice(0, bestUnit.index)
    .map((unit, index) => ({
      unit,
      index,
    }))
    .reverse()
    .find((item) => isHeading(item.unit))?.index;

  if (relatedHeadingIndex !== undefined) {
    const sectionAnswer = buildSectionFromHeading(units, relatedHeadingIndex);

    if (sectionAnswer.length <= 1000) {
      return sectionAnswer;
    }

    return `${sectionAnswer.slice(0, 997)}...`;
  }

  if (bestUnit.text.length <= 700) {
    return bestUnit.text;
  }

  return `${bestUnit.text.slice(0, 697)}...`;
}

function polishAnswer(answer, source) {
  const cleanAnswer = clean(answer);

  if (!cleanAnswer) {
    return "I do not see a clear answer in the association knowledge base. Management can review this and follow up directly.";
  }

  const title = clean(source?.document_title);
  const category = clean(source?.document_category);

  if (category || title) {
    return `According to ${title || category}, ${cleanAnswer}`;
  }

  return cleanAnswer;
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
    const answerText = findBestAnswerText(best.chunk_text, question);

    return res.status(200).json({
      success: true,
      found: true,
      answer: polishAnswer(answerText, best),
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

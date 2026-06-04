import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function parseCsvLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && nextChar === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current.trim());

  return result;
}

function parseCsv(csvData) {
  const lines = String(csvData || "")
    .replace(/\r/g, "")
    .split("\n")
    .filter((line) => line.trim());

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });

    return row;
  });
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }

    const { csvData, fileName } = req.body || {};

    if (!csvData) {
      return res.status(400).json({
        success: false,
        message: "CSV data required",
      });
    }

    const rows = parseCsv(csvData);

    const now = new Date().toISOString();

    const prospects = rows
      .map((row) => ({
        association_name: row["Association Name"] || "",
        community_name: row["Community Name"] || "",
        association_type: row["Association Type"] || "Condominium",
        address: row["Address"] || "",
        city: row["City"] || "",
        state: row["State"] || "FL",
        zip: row["Zip"] || "",
        county: row["County"] || "Broward",
        units: row["Units"] ? Number(row["Units"]) : null,

        current_management_company: row["Management Company"] || "",
        accounting_provider: row["Accounting Provider"] || "",

        president_name: row["President"] || "",
        president_email: row["President Email"] || "",
        president_phone: row["President Phone"] || "",

        treasurer_name: row["Treasurer"] || "",
        treasurer_email: row["Treasurer Email"] || "",
        treasurer_phone: row["Treasurer Phone"] || "",

        manager_contact_name: row["Manager Contact"] || "",
        manager_contact_email: row["Manager Email"] || "",
        manager_contact_phone: row["Manager Phone"] || "",

        main_phone: row["Phone"] || "",
        main_email: row["Email"] || "",
        website: row["Website"] || "",

        pain_points: row["Pain Points"] || "",
        status: row["Status"] || "Research",
        priority: row["Priority"] || "Normal",
        lead_source: row["Lead Source"] || "Broward Target List",

        created_at: now,
        updated_at: now,
      }))
      .filter((prospect) => prospect.association_name);

    if (prospects.length > 0) {
      const { error } = await supabaseAdmin
        .from("spm_prospect_pipeline")
        .insert(prospects);

      if (error) throw error;
    }

    await supabaseAdmin.from("spm_prospect_imports").insert({
      file_name: fileName || "Prospect Import",
      imported_count: prospects.length,
    });

    return res.status(200).json({
      success: true,
      imported: prospects.length,
    });
  } catch (error) {
    console.error("Prospect import error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Unable to import prospects.",
    });
  }
}

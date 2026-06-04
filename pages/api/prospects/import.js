import Papa from "papaparse";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

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

    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data || [];

    const prospects = rows.map((row) => ({
      association_name: row["Association Name"] || "",
      address: row["Address"] || "",
      city: row["City"] || "",
      units: Number(row["Units"] || 0),
      current_management_company:
        row["Management Company"] || "",
      president_name: row["President"] || "",
      president_email: row["President Email"] || "",
      president_phone: row["President Phone"] || "",
      treasurer_name: row["Treasurer"] || "",
      treasurer_email: row["Treasurer Email"] || "",
      status: "Research",
      priority: "Normal",
      county: "Broward",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));

    if (prospects.length > 0) {
      const { error } = await supabaseAdmin
        .from("spm_prospect_pipeline")
        .insert(prospects);

      if (error) throw error;
    }

    await supabaseAdmin
      .from("spm_prospect_imports")
      .insert({
        file_name: fileName || "Prospect Import",
        imported_count: prospects.length,
      });

    return res.status(200).json({
      success: true,
      imported: prospects.length,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

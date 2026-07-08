import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      name,
      email,
      phone,
      association_name,
      property_address,
      city,
      state,
      zip_code,
      number_of_units,
      current_management_status,
      services_requested,
      biggest_challenge,
      message,
    } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required.",
      });
    }

    const { data, error } = await supabaseAdmin
      .from("spm_proposal_requests")
      .insert([
        {
          name,
          email,
          phone,
          association_name,
          property_address,
          city,
          state,
          zip_code,
          number_of_units,
          current_management_status,
          services_requested,
          biggest_challenge,
          message,
          lead_source: "spm_request_proposal",
          lead_status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("SPM proposal request insert error:", error);

      return res.status(500).json({
        success: false,
        error: "Unable to save proposal request.",
      });
    }

    const notificationBody = `
New SPM Proposal Request

Name: ${name}
Email: ${email}
Phone: ${phone || ""}

Association:
${association_name || ""}

Property Address:
${property_address || ""}

City:
${city || ""}

State:
${state || ""}

Zip:
${zip_code || ""}

Units:
${number_of_units || ""}

Current Management:
${current_management_status || ""}

Services Requested:
${services_requested || ""}

Biggest Challenge:
${biggest_challenge || ""}

Message:

${message || ""}

Record ID:
${data.id}
`;

    const mailResponse = await fetch(
      "https://bosaisoftware.com/api/internal/send-mail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-bosai-internal-key": process.env.BOSAI_INTERNAL_API_KEY,
        },
        body: JSON.stringify({
          to: "glenn@stouttmgmt.com",
          subject: "New SPM Proposal Request",
          text: notificationBody,
          replyTo: email,
        }),
      }
    );

    const mailResult = await mailResponse.json();

    if (!mailResponse.ok || !mailResult.success) {
      console.error("SPM notification email failed:", mailResult);
    } else {
      await supabaseAdmin
        .from("spm_proposal_requests")
        .update({
          notification_sent: true,
          notification_sent_at: new Date().toISOString(),
        })
        .eq("id", data.id);
    }

    return res.status(200).json({
      success: true,
      proposal_request: data,
    });
  } catch (error) {
    console.error("SPM proposal request API error:", error);

    return res.status(500).json({
      success: false,
      error: "Unexpected server error.",
    });
  }
}

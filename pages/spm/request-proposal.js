import { createClient } from "@supabase/supabase-js";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ses = new SESClient({
  region: process.env.AWS_SES_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const NOTIFY_TO = "glenn@stouttmgmt.com";
const FROM_EMAIL = process.env.SES_FROM_EMAIL || "info@bosaisoftware.com";

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

    const emailBody = `
New SPM Proposal Request

Name: ${name}
Email: ${email}
Phone: ${phone || ""}

Association Name: ${association_name || ""}
Property Address: ${property_address || ""}
City: ${city || ""}
State: ${state || ""}
Zip Code: ${zip_code || ""}

Number of Units: ${number_of_units || ""}
Current Management Status: ${current_management_status || ""}
Services Requested: ${services_requested || ""}
Biggest Challenge: ${biggest_challenge || ""}

Message:
${message || ""}

Supabase Record ID:
${data.id}
`;

    await ses.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [NOTIFY_TO],
        },
        Message: {
          Subject: {
            Data: "New SPM Proposal Request",
          },
          Body: {
            Text: {
              Data: emailBody,
            },
          },
        },
      })
    );

    await supabaseAdmin
      .from("spm_proposal_requests")
      .update({
        notification_sent: true,
        notification_sent_at: new Date().toISOString(),
      })
      .eq("id", data.id);

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

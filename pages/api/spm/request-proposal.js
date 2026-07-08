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

const response = await fetch(
  "https://bosaisoftware.com/api/internal/send-mail",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-bosai-internal-key":
        process.env.BOSAI_INTERNAL_API_KEY,
    },
    body: JSON.stringify({
      to: "glenn@stouttmgmt.com",
      subject: "New SPM Proposal Request",
      text: notificationBody,
      replyTo: email,
    }),
  }
);

const result = await response.json();

if (!response.ok || !result.success) {
  throw new Error("Unable to send notification email.");
}

await supabaseAdmin
  .from("spm_proposal_requests")
  .update({
    notification_sent: true,
    notification_sent_at: new Date().toISOString(),
  })
  .eq("id", data.id);

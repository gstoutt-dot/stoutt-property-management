const DEFAULT_FROM_EMAIL =
  process.env.SPM_FROM_EMAIL || "Stoutt Property Management <info@stouttmgmt.com>";

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

function cleanText(value, fallback = "") {
  return String(value || "").trim() || fallback;
}

export async function sendBoardMessageEmailAlert({
  to,
  recipientName = "Board Member",
  subject,
  messageTitle,
}) {
  const safeTo = cleanText(to);

  if (!safeTo) {
    return {
      success: false,
      skipped: true,
      error: "Missing recipient email.",
    };
  }

  if (!RESEND_API_KEY) {
    return {
      success: false,
      skipped: true,
      error: "Email provider not configured.",
    };
  }

  const emailSubject = cleanText(
    subject,
    "New board message from Stoutt Property Management"
  );

  const safeMessageTitle = cleanText(messageTitle, "Board Message");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2>New Board Message</h2>
      <p>Hello ${recipientName},</p>
      <p>Management has sent a new board message regarding:</p>
      <p><strong>${safeMessageTitle}</strong></p>
      <p>Please log in to SPM to review and respond.</p>
      <p style="margin-top: 24px;">
        Stoutt Property Management<br />
        Board Communication Center
      </p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: DEFAULT_FROM_EMAIL,
      to: [safeTo],
      subject: emailSubject,
      html,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    return {
      success: false,
      skipped: false,
      error: result?.message || "Email delivery failed.",
      provider_response: result,
    };
  }

  return {
    success: true,
    skipped: false,
    error: null,
    provider_response: result,
  };
}

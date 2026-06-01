const SMS_ENABLED = process.env.SPM_SMS_ENABLED === "true";

export async function sendBoardMessageSmsAlert({
  to,
  messageTitle,
}) {
  if (!to) {
    return {
      success: false,
      skipped: true,
      error: "Missing recipient phone.",
    };
  }

  if (!SMS_ENABLED) {
    return {
      success: false,
      skipped: true,
      error: "SMS not enabled. Twilio approval pending.",
    };
  }

  return {
    success: false,
    skipped: true,
    error: "Twilio SMS delivery not wired yet.",
  };
}

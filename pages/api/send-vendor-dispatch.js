export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      vendorEmail,
      vendorPhone,
      requestType,
      propertyName,
      ownerName,
      ownerPhone,
      propertyAddress,
      description,
      dispatchNote,
    } = req.body || {};

    if (!vendorEmail) {
      return res.status(400).json({
        success: false,
        message: "Vendor email is required.",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "RESEND_API_KEY is missing in Vercel.",
      });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2>New Vendor Dispatch</h2>
        <p>You have received a new dispatch request from <strong>Stoutt Property Management</strong>.</p>
        <hr />
        <p><strong>Request Type:</strong> ${requestType || "Service Request"}</p>
        <p><strong>Association:</strong> ${propertyName || "Association"}</p>
        <p><strong>Owner:</strong> ${ownerName || "N/A"}</p>
        <p><strong>Owner Phone:</strong> ${ownerPhone || "N/A"}</p>
        <p><strong>Location:</strong> ${propertyAddress || "N/A"}</p>
        <p><strong>Description:</strong></p>
        <div style="padding: 12px; background: #f4f4f4; border-radius: 8px;">
          ${description || "No description provided."}
        </div>
        <p><strong>Dispatch Notes:</strong></p>
        <div style="padding: 12px; background: #fff8dc; border-radius: 8px;">
          ${dispatchNote || "No additional notes."}
        </div>
        <p>Vendor Phone on File: ${vendorPhone || "N/A"}</p>
        <p style="margin-top: 32px;">— Stoutt Property Management</p>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Stoutt Property Management <dispatch@stouttmgmt.com>",
        to: [vendorEmail],
        subject: `New Dispatch • ${requestType || "Service Request"}`,
        html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message: "Resend email delivery failed.",
        details: result,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Vendor dispatch email sent successfully.",
      email: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to send vendor dispatch email.",
      error: error.message,
    });
  }
}

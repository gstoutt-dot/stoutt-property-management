export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { action } = req.body;

    if (!action || !action.id) {
      return res.status(400).json({ error: "Missing action data" });
    }

    // Prevent double dispatch
    if (action.dispatched) {
      return res.status(200).json({
        success: true,
        message: "Already dispatched",
      });
    }

    // Simulate vendor dispatch call
    const dispatchResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/send-vendor-dispatch`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
        }),
      }
    );

    const dispatchResult = await dispatchResponse.json();

    return res.status(200).json({
      success: true,
      dispatched: true,
      dispatchResult,
    });
  } catch (err) {
    console.error("Board dispatch error:", err);
    return res.status(500).json({
      error: "Dispatch failed",
    });
  }
}

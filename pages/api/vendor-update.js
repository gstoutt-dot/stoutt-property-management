export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { actionId, status, note } = req.body;

    if (!actionId) {
      return res.status(400).json({ error: "Missing actionId" });
    }

    const stored = JSON.parse(global.bos_actions || "[]");

    const updated = stored.map((item) => {
      if (item.id === actionId) {
        return {
          ...item,
          vendorStatus: status || "updated",
          vendorNote: note || "",
          vendorUpdatedAt: new Date().toISOString(),
        };
      }
      return item;
    });

    global.bos_actions = JSON.stringify(updated);

    return res.status(200).json({
      success: true,
      message: "Vendor response recorded",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

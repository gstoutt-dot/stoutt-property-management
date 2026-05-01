// File: /api/bos-demo-store.js

let STORE = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(STORE);
  }

  if (req.method === "POST") {
    const item = req.body;

    const enrichedItem = {
      ...item,
      id: `ITEM-${Date.now()}`,
      status: item.status || "Submitted to Manager Intake",
      createdAt: new Date().toISOString(),
      history: [
        {
          status: item.status || "Submitted to Manager Intake",
          timestamp: new Date().toISOString(),
          note: "Submitted from Owner Portal",
        },
      ],
    };

    STORE.push(enrichedItem);

    return res.status(200).json({ success: true, item: enrichedItem });
  }

  if (req.method === "PUT") {
    const { id, status, note } = req.body;

    STORE = STORE.map((item) => {
      if (item.id === id) {
        const updated = {
          ...item,
          status: status || item.status,
          history: [
            ...(item.history || []),
            {
              status: status || item.status,
              timestamp: new Date().toISOString(),
              note: note || "Status updated",
            },
          ],
        };

        return updated;
      }
      return item;
    });

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}


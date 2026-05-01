let bosDemoStore = {
  managerSubmissions: [
    {
      id: "SUB-9001",
      sourceId: "INV-7780",
      type: "Vendor Payment",
      title: "Pool light replacement - Elite Electrical",
      association: "Harbor Pointe HOA",
      amount: "$725.00",
      status: "Submitted to Board",
      priority: "High",
      risk: "Low",
      submittedBy: "Manager",
      submittedAt: "Today · 10:45 AM",
      notes:
        "Manager verified completed work order, matched invoice, and recommends approval for payment.",
    },
    {
      id: "SUB-9002",
      sourceId: "REQ-1047",
      type: "Violation Action",
      title: "Commercial vehicle enforcement",
      association: "Harbor Pointe HOA",
      amount: "N/A",
      status: "Submitted to Board",
      priority: "Medium",
      risk: "Medium",
      submittedBy: "Manager",
      submittedAt: "Today · 11:05 AM",
      notes:
        "Manager recommends board review before formal enforcement action proceeds.",
    },
  ],

  boardDecisions: [
    {
      id: "DEC-7001",
      submissionId: "SUB-8988",
      title: "Roof repair approval",
      decision: "Approved",
      vote: "3-0",
      decidedAt: "Today · 2:14 PM",
      notes: "Urgent repair approved unanimously.",
    },
  ],
};

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: bosDemoStore,
    });
  }

  if (req.method === "POST") {
    const { action, payload } = req.body || {};

    if (action === "submitToBoard") {
      const newSubmission = {
        id: `SUB-${Date.now().toString().slice(-4)}`,
        status: "Submitted to Board",
        submittedBy: "Manager",
        submittedAt: "Just now",
        ...payload,
      };

      bosDemoStore.managerSubmissions.unshift(newSubmission);

      return res.status(200).json({
        success: true,
        message: "Item submitted to Board.",
        data: newSubmission,
      });
    }

    if (action === "recordDecision") {
      const newDecision = {
        id: `DEC-${Date.now().toString().slice(-4)}`,
        decidedAt: "Just now",
        ...payload,
      };

      bosDemoStore.boardDecisions.unshift(newDecision);

      bosDemoStore.managerSubmissions = bosDemoStore.managerSubmissions.map(
        (item) =>
          item.id === payload.submissionId
            ? {
                ...item,
                status: payload.decision,
              }
            : item
      );

      return res.status(200).json({
        success: true,
        message: "Board decision recorded.",
        data: newDecision,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Unknown action.",
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed.",
  });
}

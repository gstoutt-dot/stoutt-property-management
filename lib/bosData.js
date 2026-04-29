// lib/bosData.js

export const bosSignals = [
  {
    id: "VIO-1024",
    module: "Violations",
    type: "Compliance",
    title: "Repeat parking violation pending escalation",
    association: "Demo Association",
    priority: "High",
    status: "Escalation Review",
    owner: "Management Team",
    dueDate: "2026-05-03",
    daysOpen: 18,
    riskLevel: "High",
    nextAction: "Prepare board hearing notice",
    route: "/board/violation-review",
  },
  {
    id: "ARC-221",
    module: "ARC Approvals",
    type: "Architectural",
    title: "Fence modification awaiting committee decision",
    association: "Demo Association",
    priority: "Medium",
    status: "Pending Review",
    owner: "ARC Committee",
    dueDate: "2026-05-06",
    daysOpen: 9,
    riskLevel: "Medium",
    nextAction: "Request final committee vote",
    route: "/board/architectural-approvals",
  },
  {
    id: "MNT-788",
    module: "Maintenance",
    type: "Operations",
    title: "Pool light repair still unresolved",
    association: "Demo Association",
    priority: "High",
    status: "Vendor Follow-Up",
    owner: "Manager",
    dueDate: "2026-05-01",
    daysOpen: 12,
    riskLevel: "High",
    nextAction: "Confirm vendor completion date",
    route: "/board/maintenance-review",
  },
  {
    id: "FIN-340",
    module: "Financial Review",
    type: "Financial",
    title: "Operating expense variance above threshold",
    association: "Demo Association",
    priority: "High",
    status: "Board Review",
    owner: "Treasurer",
    dueDate: "2026-05-08",
    daysOpen: 6,
    riskLevel: "High",
    nextAction: "Review QuickBooks variance detail",
    route: "/board/financial-review",
  },
  {
    id: "LGL-145",
    module: "Legal Review",
    type: "Legal",
    title: "Violation file recommended for counsel review",
    association: "Demo Association",
    priority: "Critical",
    status: "Counsel Review Needed",
    owner: "Board President",
    dueDate: "2026-04-30",
    daysOpen: 21,
    riskLevel: "Critical",
    nextAction: "Authorize legal referral",
    route: "/board/compliance-legal-review",
  },
  {
    id: "RSK-511",
    module: "Insurance & Risk",
    type: "Risk",
    title: "Insurance renewal checklist incomplete",
    association: "Demo Association",
    priority: "Medium",
    status: "In Progress",
    owner: "Manager",
    dueDate: "2026-05-12",
    daysOpen: 4,
    riskLevel: "Medium",
    nextAction: "Upload renewal documents",
    route: "/board/insurance-risk",
  },
];

export const aiEvents = [
  {
    id: "AI-101",
    type: "Resident Inquiry",
    event: "Pool light maintenance request received",
    source: "Voice Assistant",
    status: "Open",
    priority: "Medium",
    route: "/board/maintenance-review",
  },
  {
    id: "AI-102",
    type: "Delinquency Alert",
    event: "Owner asked about balance past due",
    source: "Voice Assistant",
    status: "Needs Review",
    priority: "High",
    route: "/board/financial-review",
  },
  {
    id: "AI-103",
    type: "Rule Violation",
    event: "Noise complaint captured after hours",
    source: "Voice Assistant",
    status: "Escalated",
    priority: "High",
    route: "/board/violation-review",
  },
];

export const bosMetrics = {
  openItems: bosSignals.length,
  highRiskItems: bosSignals.filter(
    (item) => item.riskLevel === "High" || item.riskLevel === "Critical"
  ).length,
  overdueItems: bosSignals.filter((item) => item.daysOpen > 14).length,
  financialAlerts: bosSignals.filter((item) => item.type === "Financial").length,
  legalEscalations: bosSignals.filter((item) => item.type === "Legal").length,
  operationalIssues: bosSignals.filter((item) => item.type === "Operations").length,
  aiEvents: aiEvents.length,
};

export const getSignalsByModule = (moduleName) => {
  return bosSignals.filter((item) => item.module === moduleName);
};

export const getHighRiskSignals = () => {
  return bosSignals.filter(
    (item) => item.riskLevel === "High" || item.riskLevel === "Critical"
  );
};

export const getSignalsByType = (type) => {
  return bosSignals.filter((item) => item.type === type);
};

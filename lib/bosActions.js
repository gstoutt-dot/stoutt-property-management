import {
  bosMetrics,
  bosSignals,
  aiEvents,
  maintenanceItems,
  violationItems,
  financialItems,
  vendorItems,
  reserveItems,
  documentItems,
  actionItems,
} from "./bosData";

export const actionTypes = {
  CLOSE: "close",
  ESCALATE: "escalate",
  ASSIGN: "assign",
  REVIEW: "review",
  CREATE_TASK: "create_task",
  ROUTE_SIGNAL: "route_signal",
};

export const actionStatuses = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  ESCALATED: "Escalated",
  ASSIGNED: "Assigned",
  REVIEWED: "Reviewed",
  CLOSED: "Closed",
};

export const bosRoles = {
  MANAGER: "manager",
  BOARD: "board",
  OWNER: "owner",
  VENDOR: "vendor",
  ACCOUNTING: "accounting",
};

export const rolePermissions = {
  manager: {
    canClose: true,
    canEscalate: true,
    canAssign: true,
    canReview: true,
    canCreateTask: true,
    canRouteSignal: true,
  },
  board: {
    canClose: false,
    canEscalate: true,
    canAssign: false,
    canReview: true,
    canCreateTask: true,
    canRouteSignal: false,
  },
  owner: {
    canClose: false,
    canEscalate: false,
    canAssign: false,
    canReview: false,
    canCreateTask: false,
    canRouteSignal: false,
  },
  vendor: {
    canClose: false,
    canEscalate: true,
    canAssign: false,
    canReview: true,
    canCreateTask: false,
    canRouteSignal: false,
  },
  accounting: {
    canClose: false,
    canEscalate: true,
    canAssign: false,
    canReview: true,
    canCreateTask: true,
    canRouteSignal: true,
  },
};

export const bosActionLog = [
  {
    id: "audit-001",
    timestamp: "Today · 9:12 AM",
    module: "Maintenance Review",
    action: "AI Event Routed",
    actor: "Ava AI Assistant",
    summary:
      "Pool light issue classified as maintenance responsibility and routed for manager review.",
    status: "Completed",
  },
  {
    id: "audit-002",
    timestamp: "Today · 9:28 AM",
    module: "Violation Review",
    action: "Escalation Flag Created",
    actor: "BOS Signal Engine",
    summary:
      "Repeat violation detected and marked for board visibility before next packet.",
    status: "Open",
  },
  {
    id: "audit-003",
    timestamp: "Today · 10:04 AM",
    module: "Financial Review",
    action: "Accounting Exception Detected",
    actor: "QuickBooks Integration",
    summary:
      "Variance signal prepared for management review and board financial packet.",
    status: "In Progress",
  },
];

export const sharedBosActions = [
  {
    id: "action-close",
    label: "Close Item",
    type: actionTypes.CLOSE,
    description:
      "Marks an item as resolved and creates a permanent audit record.",
    requiredPermission: "canClose",
  },
  {
    id: "action-escalate",
    label: "Escalate",
    type: actionTypes.ESCALATE,
    description:
      "Raises the item for manager, board, legal, or accounting attention.",
    requiredPermission: "canEscalate",
  },
  {
    id: "action-assign",
    label: "Assign",
    type: actionTypes.ASSIGN,
    description:
      "Assigns responsibility to management, accounting, a vendor, or a board role.",
    requiredPermission: "canAssign",
  },
  {
    id: "action-review",
    label: "Mark Reviewed",
    type: actionTypes.REVIEW,
    description:
      "Confirms the item has been reviewed and preserves the review trail.",
    requiredPermission: "canReview",
  },
  {
    id: "action-create-task",
    label: "Create Task",
    type: actionTypes.CREATE_TASK,
    description:
      "Creates a linked action item that can appear across dashboard, workflow, and packet views.",
    requiredPermission: "canCreateTask",
  },
  {
    id: "action-route-signal",
    label: "Route Signal",
    type: actionTypes.ROUTE_SIGNAL,
    description:
      "Pushes the signal into another module such as legal, reserves, financial review, or meeting packet.",
    requiredPermission: "canRouteSignal",
  },
];

export const moduleActionMap = {
  "Maintenance Review": [
    "Close Item",
    "Escalate",
    "Assign",
    "Create Task",
    "Route Signal",
  ],
  "Violation Review": [
    "Close Item",
    "Escalate",
    "Assign",
    "Create Task",
    "Route Signal",
  ],
  "Financial Review": [
    "Mark Reviewed",
    "Escalate",
    "Create Task",
    "Route Signal",
  ],
  Vendors: ["Assign", "Escalate", "Create Task", "Route Signal"],
  Reserves: ["Mark Reviewed", "Escalate", "Create Task", "Route Signal"],
  Documents: ["Mark Reviewed", "Create Task", "Route Signal"],
  "Action Items": ["Close Item", "Escalate", "Assign", "Mark Reviewed"],
  "Meeting Packet": ["Mark Reviewed", "Create Task", "Route Signal"],
  Elections: ["Mark Reviewed", "Escalate", "Create Task"],
  "Onboarding Checklist": ["Close Item", "Assign", "Create Task"],
  "Resolution Execution": ["Close Item", "Escalate", "Assign", "Create Task"],
  "Compliance Legal Review": [
    "Mark Reviewed",
    "Escalate",
    "Create Task",
    "Route Signal",
  ],
  "Insurance & Risk": [
    "Mark Reviewed",
    "Escalate",
    "Create Task",
    "Route Signal",
  ],
  "Records Management": ["Mark Reviewed", "Create Task", "Route Signal"],
  "Ethics Disclosure": ["Mark Reviewed", "Escalate", "Create Task"],
  "Strategic Planning": ["Mark Reviewed", "Create Task", "Route Signal"],
  "Risk Crisis Management": [
    "Escalate",
    "Assign",
    "Create Task",
    "Route Signal",
  ],
  "QuickBooks Integration": [
    "Mark Reviewed",
    "Escalate",
    "Create Task",
    "Route Signal",
  ],
};

export function getRolePermissions(role = bosRoles.MANAGER) {
  return rolePermissions[role] || rolePermissions.manager;
}

export function getAllowedActions(moduleName, role = bosRoles.MANAGER) {
  const permissions = getRolePermissions(role);
  const allowedLabels = moduleActionMap[moduleName] || [];

  return sharedBosActions.filter((action) => {
    return (
      allowedLabels.includes(action.label) &&
      permissions[action.requiredPermission]
    );
  });
}

export function createAuditEntry({
  module = "Board Operating System",
  action = "System Action",
  actor = "BOS",
  summary = "Action completed.",
  status = "Completed",
}) {
  return {
    id: `audit-${Date.now()}`,
    timestamp: "Just now",
    module,
    action,
    actor,
    summary,
    status,
  };
}

export function createLinkedTask({
  title,
  module = "Board Operating System",
  priority = "Normal",
  owner = "Management",
  due = "Next review cycle",
}) {
  return {
    id: `task-${Date.now()}`,
    title,
    module,
    priority,
    owner,
    due,
    status: actionStatuses.OPEN,
  };
}

export function closeBosItem(item, actor = "Manager") {
  return {
    ...item,
    status: actionStatuses.CLOSED,
    lastAction: "Closed",
    lastActor: actor,
    lastUpdated: "Just now",
  };
}

export function escalateBosItem(
  item,
  escalationTarget = "Management Review",
  actor = "BOS"
) {
  return {
    ...item,
    status: actionStatuses.ESCALATED,
    escalationTarget,
    lastAction: "Escalated",
    lastActor: actor,
    lastUpdated: "Just now",
  };
}

export function assignBosItem(item, assignee = "Management Team", actor = "BOS") {
  return {
    ...item,
    status: actionStatuses.ASSIGNED,
    assignee,
    lastAction: "Assigned",
    lastActor: actor,
    lastUpdated: "Just now",
  };
}

export function reviewBosItem(item, actor = "Board") {
  return {
    ...item,
    status: actionStatuses.REVIEWED,
    reviewedBy: actor,
    lastAction: "Reviewed",
    lastActor: actor,
    lastUpdated: "Just now",
  };
}

export function routeSignalToModule(signal, targetModule) {
  return {
    id: `routed-${Date.now()}`,
    sourceModule: signal.module || "BOS Signal Engine",
    targetModule,
    title: signal.title || "Routed BOS Signal",
    summary:
      signal.summary ||
      "Signal routed for review inside the Board Operating System.",
    priority: signal.priority || "Normal",
    status: actionStatuses.OPEN,
    createdAt: "Just now",
  };
}

export function getBosOperatingSnapshot() {
  return {
    metrics: bosMetrics,
    signals: bosSignals,
    aiEvents,
    actionLog: bosActionLog,
    sharedActions: sharedBosActions,
    moduleActionMap,
    activeItems: {
      maintenance: maintenanceItems,
      violations: violationItems,
      financial: financialItems,
      vendors: vendorItems,
      reserves: reserveItems,
      documents: documentItems,
      actionItems,
    },
  };
}

export function getModuleOperatingProfile(moduleName, role = bosRoles.MANAGER) {
  return {
    moduleName,
    role,
    allowedActions: getAllowedActions(moduleName, role),
    recentSignals: bosSignals.filter(
      (signal) =>
        signal.module === moduleName ||
        signal.targetModule === moduleName ||
        signal.relatedModule === moduleName
    ),
    recentAiEvents: aiEvents.filter(
      (event) =>
        event.module === moduleName ||
        event.targetModule === moduleName ||
        event.relatedModule === moduleName
    ),
  };
}

export const bosActionSummary = {
  title: "Shared BOS Action Layer",
  description:
    "This layer allows every board module to speak the same operational language: close, escalate, assign, review, create task, and route signal.",
  operatingResult:
    "The portal can now begin behaving like a connected board operating system instead of a group of separate pages.",
};

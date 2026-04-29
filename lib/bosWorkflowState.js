import {
  actionStatuses,
  bosRoles,
  createAuditEntry,
  createLinkedTask,
  closeBosItem,
  escalateBosItem,
  assignBosItem,
  reviewBosItem,
  routeSignalToModule,
  getAllowedActions,
} from "./bosActions";

export const workflowPriorityLevels = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  NORMAL: "Normal",
  LOW: "Low",
};

export const workflowOwners = {
  MANAGEMENT: "Management",
  BOARD: "Board",
  ACCOUNTING: "Accounting",
  LEGAL: "Legal Review",
  VENDOR: "Vendor",
  AI: "AI Assistant",
};

export const sharedWorkflowQueue = [
  {
    id: "wf-001",
    title: "Pool light maintenance request",
    module: "Maintenance Review",
    source: "AI Voice Event",
    priority: workflowPriorityLevels.HIGH,
    owner: workflowOwners.MANAGEMENT,
    status: actionStatuses.OPEN,
    nextStep: "Confirm responsibility and dispatch vendor.",
    due: "Today",
  },
  {
    id: "wf-002",
    title: "Repeat violation escalation",
    module: "Violation Review",
    source: "BOS Signal Engine",
    priority: workflowPriorityLevels.HIGH,
    owner: workflowOwners.MANAGEMENT,
    status: actionStatuses.ESCALATED,
    nextStep: "Prepare board-ready enforcement summary.",
    due: "Next packet",
  },
  {
    id: "wf-003",
    title: "Financial variance review",
    module: "Financial Review",
    source: "QuickBooks Integration",
    priority: workflowPriorityLevels.MEDIUM,
    owner: workflowOwners.ACCOUNTING,
    status: actionStatuses.IN_PROGRESS,
    nextStep: "Verify variance and attach explanation.",
    due: "This week",
  },
  {
    id: "wf-004",
    title: "Reserve signal review",
    module: "Reserves",
    source: "BOS Signal Engine",
    priority: workflowPriorityLevels.NORMAL,
    owner: workflowOwners.BOARD,
    status: actionStatuses.OPEN,
    nextStep: "Review reserve impact before planning meeting.",
    due: "Next review cycle",
  },
];

export const crossModuleRoutingRules = [
  {
    id: "rule-maintenance-vendor",
    sourceModule: "Maintenance Review",
    condition: "Maintenance issue requires outside work.",
    targetModule: "Vendors",
    action: "Route Signal",
    result: "Vendor task created and attached to maintenance item.",
  },
  {
    id: "rule-violation-legal",
    sourceModule: "Violation Review",
    condition: "Repeat violation or enforcement risk detected.",
    targetModule: "Compliance Legal Review",
    action: "Escalate",
    result: "Legal review signal created before board action.",
  },
  {
    id: "rule-financial-quickbooks",
    sourceModule: "Financial Review",
    condition: "Budget variance or accounting exception detected.",
    targetModule: "QuickBooks Integration",
    action: "Route Signal",
    result: "Accounting review item created for reconciliation.",
  },
  {
    id: "rule-reserves-strategic",
    sourceModule: "Reserves",
    condition: "Reserve pressure affects future capital planning.",
    targetModule: "Strategic Planning",
    action: "Create Task",
    result: "Planning item added to board strategy queue.",
  },
  {
    id: "rule-risk-insurance",
    sourceModule: "Risk Crisis Management",
    condition: "Incident may create insurance exposure.",
    targetModule: "Insurance & Risk",
    action: "Route Signal",
    result: "Insurance review item created.",
  },
];

export function getSharedWorkflowQueue(role = bosRoles.MANAGER) {
  return sharedWorkflowQueue.map((item) => ({
    ...item,
    availableActions: getAllowedActions(item.module, role),
  }));
}

export function getWorkflowItemById(itemId) {
  return sharedWorkflowQueue.find((item) => item.id === itemId) || null;
}

export function performWorkflowAction({
  item,
  actionType,
  actor = "BOS",
  assignee = workflowOwners.MANAGEMENT,
  escalationTarget = workflowOwners.MANAGEMENT,
  targetModule = "Action Items",
}) {
  if (!item) {
    return {
      item: null,
      auditEntry: createAuditEntry({
        module: "Board Operating System",
        action: "Failed Workflow Action",
        actor,
        summary: "No workflow item was provided.",
        status: "Failed",
      }),
      linkedTask: null,
      routedSignal: null,
    };
  }

  let updatedItem = item;
  let linkedTask = null;
  let routedSignal = null;
  let actionLabel = "Workflow Action";

  if (actionType === "close") {
    updatedItem = closeBosItem(item, actor);
    actionLabel = "Closed";
  }

  if (actionType === "escalate") {
    updatedItem = escalateBosItem(item, escalationTarget, actor);
    actionLabel = "Escalated";
  }

  if (actionType === "assign") {
    updatedItem = assignBosItem(item, assignee, actor);
    actionLabel = "Assigned";
  }

  if (actionType === "review") {
    updatedItem = reviewBosItem(item, actor);
    actionLabel = "Reviewed";
  }

  if (actionType === "create_task") {
    linkedTask = createLinkedTask({
      title: item.title,
      module: item.module,
      priority: item.priority,
      owner: assignee,
      due: item.due,
    });

    updatedItem = {
      ...item,
      status: actionStatuses.IN_PROGRESS,
      lastAction: "Task Created",
      lastActor: actor,
      lastUpdated: "Just now",
    };

    actionLabel = "Task Created";
  }

  if (actionType === "route_signal") {
    routedSignal = routeSignalToModule(item, targetModule);

    updatedItem = {
      ...item,
      status: actionStatuses.IN_PROGRESS,
      lastAction: `Routed to ${targetModule}`,
      lastActor: actor,
      lastUpdated: "Just now",
    };

    actionLabel = "Signal Routed";
  }

  const auditEntry = createAuditEntry({
    module: item.module,
    action: actionLabel,
    actor,
    summary: `${item.title} was ${actionLabel.toLowerCase()} through the shared BOS workflow layer.`,
    status: "Completed",
  });

  return {
    item: updatedItem,
    auditEntry,
    linkedTask,
    routedSignal,
  };
}

export function getCrossModuleRoutesForModule(moduleName) {
  return crossModuleRoutingRules.filter(
    (rule) =>
      rule.sourceModule === moduleName || rule.targetModule === moduleName
  );
}

export function getWorkflowOperatingSummary() {
  const openItems = sharedWorkflowQueue.filter(
    (item) => item.status === actionStatuses.OPEN
  ).length;

  const escalatedItems = sharedWorkflowQueue.filter(
    (item) => item.status === actionStatuses.ESCALATED
  ).length;

  const inProgressItems = sharedWorkflowQueue.filter(
    (item) => item.status === actionStatuses.IN_PROGRESS
  ).length;

  return {
    title: "Shared Workflow State",
    description:
      "The BOS now has a shared workflow queue that can support closing, escalating, assigning, reviewing, creating tasks, and routing signals across modules.",
    openItems,
    escalatedItems,
    inProgressItems,
    totalItems: sharedWorkflowQueue.length,
    routingRules: crossModuleRoutingRules.length,
  };
}

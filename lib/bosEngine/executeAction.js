import {
  performWorkflowAction,
  getWorkflowItemById,
} from "../bosWorkflowState";

import { createAuditEntry } from "../bosActions";

import {
  publish,
  createBosEvent,
} from "./eventBus";

export async function executeBosAction({
  itemId,
  actionType,
  actor = "Manager",
  role = "manager",
  assignee,
  escalationTarget,
  targetModule,
}) {
  const item = getWorkflowItemById(itemId);

  if (!item) {
    const failedEvent = createBosEvent({
      type: "error",
      level: "error",
      module: "BOS Engine",
      message: `Action failed: item ${itemId} was not found.`,
    });

    publish(failedEvent);

    return {
      success: false,
      error: "Item not found in workflow queue",
    };
  }

  const result = performWorkflowAction({
    item,
    actionType,
    actor,
    assignee,
    escalationTarget,
    targetModule,
  });

  const successEvent = createBosEvent({
    type: "action",
    level: "success",
    module: item.module,
    message: `${actor} executed ${actionType} on ${item.title}.`,
  });

  publish(successEvent);

  return {
    success: true,
    updatedItem: result.item,
    auditEntry: result.auditEntry,
    linkedTask: result.linkedTask,
    routedSignal: result.routedSignal,
  };
}

export async function executeBulkActions(actions = []) {
  const results = [];

  for (const action of actions) {
    const result = await executeBosAction(action);
    results.push(result);
  }

  publish(
    createBosEvent({
      type: "bulk_action",
      level: "success",
      module: "Command Center",
      message: `${results.length} bulk BOS actions processed.`,
    })
  );

  return results;
}

export async function handleAIEvent({
  title,
  module = "Maintenance Review",
  priority = "Normal",
  summary,
}) {
  const syntheticItem = {
    id: `ai-${Date.now()}`,
    title,
    module,
    priority,
    source: "AI Assistant",
    status: "Open",
    nextStep: summary || "Awaiting workflow action",
    due: "Immediate",
  };

  const routed = performWorkflowAction({
    item: syntheticItem,
    actionType: "create_task",
    actor: "AI Assistant",
    assignee: "Management",
  });

  const audit = createAuditEntry({
    module,
    action: "AI Event Processed",
    actor: "AI Assistant",
    summary: `${title} converted into workflow task and injected into BOS.`,
    status: "Completed",
  });

  publish(
    createBosEvent({
      type: "ai_event",
      level: "success",
      module,
      message: `AI event processed: ${title}`,
    })
  );

  return {
    task: routed.linkedTask,
    workflowItem: routed.item,
    auditEntry: audit,
  };
}

export async function dispatchVendor({
  item,
  vendor = "Default Vendor",
}) {
  publish(
    createBosEvent({
      type: "vendor_dispatch",
      level: "success",
      module: "Vendors",
      message: `Vendor ${vendor} dispatched for ${item.title}.`,
    })
  );

  return {
    success: true,
    message: `Vendor ${vendor} dispatched for ${item.title}`,
    timestamp: "Just now",
  };
}

export async function syncToAccounting({
  item,
  system = "QuickBooks",
}) {
  publish(
    createBosEvent({
      type: "accounting_sync",
      level: "success",
      module: "QuickBooks Integration",
      message: `${item.title} synced to ${system}.`,
    })
  );

  return {
    success: true,
    message: `${item.title} synced to ${system}`,
    timestamp: "Just now",
  };
}

export function getBosSystemStatus() {
  return {
    status: "Operational",
    engine: "Active",
    workflow: "Connected",
    actions: "Enabled",
    aiIntegration: "Ready",
    accountingIntegration: "Ready",
    vendorDispatch: "Ready",
  };
}

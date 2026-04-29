import {
  performWorkflowAction,
  getWorkflowItemById,
} from "../bosWorkflowState";

import { createAuditEntry } from "../bosActions";

/**
 * Core BOS Execution Engine
 * This is where actions become SYSTEM behavior instead of UI buttons
 */

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

  /**
   * FUTURE: This is where real persistence will go
   *
   * - Database write (Postgres / Firebase / Supabase)
   * - QuickBooks sync
   * - Vendor dispatch API
   * - AI notification trigger
   * - SMS / Email
   */

  return {
    success: true,
    updatedItem: result.item,
    auditEntry: result.auditEntry,
    linkedTask: result.linkedTask,
    routedSignal: result.routedSignal,
  };
}

/**
 * Batch execution (Command Center use)
 */
export async function executeBulkActions(actions = []) {
  const results = [];

  for (const action of actions) {
    const result = await executeBosAction(action);
    results.push(result);
  }

  return results;
}

/**
 * AI → BOS Bridge
 * This is CRITICAL for your voice assistant
 */
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

  return {
    task: routed.linkedTask,
    workflowItem: routed.item,
    auditEntry: audit,
  };
}

/**
 * Vendor Dispatch Hook (Phase 3 ready)
 */
export async function dispatchVendor({
  item,
  vendor = "Default Vendor",
}) {
  return {
    success: true,
    message: `Vendor ${vendor} dispatched for ${item.title}`,
    timestamp: "Just now",
  };
}

/**
 * Accounting Sync Hook
 */
export async function syncToAccounting({
  item,
  system = "QuickBooks",
}) {
  return {
    success: true,
    message: `${item.title} synced to ${system}`,
    timestamp: "Just now",
  };
}

/**
 * System Health Check
 */
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

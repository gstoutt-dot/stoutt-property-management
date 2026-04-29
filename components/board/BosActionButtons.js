import { useState } from "react";
import { executeBosAction } from "../../lib/bosEngine/executeAction";

export default function BosActionButtons({
  item,
  actions = [],
  actor = "Manager",
  role = "manager",
}) {
  const [lastResult, setLastResult] = useState(null);
  const [workingAction, setWorkingAction] = useState(null);

  async function handleAction(action) {
    setWorkingAction(action.label);

    const actionTypeMap = {
      "Close Item": "close",
      Escalate: "escalate",
      Assign: "assign",
      "Mark Reviewed": "review",
      "Create Task": "create_task",
      "Route Signal": "route_signal",
    };

    const result = await executeBosAction({
      itemId: item.id,
      actionType: actionTypeMap[action.label] || action.type,
      actor,
      role,
      assignee: "Management",
      escalationTarget: "Management Review",
      targetModule: "Action Items",
    });

    setLastResult(result);
    setWorkingAction(null);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={() => handleAction(action)}
            disabled={workingAction === action.label}
            className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/15 disabled:cursor-wait disabled:opacity-60"
          >
            {workingAction === action.label ? "Processing..." : action.label}
          </button>
        ))}
      </div>

      {lastResult && (
        <div
          className={`mt-4 rounded-2xl border p-4 ${
            lastResult.success
              ? "border-emerald-300/20 bg-emerald-300/10"
              : "border-rose-300/20 bg-rose-300/10"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              lastResult.success ? "text-emerald-100" : "text-rose-100"
            }`}
          >
            {lastResult.success ? "BOS action executed" : "Action failed"}
          </p>

          <p
            className={`mt-1 text-xs leading-5 ${
              lastResult.success ? "text-emerald-50/80" : "text-rose-50/80"
            }`}
          >
            {lastResult.success
              ? lastResult.auditEntry?.summary ||
                "The workflow item was processed through the BOS engine."
              : lastResult.error || "The BOS engine could not process this action."}
          </p>
        </div>
      )}
    </div>
  );
}

function WorkflowControls({ item, onUpdate, updatingId }) {
  const busy = updatingId === item.id;
  const completed = isCompleted(item);
  const workflowType = getWorkflowType(item);
  const labels = getWorkflowButtonLabels(item);
  const needsBoard = requestNeedsBoardReview(item);

  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-400/70">
            Live Workflow Actions
          </p>

          <p className="mt-2 text-sm text-white/50">
            {labels.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {!completed && item.status !== "manager_review" && (
            <WorkflowButton
              label={labels.verify}
              disabled={busy}
              onClick={() => onUpdate(item, "manager_verified")}
            />
          )}

          {isFinancialRequest(item) &&
            !item.accounting_review_started_at &&
            !completed && (
              <WorkflowButton
                label="Start Accounting Review"
                disabled={busy}
                onClick={() => onUpdate(item, "accounting_review")}
              />
            )}

          {isFinancialRequest(item) &&
            item.accounting_review_started_at &&
            !completed && (
              <Pill text="Accounting Review Active" tone="gold" />
            )}

          {!isFinancialRequest(item) &&
            needsBoard &&
            item.status !== "board_review" &&
            !completed && (
              <WorkflowButton
                label={labels.board}
                disabled={busy}
                onClick={() => onUpdate(item, "send_to_board")}
              />
            )}

          {!completed && item.status !== "needs_clarification" && (
            <WorkflowButton
              label="Request Clarification"
              disabled={busy}
              onClick={() => onUpdate(item, "request_clarification")}
            />
          )}

          {!item.owner_notified && !completed && (
            <WorkflowButton
              label={labels.notify}
              disabled={busy}
              onClick={() => onUpdate(item, "notify_owner")}
            />
          )}

          {item.owner_notified && !completed && (
            <Pill text="Owner Updated" tone="green" />
          )}

          {!completed && (
            <WorkflowButton
              label={labels.complete}
              disabled={busy}
              strong
              onClick={() => onUpdate(item, "mark_complete")}
            />
          )}

          {completed && (
            <Pill text={labels.completed} tone="green" />
          )}
        </div>
      </div>
    </div>
  );
}

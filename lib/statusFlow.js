export const STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  BOARD_REVIEW: 'board_review',
  APPROVED: 'approved',
  STARTED: 'started',
  COMPLETED: 'completed',
}

export const STATUS_ORDER = {
  open: 1,
  in_progress: 2,
  board_review: 3,
  approved: 4,
  started: 5,
  completed: 6,
}

export const STATUS_LABELS = {
  open: 'Received',
  in_progress: 'Management Review',
  board_review: 'Board Review',
  approved: 'Approved',
  started: 'Work Started',
  completed: 'Completed',
}

export function getProgress(status) {
  const order = STATUS_ORDER[status] || 1
  return Math.round((order / 6) * 100)
}

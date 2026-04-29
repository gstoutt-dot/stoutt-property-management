let listeners = [];

export function subscribe(listener) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function publish(event) {
  listeners.forEach((listener) => {
    try {
      listener(event);
    } catch (err) {
      console.error("EventBus listener error:", err);
    }
  });
}

/**
 * Standardized BOS Event Creator
 */
export function createBosEvent({
  type = "system",
  message = "BOS event",
  module = "Board Operating System",
  level = "info",
}) {
  return {
    id: `event-${Date.now()}`,
    type,
    message,
    module,
    level,
    timestamp: new Date().toISOString(),
  };
}

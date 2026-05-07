export function buildUserScope(profile) {
  if (!profile) {
    return {
      authenticated: false,
      role: "guest",
      associationId: null,
      userId: null,
      unitNumber: null,
    };
  }

  return {
    authenticated: true,
    role: profile.role || "guest",
    associationId: profile.association_id || null,
    userId: profile.id || null,
    authUserId: profile.auth_user_id || null,
    unitNumber: profile.unit_number || null,
    email: profile.email || null,
    fullName: profile.full_name || null,
  };
}

export function canAccessRole(scope, allowedRoles = []) {
  if (!scope?.authenticated) return false;

  return allowedRoles.includes(scope.role);
}

export function canAccessAssociation(scope, associationId) {
  if (!scope?.authenticated) return false;
  if (!associationId) return false;

  return scope.associationId === associationId;
}

export function canAccessOwnerItem(scope, item) {
  if (!scope?.authenticated || !item) return false;

  if (scope.role === "admin" || scope.role === "manager") {
    return scope.associationId === item.association_id;
  }

  if (scope.role === "owner") {
    return (
      scope.associationId === item.association_id &&
      (scope.userId === item.owner_user_id ||
        scope.unitNumber === item.unit_number)
    );
  }

  return false;
}

export function canAccessBoardItem(scope, item) {
  if (!scope?.authenticated || !item) return false;

  if (scope.role === "admin" || scope.role === "manager") {
    return scope.associationId === item.association_id;
  }

  if (scope.role === "board") {
    return scope.associationId === item.association_id;
  }

  return false;
}

export function canAccessManagerItem(scope, item) {
  if (!scope?.authenticated || !item) return false;

  return (
    (scope.role === "admin" || scope.role === "manager") &&
    scope.associationId === item.association_id
  );
}

export function scopeActionsQuery(query, scope) {
  if (!scope?.authenticated) {
    return query.eq("id", "00000000-0000-0000-0000-000000000000");
  }

  if (scope.role === "admin") {
    return scope.associationId
      ? query.eq("association_id", scope.associationId)
      : query;
  }

  if (scope.role === "manager" || scope.role === "board") {
    return query.eq("association_id", scope.associationId);
  }

  if (scope.role === "owner") {
    return query
      .eq("association_id", scope.associationId)
      .or(`owner_user_id.eq.${scope.userId},unit_number.eq.${scope.unitNumber}`);
  }

  return query.eq("id", "00000000-0000-0000-0000-000000000000");
}

export function scopeNotificationsQuery(query, scope) {
  if (!scope?.authenticated) {
    return query.eq("id", "00000000-0000-0000-0000-000000000000");
  }

  if (scope.role === "admin") {
    return scope.associationId
      ? query.eq("association_id", scope.associationId)
      : query;
  }

  return query
    .eq("association_id", scope.associationId)
    .or(`recipient_user_id.eq.${scope.userId},recipient_role.eq.${scope.role}`);
}

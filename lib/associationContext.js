export function getSelectedAssociationContext() {
  if (typeof window === "undefined") {
    return {
      associationId: "",
      associationName: "",
    };
  }

  return {
    associationId:
      localStorage.getItem("spm_selected_association_id") || "",
    associationName:
      localStorage.getItem("spm_selected_association_name") || "",
  };
}

export function getSelectedAssociationId() {
  return getSelectedAssociationContext().associationId;
}

export function getSelectedAssociationName() {
  return getSelectedAssociationContext().associationName;
}

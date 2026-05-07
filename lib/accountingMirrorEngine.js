export function buildOwnerBalanceRecord({
  associationId,
  ownerUserId,
  ownerName,
  unitNumber,
  accountNumber,
  currentBalance,
  monthlyAssessment,
  lastPaymentDate,
  paymentStatus,
  paymentLink,
}) {
  return {
    association_id: associationId || null,
    owner_user_id: ownerUserId || null,
    owner_name: ownerName || "",
    unit_number: unitNumber || "",
    account_number: accountNumber || "",
    current_balance: Number(currentBalance || 0),
    monthly_assessment: Number(monthlyAssessment || 0),
    last_payment_date: lastPaymentDate || null,
    payment_status: paymentStatus || "current",
    payment_link: paymentLink || "",
    synced_at: new Date().toISOString(),
  };
}

export function sanitizeAccountingRecord(record) {
  if (!record) return null;

  return {
    association_id: record.association_id,
    owner_user_id: record.owner_user_id,
    owner_name: record.owner_name,
    unit_number: record.unit_number,
    account_number: record.account_number,
    current_balance: record.current_balance,
    monthly_assessment: record.monthly_assessment,
    last_payment_date: record.last_payment_date,
    payment_status: record.payment_status,
    payment_link: record.payment_link,
    synced_at: record.synced_at,
  };
}

export function buildMirrorPayload(records = []) {
  return records.map((record) =>
    sanitizeAccountingRecord(record)
  );
}

export function calculateAssociationBalanceTotals(records = []) {
  const totalBalance = records.reduce((sum, item) => {
    return sum + Number(item.current_balance || 0);
  }, 0);

  const totalMonthlyAssessments = records.reduce((sum, item) => {
    return sum + Number(item.monthly_assessment || 0);
  }, 0);

  const delinquentAccounts = records.filter(
    (item) =>
      String(item.payment_status || "").toLowerCase() !== "current"
  ).length;

  return {
    totalBalance,
    totalMonthlyAssessments,
    delinquentAccounts,
    unitCount: records.length,
  };
}

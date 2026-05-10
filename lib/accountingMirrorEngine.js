// /lib/accountingMirrorEngine.js

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
  const normalizedBalance = Number(currentBalance || 0);
  const normalizedAssessment = Number(monthlyAssessment || 0);

  return {
    association_id: associationId || null,
    owner_user_id: ownerUserId || null,
    owner_name: ownerName || "",
    unit_number: unitNumber || "",
    account_number: accountNumber || "",

    current_balance: normalizedBalance,
    monthly_assessment: normalizedAssessment,

    last_payment_date: lastPaymentDate || null,

    payment_status: normalizePaymentStatus(paymentStatus, normalizedBalance),

    delinquency_level: calculateDelinquencyLevel(
      normalizedBalance,
      normalizedAssessment
    ),

    account_health: calculateAccountHealth(
      normalizedBalance,
      normalizedAssessment
    ),

    payment_link: paymentLink || "",

    synced_at: new Date().toISOString(),
  };
}

export function buildOwnerBalanceRecordFromQuickBooksCustomer({
  associationId,
  ownerUserId = null,
  quickbooksCustomerId,
  customerName,
  unitNumber = null,
  currentBalance = 0,
  monthlyAssessment = 0,
  lastPaymentDate = null,
  paymentLink = "",
}) {
  return buildOwnerBalanceRecord({
    associationId,
    ownerUserId,
    ownerName: customerName,
    unitNumber: unitNumber || extractUnitNumber(customerName) || "",
    accountNumber: quickbooksCustomerId || "",
    currentBalance,
    monthlyAssessment,
    lastPaymentDate,
    paymentStatus: Number(currentBalance || 0) > 0 ? "balance_due" : "current",
    paymentLink,
  });
}

export function buildAccountingIdentityRecordFromQuickBooksCustomer({
  associationId,
  unitNumber = null,
  ownerUserId = null,
  quickbooksCompanyName = "QuickBooks",
  quickbooksCustomerId,
  quickbooksCustomerDisplayName,
  currentBalance = 0,
  monthlyAssessment = null,
}) {
  return {
    association_id: associationId,
    unit_number:
      unitNumber || extractUnitNumber(quickbooksCustomerDisplayName) || null,
    owner_user_id: ownerUserId,
    quickbooks_company_name: quickbooksCompanyName,
    quickbooks_customer_id: quickbooksCustomerId,
    quickbooks_customer_display_name: quickbooksCustomerDisplayName,
    last_invoice_id: null,
    last_payment_id: null,
    current_balance: Number(currentBalance || 0),
    monthly_assessment:
      monthlyAssessment === null ? null : Number(monthlyAssessment || 0),
    sync_status: "customer_synced",
    last_synced_at: new Date().toISOString(),
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

    current_balance: Number(record.current_balance || 0),
    monthly_assessment: Number(record.monthly_assessment || 0),

    payment_status: normalizePaymentStatus(
      record.payment_status,
      record.current_balance
    ),

    delinquency_level:
      record.delinquency_level ||
      calculateDelinquencyLevel(
        record.current_balance,
        record.monthly_assessment
      ),

    account_health:
      record.account_health ||
      calculateAccountHealth(record.current_balance, record.monthly_assessment),

    last_payment_date: record.last_payment_date,
    payment_link: record.payment_link,

    synced_at: record.synced_at,
  };
}

export function buildMirrorPayload(records = []) {
  return records.map((record) => sanitizeAccountingRecord(record));
}

export function calculateAssociationBalanceTotals(records = []) {
  const safeRecords = Array.isArray(records) ? records : [];

  const totalBalance = safeRecords.reduce((sum, item) => {
    return sum + Number(item.current_balance || 0);
  }, 0);

  const totalMonthlyAssessments = safeRecords.reduce((sum, item) => {
    return sum + Number(item.monthly_assessment || 0);
  }, 0);

  const currentAccounts = safeRecords.filter(
    (item) => normalizePaymentStatus(item.payment_status, item.current_balance) === "current"
  ).length;

  const delinquentAccounts = safeRecords.filter(
    (item) => normalizePaymentStatus(item.payment_status, item.current_balance) !== "current"
  ).length;

  const severeDelinquencyAccounts = safeRecords.filter(
    (item) =>
      String(item.delinquency_level || "").toLowerCase() === "severe" ||
      calculateDelinquencyLevel(item.current_balance, item.monthly_assessment) ===
        "severe"
  ).length;

  const criticalAccounts = safeRecords.filter(
    (item) =>
      String(item.account_health || "").toLowerCase() === "critical" ||
      calculateAccountHealth(item.current_balance, item.monthly_assessment) ===
        "critical"
  ).length;

  return {
    totalBalance,
    totalMonthlyAssessments,
    currentAccounts,
    delinquentAccounts,
    severeDelinquencyAccounts,
    criticalAccounts,
    unitCount: safeRecords.length,
    collectionRiskScore: calculateCollectionRiskScore(safeRecords),
  };
}

export function calculateDelinquencyLevel(currentBalance, monthlyAssessment) {
  const balance = Number(currentBalance || 0);
  const assessment = Number(monthlyAssessment || 0);

  if (balance <= 0) {
    return "current";
  }

  if (assessment <= 0) {
    if (balance >= 1500) return "severe";
    if (balance >= 750) return "elevated";
    return "attention";
  }

  const ratio = balance / assessment;

  if (ratio >= 4) return "severe";
  if (ratio >= 2) return "elevated";

  return "attention";
}

export function calculateAccountHealth(currentBalance, monthlyAssessment = 0) {
  const balance = Number(currentBalance || 0);
  const assessment = Number(monthlyAssessment || 0);

  if (balance <= 0) {
    return "healthy";
  }

  if (assessment > 0 && balance >= assessment * 4) {
    return "critical";
  }

  if (balance >= 1500) {
    return "critical";
  }

  if (balance <= 1000) {
    return "watch";
  }

  return "critical";
}

export function calculateCollectionRiskScore(records = []) {
  const safeRecords = Array.isArray(records) ? records : [];

  if (safeRecords.length === 0) return 0;

  const score = safeRecords.reduce((sum, item) => {
    const level = calculateDelinquencyLevel(
      item.current_balance,
      item.monthly_assessment
    );

    if (level === "severe") return sum + 4;
    if (level === "elevated") return sum + 3;
    if (level === "attention") return sum + 1;

    return sum;
  }, 0);

  return Math.round((score / (safeRecords.length * 4)) * 100);
}

export function normalizePaymentStatus(status, currentBalance = 0) {
  const balance = Number(currentBalance || 0);

  if (balance <= 0) {
    return "current";
  }

  const value = String(status || "")
    .toLowerCase()
    .trim();

  if (["current", "paid", "zero_balance"].includes(value)) {
    return balance > 0 ? "balance_due" : "current";
  }

  if (["balance_due", "past_due", "delinquent", "overdue", "open"].includes(value)) {
    return "balance_due";
  }

  return balance > 0 ? "balance_due" : "current";
}

export function extractUnitNumber(value = "") {
  const text = String(value || "");

  const unitMatch = text.match(/unit\s*#?\s*([A-Za-z0-9-]+)/i);
  if (unitMatch) return unitMatch[1];

  const aptMatch = text.match(/apt\s*#?\s*([A-Za-z0-9-]+)/i);
  if (aptMatch) return aptMatch[1];

  const leadingNumberMatch = text.match(/^([0-9]{1,5}[A-Za-z]?)/);
  if (leadingNumberMatch) return leadingNumberMatch[1];

  return null;
}

export function buildBoardFinancialSummary(records = []) {
  const totals = calculateAssociationBalanceTotals(records);

  return {
    ...totals,
    summary_status:
      totals.severeDelinquencyAccounts > 0 || totals.collectionRiskScore >= 50
        ? "attention_required"
        : totals.delinquentAccounts > 0
        ? "watch"
        : "healthy",
    generated_at: new Date().toISOString(),
  };
}

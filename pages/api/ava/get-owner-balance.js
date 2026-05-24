import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

function cleanText(value) {
  return String(value || "").trim();
}

function normalizeComparable(value) {
  return cleanText(value).toLowerCase();
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}

function money(value) {
  return Number(value || 0);
}

function formatMoney(value) {
  return money(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function namesMatch(a, b) {
  const left = normalizeComparable(a);
  const right = normalizeComparable(b);

  if (!left || !right) return false;

  return left === right || left.includes(right) || right.includes(left);
}

function classifyLedgerEntry(entry) {
  const text = `${entry.description || ""} ${entry.memo || ""}`.toLowerCase();

  if (text.includes("late_fee") || text.includes("late fee") || text.includes("late")) {
    return "late_fees";
  }

  if (
    text.includes("violation_fee") ||
    text.includes("violation fee") ||
    text.includes("violation") ||
    text.includes("fine") ||
    text.includes("compliance")
  ) {
    return "violation_fees";
  }

  if (
    text.includes("monthly_assessment") ||
    text.includes("monthly assessment") ||
    text.includes("assessment") ||
    text.includes("dues")
  ) {
    return "monthly_assessments";
  }

  if (
    text.includes("special_assessment") ||
    text.includes("special assessment")
  ) {
    return "special_assessments";
  }

  if (
    text.includes("interest_charge") ||
    text.includes("interest") ||
    text.includes("finance charge")
  ) {
    return "interest_charges";
  }

  if (
    text.includes("collections_or_legal_fee") ||
    text.includes("collection") ||
    text.includes("attorney") ||
    text.includes("legal")
  ) {
    return "collections_or_legal_fees";
  }

  if (
    text.includes("credit_or_adjustment") ||
    text.includes("credit") ||
    text.includes("adjustment")
  ) {
    return "credits_or_adjustments";
  }

  return "other_charges";
}

function buildLedgerSummary(entries = []) {
  const summary = {
    monthly_assessments: 0,
    late_fees: 0,
    violation_fees: 0,
    special_assessments: 0,
    interest_charges: 0,
    collections_or_legal_fees: 0,
    credits_or_adjustments: 0,
    other_charges: 0,
    payments: 0,
    total_charges: 0,
    total_payments: 0,
    total_credits: 0,
    net_balance_from_ledger: 0,
  };

  for (const entry of entries) {
    const charge = money(entry.charge_amount);
    const payment = money(entry.payment_amount);
    const credit = money(entry.credit_amount);
    const transactionType = String(entry.transaction_type || "").toLowerCase();

    summary.total_charges += charge;
    summary.total_payments += payment;
    summary.total_credits += credit;

    if (payment > 0 || transactionType === "payment") {
      summary.payments += payment;
    }

    if (charge > 0) {
      const category = classifyLedgerEntry(entry);
      summary[category] += charge;
    }

    if (credit > 0) {
      summary.credits_or_adjustments += credit;
    }
  }

  summary.net_balance_from_ledger =
    summary.total_charges - summary.total_payments - summary.total_credits;

  return summary;
}

function buildAvaAccountingMessage(balance, ledgerSummary, verification) {
  const currentBalance = formatMoney(balance.current_balance);
  const monthlyAssessment = formatMoney(balance.monthly_assessment);

  const parts = [];

  parts.push(
    `Thank you. I found the account for Unit ${balance.unit_number}. Your current balance is ${currentBalance}. Your monthly assessment is ${monthlyAssessment}.`
  );

  const detailLines = [];

  if (ledgerSummary.monthly_assessments > 0) {
    detailLines.push(
      `${formatMoney(ledgerSummary.monthly_assessments)} in assessment charges`
    );
  }

  if (ledgerSummary.late_fees > 0) {
    detailLines.push(`${formatMoney(ledgerSummary.late_fees)} in late fees`);
  }

  if (ledgerSummary.violation_fees > 0) {
    detailLines.push(
      `${formatMoney(ledgerSummary.violation_fees)} in violation fees`
    );
  }

  if (ledgerSummary.special_assessments > 0) {
    detailLines.push(
      `${formatMoney(ledgerSummary.special_assessments)} in special assessments`
    );
  }

  if (ledgerSummary.interest_charges > 0) {
    detailLines.push(
      `${formatMoney(ledgerSummary.interest_charges)} in interest charges`
    );
  }

  if (ledgerSummary.collections_or_legal_fees > 0) {
    detailLines.push(
      `${formatMoney(
        ledgerSummary.collections_or_legal_fees
      )} in collections or legal fees`
    );
  }

  if (ledgerSummary.credits_or_adjustments > 0) {
    detailLines.push(
      `${formatMoney(
        ledgerSummary.credits_or_adjustments
      )} in credits or adjustments`
    );
  }

  if (detailLines.length > 0) {
    parts.push(`The ledger detail currently shows ${detailLines.join(", ")}.`);
  }

  if (ledgerSummary.payments > 0) {
    parts.push(
      `Payments posted in the ledger total ${formatMoney(ledgerSummary.payments)}.`
    );
  }

  if (verification?.verifiedBy) {
    parts.push(`I verified this using your ${verification.verifiedBy}.`);
  }

  parts.push(
    "If something looks incorrect, management can review your account through the account review workflow."
  );

  return parts.join(" ");
}

function buildUnverifiedMessage() {
  return (
    "For security purposes, I need to verify the homeowner before providing private account information. " +
    "Please provide your unit number and your name, email address, or phone number associated with the account."
  );
}

async function getAccessRecords({ associationId, unitNumber }) {
  let query = supabaseAdmin
    .from("owner_access_provisioning_records")
    .select("*")
    .eq("association_id", associationId);

  if (unitNumber) {
    query = query.eq("unit_number", unitNumber);
  }

  const { data, error } = await query;

  return {
    records: !error && Array.isArray(data) ? data : [],
    error,
  };
}

async function getBalanceRecords({ associationId, unitNumber }) {
  let query = supabaseAdmin
    .from("owner_account_balances")
    .select("*")
    .eq("association_id", associationId);

  if (unitNumber) {
    query = query.eq("unit_number", unitNumber);
  }

  const { data, error } = await query;

  return {
    records: !error && Array.isArray(data) ? data : [],
    error,
  };
}

async function getIdentityLinks({ associationId, unitNumber }) {
  let query = supabaseAdmin
    .from("accounting_identity_links")
    .select("*")
    .eq("association_id", associationId);

  if (unitNumber) {
    query = query.eq("unit_number", unitNumber);
  }

  const { data, error } = await query;

  return {
    records: !error && Array.isArray(data) ? data : [],
    error,
  };
}

function findVerifiedRecord({
  accessRecords,
  balanceRecords,
  identityLinks,
  callerName,
  callerEmail,
  callerPhone,
}) {
  const cleanEmail = normalizeComparable(callerEmail);
  const cleanPhone = normalizePhone(callerPhone);
  const cleanName = cleanText(callerName);

  const allCandidates = [
    ...accessRecords.map((record) => ({
      source: "owner_access_provisioning_records",
      owner_user_id: record.owner_user_id,
      unit_number: record.unit_number,
      owner_name: record.owner_name,
      owner_email: record.owner_email,
      owner_phone: record.owner_phone,
      record,
    })),

    ...balanceRecords.map((record) => ({
      source: "owner_account_balances",
      owner_user_id: record.owner_user_id,
      unit_number: record.unit_number,
      owner_name: record.owner_name,
      owner_email: record.owner_email,
      owner_phone: record.owner_phone,
      record,
    })),

    ...identityLinks.map((record) => ({
      source: "accounting_identity_links",
      owner_user_id: record.owner_user_id,
      unit_number: record.unit_number,
      owner_name: record.quickbooks_customer_display_name,
      owner_email: record.owner_email,
      owner_phone: record.owner_phone,
      record,
    })),
  ];

  const emailMatch = allCandidates.find((candidate) => {
    const candidateEmail = normalizeComparable(candidate.owner_email);
    return cleanEmail && candidateEmail && candidateEmail === cleanEmail;
  });

  if (emailMatch) {
    return {
      verified: true,
      verifiedBy: "email address",
      candidate: emailMatch,
    };
  }

  const phoneMatch = allCandidates.find((candidate) => {
    const candidatePhone = normalizePhone(candidate.owner_phone);

    if (!cleanPhone || !candidatePhone) return false;

    return (
      candidatePhone === cleanPhone ||
      candidatePhone.endsWith(cleanPhone) ||
      cleanPhone.endsWith(candidatePhone)
    );
  });

  if (phoneMatch) {
    return {
      verified: true,
      verifiedBy: "phone number",
      candidate: phoneMatch,
    };
  }

  const nameMatch = allCandidates.find((candidate) =>
    namesMatch(candidate.owner_name, cleanName)
  );

  if (nameMatch) {
    return {
      verified: true,
      verifiedBy: "name and unit number",
      candidate: nameMatch,
    };
  }

  return {
    verified: false,
    verifiedBy: null,
    candidate: null,
  };
}

async function findOwnerBalance({ associationId, unitNumber, ownerUserId }) {
  let balance = null;
  let balanceError = null;

  if (ownerUserId) {
    const result = await supabaseAdmin
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", associationId)
      .eq("owner_user_id", ownerUserId)
      .maybeSingle();

    balance = result.data;
    balanceError = result.error;
  }

  if (!balance && unitNumber) {
    const result = await supabaseAdmin
      .from("owner_account_balances")
      .select("*")
      .eq("association_id", associationId)
      .eq("unit_number", unitNumber)
      .maybeSingle();

    balance = result.data;
    balanceError = result.error;
  }

  return {
    balance,
    balanceError,
  };
}

async function getLedgerEntries({ associationId, balance }) {
  let ledgerQuery = supabaseAdmin
    .from("owner_account_ledger_entries")
    .select(
      "transaction_type,transaction_date,due_date,description,memo,charge_amount,payment_amount,credit_amount,open_balance,status,source,synced_at"
    )
    .eq("association_id", associationId)
    .order("transaction_date", { ascending: false });

  if (balance.unit_number) {
    ledgerQuery = ledgerQuery.eq("unit_number", balance.unit_number);
  } else if (balance.owner_user_id) {
    ledgerQuery = ledgerQuery.eq("owner_user_id", balance.owner_user_id);
  }

  const { data, error } = await ledgerQuery;

  return {
    ledgerEntries: !error && Array.isArray(data) ? data : [],
    ledgerError: error,
  };
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const source = req.method === "GET" ? req.query || {} : req.body || {};

    const associationId =
      cleanText(source.associationId) ||
      cleanText(source.association_id) ||
      DEFAULT_ASSOCIATION_ID;

    const unitNumber =
      cleanText(source.unitNumber) ||
      cleanText(source.unit_number) ||
      "";

    const callerName =
      cleanText(source.callerName) ||
      cleanText(source.caller_name) ||
      cleanText(source.ownerName) ||
      "";

    const callerEmail =
      cleanText(source.callerEmail) ||
      cleanText(source.caller_email) ||
      cleanText(source.ownerEmail) ||
      "";

    const callerPhone =
      cleanText(source.callerPhone) ||
      cleanText(source.caller_phone) ||
      cleanText(source.phone) ||
      "";

    if (!unitNumber) {
      return res.status(200).json({
        success: false,
        verified: false,
        needs_verification: true,
        ava_accounting_response:
          "I can help with that. For security purposes, may I please have your unit number first?",
      });
    }

    if (!callerName && !callerEmail && !callerPhone) {
      return res.status(200).json({
        success: false,
        verified: false,
        needs_verification: true,
        ava_accounting_response:
          "Thank you. For security purposes, may I also have your name, email address, or phone number associated with the account?",
      });
    }

    const { records: accessRecords, error: accessError } =
      await getAccessRecords({
        associationId,
        unitNumber,
      });

    const { records: balanceRecords, error: balanceRecordError } =
      await getBalanceRecords({
        associationId,
        unitNumber,
      });

    const { records: identityLinks, error: identityError } =
      await getIdentityLinks({
        associationId,
        unitNumber,
      });

    if (accessError) {
      console.warn("Ava access records lookup warning:", accessError);
    }

    if (balanceRecordError) {
      console.warn("Ava balance records lookup warning:", balanceRecordError);
    }

    if (identityError) {
      console.warn("Ava identity links lookup warning:", identityError);
    }

    const verification = findVerifiedRecord({
      accessRecords,
      balanceRecords,
      identityLinks,
      callerName,
      callerEmail,
      callerPhone,
    });

    if (!verification.verified) {
      return res.status(200).json({
        success: false,
        verified: false,
        needs_verification: true,
        ava_accounting_response: buildUnverifiedMessage(),
      });
    }

    const ownerUserId = verification.candidate?.owner_user_id || null;

    const { balance, balanceError } = await findOwnerBalance({
      associationId,
      unitNumber:
        verification.candidate?.unit_number ||
        unitNumber,
      ownerUserId,
    });

    if (balanceError || !balance) {
      return res.status(200).json({
        success: false,
        verified: true,
        needs_management_follow_up: true,
        ava_accounting_response:
          "I verified the homeowner information, but I could not locate the account balance details. I’ll make sure our management team reviews the account and follows up directly.",
        details: balanceError?.message || null,
      });
    }

    const { ledgerEntries, ledgerError } = await getLedgerEntries({
      associationId,
      balance,
    });

    const ledgerSummary = buildLedgerSummary(ledgerEntries);

    const resolvedCurrentBalance =
      ledgerEntries.length > 0
        ? ledgerSummary.net_balance_from_ledger
        : money(balance.current_balance);

    const responseBalance = {
      ...balance,
      current_balance: resolvedCurrentBalance,
    };

    // ============================================
// AVA FINANCIAL CALL LOGGING
// ============================================

try {
  await supabaseAdmin
    .from("admin_operational_records")
    .insert({
      association_id: associationId,
      created_by: callerName || "Ava Financial Inquiry",
      created_by_role: "Ava",
      request_type: "financial",
      title: `Account Balance Inquiry - Unit ${balance.unit_number}`,
      description: `
A homeowner contacted Ava regarding account balance information.

Owner: ${
        balance.owner_name ||
        verification.candidate?.owner_name ||
        callerName
      }

Unit: ${balance.unit_number}

Verified By: ${verification.verifiedBy}

Current Balance: ${formatMoney(resolvedCurrentBalance)}

Monthly Assessment: ${formatMoney(balance.monthly_assessment)}

Late Fees: ${formatMoney(ledgerSummary.late_fees)}

Violation Fees: ${formatMoney(
        ledgerSummary.violation_fees
      )}

Source: Ava AI Phone Accounting Inquiry

Routing Target: Manager Command Center

Manager Follow Up Recommended If:
- homeowner disputes balance
- duplicate charges reported
- payment missing
- collections concerns
- violation fee dispute
      `,
      priority: "Normal",
      status: "Submitted",
      assigned_to: null,
      board_review_required: false,
      owner_visible: false,
      vendor_visible: false,
      source_module: "Ava AI Phone Accounting Inquiry",
      routing_target: "Manager Command Center",
      recommended_action:
        "Review homeowner financial inquiry and coordinate accounting follow up if necessary.",
    });
} catch (loggingError) {
  console.error(
    "Unable to create Ava financial intake log:",
    loggingError
  );
}

    return res.status(200).json({
      success: true,
      verified: true,
      association_id: associationId,
      unit_number: balance.unit_number,
      owner_name:
        balance.owner_name ||
        verification.candidate?.owner_name ||
        callerName,
      balance: responseBalance,
      ledger_summary: ledgerSummary,
      ava_accounting_response: buildAvaAccountingMessage(
        responseBalance,
        ledgerSummary,
        {
          verifiedBy: verification.verifiedBy,
        }
      ),
      ledger_error: ledgerError ? ledgerError.message : null,
    });
  } catch (error) {
    console.error("Ava owner balance API failed:", error);

    return res.status(500).json({
      success: false,
      verified: false,
      error: error?.message || "Unexpected Ava owner balance error.",
      ava_accounting_response:
        "I’m sorry, but I could not access the account information right now. I’ll make sure management follows up directly.",
    });
  }
}

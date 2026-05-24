import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const DEFAULT_ASSOCIATION_ID = "622aaf96-ae1c-4f98-b0b2-00cc9178c2a2";

function cleanText(value) {
  return String(value || "").trim();
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
    "Please provide your unit number and either the email address or phone number associated with the account."
  );
}

async function findAccessRecord({
  associationId,
  unitNumber,
  callerEmail,
  callerPhone,
}) {
  let query = supabaseAdmin
    .from("owner_access_provisioning_records")
    .select("*")
    .eq("association_id", associationId);

  if (unitNumber) {
    query = query.eq("unit_number", unitNumber);
  }

  const { data, error } = await query;

  if (error) {
    return {
      accessRecord: null,
      error,
      verifiedBy: null,
    };
  }

  const records = Array.isArray(data) ? data : [];

  const cleanEmail = cleanText(callerEmail).toLowerCase();
  const cleanPhone = normalizePhone(callerPhone);

  const emailMatch = records.find((record) => {
    const recordEmail = cleanText(record.owner_email).toLowerCase();
    return cleanEmail && recordEmail && recordEmail === cleanEmail;
  });

  if (emailMatch) {
    return {
      accessRecord: emailMatch,
      error: null,
      verifiedBy: "email address",
    };
  }

  const phoneMatch = records.find((record) => {
    const recordPhone = normalizePhone(record.owner_phone);

    if (!cleanPhone || !recordPhone) return false;

    return (
      recordPhone === cleanPhone ||
      recordPhone.endsWith(cleanPhone) ||
      cleanPhone.endsWith(recordPhone)
    );
  });

  if (phoneMatch) {
    return {
      accessRecord: phoneMatch,
      error: null,
      verifiedBy: "phone number",
    };
  }

  return {
    accessRecord: null,
    error: null,
    verifiedBy: null,
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

    if (!callerEmail && !callerPhone) {
      return res.status(200).json({
        success: false,
        verified: false,
        needs_verification: true,
        ava_accounting_response:
          "Thank you. For security purposes, may I also have the email address or phone number associated with the account?",
      });
    }

    const { accessRecord, error: accessError, verifiedBy } =
      await findAccessRecord({
        associationId,
        unitNumber,
        callerEmail,
        callerPhone,
      });

    if (accessError) {
      console.error("Ava access record lookup failed:", accessError);
    }

    if (!accessRecord) {
      return res.status(200).json({
        success: false,
        verified: false,
        needs_verification: true,
        ava_accounting_response: buildUnverifiedMessage(),
      });
    }

    const accessStatus = String(accessRecord.access_status || "")
      .toLowerCase()
      .trim();

    const financialAccessStatus = String(
      accessRecord.financial_access_status || ""
    )
      .toLowerCase()
      .trim();

    if (accessStatus && accessStatus !== "active") {
      return res.status(200).json({
        success: false,
        verified: true,
        access_denied: true,
        ava_accounting_response:
          "I verified the account, but portal access is not currently active. I’ll have management follow up directly.",
      });
    }

    if (financialAccessStatus && financialAccessStatus !== "enabled") {
      return res.status(200).json({
        success: false,
        verified: true,
        access_denied: true,
        ava_accounting_response:
          "I verified the account, but financial access is not currently enabled. I’ll have management follow up directly.",
      });
    }

    const ownerUserId =
      accessRecord.owner_user_id ||
      accessRecord.id ||
      null;

    const { balance, balanceError } = await findOwnerBalance({
      associationId,
      unitNumber: accessRecord.unit_number || unitNumber,
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

    return res.status(200).json({
      success: true,
      verified: true,
      association_id: associationId,
      unit_number: balance.unit_number,
      owner_name: balance.owner_name || accessRecord.owner_name || callerName,
      balance: responseBalance,
      ledger_summary: ledgerSummary,
      ava_accounting_response: buildAvaAccountingMessage(
        responseBalance,
        ledgerSummary,
        { verifiedBy }
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

import { supabaseAdmin } from "../../../lib/supabaseAdmin";

function money(value) {
  return Number(value || 0);
}

function formatMoney(value) {
  return money(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function cleanText(value) {
  return String(value || "").trim();
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
    open_items: [],
    recent_items: [],
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

    const isOpen =
      ["open", "overdue", "partially_applied"].includes(
        String(entry.status || "").toLowerCase()
      ) || money(entry.open_balance) > 0;

    const compactItem = {
      transaction_type: entry.transaction_type,
      transaction_date: entry.transaction_date,
      due_date: entry.due_date,
      description: entry.description,
      memo: entry.memo,
      charge_amount: charge,
      payment_amount: payment,
      credit_amount: credit,
      open_balance: money(entry.open_balance),
      status: entry.status,
      source: entry.source,
    };

    if (isOpen) {
      summary.open_items.push(compactItem);
    }

    summary.recent_items.push(compactItem);
  }

  summary.net_balance_from_ledger =
    summary.total_charges - summary.total_payments - summary.total_credits;

  summary.recent_items = summary.recent_items.slice(0, 12);
  summary.open_items = summary.open_items.slice(0, 12);

  return summary;
}

function buildAvaAccountingMessage(balance, ledgerSummary) {
  const currentBalance = formatMoney(balance.current_balance);
  const monthlyAssessment = formatMoney(balance.monthly_assessment);

  const parts = [];

  parts.push(
    `Your current balance is ${currentBalance}. Your monthly assessment is ${monthlyAssessment}.`
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

  parts.push(
    "If something looks incorrect, management can review your account through the account review workflow."
  );

  return parts.join(" ");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { associationId, ownerUserId, unitNumber } = req.query || {};

    const cleanAssociationId = String(associationId || "").trim();
    const cleanOwnerUserId = String(ownerUserId || "").trim();
    const cleanUnitNumber = String(unitNumber || "").trim();

    if (!cleanAssociationId) {
      return res.status(400).json({
        success: false,
        error: "Missing associationId.",
      });
    }

    if (!cleanOwnerUserId && !cleanUnitNumber) {
      return res.status(400).json({
        success: false,
        error: "Missing ownerUserId or unitNumber.",
      });
    }

    let balance = null;
    let balanceError = null;

    if (cleanOwnerUserId) {
      const result = await supabaseAdmin
        .from("owner_account_balances")
        .select("*")
        .eq("association_id", cleanAssociationId)
        .eq("owner_user_id", cleanOwnerUserId)
        .maybeSingle();

      balance = result.data;
      balanceError = result.error;
    }

    if (!balance && cleanUnitNumber) {
      const result = await supabaseAdmin
        .from("owner_account_balances")
        .select("*")
        .eq("association_id", cleanAssociationId)
        .eq("unit_number", cleanUnitNumber)
        .maybeSingle();

      balance = result.data;
      balanceError = result.error;
    }

    if (balanceError || !balance) {
      return res.status(404).json({
        success: false,
        error: "Owner balance not found.",
        details: balanceError || null,
      });
    }

    const { data: identity } = await supabaseAdmin
      .from("accounting_identity_links")
      .select("*")
      .eq("association_id", cleanAssociationId)
      .eq("unit_number", balance.unit_number)
      .maybeSingle();

    let ledgerQuery = supabaseAdmin
      .from("owner_account_ledger_entries")
      .select(
        "transaction_type,transaction_date,due_date,description,memo,charge_amount,payment_amount,credit_amount,open_balance,status,source,synced_at"
      )
      .eq("association_id", cleanAssociationId)
      .order("transaction_date", { ascending: false });

    if (balance.unit_number) {
      ledgerQuery = ledgerQuery.eq("unit_number", balance.unit_number);
    } else if (balance.owner_user_id) {
      ledgerQuery = ledgerQuery.eq("owner_user_id", balance.owner_user_id);
    }

    const { data: ledgerEntries, error: ledgerError } = await ledgerQuery;

    const safeLedgerEntries =
  !ledgerError && Array.isArray(ledgerEntries)
    ? ledgerEntries.filter(
        (entry) =>
          String(entry.transaction_type || "").toLowerCase() !==
          "invoice_line"
      )
    : [];

    const ledgerSummary = buildLedgerSummary(safeLedgerEntries);

    const resolvedCurrentBalance = money(balance.current_balance);

    const responseBalance = {
      association_id: balance.association_id,
      owner_user_id: balance.owner_user_id,

      owner_name: balance.owner_name,
      unit_number: balance.unit_number,
      account_number: balance.account_number,

      current_balance: resolvedCurrentBalance,

      monthly_assessment: balance.monthly_assessment,

      payment_status: balance.payment_status,

      delinquency_level: balance.delinquency_level,

      account_health: balance.account_health,

      last_payment_date: balance.last_payment_date,

      payment_link: balance.payment_link,

      synced_at: balance.synced_at,

      accounting_identity: identity
        ? {
            quickbooks_company_name: identity.quickbooks_company_name,
            quickbooks_customer_id: identity.quickbooks_customer_id,
            quickbooks_customer_display_name:
              identity.quickbooks_customer_display_name,
            last_invoice_id: identity.last_invoice_id,
            last_payment_id: identity.last_payment_id,
            sync_status: identity.sync_status,
            last_synced_at: identity.last_synced_at,
          }
        : null,
    };

    return res.status(200).json({
      success: true,
      balance: responseBalance,
      ledger_summary: ledgerSummary,
      ledger_entries: safeLedgerEntries.slice(0, 25),
      ava_accounting_response: buildAvaAccountingMessage(
        responseBalance,
        ledgerSummary
      ),
      ledger_error: ledgerError ? ledgerError.message : null,
    });
  } catch (error) {
    console.error("Owner balance API failed:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Unexpected owner balance error.",
      stack: error?.stack || null,
    });
  }
}

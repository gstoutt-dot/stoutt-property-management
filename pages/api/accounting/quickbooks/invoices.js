// /pages/api/accounting/quickbooks/invoices.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getValidQuickBooksConnection } from "../../../../lib/quickbooksTokenManager";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  const environment = process.env.QUICKBOOKS_ENVIRONMENT || "development";
  return environment === "production"
    ? "https://quickbooks.api.intuit.com"
    : "https://sandbox-quickbooks.api.intuit.com";
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { association_id } = req.query;

    if (!association_id || typeof association_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    const connection = await getValidQuickBooksConnection(association_id);

    if (!connection?.realm_id || !connection?.access_token) {
      return res.status(404).json({
        success: false,
        error: "No valid QuickBooks connection found for this association.",
      });
    }

    const realmId = connection.realm_id;
    const accessToken = connection.access_token;

    const query = "select * from Invoice startPosition 1 maxResults 1000";

    const quickBooksUrl = new URL(
      `${getQuickBooksBaseUrl()}/v3/company/${realmId}/query`
    );

    quickBooksUrl.searchParams.set("query", query);
    quickBooksUrl.searchParams.set("minorversion", QUICKBOOKS_MINOR_VERSION);

    const qbResponse = await fetch(quickBooksUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const qbData = await qbResponse.json();

    if (!qbResponse.ok) {
      console.error("QuickBooks invoice pull failed:", qbData);

      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: JSON.stringify(qbData),
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", association_id);

      return res.status(502).json({
        success: false,
        error: "QuickBooks invoice pull failed.",
        details: qbData,
      });
    }

    const invoices = qbData?.QueryResponse?.Invoice || [];
    const now = new Date().toISOString();

        const normalizedInvoices = invoices.map((invoice) => {
      const customerRef = invoice.CustomerRef || {};

      return {
        association_id,
        quickbooks_invoice_id: invoice.Id,
        quickbooks_customer_id: customerRef.value || null,
        quickbooks_customer_name: customerRef.name || null,
        invoice_number: invoice.DocNumber || null,
        invoice_date: invoice.TxnDate || null,
        due_date: invoice.DueDate || null,
        total_amount: Number(invoice.TotalAmt || 0),
        balance: Number(invoice.Balance || 0),
        status:
          Number(invoice.Balance || 0) <= 0
            ? "paid"
            : invoice.DueDate && new Date(invoice.DueDate) < new Date()
            ? "overdue"
            : "open",
        raw_quickbooks_payload: invoice,
        synced_at: now,
        updated_at: now,
      };
    });

    const latestAssessmentByCustomerId = new Map();

    normalizedInvoices.forEach((invoice) => {
      const customerId = invoice.quickbooks_customer_id;
      const amount = Number(invoice.total_amount || 0);

      if (!customerId || amount <= 0) return;

      const existing = latestAssessmentByCustomerId.get(customerId);

      if (
        !existing ||
        new Date(invoice.invoice_date || 0) > new Date(existing.invoice_date || 0)
      ) {
        latestAssessmentByCustomerId.set(customerId, invoice);
      }
    });

    let ownerAssessmentUpdates = 0;
    const assessmentUpdateErrors = [];

    for (const [customerId, invoice] of latestAssessmentByCustomerId.entries()) {
            const unitMatch = String(invoice.quickbooks_customer_name || "").match(
        /Unit\s+([A-Za-z0-9-]+)/i
      );

      const unitNumber = unitMatch ? unitMatch[1] : "";

      const { data: ownerBalance, error: findError } = await supabaseAdmin
        .from("owner_account_balances")
        .select("*")
        .eq("association_id", association_id)
        .eq("unit_number", unitNumber)
        .maybeSingle();

      if (findError) {
                assessmentUpdateErrors.push({
          quickbooks_customer_id: customerId,
          quickbooks_customer_name: invoice.quickbooks_customer_name,
          extracted_unit_number: unitNumber,
          error: "No matching owner balance record found.",
        });

        continue;
      }

      if (!ownerBalance?.id) {
        assessmentUpdateErrors.push({
          quickbooks_customer_id: customerId,
          error: "No matching owner balance record found.",
        });

        continue;
      }

      const { error: updateError } = await supabaseAdmin
        .from("owner_account_balances")
        .update({
          monthly_assessment: Number(invoice.total_amount || 0),
          synced_at: now,
        })
        .eq("id", ownerBalance.id);

      if (updateError) {
        assessmentUpdateErrors.push({
          quickbooks_customer_id: customerId,
          error: updateError.message,
        });

        continue;
      }

      ownerAssessmentUpdates += 1;
    }

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        last_invoice_sync_at: now,
        sync_error: null,
        updated_at: now,
      })
      .eq("association_id", association_id);

    return res.status(200).json({
      success: true,
      message: "QuickBooks invoices pulled successfully.",
      association_id,
      realm_id: realmId,
      token_status: "valid",
      access_token_expires_at: connection.access_token_expires_at || null,
      last_token_refresh_at:
        connection.last_token_refresh_at ||
        connection.last_refresh_at ||
        null,
            invoice_count: invoices.length,
      owner_assessment_updates: ownerAssessmentUpdates,
      assessment_update_errors: assessmentUpdateErrors,
      invoices: normalizedInvoices,
    });
  } catch (error) {
    console.error("QuickBooks invoices sync error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to synchronize QuickBooks invoices.",
      details: error.message,
    });
  }
}

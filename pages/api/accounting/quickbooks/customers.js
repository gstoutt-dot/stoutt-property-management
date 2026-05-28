// /pages/api/accounting/quickbooks/customers.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getValidQuickBooksConnection } from "../../../../lib/quickbooksTokenManager";

const QUICKBOOKS_MINOR_VERSION = "75";

function getQuickBooksBaseUrl() {
  const environment = process.env.QUICKBOOKS_ENVIRONMENT || "development";

  if (environment === "production") {
    return "https://quickbooks.api.intuit.com";
  }

  return "https://sandbox-quickbooks.api.intuit.com";
}

function parseUnitNumber(displayName = "") {
  const match = displayName.match(/unit\s*([A-Za-z0-9-]+)/i);
  return match ? match[1] : null;
}

async function saveCustomerSafely(customer) {
  const now = new Date().toISOString();

  const { data: existingByCustomerId } = await supabaseAdmin
    .from("accounting_identity_links")
    .select("id")
    .eq("association_id", customer.association_id)
    .eq("quickbooks_customer_id", customer.quickbooks_customer_id)
    .maybeSingle();

  if (existingByCustomerId?.id) {
    const { error } = await supabaseAdmin
      .from("accounting_identity_links")
      .update({
        unit_number: customer.unit_number,
        quickbooks_company_name: customer.quickbooks_company_name,
        quickbooks_customer_display_name:
          customer.quickbooks_customer_display_name,
        current_balance: customer.current_balance,
        sync_status: customer.sync_status,
        last_synced_at: now,
      })
      .eq("id", existingByCustomerId.id);

    if (error) throw error;
    return;
  }

  const { data: existingByUnit } = await supabaseAdmin
    .from("accounting_identity_links")
    .select("id")
    .eq("association_id", customer.association_id)
    .eq("unit_number", customer.unit_number)
    .maybeSingle();

  if (existingByUnit?.id) {
    const { error } = await supabaseAdmin
      .from("accounting_identity_links")
      .update({
        quickbooks_company_name: customer.quickbooks_company_name,
        quickbooks_customer_id: customer.quickbooks_customer_id,
        quickbooks_customer_display_name:
          customer.quickbooks_customer_display_name,
        current_balance: customer.current_balance,
        sync_status: customer.sync_status,
        last_synced_at: now,
      })
      .eq("id", existingByUnit.id);

    if (error) throw error;
    return;
  }

  const { error } = await supabaseAdmin
    .from("accounting_identity_links")
    .insert(customer);

  if (error) throw error;
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

    const query = "select * from Customer startPosition 1 maxResults 1000";

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
      console.error("QuickBooks customer pull failed:", qbData);

      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: JSON.stringify(qbData),
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", association_id);

      return res.status(502).json({
        success: false,
        error: "QuickBooks customer pull failed.",
        details: qbData,
      });
    }

    const customers = qbData?.QueryResponse?.Customer || [];
    const now = new Date().toISOString();

    const normalizedCustomers = customers
      .map((customer) => {
        const displayName =
          customer.DisplayName ||
          customer.FullyQualifiedName ||
          customer.CompanyName ||
          "Unknown Customer";

        const unitNumber = parseUnitNumber(displayName);

        if (!unitNumber) {
          return null;
        }

        return {
          association_id,
          unit_number: unitNumber,
          owner_user_id: null,
          quickbooks_company_name:
            process.env.QUICKBOOKS_ENVIRONMENT === "production"
              ? "QuickBooks Production"
              : "QuickBooks Sandbox",
          quickbooks_customer_id: customer.Id,
          quickbooks_customer_display_name: displayName,
          last_invoice_id: null,
          last_payment_id: null,
          current_balance: Number(customer.Balance || 0),
          monthly_assessment: null,
          sync_status: "customer_synced",
          last_synced_at: now,
        };
      })
      .filter(Boolean);

    const uniqueCustomers = Array.from(
      new Map(
        normalizedCustomers.map((customer) => [
          `${customer.unit_number}-${customer.quickbooks_customer_id}`,
          customer,
        ])
      ).values()
    );

    for (const customer of uniqueCustomers) {
      await saveCustomerSafely(customer);
    }

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        last_customer_sync_at: now,
        sync_error: null,
        updated_at: now,
      })
      .eq("association_id", association_id);

    return res.status(200).json({
      success: true,
      message: "QuickBooks customers synchronized successfully.",
      association_id,
      realm_id: realmId,
      token_status: "valid",
      access_token_expires_at: connection.access_token_expires_at || null,
      last_token_refresh_at:
        connection.last_token_refresh_at ||
        connection.last_refresh_at ||
        null,
      customer_count: customers.length,
      saved_customer_count: uniqueCustomers.length,
      customers: uniqueCustomers,
    });
  } catch (error) {
    console.error("QuickBooks customers sync error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to synchronize QuickBooks customers.",
      details: error.message,
    });
  }
}

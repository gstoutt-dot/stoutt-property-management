// /pages/api/accounting/quickbooks/customers.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

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

    const { data: connection, error: connectionError } = await supabaseAdmin
      .from("quickbooks_connections")
      .select("*")
      .eq("association_id", association_id)
      .eq("connection_status", "connected")
      .single();

    if (connectionError || !connection) {
      return res.status(404).json({
        success: false,
        error: "No active QuickBooks connection found for this association.",
        details: connectionError?.message || null,
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

    const normalizedCustomers = customers.map((customer) => {
      const displayName =
        customer.DisplayName ||
        customer.FullyQualifiedName ||
        customer.CompanyName ||
        "Unknown Customer";

      return {
        association_id,
        unit_number: parseUnitNumber(displayName),
        owner_user_id: null,
        quickbooks_company_name: "QuickBooks Sandbox",
        quickbooks_customer_id: customer.Id,
        quickbooks_customer_display_name: displayName,
        last_invoice_id: null,
        last_payment_id: null,
        current_balance: Number(customer.Balance || 0),
        monthly_assessment: null,
        sync_status: "customer_synced",
        last_synced_at: new Date().toISOString(),
      };
    });

    if (normalizedCustomers.length > 0) {
      const { error: upsertError } = await supabaseAdmin
        .from("accounting_identity_links")
        .upsert(normalizedCustomers, {
          onConflict: "association_id,quickbooks_customer_id",
        });

      if (upsertError) {
        console.error("SPM customer identity upsert failed:", upsertError);

        return res.status(500).json({
          success: false,
          error: "QuickBooks customers pulled, but SPM could not save them.",
          details: upsertError.message,
        });
      }
    }

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        last_customer_sync_at: new Date().toISOString(),
        sync_error: null,
        updated_at: new Date().toISOString(),
      })
      .eq("association_id", association_id);

    return res.status(200).json({
      success: true,
      message: "QuickBooks customers synchronized successfully.",
      association_id,
      realm_id: realmId,
      customer_count: customers.length,
      customers: normalizedCustomers,
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

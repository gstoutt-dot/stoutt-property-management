// /pages/api/accounting/quickbooks/vendors.js

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

function normalizeVendorAddress(vendor) {
  const address = vendor.BillAddr || vendor.PrimaryAddr || {};

  return [
    address.Line1,
    address.Line2,
    address.City,
    address.CountrySubDivisionCode,
    address.PostalCode,
  ]
    .filter(Boolean)
    .join(", ");
}

function normalizeVendorPhone(vendor) {
  return (
    vendor.PrimaryPhone?.FreeFormNumber ||
    vendor.Mobile?.FreeFormNumber ||
    vendor.AlternatePhone?.FreeFormNumber ||
    ""
  );
}

function normalizeVendorEmail(vendor) {
  return vendor.PrimaryEmailAddr?.Address || "";
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

    const query = "select * from Vendor startPosition 1 maxResults 1000";

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
      console.error("QuickBooks vendor pull failed:", qbData);

      await supabaseAdmin
        .from("quickbooks_connections")
        .update({
          sync_error: JSON.stringify(qbData),
          updated_at: new Date().toISOString(),
        })
        .eq("association_id", association_id);

      return res.status(502).json({
        success: false,
        error: "QuickBooks vendor pull failed.",
        details: qbData,
      });
    }

    const vendors = qbData?.QueryResponse?.Vendor || [];
    const now = new Date().toISOString();

    const normalizedVendors = vendors.map((vendor) => {
      const displayName =
        vendor.DisplayName ||
        vendor.PrintOnCheckName ||
        vendor.CompanyName ||
        vendor.GivenName ||
        "Unknown Vendor";

      return {
        association_id,
        quickbooks_vendor_id: vendor.Id,
        vendor_display_name: displayName,
        vendor_name: displayName,
        company_name: vendor.CompanyName || displayName,
        print_on_check_name: vendor.PrintOnCheckName || "",
        email: normalizeVendorEmail(vendor),
        phone: normalizeVendorPhone(vendor),
        address: normalizeVendorAddress(vendor),
        active: vendor.Active !== false,
        balance: Number(vendor.Balance || 0),
        vendor_type: vendor.Vendor1099 ? "1099 Vendor" : "Vendor",
        sync_status: "vendor_synced",
        last_synced_at: now,
      };
    });

    if (normalizedVendors.length > 0) {
      const { error: upsertError } = await supabaseAdmin
        .from("association_vendors")
        .upsert(normalizedVendors, {
          onConflict: "association_id,quickbooks_vendor_id",
        });

      if (upsertError) {
        console.error("SPM vendor upsert failed:", upsertError);

        return res.status(500).json({
          success: false,
          error: "QuickBooks vendors pulled, but SPM could not save them.",
          details: upsertError.message,
        });
      }
    }

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        last_vendor_sync_at: now,
        sync_error: null,
        updated_at: now,
      })
      .eq("association_id", association_id);

    return res.status(200).json({
      success: true,
      message: "QuickBooks vendors synchronized successfully.",
      association_id,
      realm_id: realmId,
      token_status: "valid",
      access_token_expires_at: connection.access_token_expires_at || null,
      last_token_refresh_at:
        connection.last_token_refresh_at ||
        connection.last_refresh_at ||
        null,
      vendor_count: normalizedVendors.length,
      vendors: normalizedVendors,
    });
  } catch (error) {
    console.error("QuickBooks vendors sync error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to synchronize QuickBooks vendors.",
      details: error.message,
    });
  }
}

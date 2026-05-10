// /pages/api/accounting/quickbooks/sync-live-balances.js

import { supabaseAdmin } from "../../../../lib/supabaseAdmin";

import {
  buildOwnerBalanceRecordFromQuickBooksCustomer,
  buildBoardFinancialSummary,
} from "../../../../lib/accountingMirrorEngine";

const QUICKBOOKS_API_BASE = "https://sandbox-quickbooks.api.intuit.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const { association_id, realm_id } = req.body;

    if (!association_id) {
      return res.status(400).json({
        success: false,
        error: "association_id is required",
      });
    }

    if (!realm_id) {
      return res.status(400).json({
        success: false,
        error: "realm_id is required",
      });
    }

    const accessToken = process.env.QUICKBOOKS_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({
        success: false,
        error: "QUICKBOOKS_ACCESS_TOKEN is missing",
      });
    }

    const customerQuery = `
      SELECT 
        Id,
        DisplayName,
        Balance
      FROM Customer
      MAXRESULTS 1000
    `;

    const quickbooksResponse = await fetch(
      `${QUICKBOOKS_API_BASE}/v3/company/${realm_id}/query?query=${encodeURIComponent(
        customerQuery
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    const quickbooksData = await quickbooksResponse.json();

    if (!quickbooksResponse.ok) {
      return res.status(502).json({
        success: false,
        error: "Unable to pull QuickBooks balances",
        details: quickbooksData,
      });
    }

    const customers = quickbooksData?.QueryResponse?.Customer || [];

    const balanceRecords = customers.map((customer) =>
      buildOwnerBalanceRecordFromQuickBooksCustomer({
        associationId: association_id,
        quickbooksCustomerId: customer.Id,
        customerName: customer.DisplayName,
        currentBalance: Number(customer.Balance || 0),
      })
    );

    if (balanceRecords.length > 0) {
      const { error: upsertError } = await supabaseAdmin
        .from("owner_account_balances")
        .upsert(balanceRecords, {
          onConflict: "association_id,account_number",
        });

      if (upsertError) {
        return res.status(500).json({
          success: false,
          error: "Unable to save mirrored balances",
          details: upsertError.message,
        });
      }
    }

    const boardSummary = buildBoardFinancialSummary(balanceRecords);

    return res.status(200).json({
      success: true,
      message: "Live QuickBooks balances synchronized successfully.",
      association_id,
      realm_id,
      synced_accounts: balanceRecords.length,
      board_summary: boardSummary,
      balances: balanceRecords,
    });
  } catch (error) {
    console.error("sync-live-balances error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to synchronize live balances.",
      details: error.message,
    });
  }
}

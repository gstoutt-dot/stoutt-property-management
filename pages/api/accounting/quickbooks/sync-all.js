// /pages/api/accounting/quickbooks/sync-all.js

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const association_id =
      req.method === "GET" ? req.query.association_id : req.body.association_id;

    if (!association_id || typeof association_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    const host = req.headers.host;
    const protocol = host?.includes("localhost") ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;
    const encodedAssociationId = encodeURIComponent(association_id);

    const endpoints = [
      {
        key: "customers",
        url: `${baseUrl}/api/accounting/quickbooks/customers?association_id=${encodedAssociationId}`,
      },
      {
        key: "invoices",
        url: `${baseUrl}/api/accounting/quickbooks/invoices?association_id=${encodedAssociationId}`,
      },
      {
        key: "payments",
        url: `${baseUrl}/api/accounting/quickbooks/payments?association_id=${encodedAssociationId}`,
      },
      {
        key: "live_balances",
        url: `${baseUrl}/api/accounting/quickbooks/sync-live-balances?association_id=${encodedAssociationId}`,
      },
      {
        key: "financial_summary",
        url: `${baseUrl}/api/accounting/quickbooks/financial-summary?association_id=${encodedAssociationId}`,
      },
    ];

    const results = {};

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-store",
          },
        });

        const data = await response.json();

        results[endpoint.key] = {
          success: response.ok && data.success !== false,
          status: response.status,
          data,
        };

        if (!response.ok || data.success === false) {
          console.error(`QuickBooks sync-all step failed: ${endpoint.key}`, data);
        }
      } catch (stepError) {
        console.error(`QuickBooks sync-all step crashed: ${endpoint.key}`, stepError);

        results[endpoint.key] = {
          success: false,
          status: 500,
          data: {
            success: false,
            error: `QuickBooks sync step failed: ${endpoint.key}`,
            details: stepError.message,
          },
        };
      }
    }

    const failedSteps = Object.entries(results)
      .filter(([, result]) => !result.success)
      .map(([key]) => key);

    return res.status(failedSteps.length > 0 ? 207 : 200).json({
      success: failedSteps.length === 0,
      message:
        failedSteps.length === 0
          ? "QuickBooks full accounting synchronization completed successfully."
          : "QuickBooks synchronization completed with one or more failed steps.",
      association_id,
      token_refresh_mode: "automatic",
      failed_steps: failedSteps,
      results,
      synced_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("QuickBooks sync-all error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to complete QuickBooks full synchronization.",
      details: error.message,
    });
  }
}

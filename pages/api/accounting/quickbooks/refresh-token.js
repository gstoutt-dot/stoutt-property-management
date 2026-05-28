import { refreshQuickBooksConnectionNow } from "../../../../lib/quickbooksTokenManager";

export default async function handler(req, res) {
  try {
    const associationId =
      req.query.association_id || 
      req.query.associationId ||
      req.body?.association_id ||
      req.body?.associationId;

    if (!associationId) {
      return res.status(400).json({
        success: false,
        error: "Missing association_id.",
      });
    }

    const connection = await refreshQuickBooksConnectionNow(associationId);

    return res.status(200).json({
      success: true,
      message: "QuickBooks token refreshed successfully.",
      association_id: connection.association_id,
      realm_id: connection.realm_id,
      access_token_expires_at: connection.access_token_expires_at,
      refresh_token_expires_at: connection.refresh_token_expires_at,
      last_refresh_at: connection.last_refresh_at,
      last_refresh_status: connection.last_refresh_status,
    });
  } catch (error) {
    console.error("QuickBooks refresh-token error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "QuickBooks token refresh failed.",
    });
  }
}

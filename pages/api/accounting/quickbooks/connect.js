// /pages/api/accounting/quickbooks/connect.js

import crypto from "crypto";

const INTUIT_AUTH_URL = "https://appcenter.intuit.com/connect/oauth2";

function base64UrlEncode(value) {
  return Buffer.from(JSON.stringify(value))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function signState(payload, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const clientId = process.env.QUICKBOOKS_CLIENT_ID;
    const redirectUri = process.env.QUICKBOOKS_REDIRECT_URI;
    const stateSecret = process.env.QUICKBOOKS_OAUTH_STATE_SECRET;

    if (!clientId || !redirectUri || !stateSecret) {
      return res.status(500).json({
        success: false,
        error: "QuickBooks OAuth environment variables are missing.",
        required: [
          "QUICKBOOKS_CLIENT_ID",
          "QUICKBOOKS_REDIRECT_URI",
          "QUICKBOOKS_OAUTH_STATE_SECRET",
        ],
      });
    }

    const {
      association_id,
      return_to = "/accounting-mirror-test",
    } = req.query;

    if (!association_id || typeof association_id !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing required association_id.",
      });
    }

    const statePayload = {
      association_id,
      return_to,
      nonce: crypto.randomBytes(24).toString("hex"),
      created_at: new Date().toISOString(),
      source: "spm_quickbooks_connect",
    };

    const encodedPayload = base64UrlEncode(statePayload);
    const signature = signState(encodedPayload, stateSecret);
    const state = `${encodedPayload}.${signature}`;

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: "code",
      scope: "com.intuit.quickbooks.accounting",
      redirect_uri: redirectUri,
      state,
    });

    const authorizationUrl = `${INTUIT_AUTH_URL}?${params.toString()}`;

    return res.redirect(302, authorizationUrl);
  } catch (error) {
    console.error("QuickBooks connect error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to start QuickBooks connection flow.",
    });
  }
}

// /pages/api/accounting/quickbooks/callback.js

import crypto from "crypto";

const INTUIT_TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, "base64").toString("utf8");
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

function verifyAndDecodeState(state, secret) {
  if (!state || typeof state !== "string" || !state.includes(".")) {
    throw new Error("Invalid OAuth state format.");
  }

  const [encodedPayload, receivedSignature] = state.split(".");

  const expectedSignature = signState(encodedPayload, secret);

  const receivedBuffer = Buffer.from(receivedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    throw new Error("OAuth state signature verification failed.");
  }

  const decoded = JSON.parse(base64UrlDecode(encodedPayload));

  if (!decoded.association_id) {
    throw new Error("OAuth state is missing association_id.");
  }

  return decoded;
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
    const clientSecret = process.env.QUICKBOOKS_CLIENT_SECRET;
    const redirectUri = process.env.QUICKBOOKS_REDIRECT_URI;
    const stateSecret = process.env.QUICKBOOKS_OAUTH_STATE_SECRET;

    if (!clientId || !clientSecret || !redirectUri || !stateSecret) {
      return res.status(500).json({
        success: false,
        error: "QuickBooks OAuth environment variables are missing.",
        required: [
          "QUICKBOOKS_CLIENT_ID",
          "QUICKBOOKS_CLIENT_SECRET",
          "QUICKBOOKS_REDIRECT_URI",
          "QUICKBOOKS_OAUTH_STATE_SECRET",
        ],
      });
    }

    const { code, state, realmId, error, error_description } = req.query;

    if (error) {
      return res.status(400).json({
        success: false,
        error,
        error_description:
          error_description || "QuickBooks authorization was not completed.",
      });
    }

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing QuickBooks authorization code.",
      });
    }

    if (!realmId || typeof realmId !== "string") {
      return res.status(400).json({
        success: false,
        error: "Missing QuickBooks realmId.",
      });
    }

    const decodedState = verifyAndDecodeState(state, stateSecret);

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const tokenResponse = await fetch(INTUIT_TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("QuickBooks token exchange failed:", tokenData);

      return res.status(502).json({
        success: false,
        error: "QuickBooks token exchange failed.",
        details: tokenData,
      });
    }

    console.log("QuickBooks connection established:", {
      association_id: decodedState.association_id,
      realmId,
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in,
      x_refresh_token_expires_in: tokenData.x_refresh_token_expires_in,
      connected_at: new Date().toISOString(),
    });

    const returnTo =
      typeof decodedState.return_to === "string"
        ? decodedState.return_to
        : "/accounting-mirror-test";

    const redirectTarget = new URL(returnTo, `https://${req.headers.host}`);

    redirectTarget.searchParams.set("quickbooks", "connected");
    redirectTarget.searchParams.set("association_id", decodedState.association_id);
    redirectTarget.searchParams.set("realm_id", realmId);

    return res.redirect(302, redirectTarget.toString());
  } catch (error) {
    console.error("QuickBooks callback error:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to complete QuickBooks connection.",
      details: error.message,
    });
  }
}

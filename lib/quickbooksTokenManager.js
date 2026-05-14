import { supabaseAdmin } from "./supabaseAdmin";

const INTUIT_TOKEN_URL =
  "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

function addSecondsToNow(seconds) {
  if (!seconds || Number.isNaN(Number(seconds))) {
    return null;
  }

  return new Date(
    Date.now() + Number(seconds) * 1000
  ).toISOString();
}

export async function refreshQuickBooksAccessToken(
  associationId
) {
  if (!associationId) {
    throw new Error("associationId is required.");
  }

  const clientId = process.env.QUICKBOOKS_CLIENT_ID;
  const clientSecret = process.env.QUICKBOOKS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "QuickBooks OAuth environment variables are missing."
    );
  }

  const { data: connection, error: connectionError } =
    await supabaseAdmin
      .from("quickbooks_connections")
      .select("*")
      .eq("association_id", associationId)
      .single();

  if (connectionError || !connection) {
    throw new Error(
      "QuickBooks connection not found for association."
    );
  }

  if (!connection.refresh_token) {
    throw new Error(
      "QuickBooks refresh token is missing."
    );
  }

  const basicAuth = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const tokenResponse = await fetch(INTUIT_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      Accept: "application/json",
      "Content-Type":
        "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: connection.refresh_token,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error(
      "QuickBooks token refresh failed:",
      tokenData
    );

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        connection_status: "token_refresh_failed",
        sync_error: JSON.stringify(tokenData),
        updated_at: new Date().toISOString(),
      })
      .eq("association_id", associationId);

    throw new Error(
      tokenData?.fault?.error?.[0]?.message ||
        "QuickBooks token refresh failed."
    );
  }

  const now = new Date().toISOString();

  const updatedConnection = {
    access_token: tokenData.access_token,
    refresh_token:
      tokenData.refresh_token || connection.refresh_token,

    token_type: tokenData.token_type || "bearer",

    access_token_expires_at: addSecondsToNow(
      tokenData.expires_in
    ),

    refresh_token_expires_at: addSecondsToNow(
      tokenData.x_refresh_token_expires_in
    ),

    connection_status: "connected",
    last_token_refresh_at: now,
    sync_error: null,
    updated_at: now,
  };

  const { error: updateError } = await supabaseAdmin
    .from("quickbooks_connections")
    .update(updatedConnection)
    .eq("association_id", associationId);

  if (updateError) {
    throw updateError;
  }

  return {
    success: true,
    association_id: associationId,
    access_token: tokenData.access_token,
    refreshed_at: now,
  };
}

import { supabaseAdmin } from "./supabaseAdmin";

const INTUIT_TOKEN_URL =
  "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

const ACCESS_TOKEN_BUFFER_MS = 10 * 60 * 1000;

function nowIso() {
  return new Date().toISOString();
}

function addSecondsToNow(seconds, fallbackSeconds = 3600) {
  const safeSeconds =
    seconds && !Number.isNaN(Number(seconds))
      ? Number(seconds)
      : fallbackSeconds;

  return new Date(Date.now() + safeSeconds * 1000).toISOString();
}

function shouldRefresh(connection) {
  if (!connection?.access_token) return true;
  if (!connection?.access_token_expires_at) return true;

  const expiresAt = new Date(
    connection.access_token_expires_at
  ).getTime();

  return expiresAt - Date.now() <= ACCESS_TOKEN_BUFFER_MS;
}

async function getQuickBooksConnection(associationId) {
  const { data: connection, error } = await supabaseAdmin
    .from("quickbooks_connections")
    .select("*")
    .eq("association_id", associationId)
    .eq("connection_status", "connected")
    .maybeSingle();

  if (error) {
    throw new Error(
      `QuickBooks connection lookup failed: ${error.message}`
    );
  }

  if (!connection) {
    throw new Error(
      "No active QuickBooks connection found for association."
    );
  }

  return connection;
}

async function refreshConnection(connection) {
  const clientId = process.env.QUICKBOOKS_CLIENT_ID;
  const clientSecret = process.env.QUICKBOOKS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "QuickBooks OAuth environment variables are missing."
    );
  }

  if (!connection.refresh_token) {
    throw new Error("QuickBooks refresh token is missing.");
  }

  const basicAuth = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  const tokenResponse = await fetch(INTUIT_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: connection.refresh_token,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    console.error("QuickBooks token refresh failed:", tokenData);

    await supabaseAdmin
      .from("quickbooks_connections")
      .update({
        connection_status: "token_refresh_failed",
        sync_error: JSON.stringify(tokenData),
        updated_at: nowIso(),
      })
      .eq("association_id", connection.association_id);

    throw new Error(
      tokenData?.error_description ||
        tokenData?.error ||
        tokenData?.fault?.error?.[0]?.message ||
        "QuickBooks token refresh failed."
    );
  }

  const now = nowIso();

  const updatedConnection = {
    access_token: tokenData.access_token,
    refresh_token:
      tokenData.refresh_token || connection.refresh_token,
    token_type: tokenData.token_type || "bearer",
    access_token_expires_at: addSecondsToNow(
      tokenData.expires_in,
      3600
    ),
    refresh_token_expires_at: addSecondsToNow(
      tokenData.x_refresh_token_expires_in,
      100 * 24 * 60 * 60
    ),
    connection_status: "connected",
    last_token_refresh_at: now,
    last_refresh_at: now,
    last_refresh_status: "success",
    last_refresh_error: null,
    sync_error: null,
    updated_at: now,
  };

  const { data: savedConnection, error: updateError } =
    await supabaseAdmin
      .from("quickbooks_connections")
      .update(updatedConnection)
      .eq("association_id", connection.association_id)
      .select("*")
      .single();

  if (updateError) {
    throw updateError;
  }

  return savedConnection;
}

export async function getValidQuickBooksConnection(associationId) {
  if (!associationId) {
    throw new Error("associationId is required.");
  }

  const connection = await getQuickBooksConnection(associationId);

  if (!shouldRefresh(connection)) {
    return connection;
  }

  return await refreshConnection(connection);
}

export async function refreshQuickBooksConnectionNow(associationId) {
  if (!associationId) {
    throw new Error("associationId is required.");
  }

  const connection = await getQuickBooksConnection(associationId);
  return await refreshConnection(connection);
}

export async function refreshQuickBooksAccessToken(associationId) {
  const connection = await refreshQuickBooksConnectionNow(
    associationId
  );

  return {
    success: true,
    association_id: associationId,
    access_token: connection.access_token,
    refreshed_at:
      connection.last_token_refresh_at ||
      connection.last_refresh_at ||
      nowIso(),
  };
}

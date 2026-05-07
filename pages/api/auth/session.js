import { supabase } from "../../../lib/supabaseClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    if (!session) {
      return res.status(200).json({
        success: true,
        authenticated: false,
        session: null,
      });
    }

    return res.status(200).json({
      success: true,
      authenticated: true,
      session: {
        access_token: session.access_token,
        expires_at: session.expires_at,
        user: {
          id: session.user?.id,
          email: session.user?.email,
        },
      },
    });
  } catch (error) {
    console.error("Session API failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unexpected session error.",
    });
  }
}

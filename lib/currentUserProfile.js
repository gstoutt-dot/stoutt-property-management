import { supabase } from "./supabaseClient";
import { buildUserScope } from "./userScope";

export async function getCurrentUserProfile() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      user: null,
      profile: null,
      scope: buildUserScope(null),
      error: userError || null,
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .eq("status", "active")
    .single();

  if (profileError) {
    return {
      user,
      profile: null,
      scope: buildUserScope(null),
      error: profileError,
    };
  }

  return {
    user,
    profile,
    scope: buildUserScope(profile),
    error: null,
  };
}

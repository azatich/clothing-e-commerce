"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({ email, password });

  if (authError) {
    return { success: false, error: authError.message };
  }

  const userId = authData.user?.id;
  console.log(userId);
  
  if (!userId) {
    return { success: false, error: "User ID not found after login" };
  }

  const { data: existing, error: selectError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (selectError) {
    return { success: false, error: selectError.message };
  }

  if (!existing) {
    const { error: insertError } = await supabase.from("users").insert({
      id: userId,
      username: authData.user?.user_metadata.username || "",
      phone: authData.user?.user_metadata.phone || "",
      avatar: authData.user?.user_metadata.avatar || "",
      full_name: authData.user?.user_metadata.full_name || "",
    });

    if (insertError) {
      return { success: false, error: insertError.message };
    }
  }

  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const username = formData.get("username") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        phone,
        username,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

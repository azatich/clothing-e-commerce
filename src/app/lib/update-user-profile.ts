"use server";

import { ProfileFormData } from "@/types/profile";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(
  userId: string | null,
  formData: ProfileFormData,
  avatarFile?: File | null
) {
  const supabase = await createClient();

  let avatarUrl: string | null = null;

  if (avatarFile) {
    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    avatarUrl = publicUrl;
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({
      username: formData.username,
      phone: formData.phone,
      ...(avatarUrl ? { avatar: avatarUrl } : {}),
    })
    .eq("id", userId);
  
    const users = await supabase.from('users').select('*');
    console.log(users);
    

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true };
}


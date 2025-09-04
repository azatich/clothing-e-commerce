"use server";

import { createClient } from "@/utils/supabase/server";

export const deleteCartItem = async (itemId: string) => {
  const supabase = await createClient();

  const { error } = await supabase.from("cart").delete().eq("id", itemId);
  console.log("deleted item id: ", itemId);

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true };
};

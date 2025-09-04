"use server";

import { createClient } from "@/utils/supabase/server";

export const updateQuantity = async (itemId: string, newQuantity: number) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("cart")
    .update({ quantity: newQuantity })
    .eq("id", itemId);

  if (error) {
    return { success: false, message: error.message };
  }
  return { success: true };
};

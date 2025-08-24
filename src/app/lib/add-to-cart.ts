import { Hoodie } from "@/types/products";
import { createClient } from "@/utils/supabase/clients";
import { redirect } from "next/navigation";

export async function addToCart(hoodie: Hoodie, quantity: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { error } = await supabase.from("cart").insert([
    {
      user_id: user.id, // ✅ correct user ID
      product_id: hoodie.id,
      quantity,
      color: hoodie.color,
      size: hoodie.size,
      price: hoodie.price,
      discount_percent: hoodie.discount_percent,
      image_url: hoodie.image_url,
    },
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
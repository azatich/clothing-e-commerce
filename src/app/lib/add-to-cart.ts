"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function addToCartHoodie(hoodieID: number, quantity: number) {
  const supabase = await createClient();

  console.log("user selected hoodie with id", hoodieID);
  

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data } = await supabase.from("hoodies").select().eq("id", hoodieID).single();
  console.log("hoodie found:", data);

  if (!data) {
    return { success: false, error: "Hoodie not found" };
  }

  const { error } = await supabase.from("cart").insert([
    {
      user_id: user.id,
      product_name: data.name,
      product_id: data.id,
      quantity,
      maxQuantity: data.quantity,
      color: data.color,
      size: data.size,
      price: data.price,
      discount_percent: data.discount_percent,
      image_url: data.image_url,
    },
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function addToCartShoe(shoeID: number, quantity: number) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data } = await supabase.from("shoes").select().eq("id", shoeID).single();

  if (!data) {
    return { success: false, error: "Shoe not found" };
  } 

  const { error } = await supabase.from("cart").insert([
    {
      user_id: user.id,
      product_name: data.name,
      product_id: data.id,
      quantity,
      maxQuantity: data.quantity,
      color: data.color,
      size: data.size,
      price: data.price,
      discount_percent: data.discount_percent,
      image_url: data.image_url,
    },
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

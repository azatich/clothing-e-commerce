import { createBrowserClient } from '@supabase/ssr'
import { Hoodie } from "../../types/products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export async function addToCart(product: Hoodie, quantity = 1) {
  const { data: userData } = await supabase.auth.getUser();
  console.log(userData);
  
  const user_id = userData?.user?.id;
  if (!user_id) return;

  const { data: existing, error: fetchError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", user_id)
    .eq("product_id", product.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking cart:", fetchError);
    return;
  }

  if (existing) {
    // Update quantity if already exists
    const newQuantity = quantity;
    const { error: updateError } = await supabase
      .from("cart")
      .update({ quantity: newQuantity+existing.quantity })
      .eq("id", existing.id);
    if (updateError) {
      console.error("Error updating cart:", updateError);
    }
  } else {
    // Insert new cart item
    const { error: insertError } = await supabase.from("cart").insert([
      {
        user_id,
        product_id: product.id,
        color: product.color,
        size: product.size,
        quantity,
        price: product.price,
        discount_percent: product.discount_percent,
        image_url: product.image_url,
      },
    ]);
    if (insertError) {
      console.error("Error adding to cart:", insertError);
    }
  }
}

export function createClient() {
  return createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
}

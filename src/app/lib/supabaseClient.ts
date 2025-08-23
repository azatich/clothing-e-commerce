import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function addToCart(product, quantity = 1) {
  const { data: userData } = await supabase.auth.getUser();
  const user_id = userData?.user?.id;
  if (!user_id) return;

  // Check if product already exists in cart for this user
  const { data: existing, error: fetchError } = await supabase
    .from("cart")
    .select("*")
    .eq("user_id", user_id)
    .eq("product_id", product.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    // PGRST116: No rows found, not an error for our case
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

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { CartProduct } from "@/types/products";
import { createClient } from "@/utils/supabase/clients";
import { toast } from "react-toastify";

export const updateQuantity = async (
    productName: string,
    id: number,
    newQty: number,
    setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>
  ) => {
    const supabase = createClient();

    const { error } = await supabase
      .from("cart")
      .update({ quantity: newQty })
      .eq("id", id)
      .eq("product_name", productName);


    if (error) {
      console.log(error);
      toast.error("Failed to update quantity ❌", {
        position: "top-center",
        autoClose: 2300,
      });
    } else {
      toast.success("Quantity updated successfully", {
        position: "top-center",
        autoClose: 2300,
      });
    }
    setCartProducts((prev) => {
      const updatedCart = prev.map((item) => {
        if (item.id === id && item.product_name === productName) {
          return { ...item, quantity: newQty };
        }
        return item;
      });
      return updatedCart;
    });
  };
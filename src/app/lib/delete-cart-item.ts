import { CartProduct } from "@/types/products";
import { supabase } from "@/utils/supabase/clients";
import { toast } from "react-toastify";

export const handleDeleteItemCart = async (itemId: number, productName: string, setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>) => {

  const { error } = await supabase.from("cart").delete().eq("id", itemId);

  if (error) {
    console.log(error);
    toast.error("Failed to delete item ❌", {
      position: "top-center",
      autoClose: 2300,
    });
  } else {
    toast.success("Deleted successfully", {
      position: "top-center",
      autoClose: 2300,
    });
  }

  setCartProducts((prev) => prev.filter((item) => item.id !== itemId && item.product_name !== productName));
};

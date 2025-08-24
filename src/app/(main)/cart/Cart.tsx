"use client";

import { useEffect, useState } from "react";
import { CartProduct, Hoodie } from "@/types/products";
import Link from "next/link";
import { Result, Button } from "antd";
import CartSkeleton from "@/app/components/CartSkeleton";
import { toast } from "react-toastify";
import CartOrderSummary from "@/app/components/CartOrderSummary";
import Sidebar from "@/app/components/Sidebar";
import CartItem from "@/app/components/CartItem";
import SidebarSkeleton from "@/app/components/SidebarSkeleton";
import { createClient } from "@/utils/supabase/clients";

const CartPage = () => {
  const supabase = createClient();
  const handleDeleteItemCart = async (itemId: number) => {
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
      setCart((prev) => prev.filter((item) => item.id !== itemId));
    }
  };
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [hoodies, setHoodies] = useState<Hoodie[]>([]);
  const [loading, setLoading] = useState(true);

  const totalPrice = cart.reduce(
    (total, cart) =>
      total +
      (cart.price - (cart.price * cart.discount_percent) / 100) * cart.quantity,
    0
  );
  const youSave =
    cart.reduce((total, cart) => total + cart.price * cart.quantity, 0) -
    totalPrice;

  // Fetch hoodies (for stock quantity)
  useEffect(() => {
    const fetchHoodies = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("hoodies").select("*");
      if (!error && data) {
        setHoodies(data);
      }
      setLoading(false);
    };
    fetchHoodies();
  }, []);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const user_id = userData?.user?.id;
      if (!user_id) return;

      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user_id);

      if (!error && data) setCart(data);
      setLoading(false);
    };
    fetchCart();
  }, []);

  // Update quantity in cart (both state + supabase)
  const updateQuantity = async (item: CartProduct, newQty: number) => {
    if (newQty < 1) return;

    // find stock limit
    const hoodie = hoodies.find((h) => h.id === item.product_id);
    if (hoodie && newQty > hoodie.quantity) return;

    // update in supabase
    await supabase.from("cart").update({ quantity: newQty }).eq("id", item.id);

    // update locally
    setCart((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, quantity: newQty } : c))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
          <div className="hidden md:block sticky top-0 h-screen w-64 bg-white border-r">
            <SidebarSkeleton />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <h1 className="text-center uppercase text-5xl font-bold my-4">
              Shopping Cart
            </h1>
            <CartSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block sticky top-0 h-screen w-64 bg-white border-r">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center">
          {/* Page Title */}
          <h1 className="text-center uppercase text-4xl md:text-5xl font-bold my-4">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="w-full flex justify-center">
              <Result
                status="404"
                title="Your Cart is Empty"
                subTitle="Looks like you haven't added anything yet. Start shopping now!"
                extra={
                  <Link href="/hoodies" className="!text-white !bg-black !border px-5 py-3 rounded-xl hover:!bg-white hover:!text-black transition duration-300 ">
                    Browse Collection
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="flex flex-col px-10 lg:flex-row gap-10 w-full max-w-7xl">
              {/* Cart Items */}
              <div className="flex-1 space-y-6">
                {cart.map((item) => {
                  const discountedPrice = Math.round(
                    item.price * (1 - item.discount_percent / 100)
                  );
                  const hoodie = hoodies.find((h) => h.id === item.product_id);

                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      discountedPrice={discountedPrice}
                      updateQuantity={updateQuantity}
                      handleDeleteItemCart={handleDeleteItemCart}
                      hoodie={hoodie}
                    />
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <CartOrderSummary totalPrice={totalPrice} youSave={youSave} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

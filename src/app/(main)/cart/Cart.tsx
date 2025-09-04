"use client";

import { useEffect, useState } from "react";
import { CartProduct } from "@/types/products";
import Link from "next/link";
import { Result } from "antd";
import CartSkeleton from "@/app/components/CartSkeleton";
import CartOrderSummary from "@/app/components/CartOrderSummary";
import Sidebar from "@/app/components/Sidebar";
import CartItem from "@/app/components/CartItem";
import SidebarSkeleton from "@/app/components/SidebarSkeleton";
import { supabase } from "@/utils/supabase/clients";
import { useUser } from "@/app/context/UserContext";

const CartPage = () => {
  const { user, loading: userLoading } = useUser();
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartLoading, setCartLoading] = useState(true);

  const totalPrice = cartProducts.reduce(
    (total, cart) =>
      total +
      (cart.price - (cart.price * cart.discount_percent) / 100) * cart.quantity,
    0
  );
  const youSave =
    cartProducts.reduce(
      (total, cart) => total + cart.price * cart.quantity,
      0
    ) - totalPrice;

  useEffect(() => {
    // Wait for user context to finish loading before proceeding
    if (userLoading) {
      return;
    }

    setCartLoading(true);
    const user_id = user?.id;

    if (!user_id) {
      setCartProducts([]);
      setCartLoading(false);
      return;
    }

    // Set up a real-time subscription to the 'cart' table
    const channel = supabase
      .channel("cart_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart",
          filter: `user_id=eq.${user_id}`,
        },
        async (payload) => {
          console.log("Change received!", payload);
          // Re-fetch the cart data to ensure consistency after any change
          const { data, error } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", user_id);

          if (!error && data) {
            setCartProducts(data);
          } else {
            console.error("Error fetching updated cart:", error);
          }
        }
      )
      .subscribe();

    // Fetch the initial data and then let the subscription handle updates
    const fetchInitialCart = async () => {
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user_id);

      if (!error && data) {
        setCartProducts(data);
      } else {
        console.error("Error fetching initial cart:", error);
      }
      setCartLoading(false);
    };

    fetchInitialCart();

    // Clean up the subscription when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, [user, userLoading]);

  if (userLoading || cartLoading) {
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
        <div className="hidden md:block sticky top-0 h-screen w-64 bg-white border-r">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-center uppercase text-4xl md:text-5xl font-bold my-4">
            Shopping Cart
          </h1>

          {cartProducts.length === 0 ? (
            <div className="w-full flex justify-center">
              <Result
                status="404"
                title="Your Cart is Empty"
                subTitle="Looks like you haven't added anything yet. Start shopping now!"
                extra={
                  <Link
                    href="/hoodies"
                    className="!text-white !bg-black !border px-5 py-3 rounded-xl hover:!bg-white hover:!text-black transition duration-300 "
                  >
                    Browse Collection
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="flex flex-col px-10 lg:flex-row gap-10 w-full max-w-7xl">
              {/* Cart Items */}
              <div className="flex-1 space-y-6">
                {cartProducts.map((item) => {
                  return <CartItem key={item.product_name + item.id} item={item} setCartProducts={setCartProducts} />;
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

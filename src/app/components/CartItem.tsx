"use client";

import { CartProduct } from "@/types/products";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { deleteCartItem } from "@/app/lib/delete-cart-item";
import { updateQuantity } from "@/app/lib/update-item-quantity";

interface CartItemProps {
  item: CartProduct;
  setCartProducts: React.Dispatch<React.SetStateAction<CartProduct[]>>;
}

const CartItem = ({ item, setCartProducts }: CartItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const discountedPrice = item.discount_percent
    ? Math.round(item.price * (1 - item.discount_percent / 100))
    : item.price;

  const handleDeleteCartItem = useCallback(async (id: string) => {
    if (isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      const result = await deleteCartItem(id);
      if (result.success) {
        toast.success("Item deleted successfully", {
          position: "top-center",
          autoClose: 2300,
        });
      } else {
        // Revert optimistic update on failure
        setCartProducts(prev => {
          const exists = prev.find(p => p.id === item.id);
          if (!exists) {
            return [...prev, item].sort((a, b) => a.id.localeCompare(b.id));
          }
          return prev;
        });
        
        toast.error(result.message || "Failed to delete item", {
          position: "top-center",
          autoClose: 2300,
        });
      }
    } catch (error) {
      // Revert optimistic update on network error
      setCartProducts(prev => {
        const exists = prev.find(p => p.id === item.id);
        if (!exists) {
          return [...prev, item].sort((a, b) => a.id.localeCompare(b.id));
        }
        return prev;
      });
      
      toast.error(`Network error occurred ${error}`, {
        position: "top-center",
        autoClose: 2300,
      });
    } finally {
      setIsDeleting(false);
    }
  }, [item, isDeleting, setCartProducts]);

  const handleUpdateQuantity = useCallback(async (id: string, newQuantity: number) => {
    if (isUpdating || newQuantity < 1 || newQuantity > item.maxQuantity) return;
    
    setIsUpdating(true);
    
    const originalQuantity = item.quantity;
    
    // Optimistic update
    setCartProducts(prev => 
      prev.map(cartItem => 
        cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem
      )
    );

    try {
      const result = await updateQuantity(id, newQuantity);
      
      if (result.success) {
        toast.success("Quantity updated successfully", {
          position: "top-center",
          autoClose: 1500,
        });
      } else {
        setCartProducts(prev => 
          prev.map(cartItem => 
            cartItem.id === id ? { ...cartItem, quantity: originalQuantity } : cartItem
          )
        );
        console.log("error update: ", result);
        
        toast.error(result.message || "Failed to update quantity", {
          position: "top-center",
          autoClose: 2300,
        });
      }
    } catch (error) {
      setCartProducts(prev => 
        prev.map(cartItem => 
          cartItem.id === id ? { ...cartItem, quantity: originalQuantity } : cartItem
        )
      );
      
      toast.error(`Network error occurred: ${error}`, {
        position: "top-center",
        autoClose: 2300,
      });
    } finally {
      setIsUpdating(false);
    }
  }, [item.quantity, item.maxQuantity, isUpdating, setCartProducts]);

  const canDecrease = item.quantity > 1 && !isUpdating;
  const canIncrease = item.quantity < item.maxQuantity && !isUpdating;

  return (
    <div className="bg-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center border rounded-xl shadow-sm gap-4 transition-opacity duration-200">
      <div className="flex flex-col flex-1">
        <div className="text-xl md:text-2xl font-bold uppercase">
          {item.product_name}
        </div>

        <div className="flex gap-4 text-lg mt-1">
          <span className="font-semibold">{discountedPrice}₸</span>
          {discountedPrice !== item.price && (
            <span className="line-through text-red-500">
              {item.price}₸
            </span>
          )}
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Size:</span> {item.size}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Color:</span> {item.color}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            aria-label={`Decrease quantity of ${item.product_name}`}
            className="bg-white text-black border px-2 py-1 rounded hover:bg-black hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            disabled={!canDecrease}
          >
            <MinusOutlined />
          </button>
          
          <span className="px-3 font-semibold min-w-[3rem] text-center">
            {item.quantity}
          </span>
          
          <button
            aria-label={`Increase quantity of ${item.product_name}`}
            className="bg-white text-black border px-2 py-1 rounded hover:bg-black hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black"
            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            disabled={!canIncrease}
          >
            <PlusOutlined />
          </button>
        </div>

        {/* Stock indicator */}
        {item.quantity >= item.maxQuantity && (
          <div className="text-xs text-orange-600 mt-1">
            Max quantity reached
          </div>
        )}

        {/* Delete Button */}
        <button
          aria-label={`Remove ${item.product_name} from cart`}
          className="mt-4 flex items-center gap-2 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed self-start"
          onClick={() => handleDeleteCartItem(item.id)}
          disabled={isDeleting}
        >
          <MdDelete className={isDeleting ? "animate-spin" : ""} />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={item.image_url}
          alt={`${item.color} ${item.product_name}`}
          width={120}
          height={120}
          className="object-contain rounded-md"
          priority={false}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CartItem;
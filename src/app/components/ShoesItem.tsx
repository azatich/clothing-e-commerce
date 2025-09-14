import Image from "next/image";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { handleDecrement, handleIncrement } from "@/app/lib/manageQuantity";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Shoe } from "@/types/products";
import { addToCartShoe } from "../lib/add-to-cart";
import { useRouter } from "next/navigation";

const ShoesItem = ({ shoe }: { shoe: Shoe }) => {
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<number, number>
  >({});
  const selectedQty = selectedQuantities[shoe.id] || 1;
  const router = useRouter();

  const discountedPrice = shoe.discount_percent
    ? Math.round(shoe.price * (1 - shoe.discount_percent / 100))
    : shoe.price;

  const handleAddToCart = async () => {
    const result = await addToCartShoe(shoe.id, selectedQty);
    if (result.success) {
      toast.success("Shoe added to cart!");
    } else {
      if (result.error === "Please log in to add items to cart") {
        toast.error("Please log in to add items to cart");
        router.push("/login");
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <div
      key={shoe.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className="bg-gray-200 flex justify-center items-center h-64 w-full">
        <Image
          src={shoe.image_url}
          alt="shoe"
          width={250}
          height={400}
          className="object-contain h-full w-auto"
        />
      </div>
      <div className="px-6 py-4 flex-1 flex flex-col justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-black mb-2 capitalize">
            {shoe.name}
          </h2>
          <p className="text-gray-600 mb-2">
            Size: <span className="font-semibold text-black">{shoe.size}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Quantity in stock:{" "}
            <span className="font-semibold text-black">{shoe.quantity}</span>
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold text-black">
              ₸{discountedPrice}
            </span>
            {shoe.discount_percent > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ₸{shoe.price}
              </span>
            )}
            {shoe.discount_percent > 0 && (
              <span className="ml-2 px-2 py-1 bg-black text-white text-xs rounded">
                -{shoe.discount_percent}%
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <button
                className="bg-white text-black border px-2 rounded hover:bg-black hover:text-white transition duration-300"
                onClick={() => handleDecrement(shoe, setSelectedQuantities)}
                disabled={selectedQty <= 1}
              >
                <MinusOutlined />
              </button>
              <span className="font-semibold text-black px-2">
                {selectedQty}
              </span>
              <button
                className={`bg-white text-black border px-2 rounded hover:bg-black hover:text-white transition duration-300 ${selectedQty >= shoe.quantity
                  ? "opacity-50 cursor-not-allowed"
                  : ""
                  }`}
                onClick={() => handleIncrement(shoe, setSelectedQuantities)}
                disabled={selectedQty >= shoe.quantity}
              >
                <PlusOutlined />
              </button>
            </div>
          </div>
        </div>
        <button
          className="bg-black text-white border px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors duration-300"
          onClick={() => handleAddToCart()}
        >
          Add to
          <ShoppingCartOutlined />
        </button>
      </div>
    </div>
  );
};

export default ShoesItem;

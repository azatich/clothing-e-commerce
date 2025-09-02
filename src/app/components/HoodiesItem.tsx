import Image from "next/image";
import {
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { handleDecrement, handleIncrement } from "@/app/lib/manageQuantity";

import React, { useState } from "react";
import { Hoodie } from "@/types/products";
import { addToCartHoodie } from "../lib/add-to-cart";
import { toast } from "react-toastify";

const HoodiesItem = ({
  hoodie,
  discountedPrice,
}: {
  hoodie: Hoodie;
  discountedPrice: number;
}) => {
  const [selectedQuantities, setSelectedQuantities] = useState<
    Record<number, number>
  >({});
  const selectedQty = selectedQuantities[hoodie.id] || 1;

  const handleAddToCart = async () => {
    const result = await addToCartHoodie(hoodie.id, selectedQty);
    if (result.success) {
      toast.success("Hoodie added to cart!");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div
      key={hoodie.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className="bg-gray-200 flex justify-center items-center h-64">
        <Image
          src={hoodie.image_url}
          alt={hoodie.color + " hoodie"}
          width={150}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold text-black mb-2 capitalize">
          {hoodie.color} Hoodie
        </h2>
        <p className="text-gray-600 mb-2">
          Size: <span className="font-semibold text-black">{hoodie.size}</span>
        </p>
        <p className="text-gray-600 mb-2">
          Quantity in stock:{" "}
          <span className="font-semibold text-black">{hoodie.quantity}</span>
        </p>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-black">
            ₸{discountedPrice}
          </span>
          {hoodie.discount_percent > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ₸{hoodie.price}
            </span>
          )}
          {hoodie.discount_percent > 0 && (
            <span className="ml-2 px-2 py-1 bg-black text-white text-xs rounded">
              -{hoodie.discount_percent}%
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <button
              className="bg-white text-black border px-2 rounded hover:bg-black hover:text-white transition duration-300"
              onClick={() => handleDecrement(hoodie, setSelectedQuantities)}
              disabled={selectedQty <= 1}
            >
              <MinusOutlined />
            </button>
            <span className="font-semibold text-black px-2">{selectedQty}</span>
            <button
              className={`bg-white text-black border px-2 rounded hover:bg-black hover:text-white transition duration-300 ${
                selectedQty >= hoodie.quantity
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleIncrement(hoodie, setSelectedQuantities)}
              disabled={selectedQty >= hoodie.quantity}
            >
              <PlusOutlined />
            </button>
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
    </div>
  );
};

export default HoodiesItem;

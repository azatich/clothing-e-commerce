import { CartProduct, Hoodie } from "@/types/products";
import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const CartItem = ({
  item,
  discountedPrice,
  updateQuantity,
  handleDeleteItemCart,
  hoodie,
}: {
  item: CartProduct;
  discountedPrice: number;
  updateQuantity: (item: CartProduct, qty: number) => void;
  handleDeleteItemCart: (id: number) => void;
  hoodie?: Hoodie;
}) => {
  return (
    <div
      key={item.id}
      className="bg-white p-6 flex justify-between items-center border rounded-xl shadow-sm"
    >
      <div className="flex flex-col">
        <div className="text-xl md:text-2xl font-bold uppercase">
          {item.color} Hoodie
        </div>

        <div className="flex gap-4 text-lg mt-1">
          <span className="font-semibold">{discountedPrice}₸</span>
          <span className="line-through text-red-500">{item.price}₸</span>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <span className="font-semibold">Size</span> | {item.size}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Color</span> | {item.color}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            className="bg-white text-black border px-2 rounded hover:bg-black hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => updateQuantity(item, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <MinusOutlined />
          </button>
          <span className="px-3 font-semibold">{item.quantity}</span>
          <button
            className="bg-white text-black border px-2 rounded hover:bg-black hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => updateQuantity(item, item.quantity + 1)}
            disabled={hoodie ? item.quantity >= hoodie.quantity : false}
          >
            <PlusOutlined />
          </button>
        </div>

        {/* Delete Button */}
        <button
          className="mt-4 flex items-center gap-2 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-900 text-white transition duration-300"
          onClick={() => handleDeleteItemCart(item.id)}
        >
          <MdDelete /> Delete
        </button>
      </div>

      {/* Product Image */}
      <Image
        src={item.image_url}
        alt={item.color + " hoodie"}
        width={120}
        height={120}
        className="object-contain rounded-md"
      />
    </div>
  );
};

export default CartItem;

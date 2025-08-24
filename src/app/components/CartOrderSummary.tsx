import React from "react";

const CartOrderSummary = ({
  totalPrice,
  youSave,
}: {
  totalPrice: number;
  youSave: number;
}) => {
  return (
    <div className=" bg-white shadow-md rounded-xl overflow-hidden border">
      {/* Header */}
      <h1 className="text-center uppercase text-2xl font-bold py-5 border-b bg-gray-50">
        Order Summary
      </h1>

      {/* Details */}
      <div className="divide-y">
        <div className="flex justify-between py-3 px-6">
          <span className="font-bold uppercase">Subtotal</span>
          <span>{totalPrice}₸</span>
        </div>
        <div className="flex justify-between py-3 px-6 text-green-600">
          <span className="font-bold uppercase">You save</span>
          <span>-{youSave}₸</span>
        </div>
        <div className="flex justify-between py-3 px-6">
          <span className="font-bold uppercase">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between py-3 px-6">
          <span className="font-bold uppercase">Postage</span>
          <span>1000₸</span>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between py-4 px-6 font-bold text-xl border-t">
        <span className="uppercase">Total</span>
        <span>{totalPrice + 1000}₸</span>
      </div>

      {/* Checkout Button */}
      <div className="p-6">
        <button className="w-full bg-black text-white border py-3 rounded-lg uppercase font-semibold hover:bg-white hover:text-black transition duration-300">
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CartOrderSummary;

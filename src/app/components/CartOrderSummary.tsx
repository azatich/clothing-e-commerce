import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";
import convertToSubcurrency from "../lib/convertToSubcurrency";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("Next public stripe public key is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

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

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(totalPrice),
          currency: "kzt",
        }}
      >
        <CheckoutPage amount={totalPrice + 1000} />
      </Elements>
    </div>
  );
};

export default CartOrderSummary;

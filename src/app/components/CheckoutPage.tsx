"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://futuristic-e-commerce.netlify.app/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("API request failed");
      return res.json();
    })
    .then((data) => setClientSecret(data.clientSecret))
    .catch((err) => {
      console.error("PaymentIntent fetch error:", err);
      setErrorMessage("Failed to connect to server.");
    });
}, [amount]);


  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center py-3">
        <div
          role="status"
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
        >
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      {clientSecret && <PaymentElement />}
      <button
        disabled={!stripe || loading}
        className="mt-4 w-full bg-black text-white border py-3 rounded-lg uppercase font-semibold hover:bg-white hover:text-black transition duration-300"
      >
        {loading ? "Processing..." : `Pay ${amount}₸`}
      </button>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </form>
  );
};

export default CheckoutPage;

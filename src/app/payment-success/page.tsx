// app/payment-success/page.tsx

import Link from "next/link";

export default function PaymentSuccess({
  searchParams,
}: {
  searchParams?: { amount?: string | string[] };
}) {
  const amount =
    typeof searchParams?.amount === "string"
      ? searchParams.amount
      : Array.isArray(searchParams?.amount)
      ? searchParams.amount[0]
      : "0";

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-lg w-full text-center rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-10 animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent drop-shadow-lg">
            Thank You
          </h1>
          <h2 className="text-xl mt-3 text-gray-300">
            Your payment was processed successfully
          </h2>
        </div>

        <div className="bg-gradient-to-r from-gray-100 to-white text-black py-4 rounded-xl shadow-inner text-4xl font-bold tracking-wider">
          {amount}₸
        </div>

        <Link
          href="/"
          className="inline-block bg-white mt-3 text-black px-4 py-2 rounded-xl hover:bg-gray-900 hover:text-white transition duration-300"
        >
          Go to Products
        </Link>
      </div>
    </main>
  );
}

"use client";

import React from "react";

const CartSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:px-48 animate-pulse">
      {/* Left side: Cart items */}
      <div className="w-full lg:w-2/3 grid gap-6 grid-cols-1">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white p-6 flex justify-between border rounded-lg"
          >
            <div className="flex flex-col gap-3">
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
              <div className="flex gap-4">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="flex gap-2 mt-2 items-center">
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-10 bg-gray-200 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            <div className="h-24 w-24 bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>

      {/* Right side: Order summary */}
      <div className="w-full lg:w-1/3">
        <div className="text-center py-5 border rounded-t-lg bg-white">
          <div className="h-6 w-40 bg-gray-200 mx-auto rounded"></div>
        </div>
        <div className="border-t border-b bg-white divide-y">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex justify-between py-3 px-6"
            >
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between py-3 px-6 border-b bg-white">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white border-t">
          <div className="h-12 w-full bg-gray-200 rounded-b-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;

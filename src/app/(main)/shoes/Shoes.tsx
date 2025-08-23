"use client";

import React, { useRef } from "react";
import { Button, Spin } from "antd";
import { GiConverseShoe } from "react-icons/gi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const Shoes = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4"
    >
      {/* Icon */}
      <GiConverseShoe className="text-6xl text-gray-700 mb-6" />

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Shoes Section
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg mb-6">
        This page is currently under development 🚧
      </p>

      {/* Loader */}
      <Spin size="large" className="!" />

      <Button
        size="large"
        className="mt-8 rounded-lg px-6 py-2 font-semibold !hover:outline-none !bg-black !text-white !border hover:!bg-white hover:!text-black hover:!border-black transition-colors duration-300"
        onClick={() => router.push("/hoodies")}
      >
        Go to Other Products
      </Button>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-6">
        Available soon. Stay tuned! ✨
      </p>
    </div>
  );
};

export default Shoes;

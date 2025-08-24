"use client";

import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute top-0 left-0 h-screen w-px bg-black" />
      <div className="flex flex-col h-full gap-10 text-black px-5 pt-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 animate-pulse"
          >
            <div className="w-7 h-7 bg-gray-300 rounded-full" />
            <div className="w-28 h-5 bg-gray-300 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;

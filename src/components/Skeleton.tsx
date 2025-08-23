import React from "react";

const Skeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col animate-pulse">
      <div className="bg-gray-200 flex justify-center items-center h-64">
        <div className="w-32 h-32 bg-gray-300 rounded" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="h-6 bg-gray-300 rounded mb-4 w-2/3" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2" />
        <div className="h-4 bg-gray-200 rounded mb-2 w-1/3" />
        <div className="flex items-center gap-2 mb-2">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-10" />
        </div>
        <div className="mt-auto flex items-center gap-2">
          <div className="h-10 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

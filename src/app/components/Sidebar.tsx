"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiHoodieLight } from "react-icons/pi";
import { GiConverseShoe, GiSchoolBag } from "react-icons/gi";
import { PiWatch } from "react-icons/pi";
import { IoHelpCircleOutline } from "react-icons/io5";

const links = [
  { href: "/hoodies", label: "Hoodies", icon: <PiHoodieLight /> },
  { href: "/shoes", label: "Shoes", icon: <GiConverseShoe /> },
  { href: "/bags", label: "Bags", icon: <GiSchoolBag /> },
  { href: "/accessories", label: "Accessories", icon: <PiWatch /> },
  { href: "/support", label: "Support", icon: <IoHelpCircleOutline /> },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block relative h-screen">
        <div className="absolute top-0 left-0 h-screen w-px bg-black" />
        <div className="flex flex-col h-full gap-10 text-black px-5 pt-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex gap-3 items-center uppercase hover:bg-black hover:text-white rounded-xl px-4 py-2 text-start transition duration-300 ${
                pathname === link.href ? "bg-black text-white" : ""
              }`}
            >
              <span className="text-2xl">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-stretch">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center py-3 px-2 flex-1 min-w-0 transition-all duration-200 ${
                pathname === link.href
                  ? "text-black bg-gray-100 border-t-2 border-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="text-xl mb-1">{link.icon}</span>
              <span className="text-xs font-medium truncate max-w-full">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
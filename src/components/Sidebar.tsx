"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { PiHoodieLight } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { GiSchoolBag } from "react-icons/gi";
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
    <div className="relative h-screen">
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
  );
};

export default Sidebar;

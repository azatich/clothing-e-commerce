"use client";

import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/app/lib/supabaseClient";
import { MdOutlineLogin } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/hoodies", label: "Products" },
  { href: "/story", label: "Story" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/packaging", label: "Packaging" },
];

const Navbar = () => {
  const { username } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        console.log(data);
      } else {
        console.log("User is not logged in");
      }
    };
    checkUser();
  }, []);

  return (
    <nav className="flex items-center justify-between px-12 py-4 border-b">
      <div className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={160}
          height={160}
          className="w-40 h-auto"
        />
      </div>

      <div className="flex gap-10 text-black">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${pathname === link.href ? "active" : ""} navbar-link`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div>
        {username ? (
          <div className="flex gap-4 items-center justify-center">
            <Link
              href="/cart"
              className="hover:bg-black hover:text-white px-4 py-2 rounded-xl transition duration-300"
            >
              <FaShoppingCart />
            </Link>
            <p className="uppercase font-semibold">{username}</p>
            <button className="hover:bg-black hover:text-white px-4 py-2 rounded-xl transition duration-300">
              <MdOutlineLogin />
            </button>
          </div> 
        ) : (
          <Link
            href="/login"
            className="px-5 py-2 bg-black-600 text-white bg-black rounded-xl hover:bg-white hover:text-black hover:border transition-colors duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

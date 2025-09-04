"use client";

import { useUser } from "@/app/context/UserContext";
import { MdOutlineLogin } from "react-icons/md";
import { FaShoppingCart, FaTshirt } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { GiClothes, GiBookCover } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { supabase } from "@/utils/supabase/clients";

const links = [
  { href: "/", label: "Home", icon: <AiFillHome className="text-xl" /> },
  {
    href: "/hoodies",
    label: "Products",
    icon: <FaTshirt className="text-xl" />,
  },
  { href: "/story", label: "Story", icon: <GiBookCover className="text-xl" /> },
  {
    href: "/manufacturing",
    label: "Manufacturing",
    icon: <GiClothes className="text-xl" />,
  },
];

export default function Navbar() {
  const { user, username, loading } = useUser();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      setMenuOpen(false);
      router.push("/");
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white relative lg:px-12">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={160}
          height={160}
          className="w-32 h-auto lg:w-40"
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex gap-8 text-black items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href
                ? "font-semibold text-black"
                : "text-gray-600"
            } hover:text-black transition`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop User Section */}
      <div className="hidden lg:flex items-center gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <Link
              href="/cart"
              className="hover:bg-black hover:text-white px-3 py-2 rounded-xl transition"
            >
              <FaShoppingCart />
            </Link>
            <Link
              href="/profile"
              className="hover:bg-white hover:text-black bg-black border text-white px-3 py-2 rounded-xl transition flex items-center gap-2"
            >
              <IoPersonOutline />
              <p className="uppercase font-semibold">{username}</p>
            </Link>
            <button
              onClick={handleLogOut}
              className="hover:bg-black hover:text-white px-3 py-2 rounded-xl transition"
            >
              <MdOutlineLogin />
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2 bg-black text-white rounded-xl hover:bg-white hover:text-black hover:border transition"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-end mb-8">
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <FiX size={28} />
            </button>
          </div>

          <div className="flex flex-col gap-6 flex-grow">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 text-lg ${
                  pathname === link.href
                    ? "font-semibold text-black"
                    : "text-gray-600"
                } hover:text-black transition`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            <div className="mt-auto pb-8">
              {loading ? (
                <p>Loading...</p>
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <FaShoppingCart className="text-xl" />
                    <Link href="/cart" className="text-lg">
                      Cart
                    </Link>
                  </div>
                  <div className="mb-4">
                    <p className="uppercase font-semibold text-gray-600">
                      Logged in as:
                    </p>
                    <p className="uppercase font-semibold">{username}</p>
                  </div>
                  <button
                    onClick={handleLogOut}
                    className="w-full px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2"
                  >
                    <MdOutlineLogin className="text-xl" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="w-full block text-center px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

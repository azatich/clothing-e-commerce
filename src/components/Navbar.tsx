"use client";

import { useUser } from "@/app/context/UserContext";
import { supabase } from "@/app/lib/supabaseClient";
import { MdOutlineLogin, MdMenu, MdClose } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 border-b bg-white">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={160}
          height={160}
          className="w-24 h-auto sm:w-32 lg:w-40"
        />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex gap-6 xl:gap-10 text-black">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`${
              pathname === link.href ? "active" : ""
            } navbar-link hover:text-white transition-colors duration-200`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop User Section */}
      <div className="hidden lg:block">
        {username ? (
          <div className="flex gap-3 xl:gap-4 items-center justify-center">
            <Link
              href="/cart"
              className="hover:bg-black hover:text-white px-3 py-2 rounded-xl transition duration-300"
            >
              <FaShoppingCart />
            </Link>
            <p className="uppercase font-semibold text-sm xl:text-base">{username}</p>
            <button className="hover:bg-black hover:text-white px-3 py-2 rounded-xl transition duration-300">
              <MdOutlineLogin />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-4 xl:px-5 py-2 bg-black text-white rounded-xl hover:bg-white hover:text-black hover:border border-transparent hover:border-black transition-all duration-300"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Button & User Actions */}
      <div className="lg:hidden flex items-center gap-3">
        {username && (
          <Link
            href="/cart"
            className="hover:bg-black hover:text-white px-2 py-2 rounded-lg transition duration-300"
          >
            <FaShoppingCart className="text-lg" />
          </Link>
        )}
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg hover:bg-gray-100 transition duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <MdClose className="text-2xl" />
          ) : (
            <MdMenu className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div 
            className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition duration-200"
                aria-label="Close mobile menu"
              >
                <MdClose className="text-xl" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`${
                    pathname === link.href 
                      ? "bg-gray-100 text-black font-semibold" 
                      : "text-gray-700 hover:bg-gray-50"
                  } px-6 py-3 transition-colors duration-200 border-l-4 ${
                    pathname === link.href ? "border-black" : "border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
              {username ? (
                <div className="space-y-3">
                  <p className="text-center uppercase font-semibold text-sm">
                    Welcome, {username}
                  </p>
                  <div className="flex justify-center gap-3">
                    <Link
                      href="/cart"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 hover:bg-black hover:text-white px-4 py-2 rounded-xl transition duration-300 bg-white border"
                    >
                      <FaShoppingCart />
                      <span>Cart</span>
                    </Link>
                    <button className="flex items-center gap-2 hover:bg-black hover:text-white px-4 py-2 rounded-xl transition duration-300 bg-white border">
                      <MdOutlineLogin />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-center px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-300"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
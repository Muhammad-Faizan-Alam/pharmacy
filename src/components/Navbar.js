"use client";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import NavbarMedicine from "./navbarmedicne";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-primary text-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            <div className="flex items-center">
              <img
                src="/asset/logo.png"
                alt="Logo"
                className="h-16 w-16 mr-2"
              />
              <span className="text-secondary">+</span>
              <span className="text-secondary">MediCare</span>
            </div>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search entire store here..."
              className="w-full py-2 px-4 border-2 border-secondary rounded-full text-gray-800 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-secondary rounded-r-full hover:bg-teal-800 transition">
              <FiSearch className="text-white" />
            </button>
          </div>
        </div>

        {/* User Auth */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="hidden md:flex items-center group hover:text-secondary transition"
          >
            <FiUser className="mr-1 text-secondary group-hover:font-bold" />
            <span className="font-semibold group-hover:font-bold text-secondary">Sign In</span>
          </Link>
          <button
            className="md:hidden text-secondary focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Desktop Category Navigation */}
      <div className="hidden md:block">
        <NavbarMedicine />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-800 absolute w-full z-10 shadow-lg">
          {/* Mobile Search */}
          <div className="p-4 border-b border-teal-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search entire store..."
                className="w-full py-2 border-2 px-4 rounded-full text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-teal-600 rounded-r-full hover:bg-teal-700 transition">
                <FiSearch className="text-white" />
              </button>
            </div>
          </div>

          {/* Mobile Categories - Using NavbarMedicine's mobile view */}
          <div className="p-4">
            <NavbarMedicine mobileView />
          </div>

          {/* Mobile Auth */}
          <div className="p-4 border-t border-teal-700">
            <Link
              href="/login"
              className="flex items-center justify-center py-2 px-4 bg-teal-600 rounded hover:bg-teal-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiUser className="mr-2" />
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
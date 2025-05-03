"use client";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiUser, FiMenu, FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const categories = [
    "Medicines",
    "Vitamins & Supplements",
    "Medicated Cosmetics",
    "Surgical & Support Braces",
    "Medical Devices",
    "Personal Care",
    "Skin Care",
  ];

  return (
    <header className="bg-teal-700 text-white shadow-md">
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
              <span className="text-teal-200">+</span>
              <span className="text-white">MediCare</span>
            </div>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search entire store here..."
              className="w-full py-2 px-4 border-2 rounded-full text-gray-800 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-teal-600 rounded-r-full hover:bg-teal-800 transition">
              <FiSearch className="text-white" />
            </button>
          </div>
        </div>

        {/* User Auth */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="hidden md:flex items-center hover:text-teal-200 transition"
          >
            <FiUser className="mr-1" />
            <span className="font-semibold">Sign In</span>
          </Link>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      <nav className="bg-teal-800 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex overflow-x-auto py-2 gap-3 justify-between hide-scrollbar">
            {categories.map((category, index) => (
              <li key={index} className="whitespace-nowrap">
                <Link
                  href={
                    category === "Medicines"
                      ? "/medicines"
                      : `/category/${category
                          .toLowerCase()
                          .replace(/ & /g, "-")
                          .replace(/ /g, "-")}`
                  }
                  className={`px-3 py-1 text-sm hover:bg-teal-700 rounded transition block ${
                    pathname === "/medicines" ? "bg-teal-700" : ""
                  }`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

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

          {/* Mobile Categories */}
          <ul className="py-2">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  href={
                    category === "Medicines"
                      ? "/medicines"
                      : `/category/${category
                          .toLowerCase()
                          .replace(/ & /g, "-")
                          .replace(/ /g, "-")}`
                  }
                  className="block px-6 py-3 hover:bg-teal-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>

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

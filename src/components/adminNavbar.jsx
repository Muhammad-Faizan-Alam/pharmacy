"use client";

import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="bg-[#343148FF]">
      <nav className="bg-[#D7C49EFF] py-3 text-white shadow-lg fixed top-0 z-50 w-full">
        <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto px-4 py-2">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/asset/logo.png"
              className="h-10 w-10 rounded-full"
              alt="Pharmacy Logo"
            />
            <span className="self-center text-2xl font-bold tracking-wide text-white">
              Saydaliyya
            </span>
          </Link>
          {/* Toggle for mobile */}
          <input
            id="admin-navbar-toggle"
            type="checkbox"
            className="hidden peer"
          />
          <label
            htmlFor="admin-navbar-toggle"
            className="sm:hidden cursor-pointer p-2"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          {/* Links */}
          <div className="w-full sm:w-auto flex-col sm:flex-row gap-2 sm:gap-4 mt-4 sm:mt-0 hidden peer-checked:flex sm:flex">
            <Link href="/Admin/mystore" className="block w-full sm:w-auto">
              <span className="block text-white hover:border-2 border-[#343148FF] font-bold bg-[#343148FF] px-6 py-3 rounded-2xl hover:text-gray-300 transition-colors duration-200 text-center">
                My Store
              </span>
            </Link>
            <Link href="/Admin/order" className="block w-full sm:w-auto">
              <span className="block text-white hover:border-2 border-[#343148FF] font-bold bg-[#343148FF] px-6 py-3 rounded-2xl hover:text-gray-300 transition-colors duration-200 text-center">
                Orders
              </span>
            </Link>
            <Link href="/store" className="block w-full sm:w-auto">
              <span className="block text-white hover:border-2 border-[#343148FF] font-bold bg-[#343148FF] px-6 py-3 rounded-2xl hover:text-gray-300 transition-colors duration-200 text-center">
                Store
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
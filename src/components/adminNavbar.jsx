"use client";

import Link from "next/link";
import { FiHome, FiBox, FiClipboard, FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50"
      style={{
        background: "rgba(52,49,72,0.92)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 24px 0 rgba(52,49,72,0.12)",
        borderBottom: "2px solid #D7C49E",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/asset/logo.png"
            className="h-12 w-12 rounded-full border-2 shadow-lg"
            style={{ borderColor: "#D7C49E" }}
            alt="Pharmacy Logo"
          />
          <span
            className="text-2xl font-extrabold tracking-wide drop-shadow"
            style={{ color: "#D7C49E", letterSpacing: "0.04em" }}
          >
            Saydaliyya Admin
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center gap-4">
          <NavLink
            href="/Admin/mystore"
            icon={<FiHome size={20} />}
            label="My Store"
          />
          <NavLink
            href="/Admin/order"
            icon={<FiClipboard size={20} />}
            label="Orders"
          />
          <NavLink
            href="/store"
            icon={<FiBox size={20} />}
            label="Store"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 rounded-lg transition hover:bg-[#D7C49E]/20"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <FiMenu size={28} className="text-[#D7C49E]" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="sm:hidden w-full bg-[#343148FF] border-t border-[#D7C49E] animate-fade-in-down"
          style={{
            background: "rgba(52,49,72,0.98)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            <NavLink
              href="/Admin/mystore"
              icon={<FiHome size={20} />}
              label="My Store"
              onClick={() => setMenuOpen(false)}
              mobile
            />
            <NavLink
              href="/Admin/order"
              icon={<FiClipboard size={20} />}
              label="Orders"
              onClick={() => setMenuOpen(false)}
              mobile
            />
            <NavLink
              href="/store"
              icon={<FiBox size={20} />}
              label="Store"
              onClick={() => setMenuOpen(false)}
              mobile
            />
          </div>
        </div>
      )}
    </header>
  );
}

// Reusable nav link component
function NavLink({ href, icon, label, onClick, mobile }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 font-bold px-5 py-2 rounded-2xl transition-all duration-200
        ${mobile
          ? "text-[#D7C49E] bg-[#343148FF] hover:bg-[#D7C49E] hover:text-[#343148FF] border border-[#D7C49E] mb-1"
          : "text-[#343148FF] bg-[#D7C49E] hover:bg-[#343148FF] hover:text-[#D7C49E] border-2 border-[#D7C49E]"
        }
        shadow group`}
      style={{
        boxShadow: mobile
          ? "0 2px 8px 0 rgba(215,196,158,0.08)"
          : "0 2px 8px 0 rgba(52,49,72,0.08)",
      }}
    >
      <span className="transition group-hover:scale-110">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
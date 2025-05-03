"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarMedicine = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const categories = [
    "Medicines",
    "Vitamins & Supplements",
    "Medicated Cosmetics",
    "Surgical & Support Braces",
    "Medical Devices",
    "Personal Care",
    "Skin Care",
  ];

  // Convert category to clean slug
  const getCategorySlug = (category: string) => {
    if (category === "Medicines") return "medicines";
    if (category === "Vitamins & Supplements") return "vitamins";
    if (category === "Medicated Cosmetics") return "cosmetics";
    if (category === "Surgical & Support Braces") return "Surgical";
    if (category === "Medical Devices") return "medicalDevices";
    if (category === "Personal Care") return "personalCare";
    if (category === "Skin Care") return "skinCare";
    return category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
  };

  const getCategoryLink = (category: string) => {
    return `/categories/${getCategorySlug(category)}`;
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="bg-teal-800 hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex overflow-x-auto py-2 justify-between hide-scrollbar">
            {categories.map((category, index) => {
              const slug = getCategorySlug(category);
              const link = getCategoryLink(category);
              const isActive = pathname?.startsWith(link);

              return (
                <li key={index} className="whitespace-nowrap">
                  <Link
                    href={link}
                    className={`px-3 py-1 text-sm hover:bg-teal-700 rounded transition block ${
                      isActive ? "bg-teal-700" : ""
                    }`}
                  >
                    {category}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-teal-800 text-white px-4 py-2 w-full text-left"
        >
          Categories
        </button>
        {isMenuOpen && (
          <ul className="bg-teal-700">
            {categories.map((category, index) => {
              const link = getCategoryLink(category);
              return (
                <li key={index}>
                  <Link
                    href={link}
                    className="block px-6 py-3 hover:bg-teal-600 transition text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavbarMedicine;

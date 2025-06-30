"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch, FiUser, FiMenu, FiX, FiShoppingCart, FiLoader } from "react-icons/fi";
import NavbarMedicine from "./navbarmedicne";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loadingLink, setLoadingLink] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [result, setResult] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = axios.post('/api/users/me')
      .then(response => {
        // Handle user data if needed
        console.log("User data:", response.data);
        setUser(response.data.data);
      })

    // Fetch cart count
    axios.get('/api/cart')
      .then(res => {
        const items = res.data?.data?.items || [];
        setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      })
      .catch(() => setCartCount(0));
  }, []);

  // Advanced search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    if (!searchQuery.trim()) return;
    if (toggle) {
      setResult("");
      console.log("searchedData", searchQuery);
      const body = {
        "symptomText": searchQuery
      }
      try {
        const res = await fetch("/api/symptom-search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (data.result) {
          setResult(data.result);
        } else {
          setResult("No suggestions found.");
        }
      } catch (error) {
        setResult("Error: " + error.message);
      }
      setSearchLoading(false);
    } else {
      // Simulate debounce and search
      setTimeout(() => {
        setSearchLoading(false);
        router.push(`/store/product?search=${encodeURIComponent(searchQuery.trim())}`);
      }, 600);
    }
  };

  // Loader wrapper for navigation links
  const handleNav = (href) => (e) => {
    e.preventDefault();
    setLoadingLink(href);
    router.push(href);
    setTimeout(() => setLoadingLink(""), 1200); // fallback in case of slow navigation
  };

  // Add this custom event listener for cart updates
  useEffect(() => {
    const handleCartUpdate = (e) => {
      // Optionally, e.detail can have the new count
      axios.get('/api/cart')
        .then(res => {
          const items = res.data?.data?.items || [];
          setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
        })
        .catch(() => setCartCount(0));
    };
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  useEffect(() => {
    if (result && toggle) setShowAIPopup(true);
    else setShowAIPopup(false);
  }, [result, toggle]);

  return (
    <header className="bg-primary text-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" onClick={handleNav("/")} className="text-xl font-bold">
            <div className="flex items-center">
              <img
                src="/asset/logo.png"
                alt="Logo"
                className="h-16 w-16 mr-2 rounded-full shadow-lg"
              />
              {/* <span className="text-secondary">+</span> */}
              <span className="text-secondary">Saydaliyya</span>
              {loadingLink === "/" && <FiLoader className="ml-2 animate-spin text-secondary" />}
            </div>
          </a>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 mx-8 max-w-xl bg-secondary rounded-full p-0.5">
          <div className="flex items-center gap-2 px-1">
            <span className={`font-semibold text-xs text-primary px-1 sm:text-sm rounded-md ${!toggle ? 'border border-primary' : 'border-none'}`}>Search</span>
            <button
              type="button"
              onClick={() => setToggle(t => !t)}
              className={`relative w-12 h-6 rounded-full border border-primary transition-colors duration-300 focus:outline-none ${toggle ? 'bg-secondary' : 'bg-primary'}`}
              aria-pressed={toggle}
              aria-label="Toggle AI Search"
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${toggle ? 'translate-x-6' : ''}`}
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              />
            </button>
            <span className={`font-semibold text-primary px-1 rounded-md text-xs sm:text-sm ${toggle ? 'border border-primary' : 'border-none'}`}>AI</span>
          </div>
          <form className="relative w-full" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search entire store here..."
              className="w-full py-2 px-4 bg-primary rounded-full text-gray-800 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={searchLoading}
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-secondary rounded-r-full hover:bg-teal-800 transition" disabled={searchLoading}>
              {searchLoading ? <FiLoader className="animate-spin text-white" /> : <FiSearch className="text-white" />}
            </button>
          </form>
        </div>

        {/* User Auth & Cart */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <a href="/store/cart" onClick={handleNav("/store/cart")}
            className="relative flex items-center group hover:text-secondary transition">
            <FiShoppingCart className="text-secondary group-hover:font-bold" size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
                {cartCount}
              </span>
            )}
            {loadingLink === "/store/cart" && <FiLoader className="ml-2 animate-spin text-secondary" />}
          </a>
          {/* Profile/User Icon */}
          <a
            href="/store/profile"
            onClick={handleNav("/store/profile")}
            className="hidden md:flex items-center group hover:text-secondary transition"
          >
            <FiUser className="mr-1 text-secondary group-hover:font-bold" />
            <span className="font-semibold group-hover:font-bold text-secondary">{user === null ? "user" : user.username}</span>
            {loadingLink === "/store/profile" && <FiLoader className="ml-2 animate-spin text-secondary" />}
          </a>
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
            <div className="flex items-center gap-2 m-5">
              <span className={`font-semibold text-xs sm:text-sm ${toggle ? 'text-teal-500' : 'text-primary'}`}>Search</span>
              <button
                type="button"
                onClick={() => setToggle(t => !t)}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${toggle ? 'bg-teal-500' : 'bg-primary'}`}
                aria-pressed={toggle}
                aria-label="Toggle AI Search"
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${toggle ? 'translate-x-6' : ''}`}
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                />
              </button>
              <span className="font-semibold text-xs sm:text-sm text-primary">AI</span>
            </div>
            <form className="relative" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search entire store..."
                className="w-full py-2 border-2 px-4 rounded-full text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={searchLoading}
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 bg-teal-600 rounded-r-full hover:bg-teal-700 transition" disabled={searchLoading}>
                {searchLoading ? <FiLoader className="animate-spin text-white" /> : <FiSearch className="text-white" />}
              </button>
            </form>
          </div>


          {/* Mobile Categories - Using NavbarMedicine's mobile view */}
          <div className="p-4">
            <NavbarMedicine mobileView />
          </div>

          {/* Mobile Auth */}
          <div className="p-4 border-t border-teal-700">
            <a
              href="/profile"
              onClick={handleNav("/profile")}
              className="flex items-center justify-center py-2 px-4 bg-teal-600 rounded hover:bg-teal-700 transition"
            >
              <FiUser className="mr-2" />
              {user === null ? "user" : user.username}
              {loadingLink === "/profile" && <FiLoader className="ml-2 animate-spin text-white" />}
            </a>
          </div>
        </div>
      )}
      {showAIPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
              onClick={() => setShowAIPopup(false)}
              aria-label="Close AI Result"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-teal-700 mb-2 flex items-center gap-2">
              <FiSearch className="inline-block text-teal-500" /> AI Result
            </h3>
            <div className="text-gray-700 whitespace-pre-line text-base min-h-[60px]">
              {result}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const DELIVERY_OPTIONS = [
  {
    value: "regular",
    label: "Regular Delivery",
    desc: "Delivered in 2-4 days by van",
    svg: (
      <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Van icon */}
        <rect x="2" y="18" width="40" height="16" rx="4" fill="#38bdf8" />
        <rect x="42" y="24" width="14" height="10" rx="2" fill="#0ea5e9" />
        <circle cx="14" cy="36" r="4" fill="#0f172a" />
        <circle cx="48" cy="34" r="4" fill="#0f172a" />
        <rect x="6" y="22" width="8" height="4" rx="2" fill="#bae6fd" />
        <rect x="30" y="24" width="8" height="4" rx="2" fill="#bae6fd" />
      </svg>
    ),
  },
  {
    value: "urgent",
    label: "Urgent Delivery",
    desc: "Delivered in 2-6 hours by drone",
    svg: (
      <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Drone icon */}
        <ellipse cx="30" cy="36" rx="18" ry="4" fill="#bae6fd" />
        {/* Drone body */}
        <rect x="22" y="18" width="16" height="8" rx="3" fill="#fbbf24" stroke="#f59e42" strokeWidth="1.5" />
        {/* Drone arms */}
        <rect x="16" y="21" width="10" height="2" rx="1" fill="#f59e42" />
        <rect x="34" y="21" width="10" height="2" rx="1" fill="#f59e42" />
        {/* Propellers */}
        <ellipse cx="16" cy="22" rx="3" ry="1.2" fill="#fbbf24" stroke="#f59e42" strokeWidth="0.7" />
        <ellipse cx="44" cy="22" rx="3" ry="1.2" fill="#fbbf24" stroke="#f59e42" strokeWidth="0.7" />
        {/* Camera */}
        <circle cx="30" cy="22" r="2" fill="#0f172a" />
        {/* Landing gear */}
        <rect x="25" y="26" width="2" height="5" rx="1" fill="#f59e42" />
        <rect x="33" y="26" width="2" height="5" rx="1" fill="#f59e42" />
      </svg>
    ),
  },
];

const initialForm = {
  address: "",
  city: "",
  postalCode: "",
  country: "",
  paymentMethod: "card",
  deliveryMethod: "regular",
};

export default function CheckoutPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [cart, setCart] = useState(null);
  const router = useRouter();

  React.useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/cart");
        setCart(res.data.data);
      } catch (err) {
        setCart(null);
      }
    };
    fetchCart();
  }, []);

  // If cart is not loaded yet, show loader
  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <span className="loader border-2 border-t-2 border-blue-200 border-t-blue-600 rounded-full w-10 h-10 animate-spin"></span>
      </div>
    );
  }

  // Calculate prices from cart
  const itemsPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingPrice = form.deliveryMethod === "urgent" ? 250 : 80;
  const taxPrice = 0.1 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const validate = () => {
    const newErrors = {};
    if (!form.address) newErrors.address = "Address is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.postalCode) newErrors.postalCode = "Postal code is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.paymentMethod) newErrors.paymentMethod = "Select a payment method";
    if (!form.deliveryMethod) newErrors.deliveryMethod = "Select a delivery method";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleDeliveryChange = (value) => {
    setForm({ ...form, deliveryMethod: value });
    setErrors({ ...errors, deliveryMethod: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSuccess(false);
    setOrderId(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderItems: cart.items.map((item) => ({
            product: item.product._id || item.product.id,
            name: item.product.name,
            image: item.product.img || item.product.imageUrl,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingAddress: {
            address: form.address,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
          paymentMethod: form.paymentMethod,
          paymentResult: {},
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          deliveryMethod: form.deliveryMethod,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setOrderId(data.data._id);
        // Optionally clear cart here
      } else {
        setErrors({ api: data.message || "Order failed" });
      }
    } catch (err) {
      setErrors({ api: err.message || "Order failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center py-6 px-2 md:px-0">
      <div className="w-full max-w-5xl bg-white/90 rounded-3xl shadow-2xl p-2 sm:p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 relative overflow-hidden">
        {/* Checkout Form */}
        <form className="flex-1 space-y-6 min-w-0" onSubmit={handleSubmit}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mb-2 tracking-tight drop-shadow">Checkout</h1>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">Complete your order and enjoy fast, secure delivery!</p>

          {/* Address Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="123 Main St"
              />
              {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Karachi"
              />
              {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Postal Code</label>
              <input
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="12345"
              />
              {errors.postalCode && <span className="text-red-500 text-xs">{errors.postalCode}</span>}
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.country ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-300`}
                placeholder="Pakistan"
              />
              {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Payment Method</label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={form.paymentMethod === "card"}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                <span className="font-medium">Credit/Debit Card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={form.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="accent-green-600"
                />
                <span className="font-medium">Cash on Delivery</span>
              </label>
            </div>
            {errors.paymentMethod && <span className="text-red-500 text-xs">{errors.paymentMethod}</span>}
          </div>

          {/* Delivery Method */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Delivery Method</label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 flex-wrap">
              {DELIVERY_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handleDeliveryChange(opt.value)}
                  className={`group relative flex flex-col items-center border-2 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 transition-all shadow-md hover:shadow-xl focus:outline-none ${form.deliveryMethod === opt.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <span className="mb-2">{opt.svg}</span>
                  <span className="font-bold text-blue-900 text-base sm:text-lg">{opt.label}</span>
                  <span className="text-xs text-gray-500">{opt.desc}</span>
                  {form.deliveryMethod === opt.value && (
                    <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full shadow">Selected</span>
                  )}
                </button>
              ))}
            </div>
            {errors.deliveryMethod && <span className="text-red-500 text-xs">{errors.deliveryMethod}</span>}
          </div>

          {/* API Error */}
          {errors.api && <div className="text-red-600 font-semibold text-center mt-2">{errors.api}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold text-base sm:text-lg shadow-lg hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          {/* Success Message */}
          {success && (
            <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-xl text-green-800 text-center text-base sm:text-lg font-semibold shadow">
              Order placed successfully!<br />
              <span className="text-xs sm:text-sm text-gray-600">Order ID: {orderId}</span>
              <br />
              <button
                type="button"
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => router.push("/store/profile")}
                tabIndex={0}
              >
                View Orders
              </button>
            </div>
          )}
        </form>

        {/* Cart Summary */}
        <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 min-w-0 max-w-md mx-auto mt-8 md:mt-0">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-800 mb-2 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7" cy="21" r="2" stroke="#0ea5e9" strokeWidth="2"/><circle cx="17" cy="21" r="2" stroke="#0ea5e9" strokeWidth="2"/></svg>
            Order Summary
          </h2>
          <div className="divide-y divide-blue-200">
            {cart.items.map((item, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-4 py-2 sm:py-3">
                <Image src={item.product.img || item.product.imageUrl} alt={item.product.name} width={40} height={40} className="rounded-lg shadow w-10 h-10 sm:w-14 sm:h-14" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-xs sm:text-base">{item.product.name}</div>
                  <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                </div>
                <div className="font-bold text-blue-700 text-xs sm:text-base">Rs. {(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span>Items Total</span>
              <span className="font-semibold">Rs. {itemsPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-semibold">Rs. {shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span className="font-semibold">Rs. {taxPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base sm:text-lg font-bold border-t pt-2">
              <span>Total</span>
              <span className="text-green-700">Rs. {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-2 items-center">
            {form.deliveryMethod === "regular" ? (
              <div className="flex flex-col items-center">
                <span className="text-blue-700 font-semibold mb-1 text-xs sm:text-base">Regular Delivery</span>
                {DELIVERY_OPTIONS[0].svg}
                <span className="text-xs text-gray-500 mt-1">Your order will arrive in 2-4 days by van.</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-orange-600 font-semibold mb-1 text-xs sm:text-base">Urgent Delivery</span>
                {DELIVERY_OPTIONS[1].svg}
                <span className="text-xs text-gray-500 mt-1">Your order will be delivered by drone in 2-6 hours!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

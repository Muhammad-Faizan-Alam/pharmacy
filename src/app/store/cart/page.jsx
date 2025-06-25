'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState(null);
  const router = useRouter();

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cart.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    setUpdating(true);
    setError(null);
    try {
      await axios.patch('/api/cart', { productId, quantity });
      await fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quantity.');
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    setUpdating(true);
    setError(null);
    try {
      await axios.delete('/api/cart', { data: { productId } });
      await fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item.');
    } finally {
      setUpdating(false);
    }
  };

  const clearCart = async () => {
    setUpdating(true);
    setError(null);
    try {
      await axios.delete('/api/cart', { data: {} }); // No productId clears all
      await fetchCart();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear cart.');
    } finally {
      setUpdating(false);
    }
  };

  const handleCheckout = () => {
    router.push('/store/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-6 px-2 md:px-0">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-2 sm:p-4 md:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <FiShoppingCart className="text-blue-600" size={32} />
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 drop-shadow">Your Cart</h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loader border-2 border-t-2 border-blue-200 border-t-blue-600 rounded-full w-10 h-10 animate-spin"></span>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center font-semibold mb-4">{error}</div>
        ) : !cart || !cart.items || cart.items.length === 0 ? (
          <div className="text-center py-20">
            <img src="/asset/empty-cart.png" alt="Empty Cart" className="mx-auto w-32 h-32 sm:w-40 sm:h-40 opacity-80 mb-6" onError={e => e.target.style.display = 'none'} />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
            <p className="text-gray-500">Add some products to see them here.</p>
            <Link href="/" className="px-4 py-2 w-56 mx-auto mt-5 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold shadow flex items-center justify-center">
              <FiShoppingCart className="inline-block mr-2" />
              Go to Store
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 w-full">
              <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm md:text-base">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-blue-700 uppercase tracking-wider">Product</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold text-blue-700 uppercase tracking-wider">Price</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold text-blue-700 uppercase tracking-wider">Quantity</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold text-blue-700 uppercase tracking-wider">Total</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {cart.items.map(item => (
                      <tr key={item.product._id || item.product.id} className="hover:bg-blue-50 transition">
                        <td className="px-2 sm:px-4 py-3 flex items-center gap-2 sm:gap-4 min-w-[180px]">
                          <img src={item.product.img || item.product.imageUrl} alt={item.product.name} className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded shadow" />
                          <div>
                            <div className="font-semibold text-gray-800 text-xs sm:text-base">{item.product.name}</div>
                            <div className="text-xs text-gray-500">{item.product.category || item.product.brand}</div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center text-green-700 font-bold">Rs. {item.price.toFixed(2)}</td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <button
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-lg sm:text-xl font-bold text-gray-700 disabled:opacity-50"
                              onClick={() => updateQuantity(item.product._id || item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1 || updating}
                            >
                              <FiMinus />
                            </button>
                            <span className="text-base sm:text-lg font-semibold text-blue-700">{item.quantity}</span>
                            <button
                              className="p-1 rounded bg-gray-200 hover:bg-gray-300 text-lg sm:text-xl font-bold text-gray-700 disabled:opacity-50"
                              onClick={() => updateQuantity(item.product._id || item.product.id, item.quantity + 1)}
                              disabled={updating || item.quantity >= (item.product.stock || 99)}
                            >
                              <FiPlus />
                            </button>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center font-bold text-green-700">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <button
                            className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                            onClick={() => removeItem(item.product._id || item.product.id)}
                            disabled={updating}
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold shadow flex items-center justify-center">
                  <FiShoppingCart className="inline-block mr-2" />
                  Go to Store
                </Link>
                <div className="text-base sm:text-lg text-gray-600 font-semibold flex items-center gap-2 justify-center">
                  <span>Total Items:</span>
                  <span className="text-blue-700 font-bold">{cart.items.reduce((sum, i) => sum + i.quantity, 0)}</span>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition font-semibold shadow flex items-center justify-center disabled:opacity-50"
                  onClick={clearCart}
                  disabled={updating || cart.items.length === 0}
                  title="Remove all items from cart"
                >
                  <FiTrash2 className="inline-block mr-2" />
                  Clear Cart
                </button>
              </div>
            </div>
            {/* Cart Summary */}
            <div className="w-full lg:w-1/3 bg-blue-50 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col justify-between mt-8 lg:mt-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-bold text-green-700">Rs. {cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <span className="text-gray-700">Shipping</span>
                  <span className="font-bold text-gray-500">80</span>
                </div>
                <div className="flex justify-between mb-4 border-t pt-2 text-base sm:text-lg">
                  <span className="font-bold text-blue-800">Total</span>
                  <span className="font-bold text-green-700">Rs. {(cart.total + 80).toFixed(2)}</span>
                </div>
                {checkoutMsg && <div className="mb-2 px-4 py-2 rounded bg-green-100 text-green-700 font-semibold text-center">{checkoutMsg}</div>}
                <button
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-400 hover:from-green-500 hover:to-blue-400 text-white font-bold rounded-xl shadow-lg transition text-base sm:text-lg disabled:opacity-50 mt-2 flex items-center justify-center gap-2 group"
                  onClick={handleCheckout}
                  disabled={updating || cart.items.length === 0}
                >
                  <span className="inline-block group-hover:scale-110 transition-transform duration-200">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7" cy="21" r="2" stroke="#fff" strokeWidth="2" /><circle cx="17" cy="21" r="2" stroke="#fff" strokeWidth="2" /></svg>
                  </span>
                  <span>Proceed to Checkout</span>
                </button>
              </div>
              <img src="/asset/medicine/Medicines.webp" alt="Cart Visual" className="w-full rounded-xl mt-8 shadow-lg hidden md:block" />
            </div>
          </div>
        )}
        <style jsx>{`.loader { display: inline-block; vertical-align: middle; }`}</style>
      </div>
    </div>
  );
};

export default CartPage;

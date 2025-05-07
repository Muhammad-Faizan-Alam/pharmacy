"use client";
// components/ProductCard.jsx
import React, { useState } from "react";

const ProductCard = () => {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: "2blink Eye Drop 15ml",
    brand: "Sante",
    imageUrl: "/asset/medicine/2blink_Eye_Drop_15ml.webp", // Change this to your actual path
    price: 479,
    pack: "Pack of 1",
    description: [
      "Lubricates and hydrates dry eyes",
      "Provides long-lasting moisture",
     
      "Can be used with contact lenses",
    ],
  };

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="py-12 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-sm  mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
        {/* Product Image */}
        <div className="h-56 bg-gray-100 flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="pt-4">
          <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
          <h2 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{product.pack}</p>

          {/* Description */}
          <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc pl-5">
            {product.description.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>

          {/* Quantity Control */}
          <div className="flex items-center mt-3 space-x-3">
            <button
              onClick={decreaseQty}
              className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
            >
              -
            </button>
            <span className="text-xl font-semibold text-red-600">
              {quantity}
            </span>
            <button
              onClick={increaseQty}
              className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
            >
              +
            </button>
          </div>

          {/* Price and CTA */}
          <div className="flex mt-2 items-center justify-between">
            {/* Price */}
            <p className="text-green-600 font-bold text-lg mt-2">
              Rs. {product.price.toFixed(2)}
            </p>
            <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

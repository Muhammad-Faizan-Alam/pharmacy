'use client';
import React, { useState } from "react";
import { data } from "@/components/store/medicineapi";

const ProductCard = ({ article }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={article.imageUrl}
          alt={article.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="pt-4">
        <p className="text-sm text-blue-600 font-medium">{article.brand}</p>
        <h2 className="text-xl font-semibold text-gray-900">{article.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{article.pack}</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc pl-5">
          {article.description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <div className="flex items-center mt-3 space-x-3">
          <button
            onClick={decreaseQty}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
          >
            -
          </button>
          <span className="text-xl font-semibold text-red-600">{quantity}</span>
          <button
            onClick={increaseQty}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
          >
            +
          </button>
        </div>
        <div className="flex mt-4 items-center justify-between">
          <p className="text-green-600 font-bold text-lg">
            Rs. {(article.price * quantity).toFixed(2)}
          </p>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ArticleDetailCard = ({ params }) => {
  const { slug } = params;
  const articles = data[slug] || [];

  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Filtering by brand and price
  const filtered = articles.filter((item) => {
    const brandMatch = brandFilter ? item.brand === brandFilter : true;
    const priceMatch = priceFilter ? item.price <= parseInt(priceFilter) : true;
    return brandMatch && priceMatch;
  });

  // Get unique brands from the data
  const allBrands = [...new Set(articles.map((item) => item.brand))];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Brand filter */}
        <select
          onChange={(e) => setBrandFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">Filter by Brand</option>
          {allBrands.map((brand, i) => (
            <option key={i} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Price filter */}
        <select
          onChange={(e) => setPriceFilter(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300"
        >
          <option value="">Filter by Price</option>
          <option value="500">Under Rs. 500</option>
          <option value="1000">Under Rs. 1000</option>
          <option value="2000">Under Rs. 2000</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length > 0 ? (
          filtered.map((article, index) => (
            <ProductCard key={index} article={article} />
          ))
        ) : (
          <div className="text-center col-span-full text-red-500">
            No medicines match selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailCard;

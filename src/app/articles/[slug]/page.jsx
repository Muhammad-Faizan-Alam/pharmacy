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
    <div className="w-72 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
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
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;
  
  const articles = data[slug] || [];
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // State for all filters
  const [brandFilter, setBrandFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [ingredientsFilter, setIngredientsFilter] = useState("");
  const [formFilter, setFormFilter] = useState("");
  const [manufacturerFilter, setManufacturerFilter] = useState("");
  const [topSellingFilter, setTopSellingFilter] = useState(false);
  const [hotDealsFilter, setHotDealsFilter] = useState(false);

  // Get all unique values for filters
  const allBrands = [...new Set(articles.map(item => item.brand))];
  const allCategories = [...new Set(articles.map(item => item.category))];
  const allIngredients = [...new Set(articles.flatMap(item => item.ingredients))];
  const allForms = [...new Set(articles.map(item => item.form))];
  const allManufacturers = [...new Set(articles.map(item => item.manufacturer))];

  // Filtering logic
  const filteredProducts = articles.filter((item) => {
    const brandMatch = brandFilter ? item.brand === brandFilter : true;
    const priceMatch = priceFilter ? item.price <= parseInt(priceFilter) : true;
    const categoryMatch = categoryFilter ? item.category === categoryFilter : true;
    const ingredientsMatch = ingredientsFilter ? item.ingredients.includes(ingredientsFilter) : true;
    const formMatch = formFilter ? item.form === formFilter : true;
    const manufacturerMatch = manufacturerFilter ? item.manufacturer === manufacturerFilter : true;
    const topSellingMatch = topSellingFilter ? item.isTopSelling : true;
    const hotDealsMatch = hotDealsFilter ? item.isHotDeal : true;
    
    return brandMatch && priceMatch && categoryMatch && ingredientsMatch && 
           formMatch && manufacturerMatch && topSellingMatch && hotDealsMatch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">MEDICINES</h1>
        <img src="/asset/medicine/Medicines.webp" className="mb-10 w-full" alt="Medicines" />
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Left Side */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow sticky top-4">
              <h2 className="font-bold mb-4">Filters</h2>
              
              <div className="space-y-4">
                {/* Category filter */}
                <div>
                  <select
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
                      setCurrentPage(1); // Reset to first page when filter changes
                    }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                  >
                    <option value="">All Categories</option>
                    {allCategories.map((category, i) => (
                      <option key={i} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Ingredients filter */}
                <div>
                  <select
                    onChange={(e) => {
                      setIngredientsFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                  >
                    <option value="">All Ingredients</option>
                    {allIngredients.map((ingredient, i) => (
                      <option key={i} value={ingredient}>{ingredient}</option>
                    ))}
                  </select>
                </div>

                {/* Price filter */}
                <div>
                  <h3 className="font-medium mb-2">Price</h3>
                  <select
                    onChange={(e) => {
                      setPriceFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                  >
                    <option value="">All Prices</option>
                    <option value="500">Under Rs. 500</option>
                    <option value="1000">Under Rs. 1000</option>
                    <option value="2000">Under Rs. 2000</option>
                  </select>
                </div>

                {/* Brand filter */}
                <div>
                  <h3 className="font-medium mb-2">Brand</h3>
                  <select
                    onChange={(e) => {
                      setBrandFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                  >
                    <option value="">All Brands</option>
                    {allBrands.map((brand, i) => (
                      <option key={i} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Toggle filters */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setTopSellingFilter(!topSellingFilter);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-2 rounded border ${topSellingFilter ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} border-gray-300 text-sm`}
                  >
                    Top Selling
                  </button>
                  <button
                    onClick={() => {
                      setHotDealsFilter(!hotDealsFilter);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-2 rounded border ${hotDealsFilter ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} border-gray-300 text-sm`}
                  >
                    Hot Deals
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid - Right Side */}
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <ProductCard key={index} article={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-red-500 bg-white rounded-lg shadow">
                  No medicines match selected filters.
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredProducts.length > productsPerPage && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => paginate(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded border ${currentPage === number ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailCard;
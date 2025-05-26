'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/app/Context/ProductsContext";

const ProductCard = ({ product, onClick }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div 
      className="w-72 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-56 bg-gray-100 flex items-center justify-center">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="pt-4">
        <p className="text-sm text-blue-600 font-medium">{product.category}</p>
        <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{product.type}</p>
        <p className="mt-2 text-sm text-gray-700">
          {product.description}
        </p>
        {/* <div className="flex items-center mt-3 space-x-3">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
          >
            -
          </button>
          <span className="text-xl font-semibold text-red-600">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
          >
            +
          </button>
        </div> */}
        <div>
          {product.stock > 0 ? (
            <p className="text-green-600 font-bold text-lg mt-2">In Stock</p>) : (
            <p className="text-red-600 font-bold text-lg mt-2">Out of Stock</p>)}
        </div>
        <div className="flex mt-4 items-center justify-between">
          <p className="text-green-600 font-bold text-lg">
            Rs. {(product.price * quantity).toFixed(2)}
          </p>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic here
            }}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <button 
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center font-semibold text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <img
              src={product.img}
              alt={product.name}
              className="max-h-96 object-contain rounded-xl shadow"
            />
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-blue-600 font-medium mb-2">{product.category}</p>
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2">{product.type}</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Description:</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="flex items-center justify-between m-6">
              <div className="flex items-center gap-4">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700">-</button>
                <span className="text-xl font-semibold text-red-600">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700">+</button>
              </div>

              <div className="text-lg font-semibold text-gray-800">
                {product.stock} available
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-green-600">Rs. {(product.price * quantity).toFixed(2)}</p>
              <button className="font-semibold shadow px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={product.stock === 0}>
                Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ArticleDetailCard = ({ params }) => {
  const { products, loading } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [search, setSearch] = useState("");

  // Unwrap params for Next.js App Router compliance
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.slug || "";
  const normalizedSlug = slug.replace(/[-_ ]/g, '').toLowerCase();

  // Filter products by category (case-insensitive, ignore spaces/underscores)
  const categoryProducts = products.filter(p =>
    p.category && p.category.replace(/[-_ ]/g, '').toLowerCase() === normalizedSlug
  );

  // Get all unique types for filter
  const allTypes = [...new Set(categoryProducts.map(item => item.type))];

  // Filtering logic
  const filteredProducts = categoryProducts.filter(item => {
    const typeMatch = typeFilter ? item.type === typeFilter : true;
    const priceMatch = priceFilter ? item.price <= parseInt(priceFilter) : true;
    const stockMatch = stockFilter ? (stockFilter === 'in' ? item.stock > 0 : item.stock === 0) : true;
    const searchMatch = search ? item.name.toLowerCase().includes(search.toLowerCase()) : true;
    return typeMatch && priceMatch && stockMatch && searchMatch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-xl font-semibold text-blue-700 animate-pulse">Loading products...</div>
      </div>
    );
  }

  if (selectedProduct) {
    return <ProductDetailPage product={selectedProduct} onBack={() => setSelectedProduct(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800 uppercase tracking-wide drop-shadow">{slug.replace(/[-_]/g, ' ')}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-4">
              <h2 className="font-bold mb-4 text-lg text-blue-700">Filters</h2>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full mb-4 px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 outline-none"
              />
              <div className="space-y-4">
                {/* Type filter */}
                <div>
                  <label className="block font-medium mb-1">Type</label>
                  <select
                    value={typeFilter}
                    onChange={e => { setTypeFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                  >
                    <option value="">All Types</option>
                    {allTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                {/* Price filter */}
                <div>
                  <label className="block font-medium mb-1">Price</label>
                  <select
                    value={priceFilter}
                    onChange={e => { setPriceFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                  >
                    <option value="">All Prices</option>
                    <option value="50">Under Rs. 50</option>
                    <option value="100">Under Rs. 100</option>
                    <option value="200">Under Rs. 200</option>
                    <option value="500">Under Rs. 500</option>
                  </select>
                </div>
                {/* Stock filter */}
                <div>
                  <label className="block font-medium mb-1">Stock</label>
                  <select
                    value={stockFilter}
                    onChange={e => { setStockFilter(e.target.value); setCurrentPage(1); }}
                    className="w-full px-3 py-2 rounded border border-gray-300"
                  >
                    <option value="">All</option>
                    <option value="in">In Stock</option>
                    <option value="out">Out of Stock</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>
          {/* Products Grid */}
          <section className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProducts.length > 0 ? (
                currentProducts.map(product => (
                  <div key={product.id} className="hover:scale-105 transition-transform duration-200">
                    <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-red-500 bg-white rounded-lg shadow">
                  No products match selected filters.
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
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailCard;





























// 'use client';
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { data } from "@/components/store/medicineapi";

// const ProductCard = ({ product, onClick }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleIncrease = (e) => {
//     e.stopPropagation();
//     setQuantity(prev => prev + 1);
//   };

//   const handleDecrease = (e) => {
//     e.stopPropagation();
//     if (quantity > 1) setQuantity(prev => prev - 1);
//   };

//   return (
//     <div 
//       className="w-72 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
//       onClick={onClick}
//     >
//       <div className="h-56 bg-gray-100 flex items-center justify-center">
//         <img
//           src={product.imageUrl}
//           alt={product.name}
//           className="h-full w-full object-contain"
//         />
//       </div>
//       <div className="pt-4">
//         <p className="text-sm text-blue-600 font-medium">{product.brand}</p>
//         <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
//         <p className="text-sm text-gray-600 mt-1">{product.pack}</p>
//         <ul className="mt-2 space-y-1 text-sm text-gray-700 list-disc pl-5">
//           {product.description.map((point, i) => (
//             <li key={i}>{point}</li>
//           ))}
//         </ul>
//         <div className="flex items-center mt-3 space-x-3">
//           <button
//             onClick={handleDecrease}
//             className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
//           >
//             -
//           </button>
//           <span className="text-xl font-semibold text-red-600">{quantity}</span>
//           <button
//             onClick={handleIncrease}
//             className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
//           >
//             +
//           </button>
//         </div>
//         <div className="flex mt-4 items-center justify-between">
//           <p className="text-green-600 font-bold text-lg">
//             Rs. {(product.price * quantity).toFixed(2)}
//           </p>
//           <button 
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
//             onClick={(e) => {
//               e.stopPropagation();
//               // Add to cart logic here
//             }}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductDetailPage = ({ product }) => {
//   const router = useRouter();
//   const [quantity, setQuantity] = useState(1);

//   const increaseQty = () => setQuantity(prev => prev + 1);
//   const decreaseQty = () => {
//     if (quantity > 1) setQuantity(prev => prev - 1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         <button 
//           onClick={() => router.back()}
//           className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition flex items-center"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Back to Products
//         </button>
        
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Product Image */}
//           <div className="w-full md:w-1/2 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="max-h-96 object-contain"
//             />
//           </div>
          
//           {/* Product Details */}
//           <div className="w-full md:w-2/3">
//             <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
//             <p className="text-lg text-blue-600 font-medium mt-2">{product.brand}</p>
            
//             <div className="mt-6">
//               <h2 className="text-xl font-semibold">Description:</h2>
//               <ul className="mt-2 space-y-2 text-gray-700 list-disc pl-5">
//                 {product.description.map((point, i) => (
//                   <li key={i}>{point}</li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//               <p className="text-2xl font-bold text-green-600">
//                 Rs. {(product.price * quantity).toFixed(2)}
//               </p>
//               <p className="mt-2 font-medium text-green-600">
//                 IN STOCK
//               </p>
              
//               <div className="flex items-center mt-4 space-x-4">
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={decreaseQty}
//                     className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
//                   >
//                     -
//                   </button>
//                   <span className="text-xl font-semibold text-red-600">{quantity}</span>
//                   <button
//                     onClick={increaseQty}
//                     className="px-3 py-1 bg-gray-200 rounded text-xl font-bold text-gray-700"
//                   >
//                     +
//                   </button>
//                 </div>
                
//                 <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
//                   Add to Cart
//                 </button>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ArticleDetailCard = ({ params }) => {
//   const router = useRouter();
//   const unwrappedParams = React.use(params);
//   const { slug } = unwrappedParams;
  
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const articles = data[slug] || [];
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 9;

//   // State for all filters
//   const [brandFilter, setBrandFilter] = useState("");
//   const [priceFilter, setPriceFilter] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [ingredientsFilter, setIngredientsFilter] = useState("");
//   const [formFilter, setFormFilter] = useState("");
//   const [manufacturerFilter, setManufacturerFilter] = useState("");
//   const [topSellingFilter, setTopSellingFilter] = useState(false);
//   const [hotDealsFilter, setHotDealsFilter] = useState(false);

//   // Get all unique values for filters
//   const allBrands = [...new Set(articles.map(item => item.brand))];
//   const allCategories = [...new Set(articles.map(item => item.category))];
//   const allIngredients = [...new Set(articles.flatMap(item => item.ingredients))];
//   const allForms = [...new Set(articles.map(item => item.form))];
//   const allManufacturers = [...new Set(articles.map(item => item.manufacturer))];

//   // Filtering logic
//   const filteredProducts = articles.filter((item) => {
//     const brandMatch = brandFilter ? item.brand === brandFilter : true;
//     const priceMatch = priceFilter ? item.price <= parseInt(priceFilter) : true;
//     const categoryMatch = categoryFilter ? item.category === categoryFilter : true;
//     const ingredientsMatch = ingredientsFilter ? item.ingredients.includes(ingredientsFilter) : true;
//     const formMatch = formFilter ? item.form === formFilter : true;
//     const manufacturerMatch = manufacturerFilter ? item.manufacturer === manufacturerFilter : true;
//     const topSellingMatch = topSellingFilter ? item.isTopSelling : true;
//     const hotDealsMatch = hotDealsFilter ? item.isHotDeal : true;
    
//     return brandMatch && priceMatch && categoryMatch && ingredientsMatch && 
//            formMatch && manufacturerMatch && topSellingMatch && hotDealsMatch;
//   });

//   // Pagination logic
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handle product click
//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     // Update URL without page reload
//     window.history.pushState({}, '', `/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`);
//   };

//   // If a product is selected, show its detail page
//   if (selectedProduct) {
//     return <ProductDetailPage product={selectedProduct} />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="container mx-auto py-8">
//         <h1 className="text-2xl font-bold mb-6">MEDICINES</h1>
//         <img src="/asset/medicine/Medicines.webp" className="mb-10 w-full" alt="Medicines" />
        
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Filters Sidebar - Left Side */}
//           <div className="w-full md:w-1/4">
//             <div className="bg-white p-4 rounded-lg shadow sticky top-4">
//               <h2 className="font-bold mb-4">Filters</h2>
              
//               <div className="space-y-4">
//                 {/* Category filter */}
//                 <div>
//                   <h3 className="font-medium mb-2">Category</h3>
//                   <select
//                     onChange={(e) => {
//                       setCategoryFilter(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-3 py-2 rounded border border-gray-300"
//                   >
//                     <option value="">All Categories</option>
//                     {allCategories.map((category, i) => (
//                       <option key={i} value={category}>{category}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Type filter */}
//                 <div>
//                   <h3 className="font-medium mb-2">Type</h3>
//                   <select
//                     onChange={(e) => {
//                       setTypeFilter(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-3 py-2 rounded border border-gray-300"
//                   >
//                     <option value="">All Types</option>
//                     {allTypes.map((type, i) => (
//                       <option key={i} value={type}>{type}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Price filter */}
//                 <div>
//                   <h3 className="font-medium mb-2">Price</h3>
//                   <select
//                     onChange={(e) => {
//                       setPriceFilter(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                     className="w-full px-3 py-2 rounded border border-gray-300"
//                   >
//                     <option value="">All Prices</option>
//                     <option value="500">Under Rs. 500</option>
//                     <option value="1000">Under Rs. 1000</option>
//                     <option value="2000">Under Rs. 2000</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid - Right Side */}
//           <div className="w-full md:w-3/4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {currentProducts.length > 0 ? (
//                 currentProducts.map((product) => (
//                   <ProductCard 
//                     key={product.id} 
//                     product={product} 
//                     onClick={() => handleProductClick(product)}
//                   />
//                 ))
//               ) : (
//                 <div className="col-span-full text-center py-10 text-red-500 bg-white rounded-lg shadow">
//                   No products match selected filters.
//                 </div>
//               )}
//             </div>

//             {/* Pagination */}
//             {filteredProducts.length > productsPerPage && (
//               <div className="flex justify-center mt-8">
//                 <nav className="flex items-center gap-1">
//                   <button
//                     onClick={() => paginate(Math.max(currentPage - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
//                   >
//                     Previous
//                   </button>
                  
//                   {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
//                     <button
//                       key={number}
//                       onClick={() => paginate(number)}
//                       className={`px-3 py-1 rounded border ${currentPage === number ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
//                     >
//                       {number}
//                     </button>
//                   ))}
                  
//                   <button
//                     onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
//                   >
//                     Next
//                   </button>
//                 </nav>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticleDetailCard;
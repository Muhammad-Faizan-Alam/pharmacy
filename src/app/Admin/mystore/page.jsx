"use client";
import { useState, useEffect } from "react";
import PopupForm from "@/components/mystorepopup";
import { useRouter } from "next/navigation";
const API_URL = "/api/products";

function AllProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.data || []);
      setFilteredProducts(data.data || []);
    } catch (error) {
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter(({ _id, name }) =>
      (_id && _id.toString().toLowerCase().includes(term)) ||
      (name && name.toLowerCase().includes(term))
    );
    setFilteredProducts(filtered);
  };

  const handleSubmit = async (formData) => {
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add product");
      await fetchProducts();
      setShowPopup(false);
      showMessage("Product added successfully!");
    } catch (error) {
      showMessage(error.message || "Error adding product", true);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowEditPopup(true);
  };

  const handleUpdate = async (formData) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${currentProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update product");
      await fetchProducts();
      setShowEditPopup(false);
      showMessage("Product updated successfully!");
    } catch (error) {
      showMessage(error.message || "Error updating product", true);
    }
  };

  const handleDelete = async (_id) => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      await fetchProducts();
      showMessage("Product deleted successfully!");
    } catch (error) {
      showMessage(error.message || "Error deleting product", true);
    }
  };

  const showMessage = (msg, isError = false) => {
    setStatusMsg({ msg, isError });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const productFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "price", label: "Price", type: "text" },
    { name: "stock", label: "Stock", type: "text" },
    { name: "img", label: "Image URL", type: "text" }
  ];

  return (
    <section className="py-8 bg-[#343148FF] min-h-screen">
      <div className="container mx-auto px-4">
        {statusMsg && (
          <div className={`mb-4 p-3 rounded-md text-center font-semibold shadow-lg ${statusMsg.isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {statusMsg.msg}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-center font-semibold shadow-lg">{error}</div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-[#D7C49EFF] hover:border-2 border-[#D7C49EFF] px-5 py-3 text-white rounded-md text-xs font-semibold w-full md:w-auto shadow-md hover:scale-105 transition"
          >
            Add New Product
          </button>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by ID or name..."
              className="w-full px-4 py-2 rounded-md border bg-[#D7C49EFF] border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D7C49EFF] text-white placeholder:text-white/80 shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-100 hover:text-red-400"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className={`${showPopup || showEditPopup ? "w-full md:w-2/3" : "w-full"}`}>
            <div className="p-4 bg-white shadow-xl rounded-xl overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-[#D7C49EFF] divide-y divide-gray-300 text-sm">
                  {loading ? (
                    <tr><td colSpan="6" className="text-center py-4 text-white font-semibold animate-pulse">Loading products...</td></tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr><td colSpan="6" className="text-center py-4 text-white font-semibold">No products found</td></tr>
                  ) : (
                    filteredProducts.map(product => (
                      <tr key={product._id} className="hover:bg-[#343148FF] hover:text-white font-medium transition">
                        <td className="px-4 py-2">
                          <img src={product.img || "/asset/img/1.webp"} alt={product.name} className="w-16 h-16 object-cover rounded shadow border border-[#343148FF]" />
                        </td>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">Rs. {product.price}</td>
                        <td className="px-4 py-2">{product.stock}</td>
                        <td className="px-4 py-2 text-xs">{product._id}</td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {(showPopup || showEditPopup) && (
            <div className="w-full md:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-lg sticky top-20">
                <PopupForm
                  showPopup={showPopup || showEditPopup}
                  setShowPopup={showPopup ? setShowPopup : setShowEditPopup}
                  fields={productFields}
                  onSubmit={showPopup ? handleSubmit : handleUpdate}
                  title={showPopup ? "Add New Product" : "Edit Product"}
                  initialData={currentProduct}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllProduct;

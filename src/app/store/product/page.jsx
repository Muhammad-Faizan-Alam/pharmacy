"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useProducts } from "@/app/Context/ProductsContext";
import { useState } from "react";

const ProductDetails = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get("search") || "";
    const { products, loading, error } = useProducts(); // <-- useProducts is a hook, not a context
    const [addingId, setAddingId] = useState(null);
    const [addMsg, setAddMsg] = useState("");

    // Filter products by name (case-insensitive, partial match)
    const filteredProducts = search
        ? products.filter(p => p.name && p.name.toLowerCase().includes(search.toLowerCase()))
        : [];

    const handleAddToCart = async (product) => {
        setAddingId(product._id);
        setAddMsg("");
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product._id, quantity: 1 }),
            });
            if (!res.ok) throw new Error("Failed to add to cart");
            setAddMsg("Added to cart!");
            // Dispatch cart-updated event for Navbar
            window.dispatchEvent(new Event('cart-updated'));
        } catch (e) {
            setAddMsg("Error: " + e.message);
        } finally {
            setAddingId(null);
            setTimeout(() => setAddMsg(""), 2000);
        }
    };

    if (!search) return <div className="text-center py-16 text-gray-500 text-lg">No search query provided.</div>;
    if (loading) return <div className="text-center py-16 text-gray-500 text-lg">Loading...</div>;
    if (error) return <div className="text-center py-16 text-red-500 text-lg">{error}</div>;
    if (filteredProducts.length === 0) return <div className="text-center py-16 text-gray-500 text-lg">No products found for "{search}".</div>;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#343148FF]">Search Results for "{search}"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map(product => (
                    <div key={product._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center border border-[#D7C49EFF] hover:shadow-2xl transition">
                        <div className="w-40 h-40 flex-shrink-0 flex items-center justify-center bg-[#f7f7fa] rounded-lg overflow-hidden">
                            <Image src={product.img || "/asset/logo.png"} alt={product.name} width={160} height={160} className="object-contain" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-[#343148FF] mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2 line-clamp-3">{product.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="bg-[#D7C49EFF] text-[#343148FF] px-3 py-1 rounded-full text-xs font-semibold">{product.category}</span>
                                <span className="bg-[#343148FF] text-[#D7C49EFF] px-3 py-1 rounded-full text-xs font-semibold">{product.type}</span>
                            </div>
                            <div className="text-lg font-bold text-[#343148FF] mb-2">PKR {Number(product.price).toLocaleString()}</div>
                            <div className="text-sm text-gray-500 mb-2">Stock: {product.stock}</div>
                            <button
                                className="mt-2 px-6 py-2 rounded-full bg-[#343148FF] text-[#D7C49EFF] font-bold shadow hover:bg-[#23203b] transition disabled:opacity-60"
                                onClick={() => handleAddToCart(product)}
                                disabled={addingId === product._id}
                            >
                                {addingId === product._id ? "Adding..." : "Add to Cart"}
                            </button>
                            {addMsg && addingId === null && (
                                <div className="mt-2 text-green-600 font-semibold text-sm">{addMsg}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
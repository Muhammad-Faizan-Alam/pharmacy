"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EditProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://681f51fa72e59f922ef5e692.mockapi.io/api/products/${id}`);
        const data = await res.json();
        const example = {
          "id": 1,
          "name": "Paracetamol 250mg",
          "img": "https://via.placeholder.com/150?text=Paracetamol",
          "description": "Relieves pain and reduces fever.",
          "category": "Medicines",
          "type": "Tablet",
          "price": 10,
          "stock": 50
        }
        setProduct(example);
      } catch (err) {
        console.error("Error fetching product:", err);
        setStatus("Error loading product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const res = await fetch(`https://681f51fa72e59f922ef5e692.mockapi.io/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      await res.json();
      setStatus("✅ Product updated successfully!");
      setTimeout(() => {
        setStatus(null);
        router.push("/Admin/mystore");
      }, 2000);
    } catch (err) {
      console.error("Error updating product:", err);
      setStatus("❌ Failed to update product.");
    }
  };

  const productFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "price", label: "Price", type: "text" },
    { name: "stock", label: "Stock", type: "text" },
    { name: "img", label: "Image URL", type: "text" },
  ];

  if (loading) return <div className="p-4 text-center">Loading product...</div>;

  return (
    <div className="max-w-2xl mx-auto my-8 bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Edit Product</h2>
      {status && (
        <div
          className={`mb-4 text-center p-3 rounded ${status.includes("❌") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
        >
          {status}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = Object.fromEntries(new FormData(e.target));
          handleUpdate(formData);
        }}
        className="space-y-4"
      >
        {productFields.map((field) => (
          <div key={field.name}>
            <label className="block font-medium mb-1">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              defaultValue={product[field.name]}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded w-full mt-4"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;

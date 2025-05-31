"use client";
import { useState, useEffect } from "react";

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

function currency(val) {
    return `PKR ${Number(val).toLocaleString()}`;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState({});
    const [expanded, setExpanded] = useState({});
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ status: "", delivery: "" });

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/orders");
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                console.log("Raw orders data:", data);
                
                // Ensure orders is always an array
                const arr = data.data || [];
                console.log("Fetched orders:", arr);
                setOrders(arr);
            } catch (e) {
                setError(e.message);
                setOrders([]); // fallback to empty array on error
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleUpdate = async (orderId, field) => {
        setUpdating((u) => ({ ...u, [orderId]: true }));
        try {
            const order = orders.find((o) => o._id === orderId);
            const updated = { ...order };
            if (field === "isDelivered") updated.isDelivered = true;
            if (field === "isPaid") updated.isPaid = true;
            // Use PATCH and correct endpoint for updating a single order
            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated),
            });
            if (!res.ok) throw new Error("Failed to update order");
            setOrders((prev) =>
                prev.map((o) => (o._id === orderId ? { ...o, ...updated } : o))
            );
        } catch (e) {
            setError(e.message);
        } finally {
            setUpdating((u) => ({ ...u, [orderId]: false }));
        }
    };

    const filteredOrders = orders.filter((order) => {
        const userMatch = search
            ? order.user && order.user.toLowerCase().includes(search.toLowerCase())
            : true;
        const statusMatch = filter.status
            ? (filter.status === "delivered" ? order.isDelivered : !order.isDelivered)
            : true;
        const deliveryMatch = filter.delivery
            ? order.deliveryMethod === filter.delivery
            : true;
        return userMatch && statusMatch && deliveryMatch;
    });

    return (
        <section className="py-28 bg-[#343148FF] min-h-screen">
            <div className="container mx-auto px-2 md:px-6">
                <h2 className="text-3xl font-bold text-white mb-6">Admin Orders</h2>
                <div className="flex flex-wrap gap-4 mb-4 items-center">
                    <input
                        type="text"
                        placeholder="Search by User ID..."
                        className="px-3 py-2 rounded border focus:outline-none focus:ring w-48 bg-[#343148FF] text-[#D7C49EFF] border-[#D7C49EFF] placeholder-[#D7C49EFF]"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select
                        className="px-3 py-2 rounded border focus:outline-none focus:ring bg-[#343148FF] text-[#D7C49EFF] border-[#D7C49EFF]"
                        value={filter.status}
                        onChange={e => setFilter(f => ({ ...f, status: e.target.value }))
                        }
                    >
                        <option value="" className="text-black">All Status</option>
                        <option value="delivered" className="text-black">Delivered</option>
                        <option value="pending" className="text-black">Pending</option>
                    </select>
                    <select
                        className="px-3 py-2 rounded border focus:outline-none focus:ring bg-[#343148FF] text-[#D7C49EFF] border-[#D7C49EFF]"
                        value={filter.delivery}
                        onChange={e => setFilter(f => ({ ...f, delivery: e.target.value }))
                        }
                    >
                        <option value="" className="text-black">All Delivery</option>
                        <option value="urgent" className="text-black">Urgent</option>
                        <option value="regular" className="text-black">Regular</option>
                    </select>
                </div>
                {error && (
                    <div className="mb-4 p-3 rounded bg-red-100 text-red-700 font-semibold">{error}</div>
                )}
                <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Items</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Payment</th>
                                <th className="px-4 py-3">Delivery</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Created</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {loading ? (
                                <tr><td colSpan="9" className="text-center py-8">Loading orders...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan="9" className="text-center py-8">No orders found</td></tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <>
                                    <tr key={order._id} className="hover:bg-[#343148FF]/10 transition cursor-pointer" onClick={() => setExpanded(e => ({...e, [order._id]: !e[order._id]}))}>
                                        <td className="px-4 py-3 font-mono text-xs">{order._id}</td>
                                        <td className="px-4 py-3">{order.user}</td>
                                        <td className="px-4 py-3">
                                            <span className="font-semibold">{order.orderItems?.length}</span> item(s)
                                            <button className="ml-2 text-blue-600 underline text-xs" onClick={e => {e.stopPropagation();setExpanded(ex=>({...ex,[order._id]:!ex[order._id]}));}}>
                                                {expanded[order._id] ? "Hide" : "View"}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 font-bold">{currency(order.totalPrice?.$numberDouble || order.totalPrice || 0)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.isPaid ? 'Paid' : 'Unpaid'}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.deliveryMethod === 'urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{order.deliveryMethod}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{order.isDelivered ? 'Delivered' : 'Pending'}</span>
                                        </td>
                                        <td className="px-4 py-3">{formatDate(order.createdAt?.$date?.$numberLong || order.createdAt)}</td>
                                        <td className="px-4 py-3 space-y-1">
                                            {!order.isDelivered && (
                                                <button
                                                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold ${updating[order._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={updating[order._id]}
                                                    onClick={e => {e.stopPropagation();handleUpdate(order._id, "isDelivered");}}
                                                >
                                                    {updating[order._id] ? 'Updating...' : 'Mark Delivered'}
                                                </button>
                                            )}
                                            {!order.isPaid && (
                                                <button
                                                    className={`w-full bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold ${updating[order._id] ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={updating[order._id]}
                                                    onClick={e => {e.stopPropagation();handleUpdate(order._id, "isPaid");}}
                                                >
                                                    {updating[order._id] ? 'Updating...' : 'Mark Paid'}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                    {expanded[order._id] && (
                                        <tr className="bg-gray-50">
                                            <td colSpan="9" className="px-6 py-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h4 className="font-bold mb-2">Order Items</h4>
                                                        <ul className="divide-y divide-gray-200">
                                                            {order.orderItems?.map(item => (
                                                                <li key={item._id?.$oid || item._id} className="flex items-center py-2">
                                                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border mr-3" />
                                                                    <div>
                                                                        <div className="font-semibold">{item.name}</div>
                                                                        <div className="text-xs text-gray-500">Qty: {item.quantity?.$numberInt || item.quantity} × {currency(item.price?.$numberInt || item.price)}</div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold mb-2">Shipping & Payment</h4>
                                                        <div className="text-sm mb-1"><span className="font-semibold">Address:</span> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.country} ({order.shippingAddress?.postalCode})</div>
                                                        <div className="text-sm mb-1"><span className="font-semibold">Payment:</span> {order.paymentMethod}</div>
                                                        <div className="text-sm mb-1"><span className="font-semibold">Items Price:</span> {currency(order.itemsPrice?.$numberInt || order.itemsPrice)}</div>
                                                        <div className="text-sm mb-1"><span className="font-semibold">Shipping:</span> {currency(order.shippingPrice?.$numberInt || order.shippingPrice)}</div>
                                                        <div className="text-sm mb-1"><span className="font-semibold">Tax:</span> {currency(order.taxPrice?.$numberDouble || order.taxPrice)}</div>
                                                        <div className="text-md font-bold mt-2"><span className="font-semibold">Total:</span> {currency(order.totalPrice?.$numberDouble || order.totalPrice)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
"use client";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import Link from 'next/link';

const ProfilePage = () => {
    const [logout, setLogout] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logoutError, setLogoutError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [ordersError, setOrdersError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (logout) {
            setLogoutLoading(true);
            setLogoutError(null);
            const doLogout = async () => {
                try {
                    const response = await axios.get('/api/users/logout');
                    if (response.status === 200) {
                        router.push('/login');
                    } else {
                        setLogoutError('Unexpected response from server.');
                    }
                } catch (error) {
                    setLogoutError(error.response?.data?.message || 'Logout failed.');
                } finally {
                    setLogoutLoading(false);
                }
            };
            doLogout();
        }
    }, [logout, router]);

    useEffect(() => {
        setLoading(true);
        setError(null);
        axios.post('/api/users/me')
            .then(response => {
                setUser(response.data.data);
            })
            .catch(error => {
                setError(error.response?.data?.message || 'Failed to fetch user data.');
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setOrdersLoading(true);
        setOrdersError(null);
        axios.get('/api/orders')
            .then(response => {
                setOrders(response.data.data || []);
            })
            .catch(error => {
                setOrdersError(error.response?.data?.message || 'Failed to fetch orders.');
            })
            .finally(() => setOrdersLoading(false));
    }, []);

    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 py-10 px-2">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center flex flex-col gap-8">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-2 tracking-tight drop-shadow">Profile</h1>
                    {loading ? (
                        <p className="text-gray-700">Loading user data...</p>
                    ) : error ? (
                        <div className="mb-4 px-4 py-3 rounded bg-red-100 text-red-700 font-semibold">{error}</div>
                    ) : user ? (
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                                <div className="rounded-full bg-blue-100 w-20 h-20 flex items-center justify-center text-3xl font-bold text-blue-600 shadow-lg border-4 border-blue-200">
                                    {user.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                                </div>
                                <div className="text-left">
                                    <div className="text-xl font-bold text-blue-900">{user.username}</div>
                                    <div className="text-gray-600">{user.email}</div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 justify-center mt-2">
                                <button
                                    onClick={() => setLogout(true)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                                    disabled={logoutLoading}
                                >
                                    {logoutLoading && <span className="loader border-2 border-t-2 border-red-200 border-t-red-600 rounded-full w-5 h-5 animate-spin"></span>}
                                    {logoutLoading ? 'Logging out...' : 'Logout'}
                                </button>
                                <button
                                    onClick={() => router.push('/')}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition flex items-center justify-center gap-2 text-sm"
                                >
                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M3 12h18M3 12l7-7M3 12l7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Back to Store
                                </button>
                            </div>
                            {logoutError && <div className="mt-3 px-4 py-2 rounded bg-red-100 text-red-700 font-semibold">{logoutError}</div>}
                            {user.isAdmin &&
                                <div className="mt-6 text-center">
                                    <Link href="/Admin/mystore" className='mt-4  px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow transition text-sm'>
                                        Go to Admin Dasboard
                                    </Link>
                                </div>}
                        </div>
                    ) : null}

                    {/* Orders Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl shadow-lg p-6 md:p-8 mt-2">
                        <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2 justify-center">
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="7" cy="21" r="2" stroke="#0ea5e9" strokeWidth="2" /><circle cx="17" cy="21" r="2" stroke="#0ea5e9" strokeWidth="2" /></svg>
                            My Orders
                        </h2>
                        {ordersLoading ? (
                            <div className="flex justify-center items-center py-10">
                                <span className="loader border-2 border-t-2 border-blue-200 border-t-blue-600 rounded-full w-8 h-8 animate-spin"></span>
                            </div>
                        ) : ordersError ? (
                            <div className="mb-4 px-4 py-3 rounded bg-red-100 text-red-700 font-semibold">{ordersError}</div>
                        ) : orders.length === 0 ? (
                            <div className="text-gray-500 italic py-8">No orders found.</div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {orders.map(order => (
                                    <div
                                        key={order._id}
                                        className="rounded-2xl bg-white shadow-md border border-blue-100 p-4 flex flex-col gap-2 hover:shadow-xl transition group relative overflow-hidden min-w-0"
                                    >
                                        <div className="flex flex-wrap items-center justify-between mb-2 gap-2 min-w-0">
                                            <span className="font-mono text-xs text-blue-900 bg-blue-50 px-2 py-1 rounded truncate max-w-[90px]">#{order._id.slice(-8).toUpperCase()}</span>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1 min-w-0">
                                            <span className="font-bold text-green-700 text-lg whitespace-nowrap">Rs. {order.totalPrice.toFixed(2)}</span>
                                            {order.isDelivered ? (
                                                <span className="inline-block px-2 py-1 rounded-full bg-green-200 text-green-800 text-xs font-bold ml-2 whitespace-nowrap">Delivered</span>
                                            ) : (
                                                <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold ml-2 whitespace-nowrap">Processing</span>
                                            )}
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-bold ml-2 whitespace-nowrap max-w-[80px] truncate ${order.deliveryMethod === 'urgent' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}
                                                title={order.deliveryMethod === 'urgent' ? 'Urgent Delivery' : 'Regular Delivery'}
                                            >
                                                {order.deliveryMethod === 'urgent' ? 'Urgent' : 'Regular'}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 justify-center items-center mt-2">
                                            {order.orderItems.map((item, idx) => (
                                                <div key={idx} className="flex flex-col items-center bg-blue-50 rounded-lg p-2 shadow-sm min-w-[60px] max-w-[80px]">
                                                    <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded mb-1 border border-blue-100" />
                                                    <span className="text-xs text-gray-700 text-center truncate w-full" title={item.name}>{item.name.length > 12 ? item.name.slice(0, 12) + '…' : item.name}</span>
                                                    <span className="text-xs text-blue-700 font-bold">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`.loader { display: inline-block; vertical-align: middle; }`}</style>
        </div>
    )
}

export default ProfilePage
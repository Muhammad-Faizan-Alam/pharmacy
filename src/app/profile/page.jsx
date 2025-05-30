"use client";
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [logout, setLogout] = useState(false)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [error, setError] = useState(null);
    const [logoutError, setLogoutError] = useState(null);
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

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <h1 className="text-3xl font-bold text-blue-700 mb-6 drop-shadow">Profile</h1>
                    {loading ? (
                        <p className="text-gray-700">Loading user data...</p>
                    ) : error ? (
                        <div className="mb-4 px-4 py-3 rounded bg-red-100 text-red-700 font-semibold">{error}</div>
                    ) : user ? (
                        <div>
                            <p className="mb-4 text-gray-700">Welcome, {user.username}!</p>
                            <p className="mb-4 text-gray-700">Email: {user.email}</p>
                            <button
                                onClick={() => setLogout(true)}
                                className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                disabled={logoutLoading}
                            >
                                {logoutLoading && <span className="loader border-2 border-t-2 border-red-200 border-t-red-600 rounded-full w-5 h-5 animate-spin"></span>}
                                {logoutLoading ? 'Logging out...' : 'Logout'}
                            </button>
                            {logoutError && <div className="mt-3 px-4 py-2 rounded bg-red-100 text-red-700 font-semibold">{logoutError}</div>}
                        </div>
                    ) : null}
                </div>
            </div>
            <style jsx>{`.loader { display: inline-block; vertical-align: middle; }`}</style>
        </div>
    )
}

export default ProfilePage
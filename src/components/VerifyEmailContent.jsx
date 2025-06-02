'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const t = searchParams.get('token');
    setToken(t || '');
  }, [searchParams]);

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 drop-shadow">Verify Your Email</h1>
        {!verified ? (
          <>
            <p className="mb-6 text-gray-700">Click the button below to verify your email address.</p>
            {error && <div className="mb-4 px-4 py-3 rounded bg-red-100 text-red-700 font-semibold">{error}</div>}
            <button
              onClick={handleVerify}
              disabled={!token || loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-2"
            >
              {loading && <span className="loader border-2 border-t-2 border-blue-200 border-t-blue-600 rounded-full w-5 h-5 animate-spin"></span>}
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            {!token && <div className="text-red-500 text-sm mt-2">No token found in URL.</div>}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="mb-4 px-4 py-3 rounded bg-green-100 text-green-700 font-semibold">Your email has been verified successfully!</div>
            <Link
              href="/login"
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow transition"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
      <style jsx>{`.loader { display: inline-block; vertical-align: middle; }`}</style>
    </div>
  );
};

export default VerifyEmailPage;
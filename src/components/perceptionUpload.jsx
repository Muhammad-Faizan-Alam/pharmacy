'use client';
import { useState, useRef } from 'react';
import Tesseract from "tesseract.js";

export default function OCRPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rawText, setRawText] = useState('');
  const [cartMsg, setCartMsg] = useState('');
  const [showPopover, setShowPopover] = useState(false);
  const cardRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    setRawText('');
    setCartMsg('');
    setShowPopover(false);

    // Step 1: OCR in browser
    const { data: { text: ocrText } } = await Tesseract.recognize(file, "eng");
    setRawText(ocrText);

    // Step 2: Send OCR text to API for GPT extraction
    try {
      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ocrText }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.medicines);
        setShowPopover(true);
      } else setError(data.error || "Failed to extract medicines.");
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  };

  // Add to cart handler
  const handleAddToCart = async () => {
    if (!result || result.length === 0) return;
    setCartMsg('');
    let added = [];
    let notFound = [];

    for (const med of result) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: med.name, quantity: med.quantity }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        added.push(med.name);
      } else {
        notFound.push(med.name);
      }
    }

    if (added.length > 0 && notFound.length === 0) {
      setCartMsg("✅ All medicines added to cart!");
    } else if (added.length > 0) {
      setCartMsg(`✅ Added: ${added.join(", ")}. ❌ Not available: ${notFound.join(", ")}`);
    } else {
      setCartMsg("❌ None of the medicines are available in the store.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/90 rounded-2xl shadow-2xl p-6 mt-4 mb-8 border border-gray-100 backdrop-blur-lg relative" ref={cardRef}>
      <h2 className="text-2xl font-extrabold text-teal-700 mb-6 text-center tracking-tight">AI Prescription Reader</h2>
      <div className="flex flex-col items-center gap-4">
        <label className="w-full flex flex-col items-center px-4 py-6 bg-teal-50 text-teal-700 rounded-lg shadow-md tracking-wide uppercase border border-teal-200 cursor-pointer hover:bg-teal-100 transition">
          <svg className="w-8 h-8 mb-2 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-5 4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span className="text-base leading-normal mb-1">Select a prescription image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          {file && <span className="mt-2 text-sm text-teal-600">{file.name}</span>}
        </label>
        <button
          onClick={handleUpload}
          className="w-full px-6 py-2 mt-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold rounded-lg shadow hover:from-teal-600 hover:to-teal-800 transition disabled:opacity-60"
          disabled={loading || !file}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing...
            </span>
          ) : 'Extract Medicines'}
        </button>
      </div>

      {error && (
        <div className="mt-6 bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-center animate-pulse">
          {error}
        </div>
      )}

      {/* Popover for extracted medicines */}
      {showPopover && (
        <>
          {/* Overlay only over the card */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-2xl z-20"></div>
          <div className="absolute left-1/2 top-8 z-30 w-[95%] max-w-md -translate-x-1/2 shadow-2xl rounded-xl bg-white/95 border border-teal-200 p-6 animate-fade-in">
            <button
              className="absolute top-2 right-2 text-teal-700 hover:text-red-500 transition"
              onClick={() => setShowPopover(false)}
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="font-bold text-lg text-teal-800 mb-3 flex items-center gap-2">
              <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m-7 6v2a4 4 0 004 4h3m-7-6H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-2" />
              </svg>
              Extracted Medicines
            </h3>
            {result && result.length > 0 ? (
              <>
                <ul className="mb-4 space-y-2">
                  {result.map((med, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-teal-700">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 rounded-full shadow text-teal-600 font-bold">{idx + 1}</span>
                      <span className="font-semibold">{med.name}</span>
                      <span className="ml-auto text-xs bg-teal-200 text-teal-800 px-2 py-0.5 rounded-full">Qty: {med.quantity}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleAddToCart}
                  className="w-full px-5 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-lg shadow hover:from-green-600 hover:to-green-800 transition"
                >
                  Add All to Cart
                </button>
                {cartMsg && (
                  <div className="mt-3 text-center text-base font-medium rounded-lg px-3 py-2"
                    style={{
                      background: cartMsg.startsWith("✅") ? "linear-gradient(90deg,#d1fae5,#bbf7d0)" : "#fee2e2",
                      color: cartMsg.startsWith("✅") ? "#065f46" : "#b91c1c"
                    }}>
                    {cartMsg}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-500">No medicines detected.</p>
            )}
            {rawText && (
              <details className="mt-4">
                <summary className="cursor-pointer text-teal-700 font-semibold">Show Raw OCR Text</summary>
                <pre className="mt-2 p-2 bg-gray-50 rounded text-xs text-gray-600 max-h-32 overflow-auto">{rawText}</pre>
              </details>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Add this to your global CSS for a fade-in animation if you want:
// .animate-fade-in { animation: fadeIn 0.3s ease; }
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
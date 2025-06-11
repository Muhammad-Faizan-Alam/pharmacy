'use client';
import { useState } from 'react';
import Tesseract from "tesseract.js";

export default function OCRPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rawText, setRawText] = useState('');

  // const handleUpload = async () => {
  //   if (!file) {
  //     setError('Please select an image file.');
  //     return;
  //   }
  //   setLoading(true);
  //   setError('');
  //   setResult(null);
  //   setRawText('');

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const res = await fetch("/api/ocr", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       setResult(data.medicines);
  //       setRawText(data.raw_text);
  //     } else {
  //       setError(data.error || "Failed to extract medicines.");
  //     }
  //   } catch (err) {
  //     setError("Network error.");
  //   }
  //   setLoading(false);
  // };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setResult(null);
    setRawText('');

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
      if (res.ok) setResult(data.medicines);
      else setError(data.error || "Failed to extract medicines.");
    } catch {
      setError("Network error.");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Prescription Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Extract Medicines'}
      </button>

      {error && (
        <div className="mt-4 text-red-600">{error}</div>
      )}

      {result && (
        <div className="mt-6 p-4 border bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Extracted Medicines:</h3>
          {result.length > 0 ? (
            <ul>
              {result.map((med, idx) => (
                <li key={idx}>
                  <span className="font-medium">{med.name}</span> &mdash; Quantity: <span className="font-mono">{med.quantity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medicines detected.</p>
          )}
        </div>
      )}

      {/* {rawText && (
        <div className="mt-4 text-xs text-gray-500">
          <strong>Raw OCR Text:</strong>
          <pre>{rawText}</pre>
        </div>
      )} */}
    </div>
  );
}
"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-6">
      <div className="max-w-lg w-full bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center relative overflow-hidden">
        {/* Animated SVG: Pharmacy Radar Scanner */}
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="mb-6 animate-bounce-slow">
          {/* Radar base */}
          <circle cx="90" cy="110" r="50" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="4" />
          {/* Radar sweep */}
          <g>
            <path id="radar-sweep" d="M90 110 L90 60 A50 50 0 0 1 140 110 Z" fill="#38bdf8" fillOpacity="0.5">
              <animateTransform attributeName="transform" type="rotate" from="0 90 110" to="360 90 110" dur="2.5s" repeatCount="indefinite" />
            </path>
            <circle cx="90" cy="110" r="8" fill="#0ea5e9" />
            <circle cx="90" cy="110" r="3" fill="#fff" />
          </g>
          {/* Radar lines */}
          <g stroke="#0ea5e9" strokeWidth="2" strokeDasharray="4 4">
            <line x1="90" y1="110" x2="90" y2="60" />
            <line x1="90" y1="110" x2="140" y2="110" />
            <line x1="90" y1="110" x2="50" y2="110" />
            <line x1="90" y1="110" x2="126" y2="74" />
            <line x1="90" y1="110" x2="54" y2="74" />
          </g>
          {/* Animated pulse blip */}
          <circle cx="130" cy="110" r="6" fill="#fbbf24">
            <animate attributeName="r" values="6;12;6" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Pills and bottle */}
          <g>
            <rect x="60" y="145" width="18" height="10" rx="3" fill="#fbbf24" stroke="#f59e42" strokeWidth="2" />
            <ellipse cx="120" cy="145" rx="8" ry="3" fill="#bae6fd" />
            <rect x="110" y="150" width="10" height="16" rx="3" fill="#fff" stroke="#0ea5e9" strokeWidth="2" />
            <rect x="112" y="146" width="6" height="6" rx="2" fill="#0ea5e9" />
          </g>
        </svg>
        <h1 className="text-5xl font-extrabold text-blue-900 mb-2 drop-shadow">404</h1>
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 text-center mb-6 max-w-xs">
          Oops! The page you are looking for doesn't exist.<br/>
          Our pharmacy robot couldn't find your prescription!
        </p>
        <Link href="/store">
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition text-lg">Back to Store</span>
        </Link>
      </div>
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
      `}</style>
    </div>
  );
}

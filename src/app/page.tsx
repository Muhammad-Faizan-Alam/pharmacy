'use client';
import { useEffect } from "react";
import { NextResponse } from "next/server";
import axios from "axios";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  useEffect(() => {
    const user = async () => {
      try {
        const userdata = await axios.post('/api/users/me');
        console.log("User Data:", userdata.data);
        
        if (userdata.data.data.isAdmin) {
          router.push(`/Admin/mystore`);
        } else {
          router.push('/store');
        }
      } catch (error) {
        return NextResponse.json({error: "Error fetching user data" + error}, { status: 500 });
      }
    }
    user();
  }, []);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#343148FF] to-[#D7C49EFF] relative overflow-hidden">
      <div className="flex flex-col items-center justify-center flex-1 z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin-slow mb-8">
            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="45" cy="45" r="40" stroke="#D7C49EFF" strokeWidth="8" fill="none" />
              <circle cx="45" cy="45" r="32" stroke="#343148FF" strokeWidth="6" fill="none" strokeDasharray="50 100" />
              <circle cx="45" cy="45" r="24" stroke="#D7C49EFF" strokeWidth="4" fill="none" strokeDasharray="30 60" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in text-center">
            Please wait...<br />
            <span className="text-[#D7C49EFF]">Saydaliyya</span> is preparing your experience
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in delay-200 text-center max-w-xl">
            Loading your personalized pharmacy journey. This will only take a moment.
          </p>
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 2.5s linear infinite; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in.delay-200 { animation-delay: .2s; }
      `}</style>
    </main>
  );
};

export default page;

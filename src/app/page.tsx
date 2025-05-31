'use client';
import { MedicineCarousel } from "../components/MedicineCarousel";
import ArticlesSection from "../components/article-section";
import FeaturesSection from "../components/FeaturesSection";
import BrandMarqee from "../components/BrandsMarquee";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fade-in">
          Welcome to <span className="text-[#D7C49EFF]">E-Pharmacy</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/80 mb-8 animate-fade-in delay-200 text-center max-w-xl">
          Your trusted online pharmacy for medicines, health products, and wellness essentials. Fast delivery, expert care, and a healthier tomorrow.
        </p>
        <div className="flex flex-wrap gap-8 justify-center items-center mb-10 animate-fade-in delay-400">
          {/* SVG: Tablet */}
          <div className="w-24 h-24 flex items-center justify-center animate-bounce-slow">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="32" cy="32" rx="28" ry="14" fill="#D7C49EFF" />
              <ellipse cx="32" cy="32" rx="24" ry="10" fill="#fff" />
              <rect x="16" y="28" width="32" height="8" rx="4" fill="#343148FF" />
            </svg>
          </div>
          {/* SVG: Capsule */}
          <div className="w-24 h-24 flex items-center justify-center animate-bounce-slow2">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="24" width="40" height="16" rx="8" fill="#D7C49EFF" />
              <rect x="32" y="24" width="20" height="16" rx="8" fill="#fff" />
              <rect x="12" y="24" width="20" height="16" rx="8" fill="#343148FF" />
            </svg>
          </div>
          {/* SVG: Syringe */}
          <div className="w-24 h-24 flex items-center justify-center animate-bounce-slow3">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="28" y="8" width="8" height="32" rx="4" fill="#D7C49EFF" />
              <rect x="24" y="40" width="16" height="8" rx="4" fill="#343148FF" />
              <rect x="30" y="48" width="4" height="8" rx="2" fill="#fff" />
              <rect x="30" y="56" width="4" height="4" rx="2" fill="#D7C49EFF" />
            </svg>
          </div>
        </div>
        <a href="/store" className="mt-4 px-8 py-3 rounded-full bg-[#D7C49EFF] text-[#343148FF] font-bold text-lg shadow-lg hover:bg-[#bba87a] transition animate-fade-in delay-700">
          Enter Store
        </a>
      </div>
      {/* Animated floating icons */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <svg className="absolute left-10 top-20 animate-float" width="48" height="48" viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="20" ry="8" fill="#D7C49EFF" opacity="0.2"/></svg>
        <svg className="absolute right-16 top-32 animate-float2" width="32" height="32" viewBox="0 0 32 32"><rect x="4" y="12" width="24" height="8" rx="4" fill="#343148FF" opacity="0.15"/></svg>
        <svg className="absolute left-1/2 bottom-10 animate-float3" width="40" height="40" viewBox="0 0 40 40"><rect x="16" y="0" width="8" height="40" rx="4" fill="#D7C49EFF" opacity="0.12"/></svg>
      </div>
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 1s cubic-bezier(.4,0,.2,1) both; }
        .animate-fade-in.delay-200 { animation-delay: .2s; }
        .animate-fade-in.delay-400 { animation-delay: .4s; }
        .animate-fade-in.delay-700 { animation-delay: .7s; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-18px);} }
        .animate-bounce-slow { animation: bounce-slow 2.5s infinite cubic-bezier(.4,0,.2,1); }
        @keyframes bounce-slow2 { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-12px);} }
        .animate-bounce-slow2 { animation: bounce-slow2 2.2s infinite cubic-bezier(.4,0,.2,1); }
        @keyframes bounce-slow3 { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }
        .animate-bounce-slow3 { animation: bounce-slow3 2.8s infinite cubic-bezier(.4,0,.2,1); }
        @keyframes float { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-20px);} }
        .animate-float { animation: float 6s infinite ease-in-out; }
        @keyframes float2 { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-10px);} }
        .animate-float2 { animation: float2 7s infinite ease-in-out; }
        @keyframes float3 { 0%, 100% { transform: translateY(0);} 50% { transform: translateY(-15px);} }
        .animate-float3 { animation: float3 8s infinite ease-in-out; }
      `}</style>
    </main>
  );
};

export default page;

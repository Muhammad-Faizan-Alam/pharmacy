"use client";
// components/BrandsMarquee.jsx
import React from "react";
import Image from "next/image";

const BrandsMarquee = () => {
  const brandLogos = [
    { src: "/asset/brand/abbott.webp", alt: "Abbott" },
    { src: "/asset/brand/lilly.webp", alt: "Eli Lilly" },
    { src: "/asset/brand/novartis_1.webp", alt: "Novartis" },
    { src: "/asset/brand/novo.webp", alt: "Novo Nordisk" },
    { src: "/asset/brand/pfizer.webp", alt: "Pfizer" },
    { src: "/asset/brand/roche.webp", alt: "Roche" },
    { src: "/asset/brand/sanofi.webp", alt: "Sanofi" },
  ];

  // Duplicate the array for seamless looping
  const duplicatedBrands = [...brandLogos, ...brandLogos];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mx-auto container max-w-full items-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-[#00786f] text-5xl font-bold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4"
            />
          </svg>
          <h2 className="text-4xl font-bold text-center ml-4 py-10 text-[#00786f]">
            Top Brands
          </h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          
          <div className="flex">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {duplicatedBrands.map((brand, index) => (
                <div
                  key={`${brand.alt}-${index}`}
                  className="mx-2 inline-flex items-center justify-center h-44 w-[220px] border-2 border-gray-200 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
                >
                  <div className="p-4 w-full h-full flex items-center justify-center">
                    <Image
                      src={brand.src}
                      alt={brand.alt}
                      width={150}
                      height={80}
                      className="object-contain max-h-[80px] w-auto"
                      priority={index < 7}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-flex;
        }
      `}</style>
    </section>
  );
};

export default BrandsMarquee;

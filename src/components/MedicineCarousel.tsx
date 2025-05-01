// app/components/MedicineCarousel.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import type { CarouselApi } from "@/components/ui/carousel";

const MEDICINE_CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "Summer Health Essentials",
    description: "Get 20% off on all seasonal medicines",
    image: "/asset/img/1.webp",
    cta: "Shop Now",
  },
  {
    id: 2,
    title: "Diabetes Care",
    description: "Premium glucose monitors now in stock",
    image: "/asset/img/2.webp",
    cta: "View Products",
  },
  {
    id: 3,
    title: "Vitamins & Supplements",
    description: "Boost your immunity with our premium range",
    image: "/asset/img/3.webp",
    cta: "Explore",
  },
  {
    id: 4,
    title: "Baby Care Products", 
    description: "Gentle and safe solutions for your little ones",
    image: "/asset/img/4.webp",
    cta: "Discover",
  },
  {
    id: 5,
    title: "Senior Health Solutions",
    description: "Specialized care for golden years",
    image: "/asset/img/5.webp",
    cta: "Learn More",
  },
  {
    id: 6,
    title: "Senior Health Solutions",
    description: "Specialized care for golden years",
    image: "/asset/img/6.webp",
    cta: "Learn More",
  },
  {
    id: 7,
    title: "Senior Health Solutions",
    description: "Specialized care for golden years",
    image: "/asset/img/7.webp",
    cta: "Learn More",
  },
  {
    id: 8,
    title: "Senior Health Solutions",
    description: "Specialized care for golden years",
    image: "/asset/img/8.webp",
    cta: "Learn More",
  },
];

export function MedicineCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
  
    // Initialize carousel state
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
  
    // Add event listener
    const handleSelect = () => {
      console.log("Current slide:", api.selectedScrollSnap() + 1);
      setCurrent(api.selectedScrollSnap() + 1);
    };
    
    api.on("select", handleSelect);
  
    // Cleanup function
    return () => {
      if (api) {
        api.off("select", handleSelect);
      }
    };
  }, [api]);

  return (
    <div className="relative w-full max-w-8xl mx-auto px-2 py-2">
      <Carousel
        setApi={setApi}
        className="w-full rounded-xl overflow-hidden shadow-lg border border-gray-200"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {MEDICINE_CAROUSEL_ITEMS.map((item) => (
            <CarouselItem key={item.id}>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8 md:p-16">
                  <div className="text-white max-w-md">
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                      {item.title}
                    </h2>
                    <p className="text-lg mb-4">{item.description}</p>
                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full font-medium transition hover:scale-105">
                      {item.cta}
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-800 border-none size-10 shadow-md hover:scale-110 transition" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-800 border-none size-10 shadow-md hover:scale-110 transition" />
        
        {/* Indicators - now properly showing 5 dots */}
        <div className="flex justify-center absolute left-1/2 bottom-4 gap-2 transform -translate-x-1/2">
          {Array.from({ length: MEDICINE_CAROUSEL_ITEMS.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index + 1 ? "bg-teal-600 w-6" : "bg-gray-300 w-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
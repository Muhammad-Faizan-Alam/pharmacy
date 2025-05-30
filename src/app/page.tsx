'use client';
import { MedicineCarousel } from "../components/MedicineCarousel";
import ArticlesSection from "../components/article-section";
import FeaturesSection from "../components/FeaturesSection";
import BrandMarqee from "../components/BrandsMarquee";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
const page = () => {
  return (
    <>
      <Navbar />
      <MedicineCarousel />
      <ArticlesSection />
      <FeaturesSection />
      <BrandMarqee />
      <Footer />
    </>
  );
};

export default page;

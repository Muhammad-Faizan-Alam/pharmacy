'use client';
import { MedicineCarousel } from "../components/MedicineCarousel";
import ArticlesSection from "../components/article-section";
import FeaturesSection from "../components/FeaturesSection";
import BrandMarqee from "../components/BrandsMarquee";
const page = () => {
  return (
    <>
      <MedicineCarousel />
      <ArticlesSection />
      <FeaturesSection />
      <BrandMarqee />
    </>
  );
};

export default page;

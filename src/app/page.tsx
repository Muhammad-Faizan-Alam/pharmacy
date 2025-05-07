import React from "react";
// import Navbar from "../components/Navbar";
import { MedicineCarousel } from "../components/MedicineCarousel";
// import  medicincard  from "../components/medicincard";
import ArticleCard from "../components/medicincard";
import ArticlesSection from "../components/article-section";
import FeaturesSection from "../components/FeaturesSection";
import BrandMarqee from "../components/BrandsMarquee";
// import { Footer } from "@/components/Footer";
import ProductCard from "../components/ProductCard";
const page = () => {
  return (
    <>
      {/* <Navbar /> */}
      <MedicineCarousel />
      <ArticlesSection />
      <FeaturesSection/>
      <BrandMarqee/>
      <ProductCard />
      {/* <Footer /> */}
      {/* https://mocki.io/v1/56a84abc-19f6-4620-8aff-eb24593c5412 */}
    </>
  );
};

export default page;

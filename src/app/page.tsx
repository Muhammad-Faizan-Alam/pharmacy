'use client';
// import React, { useEffect } from "react";
// import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';
import { MedicineCarousel } from "../components/MedicineCarousel";
// import  medicincard  from "../components/medicincard";
import ArticleCard from "../components/medicincard";
import ArticlesSection from "../components/article-section";
import FeaturesSection from "../components/FeaturesSection";
import BrandMarqee from "../components/BrandsMarquee";
// import { Footer } from "@/components/Footer";
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

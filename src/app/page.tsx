import React from "react";
import Navbar from "../components/Navbar";
import { MedicineCarousel } from "../components/MedicineCarousel";
import { Footer } from "@/components/Footer";
const page = () => {
  return (
    <>
      <Navbar />
      <MedicineCarousel />
      <Footer />
    </>
  );
};

export default page;

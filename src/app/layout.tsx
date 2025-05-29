// src/app/layout.tsx
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductsProvider } from "@/app/Context/ProductsContext"; // <- Import your context
import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper"; // <- Import your session wrapper

export const metadata: Metadata = {
  title: "MediCare Pharmacy",
  description: "Your trusted online pharmacy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <ProductsProvider> {/* ✅ Wrap with context provider */}
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ProductsProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
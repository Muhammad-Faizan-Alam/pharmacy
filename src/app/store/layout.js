'use client';
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductsProvider } from "@/app/Context/ProductsContext";

export default function ArticlesLayout({ children }) {
    return (
        <div>
            <ProductsProvider> {/* ✅ Wrap with context provider */}
                <Navbar />
                <main>{children}</main>
                <Footer />
            </ProductsProvider>
        </div>
    );
}

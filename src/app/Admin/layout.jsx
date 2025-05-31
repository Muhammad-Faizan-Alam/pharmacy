'use client';
import { Footer } from "@/components/Footer";
import { ProductsProvider } from "@/app/Context/ProductsContext";
import AdminNavbar from "../../components/adminNavbar";

export default function AdminLayout({ children }) {
    return (
        <div>
            <ProductsProvider> {/* ✅ Wrap with context provider */}
                <AdminNavbar />
                <main>{children}</main>
                <Footer />
            </ProductsProvider>
        </div>
    );
}

import AdminFooter from "@/components/adminFooter";
import { ProductsProvider } from "@/app/Context/ProductsContext";
import AdminNavbar from "../../components/adminNavbar";

export default function AdminLayout({ children }) {
    return (
        <div>
            <ProductsProvider> {/* ✅ Wrap with context provider */}
                <AdminNavbar />
                <main>{children}</main>
                <AdminFooter />
            </ProductsProvider>
        </div>
    );
}

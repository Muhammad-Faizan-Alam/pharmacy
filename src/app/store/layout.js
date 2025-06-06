'use client';
import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductsProvider } from "@/app/Context/ProductsContext";

export default function ArticlesLayout({ children }) {
    useEffect(() => {
        const existingScript = document.getElementById("KBUl1WdY9Zmh4cQIvbo3v");
        if (existingScript) return;

        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "KBUl1WdY9Zmh4cQIvbo3v";
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <ProductsProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </ProductsProvider>
        </div>
    );
}
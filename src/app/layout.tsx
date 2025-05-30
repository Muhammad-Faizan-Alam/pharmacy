
import type { Metadata } from "next";
import "./globals.css";

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
            <main>{children}</main>
      </body>
    </html>
  );
}
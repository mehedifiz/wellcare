import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// <CHANGE> Import Navbar and Footer from shared folder
import Navbar from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// <CHANGE> Updated metadata for WellCare
export const metadata: Metadata = {
  title: "WellCare - Your Trusted Healthcare Partner",
  description:
    "Delivering trusted healthcare with compassion and excellence. Book appointments, explore services, and find experienced doctors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased mx-5">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

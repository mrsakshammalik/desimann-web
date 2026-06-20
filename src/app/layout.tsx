import type { Metadata } from "next";
import { Playfair_Display, Poppins, Inter } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desimann — Dil Se Desi, Swad Mein Asli",
  description:
    "India's most trusted homemade food brand. Premium pickles, spices & oils crafted from 80+ year-old family recipes with farm-fresh, preservative-free ingredients.",
};

import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}

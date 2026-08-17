import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@/app/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VINYASA — Architecture & Interior Design Studio",
  description:
    "International luxury architecture and interior design studio. Specializing in bespoke residential sanctuaries, commercial spaces, and spatial interventions across New York, London, and Tokyo.",
  keywords: [
    "Architecture Studio",
    "Interior Design",
    "Luxury Residential Design",
    "Commercial Architecture",
    "Bespoke Furniture",
    "Turnkey Interior Design",
  ],
  openGraph: {
    title: "VINYASA — Architecture & Interior Design Studio",
    description:
      "Crafting spatial elegance through tactile materials and deliberate proportion.",
    url: "https://vinyasa-architecture.com",
    siteName: "Vinyasa Architecture",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-[#F9F8F5] text-[#1E1C1A]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

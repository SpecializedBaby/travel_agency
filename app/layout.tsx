import type { Metadata } from "next";

import { Archivo, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const archivoSans = Archivo({
  variable: "--font-archivo-sans",
  subsets: ["latin"],
});

const manropeSans = Manrope({
  variable: "--font-manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FieryTrips - authors trips",
  description: "We are a company of young enthusiasts in love with the road, organizing tours for like-minded people.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className={`${poppins.variable} font-sans`}>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}

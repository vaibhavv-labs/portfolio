import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ParticleField from "@/components/ParticleField";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Vaibhav Bhoyate | AI & Data Science Engineer",
  description: "Portfolio of Vaibhav Bhoyate — AI & Data Science Engineer specializing in machine learning, NLP, and intelligent systems. Building scalable AI solutions.",
  keywords: ["AI Engineer", "Data Science", "Machine Learning", "Portfolio", "Vaibhav Bhoyate"],
  authors: [{ name: "Vaibhav Bhoyate" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Vaibhav Bhoyate | AI & Data Science Engineer",
    description: "AI & Data Science Engineer building intelligent systems",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <CustomCursor />
        <ParticleField />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

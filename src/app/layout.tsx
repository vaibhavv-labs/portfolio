import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vaibhav Bhoyate — AI Engineer & Data Scientist",
  description:
    "Portfolio of Vaibhav Bhoyate — AI & Data Science student building intelligent systems with Machine Learning, Deep Learning, and modern web technologies.",
  authors: [{ name: "Vaibhav Bhoyate" }],
  keywords: [
    "Vaibhav Bhoyate",
    "AI Engineer",
    "Data Scientist",
    "Machine Learning",
    "Python Developer",
    "Portfolio",
    "Next.js",
    "SNJB College",
    "ML Engineer India",
  ],
  creator: "Vaibhav Bhoyate",
  robots: "index, follow",
  openGraph: {
    title: "Vaibhav Bhoyate | AI Engineer & Data Scientist",
    description:
      "AI & Data Science student building intelligent systems with ML, DL, and modern web technologies.",
    url: "https://vaibhav-portfolio.vercel.app",
    siteName: "Vaibhav Bhoyate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Bhoyate | AI Engineer & Data Scientist",
    description:
      "AI & Data Science student building intelligent systems with ML, DL, and modern web technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K2 Makeover Studio - Premium Bridal & Event Makeup",
  description: "Premium bridal, engagement, and event makeup services. Portfolio, pricing, and booking for makeup artist in Coimbatore.",
  keywords: "bridal makeup artist, makeup services, engagement makeup, event makeup, Coimbatore",
  openGraph: {
    title: "K2 Makeover Studio - Premium Bridal & Event Makeup",
    description: "Premium bridal and event makeup services with 3+ years experience",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <meta name="theme-color" content="#D4A373" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF8F5] to-[#F5F5F5]">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}

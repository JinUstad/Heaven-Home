import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { Navbar } from "@/components/Navbar";
import { ActiveUserTracker } from "@/components/ActiveUserTracker";
import { Footer } from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heavenhome.vercel.app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#1d3227",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Heaven Home | Premium Kitchen Essentials",
    template: "%s | Heaven Home",
  },
  description: "Discover Heaven Home's premium kitchenware, elegant organizers, smart kitchen dispensers, and modern essentials designed to elevate every culinary moment.",
  keywords: [
    "Heaven Home",
    "kitchen essentials",
    "premium kitchenware",
    "smart kitchen tools",
    "oil spray dispenser",
    "spice organizer",
    "buy kitchen products online",
    "modern kitchen organizers India",
  ],
  authors: [{ name: "Heaven Home", url: SITE_URL }],
  creator: "Heaven Home",
  publisher: "Heaven Home",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Heaven Home | Premium Kitchen Essentials",
    description: "Elevate every culinary moment with Heaven Home's thoughtfully designed kitchenware and organizers.",
    url: SITE_URL,
    siteName: "Heaven Home",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Heaven Home Premium Kitchen Essentials",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heaven Home | Premium Kitchen Essentials",
    description: "Elevate every culinary moment with Heaven Home's premium kitchenware.",
    images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop"],
    creator: "@heavenhome",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="shortcut icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <CartProvider>
          <ActiveUserTracker />
          <Toaster position="bottom-right" reverseOrder={false} />
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
        <Script id="pwa-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) { console.log('ServiceWorker registration successful'); },
                  function(err) { console.log('ServiceWorker registration failed: ', err); }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}

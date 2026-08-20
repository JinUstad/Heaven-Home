import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Jost, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { Navbar } from "@/components/Navbar";
import { ActiveUserTracker } from "@/components/ActiveUserTracker";
import { Footer } from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
import { IosPwaPrompt } from "@/components/IosPwaPrompt";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heavenhome.vercel.app";

const jost = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
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
    default: "Heaven Jewels | Premium Jewellery Collection",
    template: "%s | Heaven Jewels",
  },
  description: "Discover Heaven Jewels's premium luxury jewellery, elegant diamond necklaces, statement rings, and modern fashion essentials designed to elevate your style.",
  keywords: [
    "Heaven Jewels",
    "premium jewellery",
    "luxury necklaces",
    "diamond rings",
    "gold bracelets",
    "buy jewellery online",
    "modern fashion accessories India",
  ],
  authors: [{ name: "Heaven Jewels", url: SITE_URL }],
  creator: "Heaven Jewels",
  publisher: "Heaven Jewels",
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
      { url: "/favicon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.jpg",
    apple: [
      { url: "/favicon.jpg", sizes: "180x180", type: "image/jpeg" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Heaven Jewels",
  },
  openGraph: {
    title: "Heaven Jewels | Premium Jewellery Collection",
    description: "Discover Heaven Jewels's premium luxury jewellery, elegant diamond necklaces, statement rings, and modern fashion essentials designed to elevate your style.",
    url: SITE_URL,
    siteName: "Heaven Jewels",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Heaven Jewels Premium Kitchen Essentials",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heaven Jewels | Premium Kitchen Essentials",
    description: "Elevate every culinary moment with Heaven Jewels's premium kitchenware.",
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
      className={`${jost.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/favicon.jpg" type="image/jpeg" />
        {/* Apple iOS PWA Support */}
        <link rel="apple-touch-icon" href="/favicon.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.jpg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon.jpg" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon.jpg" />
        <link rel="apple-touch-icon-precomposed" href="/favicon.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Heaven Jewels" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Heaven Jewels" />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans">
        <CartProvider>
          <ActiveUserTracker />
          <Toaster position="bottom-right" reverseOrder={false} />
          <Navbar />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
          <IosPwaPrompt />
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

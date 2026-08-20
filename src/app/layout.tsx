import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
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
    default: "Heaven Jewels | Premium Kitchen Essentials",
    template: "%s | Heaven Jewels",
  },
  description: "Discover Heaven Jewels's premium kitchenware, elegant organizers, smart kitchen dispensers, and modern essentials designed to elevate every culinary moment.",
  keywords: [
    "Heaven Jewels",
    "kitchen essentials",
    "premium kitchenware",
    "smart kitchen tools",
    "oil spray dispenser",
    "spice organizer",
    "buy kitchen products online",
    "modern kitchen organizers India",
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
      { url: "/heavenjewels.PNG", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: "/heavenjewels.PNG",
    apple: [
      { url: "/heavenjewels.PNG", sizes: "180x180", type: "image/png" },
      { url: "/heavenjewels.PNG", sizes: "152x152", type: "image/png" },
      { url: "/heavenjewels.PNG", sizes: "120x120", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Heaven Jewels",
  },
  openGraph: {
    title: "Heaven Jewels | Premium Kitchen Essentials",
    description: "Elevate every culinary moment with Heaven Jewels's thoughtfully designed kitchenware and organizers.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/heavenjewels.PNG" type="image/png" />
        <link rel="shortcut icon" href="/heavenjewels.PNG" type="image/png" />
        {/* Apple iOS PWA Support */}
        <link rel="apple-touch-icon" href="/heavenjewels.PNG" />
        <link rel="apple-touch-icon" sizes="180x180" href="/heavenjewels.PNG" />
        <link rel="apple-touch-icon" sizes="152x152" href="/heavenjewels.PNG" />
        <link rel="apple-touch-icon" sizes="120x120" href="/heavenjewels.PNG" />
        <link rel="apple-touch-icon-precomposed" href="/heavenjewels.PNG" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Heaven Jewels" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Heaven Jewels" />
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

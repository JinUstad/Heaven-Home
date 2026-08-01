import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/useCart";
import { Navbar } from "@/components/Navbar";
import { ActiveUserTracker } from "@/components/ActiveUserTracker";
import { Footer } from "@/components/Footer";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Heaven Home | Premium Furniture & Interior Design",
  description: "Elevate your living spaces with Heaven Home's premium collection of handcrafted furniture, timeless lighting, and luxury home decor. Discover your perfect piece today.",
  keywords: "luxury furniture, interior design, premium decor, modern sofas, luxury lighting, Heaven Home",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Heaven Home | Premium Furniture & Decor",
    description: "Elevate your living spaces with Heaven Home's premium collection of handcrafted furniture and timeless design.",
    url: "https://heavenhome.example.com",
    siteName: "Heaven Home",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Heaven Home Premium Furniture",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heaven Home | Premium Furniture & Decor",
    description: "Elevate your living spaces with Heaven Home's premium collection of handcrafted furniture and timeless design.",
    images: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop"],
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

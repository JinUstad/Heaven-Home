import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export const metadata: Metadata = {
  title: 'Explore Premium Kitchenware & Home Collection',
  description: 'Shop Heaven Home’s curated collection of modern kitchen essentials, smart oil dispensers, space-saving organizers, and timeless interior lifestyle products in India.',
  keywords: [
    'buy kitchen products online',
    'kitchenware online India',
    'Heaven Home collection',
    'smart organizers',
    'oil spray dispenser bottle',
    'spice jars set',
    'modern kitchen accessories',
  ],
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Explore Premium Kitchenware & Home Collection | Heaven Home',
    description: 'Shop Heaven Home’s curated collection of modern kitchen essentials and organizers.',
    url: `${SITE_URL}/products`,
    siteName: 'Heaven Home',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Heaven Home Products Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Premium Kitchenware & Home Collection | Heaven Home',
    description: 'Shop Heaven Home’s curated collection of modern kitchen essentials and organizers.',
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop'],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

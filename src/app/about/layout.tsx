import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export const metadata: Metadata = {
  title: 'About Us | Our Story, Craftsmanship & Mission',
  description: 'Learn about Heaven Jewels’s mission to bring elegance, smart organization, and timeless kitchen essentials to homes across India.',
  keywords: [
    'About Heaven Jewels',
    'kitchen brand India',
    'premium home essentials story',
    'Heaven Jewels craftsmanship',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Heaven Jewels | Where Innovation Meets Everyday Cooking',
    description: 'Learn about Heaven Jewels’s mission to bring elegance, smart organization, and timeless kitchen essentials to homes across India.',
    url: `${SITE_URL}/about`,
    siteName: 'Heaven Jewels',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'About Heaven Jewels',
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

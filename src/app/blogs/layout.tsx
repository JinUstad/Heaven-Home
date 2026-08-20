import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export const metadata: Metadata = {
  title: 'Heaven Jewels Journal | Interior Inspiration, Kitchen Styling & Guides',
  description: 'Read the latest styling guides, kitchen organization tips, smart cooking hacks, and design trends curated by Heaven Jewels experts.',
  keywords: [
    'kitchen organization tips',
    'home decor inspiration',
    'modern kitchen styling',
    'Heaven Jewels blog',
    'smart home ideas India',
  ],
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Heaven Jewels Journal | Interior Inspiration & Kitchen Styling Guides',
    description: 'Read the latest styling guides, kitchen organization tips, and interior trends curated by Heaven Jewels experts.',
    url: `${SITE_URL}/blogs`,
    siteName: 'Heaven Jewels',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Heaven Jewels Journal and Lifestyle Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heaven Jewels Journal | Interior Inspiration & Kitchen Styling Guides',
    description: 'Read the latest styling guides, kitchen organization tips, and interior trends curated by Heaven Jewels experts.',
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop'],
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

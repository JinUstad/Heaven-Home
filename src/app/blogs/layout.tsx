import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export const metadata: Metadata = {
  title: 'Heaven Home Journal | Interior Inspiration, Kitchen Styling & Guides',
  description: 'Read the latest styling guides, kitchen organization tips, smart cooking hacks, and design trends curated by Heaven Home experts.',
  keywords: [
    'kitchen organization tips',
    'home decor inspiration',
    'modern kitchen styling',
    'Heaven Home blog',
    'smart home ideas India',
  ],
  alternates: {
    canonical: '/blogs',
  },
  openGraph: {
    title: 'Heaven Home Journal | Interior Inspiration & Kitchen Styling Guides',
    description: 'Read the latest styling guides, kitchen organization tips, and interior trends curated by Heaven Home experts.',
    url: `${SITE_URL}/blogs`,
    siteName: 'Heaven Home',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Heaven Home Journal and Lifestyle Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heaven Home Journal | Interior Inspiration & Kitchen Styling Guides',
    description: 'Read the latest styling guides, kitchen organization tips, and interior trends curated by Heaven Home experts.',
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

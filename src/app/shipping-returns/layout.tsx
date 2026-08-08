import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export const metadata: Metadata = {
  title: 'Shipping & Returns Policy | Heaven Home',
  description: 'Understand Heaven Home’s dispatch timelines, courier delivery partners across India, parcel tracking, and return/replacement policy.',
  alternates: {
    canonical: '/shipping-returns',
  },
  openGraph: {
    title: 'Shipping & Return Policy | Heaven Home',
    description: 'Understand Heaven Home’s dispatch timelines, courier delivery partners across India, and return policy.',
    url: `${SITE_URL}/shipping-returns`,
  },
};

export default function ShippingReturnsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

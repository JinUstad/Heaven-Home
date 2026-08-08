import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export const metadata: Metadata = {
  title: 'Terms of Service | Heaven Home',
  description: 'Read the Terms and Conditions for using Heaven Home website, ordering online products, payment terms, and user agreements.',
  alternates: {
    canonical: '/terms-of-service',
  },
  openGraph: {
    title: 'Terms of Service | Heaven Home',
    description: 'Read the Terms and Conditions for using Heaven Home website.',
    url: `${SITE_URL}/terms-of-service`,
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data: blog } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (!blog) {
      return {
        title: 'Blog Article | Heaven Home',
        description: 'Read insightful home design, kitchen organizing, and lifestyle articles on Heaven Home.',
      };
    }

    const mainImage = blog.image_url || `${SITE_URL}/logo.png`;
    const cleanDesc = (blog.excerpt || blog.content || 'Discover modern home decor and kitchen organizing inspirations from Heaven Home.')
      .replace(/[#*`_>\[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);

    const title = `${blog.title} | Heaven Home Blog`;

    return {
      title,
      description: cleanDesc,
      keywords: [
        blog.title,
        blog.category || 'Kitchen & Home',
        blog.author || 'Heaven Home',
        'home styling tips',
        'kitchen organization ideas',
        'interior design blog India',
      ],
      alternates: {
        canonical: `/blogs/${id}`,
      },
      openGraph: {
        title: `${blog.title} | Heaven Home`,
        description: cleanDesc,
        url: `${SITE_URL}/blogs/${id}`,
        siteName: 'Heaven Home',
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
        type: 'article',
        publishedTime: blog.published_at || blog.created_at,
        authors: [blog.author || 'Heaven Home'],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${blog.title} | Heaven Home`,
        description: cleanDesc,
        images: [mainImage],
      },
    };
  } catch {
    return {
      title: 'Blog Article | Heaven Home',
      description: 'Explore kitchen decor guides and tips.',
    };
  }
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

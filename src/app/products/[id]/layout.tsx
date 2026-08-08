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
    const { data: product } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();

    if (!product) {
      return {
        title: 'Product Details | Heaven Home',
        description: 'Explore premium home & kitchen essentials at Heaven Home.',
      };
    }

    let images: string[] = [];
    if (Array.isArray(product.image_url)) {
      images = product.image_url;
    } else if (typeof product.image_url === 'string') {
      if (product.image_url.startsWith('[') && product.image_url.endsWith(']')) {
        try {
          images = JSON.parse(product.image_url);
        } catch {
          images = [product.image_url];
        }
      } else {
        images = [product.image_url];
      }
    }

    const mainImage = images[0] || `${SITE_URL}/logo.png`;
    const cleanDesc = (
      product.description ||
      `Buy ${product.name} at best price online in India. Premium kitchenware, high quality finish & fast shipping from Heaven Home.`
    )
      .replace(/[#*`_>\[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);

    const title = `${product.name} | Buy Online | Heaven Home`;

    return {
      title,
      description: cleanDesc,
      keywords: [
        product.name,
        product.categories?.name || 'Kitchen Essentials',
        'buy online India',
        'Heaven Home products',
        'premium kitchen tools',
      ],
      alternates: {
        canonical: `/products/${id}`,
      },
      openGraph: {
        title: `${product.name} - ₹${product.price} | Heaven Home`,
        description: cleanDesc,
        url: `${SITE_URL}/products/${id}`,
        siteName: 'Heaven Home',
        images: [
          {
            url: mainImage,
            width: 800,
            height: 800,
            alt: product.name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} - ₹${product.price} | Heaven Home`,
        description: cleanDesc,
        images: [mainImage],
      },
    };
  } catch {
    return {
      title: 'Product Details | Heaven Home',
      description: 'Explore handcrafted luxury furniture and modern kitchenware.',
    };
  }
}

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

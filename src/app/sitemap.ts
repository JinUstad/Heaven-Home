import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/shipping-returns`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id, updated_at, created_at');

    if (products && products.length > 0) {
      productRoutes = products.map((prod) => ({
        url: `${SITE_URL}/products/${prod.id}`,
        lastModified: prod.updated_at ? new Date(prod.updated_at) : new Date(prod.created_at || Date.now()),
        changeFrequency: 'daily',
        priority: 0.85,
      }));
    }
  } catch (err) {
    console.error('Error generating product sitemap routes:', err);
  }

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: blogs } = await supabase
      .from('blogs')
      .select('id, published_at, created_at');

    if (blogs && blogs.length > 0) {
      blogRoutes = blogs.map((blog) => ({
        url: `${SITE_URL}/blogs/${blog.id}`,
        lastModified: blog.published_at ? new Date(blog.published_at) : new Date(blog.created_at || Date.now()),
        changeFrequency: 'weekly',
        priority: 0.75,
      }));
    }
  } catch (err) {
    console.error('Error generating blog sitemap routes:', err);
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}

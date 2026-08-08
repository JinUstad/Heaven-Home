import React from 'react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

/**
 * Organization & WebSite JSON-LD Schema (Google Search & Sitelinks SearchBox)
 */
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Heaven Home',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
          caption: 'Heaven Home Logo'
        },
        description: 'Heaven Home offers handcrafted luxury furniture, modern kitchenware, timeless lighting, and premium interior decor across India.',
        sameAs: [
          'https://www.instagram.com',
          'https://www.facebook.com',
          'https://twitter.com'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9876543210',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['en', 'hi']
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Heaven Home',
        description: 'Elevate your living spaces with handcrafted furniture and kitchenware.',
        publisher: {
          '@id': `${SITE_URL}/#organization`
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/products?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Product Schema for eCommerce rich snippets (Price, Stock, Reviews, Brand)
 */
export function ProductJsonLd({
  id,
  name,
  description,
  images,
  price,
  oldPrice,
  category,
  sku
}: {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  oldPrice?: number;
  category?: string;
  sku?: string;
}) {
  const productUrl = `${SITE_URL}/products/${id}`;
  const cleanDescription = (description || name).replace(/[#*`_>\[\]]/g, '').slice(0, 300);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: name,
    image: images.length > 0 ? images : [`${SITE_URL}/logo.png`],
    description: cleanDescription,
    sku: sku || id,
    mpn: id,
    brand: {
      '@type': 'Brand',
      name: 'Heaven Home'
    },
    category: category || 'Home & Kitchen',
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: price,
      priceValidUntil: '2028-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Heaven Home'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '24'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Article / BlogPosting Schema for blog articles
 */
export function ArticleJsonLd({
  id,
  title,
  excerpt,
  content,
  imageUrl,
  author,
  publishedAt
}: {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
}) {
  const articleUrl = `${SITE_URL}/blogs/${id}`;
  const cleanDescription = (excerpt || content || title).replace(/[#*`_>\[\]]/g, '').slice(0, 250);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: cleanDescription,
    image: imageUrl ? [imageUrl] : [`${SITE_URL}/logo.png`],
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: author || 'Heaven Home Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Heaven Home',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Schema
 */
export function BreadcrumbJsonLd({
  items
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Schema
 */
export function FAQJsonLd({
  faqs
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://heavenhome.vercel.app';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ)',
  description: 'Find answers to common questions regarding Heaven Jewels orders, delivery times, return policies, product materials, and support.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Heaven Jewels',
    description: 'Find answers to common questions regarding Heaven Jewels orders, delivery times, and returns.',
    url: `${SITE_URL}/faq`,
  },
};

const faqs = [
  {
    question: "What is your return and replacement policy?",
    answer: "We offer hassle-free replacement or support if an item arrives damaged or defective. Please inspect your parcel upon delivery and notify our customer service within 48 hours."
  },
  {
    question: "How long does standard delivery take?",
    answer: "Orders are dispatched within 24–48 hours. Delivery typically takes 3 to 7 business days depending on your location in India."
  },
  {
    question: "Are your kitchenware products food-safe and BPA-free?",
    answer: "Yes, all Heaven Jewels kitchen products, including our oil spray dispensers, spice containers, and organizers, are crafted from 100% food-grade, BPA-free, premium materials."
  },
  {
    question: "How can I track my order in real-time?",
    answer: "Once your order is shipped, you will receive a tracking link via SMS/WhatsApp and email to monitor your package delivery step by step."
  },
  {
    question: "Which payment methods are accepted?",
    answer: "We accept all major payment methods including UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD) on eligible pin codes."
  }
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 min-h-[60vh]">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'FAQ', url: '/faq' },
        ]}
      />

      <div className="text-center mb-14">
        <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 block">
          Help & Support
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#222] font-serif mb-4 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-gray-500 max-w-2xl mx-auto">
          Everything you need to know about our products, shipping, returns, and ordering process.
        </p>
      </div>

      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg sm:text-xl font-bold text-[var(--primary)] mb-3 font-serif">
              {faq.question}
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 text-center bg-emerald-50/50 p-8 sm:p-10 rounded-2xl border border-emerald-100/60">
        <h3 className="text-xl sm:text-2xl font-bold text-[#222] font-serif mb-3">Still have questions?</h3>
        <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-lg mx-auto">
          Our dedicated customer support team is available Mon–Sat to help you with any inquiries or order updates.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider text-xs shadow-md hover:bg-opacity-90 hover:-translate-y-0.5 transition-all"
        >
          Contact Our Team
        </Link>
      </div>
    </div>
  );
}

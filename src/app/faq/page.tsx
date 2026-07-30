import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'FAQ - Heaven Home',
  description: 'Frequently Asked Questions about Heaven Home products, shipping, and returns.',
};

const faqs = [
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day hassle-free return policy. If you are not completely satisfied with your purchase, you can return it within 7 days of delivery for a full refund, minus return shipping costs."
  },
  {
    question: "Do you offer interior design services?",
    answer: "Yes, our team of expert interior designers provides consultation services to help you curate the perfect space. Please contact us via the Contact page to schedule a session."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is dispatched, you will receive an email with a tracking number and a link to monitor your shipment's progress in real-time."
  }
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh]">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#333] font-serif mb-6 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Find answers to common questions about our products, shipping, returns, and more.
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-[var(--primary)] mb-4 font-serif">{faq.question}</h3>
            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center bg-gray-50 p-10 rounded-2xl border border-gray-100">
        <h3 className="text-2xl font-bold text-[#333] font-serif mb-4">Still have questions?</h3>
        <p className="text-gray-500 mb-8">Our customer support team is always ready to help you with any inquiries.</p>
        <Link href="/contact" className="inline-block bg-[var(--accent)] text-[#1a1a1a] px-8 py-3 font-bold uppercase tracking-widest shadow-md hover:-translate-y-1 transition-transform">
          Contact Us
        </Link>
      </div>
    </div>
  );
}

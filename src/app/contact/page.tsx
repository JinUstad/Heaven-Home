import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | Heaven Home',
  description: 'Get in touch with Heaven Home experts. We are here to help you design your perfect living space.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f8f9fa] py-10 sm:py-16 md:py-20">
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm mb-4 block">
            We're Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#333] mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Whether you have a question about our premium collections, need design advice, or want to inquire about a custom order, our team is ready to assist you.
          </p>
        </div>

        <ContactClient />
      </section>
    </main>
  );
}

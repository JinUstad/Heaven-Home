"use client";

import React from 'react';
import Link from 'next/link';

export default function ShippingAndReturnsPage() {
  return (
    <div className="flex flex-col w-full bg-white text-[#333] font-sans">
      
      {/* SECTION 1: HERO HEADER (MATCHES Heaven Jewels DEEP OLIVE GREEN BRAND THEME) */}
      <section className="bg-[var(--primary)] text-white py-16 sm:py-20 px-4 relative overflow-hidden shadow-md">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[var(--accent)] font-bold text-xs uppercase tracking-widest block mb-3">
            Policy Guidelines
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 text-white">
            Shipping & Return Policy
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Everything you need to know about order dispatch, delivery timelines, and our strict non-refundable purchase policy.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 pointer-events-none" />
      </section>


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* SECTION 2: DISPATCH & FULFILLMENT TIMELINE */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Section 01</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Order Dispatch & Delivery Timelines</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#222] mb-2">Order Processing</h4>
              <p>All orders are verified and dispatched within 24 to 48 business hours after payment confirmation.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#222] mb-2">Standard Delivery</h4>
              <p>Domestic shipments typically arrive within 5 to 7 business days depending on destination logistics.</p>
            </div>
          </div>
        </section>


        {/* SECTION 3: STRICT NON-REFUNDABLE POLICY (HIGHLIGHTED) */}
        <section className="bg-red-50/70 border-2 border-red-200 p-8 sm:p-10 rounded-3xl space-y-6 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Section 02 — Important Notice</span>
              <h2 className="text-2xl font-serif font-bold text-red-950">Strict Non-Refundable & Final Sale Policy</h2>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-red-100 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="flex items-start gap-3 text-red-600 font-bold text-base">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0 mt-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span>ALL PURCHASES MADE ON Heaven Jewels ARE STRICTLY NON-REFUNDABLE.</span>
            </div>
            <p>
              At Heaven Jewels, we are committed to delivering premium-quality home and kitchen products. To maintain the highest standards of quality and hygiene, all orders are considered <em>final</em> once they are confirmed.
            </p>
            <p>
              We do not accept returns, cancellations, exchanges, or cash refunds after an order has been confirmed or dispatched, except in cases where the product is received damaged, defective, or incorrect.
            </p>
            <p>
              Before placing your order, please carefully review the product description, dimensions, specifications, color, features, and images to ensure the product meets your requirements.
            </p>
            <p className="font-semibold text-gray-800 pt-2 border-t border-gray-100">
              By completing your purchase, you acknowledge and agree to this Non-Refundable & Final Sale Policy.
            </p>
          </div>
        </section>


        {/* SECTION 4: DAMAGE & DEFECT REPLACEMENT EXCEPTIONS */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Section 03</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Transit Damage & Exchange Exceptions</h2>
            </div>
          </div>
          <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
            <p>
              While purchases are non-refundable, your satisfaction and peace of mind are guaranteed. In the rare event that an item arrives physically damaged or defective due to transit:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>You must notify our support team within <strong>48 hours of delivery</strong>.</li>
              <li>Provide clear unboxing photographs and video showing the shipping label and damaged area.</li>
              <li>Once verified, Heaven Jewels will issue a <strong>free product replacement</strong> or repair at zero extra cost.</li>
            </ul>
          </div>
        </section>


        {/* SECTION 5: ADDRESS MODIFICATIONS & FAILED DELIVERIES */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Section 04</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Delivery Addresses & Re-Routing</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Customers are responsible for providing complete and accurate shipping details at checkout. Address updates cannot be guaranteed once dispatch has occurred. Packages returned to us due to incorrect addresses or repeated missed delivery attempts may incur re-consignment fees.
          </p>
        </section>


        {/* SECTION 6: SUPPORT & ASSISTANCE CTA */}
        <section className="bg-[var(--primary)] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl">
          <div className="inline-flex p-3 bg-white/10 rounded-2xl text-[var(--accent)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold">Have Questions About Your Order?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">
            Our logistics support team is ready to assist you with tracking updates, delivery scheduling, or damage exchange queries.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <button className="px-8 py-3.5 bg-[#ffcc00] text-[#1a1a1a] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-md">
                Contact Logistics Support
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

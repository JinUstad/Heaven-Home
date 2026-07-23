"use client";

import React from 'react';
import Link from 'next/link';
import { Truck, ShieldAlert, AlertCircle, RefreshCw, MapPin, Headset } from 'lucide-react';

export default function ShippingAndReturnsPage() {
  return (
    <div className="flex flex-col w-full bg-white text-[#333] font-sans">
      
      {/* SECTION 1: HERO HEADER */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[var(--accent)] font-bold text-xs uppercase tracking-widest block mb-3">
            Policy Guidelines
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Shipping & Return Policy
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Everything you need to know about order dispatch, delivery timelines, and our strict non-refundable purchase policy.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      </section>


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* SECTION 2: DISPATCH & FULFILLMENT TIMELINE */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Section 01</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Order Dispatch & Delivery Timelines</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#222] mb-2">Order Processing</h4>
              <p>All orders are verified and dispatched within 24 to 48 business hours after payment confirmation.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#222] mb-2">Standard Delivery</h4>
              <p>Domestic shipments typically arrive within 5 to 7 business days depending on destination logistics.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#222] mb-2">Freight & Furniture</h4>
              <p>Large furniture items are handled via specialist white-glove couriers with scheduled delivery appointments.</p>
            </div>
          </div>
        </section>


        {/* SECTION 3: STRICT NON-REFUNDABLE POLICY (HIGHLIGHTED) */}
        <section className="bg-red-50/70 border-2 border-red-200 p-8 sm:p-10 rounded-3xl space-y-6 relative">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600 text-white rounded-2xl">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Section 02 — Important Notice</span>
              <h2 className="text-2xl font-serif font-bold text-red-950">Strict Non-Refundable & Final Sale Policy</h2>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-red-100 space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            <div className="flex items-start gap-3 text-red-600 font-bold text-base">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>ALL PURCHASES MADE ON HEAVEN HOME ARE STRICTLY NON-REFUNDABLE.</span>
            </div>
            <p>
              Due to the bespoke, handcrafted nature of our high-end furniture and decor products, <strong>we do not accept returns, cancellations, or cash refunds</strong> once an order has been dispatched or confirmed.
            </p>
            <p>
              Please inspect all product dimensions, material specifications, and color swatches carefully on the product detail page prior to placing your order.
            </p>
          </div>
        </section>


        {/* SECTION 4: DAMAGE & DEFECT REPLACEMENT EXCEPTIONS */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Section 03</span>
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
              <li>Once verified, Heaven Home will issue a <strong>free product replacement</strong> or repair at zero extra cost.</li>
            </ul>
          </div>
        </section>


        {/* SECTION 5: ADDRESS MODIFICATIONS & FAILED DELIVERIES */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Section 04</span>
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
            <Headset className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-serif font-bold">Have Questions About Your Order?</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">
            Our logistics support team is ready to assist you with tracking updates, delivery scheduling, or damage exchange queries.
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <button className="px-8 py-3.5 bg-[var(--accent)] text-[#1a1a1a] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-md">
                Contact Logistics Support
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

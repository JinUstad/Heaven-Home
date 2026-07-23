"use client";

import React from 'react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col w-full bg-white text-[#333] font-sans">
      
      {/* SECTION 1: HERO HEADER */}
      <section className="bg-gray-900 text-white py-16 sm:py-20 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[var(--accent)] font-bold text-xs uppercase tracking-widest block mb-3">
            Legal Documentation
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            Please read these terms and conditions carefully before placing orders or utilizing the Heaven Home platform.
          </p>
          <p className="text-xs text-gray-400 mt-4">Last Updated: July 2026</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
      </section>


      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* SECTION 1: ACCEPTANCE & OVERVIEW */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Section 01</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Agreement to Terms</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            By accessing or placing an order through Heaven Home (accessible via web and mobile platforms), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, you must refrain from using our services.
          </p>
        </section>


        {/* SECTION 2: USER ACCOUNTS & ELIGIBILITY */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Section 02</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">User Accounts & Responsibilities</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            To make purchases or access administrative portals, you may be required to register an account. You represent that you are at least 18 years of age and that all information provided is accurate and current. You are solely responsible for maintaining the confidentiality of your login credentials.
          </p>
        </section>


        {/* SECTION 3: PRICING & NON-REFUNDABLE TERMS */}
        <section className="bg-amber-50/60 border border-amber-200 p-8 sm:p-10 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--accent)] text-[#1a1a1a] rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Section 03</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Orders, Payments & Non-Refundable Clause</h2>
            </div>
          </div>
          <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
            <p>
              All prices are listed in USD unless otherwise indicated. Heaven Home reserves the right to correct typographical pricing errors or adjust product availability at any time.
            </p>
            <div className="p-4 bg-white rounded-xl border border-amber-200 text-amber-950 font-medium">
              <strong>Non-Refundable Policy Notice:</strong> All confirmed orders are final sales and strictly non-refundable. Please review our <Link href="/shipping" className="text-[var(--primary)] underline font-bold">Shipping & Return Policy</Link> for transit damage replacement guidelines.
            </div>
          </div>
        </section>


        {/* SECTION 4: INTELLECTUAL PROPERTY */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Section 04</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Intellectual Property Rights</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            All content on this site—including high-resolution furniture photography, logos, branding elements, product descriptions, and custom code—is the exclusive property of Heaven Home and protected under copyright and trademark laws. Unauthorized reproduction or commercial distribution is prohibited.
          </p>
        </section>


        {/* SECTION 5: LIMITATION OF LIABILITY */}
        <section className="bg-gray-50 border border-gray-100 p-8 sm:p-10 rounded-3xl space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[var(--primary)] text-white rounded-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.5H5.25A2.25 2.25 0 003 6.75v10.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 17.25V6.75A2.25 2.25 0 0018.75 4.5z" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Section 05</span>
              <h2 className="text-2xl font-serif font-bold text-[#222]">Limitation of Liability</h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Heaven Home shall not be liable for any indirect, incidental, or consequential damages arising out of product usage beyond the purchase price of the specified order. Natural wood variations and artisan fabric textures are characteristics of handcrafted craftsmanship and do not constitute defects.
          </p>
        </section>


        {/* SECTION 6: CONTACT & LEGAL INQUIRIES */}
        <section className="bg-[var(--primary)] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl">
          <div className="inline-flex p-3 bg-white/10 rounded-2xl text-[var(--accent)]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold">Legal Inquiries & Assistance</h2>
          <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed">
            Have questions or need clarification regarding our Terms of Service or corporate policies?
          </p>
          <div className="pt-2">
            <Link href="/contact">
              <button className="px-8 py-3.5 bg-[var(--accent)] text-[#1a1a1a] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-md">
                Contact Legal Department
              </button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white text-[#333] font-sans overflow-hidden">

      {/* ================= SECTION 1: HERO BANNER ================= */}
      <section className="relative min-h-[580px] py-16 sm:py-24 flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/90 via-black/70 to-black/60 z-0" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center py-6">
          <span className="text-[var(--accent)] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 animate-fade-in">
            About Heaven Home
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold mb-6 leading-tight max-w-4xl">
            Elevating Every Kitchen  <br className="hidden sm:inline" />
            <span className="text-[var(--accent)]">with Style & Innovation</span>
          </h1>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mb-10 font-light leading-relaxed">
            Heaven Home is a premium kitchen essentials brand dedicated to making everyday cooking and dining more elegant, organized, and effortless. We offer thoughtfully designed, high-quality kitchen products that combine modern functionality with timeless aesthetics. From smart storage solutions to innovative cooking accessories, our mission is to bring style, convenience, and lasting value to every kitchen.
          </p>
          <div className="pb-4">
            <Link href="/products">
              <button className="px-9 py-4 bg-[var(--accent)] text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all rounded-full shadow-xl hover:-translate-y-0.5">
                Explore Our Collection
              </button>
            </Link>
          </div>
        </div>
      </section>


      {/* ================= SECTION 2: OUR STORY & METRICS ================= */}
      <section className="py-20 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-[var(--primary)] font-bold text-xs tracking-widest uppercase block">
                Our Story & Heritage
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#222] leading-tight">
                Where Innovation Meets Everyday Cooking
              </h2>
              <p className="text-gray-600 leading-relaxed text-base">
                Heaven Home is a premium kitchen essentials brand dedicated to making everyday cooking simpler, smarter, and more enjoyable. We combine elegant design with practical functionality to create products that enhance every modern kitchen.              </p>
              <p className="text-gray-600 leading-relaxed text-base">
                Our carefully curated collection is built with a focus on quality, durability, and innovation, ensuring every product delivers lasting performance while adding style and convenience to your daily routine.              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-serif font-bold text-[var(--primary)]">10K+</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Happy Homes</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-[var(--primary)]">100%</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Quality Assured</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-[var(--primary)]">4.9★</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Client Rating</div>
                </div>
              </div>
            </div>

            {/* Visual Mosaic */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Kitchen Elegance"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden sm:block max-w-sm">
                <p className="text-sm font-serif italic text-gray-700">"Great kitchens aren't defined by size—they're defined by thoughtful design and the tools that make every moment effortless."</p>
                <p className="text-xs font-bold text-[var(--primary)] mt-2 uppercase tracking-wider">— Heaven Home</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ================= SECTION 3: CORE VALUES GRID ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[var(--accent)] font-bold text-xs tracking-widest uppercase block mb-2">
              Why Choose Heaven Home
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#222]">
              Our Guiding Principles
            </h2>
            <p className="text-gray-600 mt-4 text-sm sm:text-base">
              We hold our products and customer experience to the highest standards of luxury and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.653-4.655M18.75 3a3.75 3.75 0 00-3.75 3.75c0 .416.068.816.195 1.192" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#222] mb-3">Premium Quality</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every Heaven Home product is thoughtfully designed and carefully quality-checked to deliver durability, functionality, and exceptional performance for everyday use.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#222] mb-3">Responsible Quality</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We strive to source quality materials responsibly and design products that are durable, reusable, and made to support a more sustainable everyday lifestyle.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#222] mb-3">Modern Innovation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Designed with precision and purpose, our kitchen essentials deliver effortless functionality, premium quality, and timeless style for modern homes.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#222] mb-3">Dedicated Support</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our customer support team is committed to providing prompt, reliable assistance before, during, and after your purchase, ensuring a smooth and hassle-free shopping experience.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* ================= SECTION 4: DESIGN PROCESS ================= */}
      <section className="py-24 bg-[var(--primary)] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[var(--accent)] font-bold text-xs tracking-widest uppercase block mb-2">
              From Studio To Sanctuary
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              Our 4-Step Design Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border border-white/10 p-6 rounded-2xl bg-white/5 backdrop-blur-sm relative">
              <div className="text-4xl font-serif font-bold text-[var(--accent)] mb-4">01</div>
              <h4 className="text-lg font-bold mb-2">Concept & Architecture</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Our architectural team drafts initial 3D models focusing on spatial harmony and proportions.
              </p>
            </div>

            <div className="border border-white/10 p-6 rounded-2xl bg-white/5 backdrop-blur-sm relative">
              <div className="text-4xl font-serif font-bold text-[var(--accent)] mb-4">02</div>
              <h4 className="text-lg font-bold mb-2">Material Selection</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                We select premium solid walnuts, brushed brass metals, and stain-resistant velvet textiles.
              </p>
            </div>

            <div className="border border-white/10 p-6 rounded-2xl bg-white/5 backdrop-blur-sm relative">
              <div className="text-4xl font-serif font-bold text-[var(--accent)] mb-4">03</div>
              <h4 className="text-lg font-bold mb-2">Precision Crafting</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Artisans bring each piece to life using traditional joinery and hand-tailored upholstery techniques.
              </p>
            </div>

            <div className="border border-white/10 p-6 rounded-2xl bg-white/5 backdrop-blur-sm relative">
              <div className="text-4xl font-serif font-bold text-[var(--accent)] mb-4">04</div>
              <h4 className="text-lg font-bold mb-2">Quality Audit</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Every finished product undergoes rigorous stress and finish inspections before shipping.
              </p>
            </div>
          </div>
        </div>
      </section>





      {/* ================= SECTION 6: TESTIMONIAL & CALL TO ACTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Testimonial Banner */}
          <div className="bg-amber-50 border border-amber-100 p-10 sm:p-14 rounded-3xl mb-16 text-center max-w-4xl mx-auto relative">
            <div className="text-amber-400 text-4xl mb-4">★★★★★</div>
            <p className="text-lg sm:text-2xl font-serif text-[#222] italic leading-relaxed">
              "Excellent quality, elegant design, and practical functionality. Heaven Home products have become an essential part of our kitchen. We'll definitely be ordering again!"
            </p>
            <div className="mt-6 font-bold text-[#333] text-sm uppercase tracking-wider">
              — Verified Customer
            </div>
          </div>

          {/* Full-Bleed CTA Banner */}
          <div className="bg-[var(--primary)] rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-6 leading-tight">
                Elevate Your Everyday Kitchen
              </h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 font-light">
                Explore Heaven Home's collection of premium kitchen essentials, crafted to combine elegant design, innovative functionality, and lasting quality for modern homes.
              </p>
              <Link href="/products">
                <button className="px-10 py-4 bg-[#ffcc00] text-[#222] font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors rounded-full shadow-md">
                  Shop The Full Collection
                </button>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

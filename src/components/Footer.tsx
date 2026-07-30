"use client";

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white/90 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6 group">
              <div className="text-white font-serif text-2xl font-bold tracking-tighter">
                HEAVEN
                <span className="text-[var(--accent)] font-serif font-normal ml-1">
                  HOME
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Elevating your kitchen spaces with premium assentials. Bring heaven to your kitchen.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/products" className="hover:text-[var(--accent)] transition-colors">All Products</Link></li>
              <li><Link href="/products" className="hover:text-[var(--accent)] transition-colors">Kitchen Assentials</Link></li>
              <li><Link href="/products" className="hover:text-[var(--accent)] transition-colors">jewelries</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-[var(--accent)] transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-[var(--accent)] transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--accent)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
            <p className="text-sm text-white/70 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[var(--accent)] text-white placeholder-white/50 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--accent)] text-[#1a1a1a] font-medium rounded-r-md hover:bg-opacity-90 transition-all-200 text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Heaven Home. All rights reserved. | Design by{" "}
            <a
              href="https://www.devfordevs.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline font-semibold text-white/90"
            >
              DevforDevs
            </a>
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="https://www.instagram.com/heaven_home.in?igsh=MWt2NDljaXlxZDk5YQ%3D%3D&utm_source=qr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


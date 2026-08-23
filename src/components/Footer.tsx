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
                  JEWELS
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Elevating your style with elegant jewellery essentials.
              <b>Bring a touch of heaven to every look.</b>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Shop</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/products" className="hover:text-[var(--accent)] transition-colors">All Products</Link></li>
              <li><Link href="/products" className="hover:text-[var(--accent)] transition-colors">Earrings</Link></li>
              <li><Link href="/blogs" className="hover:text-[var(--accent)] transition-colors">Rings</Link></li>
              <li><Link href="/blogs" className="hover:text-[var(--accent)] transition-colors">Bangles</Link></li>
              <li><Link href="/blogs" className="hover:text-[var(--accent)] transition-colors">Blogs & Journal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/contact" className="hover:text-[var(--accent)] transition-colors">Contact Us</Link></li>
              <li>
                <a href="mailto:heavenjewels2316@gmail.com" className="hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  heavenjewels2316@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
            <p className="text-sm text-white/70 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex mb-4" onSubmit={(e) => e.preventDefault()}>
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
            <div className="pt-2">
              <a
                href="https://www.instagram.com/heave_njewels?igsh=eXczOG8yY2RraXY4&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors group"
              >
                <svg className="w-5 h-5 text-[var(--accent)] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 mt-8 text-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Heaven Jewels. All rights reserved. | Design by{" "}
            <a
              href="https://www.devfordevs.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline font-semibold text-white/90"
            >
              DevforDevs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}


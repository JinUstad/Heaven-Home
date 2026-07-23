"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export function Navbar() {
  const { cartCount, wishlistCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm transition-all-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-[var(--primary)] font-serif text-3xl font-bold tracking-tighter transition-all-200">
                HEAVEN
                <span className="text-[var(--accent)] font-serif font-normal ml-1">
                  HOME
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-all-200">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-all-200">
              About
            </Link>
            {/* Mega Menu for Collection */}
            <div className="group relative">
              <Link href="/products" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-all-200 flex items-center gap-1 h-full py-6">
                Collection
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </Link>
              
              {/* Dropdown Container */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[650px] bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="grid grid-cols-3 gap-8 p-8">
                  {/* Column 1 */}
                  <div>
                    <h4 className="font-bold text-[#333] border-b border-gray-200 pb-2 mb-4">Living Room</h4>
                    <ul className="space-y-3">
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Modern Sofas</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Lounge Chairs</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Coffee Tables</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">TV Stands</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Cabinets</Link></li>
                    </ul>
                  </div>
                  {/* Column 2 */}
                  <div>
                    <h4 className="font-bold text-[#333] border-b border-gray-200 pb-2 mb-4">Kitchen & Dining</h4>
                    <ul className="space-y-3">
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Dining Tables</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Dining Chairs</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Kitchen Islands</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Bar Stools</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Cabinets</Link></li>
                    </ul>
                  </div>
                  {/* Column 3 */}
                  <div>
                    <h4 className="font-bold text-[#333] border-b border-gray-200 pb-2 mb-4">Home Decor</h4>
                    <ul className="space-y-3">
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Vases & Pots</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Wall Art</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Rugs</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Mirrors</Link></li>
                      <li><Link href="/products" className="text-sm text-gray-500 hover:text-[var(--primary)]">Lighting</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/contact" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-all-200">
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/login" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
              Login
            </Link>
            <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-[var(--primary)] transition-all-200 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[var(--primary)] transition-all-200 group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[var(--accent)] rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

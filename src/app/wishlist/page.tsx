"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ProductCard } from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-[#333] font-serif mb-8 text-center uppercase tracking-wider">
        Your Wishlist
      </h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-300 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-500 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Explore our premium collection and save your favorite items for later.</p>
          <Link href="/products" className="inline-block bg-[var(--primary)] text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-opacity-90 transition-colors">
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

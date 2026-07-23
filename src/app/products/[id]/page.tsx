"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ALL_PRODUCTS } from '@/data/products';
import { useCart } from '@/hooks/useCart';

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const product = ALL_PRODUCTS.find(p => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-6">404</h1>
        <h2 className="text-2xl font-serif text-[#333] mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">We couldn't find the product you're looking for. It might have been removed or the link is incorrect.</p>
        <Link href="/products" className="inline-block bg-[var(--primary)] text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-opacity-90 transition-colors shadow-md">
          Back to Collection
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Breadcrumb */}
      <nav className="mb-10 text-sm text-gray-500">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-[var(--primary)] transition-colors">Collection</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* Product Image */}
        <div className="relative aspect-square bg-[#f8f9fa] rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <p className="text-[var(--accent)] font-bold tracking-widest uppercase text-sm mb-4">{product.category}</p>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#333] mb-6 leading-tight">{product.name}</h1>
          <div className="text-3xl font-bold text-[var(--primary)] mb-8">
            ${product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          
          <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-200">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-full bg-white h-14 w-36">
              <button 
                className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black text-xl transition-colors"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="flex-1 text-center font-bold text-[#333]">{quantity}</span>
              <button 
                className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black text-xl transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            
            {/* Wishlist Button */}
            <button 
              onClick={() => toggleWishlist(product)}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-sm border ${
                isWishlisted ? 'bg-red-50 border-red-100 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:text-[var(--primary)] hover:border-[var(--primary)]'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          {/* Add to Cart Action */}
          <button 
            onClick={() => addToCart(product, quantity)}
            className="w-full bg-[#1a1a1a] hover:bg-[var(--primary)] text-white h-16 rounded-full font-bold uppercase tracking-widest text-sm transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Add to Cart
          </button>
          
          <div className="mt-8 flex items-center justify-between text-sm text-gray-500 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--accent)]"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-[var(--accent)]"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

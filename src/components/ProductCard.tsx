"use client";

import React from 'react';
import Link from 'next/link';
import { useCart, Product } from '@/hooks/useCart';

export type ExtendedProduct = Product & {
  discount?: string;
  oldPrice?: number;
  reviews?: number;
  rating?: number;
};

type ProductCardProps = {
  product: ExtendedProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1">
      
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-4 left-4 bg-[var(--accent)] text-[#1a1a1a] text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 tracking-widest">
          {product.discount}
        </div>
      )}

      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-[#f8f9fa] p-8 flex items-center justify-center">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out" 
          />
        )}
        
        {/* Hover Action Icons (Top) */}
        <div className="absolute top-4 right-0 left-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0 transition-all duration-300 z-10">
          <button className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center hover:bg-opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isWishlisted ? 'bg-red-50 text-red-500' : 'bg-[var(--primary)] text-white hover:bg-opacity-90'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>

      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col items-center text-center relative bg-white z-20">
        
        {/* Hover Add to Cart (Slides up to replace price/stars) */}
        <div className="absolute inset-0 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-30">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="text-[var(--primary)] font-bold text-sm hover:underline tracking-wider"
          >
            + ADD TO CART
          </button>
        </div>

        <Link href={`/products/${product.id}`} className="relative z-40">
          <h3 className="text-[13px] font-bold text-[#333] mb-2 uppercase tracking-wide group-hover:text-[var(--primary)] transition-colors">{product.name}</h3>
        </Link>
        
        {/* These hide on hover when Add to Cart appears */}
        <div className="flex flex-col items-center group-hover:opacity-0 transition-opacity duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[15px] font-bold text-[var(--primary)]">${product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            {product.oldPrice && (
              <span className="text-[13px] text-gray-400 line-through">${product.oldPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <div className="flex text-[#ffb800]">
            {[1,2,3,4,5].map(star => (
              <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={star <= (product.rating || 5) ? "currentColor" : "none"} stroke="currentColor" className="w-3 h-3 border-none">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={star <= (product.rating || 5) ? 0 : 1} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-gray-500 ml-1">{product.reviews === 0 ? 'No reviews' : `${product.reviews} review${product.reviews === 1 ? '' : 's'}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

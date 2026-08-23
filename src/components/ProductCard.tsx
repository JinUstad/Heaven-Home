"use client";

import React from 'react';
import Link from 'next/link';
import { useCart, Product } from '@/hooks/useCart';
import { Heart, Search, RefreshCw } from 'lucide-react';

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

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group flex flex-col bg-white overflow-hidden transition-all duration-300">
      {/* Image Area */}
      <div className="relative aspect-square bg-[#f5f5f5] overflow-hidden flex items-center justify-center p-6">
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-0" aria-label={`View ${product.name}`} />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-[#c69c6d] text-white text-[10px] font-semibold px-2 py-0.5 z-10 uppercase tracking-wide pointer-events-none rounded-sm">
            Sale!
          </div>
        )}

        {/* Vertical Actions (Wishlist, Compare, Quick View) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-0 opacity-100 lg:translate-x-12 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#c69c6d] hover:text-white transition-colors cursor-pointer ${
              isWishlisted ? 'text-red-500' : 'text-gray-600'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button 
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-[#c69c6d] hover:text-white transition-colors text-gray-600 cursor-pointer hidden sm:flex"
            title="Compare"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            className="w-9 h-9 rounded-full bg-[#c69c6d] text-white items-center justify-center shadow-sm hover:bg-gray-800 transition-colors cursor-pointer hidden sm:flex"
            title="Quick View"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {product.image && (
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain mix-blend-multiply lg:group-hover:scale-105 transition-transform duration-700 ease-in-out" 
          />
        )}
        
        {/* Add To Cart overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-0 opacity-100 lg:translate-y-12 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 z-20">
           <button 
              onClick={handleQuickAdd}
              className="bg-white text-[#333] px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#c69c6d] hover:text-white transition-colors shadow-md whitespace-nowrap cursor-pointer"
            >
              Add To Cart
            </button>
        </div>
      </div>
      
      {/* Product Info (Centered like the image) */}
      <div className="pt-4 flex flex-col items-center bg-white relative z-10 text-center">
        {/* Brand / Subtitle */}
        <span className="text-[11px] text-gray-400 mb-1">
          Studio Design
        </span>
        
        <Link href={`/products/${product.id}`} className="hover:text-[#c69c6d] transition-colors">
          <h3 className="text-[13px] text-[#333] mb-1 font-medium">
            {product.name}
          </h3>
        </Link>
        
        {/* Pricing */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px] font-semibold text-[#111]">
            ₹{product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-[12px] text-gray-400 line-through">
              ₹{product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

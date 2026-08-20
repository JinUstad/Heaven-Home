"use client";

import React from 'react';
import Link from 'next/link';
import { useCart, Product } from '@/hooks/useCart';
import { Heart, ShoppingBag } from 'lucide-react';

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
      <div className="relative aspect-[4/5] bg-[#f9f9f9] overflow-hidden">
        <Link href={`/products/${product.id}`} className="absolute inset-0 z-0" aria-label={`View ${product.name}`} />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-[#333] text-white text-[10px] font-semibold px-2 py-0.5 z-10 uppercase tracking-wide pointer-events-none">
            Sale!
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 cursor-pointer ${
            isWishlisted 
              ? 'bg-red-50 text-red-500' 
              : 'bg-white/80 text-gray-500 hover:text-[#333] opacity-0 group-hover:opacity-100'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {product.image && (
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out mix-blend-multiply p-4" 
          />
        )}
        
        {/* Quick Add overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
           <button 
              onClick={handleQuickAdd}
              className="w-full bg-white/95 text-[#333] border border-[#eee] py-3 text-xs font-semibold tracking-widest uppercase hover:bg-[#333] hover:text-white transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to cart
            </button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="pt-4 flex flex-col flex-1 bg-white relative z-10 text-left">
        <Link href={`/products/${product.id}`} className="hover:text-[var(--primary)] transition-colors">
          <h3 className="text-[15px] font-serif text-[#333] mb-1 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Pricing */}
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[15px] font-semibold text-[#111]">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

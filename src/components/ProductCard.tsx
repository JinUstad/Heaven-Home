"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, Product } from '@/hooks/useCart';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import toast from 'react-hot-toast';

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
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`, { icon: '🛒', duration: 2000 });
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    router.push('/cart');
  };

  return (
    <div className="group relative flex flex-col bg-white overflow-hidden rounded-2xl border border-gray-200 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Full card clickable link */}
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-0" aria-label={`View ${product.name}`} />
      
      {/* Discount Badge */}
      {product.discount && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md z-10 uppercase tracking-wider pointer-events-none">
          {product.discount}
        </div>
      )}

      {/* Wishlist Button (Always accessible on Mobile & Desktop) */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 shadow-sm cursor-pointer ${
          isWishlisted 
            ? 'bg-red-50 text-red-500 border border-red-200' 
            : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white border border-gray-200/60'
        }`}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden bg-[#fafafa] p-6 flex items-center justify-center pointer-events-none">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-in-out mix-blend-multiply" 
          />
        )}
        
        {/* Quick View Floating Button */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none hidden sm:block">
          <Link 
            href={`/products/${product.id}`} 
            className="w-8 h-8 rounded-full bg-white/95 text-gray-700 shadow-md flex items-center justify-center hover:bg-[var(--primary)] hover:text-white pointer-events-auto transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white relative z-10">
        <div>
          {/* Category Detail */}
          {product.category && product.category.toUpperCase() !== product.name.toUpperCase() && (
            <span className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider block mb-1">
              {product.category}
            </span>
          )}

          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>
        </div>
        
        <div>
          {/* Pricing Row */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.oldPrice.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            )}
          </div>
          
          {/* Action Buttons: 2 Compact Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
            <button 
              onClick={handleQuickAdd}
              className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-bold text-[11px] py-2 rounded-xl transition-all flex items-center justify-center gap-1 active:scale-[0.97] cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add
            </button>
            <button 
              onClick={handleQuickBuy}
              className="bg-[var(--primary)] hover:bg-[#3b4b1a] text-white font-bold text-[11px] py-2 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1 active:scale-[0.97] cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

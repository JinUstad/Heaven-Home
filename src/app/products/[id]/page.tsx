"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart, Product } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setZoomPos({ x: 50, y: 50, isHovered: false });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name)')
          .eq('id', id)
          .maybeSingle();

        if (data && !error) {
          let parsedImages: string[] = [];
          if (data.image_url) {
            try {
              if (data.image_url.startsWith("[")) {
                parsedImages = JSON.parse(data.image_url);
              } else {
                parsedImages = [data.image_url];
              }
            } catch (e) {
              parsedImages = [data.image_url];
            }
          }

          if (parsedImages.length === 0) {
            parsedImages = ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'];
          }

          setImages(parsedImages);
          setActiveImageIndex(0);

          setProduct({
            id: data.id,
            name: data.title,
            price: data.price,
            image: parsedImages[0],
            category: data.categories?.name?.toUpperCase() || 'FURNITURE',
            description: data.description || 'No description available for this product.'
          });
        }
      } catch (err) {
        console.error('Error fetching product from Supabase:', err);
      }
      setLoading(false);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 text-center">
        <div className="text-gray-500 font-bold text-lg animate-pulse">Loading product details...</div>
      </div>
    );
  }

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Flipkart-Style Multi-Image Gallery (Left Column: Vertical Thumbnails + Magnifier Main Display) */}
        <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
          
          {/* Vertical Thumbnail Column (Flipkart style - set active image on HOVER) */}
          {images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] shrink-0 hide-scrollbar">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  onMouseEnter={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-[#f8f9fa] shrink-0 cursor-pointer ${
                    activeImageIndex === idx 
                      ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/30 scale-105' 
                      : 'border-gray-200 hover:border-[var(--primary)]/50 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain rounded-xl" />
                </button>
              ))}
            </div>
          )}

          {/* Main Large Image Box with Flipkart Hover Magnifier Zoom */}
          <div 
            className="relative flex-1 aspect-square bg-[#f8f9fa] rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-6 flex items-center justify-center cursor-zoom-in group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src={images[activeImageIndex] || product.image} 
              alt={product.name} 
              className={`w-full h-full object-contain transition-transform duration-200 ${
                zoomPos.isHovered ? 'scale-150' : 'scale-100'
              }`}
              style={
                zoomPos.isHovered 
                  ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } 
                  : undefined
              }
            />
          </div>
        </div>

        {/* Product Info (Right Column) */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-[var(--accent)] font-bold tracking-widest uppercase text-sm mb-3">{product.category}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#222] mb-6 leading-tight">{product.name}</h1>
          <div className="text-3xl font-bold text-[var(--primary)] mb-8">
            ${product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          
          <div className="prose prose-lg text-gray-600 mb-10 leading-relaxed">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-200">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-full bg-white h-14 w-36 shadow-sm">
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
        </div>

      </div>
    </div>
  );
}

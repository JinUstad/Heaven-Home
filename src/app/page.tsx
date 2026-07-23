"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard, ExtendedProduct } from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';

const heroImages = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1920&q=80'
];

const bgColors = ['bg-[#f4ebd0]', 'bg-[#e0e5da]', 'bg-[#d5e1df]', 'bg-[#f1e6d3]', 'bg-[#e5e9e1]'];
const fallbackImages = [
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1533090138073-a6dffc361920?auto=format&fit=crop&w=300&q=80'
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const categoryScrollRef = React.useRef<HTMLDivElement>(null);

  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [dbProducts, setDbProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [catsRes, prodsRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false })
      ]);

      if (catsRes.data) {
        setDbCategories(catsRes.data);
        if (catsRes.data.length > 0) {
          setActiveTab(catsRes.data[0].name.toUpperCase());
        }
      }

      if (prodsRes.data) {
        const mappedProducts: ExtendedProduct[] = prodsRes.data.map(p => ({
          id: p.id,
          name: p.title,
          price: p.price,
          image: p.image_url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
          category: p.categories?.name?.toUpperCase() || 'UNCATEGORIZED',
          reviews: p.sold > 0 ? Math.min(p.sold, 50) : 0, // mock reviews based on sold count
          rating: p.sold > 10 ? 5 : 4
        }));
        setDbProducts(mappedProducts);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts = dbProducts.filter(p => p.category === activeTab);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-white font-sans text-[#333]">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Slider Background Images */}
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url("${img}")` }}
          />
        ))}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/90 to-[#1a1a1a]/60 z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="text-[var(--accent)] font-semibold tracking-widest uppercase mb-4 animate-fade-in-up">
            Welcome to
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight max-w-4xl animate-fade-in-up animation-delay-100">
            Create Your Own <br/> 
            <span className="text-[var(--accent)]">Heaven</span> at Home
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl animate-fade-in-up animation-delay-200">
            Discover our premium collection of handcrafted furniture and timeless decor pieces designed to elevate your living spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
            <Link href="/products">
              <button className="px-8 py-3 bg-[#ffcc00] text-[#333] font-bold text-sm uppercase tracking-wider hover:bg-opacity-90 transition-colors w-full sm:w-auto">
                Shop Collection
              </button>
            </Link>
            <Link href="/about">
              <button className="px-8 py-3 border border-white text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-[#333] transition-colors w-full sm:w-auto">
                Our Story
              </button>
            </Link>
          </div>
        </div>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[var(--accent)] scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 1. TOP CATEGORY Section */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#333]">TOP CATEGORY</h2>
          
          {loading ? (
            <div className="text-center text-gray-500 py-10">Loading categories...</div>
          ) : dbCategories.length === 0 ? (
            <div className="text-center text-gray-500 py-10">No categories found in the database. Add some from the Admin Panel.</div>
          ) : (
            <div className="flex items-center justify-between">
              {/* Left Arrow */}
              <button onClick={() => scrollCategories('left')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors hidden md:flex shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              
              {/* Categories */}
              <div ref={categoryScrollRef} className="flex-1 flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 pb-4 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {dbCategories.map((cat, idx) => {
                  const bg = bgColors[idx % bgColors.length];
                  const img = fallbackImages[idx % fallbackImages.length];
                  return (
                    <Link 
                      key={cat.id} 
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      className={`min-w-[250px] sm:min-w-[280px] snap-center shrink-0 ${bg} p-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1 rounded-2xl group border border-black/5`}
                    >
                      <img src={img} alt={cat.name} className="w-32 h-32 object-contain mix-blend-multiply mb-6 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-bold text-[14px] tracking-wider text-[#333] uppercase group-hover:text-[var(--primary)] transition-colors">{cat.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button onClick={() => scrollCategories('right')} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors hidden md:flex shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          )}
          
          <style dangerouslySetInnerHTML={{__html: `
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}} />
        </div>
      </section>

      {/* 2. HOME DESIGN Info Section */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="text-[var(--primary)] font-bold text-sm tracking-wider uppercase block mb-4">
                HEAVEN HOME PREMIUM 2026
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#333] leading-tight">
                HOME DESIGN <br/>
                COVERS THE REQUIRED <br/>
                FOR YOUR COMFORT.
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-xl text-gray-500 font-light leading-relaxed mb-8">
                Our experts cover the full spectrum of home and kitchen areas, ensuring your spaces are both beautiful and highly functional.
              </p>
              <button className="px-8 py-3 border border-[var(--primary)] text-[var(--primary)] font-bold text-sm uppercase tracking-wider hover:bg-[var(--primary)] hover:text-white transition-colors">
                ABOUT STORY
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Promotional Banners */}
      <section className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[300px] md:h-[400px]">
          {/* Olive Banner */}
          <div className="bg-[var(--primary)] relative overflow-hidden flex items-center p-12">
            <div className="absolute -left-20 bg-[#222] w-64 h-64 rounded-full opacity-20" />
            <div className="relative z-10 text-white w-full">
              <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=200&q=80" alt="Lounge Chair" className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 object-cover drop-shadow-2xl mix-blend-multiply rounded-xl" />
              <div className="ml-44">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">Premium<br/>Lounge</h3>
                <button className="bg-[var(--accent)] text-white px-8 py-3 font-bold text-sm hover:opacity-90 transition-opacity">SHOP NOW</button>
              </div>
            </div>
          </div>

          {/* Accent Banner */}
          <div className="bg-[#e6a15c] relative overflow-hidden flex items-center p-12">
            <div className="absolute -bottom-10 -left-10 bg-white w-48 h-48 rounded-full opacity-20" />
            <div className="absolute top-10 right-10 bg-white w-20 h-20 rounded-full opacity-20" />
            <div className="relative z-10 text-white flex items-center justify-center w-full">
               <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=200&q=80" alt="Kitchen" className="w-48 h-48 object-cover mr-8 drop-shadow-2xl rounded-lg" />
               <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6">Modern<br/>Kitchen<br/>Set</h3>
                  <button className="bg-[#333] text-white px-8 py-3 font-bold text-sm hover:bg-black transition-colors">SHOP NOW</button>
               </div>
            </div>
          </div>

          {/* Dark Banner */}
          <div className="bg-[#2c3e2e] relative overflow-hidden flex items-center p-12">
             <div className="absolute -top-10 -left-10 bg-[var(--accent)] w-48 h-48 rounded-full opacity-30" />
             <div className="absolute top-10 right-10 border-4 border-white w-16 h-16 rounded-full opacity-20" />
             <div className="relative z-10 text-white flex items-center justify-center w-full">
                <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=200&q=80" alt="Decor" className="w-48 h-48 object-cover mr-8 drop-shadow-2xl rounded-lg" />
                <div>
                   <h3 className="text-3xl md:text-4xl font-bold mb-6">Elegant<br/>Wall Decor</h3>
                   <button className="bg-white text-[var(--primary)] px-8 py-3 font-bold text-sm hover:bg-gray-100 transition-colors">SHOP NOW</button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. TRENDING PRODUCT Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#333]">TRENDING PRODUCT</h2>
          
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-12 border-b border-gray-200">
            {dbCategories.map((cat) => {
              const tab = cat.name.toUpperCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold tracking-wide transition-colors ${
                    activeTab === tab 
                      ? 'text-[var(--primary)] border-b-2 border-[var(--primary)]' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-gray-500 py-10">Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">
                {activeTab ? `No products found for ${activeTab}.` : 'Select a category to view products.'}
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
        
        {/* Floating action button (Scroll to top logic) */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute right-8 bottom-8 w-12 h-12 bg-[var(--primary)] text-white flex items-center justify-center hover:bg-opacity-90 transition-colors shadow-lg"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
           </svg>
        </button>
      </section>

    </div>
  );
}

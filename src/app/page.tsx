"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard, ExtendedProduct } from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

const heroImage = "/hero_banner_1787207503393.jpg";

const categories = [
  { name: 'Earrings', image: '/cat_earrings_1787207766448.jpg' },
  { name: 'Necklaces', image: '/cat_necklace_1787207779203.jpg' },
  { name: 'Pendants', image: '/cat_necklace_1787207779203.jpg' }, 
  { name: 'Bracelets', image: '/cat_bracelet_1787207794703.jpg' },
  { name: 'Rings', image: '/cat_ring_1787207915244.jpg' },
  { name: 'Chains', image: '/cat_necklace_1787207779203.jpg' }, 
];

const promoBanners = [
  { title: "Brilliant Gold Ring Collection", discount: "FLAT 15% OFF", image: "/promo_ring_1787207518511.jpg" },
  { title: "Golden Elegance Bracelet", discount: "FLAT 15% OFF", image: "/promo_bracelet_1787207535528.jpg" },
  { title: "Chic Necklaces for Her", discount: "FLAT 15% OFF", image: "/promo_necklace_1787207552876.jpg" }
];

export default function HomePage() {
  const [dbProducts, setDbProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const prodsRes = await supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }).limit(8);

      if (prodsRes.data) {
        const mappedProducts: ExtendedProduct[] = prodsRes.data.map(p => {
          let primaryImg = p.image_url;
          if (primaryImg) {
            try {
              if (primaryImg.startsWith("[")) {
                primaryImg = JSON.parse(primaryImg)[0];
              }
            } catch (e) { }
          }
          return {
            id: p.id,
            name: p.title,
            price: p.price,
            oldPrice: p.old_price ? parseFloat(p.old_price) : undefined,
            discount: p.discount || undefined,
            image: primaryImg || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
            category: p.categories?.name?.toUpperCase() || 'UNCATEGORIZED',
            reviews: p.stock > 0 ? Math.min(p.stock * 3, 50) : 0,
            rating: 5
          };
        });
        setDbProducts(mappedProducts);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full bg-white font-sans text-[#333]">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${heroImage}")` }}
        />
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left text-white w-full">
          <div className="max-w-2xl">
            <div className="inline-block border border-white/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="text-[11px] font-semibold tracking-widest uppercase flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                Where Fashion Meets Elegance
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif mb-6 leading-[1.1]">
              Elevate Your Style With<br />Timeless Fashion
            </h1>
            <p className="text-base sm:text-lg text-white/90 max-w-xl mb-10 font-light leading-relaxed">
              Discover a curated collection of elegant fashion and premium jewellery designed to express your unique personality from everyday essentials to statement pieces.
            </p>
            
            <div className="flex flex-wrap items-center gap-8 mb-12">
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span className="text-sm font-semibold tracking-wide">Premium Quality Materials</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span className="text-sm font-semibold tracking-wide">Affordable Luxury Collection</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link href="/products">
                <button className="px-8 py-4 bg-transparent border border-white text-white font-semibold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all-200">
                  Explore Collection
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex gap-1 text-orange-400">
                  {"★★★★★"}
                </div>
                <div className="text-sm font-bold">
                  4.9/5 <span className="font-normal text-white/80">Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Selling Jewelry Collection */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Best Seller</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#222]">Top Selling Jewelry Collection</h2>
          </div>
          <Link href="/products">
            <button className="px-6 py-3 border border-gray-300 text-xs font-semibold uppercase tracking-widest hover:border-black transition-colors">
              View All Collection
            </button>
          </Link>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-8 pb-8 justify-start md:justify-between">
          {categories.map((cat, i) => (
            <Link key={cat.name + i} href="/products" className="group flex flex-col items-center gap-6 min-w-[140px] md:min-w-[160px] cursor-pointer">
              <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-500 p-2 bg-gray-50">
                <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <span className="text-lg font-serif text-[#333] group-hover:text-[var(--primary)] transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Promotional Banners */}
      <section className="py-12 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoBanners.map((promo, idx) => (
            <div key={idx} className="bg-[#f9f9f9] flex items-center p-6 md:p-8 overflow-hidden group border border-gray-100">
              <div className="flex-1 flex flex-col z-10 relative">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 mb-4">{promo.discount}</span>
                <h3 className="text-xl md:text-2xl font-serif leading-tight mb-8 max-w-[150px]">{promo.title}</h3>
                <Link href="/products" className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                  View Collection <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] -mr-8 -my-8 z-0 relative flex-shrink-0 mix-blend-multiply">
                <img src={promo.image} alt={promo.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Signature Jewellery Pieces (Products) */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 border border-gray-200 rounded-full px-4 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Our Products</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#222]">Explore Our Signature Jewellery Pieces</h2>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading products...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {dbProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Discover Our Jewellery Collections (New Collections) */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full border-t border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#222]">Discover Our Jewellery Collections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Men's Collection */}
          <div className="border border-gray-200 p-8 md:p-12 flex flex-col-reverse sm:flex-row items-center justify-between group">
            <div className="max-w-[200px] flex flex-col gap-6 mt-8 sm:mt-0">
              <h3 className="text-2xl md:text-3xl font-serif text-[#222]">New Collection<br/>For Men</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 md:mb-6">Our latest men's jewellery collection, crafted to reflect strength, style, and individuality.</p>
              <Link href="/products">
                <button className="px-6 py-3 border border-gray-300 text-xs font-semibold tracking-widest hover:border-black transition-colors uppercase">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] overflow-hidden ml-0 sm:ml-4 flex-shrink-0 rounded-sm">
              <img src="/new_coll_men_1787207940838.jpg" alt="Men's Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          
          {/* Women's Collection */}
          <div className="border border-gray-200 p-8 md:p-12 flex flex-col-reverse sm:flex-row items-center justify-between group">
            <div className="max-w-[200px] flex flex-col gap-6 mt-8 sm:mt-0">
              <h3 className="text-2xl md:text-3xl font-serif text-[#222]">New Collection<br/>For Women</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 md:mb-6">Our latest women's jewellery collection, crafted to reflect elegance, style, and individuality.</p>
              <Link href="/products">
                <button className="px-6 py-3 border border-gray-300 text-xs font-semibold tracking-widest hover:border-black transition-colors uppercase">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] overflow-hidden ml-0 sm:ml-4 flex-shrink-0 rounded-sm">
              <img src="/new_coll_women_1787207961263.jpg" alt="Women's Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}

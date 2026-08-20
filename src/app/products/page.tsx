"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryParam ? categoryParam.toUpperCase() : 'All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam.toUpperCase());
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catsRes, prodsRes] = await Promise.all([
          supabase.from('categories').select('*').order('name'),
          supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false })
        ]);

        if (catsRes.data && catsRes.data.length > 0) {
          const catNames = ['All', ...catsRes.data.map((c: any) => c.name.toUpperCase())];
          setCategories(catNames);
        }

        if (prodsRes.data) {
          const dbProds: Product[] = prodsRes.data.map((p: any) => {
            // Parse image_url: could be a single URL string or a JSON array string like ["url1","url2"]
            let primaryImage = p.image_url || '';
            if (primaryImage.startsWith('[')) {
              try {
                const parsed = JSON.parse(primaryImage);
                primaryImage = parsed[0] || '';
              } catch (e) {}
            }
            if (!primaryImage) {
              primaryImage = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80';
            }
            return {
              id: p.id,
              name: p.title,
              price: p.price,
              oldPrice: p.old_price ? parseFloat(p.old_price) : undefined,
              discount: p.discount || undefined,
              image: primaryImage,
              category: p.categories?.name?.toUpperCase() || 'FURNITURE',
              description: p.description
            };
          });
          setProducts(dbProds);
        }
      } catch (err) {
        console.error('Error fetching products from Supabase:', err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category?.toUpperCase() === activeCategory.toUpperCase());

  return (
    <div className="flex-grow bg-[var(--background)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {activeCategory === 'All' ? 'Our Collection' : `${activeCategory} Collection`}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Heaven Jewels is a premium kitchen essentials brand offering thoughtfully designed products that combine elegant style, modern functionality, and lasting quality to make everyday cooking simpler and more enjoyable.
          </p>
        </div>

        {/* Filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all-200 ${
                  activeCategory.toUpperCase() === category.toUpperCase() 
                    ? 'bg-[var(--primary)] text-white shadow-md' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 font-bold text-lg animate-pulse">
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-medium">
            No products found for "{activeCategory}". Add products to this category from the Admin Panel.
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="text-center py-20 text-gray-500 font-bold text-lg animate-pulse">
        Loading collection...
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
          const dbProds: Product[] = prodsRes.data.map((p: any) => ({
            id: p.id,
            name: p.title,
            price: p.price,
            image: p.image_url || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
            category: p.categories?.name?.toUpperCase() || 'FURNITURE',
            description: p.description
          }));
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Our Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated selection of premium furniture and decor, designed to transform your house into a heaven home.
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
                  activeCategory === category 
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
          <div className="text-center py-20 text-gray-500">
            No products found. Add products from the Admin Panel to display them here.
          </div>
        )}
      </div>
    </div>
  );
}

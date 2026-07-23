"use client";

import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/hooks/useCart';

import { ALL_PRODUCTS } from '@/data/products';

const CATEGORIES = ['All', 'Furniture', 'Lighting', 'Decor'];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

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
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map(category => (
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

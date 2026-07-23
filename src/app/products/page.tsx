"use client";

import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/hooks/useCart';

// Mock product database
const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Velvet Sofa',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
    description: 'A luxurious velvet sofa that brings elegance to any living room.'
  },
  {
    id: '2',
    name: 'Golden Elegance Chandelier',
    price: 899.00,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    category: 'Lighting',
    description: 'Breathtaking golden chandelier to brighten up your dining area.'
  },
  {
    id: '3',
    name: 'Olive Grove Armchair',
    price: 549.50,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
    description: 'Comfortable armchair in deep olive green, perfectly matching your decor.'
  },
  {
    id: '4',
    name: 'Minimalist Coffee Table',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
    description: 'Sleek and minimalist coffee table with a gold-accented frame.'
  },
  {
    id: '5',
    name: 'Botanical Ceramic Vase',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=800&q=80',
    category: 'Decor',
    description: 'Handcrafted ceramic vase with elegant botanical motifs.'
  },
  {
    id: '6',
    name: 'Brass Floor Lamp',
    price: 245.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    category: 'Lighting',
    description: 'Modern brass floor lamp providing warm ambient lighting.'
  },
  {
    id: '7',
    name: 'Velvet Throw Pillow',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=800&q=80',
    category: 'Decor',
    description: 'Soft velvet throw pillow in deep olive.'
  },
  {
    id: '8',
    name: 'Walnut Dining Table',
    price: 1450.00,
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=80',
    category: 'Furniture',
    description: 'Solid walnut dining table seating up to 8.'
  }
];

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

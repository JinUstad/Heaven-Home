"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';

export function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const getUserInitials = () => {
    if (!session || !session.user) return "U";
    
    let name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || "";
    
    if (!name && session.user.email) {
      name = session.user.email.split('@')[0];
    }
    
    if (!name) return "U";
    
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBackendCategories = async () => {
      setFetchingCategories(true);
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (!error && data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error('Error fetching backend categories:', err);
      } finally {
        setFetchingCategories(false);
      }
    };

    fetchBackendCategories();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-gray-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-[var(--primary)] p-2 rounded-lg bg-gray-50 border border-gray-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Heaven Jewels Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
              About Us
            </Link>
            <Link href="/blogs" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
              Blogs
            </Link>
            
            {/* Dynamic Backend Category Dropdown */}
            <div className="group relative">
              <Link href="/products" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors flex items-center gap-1.5 h-full py-6">
                Products
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </Link>

              {/* Dynamic Dropdown Card */}
              <div className="absolute top-full left-0 w-64 bg-white shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-2xl overflow-hidden py-3 px-2">
                <div className="max-h-80 overflow-y-auto space-y-1 custom-scrollbar">
                  {fetchingCategories ? (
                    <div className="px-3 py-3 text-xs text-gray-400 text-center">Loading categories...</div>
                  ) : categories.length === 0 ? (
                    <div className="px-3 py-3 text-xs text-gray-400 text-center">No categories found</div>
                  ) : (
                    <>
                      <Link
                        href="/products"
                        className="flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-[#4A5D23]/10 hover:text-[#4A5D23] rounded-xl transition-colors"
                      >
                        <span>All Products</span>
                        <span className="text-xs text-gray-400">→</span>
                      </Link>
                      
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/products?category=${encodeURIComponent(cat.name)}`}
                          className="flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-[#4A5D23]/10 hover:text-[#4A5D23] rounded-xl transition-colors group/item"
                        >
                          <span className="truncate">{cat.name}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 text-[#4A5D23] transition-opacity">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link href="/contact" className="text-gray-700 hover:text-[var(--primary)] font-medium transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-[var(--primary)] transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[var(--primary)] transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-[var(--accent)] rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {session ? (
              <div className="relative hidden sm:block">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="w-10 h-10 rounded-full bg-[var(--primary)] text-white font-bold flex items-center justify-center hover:bg-opacity-90 transition-colors shadow-sm border-2 border-white ring-1 ring-gray-200"
                >
                  {getUserInitials()}
                </button>
                
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <button 
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden sm:inline-block bg-[var(--primary)] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors shadow-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-lg animate-fade-in">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-900 font-bold hover:text-[var(--primary)] py-2 border-b border-gray-100"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-900 font-bold hover:text-[var(--primary)] py-2 border-b border-gray-100"
          >
            About Us
          </Link>

          <Link 
            href="/blogs" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-900 font-bold hover:text-[var(--primary)] py-2 border-b border-gray-100"
          >
            Blogs
          </Link>
          
          <div className="py-2 border-b border-gray-100 space-y-2">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Our Products</span>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-gray-900 hover:text-[var(--primary)] pl-2 py-1"
            >
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-700 hover:text-[#4A5D23] pl-4 py-1"
              >
                • {cat.name}
              </Link>
            ))}
          </div>

          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-900 font-bold hover:text-[var(--primary)] py-2 border-b border-gray-100"
          >
            Contact Us
          </Link>
          {session ? (
            <div className="py-2 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white font-bold flex items-center justify-center text-lg shadow-sm border-2 border-white ring-1 ring-gray-200">
                  {getUserInitials()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>
              </div>
              <button 
                onClick={async () => {
                  await supabase.auth.signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 font-bold py-3 rounded-full uppercase tracking-wider text-xs transition-colors hover:bg-red-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-[var(--primary)] text-white font-bold py-3 rounded-full uppercase tracking-wider text-xs hover:bg-opacity-90 transition-colors shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}


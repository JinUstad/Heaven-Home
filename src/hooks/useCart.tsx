"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from 'react-hot-toast';

export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  image: string;
  category?: string;
  description?: string;
};

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("heaven-home-cart");
    const savedWishlist = localStorage.getItem("heaven-home-wishlist");
    
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Failed to parse cart"); }
    }
    
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error("Failed to parse wishlist"); }
    }
    
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("heaven-home-cart", JSON.stringify(cart));
      localStorage.setItem("heaven-home-wishlist", JSON.stringify(wishlist));
    }
  }, [cart, wishlist, isLoaded]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    toast.success(`${product.name} added to cart!`, {
      id: 'cart-toast',
      style: {
        background: '#1d3227',
        color: '#fff',
        borderRadius: '12px',
        fontWeight: 'bold',
      },
      iconTheme: {
        primary: '#4ade80',
        secondary: '#1d3227',
      },
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast.success(`Item removed from cart`, { id: 'cart-toast' });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success(`Cart cleared`, { id: 'cart-toast' });
  };

  const toggleWishlist = (product: Product) => {
    const existing = wishlist.find((item) => item.id === product.id);
    if (existing) {
      toast(`Removed from wishlist`, { icon: '💔', id: 'wishlist-toast' });
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    } else {
      toast.success(`${product.name} added to wishlist!`, {
        icon: '❤️',
        id: 'wishlist-toast',
        style: {
          background: 'var(--primary)',
          color: '#fff',
          fontWeight: 'bold',
        }
      });
      setWishlist((prev) => [...prev, product]);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        cartTotal,
        cartCount,
        wishlistCount,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/Button';
import { load } from '@cashfreepayments/cashfree-js';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    
    try {
      // 1. Create order on backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          customerId: `cust_${Date.now()}`,
          customerName: "Guest User", // You can update this from user session if logged in
          customerEmail: "guest@example.com",
          customerPhone: "9999999999"
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        const errorMsg = data.details?.message || (typeof data.details === 'string' ? data.details : data.error) || "Failed to create order";
        throw new Error(errorMsg);
      }

      if (!data.payment_session_id) {
        throw new Error("Missing payment session ID from response");
      }

      // 2. Load Cashfree SDK matching backend environment
      const cashfree = await load({
        mode: data.environment || "sandbox"
      });

      // 3. Trigger Checkout Popup
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal" as const
      };

      cashfree.checkout(checkoutOptions).then((result: any) => {
        if(result.error){
          toast(result.error.message || "Payment was cancelled.", { icon: 'ℹ️' });
          console.log("Payment Info:", result.error.message || result.error);
        }
        if(result.redirect){
          console.log("Payment will be redirected");
        }
        if(result.paymentDetails){
          toast.success("Payment successful!");
          console.log("Payment Details:", result.paymentDetails);
          clearCart();
        }
        setIsCheckingOut(false);
      });

    } catch (error: any) {
      toast.error(error.message || "Something went wrong during checkout.");
      console.error(error);
      setIsCheckingOut(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center py-20 bg-[var(--background)] px-4 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like you haven't added any premium items to your cart yet. Discover our collection and find your perfect piece.
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-10">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden sm:grid sm:grid-cols-6 gap-4 p-6 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="sm:col-span-3">Product</div>
                <div className="sm:col-span-1 text-center">Price</div>
                <div className="sm:col-span-1 text-center">Quantity</div>
                <div className="sm:col-span-1 text-right">Total</div>
              </div>
              
              <ul className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:grid sm:grid-cols-6 gap-4 items-center">
                    <div className="w-full sm:col-span-3 flex items-center gap-4">
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <Link href={`/products/${item.id}`} className="text-lg font-bold text-gray-900 hover:text-[var(--primary)] transition-colors">
                          {item.name}
                        </Link>
                        <span className="text-sm text-gray-500">{item.category}</span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 mt-2 text-left self-start flex items-center gap-1 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full sm:col-span-1 flex justify-between sm:justify-center items-center">
                      <span className="sm:hidden text-gray-500">Price:</span>
                      <span className="font-medium text-gray-900">₹{item.price.toFixed(2)}</span>
                    </div>
                    
                    <div className="w-full sm:col-span-1 flex justify-between sm:justify-center items-center">
                      <span className="sm:hidden text-gray-500">Quantity:</span>
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-[var(--primary)] hover:bg-gray-50"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                        <button 
                          className="px-2 py-1 text-gray-500 hover:text-[var(--primary)] hover:bg-gray-50"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full sm:col-span-1 flex justify-between sm:justify-end items-center">
                      <span className="sm:hidden text-gray-500">Total:</span>
                      <span className="font-bold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                <Link href="/products" className="text-[var(--primary)] hover:text-black font-medium text-sm flex items-center gap-1 transition-colors">
                  &larr; Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="font-bold text-xs uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">Free</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-[var(--primary)] text-2xl">₹{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                variant="primary" 
                fullWidth 
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  Secure Cashfree checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

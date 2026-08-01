"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/Button';
import { load } from '@cashfreepayments/cashfree-js';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { User, Phone, MapPin, Mail, ShieldCheck, X, CreditCard, Loader2 } from 'lucide-react';
import { generateAndDownloadReceipt } from '@/utils/generateReceipt';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(false);

  // Delivery confirmation form state
  const [customerDetails, setCustomerDetails] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: ""
  });
  const [confirmError, setConfirmError] = useState("");

  // When user clicks "Proceed to Checkout" in the cart summary
  const handleProceedToCheckout = async () => {
    if (cart.length === 0) return;

    setFetchingProfile(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setFetchingProfile(false);
        setShowLoginModal(true);
        return;
      }

      // Fetch latest profile from users table
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      const initialName = profile?.full_name || session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || "";
      const initialPhone = profile?.phone_number || session.user.user_metadata?.phone_number || "";
      const initialAddress = profile?.address || session.user.user_metadata?.address || "";
      const initialPincode = profile?.pincode || session.user.user_metadata?.pincode || "";
      const initialEmail = profile?.email || session.user.email || "";

      setCustomerDetails({
        userId: session.user.id,
        name: initialName,
        email: initialEmail,
        phone: initialPhone,
        address: initialAddress,
        pincode: initialPincode
      });
      setConfirmError("");
      setShowConfirmModal(true);
    } catch (err: any) {
      toast.error(err.message || "Failed to load account details");
    } finally {
      setFetchingProfile(false);
    }
  };

  // When user confirms details and proceeds to Cashfree
  const handleConfirmAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name.trim() || !customerDetails.phone.trim() || !customerDetails.address.trim() || !customerDetails.pincode.trim()) {
      setConfirmError("Please fill in all delivery details.");
      return;
    }

    const cleanPhone = customerDetails.phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setConfirmError("Please enter a valid 10-digit phone number.");
      return;
    }

    const cleanPincode = customerDetails.pincode.replace(/\D/g, "");
    if (cleanPincode.length !== 6) {
      setConfirmError("Please enter a valid 6-digit pincode.");
      return;
    }

    setIsCheckingOut(true);
    setConfirmError("");

    try {
      // 1. Update/Save the latest confirmed details to Supabase users table
      if (customerDetails.userId) {
        await supabase
          .from("users")
          .upsert([
            {
              id: customerDetails.userId,
              email: customerDetails.email,
              full_name: customerDetails.name.trim(),
              phone_number: cleanPhone,
              address: customerDetails.address.trim(),
              pincode: cleanPincode,
              created_at: new Date().toISOString()
            }
          ], { onConflict: "id" });

        // Also sync user metadata
        await supabase.auth.updateUser({
          data: {
            full_name: customerDetails.name.trim(),
            phone_number: cleanPhone,
            address: customerDetails.address.trim(),
            pincode: cleanPincode
          }
        });
      }

      // 2. Create Cashfree Order on backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          customerId: customerDetails.userId || `cust_${Date.now()}`,
          customerName: customerDetails.name.trim(),
          customerEmail: customerDetails.email || "customer@heavenhome.com",
          customerPhone: cleanPhone
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

      // Close the confirmation modal so Cashfree modal appears cleanly
      setShowConfirmModal(false);

      // 3. Load Cashfree SDK
      const cashfree = await load({
        mode: data.environment || "sandbox"
      });

      // 4. Trigger Cashfree Checkout Popup
      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal" as const
      };

      cashfree.checkout(checkoutOptions).then(async (result: any) => {
        if (result.error) {
          toast(result.error.message || "Payment was cancelled.", { icon: 'ℹ️' });
          console.log("Payment Info:", result.error.message || result.error);
        }
        if (result.redirect) {
          console.log("Payment will be redirected");
        }
        if (result.paymentDetails) {
          toast.success("Payment successful! Your order has been placed.");
          console.log("Payment Details:", result.paymentDetails);
          
          let savedOrderId = `ORD_${Date.now()}`;
          try {
            // Save order to database
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.id) {
              const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({ 
                  user_id: session.user.id, 
                  total_amount: cartTotal,
                  status: 'pending'
                })
                .select()
                .single();
                
              if (order && !orderError) {
                savedOrderId = order.id;
                const orderItems = cart.map(item => ({
                  order_id: order.id,
                  product_id: item.id,
                  quantity: item.quantity,
                  price: item.price
                }));
                await supabase.from('order_items').insert(orderItems);
              } else {
                console.error("Error saving order:", orderError);
              }
            }
          } catch (e) {
            console.error("Error finalizing order:", e);
          }
          
          // Auto-download Receipt PDF using jsPDF AutoTable
          try {
            await generateAndDownloadReceipt({
              orderId: savedOrderId,
              orderDate: new Date().toLocaleString('en-IN', {
                dateStyle: 'medium',
                timeStyle: 'short'
              }),
              customerName: customerDetails.name.trim(),
              customerPhone: cleanPhone,
              customerEmail: customerDetails.email,
              deliveryAddress: customerDetails.address.trim(),
              pincode: cleanPincode,
              items: cart.map(c => ({
                id: c.id,
                name: c.name,
                category: c.category,
                price: c.price,
                quantity: c.quantity
              })),
              totalAmount: cartTotal,
              paymentMode: "Cashfree Online (UPI / Card / NetBanking)",
              paymentId: result.paymentDetails?.payment_id || result.paymentDetails?.cf_payment_id || undefined
            });
            toast.success("Receipt downloaded automatically!", { icon: '📄' });
          } catch (pdfErr) {
            console.error("Error generating receipt PDF:", pdfErr);
          }

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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
                onClick={handleProceedToCheckout}
                disabled={isCheckingOut || fetchingProfile}
              >
                {fetchingProfile ? "Loading Details..." : isCheckingOut ? "Processing..." : "Proceed to Checkout"}
              </Button>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Secure Cashfree checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONFIRM DELIVERY DETAILS MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => !isCheckingOut && setShowConfirmModal(false)} 
          />
          <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden z-10 animate-fade-in flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[var(--primary)]" />
                  <h3 className="text-xl font-serif font-bold text-gray-900">Confirm Delivery Details</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Please review and edit your contact & shipping address before proceeding.
                </p>
              </div>
              <button 
                onClick={() => setShowConfirmModal(false)}
                disabled={isCheckingOut}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleConfirmAndPay} className="p-6 overflow-y-auto flex-1 space-y-4">
              {confirmError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-center font-medium">
                  {confirmError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-gray-400" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    Phone Number (10 digits)
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value.replace(/\D/g, "") })}
                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    Email (Receipt)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={customerDetails.email}
                    className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  Delivery Address
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="House / Flat No., Building, Street, Area, Landmark, City, State..."
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Pincode (6 digits)
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="110001"
                  value={customerDetails.pincode}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value.replace(/\D/g, "") })}
                  className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all font-mono"
                />
              </div>

              {/* Order total strip */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3.5 flex items-center justify-between mt-2">
                <div>
                  <span className="text-xs text-emerald-800 font-medium block">Total Payable Amount</span>
                  <span className="text-xs text-emerald-600">Free Doorstep Delivery</span>
                </div>
                <span className="text-xl font-bold text-emerald-900 font-serif">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  disabled={isCheckingOut}
                  className="w-full sm:w-1/3 py-3 px-4 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className="w-full sm:w-2/3 py-3 px-4 bg-[var(--primary)] hover:bg-opacity-95 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-70"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Connecting to Cashfree...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      Proceed to Pay
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-in border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Login Required</h3>
            <p className="text-gray-500 mb-6">You need to log in or sign up to proceed with the checkout process.</p>
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setShowLoginModal(false)}>
                <Button variant="primary" fullWidth size="lg">Log In</Button>
              </Link>
              <Link href="/register" onClick={() => setShowLoginModal(false)}>
                <Button variant="outline" fullWidth size="lg">Sign Up</Button>
              </Link>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="mt-2 text-sm text-gray-500 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

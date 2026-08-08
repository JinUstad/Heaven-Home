"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart, Product } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';
import { 
  ShoppingCart, 
  Zap, 
  Heart, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  CreditCard,
  Share2, 
  Check, 
  Star,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import toast from 'react-hot-toast';
import { renderRichMarkdown } from '@/utils/markdown';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const mainImageRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50, isHovered: false });
  const [copiedLink, setCopiedLink] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setZoomPos({ x: 50, y: 50, isHovered: false });
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on Heaven Home!`,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToCartAction = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to cart!`, {
      icon: '🛒',
      duration: 2500
    });
  };

  const handleBuyNowAction = () => {
    if (!product) return;
    addToCart(product, quantity);
    router.push('/cart');
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, categories(name)')
          .eq('id', id)
          .maybeSingle();

        if (data && !error) {
          let parsedImages: string[] = [];
          if (data.image_url) {
            try {
              if (data.image_url.startsWith("[")) {
                parsedImages = JSON.parse(data.image_url);
              } else {
                parsedImages = [data.image_url];
              }
            } catch (e) {
              parsedImages = [data.image_url];
            }
          }

          if (parsedImages.length === 0) {
            parsedImages = ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'];
          }

          setImages(parsedImages);
          setActiveImageIndex(0);

          setProduct({
            id: data.id,
            name: data.title,
            price: data.price,
            oldPrice: data.old_price ? parseFloat(data.old_price) : undefined,
            discount: data.discount || undefined,
            image: parsedImages[0],
            category: data.categories?.name?.toUpperCase() || 'FURNITURE',
            description: data.description || 'No description available for this product.'
          });
        }
      } catch (err) {
        console.error('Error fetching product from Supabase:', err);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--primary)] mb-4" />
        <div className="text-gray-600 font-medium text-base">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-serif text-[#333] mb-3">Product Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-md text-sm">We couldn't find the product you're looking for. It might have been removed or the link is incorrect.</p>
        <Link href="/products" className="inline-block bg-[var(--primary)] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-opacity-90 transition-colors shadow-md">
          Back to Collection
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14 pb-28 md:pb-16 animate-fade-in">
      <ProductJsonLd
        id={product.id}
        name={product.name}
        description={product.description || ''}
        images={images}
        price={product.price}
        oldPrice={product.old_price}
        category={product.category}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Collection', url: '/products' },
          { name: product.name, url: `/products/${product.id}` }
        ]}
      />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 text-xs sm:text-sm text-gray-500 flex items-center flex-wrap gap-1.5">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href="/products" className="hover:text-[var(--primary)] transition-colors">Collection</Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* LEFT COLUMN: Product Gallery & Desktop Flipkart-Style Action Buttons */}
        <div className="lg:col-span-6 flex flex-col gap-4 lg:sticky lg:top-24">
          
          {/* Main Image Frame */}
          <div 
            ref={mainImageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-square bg-[#fbfbfb] rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm flex items-center justify-center p-4 sm:p-8 cursor-crosshair group"
          >
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md z-10 uppercase tracking-wider pointer-events-none">
                {product.discount}
              </div>
            )}

            {/* Wishlist Button (Top Right of Image) */}
            <button 
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3.5 right-3.5 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md z-10 cursor-pointer ${
                isWishlisted 
                  ? 'bg-red-50 text-red-500 border border-red-200' 
                  : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white border border-gray-100'
              }`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {images.length > 0 && (
              <img 
                src={images[activeImageIndex] || images[0]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-200 pointer-events-none"
                style={
                  zoomPos.isHovered
                    ? { 
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, 
                        transform: 'scale(2.1)' 
                      } 
                    : { transform: 'scale(1)' }
                }
              />
            )}
            
            {/* Zoom Hint Indicator */}
            <div className="absolute bottom-3 right-3 bg-black/65 text-white text-[11px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none hidden sm:flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
              Hover to zoom
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 custom-scrollbar">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveImageIndex(idx)}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all p-1 bg-[#fbfbfb] shrink-0 cursor-pointer ${
                    activeImageIndex === idx 
                      ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20 scale-105 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain rounded-lg" />
                </button>
              ))}
            </div>
          )}

          {/* FLIPKART STYLE ACTION BUTTONS (DESKTOP / LAPTOP) */}
          <div className="hidden lg:grid grid-cols-2 gap-3.5 pt-2 w-full">
            <button 
              onClick={handleAddToCartAction}
              className="bg-[#ff9f00] hover:bg-[#e68f00] text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNowAction}
              className="bg-[var(--primary)] hover:bg-[#3b4b1a] text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              Buy Now
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Product Info, Pricing, Rich Details & Badges */}
        <div className="lg:col-span-6 flex flex-col">
          
          {/* Header Row: Category Tag & Share Action */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <span className="text-[var(--primary)] bg-[var(--primary)]/10 px-3 py-1 rounded-full font-bold tracking-widest uppercase text-xs">
              {product.category}
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "Copied" : "Share"}</span>
            </button>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1f1f1f] mb-3 leading-snug">
            {product.name}
          </h1>

          {/* Rating Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
              4.8 <Star className="w-3 h-3 fill-current" />
            </span>
            <span className="text-xs text-gray-500 font-medium">Ratings & Reviews Verified</span>
          </div>
          
          {/* Flipkart Style Price Display */}
          <div className="flex items-baseline flex-wrap gap-3 mb-6 p-4 bg-gray-50/70 rounded-2xl border border-gray-100">
            <span className="text-3xl sm:text-4xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </span>
            {product.oldPrice && (
              <span className="text-base sm:text-lg text-gray-400 line-through font-medium">
                ₹{product.oldPrice.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </span>
            )}
            {product.discount && (
              <span className="text-emerald-700 font-bold text-sm tracking-wide">
                {product.discount}
              </span>
            )}
            <span className="text-xs text-gray-400 w-full mt-0.5">Inclusive of all taxes</span>
          </div>

          {/* Quantity Stepper (Tablet / Laptop) */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-xl bg-white h-11 w-32 shadow-sm overflow-hidden">
              <button 
                className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 text-lg transition-colors cursor-pointer"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="flex-1 text-center font-bold text-gray-900 text-sm">{quantity}</span>
              <button 
                className="w-10 h-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-100 text-lg transition-colors cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* FLIPKART STYLE TRUST BADGES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
              <Truck className="w-5 h-5 text-[var(--primary)] mb-1.5" />
              <span className="text-[11px] font-bold text-gray-800">Free Delivery</span>
              <span className="text-[10px] text-gray-500">All India</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
              <RotateCcw className="w-5 h-5 text-[var(--primary)] mb-1.5" />
              <span className="text-[11px] font-bold text-gray-800">7 Days</span>
              <span className="text-[10px] text-gray-500">Replacement</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[var(--primary)] mb-1.5" />
              <span className="text-[11px] font-bold text-gray-800">100% Genuine</span>
              <span className="text-[10px] text-gray-500">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
              <CreditCard className="w-5 h-5 text-[var(--primary)] mb-1.5" />
              <span className="text-[11px] font-bold text-gray-800">Secure Pay</span>
              <span className="text-[10px] text-gray-500">UPI / Card / Net</span>
            </div>
          </div>
          
          {/* Rich Description & Specifications */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2">
              Product Overview & Specifications
            </h3>
            
            <div className="prose prose-neutral max-w-none text-gray-700 leading-relaxed text-sm sm:text-base space-y-2.5">
              {product.description ? (
                renderRichMarkdown(product.description)
              ) : (
                <p className="text-gray-400 italic text-sm">No description available for this product.</p>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* MOBILE FIXED BOTTOM ACTION BAR (FLIPKART STYLE STICKY FOOTER) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex items-center gap-3 shadow-2xl">
        <button 
          onClick={handleAddToCartAction}
          className="flex-1 bg-[#ff9f00] hover:bg-[#e68f00] text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        <button 
          onClick={handleBuyNowAction}
          className="flex-1 bg-[var(--primary)] hover:bg-[#3b4b1a] text-white h-12 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current" />
          Buy Now
        </button>
      </div>

    </div>
  );
}

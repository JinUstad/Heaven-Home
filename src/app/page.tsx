"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard, ExtendedProduct } from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { ArrowRight, ArrowLeft, ThumbsUp, Search, Award, Shield, Gem, Plus, Minus } from 'lucide-react';




const promoBanners = [
  { title: "Brilliant Gold Ring Collection", discount: "FLAT 15% OFF", image: "/promo_ring_1787207518511.jpg" },
  { title: "Golden Elegance Bracelet", discount: "FLAT 15% OFF", image: "/promo_bracelet_1787207535528.jpg" },
  { title: "Chic Necklaces for Her", discount: "FLAT 15% OFF", image: "/promo_necklace_1787207552876.jpg" }
];

const testimonials = [
  { text: "Absolutely loved the quality and design! The jewellery looks even more stunning in real life. I've received so many compliments. Premium quality at a great price. I keep coming back for more because the collection is always fresh and stylish!", name: "Kavya Shah", role: "Working Professional", image: "/testimonial_avatar.jpg" },
  { text: "The craftsmanship is unparalleled. Each piece tells a story of elegance. I am truly mesmerized by the intricate details and the exceptional customer service. Heaven Jewels is my go-to for all special occasions.", name: "Aisha Patel", role: "Fashion Blogger", image: "/testimonial_avatar.jpg" },
  { text: "Finding authentic and beautiful jewelry online can be daunting, but Heaven Jewels exceeded all my expectations. Fast shipping, beautiful packaging, and absolutely stunning pieces. Highly recommended!", name: "Riya Sharma", role: "Entrepreneur", image: "/testimonial_avatar.jpg" }
];

const faqs = [
  { question: "What type of jewellery does Heaven Jewels offer?", answer: "We offer a curated collection of stylish and elegant jewellery, including earrings, necklaces, pendants, bracelets, rings, and bangles." },
  { question: "Is Heaven Jewels jewellery made of gold?", answer: "No. Heaven Jewels does not deal in gold jewellery. Our collection focuses on fashionable, elegant, and beautifully designed jewellery pieces." },
  { question: "How do I place an order?", answer: "Simply choose your favourite product, add it to your cart, and complete the checkout process on our website." },
  { question: "How long will my order take to arrive?", answer: "Delivery time depends on your location. Estimated delivery details will be provided during the checkout process." },
  { question: "How should I care for my jewellery?", answer: "Keep your jewellery away from water, perfumes, cosmetics, sweat, and chemicals. Store it in a dry place or jewellery pouch when not in use to maintain its appearance." }
];


export default function HomePage() {
  const [dbProducts, setDbProducts] = useState<ExtendedProduct[]>([]);
  const [dbBlogs, setDbBlogs] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<{name: string, image: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const prodsRes = await supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }).limit(8);
      
      const blogsRes = await supabase.from('blogs').select('*').order('published_at', { ascending: false }).limit(3);
      if (blogsRes.data) {
        setDbBlogs(blogsRes.data);
      }

      const catsRes = await supabase.from('categories').select('*').order('name');
      if (catsRes.data) {
        const mappedCats = catsRes.data.map((c: any) => {
          let image = '/cat_necklace_1787207779203.jpg';
          const nameLower = c.name.toLowerCase();
          if (nameLower.includes('earring')) image = '/cat_earrings_1787207766448.jpg';
          else if (nameLower.includes('necklace') || nameLower.includes('chain') || nameLower.includes('pendant')) image = '/cat_necklace_1787207779203.jpg';
          else if (nameLower.includes('bracelet')) image = '/cat_bracelet_1787207794703.jpg';
          else if (nameLower.includes('ring')) image = '/cat_ring_1787207915244.jpg';
          else if (nameLower.includes('bangle')) image = '/cat_bracelet_1787207794703.jpg';
          return { name: c.name, image };
        });
        setDbCategories(mappedCats);
      }

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
      <section className="relative w-full bg-[#f4ebd9] overflow-hidden">
        <img
          src="/hero-banner.png"
          alt="Heaven Jewels - Shine Beyond the Ordinary"
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
        />
      </section>

      {/* 1.5. The Promise of Perfection (Features) */}
      <section className="py-20 w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 border border-gray-200 rounded-full px-4 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Our Promise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#222]">The Promise of Elegance & Trust</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 border-t border-b border-gray-100 py-12">
            <div className="flex flex-col items-center text-center gap-6 px-4 border-r border-gray-100 last:border-r-0 md:last:border-r-0 max-md:[&:nth-child(2n)]:border-r-0">
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-sm">
                <ThumbsUp className="w-8 h-8 text-gray-700 stroke-[1.5]" />
              </div>
              <p className="font-serif text-lg text-gray-800 leading-tight">Assured Fair <br />Price</p>
            </div>
            <div className="flex flex-col items-center text-center gap-6 px-4 border-r border-gray-100 last:border-r-0 md:last:border-r-0 max-md:[&:nth-child(2n)]:border-r-0">
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-sm">
                <Search className="w-8 h-8 text-gray-700 stroke-[1.5]" />
              </div>
              <p className="font-serif text-lg text-gray-800 leading-tight">Complete <br />Transparency</p>
            </div>
            <div className="flex flex-col items-center text-center gap-6 px-4 border-r border-gray-100 last:border-r-0 md:last:border-r-0 max-md:[&:nth-child(2n)]:border-r-0 relative">
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-sm">
                <Award className="w-8 h-8 text-gray-700 stroke-[1.5]" />
              </div>
              <p className="font-serif text-lg text-gray-800 leading-tight">Quality <br />Craftsmanship</p>
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-800 hidden md:block"></div>
            </div>
            <div className="flex flex-col items-center text-center gap-6 px-4 border-r border-gray-100 last:border-r-0 md:last:border-r-0 max-md:[&:nth-child(2n)]:border-r-0">
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-sm">
                <Shield className="w-8 h-8 text-gray-700 stroke-[1.5]" />
              </div>
              <p className="font-serif text-lg text-gray-800 leading-tight">Safe & Secure <br />Purchase</p>
            </div>
            <div className="flex flex-col items-center text-center gap-6 px-4">
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-sm">
                <Gem className="w-8 h-8 text-gray-700 stroke-[1.5]" />
              </div>
              <p className="font-serif text-lg text-gray-800 leading-tight">Jewellery You’ll <br />Love</p>
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

        <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-8 pb-8 snap-x snap-mandatory md:justify-between">
          {dbCategories.map((cat, i) => (
            <Link key={cat.name + i} href={`/products?category=${encodeURIComponent(cat.name)}`} className="group flex flex-col items-center gap-6 min-w-[140px] md:min-w-[160px] cursor-pointer snap-start">
              <div className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-500 p-2 bg-gray-50">
                <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <span className="text-lg font-serif text-[#333] group-hover:text-[var(--primary)] transition-colors text-center truncate w-full px-2">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Promo Banners */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Flat 30% Off Banner */}
          <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
              alt="Flat 30% Off On Premium Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8 text-white">
              <span className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/90">Limited Time Offer</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-8 max-w-sm leading-tight">Flat 30% Off On Premium Collection</h2>
              <Link href="/products">
                <button className="px-8 py-3 bg-transparent border border-white text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-all uppercase">
                  Explore Collection
                </button>
              </Link>
            </div>
          </div>

          {/* 40% Off Banner */}
          <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80"
              alt="Celebrate With 40% Off Collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-8 text-white">
              <span className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/90">Hurry! Offer Ends Soon</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-8 max-w-sm leading-tight">Celebrate With 40% Off Collection</h2>
              <Link href="/products">
                <button className="px-8 py-3 bg-transparent border border-white text-xs font-semibold tracking-widest hover:bg-white hover:text-black transition-all uppercase">
                  Explore Collection
                </button>
              </Link>
            </div>
          </div>
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

      {/* 5. Testimonials */}
      <section className="relative py-24 w-full flex items-center overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("/testimonial_bg.jpg")' }}>
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between gap-12">

          <div className="w-full md:w-1/2 text-white text-left">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c69c6d]"></span>
              <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-12 leading-tight">
              Trusted Reviews From Jewellery<br className="hidden lg:block" /> Style Enthusiasts
            </h2>

            {/* Slider Content */}
            <div className="min-h-[220px] flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-white mb-6">
                  {"★★★★★".split('').map((star, i) => <span key={i} className="text-lg">{star}</span>)}
                </div>
                <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed mb-10 max-w-xl animate-fade-in" key={currentTestimonial}>
                  {testimonials[currentTestimonial].text}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/20 pt-8 animate-fade-in" key={`author-${currentTestimonial}`}>
                <div className="flex items-center gap-4">
                  <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover" />
                  <div>
                    <h4 className="font-serif text-base sm:text-lg">{testimonials[currentTestimonial].name}</h4>
                    <span className="text-xs text-white/70">{testimonials[currentTestimonial].role}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={prevTestimonial} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button onClick={nextTestimonial} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block md:w-1/2"></div>
        </div>
      </section>

      {/* 6. Discover Our Jewellery Collections (New Collections) */}
      <section className="py-16 max-w-7xl mx-auto px-4 w-full border-t border-gray-100">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#222]">Discover Our Jewellery Collections</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bridal Collection */}
          <div className="border border-gray-200 p-8 md:p-12 flex flex-col-reverse sm:flex-row items-center justify-between group">
            <div className="max-w-[200px] flex flex-col gap-6 mt-8 sm:mt-0">
              <h3 className="text-2xl md:text-3xl font-serif text-[#222]">Bridal<br />Collection</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 md:mb-6">Discover our exquisite bridal jewellery, meticulously crafted to make your special day even more unforgettable and truly elegant.</p>
              <Link href="/products">
                <button className="px-6 py-3 border border-gray-300 text-xs font-semibold tracking-widest hover:border-black transition-colors uppercase">
                  Shop Now
                </button>
              </Link>
            </div>
            <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] overflow-hidden ml-0 sm:ml-4 flex-shrink-0 rounded-sm">
              <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=500&q=80" alt="Bridal Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          {/* Women's Collection */}
          <div className="border border-gray-200 p-8 md:p-12 flex flex-col-reverse sm:flex-row items-center justify-between group">
            <div className="max-w-[200px] flex flex-col gap-6 mt-8 sm:mt-0">
              <h3 className="text-2xl md:text-3xl font-serif text-[#222]">New Collection<br />For Women</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4 md:mb-6">Explore our latest collection of elegant jewellery, thoughtfully selected to complement your style and add a touch of sophistication to every occasion.</p>
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

      {/* 7. FAQ Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-2 mb-6 border border-gray-200 rounded-full px-4 py-1 w-max">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Frequently Asked Questions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#222] mb-8 leading-tight">Common Questions About Our Collection</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-10">Find clear answers to the most common questions about our fashion and jewelry collection, helping you shop.</p>
            <Link href="/faq">
              <button className="px-8 py-3 border border-gray-300 text-xs font-semibold tracking-widest hover:border-black transition-colors uppercase">
                View All FAQ'S
              </button>
            </Link>
          </div>

          <div className="w-full md:w-2/3 flex flex-col">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 py-6 first:pt-0">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left focus:outline-none group"
                >
                  <h3 className="font-serif text-xl md:text-2xl text-[#333] group-hover:text-[var(--primary)] transition-colors pr-8">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-sm">
                    {openFaq === idx ? (
                      <Minus className="w-4 h-4 text-gray-500" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
                    }`}
                >
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Latest Fashion Blogs */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full border-t border-gray-100">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6 border border-gray-200 rounded-full px-4 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Latest Blog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-[#222]">Explore Our Latest Fashion Blogs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dbBlogs.map((blog, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col gap-6">
              <div className="w-full h-[300px] sm:h-[400px] overflow-hidden rounded-sm relative">
                <Link href={`/blogs/${blog.id}`}>
                  <img
                    src={blog.image_url || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                  />
                </Link>
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#222] mb-4 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
                </h3>
                <Link href={`/blogs/${blog.id}`} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-2">
                  Read More <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/blogs">
            <button className="px-8 py-3 border border-gray-300 text-xs font-semibold tracking-widest hover:border-black transition-colors uppercase">
              View All Blogs
            </button>
          </Link>
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

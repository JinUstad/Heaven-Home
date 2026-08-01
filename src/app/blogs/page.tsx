"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search, 
  Sparkles, 
  ChevronDown
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  author: string;
  category: string;
  published_at: string;
  created_at?: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Initial visible count is strictly 6, with "See More" button revealing 3 more each time
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("published_at", { ascending: false });

        if (error) {
          console.error("Error loading blogs from database:", error);
          setBlogs([]);
        } else if (data) {
          setBlogs(data);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Compute available categories dynamically from real blogs
  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category || "Interior Design").filter(Boolean)))];

  // Filtered blogs based on search and category
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.author && blog.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.category && blog.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Current visible slice of blogs (6 initially, +3 on each See More click)
  const displayedBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredBlogs.length;

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const getEstimatedReadTime = (text?: string) => {
    if (!text) return "2 min read";
    const words = text.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Heaven Home Journal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
            Inspiration, Design & Modern Living
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            Explore expert styling guides, decor inspiration, and curated lifestyle articles by the Heaven Home design team.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-b border-gray-100 pb-6">
          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleCount(6); // Reset pagination on filter change
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
                    : "bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 focus:border-[var(--primary)] transition-all"
            />
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[var(--primary)] mb-4"></div>
            <p className="text-gray-500 font-medium">Curating articles for you...</p>
          </div>
        ) : displayedBlogs.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1">No articles found</h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {searchQuery || selectedCategory !== "All"
                ? "We couldn't find any articles matching your search. Try a different keyword or category."
                : "No articles published yet. Check back soon for the latest interior design insights."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((blog, index) => (
              <article
                key={blog.id}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                {/* Blog Card Image with Hover Zoom */}
                <Link href={`/blogs/${blog.id}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.image_url || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-gray-900 shadow-sm border border-gray-100">
                      {blog.category || "Decor"}
                    </span>
                  </div>
                </Link>

                {/* Blog Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    
                    {/* Meta info (Date & Read Time) */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {new Date(blog.published_at || blog.created_at || "").toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {getEstimatedReadTime(blog.content)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-serif font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blogs/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {blog.excerpt || blog.content.replace(/[#*`_>\[\]]/g, '').slice(0, 140) + '...'}
                    </p>
                  </div>

                  {/* Card Footer: Author & Read Link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-[var(--primary)] flex items-center justify-center font-bold text-xs">
                        {(blog.author || "H")[0].toUpperCase()}
                      </div>
                      <span className="text-xs font-semibold text-gray-700 truncate max-w-[110px]">
                        {blog.author || "Heaven Home"}
                      </span>
                    </div>

                    <Link
                      href={`/blogs/${blog.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--primary)] group-hover:translate-x-1 transition-all uppercase tracking-wider"
                    >
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>
              </article>
            ))}
          </div>
        )}

        {/* "SEE MORE" BUTTON (Displays 6 initially, loads +3 on each click) */}
        {!loading && hasMore && (
          <div className="text-center pt-8 pb-12">
            <button
              onClick={handleSeeMore}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all hover:scale-105 uppercase tracking-wider group"
            >
              <span>See More Articles</span>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="text-xs text-gray-400 mt-2">
              Showing {displayedBlogs.length} of {filteredBlogs.length} articles
            </p>
          </div>
        )}

        {/* Reached End Indicator */}
        {!loading && !hasMore && displayedBlogs.length > 0 && (
          <div className="text-center pt-6 pb-10 border-t border-gray-100">
            <p className="text-xs text-gray-400 tracking-wider uppercase font-medium">
              ✦ You have reached the end of our journal ✦
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Copy, 
  Check, 
  BookOpen,
  Share2
} from "lucide-react";
import toast from "react-hot-toast";
import { renderRichMarkdown } from "@/utils/markdown";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

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

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params?.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlogData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", blogId)
          .maybeSingle();

        if (error) {
          console.error("Error fetching blog:", error);
          setBlog(null);
        } else if (data) {
          setBlog(data);
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getEstimatedReadTime = (text?: string) => {
    if (!text) return "3 min read";
    const words = text.split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  // Markdown renderer for rich formatted blog content
  const renderFormattedContent = (text: string) => {
    if (!text) return "";
    return renderRichMarkdown(text, { isBlog: true });
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--background)] px-4">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[var(--primary)] mb-4" />
        <p className="text-gray-500 font-medium">Opening article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[var(--background)] px-4 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Article Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-sm">The article you are looking for may have been removed or does not exist.</p>
        <Link 
          href="/blogs"
          className="px-6 py-2.5 bg-[var(--primary)] text-white rounded-full font-bold text-sm shadow-md"
        >
          Return to Journal
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[var(--background)] py-10 px-4 sm:px-6 lg:px-8">
      <ArticleJsonLd
        id={blog.id}
        title={blog.title}
        excerpt={blog.excerpt}
        content={blog.content}
        imageUrl={blog.image_url}
        author={blog.author}
        publishedAt={blog.published_at || blog.created_at || new Date().toISOString()}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Journal', url: '/blogs' },
          { name: blog.title, url: `/blogs/${blog.id}` }
        ]}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[var(--primary)] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Articles
          </Link>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-sm transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-gray-500" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Header Metadata */}
        <div className="space-y-4 text-center sm:text-left">
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider">
              {blog.category || "Interior Design"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {new Date(blog.published_at || blog.created_at || "").toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {getEstimatedReadTime(blog.content)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Author Badge */}
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {(blog.author || "H")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">
                {blog.author || "Heaven Home Team"}
              </p>
              <p className="text-xs text-gray-500">Design & Lifestyle Contributor</p>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        {blog.image_url && (
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] bg-gray-100 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Excerpt Lead */}
        {blog.excerpt && (
          <div className="bg-white border-l-4 border-[var(--primary)] rounded-r-2xl p-6 shadow-sm">
            <p className="text-lg text-gray-700 font-serif italic leading-relaxed">
              "{blog.excerpt}"
            </p>
          </div>
        )}

        {/* Main Formatted Article Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100">
          <div className="max-w-none">
            {renderFormattedContent(blog.content)}
          </div>

          {/* Article Footer & Share */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category:</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                #{blog.category?.replace(/\s+/g, '') || "Decor"}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                #LuxuryLiving
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-gray-500">Share this story:</span>
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                title="Copy Link"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Callout Shop Banner */}
        <div className="bg-gradient-to-r from-[#202914] to-[#3a491f] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Experience Luxury Living</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">Bring These Designs to Life</h3>
            <p className="text-gray-300 text-sm max-w-md">
              Explore our handcrafted collections designed to transform your living spaces.
            </p>
          </div>
          <Link
            href="/products"
            className="px-8 py-3.5 bg-white text-gray-900 hover:bg-gray-100 font-bold rounded-full text-sm shadow-md transition-all whitespace-nowrap"
          >
            Shop Collection &rarr;
          </Link>
        </div>

      </div>
    </article>
  );
}

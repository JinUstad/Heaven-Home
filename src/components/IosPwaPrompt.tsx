"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Share, PlusSquare, X } from "lucide-react";

export function IosPwaPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Check if user is on iOS device (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    
    // Check if running in standalone mode (already installed as PWA)
    const isStandalone = 
      (window.navigator as any).standalone === true || 
      window.matchMedia("(display-mode: standalone)").matches;

    // Check if user dismissed the prompt recently (within 7 days)
    const dismissedAt = localStorage.getItem("ios_pwa_prompt_dismissed");
    const isDismissedRecently = dismissedAt && Date.now() - parseInt(dismissedAt, 10) < 7 * 24 * 60 * 60 * 1000;

    // Only show if on iOS Safari, not already installed as standalone, and not dismissed recently
    if (isIos && !isStandalone && !isDismissedRecently) {
      // Delay showing for 3 seconds so user can see the page first
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("ios_pwa_prompt_dismissed", Date.now().toString());
  };

  if (!showPrompt) return null;

  return (
    <aside aria-label="Install App Guide" className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#1d3227] text-white p-4 rounded-2xl shadow-2xl border border-emerald-800/40 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          aria-label="Close install prompt"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5 pr-6">
          <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex-shrink-0 shadow-md flex items-center justify-center">
            <Image
              src="/heavenjewels.PNG"
              alt="Heaven Jewels"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif font-bold text-sm text-white tracking-wide">
              Install Heaven Jewels on iPhone
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed">
              Install as an app for faster shopping & instant checkout:
            </p>
            <div className="pt-1.5 flex flex-col gap-1 text-[11px] text-emerald-200">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white">1.</span> Tap the <Share className="w-3.5 h-3.5 inline text-blue-400" /> <span className="font-semibold text-white">Share</span> button below
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white">2.</span> Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline text-emerald-400" /> <span className="font-semibold text-white">Add to Home Screen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex justify-end">
          <button
            onClick={handleDismiss}
            className="text-xs text-emerald-300 hover:text-white font-medium transition-colors"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Authenticating with Google...");

  useEffect(() => {
    const processAuth = async () => {
      // Supabase automatically parses the URL hash/code in the browser
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        setStatus("Authentication failed. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      const user = session.user;
      localStorage.removeItem("auth_intent");

      // Check if user exists in public.users table and has complete profile
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      const fullName = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || "User";

      // If user row doesn't exist yet, insert initial record from Google metadata
      if (!profile) {
        await supabase.from("users").upsert([{
          id: user.id,
          email: user.email,
          full_name: fullName,
          created_at: new Date().toISOString()
        }], { onConflict: 'id' });
      }

      // Check if phone, address, and pincode are present
      const isComplete = 
        profile && 
        profile.phone_number && 
        profile.phone_number.trim() !== "" &&
        profile.address && 
        profile.address.trim() !== "" &&
        profile.pincode && 
        profile.pincode.trim() !== "";

      if (isComplete) {
        setStatus("Welcome back! Redirecting...");
        router.push("/");
      } else {
        setStatus("Please complete your profile details...");
        router.push("/complete-profile");
      }
    };

    // Wait a brief moment to ensure Supabase client has processed the URL tokens
    const timeout = setTimeout(() => {
      processAuth();
    }, 500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full text-center">
        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">{status}</p>
      </div>
    </div>
  );
}

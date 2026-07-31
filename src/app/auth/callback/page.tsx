"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Authenticating...");

  useEffect(() => {
    const processAuth = async () => {
      // Supabase automatically parses the URL hash in the browser
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        setStatus("Authentication failed. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      const user = session.user;
      const intent = localStorage.getItem("auth_intent");
      localStorage.removeItem("auth_intent"); // clear it

      // Check if user has a profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (intent === "login") {
        if (!profile) {
          // They tried to login but have no profile
          setStatus("Account not found. Please sign up first.");
          await supabase.auth.signOut();
          setTimeout(() => router.push("/register"), 2000);
        } else {
          // Successful login
          router.push("/");
        }
      } else if (intent === "signup") {
        if (!profile) {
          // They are signing up and need to complete profile
          router.push("/complete-profile");
        } else {
          // They already have an account, so just log them in
          router.push("/");
        }
      } else {
        // Fallback if intent is missing
        if (!profile) {
          router.push("/complete-profile");
        } else {
          router.push("/");
        }
      }
    };

    // Wait a brief moment to ensure Supabase client has processed the URL
    const timeout = setTimeout(() => {
      processAuth();
    }, 500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-medium">{status}</p>
      </div>
    </div>
  );
}

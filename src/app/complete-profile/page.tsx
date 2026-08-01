"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CompleteProfile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<{ id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      
      // Check if user record already exists in users table and is complete
      const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
        
      if (profile && profile.phone_number && profile.address && profile.pincode) {
        router.push("/");
        return;
      }

      const initialName = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "";
      setName(initialName);
      if (profile?.phone_number) setPhone(profile.phone_number);
      if (profile?.address) setAddress(profile.address);
      if (profile?.pincode) setPincode(profile.pincode);

      setUserData({
        id: user.id,
        name: initialName,
        email: user.email || ""
      });
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    
    // 10 digit phone validation
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // 6 digit pincode validation
    const cleanPincode = pincode.replace(/\D/g, "");
    if (cleanPincode.length !== 6) {
      setError("Please enter a valid 6-digit pincode.");
      return;
    }

    if (!userData) return;

    setLoading(true);
    setError("");

    try {
      // 1. Upsert into public users table
      const { error: dbError } = await supabase
        .from("users")
        .upsert([
          {
            id: userData.id,
            email: userData.email,
            full_name: name.trim(),
            phone_number: cleanPhone,
            address: address.trim(),
            pincode: cleanPincode,
            created_at: new Date().toISOString()
          }
        ], { onConflict: "id" });

      if (dbError) {
        throw dbError;
      }

      // 2. Also update Supabase Auth user metadata for quick access in session
      await supabase.auth.updateUser({
        data: {
          full_name: name.trim(),
          phone_number: cleanPhone,
          address: address.trim(),
          pincode: cleanPincode
        }
      });

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Failed to save profile. Please try again.");
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-serif mb-2">Complete Your Profile</h2>
          <p className="text-gray-600 text-sm">
            Please provide your contact and delivery details to complete your account setup.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                disabled
                value={userData.email}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (10 digits)</label>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                required
                rows={3}
                placeholder="House / Flat No., Street, Area, City, State..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode (6 digits)</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="110001"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--primary)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-70 transition-colors uppercase tracking-wider"
          >
            {loading ? "Saving Details..." : "Save & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

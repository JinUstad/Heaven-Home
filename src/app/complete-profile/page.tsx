"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CompleteProfile() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<{ id: string, name: string, email: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      
      // Check if profile already exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();
        
      if (profile) {
        router.push("/");
        return;
      }

      setUserData({
        id: user.id,
        name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        email: user.email || ""
      });
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !address || !pincode) {
      setError("Please fill in all fields.");
      return;
    }
    
    // 10 digit validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!userData) return;

    setLoading(true);
    setError("");

    const { error: dbError } = await supabase
      .from("profiles")
      .insert([
        {
          id: userData.id,
          full_name: userData.name,
          email: userData.email,
          phone: phone,
          address: address,
          pincode: pincode
        }
      ]);

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-serif mb-2">Almost there!</h2>
          <p className="text-gray-600">Please complete your profile to continue.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                disabled
                value={userData.name}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed sm:text-sm"
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
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // only allow numbers
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                required
                rows={3}
                placeholder="Your full address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                required
                placeholder="123456"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[var(--primary)] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-70 transition-colors uppercase tracking-wider"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

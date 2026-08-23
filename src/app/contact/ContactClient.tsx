"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ContactClient() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            message: formData.message
          }
        ]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
      {/* Left Side: Contact Info */}
      <aside className="lg:w-1/3 bg-[var(--primary)] text-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black opacity-10 rounded-full translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 sm:mb-8">Contact Information</h3>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 text-[var(--accent)] shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.974-6.869-6.87l1.292-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Call Us</h4>
                <p className="text-white/80 text-sm">
                  +91 93104 44850<br />
                  Mon-Fri, 10am - 6pm
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1 text-[var(--accent)] shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div>
                <h4 className="font-bold mb-1">Email Us</h4>
                <p className="text-white/80 text-sm">
                  heavenjewels2316@gmail.com<br />
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Side: Form */}
      <section className="lg:w-2/3 p-6 sm:p-10 lg:p-16 bg-white">
        <h3 className="text-2xl font-serif font-bold text-[#333] mb-8">Send a Message</h3>

        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">Thank you! Your message has been sent successfully.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium">Oops! Something went wrong. Please try again later.</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-bold text-gray-700 uppercase tracking-wide">First Name</label>
              <input required type="text" id="firstName" value={formData.firstName} onChange={handleChange} className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Last Name</label>
              <input required type="text" id="lastName" value={formData.lastName} onChange={handleChange} className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder="Doe" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email Address</label>
              <input required type="email" id="email" value={formData.email} onChange={handleChange} className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Phone Number</label>
              <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[var(--primary)] transition-colors" placeholder="+91 85122 95869" />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <label htmlFor="message" className="text-sm font-bold text-gray-700 uppercase tracking-wide">Message</label>
            <textarea required id="message" value={formData.message} onChange={handleChange} rows={4} className="w-full border-b-2 border-gray-200 bg-transparent py-3 text-gray-800 focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
          </div>

          <div className="pt-6">
            <button disabled={loading} type="submit" className="bg-[#333] text-white px-10 py-4 font-bold text-sm tracking-widest uppercase hover:bg-[var(--primary)] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </section>
    </article>
  );
}

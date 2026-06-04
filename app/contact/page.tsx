"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", college: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#faf8f3]">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Side: Branding */}
          <div className="bg-[#f5f1e8] border-r-2 border-black p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-xl">
              <h1 className="text-7xl md:text-8xl brand-logo mb-8 leading-none">
                Common Room
              </h1>
              
              <p className="text-2xl font-bold mb-6 uppercase tracking-tight">
                The Living Archive of College Life
              </p>
              
              <div className="space-y-4 text-lg text-gray-700 mb-8">
                <p>
                  A student-driven platform where stories, memories, opportunities, projects, startups, discussions, and annual yearbooks live together.
                </p>
              </div>

              <div className="bg-yellow-100 border-2 border-black p-6 brutalist-border-sm">
                <p className="text-lg font-bold handwritten text-2xl">
                  Built by students who got tired of watching memories disappear.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="bg-white border-2 border-black px-4 py-2">
                  <span className="font-bold text-sm">📚 Student-Made</span>
                </div>
                <div className="bg-white border-2 border-black px-4 py-2">
                  <span className="font-bold text-sm">🏛️ Community-Owned</span>
                </div>
                <div className="bg-white border-2 border-black px-4 py-2">
                  <span className="font-bold text-sm">💝 Forever Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-lg mx-auto w-full">
              <div className="mb-8">
                <div className="inline-block border-2 border-black px-4 py-1 mb-4 bg-white">
                  <span className="text-xs font-bold uppercase tracking-wider">Get In Touch</span>
                </div>
                <h2 className="text-4xl font-black mb-3">
                  Let's Talk
                </h2>
                <p className="text-gray-700">
                  Questions, suggestions, or want to help build Common Room?
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    placeholder="you@college.edu"
                  />
                </div>

                <div>
                  <label htmlFor="college" className="block text-sm font-bold uppercase tracking-wider mb-2">
                    College
                  </label>
                  <input
                    type="text"
                    id="college"
                    required
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
                    placeholder="Your college"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black resize-none bg-white"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                {status === "success" && (
                  <div className="bg-green-100 border-2 border-black p-4">
                    <p className="font-bold text-green-800">
                      ✓ Message sent! We'll get back to you soon.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="bg-red-100 border-2 border-black p-4">
                    <p className="font-bold text-red-800">
                      ✗ Something went wrong. Please try again.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-8 py-4 bg-black text-white border-2 border-black font-bold hover-lift uppercase tracking-wide disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/" className="text-gray-600 hover:text-black font-semibold">
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

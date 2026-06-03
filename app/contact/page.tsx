"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      college: formData.get("college"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 text-center max-w-md"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
          <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="grid md:grid-cols-2 min-h-screen">
        {/* Left Side - About Common Room */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-12 md:p-16 flex flex-col justify-center"
        >
          <Link href="/" className="text-sm mb-8 hover:underline">← Back to Home</Link>
          
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          
          <p className="text-xl text-purple-100 mb-8">
            We'd love to hear from you. Whether you have questions, feedback, or just want to say hello.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Common Room</h3>
                <p className="text-purple-100 text-sm">The Living Archive of College Life</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="font-bold mb-3">What is Common Room?</h3>
            <p className="text-sm text-purple-100 leading-relaxed">
              A student-driven platform where stories, memories, opportunities, projects, startups, 
              discussions, and annual yearbooks live together. We're preserving college life, one story at a time.
            </p>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-12 md:p-16 flex flex-col justify-center bg-gray-50"
        >
          <h2 className="text-3xl font-bold mb-2">Send us a message</h2>
          <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you soon.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Your Name *</label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">College (Optional)</label>
              <input
                name="college"
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="GEC Raipur"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject *</label>
              <input
                name="subject"
                type="text"
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              We typically respond within 24 hours during business days.
            </p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

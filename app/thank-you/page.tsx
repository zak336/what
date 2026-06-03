"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Home, Share2 } from "lucide-react";
import { canAccessThankYou, cleanupOnboardingFlags } from "@/lib/sessionGuard";
import { useRouteProtection } from "@/hooks/useRouteProtection";
import { useEffect } from "react";

export default function ThankYouPage() {
  useRouteProtection(canAccessThankYou);
  
  useEffect(() => {
    // Cleanup onboarding flags but keep user data
    cleanupOnboardingFlags();
  }, []);
  const shareText = "I just joined the waitlist for Common Room - The Living Archive of College Life! 🎓";

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: "Common Room - The Living Archive of College Life",
        text: shareText,
        url: window.location.origin,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-6"
          >
            ✨
          </motion.div>

          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          
          <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Your feedback helps us build something truly special for college communities
          </p>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lg mb-2">What Happens Next?</h2>
            <ul className="text-sm text-gray-700 space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">1.</span>
                <span>We'll email you with launch updates</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">2.</span>
                <span>You'll get early access before public launch</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 font-bold">3.</span>
                <span>Your feedback will shape the features we build first</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              Share with Friends
            </button>
          </div>

          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <p className="text-sm text-gray-500">
              Questions?{" "}
              <Link href="/contact" className="text-purple-600 hover:text-purple-700 font-medium">
                Contact us
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

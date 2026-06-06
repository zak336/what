"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Share2, BookOpen, Lock, Rocket, MessageSquare, Users, Shield } from "lucide-react";
import { canAccessThankYou, cleanupOnboardingFlags, allowVerifyAccess } from "@/lib/sessionGuard";
import { useRouteProtection } from "@/hooks/useRouteProtection";
import { useEffect } from "react";

export default function ThankYouPage() {
  useRouteProtection(canAccessThankYou);
  const router = useRouter();
  
  useEffect(() => {
    // Cleanup onboarding flags but keep user data
    cleanupOnboardingFlags();
  }, []);
  
  const shareText = "I just joined the Common Room Early Access Community! 🎓";

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: "Common Room - The Living Archive of College Life",
        text: shareText,
        url: window.location.origin,
      });
    }
  };

  const handleVerify = () => {
    const waitlistId = typeof window !== 'undefined' ? localStorage.getItem('waitlistId') : '';
    const email = typeof window !== 'undefined' ? localStorage.getItem('waitlistEmail') : '';
    allowVerifyAccess();
    if (waitlistId && email) {
      router.push(`/verify?waitlistId=${waitlistId}&email=${encodeURIComponent(email)}`);
    } else {
      router.push('/verify');
    }
  };

  return (
    <main className="min-h-screen grid-paper py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Celebration Section */}
          <div className="bg-white border-2 border-[#0B0661] p-8 md:p-12 mb-8 shadow-[6px_6px_0px_0px_rgba(11,6,97,1)]">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-6 text-center"
            >
              🎉
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-center text-[#0B0661]">You're In!</h1>
            
            <p className="text-xl text-center text-gray-700 mb-12 font-medium">
              Welcome to the Common Room Early Access Community
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-700 text-center mb-6">
                As we build Common Room, you'll be among the first students to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 border-2 border-[#0B0661] bg-[#E8E5FF]">
                  <BookOpen className="w-6 h-6 text-[#5C84FF] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[#0B0661]">Preview upcoming Digital Yearbook features</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 border-2 border-[#0B0661] bg-[#E8E5FF]">
                  <Lock className="w-6 h-6 text-[#5C84FF] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[#0B0661]">Test Private & Community Rooms</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 border-2 border-[#0B0661] bg-[#E8E5FF]">
                  <Rocket className="w-6 h-6 text-[#5C84FF] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[#0B0661]">Try new releases before public launch</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 border-2 border-[#0B0661] bg-[#E8E5FF]">
                  <MessageSquare className="w-6 h-6 text-[#5C84FF] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[#0B0661]">Share feedback that directly influences what we build</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 border-2 border-[#0B0661] bg-[#E8E5FF] md:col-span-2">
                  <Users className="w-6 h-6 text-[#5C84FF] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[#0B0661]">Help shape a platform built for students across campuses</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFF4E6] border-2 border-[#0B0661] p-6 mb-8">
              <p className="text-sm text-gray-700 text-center">
                We'll occasionally send previews, experiments, and early builds for you to test.<br />
                <span className="font-bold text-[#0B0661]">Your feedback helps shape Common Room before it reaches campuses everywhere.</span>
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-5 bg-[#0B0661] text-white border-2 border-[#0B0661] font-bold hover:bg-[#5C84FF] transition-colors uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 w-full py-4 bg-white border-2 border-[#0B0661] text-[#0B0661] font-bold hover:bg-[#E8E5FF] transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share with Friends
              </button>
            </div>
          </div>

          {/* Optional Verification Section */}
          <div className="bg-white border-2 border-[#0B0661] p-8 shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]">
            <div className="inline-block px-4 py-1 border-2 border-[#0B0661] bg-[#FF6BD6] mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Optional</span>
            </div>
            
            <h2 className="text-2xl font-black mb-3 text-[#0B0661]">Student Verification</h2>
            
            <p className="text-gray-700 mb-6">
              Verify your student status to help us keep future communities authentic and unlock student-only features.
            </p>

            <div className="flex items-start gap-3 p-4 border-2 border-[#0B0661] bg-[#E8E5FF] mb-6">
              <Shield className="w-6 h-6 text-[#5C84FF] flex-shrink-0" />
              <p className="text-sm text-gray-700">
                Verified students get priority access and help maintain the authenticity of campus communities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleVerify}
                className="flex-1 py-4 bg-[#5C84FF] text-white border-2 border-[#0B0661] font-bold hover:bg-[#0B0661] transition-colors shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]"
              >
                Verify Now
              </button>
              
              <Link
                href="/"
                className="flex-1 py-4 text-center text-gray-600 hover:text-[#0B0661] font-medium border-2 border-transparent hover:border-[#0B0661] transition-colors"
              >
                Skip For Now
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Questions?{" "}
              <Link href="/contact" className="text-[#5C84FF] hover:text-[#0B0661] font-bold">
                Contact us
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

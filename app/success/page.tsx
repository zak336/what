"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Share2, BookOpen, Lock, Rocket, MessageSquare, Users, Shield, ArrowRight } from "lucide-react";
import { Suspense } from "react";
import { canAccessSuccess, allowSurveyAccess } from "@/lib/sessionGuard";
import { useRouteProtection } from "@/hooks/useRouteProtection";

export const dynamic = 'force-dynamic';

function SuccessContent() {
  useRouteProtection(canAccessSuccess);
  const searchParams = useSearchParams();
  const position = searchParams.get("position") || "XX";
  const waitlistId = searchParams.get("waitlistId");
  const email = searchParams.get("email");
  const queryString =
    waitlistId && email
      ? `?waitlistId=${encodeURIComponent(waitlistId)}&email=${encodeURIComponent(email)}`
      : "";

  return (
    <main className="min-h-screen grid-paper flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white border-2 border-[#0B0661] p-10 md:p-12 shadow-[6px_6px_0px_0px_rgba(11,6,97,1)]">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-6xl mb-6"
              >
                🎉
              </motion.div>
              
              <div className="inline-block px-4 py-1 border-2 border-[#0B0661] bg-[#FF6BD6] mb-6 shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Waitlist #{position}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-4 text-[#0B0661]">You're In!</h1>
              <p className="text-xl text-gray-700 mb-6">Welcome to the Common Room founding community</p>
              <p className="text-lg text-gray-700">
                We'll notify you when Common Room launches. Check your email for updates!
              </p>
            </div>

            <div className="bg-[#FFF4E6] border-2 border-[#0B0661] p-6 mb-8 text-center">
              <div className="text-sm font-bold uppercase tracking-wider mb-1 text-[#0B0661]">Estimated Launch</div>
              <div className="text-3xl font-black text-[#0B0661]">August 2026</div>
            </div>

            <div className="space-y-3">
              <Link
                href="/"
                className="block w-full py-5 bg-[#0B0661] text-white border-2 border-[#0B0661] font-bold text-lg hover:bg-[#5C84FF] transition-colors uppercase tracking-wide text-center shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-[#5C84FF] hover:text-[#0B0661] font-bold text-sm">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f3] flex items-center justify-center"><div className="text-xl font-bold">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}

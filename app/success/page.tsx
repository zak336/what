"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
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
    <main className="min-h-screen bg-[#faf8f3] flex items-center justify-center px-4 py-20">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Celebration */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-8xl mb-8 text-center"
          >
            🎉
          </motion.div>

          {/* Main Card */}
          <div className="bg-white border-3 border-black p-10 md:p-12 brutalist-border mb-6">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-black mb-4">You're In!</h1>
              <p className="text-xl text-gray-700">Welcome to the founding community</p>
            </div>

            {/* Position Badge */}
            <div className="bg-purple-100 border-2 border-black p-8 mb-8 text-center">
              <div className="text-xs font-bold uppercase tracking-wider mb-2 text-gray-600">Your Position</div>
              <div className="text-7xl font-black">#{position}</div>
            </div>

            <p className="text-center text-gray-700 mb-8 text-lg">
              We'll notify you when Common Room launches. Check your email for updates!
            </p>

            {/* Next Steps */}
            <div className="space-y-4">
              <Link
                href={`/verify${queryString}`}
                className="block w-full py-5 bg-black text-white border-3 border-black font-bold text-lg hover-lift uppercase tracking-wide text-center"
              >
                <div className="flex items-center justify-center gap-3">
                  <Award className="w-6 h-6" />
                  <span>Get Priority Access</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
                <div className="text-sm opacity-80 mt-1 normal-case">Verify your student status</div>
              </Link>

              <Link
                href={`/survey?waitlistId=${waitlistId || position}&email=${encodeURIComponent(email || "")}`}
                onClick={() => allowSurveyAccess()}
                className="block w-full py-5 bg-white text-black border-3 border-black font-bold text-lg hover-lift uppercase tracking-wide text-center"
              >
                <div className="flex items-center justify-center gap-3">
                  <span>Help Us Build</span>
                  <ArrowRight className="w-6 h-6" />
                </div>
                <div className="text-sm opacity-60 mt-1 normal-case">Shape what we build first (2 min)</div>
              </Link>
            </div>
          </div>

          {/* Launch Info */}
          <div className="bg-yellow-100 border-2 border-black p-6 brutalist-border-sm mb-6 text-center">
            <div className="text-sm font-bold uppercase tracking-wider mb-1">Estimated Launch</div>
            <div className="text-3xl font-black">August 2026</div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link href="/" className="text-black hover:underline font-bold">
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

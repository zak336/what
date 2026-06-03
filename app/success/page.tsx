"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Award, ChevronRight } from "lucide-react";
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
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 md:p-12 text-center"
        >
          {/* Confetti Effect */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-6"
          >
            🎉
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">You're on the Waitlist!</h1>
            
            <div className="bg-purple-50 rounded-lg p-6 mb-8 border-2 border-purple-200">
              <div className="text-sm text-purple-600 font-medium mb-2">Your Position</div>
              <div className="text-5xl font-bold text-purple-600">#{position}</div>
            </div>

            <p className="text-gray-600 mb-8">
              We'll notify you as soon as Common Room launches. Check your email for updates!
            </p>
          </motion.div>

          {/* Priority Access CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <Link
              href={`/verify${queryString}`}
              className="block w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <div className="flex items-center justify-center gap-2">
                <Award className="w-5 h-5" />
                <span>Get Priority Access</span>
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="text-sm opacity-90 mt-1">Verify your student status</div>
            </Link>

            <Link
              href={`/survey?waitlistId=${waitlistId || position}&email=${encodeURIComponent(email || "")}`}
              onClick={() => allowSurveyAccess()}
              className="block w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Help Us Decide What to Build First</span>
                <ChevronRight className="w-5 h-5" />
              </div>
              <div className="text-sm text-gray-500 mt-1">Takes 2 minutes</div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 pt-8 border-t-2 border-gray-200"
          >
            <div className="text-sm text-gray-500 mb-2">Estimated Launch</div>
            <div className="text-2xl font-bold text-purple-600">August 2026</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8"
          >
            <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              ← Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Suspense } from "react";
import { canAccessSurvey, markSurveyCompleted } from "@/lib/sessionGuard";
import { useRouteProtection } from "@/hooks/useRouteProtection";

export const dynamic = 'force-dynamic';

type SurveyData = {
  joinReason: string;
  valuableFeatures: string[];
  howHeard: string;
  joinCommunity: "yes" | "maybe" | "no";
  preferredPlatform?: string;
  preserveForFuture: string;
  worthPayingFor?: string;
};

function SurveyContent() {
  useRouteProtection(canAccessSurvey);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [showPlatformSelect, setShowPlatformSelect] = useState(false);
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<SurveyData>();

  const joinCommunity = watch("joinCommunity");

  const featureOptions = [
    "Digital Yearbook",
    "Private Rooms",
    "Campus Communities",
    "Stories & Memories",
    "Opportunities",
    "Projects & Startups",
    "Alumni Network",
    "Verified Student Network",
  ];

  const joinReasonOptions = [
    "Digital Yearbook",
    "Private Rooms",
    "Campus Photos",
    "Stories & Memories",
    "Projects & Startups",
    "Opportunities",
    "Cross-College Community",
    "Alumni Network",
    "Other",
  ];

  const howHeardOptions = [
    "WhatsApp",
    "Friend",
    "College Group",
    "Reddit",
    "Twitter/X",
    "LinkedIn",
    "Other",
  ];

  const platformOptions = [
    "WhatsApp",
    "Discord",
    "Email Only",
  ];

  const onSubmit = async (data: SurveyData) => {
    setSubmitError("");
    console.log("Submitting survey...");
    const waitlistId =
      searchParams.get("waitlistId") ||
      (typeof window !== "undefined" ? localStorage.getItem("waitlistId") || "" : "");
    const email =
      searchParams.get("email") ||
      (typeof window !== "undefined" ? localStorage.getItem("waitlistEmail") || "" : "");

    if (!waitlistId || !email) {
      setSubmitError("Missing waitlist details. Please rejoin the waitlist and try again.");
      return;
    }

    try {
      const payload = {
        waitlistId,
        email,
        joinReason: data.joinReason,
        valuableFeatures: data.valuableFeatures || [],
        howHeard: data.howHeard,
        joinCommunity: data.joinCommunity,
        preferredPlatform: data.preferredPlatform || "",
        preserveForFuture: data.preserveForFuture || "",
        worthPayingFor: data.worthPayingFor || "",
      };

      const response = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      console.log("API status:", response.status);
      const result = await response.json();
      console.log("API response:", result);

      if (response.ok && result.success) {
        markSurveyCompleted();
        
        // Redirect to success page with celebration
        const position = searchParams.get("position") || "XX";
        router.push(`/success?position=${position}&waitlistId=${waitlistId}&email=${encodeURIComponent(email)}`);
      } else {
        setSubmitError(result.message || "Survey submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Survey submission error:", error);
      setSubmitError("Survey submission failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen grid-paper py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-12">
            <div className="inline-block border-2 border-[#0B0661] px-4 py-1 mb-4 bg-[#FF6BD6] shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Almost Done</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-[#0B0661]">Help Shape Common Room</h1>
            <p className="text-xl text-gray-700 mb-4 font-medium">
              You're on the waitlist! Answer a few quick questions to help us build features students actually want.
            </p>
            <div className="inline-block px-4 py-2 bg-[#E8E5FF] border-2 border-[#0B0661] text-sm font-bold text-[#0B0661]">
              ⏱ Takes less than 30 seconds
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Question 1: Join Reason */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 border-2 border-[#0B0661] shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B0661]">
                What made you join Common Room today?
              </h2>
              <div className="space-y-3">
                {joinReasonOptions.map((reason) => (
                  <label key={reason} className="flex items-center gap-3 p-3 border-2 border-[#0B0661] hover:bg-[#E8E5FF] cursor-pointer">
                    <input
                      type="radio"
                      value={reason}
                      {...register("joinReason")}
                      className="w-4 h-4 text-[#5C84FF]"
                    />
                    <span className="font-medium text-[#0B0661]">{reason}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Question 2: Valuable Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 border-2 border-[#0B0661] shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B0661]">
                Which Common Room features are most valuable to you?
              </h2>
              <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
              <div className="space-y-3">
                {featureOptions.map((feature) => (
                  <label key={feature} className="flex items-center gap-3 p-3 border-2 border-[#0B0661] hover:bg-[#E8E5FF] cursor-pointer">
                    <input
                      type="checkbox"
                      value={feature}
                      {...register("valuableFeatures")}
                      className="w-4 h-4 text-[#5C84FF] rounded"
                    />
                    <span className="font-medium text-[#0B0661]">{feature}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Question 3: How Heard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 border-2 border-[#0B0661] shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B0661]">
                How did you hear about Common Room?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {howHeardOptions.map((source) => (
                  <label key={source} className="flex items-center gap-2 p-3 border-2 border-[#0B0661] hover:bg-[#E8E5FF] cursor-pointer justify-center">
                    <input
                      type="radio"
                      value={source}
                      {...register("howHeard")}
                      className="w-4 h-4 text-[#5C84FF]"
                    />
                    <span className="font-medium text-sm text-[#0B0661]">{source}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Question 4: Join Community */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 border-2 border-[#0B0661] shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B0661]">
                Would you like to join the Common Room Early Access Community?
              </h2>
              <div className="space-y-3 mb-4">
                {[
                  { value: "yes", label: "Yes" },
                  { value: "maybe", label: "Maybe Later" },
                  { value: "no", label: "No Thanks" },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 p-3 border-2 border-[#0B0661] hover:bg-[#E8E5FF] cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      {...register("joinCommunity")}
                      className="w-4 h-4 text-[#5C84FF]"
                      onChange={() => setShowPlatformSelect(option.value === "yes")}
                    />
                    <span className="font-medium text-[#0B0661]">{option.label}</span>
                  </label>
                ))}
              </div>

              {/* Platform Selection (conditional) */}
              {(joinCommunity === "yes" || showPlatformSelect) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t-2 border-[#0B0661]"
                >
                  <h3 className="text-md font-bold mb-3 text-[#0B0661]">Preferred Platform</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {platformOptions.map((platform) => (
                      <label key={platform} className="flex items-center gap-2 p-3 border-2 border-[#0B0661] hover:bg-[#E8E5FF] cursor-pointer justify-center">
                        <input
                          type="radio"
                          value={platform}
                          {...register("preferredPlatform")}
                          className="w-4 h-4 text-[#5C84FF]"
                        />
                        <span className="font-medium text-sm text-[#0B0661]">{platform}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Question 5: Preserve for Future */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 border-2 border-[#0B0661] shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
            >
              <h2 className="text-lg font-bold mb-4 text-[#0B0661]">
                What should every college preserve for future students?
              </h2>
              <textarea
                {...register("preserveForFuture")}
                rows={4}
                className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
                placeholder="Your thoughts..."
              />
            </motion.div>

            {/* Question 6: Worth Paying For (Optional) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 border-2 border-[#0B0661] shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]"
            >
              <div className="inline-block px-3 py-1 border-2 border-[#0B0661] bg-[#E8E5FF] mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Optional</span>
              </div>
              <h2 className="text-lg font-bold mb-4 text-[#0B0661]">
                If Common Room offered premium features in the future, what would make it worth paying for?
              </h2>
              <textarea
                {...register("worthPayingFor")}
                rows={4}
                className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
                placeholder="Your ideas..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#0B0661] text-white border-3 border-[#0B0661] font-bold text-lg hover:bg-[#5C84FF] transition-colors uppercase tracking-wide disabled:opacity-50 shadow-[6px_6px_0px_0px_rgba(11,6,97,1)]"
              >
                {isSubmitting ? "Joining..." : "Join Early Access →"}
              </button>
              {submitError && (
                <p className="mt-3 text-sm text-red-600 text-center">{submitError}</p>
              )}
              
              <button
                type="button"
                onClick={() => {
                  markSurveyCompleted();
                  const position = searchParams.get("position") || "XX";
                  const waitlistId = searchParams.get("waitlistId") || "";
                  const email = searchParams.get("email") || "";
                  router.push(`/success?position=${position}&waitlistId=${waitlistId}&email=${encodeURIComponent(email)}`);
                }}
                className="w-full mt-3 py-3 text-gray-600 hover:text-[#5C84FF] text-sm font-medium transition-colors"
              >
                Skip For Now
              </button>
            </motion.div>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-[#5C84FF] hover:text-[#0B0661] text-sm font-medium">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function SurveyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f3] flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <SurveyContent />
    </Suspense>
  );
}

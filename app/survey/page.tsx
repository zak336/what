"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Suspense } from "react";

type SurveyData = {
  willingToPay: "yes" | "no" | "maybe";
  pricePoint: string;
  valuableFeatures: string[];
  worthPayingFor: string;
  maxAmount: string;
  paymentStyle: "monthly" | "yearly" | "both";
};

function SurveyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SurveyData>();

  const featureOptions = [
    "Digital Yearbook",
    "Verified Student Network",
    "Alumni Network",
    "Premium Resources",
    "Startup Network",
    "Career Tools",
    "Opportunity Alerts",
    "AI Features",
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
        willingToPay: data.willingToPay,
        pricePoint: data.pricePoint,
        maxAmount: data.maxAmount,
        paymentStyle: data.paymentStyle,
        valuableFeatures: data.valuableFeatures || [],
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
        router.push("/thank-you");
      } else {
        setSubmitError(result.message || "Survey submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Survey submission error:", error);
      setSubmitError("Survey submission failed. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">💭</div>
            <h1 className="text-4xl font-bold mb-4">Help Us Build the Right Product</h1>
            <p className="text-gray-600 text-lg mb-2">
              Your feedback shapes what we build
            </p>
            <div className="inline-block px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg text-sm text-blue-700 font-medium">
              ℹ️ This survey does not affect your waitlist position
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Question 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-lg border-2 border-gray-200"
            >
              <h2 className="text-lg font-bold mb-4">
                1. Would you be willing to pay for premium access?
              </h2>
              <div className="space-y-3">
                {["yes", "no", "maybe"].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value={option}
                      {...register("willingToPay")}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="capitalize font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Question 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-lg border-2 border-gray-200"
            >
              <h2 className="text-lg font-bold mb-4">
                2. What monthly price feels reasonable?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Free Only", "₹5", "₹10", "₹20", "₹30", "₹50", "₹100+"].map((price) => (
                  <label key={price} className="flex items-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer text-center">
                    <input
                      type="radio"
                      value={price}
                      {...register("pricePoint")}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="font-medium text-sm">{price}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Question 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-lg border-2 border-gray-200"
            >
              <h2 className="text-lg font-bold mb-4">
                3. Which features would justify a subscription?
              </h2>
              <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
              <div className="space-y-3">
                {featureOptions.map((feature) => (
                  <label key={feature} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      value={feature}
                      {...register("valuableFeatures")}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="font-medium">{feature}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Question 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-6 rounded-lg border-2 border-gray-200"
            >
              <h2 className="text-lg font-bold mb-4">
                4. What would make ₹10/month worth paying?
              </h2>
              <textarea
                {...register("worthPayingFor")}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Tell us what features or benefits would make you consider a paid subscription..."
              />
            </motion.div>

            {/* Question 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-6 rounded-lg border-2 border-gray-200"
            >
              <h2 className="text-lg font-bold mb-4">
                5. Maximum amount you would realistically pay per month?
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold">₹</span>
                <input
                  type="number"
                  {...register("maxAmount")}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter amount"
                  min="0"
                />
                <span className="text-gray-600">/month</span>
              </div>
            </motion.div>

            {/* Question 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white p-6 rounded-lg border-2 border-gray-200"
            >
              <h2 className="text-lg font-bold mb-4">
                6. Preferred payment style?
              </h2>
              <div className="space-y-3">
                {[
                  { value: "monthly", label: "Monthly", desc: "Pay each month" },
                  { value: "yearly", label: "Yearly", desc: "Pay once a year (usually cheaper)" },
                  { value: "both", label: "Both Options", desc: "Flexibility to choose" },
                ].map((option) => (
                  <label key={option.value} className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      value={option.value}
                      {...register("paymentStyle")}
                      className="w-4 h-4 text-purple-600 mt-1"
                    />
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Survey"}
              </button>
              {submitError && (
                <p className="mt-3 text-sm text-red-600 text-center">{submitError}</p>
              )}
              
              <button
                type="button"
                onClick={() => router.push("/thank-you")}
                className="w-full mt-3 py-3 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Skip Survey
              </button>
            </motion.div>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
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
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <SurveyContent />
    </Suspense>
  );
}

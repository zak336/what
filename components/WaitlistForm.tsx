"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { CHHATTISGARH_COLLEGES } from "@/lib/colleges";
import CollegeSelector from "./CollegeSelector";
import { storeWaitlistData } from "@/lib/sessionGuard";

const gecSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  collegeName: z.literal("GEC Raipur"),
  department: z.string().min(2, "Department required"),
  yearOfStudy: z.enum(["1st", "2nd", "3rd", "4th", "Alumni"]),
  collegeType: z.literal("gec"),
});

const otherSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  collegeName: z.string().min(3, "College name required"),
  customCollege: z.string().optional(),
  department: z.string().min(2, "Department required"),
  yearOfStudy: z.enum(["1st", "2nd", "3rd", "4th", "Alumni"]),
  collegeType: z.literal("other"),
});

type FormData = z.infer<typeof gecSchema> | z.infer<typeof otherSchema>;

export default function WaitlistForm() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"gec" | "other" | null>(null);
  const [showCustomCollege, setShowCustomCollege] = useState(false);

  const schema = selectedType === "gec" ? gecSchema : otherSchema;
  
  const form = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: selectedType === "gec" 
      ? { collegeName: "GEC Raipur", collegeType: "gec" } 
      : { collegeType: "other" },
    mode: "onSubmit",
  });

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = form;
  
  // Set collegeType when component mounts
  useEffect(() => {
    if (selectedType) {
      setValue("collegeType", selectedType);
    }
  }, [selectedType, setValue]);
  const collegeName = watch("collegeName");

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data);
    console.log("Form errors:", errors);
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        collegeName: showCustomCollege ? data.customCollege : data.collegeName,
        department: data.department,
        yearOfStudy: data.yearOfStudy,
        collegeType: data.collegeType || selectedType,
      };
      
      console.log("Sending to API:", payload);
      
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      console.log("API response status:", response.status);
      const result = await response.json();
      console.log("API result:", result);
      
      if (response.ok && result.success) {
        // Store session data
        storeWaitlistData({
          waitlistId: result.waitlistId,
          email: payload.email,
          college: payload.collegeName,
        });
        
        const params = new URLSearchParams({
          position: String(result.position || "XX"),
        });
        if (result.waitlistId) params.set("waitlistId", result.waitlistId);
        if (payload.email) params.set("email", payload.email);
        router.push(`/success?${params.toString()}`);
      } else {
        alert(result.message || "Failed to join waitlist");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!selectedType) {
    return <CollegeSelector onSelect={setSelectedType} />;
  }

  return (
    <section id="waitlist-form" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedType(null)}
          className="text-purple-600 hover:text-purple-700 mb-6 font-medium"
        >
          ← Change College
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-4">Join the Founding Waitlist</h2>
          {selectedType === "other" && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-900 mb-2">
                <strong>Common Room is launching first at GEC Raipur.</strong>
              </p>
              <p className="text-sm text-blue-800">
                Students from other colleges can join the waitlist today and will be notified when their campus becomes available.
              </p>
              <p className="text-sm text-blue-700 mt-2 font-medium">
                💡 The more students from your college join, the sooner we can launch there.
              </p>
            </div>
          )}
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-8 rounded-lg border-2 border-gray-200">
          <input type="hidden" {...register("collegeType")} />
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                {...register("fullName")}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message as string}</p>
              )}
            </div>

            {selectedType === "gec" ? (
              <div>
                <label className="block text-sm font-medium mb-2">College *</label>
                <input
                  {...register("collegeName")}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  value="GEC Raipur"
                  readOnly
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">College *</label>
                  <select
                    {...register("collegeName")}
                    onChange={(e) => setShowCustomCollege(e.target.value === "Other College (Not Listed)")}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="">Select your college</option>
                    {CHHATTISGARH_COLLEGES.map((college) => (
                      <option key={college} value={college}>{college}</option>
                    ))}
                  </select>
                  {errors.collegeName && (
                    <p className="text-red-600 text-sm mt-1">{errors.collegeName.message as string}</p>
                  )}
                </div>

                {showCustomCollege && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Enter College Name *</label>
                    <input
                      {...register("customCollege")}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your college name"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Department / Branch *</label>
              <input
                {...register("department")}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="CSE"
              />
              {errors.department && (
                <p className="text-red-600 text-sm mt-1">{errors.department.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Year of Study *</label>
              <select
                {...register("yearOfStudy")}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              >
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => console.log("Button clicked!", errors)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Joining..." : "Join the Founding Waitlist"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Your information is safe with us. We'll only send important updates.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

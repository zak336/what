"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { CHHATTISGARH_COLLEGES } from "@/lib/colleges";
import CollegeSelector from "./CollegeSelector";
import { storeWaitlistData, allowSurveyAccess } from "@/lib/sessionGuard";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState<string[]>([]);

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
        
        // Allow survey access and redirect to survey
        allowSurveyAccess();
        
        const params = new URLSearchParams();
        if (result.waitlistId) params.set("waitlistId", result.waitlistId);
        if (payload.email) params.set("email", payload.email);
        if (result.position) params.set("position", String(result.position));
        
        router.push(`/survey?${params.toString()}`);
      } else {
        alert(result.message || "Failed to join waitlist");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!selectedType) {
    return (
      <section id="waitlist-form" className="py-20 px-4 grid-paper">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <div className="inline-block border-2 border-[#0B0661] px-4 py-1 mb-4 bg-white shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Join Waitlist</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-[#0B0661]">Join Common Room</h2>
            <p className="text-2xl font-bold text-gray-700">Built for <span className="text-[#5C84FF]">every college</span></p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <CollegeSelector onSelect={setSelectedType} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist-form" className="py-20 px-4 grid-paper">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => setSelectedType(null)}
          className="text-[#0B0661] hover:text-[#5C84FF] mb-6 font-bold flex items-center gap-2 transition-colors"
        >
          ← Change College Type
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-block border-2 border-black px-4 py-1 mb-4 bg-white">
            <span className="text-xs font-bold uppercase tracking-wider">Join Waitlist</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Claim Your Spot</h2>
          {selectedType === "other" && (
            <div className="bg-[#E8E5FF] border-2 border-[#0B0661] p-6 mb-4 brutalist-border-sm">
              <p className="font-bold mb-2 text-[#0B0661]">
                📚 Your college will get its own Common Room
              </p>
              <p className="text-sm mb-2 text-gray-700">
                Join the waitlist to be notified when we launch at your campus. Every college gets its own yearbook, stories, and community.
              </p>
              <p className="text-sm font-semibold text-[#5C84FF]">
                💡 More students = Faster launch
              </p>
            </div>
          )}
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border-3 border-[#0B0661] p-8 brutalist-border relative">
          <input type="hidden" {...register("collegeType")} />
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">Full Name *</label>
              <input
                {...register("fullName")}
                className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1 font-semibold">{errors.fullName.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">Email Address *</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message as string}</p>
              )}
            </div>

            {selectedType === "gec" ? (
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">College *</label>
                <input
                  {...register("collegeName")}
                  className="w-full px-4 py-3 border-2 border-[#0B0661] bg-gray-100 cursor-not-allowed"
                  value="GEC Raipur"
                  readOnly
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">College *</label>
                  <input
                    type="text"
                    value={collegeName || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      setValue("collegeName", value);
                      setShowCustomCollege(false);
                      
                      if (value.length > 0) {
                        const filtered = CHHATTISGARH_COLLEGES
                          .filter(c => c.toLowerCase().includes(value.toLowerCase()))
                          .slice(0, 20);
                        setFilteredColleges(filtered);
                        setShowDropdown(true);
                      } else {
                        setShowDropdown(false);
                      }
                    }}
                    onFocus={(e) => {
                      if (e.target.value.length > 0) {
                        const filtered = CHHATTISGARH_COLLEGES
                          .filter(c => c.toLowerCase().includes(e.target.value.toLowerCase()))
                          .slice(0, 20);
                        setFilteredColleges(filtered);
                        setShowDropdown(true);
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
                    placeholder="Search your college..."
                  />
                  {showDropdown && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-[#0B0661] max-h-60 overflow-y-auto shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]">
                      {filteredColleges.length > 0 ? (
                        filteredColleges.map((college, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (college === "Other College (Not Listed)") {
                                setShowCustomCollege(true);
                                setValue("collegeName", "");
                              } else {
                                setValue("collegeName", college);
                                setShowCustomCollege(false);
                              }
                              setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-[#E8E5FF] border-b border-gray-200 last:border-b-0 font-medium text-[#0B0661]"
                          >
                            {college}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3">
                          <p className="text-gray-600 text-sm mb-2">No college found</p>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCustomCollege(true);
                              setShowDropdown(false);
                            }}
                            className="text-[#5C84FF] font-semibold text-sm hover:underline"
                          >
                            + Add My College
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {errors.collegeName && (
                    <p className="text-red-600 text-sm mt-1">{errors.collegeName.message as string}</p>
                  )}
                </div>

                {showCustomCollege && (
                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">Enter College Name *</label>
                    <input
                      {...register("customCollege")}
                      className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
                      placeholder="Your college name"
                    />
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">Department / Branch *</label>
              <input
                {...register("department")}
                className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
                placeholder="CSE"
              />
              {errors.department && (
                <p className="text-red-600 text-sm mt-1">{errors.department.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">Year of Study *</label>
              <select
                {...register("yearOfStudy")}
                className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
              >
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
                <option value="4th">5th Year</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => console.log("Button clicked!", errors)}
              className="w-full py-5 bg-[#0B0661] text-white border-3 border-[#0B0661] font-bold text-lg hover:bg-[#5C84FF] transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed shadow-[6px_6px_0px_0px_rgba(11,6,97,1)]"
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

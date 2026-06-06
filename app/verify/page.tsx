"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, CheckCircle, Shield, Award, Users, X } from "lucide-react";
import { validateFile } from "@/lib/validation";
import { Suspense } from "react";
import { canAccessVerify, allowSurveyAccess } from "@/lib/sessionGuard";
import { useRouteProtection } from "@/hooks/useRouteProtection";

export const dynamic = 'force-dynamic';

function VerifyContent() {
  useRouteProtection(canAccessVerify);
  const router = useRouter();
  const searchParams = useSearchParams();
  const waitlistId = searchParams.get("waitlistId") || "";
  const email = searchParams.get("email") || "";
  
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState("Student ID Card");
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      const validation = validateFile(selectedFile);
      if (validation.valid) {
        setFile(selectedFile);
      } else {
        alert(validation.error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const validation = validateFile(selectedFile);
      if (validation.valid) {
        setFile(selectedFile);
      } else {
        alert(validation.error);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !waitlistId || !email) {
      alert("Missing information. Please rejoin the waitlist.");
      return;
    }

    setUploading(true);
    
    const formData = new FormData();
    formData.append("waitlistId", waitlistId);
    formData.append("email", email);
    formData.append("college", "GEC Raipur"); // TODO: Get from user data
    formData.append("documentType", documentType);
    formData.append("file", file);

    try {
      const response = await fetch("/api/verification", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        allowSurveyAccess();
        router.push(`/survey?waitlistId=${waitlistId}&email=${encodeURIComponent(email)}`);
      } else {
        alert(result.message || "Upload failed");
      }
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSkip = () => {
    allowSurveyAccess();
    if (waitlistId && email) {
      router.push(`/survey?waitlistId=${waitlistId}&email=${encodeURIComponent(email)}`);
    } else {
      router.push("/survey");
    }
  };

  const benefits = [
    { icon: Award, text: "Priority access before public launch" },
    { icon: CheckCircle, text: "Verified Student badge" },
    { icon: Users, text: "Access to college-specific communities" },
    { icon: Shield, text: "Increased trust within the community" },
  ];

  return (
    <main className="min-h-screen grid-paper py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[#5C84FF] hover:text-[#0B0661] mb-8 inline-block font-bold">← Back to Home</Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-12">
            <div className="inline-block border-2 border-[#0B0661] px-4 py-1 mb-4 bg-[#FF6BD6] shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Optional Step</span>
            </div>
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-[#0B0661]">Get Priority Access</h1>
            <p className="text-xl text-gray-700">Verify your student status to unlock exclusive benefits</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-5 border-2 border-[#0B0661] flex items-center gap-3 shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
                  <Icon className="w-7 h-7 flex-shrink-0 text-[#5C84FF]" />
                  <span className="text-sm font-bold text-[#0B0661]">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-8 border-2 border-[#0B0661] shadow-[6px_6px_0px_0px_rgba(11,6,97,1)]">
            <h2 className="text-2xl font-black mb-6 uppercase text-[#0B0661]">Upload Document</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-[#0B0661]">Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#0B0661] focus:outline-none focus:ring-4 focus:ring-[#5C84FF]/20 bg-white"
              >
                <option>Student ID Card</option>
                <option>Admission Letter</option>
                <option>Fee Receipt</option>
                <option>Bonafide Certificate</option>
              </select>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed p-8 text-center transition-colors ${
                dragActive ? "border-[#5C84FF] bg-[#E8E5FF]" : "border-[#0B0661]"
              }`}
            >
              {file ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                  <div>
                    <p className="font-medium text-[#0B0661]">{file.name}</p>
                    <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 mx-auto font-bold">
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">Drag and drop your document here</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <label className="inline-block px-6 py-3 bg-[#0B0661] text-white font-bold hover:bg-[#5C84FF] transition-colors cursor-pointer uppercase text-sm shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
                    Choose File
                    <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500 mt-4 font-semibold">JPG, PNG, or PDF • Max 3MB</p>
                </>
              )}
            </div>

            <div className="mt-6 p-4 bg-[#E8E5FF] border-2 border-[#0B0661] flex gap-2">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#5C84FF]" />
              <div className="text-sm">
                <p className="font-bold mb-1 text-[#0B0661]">Your Privacy Matters</p>
                <p className="text-gray-700">Documents are encrypted and used solely for verification.</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button onClick={handleUpload} disabled={!file || uploading} className="w-full py-5 bg-[#0B0661] text-white border-2 border-[#0B0661] font-bold text-lg hover:bg-[#5C84FF] transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]">
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
              <button onClick={handleSkip} className="w-full py-3 text-gray-600 hover:text-[#5C84FF] font-bold uppercase text-sm transition-colors">
                Skip for Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f3] flex items-center justify-center"><div className="text-xl font-bold">Loading...</div></div>}>
      <VerifyContent />
    </Suspense>
  );
}

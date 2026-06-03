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
    <main className="min-h-screen bg-[#faf8f3] py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-black hover:underline mb-8 inline-block font-bold">← Back to Home</Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-12">
            <div className="inline-block border-2 border-black px-4 py-1 mb-4 bg-white">
              <span className="text-xs font-bold uppercase tracking-wider">Optional Step</span>
            </div>
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-5xl md:text-6xl font-black mb-4">Get Priority Access</h1>
            <p className="text-xl text-gray-700">Verify your student status to unlock exclusive benefits</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-5 border-2 border-black flex items-center gap-3">
                  <Icon className="w-7 h-7 flex-shrink-0" />
                  <span className="text-sm font-bold">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-8 border-3 border-black brutalist-border">
            <h2 className="text-2xl font-black mb-6 uppercase">Upload Document</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider">Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-4 focus:ring-black/20"
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
                dragActive ? "border-black bg-blue-50" : "border-black"
              }`}
            >
              {file ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button onClick={() => setFile(null)} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 mx-auto">
                    <X className="w-4 h-4" /> Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-700 font-medium mb-2">Drag and drop your document here</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <label className="inline-block px-6 py-3 bg-black text-white font-bold hover-lift cursor-pointer uppercase text-sm">
                    Choose File
                    <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500 mt-4 font-semibold">JPG, PNG, or PDF • Max 3MB</p>
                </>
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-100 border-2 border-black flex gap-2">
              <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold mb-1">Your Privacy Matters</p>
                <p className="text-gray-700">Documents are encrypted and used solely for verification.</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button onClick={handleUpload} disabled={!file || uploading} className="w-full py-5 bg-black text-white border-3 border-black font-bold text-lg hover-lift uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed">
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
              <button onClick={handleSkip} className="w-full py-3 text-black hover:underline font-bold uppercase text-sm">
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

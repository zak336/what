"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, CheckCircle, Shield, Award, Users, X } from "lucide-react";
import { validateFile } from "@/lib/validation";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

function VerifyContent() {
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
    <main className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-sm mb-8 hover:underline inline-block">← Back to Home</Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <div className="text-5xl mb-4">🎓</div>
            <h1 className="text-4xl font-bold mb-4">Get Priority Access</h1>
            <p className="text-gray-600 text-lg">Verify your student status to unlock exclusive benefits</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center gap-3">
                  <Icon className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-4">Upload Verification Document</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Document Type</label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg"
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
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-purple-600 bg-purple-50" : "border-gray-300"
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
                  <label className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 cursor-pointer transition-colors">
                    Choose File
                    <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleChange} className="hidden" />
                  </label>
                  <p className="text-xs text-gray-500 mt-4">JPG, PNG, or PDF • Max 10MB</p>
                </>
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex gap-2">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">Your Privacy Matters</p>
                <p className="text-blue-700">Documents are encrypted and used solely for verification.</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button onClick={handleUpload} disabled={!file || uploading} className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                {uploading ? "Uploading..." : "Upload Document"}
              </button>
              <button onClick={handleSkip} className="w-full py-3 text-gray-600 hover:text-gray-800 text-sm font-medium">
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
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <VerifyContent />
    </Suspense>
  );
}

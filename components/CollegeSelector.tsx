"use client";

import { motion } from "framer-motion";

interface Props {
  onSelect: (type: "gec" | "other") => void;
}

export default function CollegeSelector({ onSelect }: Props) {
  return (
    <>
      {/* Main Join Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2 bg-white border-3 border-[#0B0661] p-10 brutalist-border"
      >
        <h3 className="text-4xl font-black mb-3 text-[#0B0661]">Join Common Room</h3>
        <p className="text-xl text-gray-700 mb-6">Everything your campus needs in one place.</p>
        
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
          <div className="font-bold text-[#0B0661]">Digital Yearbooks</div>
          <div className="font-bold text-[#0B0661]">Private Rooms</div>
          <div className="font-bold text-[#0B0661]">Stories & Memories</div>
          <div className="font-bold text-[#0B0661]">Projects & Startups</div>
          <div className="font-bold text-[#0B0661]">Opportunities</div>
          <div className="font-bold text-[#0B0661]">Student Communities</div>
        </div>

        <p className="text-sm text-gray-600 mb-6 italic">
          Built by students. Preserved for future students.
        </p>

        <button
          onClick={() => onSelect("other")}
          className="w-full px-8 py-5 bg-[#0B0661] text-white border-3 border-[#0B0661] font-bold text-lg hover:bg-[#5C84FF] transition-colors uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(11,6,97,1)] hover:shadow-[8px_8px_0px_0px_rgba(92,132,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          Join Waitlist →
        </button>
      </motion.div>

      {/* Permanent Archive Seal - Authentic Stamp */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 0.85, scale: 1, rotate: 5 }}
        transition={{ delay: 0.3 }}
        className="relative"
        style={{ 
          filter: 'contrast(1.1)',
        }}
      >
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          {/* Outer Ring - Archive Text */}
          <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-[#0B0661] opacity-90"></div>
          <div className="absolute inset-1 rounded-full border-[2px] border-[#0B0661] opacity-85"></div>
          
          {/* Middle Ring */}
          <div className="absolute inset-6 rounded-full border-[3px] border-dashed border-[#FF6BD6] opacity-90"></div>
          <div className="absolute inset-7 rounded-full border-[2px] border-[#FF6BD6] opacity-85"></div>
          
          {/* Inner Ring */}
          <div className="absolute inset-12 rounded-full border-[2px] border-[#0B0661] opacity-80"></div>
          
          {/* Stamp Content */}
          <div className="relative z-10 px-6 text-center">
            {/* Top Arc Text */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#0B0661] text-center">
                COMMON ROOM ARCHIVE
              </p>
            </div>
            
            {/* Center - Main Message */}
            <h3 className="text-2xl font-black handwritten text-[#FF6BD6] mb-2 leading-none mt-2">
              Forever<br/>Preserved
            </h3>
            
            {/* Content List */}
            <div className="space-y-0.5 text-[10px] font-bold text-[#0B0661] leading-tight">
              <p>Stories · Memories</p>
              <p>Photos · Yearbooks</p>
            </div>
            
            {/* Bottom Arc Text */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48">
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#0B0661] text-center">
                EST. 2025
              </p>
            </div>
          </div>
          
          {/* Distressed edges effect */}
          <div className="absolute inset-0 rounded-full" style={{
            background: `radial-gradient(circle at 30% 40%, transparent 45%, rgba(11, 6, 97, 0.03) 46%, transparent 47%),
                        radial-gradient(circle at 70% 60%, transparent 45%, rgba(255, 107, 214, 0.03) 46%, transparent 47%),
                        radial-gradient(circle at 50% 80%, transparent 45%, rgba(11, 6, 97, 0.02) 46%, transparent 47%)`
          }}></div>
        </div>
        
        {/* Ink splatter effect */}
        <div className="absolute top-2 right-4 w-2 h-2 bg-[#FF6BD6] rounded-full opacity-20"></div>
        <div className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-[#0B0661] rounded-full opacity-15"></div>
      </motion.div>
    </>
  );
}

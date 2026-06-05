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

      {/* Permanent Archive Seal - Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
        animate={{ opacity: 0.88, scale: 1, rotate: -7 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative -mr-8"
        style={{ filter: 'contrast(1.15) brightness(0.98)' }}
      >
        <img
          src="/SEAL COMMONROOMS.png"
          alt="Common Room Archive Seal"
          className="w-72 h-72 mx-auto"
          style={{ opacity: 0.88 }}
        />
        
        {/* Texture overlay for ink effect */}
        <div className="absolute inset-0 rounded-full opacity-5 pointer-events-none" style={{
          background: `radial-gradient(circle at 25% 30%, rgba(11, 6, 97, 0.4) 0%, transparent 3%),
                      radial-gradient(circle at 75% 45%, rgba(255, 107, 214, 0.3) 0%, transparent 2%),
                      radial-gradient(circle at 40% 70%, rgba(11, 6, 97, 0.3) 0%, transparent 2.5%)`
        }}></div>
      </motion.div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2 } from "lucide-react";

interface Props {
  onSelect: (type: "gec" | "other") => void;
}

export default function CollegeSelector({ onSelect }: Props) {
  return (
    <section id="waitlist-form" className="py-20 px-4 bg-[#faf8f3]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-block border-2 border-black px-4 py-1 mb-4 bg-white">
            <span className="text-xs font-bold uppercase tracking-wider">Step 1</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-4">Join Common Room</h2>
          <p className="text-2xl font-bold text-gray-700">Where are you joining from?</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => onSelect("gec")}
            className="group relative bg-purple-100 border-3 border-black p-10 text-left brutalist-border hover-lift"
          >
            <div className="absolute top-4 right-4 bg-yellow-200 border-2 border-black px-3 py-1 text-xs font-bold uppercase rotate-3">
              Launching First
            </div>
            <GraduationCap className="w-16 h-16 mb-4" />
            <h3 className="text-3xl font-black mb-3">GEC Raipur</h3>
            <p className="text-gray-700 mb-4 font-medium">Access all features from day one</p>
            <div className="inline-block bg-black text-white px-4 py-2 font-bold uppercase text-sm">
              Join Now →
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onSelect("other")}
            className="group relative bg-white border-3 border-black p-10 text-left brutalist-border hover-lift"
          >
            <div className="absolute top-4 right-4 bg-blue-200 border-2 border-black px-3 py-1 text-xs font-bold uppercase rotate-[-3deg]">
              Coming Soon
            </div>
            <Building2 className="w-16 h-16 mb-4" />
            <h3 className="text-3xl font-black mb-3">Other College</h3>
            <p className="text-gray-700 mb-4 font-medium">Get notified when we launch at your campus</p>
            <div className="inline-block bg-black text-white px-4 py-2 font-bold uppercase text-sm">
              Join Waitlist →
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

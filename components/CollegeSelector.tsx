"use client";

import { motion } from "framer-motion";
import { GraduationCap, Building2, ArrowRight } from "lucide-react";

interface Props {
  onSelect: (type: "gec" | "other") => void;
}

export default function CollegeSelector({ onSelect }: Props) {
  return (
    <section id="waitlist-form" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Join Common Room</h2>
          <p className="text-xl text-gray-600">Where are you joining from?</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => onSelect("gec")}
            className="group relative bg-gradient-to-br from-purple-600 to-blue-600 text-white p-8 rounded-2xl hover:scale-105 transition-transform text-left border-4 border-transparent hover:border-purple-300"
          >
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
              Launching First
            </div>
            <GraduationCap className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">GEC Raipur</h3>
            <p className="text-purple-100 mb-4">Access all features from day one</p>
            <div className="flex items-center gap-2 font-semibold">
              <span>Join Waitlist</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => onSelect("other")}
            className="group relative bg-white border-4 border-gray-300 hover:border-purple-600 text-gray-900 p-8 rounded-2xl hover:scale-105 transition-all text-left"
          >
            <div className="absolute top-4 right-4 bg-purple-50 px-3 py-1 rounded-full text-xs font-bold text-purple-700">
              Join the Expansion
            </div>
            <Building2 className="w-12 h-12 mb-4 text-purple-600" />
            <h3 className="text-2xl font-bold mb-2">Not From GEC Raipur</h3>
            <p className="text-gray-600 mb-4">Get notified when we launch at your college</p>
            <div className="flex items-center gap-2 font-semibold text-purple-600">
              <span>Join Waitlist</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function YearbookSection() {
  return (
    <section className="py-16 px-4 bg-[#f5f1e8]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border-3 border-black p-8 md:p-12 brutalist-border text-center max-w-md mx-auto"
        >
          {/* Archive Seal Badge */}
          <div className="relative">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 handwritten text-3xl">
              Permanent Archive
            </h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="font-bold">Stories</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="font-bold">Memories</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="font-bold">Photos</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span className="font-bold">Yearbooks</span>
              </div>
            </div>

            <div className="border-t-2 border-black pt-4">
              <p className="text-sm font-semibold text-gray-700">
                Not on someone's phone that'll die.<br />
                Not in WhatsApp groups that disappear.
              </p>
              <p className="text-lg font-black mt-3 text-purple-600">
                Right here. Forever.
              </p>
            </div>

            {/* Decorative stamp corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-black"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-black"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-black"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-black"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

export default function YearbookSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-purple-100 to-blue-100 border-y-4 border-black">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Element */}
          <div className="text-7xl mb-6">📖</div>

          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Years From Now
          </h2>

          <div className="bg-white border-3 border-black p-10 brutalist-border max-w-2xl mx-auto mb-8">
            <p className="text-xl md:text-2xl font-semibold mb-4">
              You'll remember <span className="text-purple-600">that one night</span> before exams
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-4">
              <span className="text-blue-600">The friends</span> who became family
            </p>
            <p className="text-xl md:text-2xl font-semibold mb-4">
              <span className="text-orange-600">The startup</span> you built in the hostel
            </p>
            <p className="text-xl md:text-2xl font-semibold">
              <span className="text-green-600">The moments</span> that shaped who you became
            </p>
          </div>

          <p className="text-2xl md:text-3xl font-bold mb-8">
            This is where they'll live. Forever.
          </p>

          <div className="bg-yellow-100 border-2 border-dashed border-black p-6 inline-block rotate-[-1deg]">
            <p className="text-lg font-semibold">
              Not on someone's phone that'll die.<br />
              Not in a WhatsApp group that'll get deleted.<br />
              <span className="text-purple-600">Right here. Permanent.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

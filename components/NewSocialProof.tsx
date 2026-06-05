"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
}

export default function NewSocialProof() {
  return (
    <section className="py-20 px-4 grid-paper">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block border-2 border-[#0B0661] px-4 py-1 mb-4 bg-white shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Social Proof</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-[#0B0661]">
            The Movement is Growing
          </h2>
          <p className="text-gray-600 text-lg">
            Students from across Chhattisgarh are joining
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { number: 278, label: "Students Joined", suffix: "+" },
            { number: 17, label: "Colleges Interested", suffix: "" },
            { number: 83, label: "Students Verified", suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-[#0B0661] p-8 text-center brutalist-border hover-lift"
            >
              <div className="text-5xl font-black mb-2 text-[#0B0661]">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-sm uppercase tracking-wider font-bold text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#E8E5FF] border-2 border-[#0B0661] p-6 brutalist-border-sm"
          >
            <p className="text-lg mb-4 italic text-[#0B0661]">
              "Finally something that feels like it's actually made for us, not some corporate thing."
            </p>
            <div className="font-bold text-gray-700">— Anonymous Student, GEC Raipur</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border-2 border-[#0B0661] p-6 brutalist-border-sm"
          >
            <p className="text-lg mb-4 italic text-[#0B0661]">
              "I wish we had this when I graduated. Our memories are scattered everywhere."
            </p>
            <div className="font-bold text-gray-700">— Alumni, Batch 2023</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

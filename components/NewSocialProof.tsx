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
    <section className="py-20 px-4 bg-[#faf8f3]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
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
              className="bg-white border-2 border-black p-8 text-center brutalist-border hover-lift"
            >
              <div className="text-5xl font-black mb-2">
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
            className="bg-blue-50 border-2 border-black p-6 brutalist-border-sm"
          >
            <p className="text-lg mb-4 italic">
              "Finally something that feels like it's actually made for us, not some corporate thing."
            </p>
            <div className="font-bold">— Anonymous Student, GEC Raipur</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-yellow-50 border-2 border-black p-6 brutalist-border-sm"
          >
            <p className="text-lg mb-4 italic">
              "I wish we had this when I graduated. Our memories are scattered everywhere."
            </p>
            <div className="font-bold">— Alumni, Batch 2023</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

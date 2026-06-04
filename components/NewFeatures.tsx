"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Digital Yearbook",
    description: "Forever memories, preserved beautifully",
    icon: "📚",
    color: "bg-purple-100",
    large: true,
  },
  {
    title: "Stories & Memories",
    description: "Campus moments that matter",
    icon: "📝",
    color: "bg-pink-100",
  },
  {
    title: "Confessions",
    description: "Anonymous. Real. Chaotic.",
    icon: "🤫",
    color: "bg-blue-100",
  },
  {
    title: "Opportunities",
    description: "Never miss what matters",
    icon: "🎯",
    color: "bg-yellow-100",
  },
  {
    title: "Startups",
    description: "Find co-founders, build together",
    icon: "🚀",
    color: "bg-orange-100",
    large: true,
  },
  {
    title: "Projects",
    description: "Showcase your work",
    icon: "💻",
    color: "bg-green-100",
  },
  {
    title: "Wisdom",
    description: "Things seniors wish they knew",
    icon: "💡",
    color: "bg-teal-100",
  },
  {
    title: "Placement Stories",
    description: "Real experiences, real outcomes",
    icon: "🎓",
    color: "bg-indigo-100",
  },
  {
    title: "Campus Photos",
    description: "Through your eyes",
    icon: "📸",
    color: "bg-rose-100",
  },
];

export default function NewFeatures() {
  return (
    <section id="features" className="py-24 px-4 bg-[#f5f1e8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block border-2 border-black px-4 py-1 mb-4 bg-white">
            <span className="text-xs font-bold uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            Everything Your<br />Campus Needs
          </h2>
          <p className="text-xl text-gray-700">
            Leave something behind for future students.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`${
                feature.large ? 'md:col-span-2' : ''
              } ${feature.color} border-2 border-black p-6 hover-lift cursor-pointer group`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Community Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </section>
  );
}

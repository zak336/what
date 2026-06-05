"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Digital Yearbook",
    description: "Forever memories, preserved beautifully",
    icon: "📚",
    color: "bg-[#E8E5FF]",
    large: true,
  },
  {
    title: "Stories & Memories",
    description: "Campus moments that matter",
    icon: "📝",
    color: "bg-white",
  },
  {
    title: "Confessions",
    description: "Anonymous. Real. Chaotic.",
    icon: "🤫",
    color: "bg-[#E8E5FF]",
  },
  {
    title: "Opportunities",
    description: "Never miss what matters",
    icon: "🎯",
    color: "bg-white",
  },
  {
    title: "Startups",
    description: "Find co-founders, build together",
    icon: "🚀",
    color: "bg-white",
    large: true,
  },
  {
    title: "Projects",
    description: "Showcase your work",
    icon: "💻",
    color: "bg-[#E8E5FF]",
  },
  {
    title: "Wisdom",
    description: "Things seniors wish they knew",
    icon: "💡",
    color: "bg-white",
  },
  {
    title: "Placement Stories",
    description: "Real experiences, real outcomes",
    icon: "🎓",
    color: "bg-[#E8E5FF]",
  },
  {
    title: "Campus Photos",
    description: "Through your eyes",
    icon: "📸",
    color: "bg-white",
  },
];

export default function NewFeatures() {
  return (
    <section id="features" className="py-24 px-4 grid-paper">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block border-2 border-[#0B0661] px-4 py-1 mb-4 bg-white shadow-[3px_3px_0px_0px_rgba(11,6,97,1)]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B0661]">Features</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-[#0B0661]">
            Everything Your<br />Campus Needs
          </h2>
          <p className="text-xl text-gray-700">
            Leave something behind for <span className="text-[#5C84FF] font-semibold">future students</span>.
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
              } ${feature.color} border-2 border-[#0B0661] p-6 hover-lift cursor-pointer group shadow-[4px_4px_0px_0px_rgba(11,6,97,1)]`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#0B0661]">{feature.title}</h3>
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
          <div className="inline-block bg-white border-2 border-[#0B0661] p-6 max-w-2xl brutalist-border-sm mb-6">
            <p className="text-lg font-semibold mb-2 text-[#0B0661]">
              Built by students who got tired of watching memories disappear.
            </p>
            <p className="text-gray-600 mb-4">
              No corporate BS. No data selling. Just a place for our stories to live.
            </p>
            <Link
              href="/guides/how-common-room-stays-alive"
              className="inline-block px-6 py-3 bg-[#0B0661] text-white font-bold hover:bg-[#5C84FF] transition-colors uppercase text-sm shadow-[4px_4px_0px_0px_rgba(11,6,97,1)] hover:shadow-[4px_4px_0px_0px_rgba(92,132,255,1)]"
            >
              Read Manifesto →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

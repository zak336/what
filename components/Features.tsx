"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Digital Yearbook",
    description: "Preserve your batch memories forever with photos, messages, and achievements",
    icon: "📚",
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Stories & Memories",
    description: "Share experiences and preserve campus moments that matter",
    icon: "📝",
    color: "from-pink-500 to-pink-600",
  },
  {
    title: "Confessions & Chaos",
    description: "Share your thoughts anonymously—the real campus talk",
    icon: "🤫",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Opportunities",
    description: "Never miss internships, competitions, or events",
    icon: "🎯",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    title: "Startups & Innovation",
    description: "Discover student ventures and find co-founders",
    icon: "🚀",
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Projects & Research",
    description: "Showcase your work and collaborate",
    icon: "💻",
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Things We Wish We Knew Earlier",
    description: "Learn from seniors who've been through it all",
    icon: "💡",
    color: "from-green-500 to-green-600",
  },
  {
    title: "Placement War Stories",
    description: "Real experiences from students who made it",
    icon: "🎓",
    color: "from-teal-500 to-teal-600",
  },
  {
    title: "Campus Through Your Eyes",
    description: "Preserve campus memories through photography",
    icon: "📸",
    color: "from-rose-500 to-rose-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything Your Campus Needs
          </h2>
          <p className="text-gray-600 text-lg">
            Leave something behind for future students
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gradient-to-br ${feature.color} text-white p-6 rounded-lg hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

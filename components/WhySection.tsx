"use client";

import { motion } from "framer-motion";
import { MessageCircle, Lightbulb, Target, Camera } from "lucide-react";

const problems = [
  {
    icon: MessageCircle,
    title: "Scattered Information",
    problem: "Important updates buried in 15 WhatsApp groups",
    impact: "You miss opportunities, events, and announcements",
  },
  {
    icon: Lightbulb,
    title: "Hidden Talent",
    problem: "Amazing student projects never get seen",
    impact: "Your work stays invisible, connections never happen",
  },
  {
    icon: Target,
    title: "Lost Opportunities",
    problem: "Internships, competitions, collaborations slip away",
    impact: "Seniors graduate without sharing what they learned",
  },
  {
    icon: Camera,
    title: "Fading Memories",
    problem: "College moments disappear over time",
    impact: "No central place to preserve your campus story",
  },
];

export default function WhySection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">College Life Deserves Better</h2>
          <p className="text-xl text-gray-600">Your batch deserves more than forgotten WhatsApp photos</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {problems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-colors"
              >
                <Icon className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700 mb-2">{item.problem}</p>
                <p className="text-gray-500 text-sm">{item.impact}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-lg"
        >
          <p className="text-xl md:text-2xl font-medium mb-4">
            We're building one platform where everything college happens—stories, startups, projects, opportunities, and memories that actually last.
          </p>
          <p className="text-purple-100">
            Preserve the memories that matter. Leave something behind for future students.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

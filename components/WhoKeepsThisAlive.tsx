"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const roles = [
  {
    id: "reader",
    icon: "👀",
    role: "Reader",
    desc: "Discovers what others have preserved",
    color: "bg-blue-50",
    without: [
      "No past placement experiences to learn from",
      "No insight into what seniors went through",
      "No access to opportunities that worked for others",
      "Starting from zero every semester",
    ],
    with: [
      "Discovers a placement story that changes their approach",
      "Finds opportunities shared by seniors",
      "Learns from projects built by previous batches",
      "Accesses wisdom that would have been lost",
    ],
  },
  {
    id: "contributor",
    icon: "✍️",
    role: "Contributor",
    desc: "Shares stories, photos, and experiences",
    color: "bg-purple-50",
    without: [
      "Photos stay buried in personal drives",
      "Stories disappear into group chats",
      "Projects go undocumented",
      "Memories fade after graduation",
    ],
    with: [
      "Photos become part of campus history",
      "Stories inspire future students",
      "Projects find collaborators",
      "Yearbooks preserve memories forever",
    ],
  },
  {
    id: "editor",
    icon: "📚",
    role: "Editor",
    desc: "Curates and improves content",
    color: "bg-pink-50",
    without: [
      "Opportunities get outdated and ignored",
      "Resources become irrelevant",
      "Good content gets buried in noise",
      "Quality slowly declines",
    ],
    with: [
      "Opportunities stay current and useful",
      "Resources remain valuable for years",
      "Quality content rises to the top",
      "The archive stays trustworthy",
    ],
  },
  {
    id: "lead",
    icon: "🌱",
    role: "Community Lead",
    desc: "Helps the community grow",
    color: "bg-green-50",
    without: [
      "New students don't know the platform exists",
      "Yearbook submissions never happen",
      "Events go undocumented",
      "The community stays invisible",
    ],
    with: [
      "Every batch knows about Common Room",
      "Yearbooks get completed on time",
      "Campus events are preserved",
      "The community becomes part of college culture",
    ],
  },
  {
    id: "steward",
    icon: "🏫",
    role: "College Steward",
    desc: "Ensures it lives beyond graduation",
    color: "bg-orange-50",
    without: [
      "The archive dies when one batch graduates",
      "No one takes responsibility long-term",
      "Institutional memory gets lost",
      "Future students start from scratch",
    ],
    with: [
      "Every batch inherits and improves the archive",
      "Knowledge compounds over years",
      "Campus history stays preserved",
      "Your college has a living memory",
    ],
  },
];

export default function WhoKeepsThisAlive() {
  const [activeRole, setActiveRole] = useState("contributor");
  const active = roles.find((r) => r.id === activeRole) || roles[1];

  return (
    <section className="py-24 px-4 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block border-2 border-black px-4 py-1 mb-6 bg-yellow-100">
            <span className="text-xs font-bold uppercase tracking-wider">The Truth</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            What Happens When<br />Students Care
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Common Room doesn't survive because software exists. It survives because students contribute.
          </p>
        </motion.div>

        {/* Interactive Two-Column Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Left Column: Role Accordion */}
          <div className="space-y-3">
            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">
              Select a Role
            </h3>
            {roles.map((role) => (
              <motion.button
                key={role.id}
                onClick={() => setActiveRole(role.id)}
                className={`w-full text-left border-2 border-black p-5 transition-all ${
                  activeRole === role.id
                    ? `${role.color} brutalist-border-sm`
                    : 'bg-white hover-lift'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{role.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-black mb-1">{role.role}</h4>
                    <p className="text-sm text-gray-700">{role.desc}</p>
                  </div>
                  <div className={`text-2xl transition-transform ${
                    activeRole === role.id ? 'rotate-90' : ''
                  }`}>
                    →
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column: Dynamic Comparison */}
          <div className="lg:sticky lg:top-24 self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Without Section */}
                <div className="bg-gray-100 border-2 border-black p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl opacity-50">❌</span>
                    <h4 className="text-xl font-black text-red-600">Without {active.role}s</h4>
                  </div>
                  <ul className="space-y-3">
                    {active.without.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="text-red-500 font-bold mt-1">•</span>
                        <span className="font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* With Section */}
                <div className="bg-green-100 border-2 border-black p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">✅</span>
                    <h4 className="text-xl font-black text-green-600">With {active.role}s</h4>
                  </div>
                  <ul className="space-y-3">
                    {active.with.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-green-600 font-bold mt-1">•</span>
                        <span className="font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Role-specific callout */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`${active.color} border-2 border-black p-4`}
                >
                  <p className="text-sm font-bold text-center">
                    Every {active.role.toLowerCase()} makes Common Room stronger.
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Core Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black text-white p-10 md:p-16 border-3 border-black text-center mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-black mb-6">
            Common Room is not a product you consume.
          </h3>
          <p className="text-xl md:text-2xl font-bold mb-8 text-gray-300">
            It's a community you contribute to.
          </p>
          <div className="max-w-2xl mx-auto space-y-3 text-lg leading-relaxed text-gray-300">
            <p>Every story shared.</p>
            <p>Every photo uploaded.</p>
            <p>Every project showcased.</p>
            <p>Every opportunity posted.</p>
            <p className="font-bold text-white text-xl mt-6">
              Makes the community more valuable for the next student.
            </p>
          </div>
        </motion.div>

        {/* Emotional Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-yellow-100 border-2 border-black p-8 max-w-3xl mx-auto brutalist-border-sm mb-8">
            <h3 className="text-2xl font-black mb-4 handwritten text-3xl">
              Built by students who got tired of watching memories disappear.
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Common Room only exists if people like you participate. No corporations. No investors. Just students keeping it alive.
            </p>
          </div>

          <p className="text-gray-600 mb-4 text-lg">Want to understand the full story?</p>
          <Link
            href="/guides/how-common-room-stays-alive"
            className="inline-block px-8 py-4 bg-black text-white border-3 border-black font-bold hover-lift uppercase tracking-wide"
          >
            Read Our Manifesto →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

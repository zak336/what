"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const microContent = [
  { type: "confession", text: "I accidentally sent my assignment to the prof's personal number 😭", position: { top: "15%", left: "8%" }, rotate: -3 },
  { type: "poll", text: "Best canteen item?", votes: "142 votes", position: { top: "25%", right: "12%" }, rotate: 2 },
  { type: "yearbook", text: "Class of 2027", subtitle: "Forever Memories", position: { bottom: "25%", left: "10%" }, rotate: -2 },
  { type: "startup", text: "Looking for React Dev", company: "EdTech Startup", position: { top: "45%", right: "8%" }, rotate: 3 },
  { type: "opportunity", text: "GSoC Applications", status: "Now Open", position: { bottom: "15%", right: "15%" }, rotate: -4 },
  { type: "hackathon", text: "24hr Hackathon", interested: "67 students", position: { top: "60%", left: "5%" }, rotate: 1 },
];

export default function NewHero() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-[#faf8f3]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-black"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black"></div>
      </div>

      {/* Floating Micro Content */}
      {microContent.map((card, index) => (
        <motion.div
          key={index}
          className={`hidden lg:block absolute cursor-pointer ${activeCard === index ? 'z-50' : 'z-10'}`}
          style={card.position}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: activeCard === null || activeCard === index ? 1 : 0.3,
            scale: 1,
            rotate: card.rotate,
          }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, rotate: 0, zIndex: 100 }}
          onHoverStart={() => setActiveCard(index)}
          onHoverEnd={() => setActiveCard(null)}
        >
          <div className="bg-white border-2 border-black p-4 max-w-[200px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-gray-500">
              {card.type}
            </div>
            <div className="font-semibold text-sm mb-1">{card.text}</div>
            {'subtitle' in card && <div className="text-xs text-gray-600">{card.subtitle}</div>}
            {'votes' in card && <div className="text-xs text-blue-600">{card.votes}</div>}
            {'company' in card && <div className="text-xs text-orange-600">{card.company}</div>}
            {'status' in card && <div className="text-xs text-green-600">{card.status}</div>}
            {'interested' in card && <div className="text-xs text-purple-600">{card.interested}</div>}
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Pre-launch Badge */}
          <motion.div
            initial={{ rotate: -5 }}
            animate={{ rotate: [-5, -3, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <div className="border-2 border-dashed border-black px-6 py-2 rotate-[-2deg] bg-yellow-100">
              <span className="text-sm font-bold uppercase tracking-wider">
                ⚡ Pre-Launch • Building in Public
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
            <span className="block">Common</span>
            <span className="block text-blue-600">Room</span>
          </h1>

          {/* Tagline */}
          <div className="mb-8">
            <p className="text-2xl md:text-4xl font-bold mb-4">
              The Living Archive of College Life
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Stories, projects, opportunities, confessions, memories, and annual digital yearbooks — built by students, for students.
            </p>
          </div>

          {/* Yearbook Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border-3 border-black p-8 mb-10 max-w-2xl mx-auto brutalist-border hover-lift"
          >
            <div className="text-5xl mb-3">📚</div>
            <h2 className="text-2xl font-bold mb-3">Annual Digital Yearbook</h2>
            <p className="text-gray-700">
              Years later, this is where your memories will live. Photos, farewell messages, achievements, and stories preserved forever.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={scrollToForm}
              className="px-10 py-5 bg-black text-white border-3 border-black font-bold text-lg hover-lift uppercase tracking-wide"
            >
              Join the Waitlist
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-5 bg-white text-black border-3 border-black font-bold text-lg hover-lift uppercase tracking-wide"
            >
              What's Inside
            </button>
          </div>

          {/* Subtext */}
          <p className="text-sm text-gray-600 italic">
            Your batch deserves more than forgotten WhatsApp photos.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

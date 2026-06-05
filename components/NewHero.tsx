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
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden grid-paper">
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
          <div className="notice-board p-4 max-w-[200px]">
            <div className="text-xs font-bold uppercase tracking-wider mb-1 text-[#0B0661]">
              {card.type}
            </div>
            <div className="font-semibold text-sm mb-1 text-[#0B0661]">{card.text}</div>
            {'subtitle' in card && <div className="text-xs text-gray-600">{card.subtitle}</div>}
            {'votes' in card && <div className="text-xs text-[#5C84FF]">{card.votes}</div>}
            {'company' in card && <div className="text-xs text-[#FF6BD6]">{card.company}</div>}
            {'status' in card && <div className="text-xs text-[#5C84FF]">{card.status}</div>}
            {'interested' in card && <div className="text-xs text-[#5C84FF]">{card.interested}</div>}
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
            <div className="yearbook-stamp px-6 py-2">
              <span className="text-sm font-bold uppercase tracking-wider text-[#0B0661]">
                ⚡ Pre-Launch • Building in Public
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none text-[#0B0661]">
            <span className="block common-room-wordmark text-7xl md:text-9xl">
              Common <span className="text-[#5380fe]">Room</span>
            </span>
          </h1>

          {/* Tagline */}
          <div className="mb-8">
            <p className="text-2xl md:text-4xl font-bold mb-4 text-[#0B0661]">
              The Living Archive of <span className="text-[#5C84FF]">College Life</span>
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
            className="bg-white border-3 border-[#0B0661] p-8 mb-10 max-w-2xl mx-auto brutalist-border hover-lift"
          >
            <div className="text-5xl mb-3">📚</div>
            <h2 className="text-2xl font-bold mb-3 text-[#0B0661]">Annual Digital Yearbook</h2>
            <p className="text-gray-700">
              Years later, this is where your memories will live. Photos, farewell messages, achievements, and stories <span className="text-[#5C84FF] font-semibold">preserved forever</span>.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={scrollToForm}
              className="px-10 py-5 bg-[#0B0661] text-white border-3 border-[#0B0661] font-bold text-lg hover:bg-[#5C84FF] transition-colors uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(11,6,97,1)] hover:shadow-[8px_8px_0px_0px_rgba(92,132,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            >
              Join the Waitlist
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-5 bg-white text-[#0B0661] border-3 border-[#0B0661] font-bold text-lg hover:text-[#5C84FF] hover:border-[#5C84FF] transition-colors uppercase tracking-wide shadow-[6px_6px_0px_0px_rgba(11,6,97,1)] hover:shadow-[8px_8px_0px_0px_rgba(92,132,255,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
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

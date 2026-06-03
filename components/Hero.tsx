"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const floatingCards = [
  { id: 1, content: "🤫 Confessions & Chaos", subtitle: "I accidentally sent my assignment to the professor's personal number.", x: "10%", y: "20%" },
  { id: 2, content: "💻 Hackathon", subtitle: "24 students interested", x: "85%", y: "15%" },
  { id: 3, content: "🎓 Yearbook", subtitle: "Class of 2027 Memories", x: "15%", y: "70%" },
  { id: 4, content: "🚀 Startup", subtitle: "Looking for a React Developer", x: "80%", y: "65%" },
  { id: 5, content: "📊 Poll", subtitle: "Best canteen item?", x: "12%", y: "45%" },
  { id: 6, content: "🎯 Opportunity", subtitle: "Google Summer of Code Applications Open", x: "88%", y: "40%" },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  
  const scrollToForm = () => {
    document.getElementById("waitlist-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 text-white px-4 py-20 overflow-hidden">
      {/* Floating Content Cards */}
      {!prefersReducedMotion && floatingCards.map((card) => (
        <motion.div
          key={card.id}
          className="hidden md:block absolute bg-white/10 backdrop-blur-sm rounded-lg p-6 text-sm max-w-[300px] pointer-events-none"
          style={{ left: card.x, top: card.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: [0.5, 0.7, 0.9],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 8 + card.id,
            repeat: Infinity,
            ease: "easeInOut",
            delay: card.id * 0.5,
          }}
        >
          <div className="font-medium mb-1">{card.content}</div>
          <div className="text-purple-200 opacity-80 text-md">{card.subtitle}</div>
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
            🎓 Pre-Launch • Building the Future of Campus Life
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Common Room
          </h1>
          
          <p className="text-2xl md:text-3xl font-semibold mb-4 text-purple-100">
            The Living Archive of College Life
          </p>
          
          <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
            Stories, projects, startups, opportunities, confessions, memories, and the annual digital yearbook built by students, for students.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto border border-white/20">
            <div className="text-3xl mb-2">📚</div>
            <h3 className="text-xl font-bold mb-2">Annual Digital Yearbook</h3>
            <p className="text-sm text-purple-100">
              Preserve your batch memories forever. Photos, farewell messages, achievements, clubs, startups, events, and student stories collected into a permanent digital yearbook.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Join the Founding Waitlist
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              See What's Coming
            </button>
          </div>
          
          <p className="text-sm text-purple-200">
            Your batch deserves more than forgotten WhatsApp photos
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SparklesIcon } from "lucide-react";

const HeroSection = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-950 text-white w-screen flex flex-col justify-center pt-14 overflow-hidden   px-6 md:px-20">
      
      {/* Removed the large red glowing circle */}

      {/* Additional subtle animated glow */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(circle, rgba(255,0,0,0.2), transparent 70%)" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-5xl pt-4  sm:pt-6 font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
            Supercharge Your<br /> Career with AI Precision
          </h1>
          <p className="text-white  sm:2xl text-lg md:text-xl max-w-lg">
           <span className="text-gray-300">Upload </span> your resume, paste a job description, and watch the AI tailor your profile. Minimalist, powerful, and precise.
          </p>
          
          {/* Buttons with animated borders */}
          <div className="flex gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px red" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-transparent border-2 border-red-600 text-white font-semibold rounded-full transition-all duration-300 hover:bg-red-600 hover:text-white"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "white" }}
              className="flex items-center gap-2 px-5 py-3 border-2 border-gray-600 text-white rounded-full hover:border-white transition-all duration-300"
            >
              <SparklesIcon size={20} /> Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Image with hover animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="w-full max-w-md mx-auto"
        >
          <div className="relative group">
            <img
              src="/maxy.png"
              alt="AI working on resume"
              className="rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            {/* Subtle overlay for extra detail */}
            <div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-red-500 transition border-dashed"></div>
          </div>
        </motion.div>
      </div>

      {/* Static Cursor Aura with Red glow */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
        animate={{ x: cursorPos.x - 12, y: cursorPos.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
      >
        <div className="w-8 h-8 bg-red-500 opacity-20 rounded-full blur-lg shadow-lg" />
      </motion.div>

      {/* Optional: Sparkle particles effect around cursor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-40">
        {/* You could add a canvas or SVG particles here for more detail */}
      </div>
    </div>
  );
};

export default HeroSection;
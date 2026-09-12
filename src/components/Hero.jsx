import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function Hero({ onOpenHeart }) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [showSub1, setShowSub1] = useState(false);
  const [showSub2, setShowSub2] = useState(false);
  const [showSub3, setShowSub3] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Typewriter sequence
  const greetingText = loveData.hero.greeting;

  useEffect(() => {
    if (typedIndex < greetingText.length) {
      const timer = setTimeout(() => {
        setTypedIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(timer);
    } else {
      // Step 1: "I made something for you…"
      const t1 = setTimeout(() => setShowSub1(true), 600);
      // Step 2: "Because you're not just someone in my life…"
      const t2 = setTimeout(() => setShowSub2(true), 2000);
      // Step 3: "…you're one of the reasons I smile every day. ❤️"
      const t3 = setTimeout(() => setShowSub3(true), 3600);
      // Step 4: Show Button
      const t4 = setTimeout(() => setShowButton(true), 5000);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [typedIndex, greetingText.length]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 z-10 select-none">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Floating Heart Icon Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 p-3 rounded-full bg-rose-500/10 border border-rose-400/30 backdrop-blur-md shadow-[0_0_25px_rgba(244,63,94,0.3)] animate-float"
        >
          <Heart className="w-9 h-9 text-rose-400 fill-rose-400/80 animate-heartbeat" />
        </motion.div>

        {/* Typed Main Greeting */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <span className="gradient-text-love drop-shadow-sm">
            {greetingText.slice(0, typedIndex)}
          </span>
          <span className="inline-block w-1.5 h-10 md:h-14 ml-1 bg-rose-400 rounded-sm animate-pulse align-middle" />
        </h1>

        {/* Subtitle Line 1 */}
        {showSub1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-lg sm:text-2xl text-pink-200 font-light mb-4 font-sans tracking-wide"
          >
            {loveData.hero.tagline1}
          </motion.p>
        )}

        {/* Subtitle Line 2 */}
        {showSub2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-base sm:text-xl text-pink-300/90 font-light mb-3 italic font-serif"
          >
            {loveData.hero.tagline2}
          </motion.p>
        )}

        {/* Subtitle Line 3 */}
        {showSub3 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="text-lg sm:text-2xl font-medium text-rose-300 mb-10 max-w-xl mx-auto leading-relaxed"
          >
            {loveData.hero.tagline3}
          </motion.p>
        )}

        {/* Glowing "Open My Heart 💗" Button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            className="flex flex-col items-center gap-4 mt-2"
          >
            <button
              id="open-heart-btn"
              onClick={onOpenHeart}
              className="btn-love-primary text-lg sm:text-xl py-4 px-9 rounded-full shadow-[0_0_35px_rgba(244,63,94,0.55)] group cursor-pointer"
            >
              <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform" />
              <span>{loveData.hero.ctaButton}</span>
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '6s' }} />
            </button>

            <span className="text-xs text-pink-300/60 tracking-wider uppercase font-medium flex items-center gap-1.5 mt-2">
              <ChevronDown className="w-3.5 h-3.5 animate-bounce text-rose-400" />
              Click to unfold our story
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

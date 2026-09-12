import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function LoveCounters() {
  const [inView, setInView] = useState(false);
  const [percent, setPercent] = useState(0);
  const [countOne, setCountOne] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Animate 0 -> 100%
    let p = 0;
    const interval100 = setInterval(() => {
      p += 2;
      if (p >= 100) {
        setPercent(100);
        clearInterval(interval100);
      } else {
        setPercent(p);
      }
    }, 25);

    // Animate 0 -> 1
    const tOne = setTimeout(() => {
      setCountOne(1);
    }, 500);

    return () => {
      clearInterval(interval100);
      clearTimeout(tOne);
    };
  }, [inView]);

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="site-container max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Mathematical Facts</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            A Few Reasons Why I Love You
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base">
            Backed by 100% scientific affection and heart-rate telemetry.
          </p>
        </motion.div>

        {/* 4 Counter Cards */}
        <motion.div
          onViewportEnter={() => setInView(true)}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Card 1: Infinity */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel p-8 text-center rounded-2xl border border-white/15 hover:border-rose-400/30 transition-all duration-300 shadow-lg group hover:shadow-[0_15px_30px_rgba(244,63,94,0.25)]"
          >
            <div className="text-5xl sm:text-6xl font-serif font-bold text-rose-400 mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]">
              ∞
            </div>
            <h3 className="font-sans font-semibold text-lg text-white mb-1">
              {loveData.counters[0].label}
            </h3>
            <p className="text-xs text-pink-200/70">
              {loveData.counters[0].sub}
            </p>
          </motion.div>

          {/* Card 2: 100% */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-8 text-center rounded-2xl border border-white/15 hover:border-rose-400/30 transition-all duration-300 shadow-lg group hover:shadow-[0_15px_30px_rgba(244,63,94,0.25)]"
          >
            <div className="text-5xl sm:text-6xl font-serif font-bold gradient-text-love mb-3 group-hover:scale-110 transition-transform duration-300">
              {percent}%
            </div>
            <h3 className="font-sans font-semibold text-lg text-white mb-1">
              {loveData.counters[1].label}
            </h3>
            <p className="text-xs text-pink-200/70">
              {loveData.counters[1].sub}
            </p>
          </motion.div>

          {/* Card 3: 24/7 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-panel p-8 text-center rounded-2xl border border-white/15 hover:border-rose-400/30 transition-all duration-300 shadow-lg group hover:shadow-[0_15px_30px_rgba(244,63,94,0.25)]"
          >
            <div className="text-5xl sm:text-6xl font-serif font-bold text-pink-300 mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(249,168,212,0.6)]">
              24/7
            </div>
            <h3 className="font-sans font-semibold text-lg text-white mb-1">
              {loveData.counters[2].label}
            </h3>
            <p className="text-xs text-pink-200/70">
              {loveData.counters[2].sub}
            </p>
          </motion.div>

          {/* Card 4: 1 Girl */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-panel p-8 text-center rounded-2xl border border-white/15 hover:border-rose-400/30 transition-all duration-300 shadow-lg group hover:shadow-[0_15px_30px_rgba(244,63,94,0.25)]"
          >
            <div className="text-5xl sm:text-6xl font-serif font-bold text-rose-500 mb-3 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.7)]">
              {countOne}
            </div>
            <h3 className="font-sans font-semibold text-lg text-white mb-1">
              {loveData.counters[3].label}
            </h3>
            <p className="text-xs text-pink-200/70">
              {loveData.counters[3].sub}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

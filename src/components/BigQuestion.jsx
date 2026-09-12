import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Stars, Check } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function BigQuestion() {
  const [answeredOption, setAnsweredOption] = useState(null);

  const fireGrandCelebration = () => {
    // 3 rounds of confetti & heart fireworks
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#f43f5e', '#fb7185', '#ffe4e6', '#fbbf24', '#c084fc'];

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 25,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() * 0.4 + 0.3 },
        colors: colors
      });
    }, 200);
  };

  const handleChoice = (opt) => {
    setAnsweredOption(opt);
    fireGrandCelebration();
  };

  return (
    <section className="min-h-screen py-24 px-4 relative flex flex-col justify-center items-center text-center overflow-hidden z-10">
      {/* Background Starry Atmosphere */}
      <div className="absolute inset-0 bg-[#070104]/90 pointer-events-none" />

      {/* Pulsing center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-rose-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="site-container max-w-2xl relative z-10">
        {/* Single Glowing Heart Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 inline-block"
        >
          <div className="relative p-5 rounded-full bg-rose-500/10 border border-rose-400/30 backdrop-blur-md shadow-[0_0_50px_rgba(244,63,94,0.6)]">
            <Heart className="w-14 h-14 text-rose-500 fill-rose-500 animate-heartbeat" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!answeredOption ? (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-rose-400/30 shadow-2xl"
            >
              {/* Intro Line */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-pink-300/80 font-serif italic text-lg sm:text-xl mb-4 tracking-wide"
              >
                {loveData.bigQuestion.intro}
              </motion.p>

              {/* The Big Question */}
              <motion.h3
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="font-serif text-3xl sm:text-5xl font-bold text-white mb-10 leading-tight"
              >
                {loveData.bigQuestion.question}
              </motion.h3>

              {/* Two Sweet Options */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-wrap items-center justify-center gap-5"
              >
                {loveData.bigQuestion.options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleChoice(opt)}
                    className="btn-love-primary text-lg sm:text-xl py-4 px-10 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(244,63,94,0.5)]"
                  >
                    <span>{opt.label}</span>
                  </button>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="response-box"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="glass-panel p-10 sm:p-14 rounded-3xl border border-rose-400/40 bg-black/60 shadow-[0_0_60px_rgba(244,63,94,0.4)]"
            >
              <div className="mb-6 p-4 rounded-full bg-rose-500/20 text-rose-400 inline-block border border-rose-400/40">
                <Heart className="w-12 h-12 fill-rose-500 text-rose-500 animate-bounce" />
              </div>

              <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-4 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]">
                {answeredOption.title}
              </h2>

              <p className="font-sans text-xl sm:text-2xl text-pink-200 font-medium mb-6">
                {answeredOption.sub}
              </p>

              <div className="flex items-center justify-center gap-2 text-rose-300 text-sm">
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                <span>Locked in permanently. No returns allowed!</span>
                <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

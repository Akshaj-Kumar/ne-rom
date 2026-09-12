import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Heart, Sparkles } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function EmotionalMessage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.45,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1, ease: "easeOut" }
    }
  };

  return (
    <section className="py-28 px-4 relative z-10 overflow-hidden">
      {/* Deep nocturnal romantic atmospheric glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#200511]/80 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-rose-950/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="site-container max-w-3xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/20 text-rose-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md">
            <Moon className="w-3.5 h-3.5 text-rose-300" />
            <span>{loveData.emotional.badge}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
            {loveData.emotional.heading}
          </h2>
        </motion.div>

        {/* Cinematic Card with deliberate, slow pacing */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="glass-panel p-8 sm:p-14 rounded-3xl border border-rose-500/20 bg-black/40 backdrop-blur-2xl text-center space-y-6 sm:space-y-7 shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
        >
          {loveData.emotional.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              variants={itemVariants}
              className="text-base sm:text-xl text-pink-100/90 font-sans leading-relaxed font-light"
            >
              "{para}"
            </motion.p>
          ))}

          {/* Emotional climax line */}
          <motion.div
            variants={itemVariants}
            className="pt-6 border-t border-rose-500/20"
          >
            <p className="font-serif text-2xl sm:text-3xl font-bold gradient-text-love inline-flex items-center gap-2">
              <span>{loveData.emotional.closing}</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

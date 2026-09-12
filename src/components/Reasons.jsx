import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function Reasons() {
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.94 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="site-container max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wide mb-4">
            <HeartHandshake className="w-4 h-4 text-rose-400" />
            <span>Countless Little Wonders</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            You Are Special Because…
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
            Out of 8 billion people on this planet, here is why you have my entire heart.
          </p>
        </motion.div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loveData.reasons.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel p-6 sm:p-7 rounded-2xl relative group overflow-hidden border border-white/15 hover:border-rose-400/40 transition-colors duration-300 shadow-lg hover:shadow-[0_15px_30px_rgba(244,63,94,0.2)]"
            >
              {/* Subtle gradient hover highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-start gap-4">
                <span className="text-3xl sm:text-4xl p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 flex-shrink-0">
                  {item.icon}
                </span>

                <div className="flex-1">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-rose-200 transition-colors">
                    {item.text}
                  </h3>
                  <p className="text-sm text-pink-200/75 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-rose-400/20 backdrop-blur-md">
            <p className="font-serif italic text-pink-300 text-lg sm:text-xl mb-1">
              "{loveData.reasonsClosing.lead}"
            </p>
            <p className="font-sans font-medium text-rose-200 text-xl sm:text-2xl gradient-text-love">
              "{loveData.reasonsClosing.sub}"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

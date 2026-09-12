import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function LoveMessage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 28, 
      filter: 'blur(8px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section id="love-message-section" className="py-24 px-4 relative z-10 overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="site-container max-w-3xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium tracking-wide mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Deep From My Soul</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
            {loveData.loveMessage.title}
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base font-light italic">
            {loveData.loveMessage.subtitle}
          </p>
        </motion.div>

        {/* Message Glass Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="glass-panel p-8 sm:p-14 relative shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-rose-400/20 backdrop-blur-2xl"
        >
          {/* Subtle Quote Icon */}
          <div className="absolute top-6 left-6 text-rose-500/20 pointer-events-none">
            <Quote className="w-12 h-12 rotate-180" />
          </div>
          <div className="absolute bottom-6 right-6 text-rose-500/20 pointer-events-none">
            <Quote className="w-12 h-12" />
          </div>

          {/* Floating little hearts decoration */}
          <div className="absolute -top-4 -right-3 p-2 bg-rose-600/80 rounded-full shadow-lg border border-rose-300/40 animate-float">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="absolute -bottom-3 -left-3 p-2 bg-pink-600/80 rounded-full shadow-lg border border-pink-300/40 animate-float" style={{ animationDelay: '2.5s' }}>
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>

          {/* Lines rendered individually */}
          <div className="space-y-6 sm:space-y-8 text-center relative z-10">
            {loveData.loveMessage.lines.map((line, idx) => {
              const isHighlight = idx === loveData.loveMessage.lines.length - 1;
              const isAccent = idx === loveData.loveMessage.lines.length - 2;

              return (
                <motion.div key={idx} variants={lineVariants}>
                  {isHighlight ? (
                    <div className="pt-4">
                      <p className="font-serif text-2xl sm:text-4xl font-bold gradient-text-love inline-block drop-shadow-[0_4px_12px_rgba(244,63,94,0.4)]">
                        {line}
                      </p>
                    </div>
                  ) : isAccent ? (
                    <p className="text-pink-300/80 font-serif italic text-base sm:text-lg tracking-wider">
                      {line}
                    </p>
                  ) : (
                    <p className="text-lg sm:text-2xl font-light text-pink-100/90 leading-relaxed font-sans">
                      {line}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Sun, Mic, HandHeart, Eye, Compass } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function LoveTimeline() {
  const icons = [
    <Sun className="w-5 h-5 text-amber-300" />,
    <Mic className="w-5 h-5 text-rose-300" />,
    <HandHeart className="w-5 h-5 text-pink-300" />,
    <Eye className="w-5 h-5 text-purple-300" />,
    <Compass className="w-5 h-5 text-blue-300" />
  ];

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="site-container max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>Cherished Nuances</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
            What I Love About You
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto">
            A few of the countless little reasons my heart chose you.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Glowing Center Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/80 via-pink-400/60 to-rose-600/30 shadow-[0_0_12px_rgba(244,63,94,0.7)]" />

          <div className="space-y-12 sm:space-y-16">
            {loveData.timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] pl-14 md:pl-0 ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}>
                    <div className="glass-panel p-6 sm:p-7 rounded-2xl relative border border-white/15 hover:border-rose-400/30 transition-all duration-300 group shadow-lg hover:shadow-[0_10px_25px_rgba(244,63,94,0.15)]">
                      <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 mb-2">
                        {item.badge}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-rose-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-pink-100/80 text-sm sm:text-base leading-relaxed font-sans italic">
                        "{item.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Node Circle */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-11 h-11 rounded-full bg-rose-950 border-2 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.8)] z-10">
                    {icons[idx % icons.length]}
                  </div>

                  {/* Spacer for other column on desktop */}
                  <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

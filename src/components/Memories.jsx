import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Camera, Calendar, Sparkles } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function Memories() {
  return (
    <section className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="site-container max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3">
            <Camera className="w-4 h-4 text-pink-300" />
            <span>Our Little World</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {loveData.memories.heading}
          </h2>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-serif italic text-2xl sm:text-4xl gradient-text-love font-semibold"
          >
            "{loveData.memories.reveal}"
          </motion.p>
        </motion.div>

        {/* Polaroid Memory Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {loveData.memories.gallery.map((item, idx) => {
            // Subtle alternating tilts for organic scrapbook feel
            const rotations = ['-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3'];
            const rot = rotations[idx % rotations.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
                className={`bg-white/90 text-rose-950 p-4 rounded-xl shadow-xl border border-white/60 transform ${rot} transition-all duration-300 relative group`}
              >
                {/* Washi Tape / Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-rose-200/70 backdrop-blur-sm -rotate-2 rounded-sm border border-white/40 shadow-sm z-10" />

                {/* Photo or Art Frame */}
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 relative mb-4 border border-rose-100 flex flex-col items-center justify-center text-center p-4">
                  {/* Image fallback with romantic illustration */}
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      // Graceful fallback to built-in romantic graphic if user hasn't added photo yet
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement.querySelector('.photo-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Fallback Display if photo not provided yet */}
                  <div className="photo-fallback hidden absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 text-rose-800">
                    <Heart className="w-10 h-10 text-rose-500 fill-rose-300/50 mb-2 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-rose-600">
                      {item.tag}
                    </span>
                    <p className="text-xs text-rose-700/80 mt-1 font-serif italic">
                      "{item.caption}"
                    </p>
                  </div>

                  {/* Floating Date Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[11px] font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-rose-300" />
                    <span>{item.date}</span>
                  </div>
                </div>

                {/* Polaroid Text Area */}
                <div className="text-left px-1">
                  <h4 className="font-serif font-bold text-base text-rose-950 truncate mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-rose-800/80 line-clamp-2 font-sans">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Helpful note for boyfriend */}
        <div className="text-center mt-12">
          <p className="text-xs text-pink-300/50 tracking-wider">
            💡 Tip: Drop her favorite pictures into <code className="text-pink-300 bg-white/10 px-2 py-0.5 rounded">/public/assets/photos/</code> to customize these Polaroid memories!
          </p>
        </div>
      </div>
    </section>
  );
}

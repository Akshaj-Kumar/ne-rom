import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Crown } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function FinalPromise() {
  const promise = loveData.finalPromise;
  if (!promise) return null;

  return (
    <section className="py-28 px-4 relative z-10 overflow-hidden">
      {/* Royal ambient background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-gradient-to-tr from-rose-900/25 via-amber-600/10 to-burgundy-950/40 rounded-full blur-[170px] pointer-events-none" />

      <div className="site-container max-w-4xl relative z-10">
        {/* Section Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <Crown className="w-4 h-4 text-amber-300" />
            <span>{promise.badge}</span>
            <Crown className="w-4 h-4 text-amber-300" />
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-wide">
            “{promise.title}”
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Regal Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="glass-panel p-6 sm:p-12 rounded-3xl border border-amber-400/30 bg-gradient-to-b from-white/[0.07] to-black/60 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] flex flex-col md:flex-row items-center gap-10 sm:gap-12"
        >
          {/* Royal Framed Photo */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Outer Golden & Rose Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400/50 via-rose-500/50 to-amber-300/40 rounded-3xl blur-md group-hover:blur-lg transition-all duration-500 opacity-80" />

              {/* Photo Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/60 shadow-2xl bg-black">
                <img
                  src={promise.image}
                  alt="Bas Tum Aur Main"
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-700"
                />

                {/* Subtle bottom vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating Heart Stamp */}
                <div className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/60 border border-amber-300/50 backdrop-blur-md">
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Romantic Note */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs tracking-widest uppercase font-semibold">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>A Lifetime Promise</span>
            </div>

            <div className="space-y-4">
              <p className="font-serif text-xl sm:text-2xl text-pink-100 font-light leading-relaxed">
                “{promise.lines[0]}
              </p>
              <p className="font-serif text-xl sm:text-2xl text-rose-300 font-medium leading-relaxed drop-shadow-[0_0_15px_rgba(244,63,94,0.4)]">
                {promise.lines[1]}
              </p>
              <p className="font-serif text-xl sm:text-2xl text-pink-100 font-light leading-relaxed">
                {promise.lines[2]}
              </p>
              <p className="font-serif text-2xl sm:text-3xl font-bold gradient-text-love leading-relaxed mt-2">
                {promise.lines[3]}”
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-center md:justify-start gap-3 text-sm text-pink-200/70 font-sans">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span className="italic">Yours forever & always, Akshaj</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

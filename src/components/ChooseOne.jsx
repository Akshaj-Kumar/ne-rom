import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveData } from '../config/loveData';

export default function ChooseOne() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (opt) => {
    setSelectedOption(opt);
    if (opt.id === 'all' || opt.id === 'kiss') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a']
      });
    }
  };

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="site-container max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3">
            <Gift className="w-4 h-4 text-pink-300" />
            <span>Redeemable Immediately</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {loveData.chooseOne.question}
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base">
            Choose carefully… deliveries are non-refundable and full of love!
          </p>
        </motion.div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {loveData.chooseOne.options.map((opt) => {
            const isSelected = selectedOption?.id === opt.id;

            return (
              <motion.button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                whileHover={{ y: -6, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`p-5 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer border ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.6)] ring-2 ring-rose-400'
                    : 'glass-panel text-pink-100 hover:border-rose-400/40 hover:bg-white/10'
                }`}
              >
                <span className="text-4xl sm:text-5xl mb-3 block transform hover:scale-110 transition-transform">
                  {opt.icon}
                </span>
                <span className="font-sans font-semibold text-sm sm:text-base">
                  {opt.label}
                </span>

                {isSelected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2 w-5 h-5 rounded-full bg-white text-rose-600 flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Dynamic Response Box */}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              key={selectedOption.id}
              initial={{ opacity: 0, y: 15, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.96 }}
              transition={{ duration: 0.35 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl max-w-xl mx-auto text-center border border-rose-400/30 shadow-xl"
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-rose-300">
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
                <span className="text-xs uppercase tracking-widest font-semibold">Your Boyfriend's Order Status</span>
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              </div>

              <p className="font-serif text-xl sm:text-2xl text-white font-medium italic mb-2">
                "{selectedOption.response}"
              </p>

              <span className="text-xs text-pink-200/60 font-sans">
                (Order confirmed & ready for immediate redemption)
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

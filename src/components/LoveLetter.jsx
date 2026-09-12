import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';
import { loveData } from '../config/loveData';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="site-container max-w-3xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3">
            <Feather className="w-4 h-4 text-pink-300" />
            <span>Handwritten From The Heart</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            {loveData.loveLetter.title}
          </h2>
          <p className="text-pink-200/70 text-sm sm:text-base">
            Written with every ounce of feeling I have for you.
          </p>
        </motion.div>

        {/* The Letter Envelope / Card */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="letter-paper rounded-2xl sm:rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-amber-900/10"
          >
            {/* Wax Seal Stamp (Top Right) */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 w-14 h-14 rounded-full bg-rose-700 border-2 border-rose-900 shadow-md flex items-center justify-center text-white rotate-12 transform hover:rotate-0 transition-transform">
              <Heart className="w-7 h-7 fill-white/90 text-rose-700" />
            </div>

            {/* Salutation */}
            <p className="font-handwriting text-3xl sm:text-4xl text-rose-900 font-bold mb-8">
              {loveData.loveLetter.salutation}
            </p>

            {/* Body Lines */}
            <div className="space-y-4 text-slate-800 font-handwriting text-2xl sm:text-3xl leading-relaxed">
              {loveData.loveLetter.body.map((paragraph, idx) => (
                <p key={idx} className="tracking-wide">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Closing & Signature */}
            <div className="mt-12 pt-6 border-t border-rose-900/15 flex flex-col items-end">
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-800 italic">
                {loveData.loveLetter.closing}
              </p>
              <p className="font-handwriting text-3xl sm:text-4xl text-rose-900 font-bold mt-1">
                {loveData.loveLetter.signature}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

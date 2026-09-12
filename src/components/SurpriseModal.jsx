import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { loveData } from '../config/loveData';

export default function SurpriseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const audioCtxRef = useRef(null);
  const heartbeatTimerRef = useRef(null);

  // Play gentle rhythmic heartbeat "lub-dub" pulse sound via Web Audio API
  const playHeartbeatSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const thump = (freq, duration, delay) => {
        setTimeout(() => {
          if (!isOpen) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        }, delay);
      };

      const beat = () => {
        thump(65, 0.18, 0);   // "lub"
        thump(55, 0.22, 220); // "dub"
      };

      beat();
      heartbeatTimerRef.current = setInterval(beat, 1400);
    } catch (e) {
      console.log('Audio error:', e);
    }
  };

  const stopHeartbeatSound = () => {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  };

  const openSurprise = () => {
    setIsOpen(true);
    setStage(1);
    playHeartbeatSound();

    // Stage progression
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 4200);
    const t4 = setTimeout(() => {
      setStage(4);
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#fb7185', '#ffe4e6']
      });
    }, 6200);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  const closeSurprise = () => {
    setIsOpen(false);
    setStage(0);
    stopHeartbeatSound();
  };

  useEffect(() => {
    return () => stopHeartbeatSound();
  }, []);

  return (
    <section className="py-24 px-4 text-center relative z-10">
      <div className="site-container max-w-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 glass-panel rounded-3xl border border-rose-400/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />

          <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-4">
            Before You Go Anywhere…
          </h3>
          <p className="text-pink-200/70 text-sm sm:text-base mb-8">
            There is one final secret tucked away inside here.
          </p>

          <button
            onClick={openSurprise}
            className="btn-love-primary text-lg sm:text-xl py-4 px-10 rounded-full cursor-pointer group shadow-[0_0_35px_rgba(244,63,94,0.6)]"
          >
            <Gift className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span>{loveData.surprise.triggerButton}</span>
          </button>
        </motion.div>
      </div>

      {/* Fullscreen Dark Cinematic Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Close button */}
            <button
              onClick={closeSurprise}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Giant Glowing Heartbeat Heart */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-rose-600/40 rounded-full blur-[80px] animate-pulse" />
              <Heart className="w-32 h-32 sm:w-44 sm:h-44 text-rose-500 fill-rose-500 animate-heartbeat relative z-10 drop-shadow-[0_0_40px_rgba(244,63,94,0.9)]" />
            </div>

            {/* Stage Text Reveals */}
            <div className="max-w-xl space-y-6">
              {stage >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-2xl sm:text-3xl text-pink-200 font-light"
                >
                  "{loveData.surprise.lines[0]}"
                </motion.p>
              )}

              {stage >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-sans text-xl sm:text-2xl text-pink-300/80 font-medium italic"
                >
                  "{loveData.surprise.lines[1]}"
                </motion.p>
              )}

              {stage >= 3 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-3xl sm:text-5xl font-bold gradient-text-love"
                >
                  "{loveData.surprise.lines[2]}"
                </motion.p>
              )}

              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="pt-8 border-t border-white/10"
                >
                  <p className="font-sans text-base sm:text-xl text-rose-300/90 font-medium">
                    {loveData.surprise.footer}
                  </p>
                  <p className="text-xs text-pink-300/50 mt-4 tracking-widest uppercase">
                    Forever & Always, Your Akshaj ❤️
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
